import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "gautam.shukla@univerziaai.in";
const FROM_EMAIL = "Univerzia AI <noreply@univerziaai.in>";

/* ── helpers ─────────────────────────────────────────────────── */

function formatDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

/* ── Lead notification ───────────────────────────────────────── */

export async function notifyNewLead(data: {
  name: string;
  email: string;
  phone: string;
  city?: string;
  program: string;
  source: string;
  ctaType: string;
}) {
  const text = `New lead submission on Univerzia AI

Name:       ${data.name}
Email:      ${data.email}
Phone:      ${data.phone}
City:       ${data.city || "—"}
Program:    ${data.program}
Source:     ${data.source}
CTA:        ${data.ctaType}
Submitted:  ${formatDate(new Date())}

---
This is an automated notification from univerziaai.in`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${data.name} — ${data.program}`,
    text,
  });

  if (error) {
    console.error("Resend error (lead):", error);
  }
}

/* ── Contact notification ────────────────────────────────────── */

export async function notifyNewContact(data: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}) {
  const text = `New contact form submission on Univerzia AI

Name:       ${data.name}
Email:      ${data.email}
Phone:      ${data.phone || "—"}
Topic:      ${data.topic}

Message:
${data.message}

Submitted:  ${formatDate(new Date())}

---
This is an automated notification from univerziaai.in`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Contact: ${data.name} — ${data.topic}`,
    text,
  });

  if (error) {
    console.error("Resend error (contact):", error);
  }
}
