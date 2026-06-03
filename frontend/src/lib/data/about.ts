/* ═══════════════════════════════════════════════════════════════
   About page — static content
   Converted from Univerzia AI Design System / about-data.js
   ═══════════════════════════════════════════════════════════════ */

// ── Interfaces ──────────────────────────────────────────────────

export interface CtaAction {
  label: string;
  href: string;
  kind: "primary" | "ghost-dark";
}

export interface MetaStat {
  v: string;
  l: string;
}

export interface MiniCard {
  ic: string;
  grad: string;
  lbl: string;
  text: string;
}

export interface AboutHero {
  pill: string;
  title: [string, string];
  lead: string;
  cta: CtaAction[];
  meta: MetaStat[];
  mv: MiniCard[];
}

export interface TimelineNode {
  yr: string;
  h: string;
  p: string;
}

export interface AboutStory {
  eyebrow: string;
  title: string;
  paras: string[];
  sig: { av: string; n: string; r: string };
  timeline: TimelineNode[];
}

export interface MvCard {
  variant: "mission" | "vision";
  ic: string;
  grad: string;
  lbl: string;
  h: string;
  p: string;
}

export interface ServiceCard {
  ic: string;
  grad: string;
  tint: string;
  color: string;
  h: string;
  p: string;
  href: string;
}

export interface WhyCard {
  ic: string;
  grad: string;
  tint: string;
  color: string;
  h: string;
  p: string;
}

export interface StatItem {
  v: string;
  l: string;
}

export interface ValueCard {
  ic: string;
  grad: string;
  c: string;
  h: string;
  p: string;
}

export interface TeamMember {
  initials: string;
  n: string;
  role: string;
  p: string;
}

export interface Testimonial {
  stars: number;
  q: string;
  n: string;
  r: string;
  grad: string;
  initials: string;
}

export interface CtaBlock {
  title: string;
  sub: string;
  actions: CtaAction[];
}

// ── Data ────────────────────────────────────────────────────────

export const aboutHero: AboutHero = {
  pill: "Founded 2024 · Varanasi, India",
  title: ["Building an AI-first future, ", "one career and company at a time"],
  lead: "Univerzia AI is an AI-powered learning ecosystem and technology studio. We help people become job-ready in AI — and help organisations build the software that moves them forward.",
  cta: [
    { label: "Explore Our Services", href: "/services", kind: "primary" },
    { label: "Talk to Our Team", href: "/contact", kind: "ghost-dark" },
  ],
  meta: [
    { v: "500+", l: "Students Enrolled" },
    { v: "10+", l: "Business Clients" },
    { v: "96%", l: "Success Rate" },
  ],
  mv: [
    { ic: "fa-bullseye", grad: "var(--grad-brand)", lbl: "Our Mission", text: "Make practical, project-based AI skills accessible to every learner — and put real AI products in the hands of every business." },
    { ic: "fa-rocket", grad: "var(--grad-orange)", lbl: "Our Vision", text: "An India where AI fluency is the default, not the exception — powered from Varanasi for the world." },
  ],
};

export const trustedAt = ["TCS", "IBM", "Wipro", "Infosys", "HCL", "Tech Mahindra"];

export const aboutStory: AboutStory = {
  eyebrow: "Our Story",
  title: "From a Varanasi classroom to a national AI mission",
  paras: [
    "Univerzia AI began in 2024 with a simple frustration: AI was reshaping every industry, yet the learning available was either too theoretical to apply or too expensive to reach the people who needed it most.",
    "So we built the opposite — hands-on, project-based programs where learners ship real work with industry tools from day one. What started as a handful of workshops has grown into a full ecosystem of AI education, mentorship, and a technology studio that builds LMS, ERP, web, and e-commerce products for businesses across India.",
    "Today, the same team that trains the next generation of AI talent also delivers the software that helps organisations put AI to work — two halves of one mission.",
  ],
  sig: { av: "GS", n: "Gautam Shukla", r: "Full-Stack Developer, AI & Data Science" },
  timeline: [
    { yr: "2024", h: "Univerzia AI is founded", p: "Launched in Varanasi with the first cohort of practical, project-based AI workshops." },
    { yr: "2024", h: "The learning ecosystem takes shape", p: "Tech & Data programs, AI Mastery tracks, mentorship, and career support come together under one roof." },
    { yr: "2025", h: "Technology studio launches", p: "We start shipping LMS, ERP, website, and e-commerce products for our first business clients." },
    { yr: "2025", h: "500+ learners, 96% success rate", p: "Alumni move into AI-ready roles at firms including TCS, IBM, Infosys and beyond." },
    { yr: "Today", h: "Education + software, one mission", p: "An AI-first company helping people and organisations become future-proof — from Varanasi to the world." },
  ],
};

