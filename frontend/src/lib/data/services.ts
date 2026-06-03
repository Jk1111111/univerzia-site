/* ═══════════════════════════════════════════════════════════════
   Univerzia AI — Services data (TypeScript port)
   Sources: ui_kits/services/svc-data.js + svc-data-products.js
   Hub + 5 service detail pages (erp, lms, website_design,
   website_development, e_commerce).
   ═══════════════════════════════════════════════════════════════ */

/* ── Shared building blocks ─────────────────────────────────── */
export interface StatItem {
  v: string;
  suffix: string;
  l: string;
}

export interface IconCard {
  ic: string;
  c?: string;
  bg?: string;
  t: string;
  d: string;
  brand?: boolean;
}

export interface PointItem {
  t: string;
  d: string;
}

export interface CtaAction {
  label: string;
  style: "primary" | "soft" | "ghost";
}

export interface CtaBlock {
  title: string;
  sub: string;
  actions: CtaAction[];
}

export interface SectionBlock<T> {
  eyebrow: string;
  title: string;
  sub: string;
  items: T[];
}

/* ── Hub ────────────────────────────────────────────────────── */
export interface HubServiceCard {
  key: string;
  /** URL slug under /services (hyphenated) */
  slug: string;
  icon: string;
  c: string;
  badge: string;
  size: "feat" | "third";
  title: string;
  desc: string;
  tags: string[];
}

export interface ServicesHub {
  hero: {
    pill: string;
    title: [string, string];
    sub: string;
    primary: { label: string };
    secondary: { label: string };
  };
  stats: StatItem[];
  services: HubServiceCard[];
  more: string[];
  why: SectionBlock<{ ic: string; t: string; d: string }>;
  cta: CtaBlock;
}

/* ── Service detail page ────────────────────────────────────── */
export interface ServiceHero {
  pill: [string, string];
  title: [string, string];
  lead: string;
  bullets: string[];
  primary: { label: string };
  secondary: { label: string };
  trust: { rating: string; text: string };
  mock: "browser" | "app";
}

export interface ServiceOverview {
  eyebrow: string;
  title: string;
  side: "left" | "right";
  mock: "browser" | "app";
  paras: string[];
  points: PointItem[];
}

export interface ServiceFaqItem {
  q: string;
  a: string[];
}

export interface ServiceExtra {
  id: string;
  layout: "why" | "solutions";
  eyebrow: string;
  title: string;
  sub: string;
  items: IconCard[];
}

export interface ServiceDetail {
  navLabel: string;
  icon: string;
  c: string;
  c2: string;
  cDark: string;
  cLight: string;
  product?: boolean;
  subnav: [string, string][];
  hero: ServiceHero;
  stats: StatItem[];
  logos?: string[];
  features: SectionBlock<IconCard>;
  overview: ServiceOverview;
  modules?: SectionBlock<IconCard>;
  solutions: SectionBlock<IconCard>;
  extras?: ServiceExtra[];
  why?: SectionBlock<{ ic: string; t: string; d: string }>;
  process: SectionBlock<{ ic: string; t: string; d: string }>;
  benefits?: SectionBlock<{ v: string; l: string }>;
  testimonials: SectionBlock<{ q: string; n: string; r: string; rating: number }>;
  faq: SectionBlock<ServiceFaqItem>;
  cta: CtaBlock;
}

export type ServiceKey =
  | "erp"
  | "lms"
  | "website_design"
  | "website_development"
  | "e_commerce";

export interface ServicesData {
  hub: ServicesHub;
  services: Record<ServiceKey, ServiceDetail>;
}

/* ═══════════════════════════════════════════════════════════════
   Slug ↔ data-key mapping helpers
   ═══════════════════════════════════════════════════════════════ */
