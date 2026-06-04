import prisma from "@/lib/db";
import { notifyNewLead } from "@/lib/email";

interface LeadBody {
  name: string;
  email: string;
  phone: string;
  city?: string;
  program: string;
  source: string;
  ctaType: string;
}

function validateBody(body: unknown): { data?: LeadBody; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request body" };

  const b = body as Record<string, unknown>;
  if (!b.name || typeof b.name !== "string" || !b.name.trim())
    return { error: "Name is required" };
  if (!b.email || typeof b.email !== "string" || !b.email.trim())
    return { error: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return { error: "Invalid email address" };
  if (!b.phone || typeof b.phone !== "string" || !b.phone.trim())
    return { error: "Phone is required" };
  if (!b.program || typeof b.program !== "string")
    return { error: "Program is required" };
  if (!b.source || typeof b.source !== "string")
    return { error: "Source is required" };
  if (!b.ctaType || typeof b.ctaType !== "string")
    return { error: "CTA type is required" };

  return {
    data: {
      name: (b.name as string).trim(),
      email: (b.email as string).trim().toLowerCase(),
      phone: (b.phone as string).trim(),
      city: typeof b.city === "string" && b.city.trim() ? b.city.trim() : undefined,
      program: (b.program as string).trim(),
      source: (b.source as string).trim(),
      ctaType: (b.ctaType as string).trim(),
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

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await prisma.lead.findFirst({
      where: {
        email: data.email,
        ctaType: data.ctaType,
        submittedAt: { gte: twentyFourHoursAgo },
      },
    });

    if (existing) {
      return Response.json(
        { error: "duplicate", message: "You've already submitted this. We'll be in touch!" },
        { status: 409 }
      );
    }

    const lead = await prisma.lead.create({ data });

    // Fire-and-forget: email failure doesn't block the response
    notifyNewLead(data).catch((err) =>
      console.error("Lead notification failed:", err)
    );

    return Response.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("Lead submission error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
