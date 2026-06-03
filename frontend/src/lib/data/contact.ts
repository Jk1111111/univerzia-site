/* ═══════════════════════════════════════════════════════════════
   Contact page — static content
   Converted from Univerzia AI Design System / contact-data.js
   ═══════════════════════════════════════════════════════════════ */

// ── Interfaces ──────────────────────────────────────────────────

export interface ContactChip {
  ic: string;
  t: string;
  href: string;
}

export interface ContactHero {
  pill: string;
  title: [string, string];
  lead: string;
  chips: ContactChip[];
}

export interface FormConfig {
  title: string;
  sub: string;
  topics: string[];
}

export interface InfoRow {
  ic: string;
  k: string;
  v: string;
  href?: string;
}

export interface Social {
  ic: string;
  title: string;
  href: string;
}

export interface ContactInfo {
  title: string;
  lead: string;
  rows: InfoRow[];
  socials: Social[];
}

export interface Department {
  ic: string;
  grad: string;
  tint: string;
  color: string;
  h: string;
  p: string;
  email: string;
}

export interface QuickCard {
  ic: string;
  grad: string;
  c: string;
  h: string;
  p: string;
  lnk: string;
  href: string;
}

export interface MapDetail {
  ic: string;
  k: string;
  v: string;
}

export interface MapData {
  place: string;
  address: string;
  details: MapDetail[];
  cta: { label: string; href: string };
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CtaAction {
  label: string;
  href: string;
  kind: "primary" | "ghost-dark";
}

export interface CtaBlock {
  title: string;
  sub: string;
  actions: CtaAction[];
}

// ── Data ────────────────────────────────────────────────────────

export const contactHero: ContactHero = {
  pill: "We usually reply within a few hours",
  title: ["Let’s talk about your ", "next big move"],
  lead: "Whether you’re choosing a program, scoping a project, or just exploring what AI can do for you — our team in Varanasi is ready to help.",
  chips: [
    { ic: "fa-envelope", t: "gautam.shukla@univerziaai.in", href: "mailto:gautam.shukla@univerziaai.in" },
    { ic: "fa-phone", t: "+91 95110 16762", href: "tel:+919511016762" },
    { ic: "fa-location-dot", t: "Varanasi, Uttar Pradesh", href: "#map" },
  ],
};

export const contactForm: FormConfig = {
  title: "Send us a message",
  sub: "Fill in the form and the right person on our team will get back to you. Fields marked * are required.",
  topics: [
    "Choosing a program or workshop",
    "Services & project enquiry (web, LMS, ERP, e-commerce)",
    "Partnerships & collaboration",
    "Careers",
    "General enquiry",
  ],
};

export const contactInfo: ContactInfo = {
  title: "Reach us directly",
  lead: "Prefer email or a quick call? Here’s how to reach the team.",
  rows: [
    { ic: "fa-envelope", k: "Email", v: "gautam.shukla@univerziaai.in", href: "mailto:gautam.shukla@univerziaai.in" },
    { ic: "fa-phone", k: "Phone", v: "+91 95110 16762", href: "tel:+919511016762" },
    { ic: "fa-location-dot", k: "Office", v: "Awas Vikas Colony, Daulatpur, Pandeypur, Varanasi 221002, UP, India" },
    { ic: "fa-clock", k: "Business Hours", v: "Mon–Sat, 10:00 AM – 7:00 PM IST" },
  ],
  socials: [
    { ic: "fa-linkedin-in", title: "LinkedIn", href: "#" },
    { ic: "fa-instagram", title: "Instagram", href: "#" },
    { ic: "fa-x-twitter", title: "X", href: "#" },
    { ic: "fa-facebook-f", title: "Facebook", href: "#" },
  ],
};

export const contactDepartments: { eyebrow: string; title: string; sub: string; items: Department[] } = {
  eyebrow: "Department Contacts",
  title: "Route your message to the right team",
  sub: "Know who you need? Reach a department directly and skip the queue.",
  items: [
    { ic: "fa-briefcase", grad: "var(--grad-orange)", tint: "var(--brand-primary-50)", color: "var(--brand-primary)", h: "Sales", p: "Programs, pricing, and new project enquiries for individuals and businesses.", email: "sales@univerziaai.in" },
    { ic: "fa-life-ring", grad: "var(--grad-cyan)", tint: "#ECFEFF", color: "var(--cyan)", h: "Support", p: "Help with your account, courses, or a product we’ve built for you.", email: "support@univerziaai.in" },
    { ic: "fa-handshake", grad: "var(--grad-brand)", tint: "var(--brand-purple-light)", color: "var(--brand-purple)", h: "Partnerships", p: "Hiring partners, institutes, and collaboration opportunities.", email: "partners@univerziaai.in" },
    { ic: "fa-circle-info", grad: "var(--grad-green)", tint: "var(--success-light)", color: "var(--success-dark)", h: "General Inquiries", p: "Anything else — press, careers, or a question that doesn’t fit a box.", email: "hello@univerziaai.in" },
  ],
};

export const contactQuick: { eyebrow: string; title: string; sub: string; items: QuickCard[] } = {
  eyebrow: "Quick Support",
  title: "Skip the form — get moving now",
  sub: "Pick the fastest path to what you need.",
  items: [
    { ic: "fa-display", grad: "var(--grad-orange)", c: "var(--brand-primary)", h: "Request a Demo", p: "See Univerzia LMS, ERP, or a custom build in action with a live, guided walkthrough.", lnk: "Book a Demo", href: "#contact-form" },
    { ic: "fa-calendar-check", grad: "var(--grad-brand)", c: "var(--brand-purple)", h: "Schedule a Consultation", p: "Free career or project consultation with a mentor to map your next step.", lnk: "Book a Free Call", href: "#contact-form" },
    { ic: "fa-headset", grad: "var(--grad-cyan)", c: "var(--cyan)", h: "Technical Support", p: "Already a learner or client? Get fast help from our support team.", lnk: "Get Support", href: "mailto:support@univerziaai.in" },
  ],
};

export const contactMap: MapData = {
  place: "Univerzia AI Pvt Ltd",
  address: "Awas Vikas Colony, Daulatpur,\nPandeypur, Varanasi 221002,\nUttar Pradesh, India",
  details: [
    { ic: "fa-location-dot", k: "Address", v: "Awas Vikas Colony, Pandeypur, Varanasi 221002" },
    { ic: "fa-clock", k: "Hours", v: "Mon–Sat · 10:00 AM – 7:00 PM IST" },
    { ic: "fa-car", k: "Getting here", v: "10 min from Varanasi Junction · parking available" },
  ],
  cta: { label: "Open in Maps", href: "https://maps.google.com/?q=Pandeypur+Varanasi+221002" },
};

export const contactFaq: { eyebrow: string; title: string; items: FaqItem[] } = {
  eyebrow: "Before You Reach Out",
  title: "Questions about contacting us",
  items: [
    { q: "How quickly will I get a response?", a: "We reply to most enquiries within a few business hours, and always within one working day. For urgent technical support, existing clients and learners can email support@univerziaai.in for priority handling." },
    { q: "Can I book a free consultation?", a: "Yes. Every prospective learner and business client can book a free consultation with a mentor to map out the right program or project. Use the Quick Support options above or mention it in the form." },
    { q: "Do you work with clients outside Varanasi or India?", a: "Absolutely. While our office is in Varanasi, we deliver programs and build software for clients across India and internationally — remotely and on-site where it makes sense." },
    { q: "What information should I include in my message?", a: "Tell us who you are, what you’re trying to achieve, and any timeline or budget context. The more detail you share, the faster we can route you to the right person with a useful answer." },
    { q: "I’m interested in a program — should I use this form?", a: "You can, and we’ll help. If you’d like to browse first, the Programs and AI Workshops pages list everything in detail. Choose ‘Choosing a program or workshop’ as your topic and we’ll guide you from there." },
    { q: "How do I get product support for an LMS or ERP you built?", a: "Existing product clients have a dedicated support channel — email support@univerziaai.in or use the Technical Support quick option, and our team will assist you directly." },
  ],
};

export const contactCta: CtaBlock = {
  title: "Ready when you are",
  sub: "Start a conversation today and take the first step toward a more AI-ready future — for you or your organisation.",
  actions: [
    { label: "Send a Message", href: "#contact-form", kind: "primary" },
    { label: "Explore Programs", href: "/programs", kind: "ghost-dark" },
  ],
};