export const aboutMV: { eyebrow: string; title: string; cards: MvCard[] } = {
  eyebrow: "Mission & Vision",
  title: "What drives every decision we make",
  cards: [
    { variant: "mission", ic: "fa-bullseye", grad: "var(--grad-brand)", lbl: "Our Mission", h: "Make AI skills and AI software accessible to everyone", p: "Make practical, project-based AI skills accessible to every learner — and put real AI products in the hands of every business." },
    { variant: "vision", ic: "fa-rocket", grad: "var(--grad-orange)", lbl: "Our Vision", h: "AI fluency as the default, not the exception", p: "An India where AI fluency is the default, not the exception — powered from Varanasi for the world." },
  ],
};

export const aboutWhatWeDo: { eyebrow: string; title: string; sub: string; items: ServiceCard[] } = {
  eyebrow: "What We Do",
  title: "One partner for AI skills and AI software",
  sub: "We sit at the intersection of education and technology — teaching teams to use AI, and building the products that run on it.",
  items: [
    { ic: "fa-robot", grad: "var(--grad-brand)", tint: "var(--brand-purple-light)", color: "var(--brand-purple)", h: "AI Solutions", p: "Custom AI automation, agentic workflows, and prompt-engineering systems that cut workload and unlock 10x productivity.", href: "/services" },
    { ic: "fa-graduation-cap", grad: "var(--grad-cyan)", tint: "#ECFEFF", color: "var(--cyan)", h: "LMS Platform", p: "Univerzia LMS — a modern learning platform for institutes and academies, built for cohorts, certifications, and outcomes.", href: "/services/lms" },
    { ic: "fa-database", grad: "var(--grad-green)", tint: "var(--success-light)", color: "var(--success-dark)", h: "ERP Solutions", p: "Univerzia ERP — school and business management that brings admissions, finance, staff, and operations into one console.", href: "/services/erp" },
    { ic: "fa-laptop-code", grad: "var(--grad-orange)", tint: "var(--brand-primary-50)", color: "var(--brand-primary)", h: "Website Development", p: "High-performance websites and web apps — designed, built, and engineered to convert and scale.", href: "/services/website-development" },
    { ic: "fa-cart-shopping", grad: "var(--grad-pink)", tint: "#FDF4FF", color: "var(--pink)", h: "E-Commerce Solutions", p: "Conversion-focused online stores with payments, catalogues, and analytics — ready to sell from launch day.", href: "/services/e-commerce" },
    { ic: "fa-wand-magic-sparkles", grad: "var(--grad-purple)", tint: "var(--brand-purple-light)", color: "var(--brand-purple-600)", h: "Digital Innovation", p: "Brand, UX, and digital marketing services that help your products reach the right people and grow.", href: "/services" },
  ],
};

export const aboutWhy: { eyebrow: string; title: string; sub: string; items: WhyCard[] } = {
  eyebrow: "Why Univerzia AI",
  title: "Why teams and learners choose us",
  sub: "We’re not another course library or a generic dev shop. We’re an AI-first company that practises what it teaches.",
  items: [
    { ic: "fa-screwdriver-wrench", grad: "var(--grad-brand)", tint: "var(--brand-purple-light)", color: "var(--brand-purple)", h: "Project-based, not theoretical", p: "Every program and project ships real work with real industry tools — so skills transfer to the job on day one." },
    { ic: "fa-user-tie", grad: "var(--grad-orange)", tint: "var(--brand-primary-50)", color: "var(--brand-primary)", h: "Mentored by practitioners", p: "Learn from full-stack and agentic-AI specialists who build production software, not just slides." },
    { ic: "fa-arrow-trend-up", grad: "var(--grad-green)", tint: "var(--success-light)", color: "var(--success-dark)", h: "Measurable outcomes", p: "A 96% success rate, alumni at leading firms, and businesses shipping faster with the products we build." },
    { ic: "fa-layer-group", grad: "var(--grad-cyan)", tint: "#ECFEFF", color: "var(--cyan)", h: "Education + software in one", p: "We train your people and build your platform — a rare combination that compounds your AI advantage." },
    { ic: "fa-location-dot", grad: "var(--grad-purple)", tint: "var(--brand-purple-light)", color: "var(--brand-purple-600)", h: "Rooted in India, built for the world", p: "Affordable, INR-first, and proudly from Varanasi — with the quality global teams expect." },
    { ic: "fa-headset", grad: "var(--grad-pink)", tint: "#FDF4FF", color: "var(--pink)", h: "Partner, not a vendor", p: "Mentorship, career support, and long-term product support — we stay with you well past launch day." },
  ],
};

