import prisma from "@/lib/db";
import { notifyNewContact } from "@/lib/email";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}

function validateBody(body: unknown): { data?: ContactBody; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request body" };

  const b = body as Record<string, unknown>;
  if (!b.name || typeof b.name !== "string" || !b.name.trim())
    return { error: "Name is required" };
  if (!b.email || typeof b.email !== "string" || !b.email.trim())
    return { error: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string))
    return { error: "Invalid email address" };
  if (!b.topic || typeof b.topic !== "string")
    return { error: "Topic is required" };
  if (!b.message || typeof b.message !== "string" || (b.message as string).trim().length < 10)
    return { error: "Message must be at least 10 characters" };

  return {
    data: {
      name: (b.name as string).trim(),
      email: (b.email as string).trim().toLowerCase(),
      phone: typeof b.phone === "string" && b.phone.trim() ? b.phone.trim() : undefined,
      topic: (b.topic as string).trim(),
      message: (b.message as string).trim(),
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const { data, error } = validateBody(body);

    if (error || !data) {
      return Response.json({ error: error || "Invalid request" }, { status: 400 });
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existing = await prisma.contact.findFirst({
      where: {
        email: data.email,
        submittedAt: { gte: oneHourAgo },
      },
    });

    if (existing) {
      return Response.json(
        { error: "duplicate", message: "You've already sent a message recently. We'll get back to you soon!" },
        { status: 409 }
      );
    }

    const contact = await prisma.contact.create({ data });

    // Fire-and-forget: email failure doesn't block the response
    notifyNewContact(data).catch((err) =>
      console.error("Contact notification failed:", err)
    );

    return Response.json({ ok: true, id: contact.id });
  } catch (err) {
    console.error("Contact submission error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