export const serviceSlugs = [
  "erp",
  "lms",
  "website-design",
  "website-development",
  "e-commerce",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

const slugToKey: Record<ServiceSlug, ServiceKey> = {
  erp: "erp",
  lms: "lms",
  "website-design": "website_design",
  "website-development": "website_development",
  "e-commerce": "e_commerce",
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const key = slugToKey[slug as ServiceSlug];
  return key ? services[key] : undefined;
}

/* ═══════════════════════════════════════════════════════════════
   HUB
   ═══════════════════════════════════════════════════════════════ */
export const hub: ServicesHub = {
  hero: {
    pill: "Univerzia AI · Technology Services",
    title: [
      "Enterprise software & digital products that ",
      "move institutions forward",
    ],
    sub: "From flagship ERP and LMS platforms to high-converting websites and stores — one partner to design, build, and scale the technology your organization runs on.",
    primary: { label: "Book a Demo" },
    secondary: { label: "Talk to Sales" },
  },
  stats: [
    { v: "50", suffix: "+", l: "Clients served" },
    { v: "500", suffix: "+", l: "Users onboarded" },
    { v: "96", suffix: "%", l: "Project success rate" },
    { v: "12", suffix: "+", l: "Industries served" },
  ],
  services: [
    {
      key: "erp",
      slug: "erp",
      icon: "fa-cubes",
      c: "#2563EB",
      badge: "Flagship",
      size: "feat",
      title: "Univerzia ERP",
      desc: "The all-in-one institution operating system — admissions to finance, HR to hostel, on one secure, automated platform.",
      tags: ["15+ modules", "Automation", "Analytics", "Role-based access"],
    },
    {
      key: "lms",
      slug: "lms",
      icon: "fa-graduation-cap",
      c: "#6366F1",
      badge: "Flagship",
      size: "feat",
      title: "Univerzia LMS",
      desc: "World-class learning platforms built on certified Moodle™ & IOMAD expertise — for schools, universities, and corporate training.",
      tags: ["Moodle / IOMAD", "Multi-tenant", "Gamified", "Managed cloud"],
    },
    {
      key: "website_design",
      slug: "website-design",
      icon: "fa-palette",
      c: "#7C3AED",
      badge: "Service",
      size: "third",
      title: "Website Design",
      desc: "Conversion-first UI/UX that turns visitors into customers — custom brand identity, mobile-first, accessible.",
      tags: ["UI/UX", "Branding", "CRO"],
    },
    {
      key: "website_development",
      slug: "website-development",
      icon: "fa-laptop-code",
      c: "#06B6D4",
      badge: "Service",
      size: "third",
      title: "Website Development",
      desc: "Robust, scalable engineering — full-stack web apps, APIs, PWAs and CMS platforms built to perform.",
      tags: ["Full-stack", "APIs", "PWA"],
    },
    {
      key: "e_commerce",
      slug: "e-commerce",
      icon: "fa-cart-shopping",
      c: "#F97316",
      badge: "Service",
      size: "third",
      title: "E-Commerce",
      desc: "Secure, high-converting online stores with payments, inventory automation and omnichannel sales.",
      tags: ["Shopify / Woo", "Payments", "Inventory"],
    },
  ],
  more: [
    "Digital Marketing & SEO",
    "App Development",
    "AI Automation",
    "Cloud Hosting",
    "Maintenance & Support",
  ],
  why: {
    eyebrow: "Why Univerzia",
    title: "Partners in your success, not just another vendor",
    sub: "We align to your business outcomes and back every engagement with enterprise-grade rigor.",
    items: [
      {
        ic: "fa-handshake",
        t: "Partners, Not Vendors",
        d: "We align deeply with your goals and treat your success as our own metric for quality.",
      },
      {
        ic: "fa-rocket",
        t: "Results-Driven",
        d: "We focus on tangible outcomes: more leads, higher sales, and measurable engagement.",
      },
      {
        ic: "fa-shield-halved",
        t: "Enterprise Security",
        d: "Strict security standards protect your data and your users' privacy at every layer.",
      },
      {
        ic: "fa-lightbulb",
        t: "Innovation First",
        d: "We leverage AI, cloud and modern web to keep you ahead of the competition.",
      },
    ],
  },
  cta: {
    title: "Let's build what's next, together",
    sub: "Book a free consultation and we'll map the fastest path from where you are to a platform your team and customers love.",
    actions: [
      { label: "Book a Demo", style: "primary" },
      { label: "Contact Sales", style: "ghost" },
      { label: "Schedule Consultation", style: "ghost" },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   SERVICE DETAIL PAGES
   ═══════════════════════════════════════════════════════════════ */
export const services: Record<ServiceKey, ServiceDetail> = {
  /* ── WEBSITE DESIGN ───────────────────────────────────────── */
  website_design: {
    navLabel: "Website Design",
    icon: "fa-palette",
    c: "#7C3AED",
    c2: "#A78BFA",
    cDark: "#6D28D9",
    cLight: "#C4B5FD",
    subnav: [
      ["Features", "features"],
      ["Process", "process"],
      ["Industries", "solutions"],
      ["FAQ", "faq"],
    ],
    hero: {
      pill: ["fa-palette", "Website Design Services"],
      title: ["Websites designed to ", "convert, not just impress"],
      lead: "First impressions decide everything. We craft digital experiences that build instant trust and turn visitors into loyal customers — through intuitive UI/UX backed by conversion science.",
      bullets: [
        "Custom brand identity",
        "Mobile-first & responsive",
        "Built for conversions",
      ],
      primary: { label: "Start Your Project" },
      secondary: { label: "See Our Work" },
      trust: { rating: "4.9/5", text: "from 50+ happy clients" },
      mock: "browser",
    },
    stats: [
      { v: "200", suffix: "+", l: "Sites designed" },
      { v: "2.4", suffix: "x", l: "Avg. conversion lift" },
      { v: "98", suffix: "%", l: "Client satisfaction" },
      { v: "30", suffix: " days", l: "Typical delivery" },
    ],
    features: {
      eyebrow: "What we deliver",
      title: "Design that works as hard as you do",
      sub: "Every pixel earns its place — beautiful, usable, and engineered to drive action.",
      items: [
        {
          ic: "fa-fingerprint",
          c: "#7C3AED",
          bg: "#F5F3FF",
          t: "Custom Brand Identity",
          d: "A distinct visual language — logo, palette, type and motion — that makes your brand unmistakable.",
        },
        {
          ic: "fa-mobile-screen",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Mobile-First Responsive",
          d: "Flawless experiences on every device, designed for the screens your customers actually use.",
        },
        {
          ic: "fa-bullseye",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "Conversion Optimization",
          d: "Layouts, copy and CTAs shaped by CRO best practices to maximize leads and sales.",
        },
        {
          ic: "fa-vector-square",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Interactive Prototyping",
          d: "Click-through prototypes so you experience and refine the product before a line of code.",
        },
        {
          ic: "fa-universal-access",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Accessibility Compliance",
          d: "WCAG-aligned design that's usable by everyone — and ranks better while it's at it.",
        },
        {
          ic: "fa-route",
          c: "#D946EF",
          bg: "#FDF4FF",
          t: "User Journey Mapping",
          d: "We design the full path from first click to conversion, removing friction at every step.",
        },
      ],
    },
    overview: {
      eyebrow: "Design philosophy",
      title: "Strategy first. Beauty always.",
      side: "right",
      mock: "browser",
      paras: [
        "Great design isn't decoration — it's how your business communicates value in three seconds. We start with your goals and audience, then craft an interface that earns trust and guides action.",
        "From static brochures to dynamic portals and storefronts, every project is tailored to its purpose.",
      ],
      points: [
        {
          t: "Research-led",
          d: "Audience, competitors and journey mapped before we design.",
        },
        {
          t: "Design systems",
          d: "Reusable components keep your brand consistent as you grow.",
        },
        {
          t: "Handoff-ready",
          d: "Pixel-perfect specs your developers will love.",
        },
      ],
    },
    solutions: {
      eyebrow: "We design for every need",
      title: "From simple sites to complex platforms",
      sub: "Whatever the brief, we have a proven design approach for it.",
      items: [
        {
          ic: "fa-file-code",
          c: "#7C3AED",
          t: "Static & Landing",
          d: "Fast, focused pages that load instantly and convert hard.",
        },
        {
          ic: "fa-gears",
          c: "#6366F1",
          t: "Dynamic Websites",
          d: "Personalized, data-driven experiences that adapt to each visitor.",
        },
        {
          ic: "fa-building",
          c: "#0EA5E9",
          t: "Corporate Sites",
          d: "Professional, credible presences that win trust and partnerships.",
        },
        {
          ic: "fa-cart-shopping",
          c: "#F97316",
          t: "E-Commerce",
          d: "Intuitive storefronts engineered for a frictionless checkout.",
        },
        {
          ic: "fa-lightbulb",
          c: "#F59E0B",
          t: "Idea-Based",
          d: "Unique, memorable concepts that bring a bold vision to life.",
        },
        {
          ic: "fa-globe",
          c: "#10B981",
          t: "Web Portals",
          d: "Central hubs that streamline access for communities and teams.",
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "A proven path from idea to launch",
      sub: "Transparent milestones at every stage — you always know what's next.",
      items: [
        {
          ic: "fa-list-check",
          t: "Requirement Gathering",
          d: "We define objectives, audience and scope to set a clear vision.",
        },
        {
          ic: "fa-magnifying-glass-chart",
          t: "Research & Planning",
          d: "Audience, competitor and trend analysis to inform every decision.",
        },
        {
          ic: "fa-pen-ruler",
          t: "Wireframe & Design",
          d: "Layout, color and type brought together into a polished UI.",
        },
        {
          ic: "fa-code",
          t: "Development",
          d: "Clean, tested build that turns the design into a living product.",
        },
        {
          ic: "fa-rocket",
          t: "Launch & Support",
          d: "We ship, monitor and keep improving after go-live.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Client stories",
      title: "Brands that trusted us with their first impression",
      sub: "",
      items: [
        {
          q: "Our new site doubled demo requests in the first month. The design finally matches the quality of our product.",
          n: "Rohan Mehta",
          r: "Founder, FinEdge",
          rating: 5,
        },
        {
          q: "They understood our brand better than we did. Every page feels intentional and on-message.",
          n: "Ayesha Khan",
          r: "Marketing Head, Lumina",
          rating: 5,
        },
        {
          q: "Beautiful, fast, and incredibly easy for our team to update. Exactly what we needed.",
          n: "Vikram Sethi",
          r: "Director, Northstar Realty",
          rating: 5,
        },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "Website design FAQs",
      sub: "",
      items: [
        {
          q: "Why is good website design important for my business?",
          a: [
            "A well-designed site builds instant credibility and trust — visitors judge your business within seconds of arriving. Beyond first impressions, thoughtful design creates a positive user experience that helps people find what they need quickly, improving engagement and reducing bounce rates.",
            "In short: good design directly impacts how many visitors become customers.",
          ],
        },
        {
          q: "How long does it take to design a website?",
          a: [
            "It depends on size and complexity. A standard 5–15 page website typically takes around 30 days, while a larger custom platform with advanced features can take a few months.",
            "At kickoff we run requirement gathering and share a timeline with clear milestones so both sides know exactly what to expect.",
          ],
        },
        {
          q: "Can I see examples of your previous work?",
          a: [
            "Absolutely. You can browse our portfolio or request specific case studies from your account manager — we've designed sites across many industries and love sharing relevant examples.",
          ],
        },
        {
          q: "How much does website design cost?",
          a: [
            "Cost depends on scope. Once we understand your full requirements we share a fixed cost and timeline. As a guide, our website design engagements start at INR 1,00,000 (≈ USD 1,200).",
          ],
        },
        {
          q: "Can I update the website myself after handover?",
          a: [
            "Yes. For dynamic or CMS-backed sites you get full control over content — text, images, videos and more — with training so your team stays self-sufficient.",
          ],
        },
      ],
    },
    cta: {
      title: "Ready for a website you're proud of?",
      sub: "Tell us about your project and get a free design consultation with a clear scope, timeline and quote — no obligation.",
      actions: [
        { label: "Start Your Project", style: "primary" },
        { label: "Book a Demo", style: "soft" },
        { label: "Talk to an Advisor", style: "ghost" },
      ],
    },
  },

  /* ── WEBSITE DEVELOPMENT ──────────────────────────────────── */
  website_development: {
    navLabel: "Website Development",
    icon: "fa-laptop-code",
    c: "#06B6D4",
    c2: "#22D3EE",
    cDark: "#0E7490",
    cLight: "#67E8F9",
    subnav: [
      ["Capabilities", "features"],
      ["Stack", "overview"],
      ["Industries", "solutions"],
      ["Process", "process"],
      ["FAQ", "faq"],
    ],
    hero: {
      pill: ["fa-laptop-code", "Web Development Services"],
      title: ["Engineering the ", "digital infrastructure that scales"],
      lead: "Robust, secure, high-performance web applications built with modern technologies. We build the platforms your business growth depends on — fast, reliable, and ready for scale.",
      bullets: [
        "Enterprise-grade security",
        "Scalable cloud architecture",
        "Custom API integrations",
      ],
      primary: { label: "Start Building" },
      secondary: { label: "View Capabilities" },
      trust: { rating: "99.9%", text: "uptime across deployments" },
      mock: "browser",
    },
    stats: [
      { v: "8", suffix: "+", l: "Core technologies" },
      { v: "99.9", suffix: "%", l: "Deployment uptime" },
      { v: "40", suffix: "%", l: "Faster load times" },
      { v: "24/7", suffix: "", l: "Monitoring & support" },
    ],
    logos: [
      "PHP",
      "Laravel",
      "React.js",
      "Node.js",
      "Django",
      "WordPress",
      "Next.js",
      "Moodle",
    ],
    features: {
      eyebrow: "Capabilities",
      title: "Full-stack engineering, end to end",
      sub: "From marketing sites to complex internal platforms — we build it right and build it to last.",
      items: [
        {
          ic: "fa-desktop",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "HTML5 Websites",
          d: "Fast, standards-compliant sites — static or dynamic — built for speed and SEO.",
        },
        {
          ic: "fa-code",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Web Applications",
          d: "Dynamic, database-driven apps for e-commerce, portals and interactive tools.",
        },
        {
          ic: "fa-wordpress",
          brand: true,
          c: "#3858E9",
          bg: "#EEF2FF",
          t: "WordPress Development",
          d: "Expert CMS builds on the world's leading platform — flexible and easy to manage.",
        },
        {
          ic: "fa-network-wired",
          c: "#0EA5E9",
          bg: "#F0F9FF",
          t: "Internal Web Apps",
          d: "Secure internal tools that streamline workflows and team collaboration.",
        },
        {
          ic: "fa-cart-shopping",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "E-Commerce Apps",
          d: "Conversion-focused stores that turn visitors into repeat customers.",
        },
        {
          ic: "fa-chart-line",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "ERP & CRM Apps",
          d: "Custom business systems that manage operations and client relationships.",
        },
      ],
    },
    overview: {
      eyebrow: "Beyond development",
      title: "Innovation and strategy, baked in",
      side: "left",
      mock: "app",
      paras: [
        "We don't just write code — we engineer outcomes. Every build pairs the best user interface with quality architecture so your platform is a pleasure to use and a breeze to scale.",
        "Intuitive interfaces, clean codebases, and performance optimization come standard.",
      ],
      points: [
        {
          t: "Best-in-class UI",
          d: "Engaging, intuitive interfaces that boost usability and satisfaction.",
        },
        {
          t: "Quality web design",
          d: "Aesthetics and function merged for genuine user engagement.",
        },
        {
          t: "Scalable by design",
          d: "Cloud-native architecture that grows with your traffic.",
        },
      ],
    },
    solutions: {
      eyebrow: "Industries we empower",
      title: "Digital solutions across every sector",
      sub: "Tailored strategies and robust platforms that drive growth in diverse industries.",
      items: [
        {
          ic: "fa-cart-shopping",
          c: "#3b82f6",
          t: "Retail & E-commerce",
          d: "Robust, secure storefronts that turn visitors into loyal customers.",
        },
        {
          ic: "fa-heart-pulse",
          c: "#10b981",
          t: "Healthcare & Medical",
          d: "Compliant platforms that streamline appointments and patient data.",
        },
        {
          ic: "fa-graduation-cap",
          c: "#f59e0b",
          t: "EdTech & Learning",
          d: "Interactive LMS platforms that engage students and simplify admin.",
        },
        {
          ic: "fa-plane-departure",
          c: "#06b6d4",
          t: "Travel & Hospitality",
          d: "Immersive booking experiences and seamless itinerary management.",
        },
        {
          ic: "fa-building-columns",
          c: "#6366f1",
          t: "FinTech & Banking",
          d: "High-security portals that prioritize data protection and ease.",
        },
        {
          ic: "fa-city",
          c: "#8b5cf6",
          t: "Real Estate",
          d: "HD property galleries and smart search that close deals faster.",
        },
      ],
    },
    process: {
      eyebrow: "How we deliver",
      title: "Agile delivery, predictable outcomes",
      sub: "Process-driven execution that ships flawless projects on time.",
      items: [
        {
          ic: "fa-list-check",
          t: "Discovery",
          d: "We map purpose, audience and functional requirements into a roadmap.",
        },
        {
          ic: "fa-pen-ruler",
          t: "Architecture",
          d: "We design the data model, stack and infrastructure for scale.",
        },
        {
          ic: "fa-code",
          t: "Development",
          d: "Latest technologies, clean code, continuous client communication.",
        },
        {
          ic: "fa-bug-slash",
          t: "Testing & QA",
          d: "Rigorous testing across devices, browsers and security.",
        },
        {
          ic: "fa-cloud-arrow-up",
          t: "Deploy & Support",
          d: "Smooth launch plus 24/7 monitoring and ongoing maintenance.",
        },
      ],
    },
    benefits: {
      eyebrow: "Business impact",
      title: "Why a great website transforms your business",
      sub: "Your platform is a 24/7 employee — showcasing your brand, engaging customers, and growing revenue.",
      items: [
        { v: "24/7", l: "Always-on showcase for your brand and offering" },
        { v: "+58%", l: "Average lift in qualified inbound leads" },
        { v: "3x", l: "Faster internal workflows with custom tools" },
        { v: "99.9%", l: "Reliable uptime your customers can count on" },
      ],
    },
    testimonials: {
      eyebrow: "Client stories",
      title: "Engineered for teams that can't afford downtime",
      sub: "",
      items: [
        {
          q: "They rebuilt our platform to handle 10x the traffic without breaking a sweat. Rock-solid engineering.",
          n: "Sandeep Rao",
          r: "CTO, QuickServe",
          rating: 5,
        },
        {
          q: "Clean code, great documentation, and a team that genuinely cares about performance. Highly recommend.",
          n: "Meera Joshi",
          r: "Product Lead, HealthBridge",
          rating: 5,
        },
        {
          q: "Our internal tools used to be a mess. Now everything is one fast, secure platform. Game changer.",
          n: "Arjun Nair",
          r: "Ops Director, TransGo",
          rating: 5,
        },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "Web development FAQs",
      sub: "",
      items: [
        {
          q: "Which technologies do you build with?",
          a: [
            "We work across a modern stack — PHP & Laravel, React.js, Node.js, Python/Django, WordPress, Next.js and Moodle — choosing the right tools for your project's goals, scale and budget.",
          ],
        },
        {
          q: "Can you integrate with our existing systems?",
          a: [
            "Yes. Custom API integrations are a core strength. We connect to CRMs, ERPs, payment gateways, SSO providers and third-party services to create one unified, automated workflow.",
          ],
        },
        {
          q: "How do you ensure security and performance?",
          a: [
            "Security and speed are built in, not bolted on. We follow enterprise security standards, optimize databases and assets for fast load times, and run rigorous QA across devices and browsers before launch.",
          ],
        },
        {
          q: "Do you provide ongoing maintenance?",
          a: [
            "Absolutely. We offer 24/7 monitoring, regular updates, and dedicated support plans so your platform stays secure, fast and reliable long after launch.",
          ],
        },
      ],
    },
    cta: {
      title: "Let's build something that scales",
      sub: "Bring us your toughest engineering challenge. We'll architect a solution that's fast, secure, and ready to grow with you.",
      actions: [
        { label: "Start Building", style: "primary" },
        { label: "Book a Demo", style: "soft" },
        { label: "Contact Sales", style: "ghost" },
      ],
    },
  },

  /* ── E-COMMERCE ───────────────────────────────────────────── */
  e_commerce: {
    navLabel: "E-Commerce",
    icon: "fa-cart-shopping",
    c: "#F97316",
    c2: "#FB923C",
    cDark: "#C2410C",
    cLight: "#FDBA74",
    subnav: [
      ["Features", "features"],
      ["Platforms", "solutions"],
      ["Process", "process"],
      ["FAQ", "faq"],
    ],
    hero: {
      pill: ["fa-cart-shopping", "E-Commerce Development"],
      title: ["Turn traffic into ", "revenue, around the clock"],
      lead: "Secure, high-converting online stores that deliver seamless shopping experiences. We build the e-commerce engines that let you reach a global audience and sell while you sleep.",
      bullets: [
        "Secure payment gateways",
        "Inventory automation",
        "Omnichannel selling",
      ],
      primary: { label: "Launch Your Store" },
      secondary: { label: "See Platforms" },
      trust: { rating: "4.9/5", text: "store owner satisfaction" },
      mock: "browser",
    },
    stats: [
      { v: "120", suffix: "+", l: "Stores launched" },
      { v: "3.1", suffix: "x", l: "Avg. revenue growth" },
      { v: "99.9", suffix: "%", l: "Checkout uptime" },
      { v: "60", suffix: "+", l: "Payment methods" },
    ],
    features: {
      eyebrow: "What's included",
      title: "Everything you need to sell online",
      sub: "A complete commerce stack — built to convert, automate, and scale with demand.",
      items: [
        {
          ic: "fa-shop",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "Custom Storefronts",
          d: "Shopify, WooCommerce or fully custom — beautiful stores tailored to your brand.",
        },
        {
          ic: "fa-credit-card",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Secure Payments",
          d: "Trusted, PCI-compliant gateways with support for cards, UPI, wallets and more.",
        },
        {
          ic: "fa-boxes-stacked",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Inventory Automation",
          d: "Real-time stock sync, low-stock alerts and automated order management.",
        },
        {
          ic: "fa-tower-broadcast",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Omnichannel Sales",
          d: "Sell on web, mobile and marketplaces from one unified dashboard.",
        },
        {
          ic: "fa-wand-magic-sparkles",
          c: "#D946EF",
          bg: "#FDF4FF",
          t: "Personalized Recommendations",
          d: "AI-driven product suggestions that lift average order value.",
        },
        {
          ic: "fa-gauge-high",
          c: "#F59E0B",
          bg: "#FFFBEB",
          t: "Speed Optimization",
          d: "Lightning-fast pages that keep shoppers engaged and reduce cart abandonment.",
        },
      ],
    },
    overview: {
      eyebrow: "Commerce philosophy",
      title: "Built to convert, engineered to scale",
      side: "right",
      mock: "browser",
      paras: [
        "A great store is more than a catalog — it's a conversion machine. We obsess over the details that move the needle: page speed, frictionless checkout, and trust signals that turn browsers into buyers.",
        "Behind the storefront, automation keeps inventory, orders and fulfillment flowing without manual effort.",
      ],
      points: [
        {
          t: "Conversion-first",
          d: "Every flow tuned to reduce friction and lift sales.",
        },
        {
          t: "Automation built-in",
          d: "Stock, orders and shipping sync without manual work.",
        },
        {
          t: "Scales with demand",
          d: "Infrastructure that handles peak traffic with ease.",
        },
      ],
    },
    solutions: {
      eyebrow: "Built on the right platform",
      title: "We develop on the technology you need",
      sub: "Need-based development matched to your products, scale and budget.",
      items: [
        {
          ic: "fa-bag-shopping",
          c: "#95BF47",
          t: "Shopify",
          d: "Fast to launch, easy to manage — ideal for growing D2C brands.",
        },
        {
          ic: "fa-wordpress",
          brand: true,
          c: "#7F54B3",
          t: "WooCommerce",
          d: "Flexible, open-source commerce with limitless customization.",
        },
        {
          ic: "fa-store",
          c: "#F26322",
          t: "Magento",
          d: "Enterprise-grade power for large catalogs and complex needs.",
        },
        {
          ic: "fa-code",
          c: "#F97316",
          t: "Custom Build",
          d: "A bespoke store engineered exactly to your unique requirements.",
        },
        {
          ic: "fa-mobile-screen",
          c: "#6366F1",
          t: "Mobile Commerce",
          d: "Native-feeling shopping apps and PWAs for on-the-go buyers.",
        },
        {
          ic: "fa-truck-fast",
          c: "#10B981",
          t: "Logistics Integrations",
          d: "Connect shipping, tax and fulfillment for end-to-end automation.",
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "Agile delivery for a flawless launch",
      sub: "Process-driven execution from first idea to first sale.",
      items: [
        {
          ic: "fa-list-check",
          t: "Requirement Gathering",
          d: "We define your products, audience and functionality into a clear plan.",
        },
        {
          ic: "fa-magnifying-glass-chart",
          t: "Research & Planning",
          d: "Industry, competitor and audience analysis shapes the strategy.",
        },
        {
          ic: "fa-pen-ruler",
          t: "Wireframe & Design",
          d: "We map the store layout and checkout flow before we build.",
        },
        {
          ic: "fa-code",
          t: "Development",
          d: "Secure, optimized build with payments, inventory and integrations.",
        },
        {
          ic: "fa-bug-slash",
          t: "Testing & Launch",
          d: "Rigorous QA on security and devices, then a smooth go-live.",
        },
      ],
    },
    benefits: {
      eyebrow: "Why it pays off",
      title: "Commerce that grows itself",
      sub: "Automation and optimization compound into real, measurable revenue.",
      items: [
        { v: "3.1x", l: "Average revenue growth after launch" },
        { v: "-32%", l: "Reduction in cart abandonment" },
        { v: "+24%", l: "Higher average order value with AI recs" },
        { v: "24/7", l: "Sales that never clock out" },
      ],
    },
    testimonials: {
      eyebrow: "Store owner stories",
      title: "Brands that scaled with us",
      sub: "",
      items: [
        {
          q: "We went from spreadsheet chaos to a fully automated store. Orders just flow now — and sales tripled.",
          n: "Neha Agarwal",
          r: "Founder, Bloom & Co",
          rating: 5,
        },
        {
          q: "The checkout is so smooth our abandonment dropped overnight. Best investment we've made.",
          n: "Karan Malhotra",
          r: "Owner, UrbanGear",
          rating: 5,
        },
        {
          q: "Inventory used to be a nightmare. Now it syncs everywhere automatically. Pure relief.",
          n: "Divya Pillai",
          r: "Director, Spice Route",
          rating: 5,
        },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "E-commerce FAQs",
      sub: "",
      items: [
        {
          q: "How long does it take to build an e-commerce store?",
          a: [
            "It depends on complexity, catalog size and the features you need. A focused store can launch in 4–6 weeks, while a larger custom solution may take a few months. We share a milestone timeline upfront.",
          ],
        },
        {
          q: "Do you work with ready-made themes or custom designs?",
          a: [
            "Both. We can customize a premium theme for faster, lower-cost deployment, or design a fully custom store from scratch to perfectly match your brand and functional needs.",
          ],
        },
        {
          q: "How much e-commerce experience do you have?",
          a: [
            "Extensive. We've delivered successful stores across WooCommerce, Shopify and Magento, with deep expertise in payment integration, inventory and conversion optimization.",
          ],
        },
        {
          q: "Is my store secure for online payments?",
          a: [
            "Yes. We integrate trusted, PCI-compliant payment gateways and follow strict security standards to protect every transaction and your customers' data.",
          ],
        },
      ],
    },
    cta: {
      title: "Ready to start selling?",
      sub: "Let's build a store that turns browsers into buyers and scales effortlessly with your growth.",
      actions: [
        { label: "Launch Your Store", style: "primary" },
        { label: "Book a Demo", style: "soft" },
        { label: "Get Started", style: "ghost" },
      ],
    },
  },

  /* ── UNIVERZIA LMS ────────────────────────────────────────── */
  lms: {
    navLabel: "Univerzia LMS",
    icon: "fa-graduation-cap",
    c: "#6366F1",
    c2: "#06B6D4",
    cDark: "#4F46E5",
    cLight: "#A5B4FC",
    product: true,
    subnav: [
      ["Features", "features"],
      ["Modules", "modules"],
      ["Who it's for", "solutions"],
      ["Process", "process"],
      ["FAQ", "faq"],
    ],
    hero: {
      pill: ["fa-graduation-cap", "Univerzia LMS · Learning Platform"],
      title: ["The learning platform your ", "institution deserves"],
      lead: "Effortless learning management for schools, universities and companies — enriching the Moodle™ experience with certified expertise, multi-tenant power and managed cloud hosting.",
      bullets: [
        "Certified Moodle™ & IOMAD",
        "Multi-tenant ready",
        "Managed cloud hosting",
      ],
      primary: { label: "Book a Demo" },
      secondary: { label: "Explore Modules" },
      trust: { rating: "Official", text: "Moodle partner expertise" },
      mock: "app",
    },
    stats: [
      { v: "10", suffix: "+ yrs", l: "Moodle expertise" },
      { v: "1M", suffix: "+", l: "Learners supported" },
      { v: "99.9", suffix: "%", l: "Platform uptime" },
      { v: "24/7", suffix: "", l: "Managed support" },
    ],
    features: {
      eyebrow: "Platform strengths",
      title: "Enterprise learning, beautifully managed",
      sub: "Everything you need to deliver world-class learning — without the operational headache.",
      items: [
        {
          ic: "fa-graduation-cap",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Certified Moodle™ Expertise",
          d: "Over a decade deploying mission-critical learning environments as official Moodle partners.",
        },
        {
          ic: "fa-building",
          c: "#7C3AED",
          bg: "#F5F3FF",
          t: "Multi-Tenant (IOMAD)",
          d: "Run multiple departments, clients or campuses from a single installation — ideal for training providers.",
        },
        {
          ic: "fa-gamepad",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "Gamification & Engagement",
          d: "Boost retention with badges, points, leaderboards and interactive course content.",
        },
        {
          ic: "fa-chart-bar",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Advanced Analytics",
          d: "Track progress, surface knowledge gaps and prove ROI with custom reporting dashboards.",
        },
        {
          ic: "fa-plug",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Seamless Integrations",
          d: "Connect to your HRIS, CRM and SSO — Microsoft 365, Google Workspace and more.",
        },
        {
          ic: "fa-cloud",
          c: "#F59E0B",
          bg: "#FFFBEB",
          t: "Managed Cloud Hosting",
          d: "High-performance, secure, auto-scaling hosting on AWS or Azure. We handle the infra.",
        },
      ],
    },
    overview: {
      eyebrow: "One platform, every need",
      title: "Built for the way modern institutions learn",
      side: "right",
      mock: "app",
      paras: [
        "Whether you're a university, a corporate L&D team or a training franchise, Univerzia LMS adapts to your structure — not the other way around. Custom themes, tailored workflows and your branding, end to end.",
        "We handle setup, migration, hosting and support so your team can focus on teaching.",
      ],
      points: [
        {
          t: "Your brand, your way",
          d: "Fully themed to match your identity across every screen.",
        },
        {
          t: "Scales with you",
          d: "From one classroom to a million learners without re-platforming.",
        },
        {
          t: "Always supported",
          d: "A dedicated team for upgrades, hosting and day-to-day help.",
        },
      ],
    },
    modules: {
      eyebrow: "Core modules",
      title: "Everything a learning operation needs",
      sub: "A complete toolkit for delivering, managing and measuring learning at scale.",
      items: [
        {
          ic: "fa-book-open",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Course Management",
          d: "Build, organize and deliver rich multimedia courses with ease.",
        },
        {
          ic: "fa-file-pen",
          c: "#7C3AED",
          bg: "#F5F3FF",
          t: "Assessments & Quizzes",
          d: "Auto-graded tests, question banks and secure online exams.",
        },
        {
          ic: "fa-certificate",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Certifications",
          d: "Issue branded, verifiable certificates on course completion.",
        },
        {
          ic: "fa-route",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "Learning Paths",
          d: "Guided, sequential journeys that adapt to each learner.",
        },
        {
          ic: "fa-users",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Student Management",
          d: "Enrollment, cohorts, progress and communication in one place.",
        },
        {
          ic: "fa-chalkboard-user",
          c: "#D946EF",
          bg: "#FDF4FF",
          t: "Instructor Management",
          d: "Roles, permissions and tools that empower your educators.",
        },
        {
          ic: "fa-chart-line",
          c: "#F59E0B",
          bg: "#FFFBEB",
          t: "Reporting",
          d: "Granular reports on activity, completion and performance.",
        },
        {
          ic: "fa-chart-pie",
          c: "#0EA5E9",
          bg: "#F0F9FF",
          t: "Analytics",
          d: "Insightful dashboards that turn learning data into decisions.",
        },
      ],
    },
    solutions: {
      eyebrow: "Who it's for",
      title: "One LMS, many learning worlds",
      sub: "Tailored deployments for every kind of learning organization.",
      items: [
        {
          ic: "fa-school",
          c: "#6366F1",
          t: "Schools",
          d: "Engaging digital classrooms that simplify teaching and admin.",
        },
        {
          ic: "fa-building-columns",
          c: "#7C3AED",
          t: "Universities",
          d: "Robust learning systems for thousands of students and faculty.",
        },
        {
          ic: "fa-briefcase",
          c: "#F97316",
          t: "Corporate Training",
          d: "Upskill your workforce with measurable, on-brand programs.",
        },
        {
          ic: "fa-chalkboard",
          c: "#06B6D4",
          t: "Coaching Institutes",
          d: "Deliver courses online and scale beyond your physical classroom.",
        },
        {
          ic: "fa-sitemap",
          c: "#10B981",
          t: "Training Franchises",
          d: "Multi-tenant control across every branch from one console.",
        },
        {
          ic: "fa-landmark",
          c: "#0EA5E9",
          t: "Government & NGOs",
          d: "Large-scale, accessible learning for public programs.",
        },
      ],
    },
    why: {
      eyebrow: "Why Univerzia LMS",
      title: "The partner institutions trust",
      sub: "",
      items: [
        {
          ic: "fa-award",
          t: "Certified Expertise",
          d: "Official Moodle partner experience you can rely on.",
        },
        {
          ic: "fa-sliders",
          t: "Tailored, Not Templated",
          d: "Configured to your exact structure and brand.",
        },
        {
          ic: "fa-lock",
          t: "Secure & Compliant",
          d: "Enterprise security and data privacy by default.",
        },
        {
          ic: "fa-headset",
          t: "End-to-End Support",
          d: "From migration to daily help, we're with you.",
        },
      ],
    },
    process: {
      eyebrow: "Implementation",
      title: "Live in weeks, not months",
      sub: "A guided rollout that gets your learning platform up fast.",
      items: [
        {
          ic: "fa-comments",
          t: "Discovery",
          d: "We learn your structure, goals and branding needs.",
        },
        {
          ic: "fa-pen-ruler",
          t: "Theme & Design",
          d: "Your LMS, beautifully branded to match your identity.",
        },
        {
          ic: "fa-screwdriver-wrench",
          t: "Build & Customize",
          d: "Modules, plugins and workflows configured for you.",
        },
        {
          ic: "fa-database",
          t: "Migration",
          d: "Existing courses and users moved over cleanly.",
        },
        {
          ic: "fa-people-group",
          t: "Training",
          d: "We onboard your admins, instructors and learners.",
        },
        {
          ic: "fa-rocket",
          t: "Launch & Support",
          d: "Go live with managed hosting and 24/7 help.",
        },
      ],
    },
    benefits: {
      eyebrow: "Measurable impact",
      title: "Learning outcomes you can prove",
      sub: "Institutions on Univerzia LMS see real, trackable gains.",
      items: [
        { v: "+47%", l: "Improvement in learner engagement" },
        { v: "-60%", l: "Less time spent on admin tasks" },
        { v: "99.9%", l: "Uptime with managed cloud hosting" },
        { v: "100%", l: "Visibility into progress and ROI" },
      ],
    },
    testimonials: {
      eyebrow: "Customer success",
      title: "Loved by educators and admins alike",
      sub: "",
      items: [
        {
          q: "Migration was seamless and the platform looks exactly like our brand. Our faculty actually enjoy using it.",
          n: "Dr. Anjali Verma",
          r: "Dean, Horizon University",
          rating: 5,
        },
        {
          q: "The multi-tenant setup lets us manage every franchise branch from one dashboard. A total operational win.",
          n: "Suresh Iyer",
          r: "CEO, SkillForge Training",
          rating: 5,
        },
        {
          q: "Analytics finally gave us proof of ROI for our corporate training. Leadership is thrilled.",
          n: "Pooja Reddy",
          r: "L&D Head, Nexus Corp",
          rating: 5,
        },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "Univerzia LMS FAQs",
      sub: "",
      items: [
        {
          q: "Do you build on Moodle or a custom platform?",
          a: [
            "We specialize in Moodle™ and IOMAD — the world's most trusted open-source learning platforms — and tailor them deeply to your needs with custom themes, plugins and integrations. You get the power of Moodle with none of the complexity.",
          ],
        },
        {
          q: "Can you migrate our existing courses and users?",
          a: [
            "Yes. Clean migration is part of every engagement. We move your existing courses, content, users and historical data over carefully, with validation at each step.",
          ],
        },
        {
          q: "Is hosting included?",
          a: [
            "We offer fully managed cloud hosting on AWS or Azure — secure, high-performance and auto-scaling. We handle the infrastructure, backups and uptime so you can focus on teaching.",
          ],
        },
        {
          q: "What about support after launch?",
          a: [
            "You get a dedicated team for upgrades, hosting, security patches and day-to-day help. Our 24/7 managed support keeps your platform running smoothly long after go-live.",
          ],
        },
      ],
    },
    cta: {
      title: "See Univerzia LMS in action",
      sub: "Book a personalized demo and we'll show you exactly how your learning platform could look, branded and configured for your institution.",
      actions: [
        { label: "Book a Demo", style: "primary" },
        { label: "Talk to Sales", style: "soft" },
        { label: "Get a Quote", style: "ghost" },
      ],
    },
  },

  /* ── UNIVERZIA ERP (flagship) ─────────────────────────────── */
  erp: {
    navLabel: "Univerzia ERP",
    icon: "fa-cubes",
    c: "#2563EB",
    c2: "#6366F1",
    cDark: "#1D4ED8",
    cLight: "#93C5FD",
    product: true,
    subnav: [
      ["Platform", "features"],
      ["Architecture", "overview"],
      ["Modules", "modules"],
      ["Security", "extra-security"],
      ["Process", "process"],
      ["FAQ", "faq"],
    ],
    hero: {
      pill: ["fa-cubes", "Univerzia ERP · Institution OS"],
      title: ["Run your entire institution on ", "one intelligent platform"],
      lead: "From admissions to finance, HR to hostel — Univerzia ERP unifies every department into a single, automated source of truth. Less paperwork, fewer silos, real-time insight across your whole organization.",
      bullets: [
        "15+ integrated modules",
        "Automation-first",
        "Real-time analytics",
      ],
      primary: { label: "Book a Demo" },
      secondary: { label: "Explore Modules" },
      trust: { rating: "Enterprise", text: "grade security & compliance" },
      mock: "app",
    },
    stats: [
      { v: "15", suffix: "+", l: "Integrated modules" },
      { v: "50", suffix: "+", l: "Institutions running" },
      { v: "70", suffix: "%", l: "Less manual admin" },
      { v: "99.9", suffix: "%", l: "Uptime SLA" },
    ],
    features: {
      eyebrow: "The platform",
      title: "One operating system for your whole institution",
      sub: "Every capability you'd expect from a global enterprise suite — purpose-built for education.",
      items: [
        {
          ic: "fa-robot",
          c: "#2563EB",
          bg: "#EFF6FF",
          t: "Intelligent Automation",
          d: "Automate admissions, fee reminders, attendance and approvals — eliminate repetitive manual work.",
        },
        {
          ic: "fa-chart-pie",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Real-Time Analytics",
          d: "Live dashboards across every department give leadership a single, current view of operations.",
        },
        {
          ic: "fa-user-shield",
          c: "#7C3AED",
          bg: "#F5F3FF",
          t: "Role-Based Access",
          d: "Granular permissions ensure every user sees exactly what they should — and nothing more.",
        },
        {
          ic: "fa-plug-circle-bolt",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Open Integrations",
          d: "Connect payments, biometric devices, accounting, SSO and the Univerzia LMS out of the box.",
        },
        {
          ic: "fa-cloud",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Cloud-Native",
          d: "Secure, auto-scaling cloud infrastructure accessible anywhere, on any device.",
        },
        {
          ic: "fa-shield-halved",
          c: "#F59E0B",
          bg: "#FFFBEB",
          t: "Security & Compliance",
          d: "Encryption, audit trails and data-privacy controls built in at every layer.",
        },
      ],
    },
    overview: {
      eyebrow: "Ecosystem architecture",
      title: "Unified data. Modular by design.",
      side: "left",
      mock: "app",
      paras: [
        "Univerzia ERP is built on a single, shared data core — so a student record, a fee payment and a hostel allocation all speak the same language. No double entry, no reconciliation, no silos.",
        "Adopt the modules you need today and switch on the rest as you grow. An API-first foundation connects it all to the tools you already use.",
      ],
      points: [
        {
          t: "Single source of truth",
          d: "One unified database powers every module and report.",
        },
        {
          t: "Modular adoption",
          d: "Start with admissions and finance; add modules anytime.",
        },
        {
          t: "API-first",
          d: "Open APIs connect ERP to LMS, payments and third parties.",
        },
      ],
    },
    modules: {
      eyebrow: "15+ modules",
      title: "Every department, one platform",
      sub: "Switch on exactly what your institution needs — they all work together, seamlessly.",
      items: [
        {
          ic: "fa-file-signature",
          c: "#2563EB",
          bg: "#EFF6FF",
          t: "Admissions",
          d: "End-to-end enquiry, application and enrollment workflows.",
        },
        {
          ic: "fa-id-card",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Student Information",
          d: "A 360° record for every student, from profile to performance.",
        },
        {
          ic: "fa-users-gear",
          c: "#7C3AED",
          bg: "#F5F3FF",
          t: "HR Management",
          d: "Staff records, leave, recruitment and lifecycle management.",
        },
        {
          ic: "fa-money-check-dollar",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Payroll",
          d: "Automated salary processing, payslips and statutory compliance.",
        },
        {
          ic: "fa-coins",
          c: "#F59E0B",
          bg: "#FFFBEB",
          t: "Finance",
          d: "Budgets, fee structures, collections and financial control.",
        },
        {
          ic: "fa-book",
          c: "#06B6D4",
          bg: "#ECFEFF",
          t: "Accounts",
          d: "Ledgers, vouchers and reconciliation with accounting integrations.",
        },
        {
          ic: "fa-boxes-stacked",
          c: "#D946EF",
          bg: "#FDF4FF",
          t: "Inventory",
          d: "Track assets, stock and supplies across every campus.",
        },
        {
          ic: "fa-cart-flatbed",
          c: "#0EA5E9",
          bg: "#F0F9FF",
          t: "Procurement",
          d: "Purchase requests, approvals and vendor management.",
        },
        {
          ic: "fa-fingerprint",
          c: "#EF4444",
          bg: "#FEF2F2",
          t: "Attendance",
          d: "Biometric and digital attendance with instant alerts.",
        },
        {
          ic: "fa-pen-to-square",
          c: "#8B5CF6",
          bg: "#F5F3FF",
          t: "Examination",
          d: "Scheduling, grading, result processing and report cards.",
        },
        {
          ic: "fa-bus",
          c: "#F97316",
          bg: "#FFF7ED",
          t: "Transport",
          d: "Routes, vehicles, GPS tracking and trip management.",
        },
        {
          ic: "fa-bed",
          c: "#14B8A6",
          bg: "#F0FDFA",
          t: "Hostel",
          d: "Room allocation, occupancy, mess and visitor management.",
        },
        {
          ic: "fa-book-bookmark",
          c: "#6366F1",
          bg: "#EEF2FF",
          t: "Library",
          d: "Catalog, issue/return, fines and digital resources.",
        },
        {
          ic: "fa-chart-line",
          c: "#2563EB",
          bg: "#EFF6FF",
          t: "Reporting",
          d: "Custom, exportable reports across every module.",
        },
        {
          ic: "fa-chart-simple",
          c: "#10B981",
          bg: "#ECFDF5",
          t: "Analytics",
          d: "Predictive insights and KPI dashboards for leadership.",
        },
      ],
    },
    solutions: {
      eyebrow: "Built for every institution",
      title: "Whatever you run, ERP runs it better",
      sub: "Configurable for the structure and scale of any education organization.",
      items: [
        {
          ic: "fa-school",
          c: "#2563EB",
          t: "K-12 Schools",
          d: "Streamline admissions, fees, attendance and parent communication.",
        },
        {
          ic: "fa-building-columns",
          c: "#6366F1",
          t: "Universities",
          d: "Manage faculties, departments and thousands of students with ease.",
        },
        {
          ic: "fa-chalkboard",
          c: "#7C3AED",
          t: "Coaching Institutes",
          d: "Batches, fees, tests and performance — all in one place.",
        },
        {
          ic: "fa-sitemap",
          c: "#06B6D4",
          t: "Multi-Campus Groups",
          d: "Centralized control with branch-level autonomy across campuses.",
        },
        {
          ic: "fa-briefcase",
          c: "#F97316",
          t: "Corporate L&D",
          d: "Manage internal academies, staff and training operations.",
        },
        {
          ic: "fa-graduation-cap",
          c: "#10B981",
          t: "EdTech Providers",
          d: "A back-office that scales with your learner base.",
        },
      ],
    },
    extras: [
      {
        id: "extra-security",
        layout: "why",
        eyebrow: "Security & compliance",
        title: "Enterprise-grade protection, by default",
        sub: "Your institution's data is sensitive. We treat it that way — at every layer.",
        items: [
          {
            ic: "fa-user-lock",
            t: "Role-Based Access Control",
            d: "Granular, auditable permissions for every role and department.",
          },
          {
            ic: "fa-key",
            t: "Encryption Everywhere",
            d: "Data encrypted in transit and at rest with industry standards.",
          },
          {
            ic: "fa-clipboard-list",
            t: "Audit Trails",
            d: "Every critical action logged for full accountability.",
          },
          {
            ic: "fa-scale-balanced",
            t: "Privacy-Ready",
            d: "Aligned to GDPR and education data-privacy best practices.",
          },
          {
            ic: "fa-database",
            t: "Automated Backups",
            d: "Scheduled, redundant backups protect against any loss.",
          },
          {
            ic: "fa-gauge-high",
            t: "99.9% Uptime SLA",
            d: "Resilient cloud infrastructure your operations can rely on.",
          },
        ],
      },
      {
        id: "extra-integrations",
        layout: "solutions",
        eyebrow: "Connected",
        title: "Plays well with your existing stack",
        sub: "Open APIs and ready-made connectors unify your tools into one workflow.",
        items: [
          {
            ic: "fa-credit-card",
            c: "#10B981",
            t: "Payment Gateways",
            d: "Razorpay, UPI, cards and net banking for online fee collection.",
          },
          {
            ic: "fa-comment-sms",
            c: "#6366F1",
            t: "SMS · Email · WhatsApp",
            d: "Automated notifications to students, staff and parents.",
          },
          {
            ic: "fa-fingerprint",
            c: "#EF4444",
            t: "Biometric Devices",
            d: "Direct integration with attendance and access hardware.",
          },
          {
            ic: "fa-calculator",
            c: "#F59E0B",
            t: "Accounting / Tally",
            d: "Sync finance data with your accounting software.",
          },
          {
            ic: "fa-right-to-bracket",
            c: "#0EA5E9",
            t: "SSO (Google / Microsoft)",
            d: "One secure sign-on across your entire ecosystem.",
          },
          {
            ic: "fa-graduation-cap",
            c: "#7C3AED",
            t: "Univerzia LMS",
            d: "Native link between your ERP and learning platform.",
          },
        ],
      },
    ],
    why: {
      eyebrow: "Why Univerzia ERP",
      title: "More than software — an operating advantage",
      sub: "",
      items: [
        {
          ic: "fa-bullseye",
          t: "Built for Institutions",
          d: "Designed around education workflows, not generic business processes.",
        },
        {
          ic: "fa-layer-group",
          t: "One Source of Truth",
          d: "Unified data eliminates silos, double entry and reconciliation.",
        },
        {
          ic: "fa-wand-magic-sparkles",
          t: "Automation-First",
          d: "Repetitive work disappears so your team focuses on people.",
        },
        {
          ic: "fa-headset",
          t: "Dedicated Support",
          d: "Local, responsive implementation and success teams.",
        },
      ],
    },
    process: {
      eyebrow: "Implementation",
      title: "A guided rollout, de-risked at every step",
      sub: "Our proven methodology gets you live with confidence.",
      items: [
        {
          ic: "fa-comments",
          t: "Discovery",
          d: "We map your departments, workflows and goals in detail.",
        },
        {
          ic: "fa-sliders",
          t: "Configuration",
          d: "Modules, roles and policies tailored to your institution.",
        },
        {
          ic: "fa-database",
          t: "Data Migration",
          d: "Existing records moved and validated, cleanly and safely.",
        },
        {
          ic: "fa-people-group",
          t: "Training",
          d: "Hands-on onboarding for admins, staff and end users.",
        },
        {
          ic: "fa-rocket",
          t: "Go-Live",
          d: "A smooth, supported launch with a success manager on call.",
        },
        {
          ic: "fa-headset",
          t: "Success & Support",
          d: "Ongoing optimization, updates and 24/7 assistance.",
        },
      ],
    },
    benefits: {
      eyebrow: "The business case",
      title: "What institutions gain on day one",
      sub: "Univerzia ERP pays for itself in reclaimed time and tighter control.",
      items: [
        { v: "70%", l: "Reduction in manual administrative work" },
        { v: "2x", l: "Faster fee collection and reconciliation" },
        { v: "100%", l: "Paperless, real-time records across campus" },
        { v: "1", l: "Single platform replacing many disconnected tools" },
      ],
    },
    testimonials: {
      eyebrow: "Customer success",
      title: "Institutions that transformed their operations",
      sub: "",
      items: [
        {
          q: "We replaced five different tools with Univerzia ERP. Admissions to finance now flow in one system — our staff got their time back.",
          n: "Rajesh Kulkarni",
          r: "Director, Vidya Group of Schools",
          rating: 5,
        },
        {
          q: "Fee collection that used to take weeks now happens in days, automatically. The analytics give us clarity we never had.",
          n: "Fatima Sheikh",
          r: "Registrar, Crescent University",
          rating: 5,
        },
        {
          q: "Managing six campuses from one dashboard felt impossible. Now it's just… normal. The rollout was painless.",
          n: "Anil Deshmukh",
          r: "Chairman, Pinnacle Academy",
          rating: 5,
        },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "Univerzia ERP FAQs",
      sub: "",
      items: [
        {
          q: "Do we have to adopt all 15+ modules at once?",
          a: [
            "Not at all. Univerzia ERP is modular by design. Most institutions start with the modules they need most — typically admissions, student information and finance — and switch on additional modules as they grow. Everything shares one data core, so new modules slot in instantly.",
          ],
        },
        {
          q: "Can it integrate with our existing systems?",
          a: [
            "Yes. Our API-first architecture connects to payment gateways, biometric attendance devices, accounting software like Tally, SSO providers and the Univerzia LMS. We unify your stack into a single, automated workflow.",
          ],
        },
        {
          q: "How secure is our data?",
          a: [
            "Security is built in at every layer: role-based access control, encryption in transit and at rest, full audit trails, automated backups and a 99.9% uptime SLA. We align to GDPR and education data-privacy best practices.",
          ],
        },
        {
          q: "How long does implementation take?",
          a: [
            "It depends on your size and the modules you choose, but our guided methodology — discovery, configuration, migration, training and go-live — typically has institutions running in a matter of weeks, with a dedicated success manager throughout.",
          ],
        },
        {
          q: "What does it cost?",
          a: [
            "Pricing is tailored to your institution's size and the modules you need. Book a demo and our team will prepare a transparent quote with no hidden fees — including implementation, hosting and support.",
          ],
        },
      ],
    },
    cta: {
      title: "Bring your whole institution into one platform",
      sub: "See Univerzia ERP configured for your organization. Book a demo or talk to our team about pricing and a rollout plan that fits.",
      actions: [
        { label: "Book a Demo", style: "primary" },
        { label: "Contact Sales", style: "soft" },
        { label: "Request Pricing", style: "ghost" },
      ],
    },
  },
};

export const servicesData: ServicesData = { hub, services };