export const aboutStats: { eyebrow: string; title: string; sub: string; items: StatItem[] } = {
  eyebrow: "Our Impact",
  title: "Numbers that show the work",
  sub: "Outcomes we’re proud of — and just getting started on.",
  items: [
    { v: "500+", l: "Students Enrolled" },
    { v: "96%", l: "Career Success Rate" },
    { v: "50+", l: "Projects Delivered" },
    { v: "10+", l: "Organisations Supported" },
  ],
};

export const aboutValues: { eyebrow: string; title: string; items: ValueCard[] } = {
  eyebrow: "What We Stand For",
  title: "The values behind every cohort and codebase",
  items: [
    { ic: "fa-lightbulb", grad: "var(--grad-brand)", c: "var(--brand-purple)", h: "Innovation", p: "We stay on the frontier of AI and bring it down to earth — practical tools people can use today." },
    { ic: "fa-award", grad: "var(--grad-orange)", c: "var(--brand-primary)", h: "Excellence", p: "Whether it’s a lesson or a launch, we ship work we’re proud to put our name on." },
    { ic: "fa-handshake-angle", grad: "var(--grad-green)", c: "var(--success-dark)", h: "Integrity", p: "Honest guidance, real outcomes, no hype. We measure success by your results, not our revenue." },
    { ic: "fa-heart", grad: "var(--grad-pink)", c: "var(--pink)", h: "Customer Success", p: "Mentorship and support that lasts beyond the sale — your growth is the point of everything we do." },
  ],
};

export const aboutTeam: { eyebrow: string; title: string; sub: string; members: TeamMember[] } = {
  eyebrow: "Leadership & Mentors",
  title: "The people teaching and building",
  sub: "A small, senior team of practitioners who code, ship, and mentor — every single week.",
  members: [
    { initials: "GS", n: "Gautam Shukla", role: "Full-Stack & AI", p: "Full-Stack Developer and AI & Data Science expert leading both the curriculum and the technology studio." },
    { initials: "SM", n: "Shashank Mathur", role: "AI Solutions Lead", p: "Agentic AI specialist designing automation and AI systems for learners and business clients alike." },
    { initials: "AV", n: "Ananya Verma", role: "Head of Learning", p: "Builds project-based programs and mentorship tracks that turn theory into job-ready, portfolio-worthy skills." },
    { initials: "RK", n: "Rohit Kashyap", role: "Lead Product Engineer", p: "Ships the LMS, ERP, and web products — and brings real production patterns back into the classroom." },
  ],
};

export const aboutTestimonials: { eyebrow: string; title: string; items: Testimonial[] } = {
  eyebrow: "Success Stories",
  title: "What our community says",
  items: [
    { stars: 5, q: "I went from knowing nothing about AI to automating half my office work and landing a 40% salary hike. The project-based approach made all the difference.", n: "Aniket Sharma", r: "Data Analyst · Program Alumnus", grad: "var(--grad-brand)", initials: "AS" },
    { stars: 5, q: "Univerzia built our institute’s LMS and trained our staff to run it. One partner for both — it saved us months and the platform is genuinely excellent.", n: "Dr. Meera Nair", r: "Director, Skill Academy", grad: "var(--grad-orange)", initials: "MN" },
    { stars: 5, q: "The mentors actually build software for a living, so the advice is real. My portfolio finally looks like a working engineer’s, not a student’s.", n: "Pooja Iyer", r: "AI Developer · Program Alumna", grad: "var(--grad-green)", initials: "PI" },
  ],
};

export const aboutCta: CtaBlock = {
  title: "Let’s build your AI advantage",
  sub: "Whether you want to future-proof your career or your company, we’d love to talk. Start a conversation today.",
  actions: [
    { label: "Contact Us", href: "/contact", kind: "primary" },
    { label: "Book a Demo", href: "/contact#quick", kind: "ghost-dark" },
    { label: "Explore Services", href: "/services", kind: "ghost-dark" },
  ],
};
