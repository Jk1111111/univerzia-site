/* ─────────────────────────────────────────────────────────────────
   Univerzia AI — Homepage content
   TypeScript port of ui_kits/dashboard/data.js
   Changes from source:
     • Testimonial image paths → /brand/* (Next.js public dir)
     • "LMS Solutions" renamed to "Univerzia LMS"
     • "Univerzia ERP" added to footer Services column
   ───────────────────────────────────────────────────────────────── */

/* ── Types ────────────────────────────────────────────────────── */

export interface HeroStat    { v: string; l: string }
export interface HeroData    { values: string[]; stats: HeroStat[] }

export interface EcosystemNode {
  ic: string; c: string; bg: string; t: string; d: string
}

export interface WhyAIStat   { v: string; l: string }

export interface Workshop {
  t: string; d: string; ic: string; c: string; bg: string; brand?: boolean
}

export interface LearningPath {
  lvl: string; num: string; c: string; t: string; d: string; tags: string[]
}

export interface ProgramTab  { id: string; label: string; ic: string }

export interface Program {
  t: string; dur: string; ic: string; c: string; bg: string
  brand?: boolean; b: string[]
}

export interface JourneyStep { ic: string; t: string; d: string }

export interface WhyChooseFeature {
  ic: string; c: string; bg: string; t: string; d: string
}

export interface Outcome {
  ic: string; c: string; bg: string; v: string; l: string
}

export interface Testimonial  { q: string; n: string; r: string; img: string }
export interface CommunityStat { ic: string; c: string; bg: string; v: string; l: string }
export interface StackItem     { n: string; c: string; ic: string; color: string }
export interface FooterColumn  { h: string; items: string[] }

/* ── Content ──────────────────────────────────────────────────── */

export const nav: string[] = [
  "Home", "Programs", "AI Workshops", "Learning Paths", "Services", "About",
]

export const hero: HeroData = {
  values: [
    "Learn AI",
    "Build Real Projects",
    "Future-Proof Your Career",
    "Work With Industry Experts",
  ],
  stats: [
    { v: "500+", l: "Students enrolled" },
    { v: "96%",  l: "Success rate"      },
  ],
}

export const ecosystem: EcosystemNode[] = [
  { ic: "fa-brain",             c: "#7C3AED", bg: "#F5F3FF", t: "AI Learning",      d: "Curriculum built by industry experts" },
  { ic: "fa-screwdriver-wrench",c: "#6366F1", bg: "#EEF2FF", t: "Skill Development",d: "Hands-on, practical mastery"           },
  { ic: "fa-diagram-project",   c: "#06B6D4", bg: "#ECFEFF", t: "Real Projects",    d: "Build live, real-world work"           },
  { ic: "fa-folder-open",       c: "#F97316", bg: "#FFF7ED", t: "Portfolio",         d: "Showcase what you've built"            },
  { ic: "fa-certificate",       c: "#10B981", bg: "#ECFDF5", t: "Certifications",   d: "Industry-recognized proof"             },
  { ic: "fa-arrow-trend-up",    c: "#D946EF", bg: "#FDF4FF", t: "Career Growth",    d: "Mentorship to opportunities"           },
]

export const whyAI: WhyAIStat[] = [
  { v: "300M+", l: "Jobs worldwide expected to be transformed by AI automation" },
  { v: "10x",   l: "Productivity gains professionals report using AI tools daily" },
  { v: "40%",   l: "Average salary hike learners target with AI job-hunting skills" },
  { v: "2026",  l: "The year AI fluency becomes a baseline hiring expectation" },
]

export const workshops: Workshop[] = [
  { t: "AI Tools Workshop",     d: "Master the modern AI toolkit",       ic: "fa-toolbox",              c: "#7C3AED", bg: "#F5F3FF" },
  { t: "Prompt Engineering",    d: "Get 10x better AI responses",        ic: "fa-wand-magic-sparkles",  c: "#6366F1", bg: "#EEF2FF" },
  { t: "AI Productivity",       d: "Reduce workload by 50%",             ic: "fa-bolt",                 c: "#F59E0B", bg: "#FFFBEB" },
  { t: "ChatGPT Mastery",       d: "Your personal AI assistant",         ic: "fa-robot",                c: "#10B981", bg: "#ECFDF5" },
  { t: "AI for Excel",          d: "Turn data into charts fast",         ic: "fa-table-cells",          c: "#06B6D4", bg: "#ECFEFF" },
  { t: "AI for LinkedIn",       d: "Stand out to recruiters",            ic: "fa-brands fa-linkedin",   c: "#3B82F6", bg: "#EFF6FF", brand: true },
  { t: "AI for Interviews",     d: "Prepare like a pro",                 ic: "fa-comments",             c: "#D946EF", bg: "#FDF4FF" },
  { t: "AI for Coding",         d: "Ship code with AI agents",           ic: "fa-code",                 c: "#F97316", bg: "#FFF7ED" },
]

export const paths: LearningPath[] = [
  {
    lvl: "Beginner", num: "01", c: "#10B981",
    t: "AI Foundations",
    d: "Start from zero. Understand AI, master everyday tools, and build confidence.",
    tags: ["AI Tools", "ChatGPT", "No prerequisites"],
  },
  {
    lvl: "Intermediate", num: "02", c: "#6366F1",
    t: "AI Mastery",
    d: "Prompt engineering, automation, and AI-powered workflows for real productivity.",
    tags: ["Prompt Eng.", "Automation", "Workflows"],
  },
  {
    lvl: "Advanced", num: "03", c: "#7C3AED",
    t: "AI Automation & Agentic AI",
    d: "Build autonomous agents and complex automation that scale businesses.",
    tags: ["Agentic AI", "Python", "Pipelines"],
  },
  {
    lvl: "Professional", num: "04", c: "#F97316",
    t: "Real Projects & Career Growth",
    d: "Portfolio-grade projects, mentorship, and direct career support.",
    tags: ["Projects", "Mentorship", "Career"],
  },
]

export const tabs: ProgramTab[] = [
  { id: "ai-workshops", label: "AI Workshops",  ic: "fa-bullseye"     },
  { id: "ai-mastery",   label: "AI Mastery",    ic: "fa-rocket"       },
  { id: "tech",         label: "Tech Program",  ic: "fa-laptop-code"  },
  { id: "data",         label: "Data Program",  ic: "fa-chart-simple" },
]

export const programs: Record<string, Program[]> = {
  "ai-workshops": [
    {
      t: "ChatGPT & AI Tools Workshop", dur: "2 Weeks", ic: "fa-robot",
      c: "#7C3AED", bg: "#F5F3FF",
      b: ["Get 10x better responses from AI", "Save massive time in daily work", "Stay relevant in the AI job market"],
    },
    {
      t: "Prompt Engineering Mastery", dur: "5 Weeks", ic: "fa-wand-magic-sparkles",
      c: "#6366F1", bg: "#EEF2FF",
      b: ["Get 10x better responses from AI tools", "Turn AI into your personal assistant", "Master advanced prompt techniques"],
    },
    {
      t: "Day to Day Office Work Using AI", dur: "5 Weeks", ic: "fa-briefcase",
      c: "#F59E0B", bg: "#FFFBEB",
      b: ["Reduce workload by 50% using AI", "Master Microsoft & Google AI tools", "Turn boring data into beautiful charts"],
    },
  ],
  "ai-mastery": [
    {
      t: "Job Hunting for 40% Salary Hike Using AI", dur: "5 Weeks", ic: "fa-arrow-trend-up",
      c: "#10B981", bg: "#ECFDF5",
      b: ["Create an irresistible resume with AI", "Prepare for interviews like a pro", "Negotiate salary using AI tools"],
    },
    {
      t: "Build a Side Hustle Using AI", dur: "5 Weeks", ic: "fa-rocket",
      c: "#D946EF", bg: "#FDF4FF",
      b: ["Find profitable AI business ideas fast", "Automate & scale your side hustle", "Sell AI-generated content & products"],
    },
    {
      t: "AI-Powered Research & Report Writing", dur: "6 Weeks", ic: "fa-file-lines",
      c: "#7C3AED", bg: "#F5F3FF",
      b: ["Summarize research papers in seconds", "Fast & accurate data collection", "Turn raw data into insightful reports"],
    },
  ],
  "tech": [
    {
      t: "Python with AI", dur: "5 Weeks", ic: "fa-python",
      c: "#6366F1", bg: "#EEF2FF", brand: true,
      b: ["Master Python programming from scratch", "Integrate AI into applications", "Build smart, automated apps"],
    },
    {
      t: "Coding Using AI — No-Code AI SaaS", dur: "6 Weeks", ic: "fa-laptop-code",
      c: "#F97316", bg: "#FFF7ED",
      b: ["Create AI-powered apps without code", "Build chatbots & dashboards", "Deploy & scale AI SaaS products"],
    },
    {
      t: "AI Automation Workflow — Agentic AI", dur: "6 Weeks", ic: "fa-robot",
      c: "#7C3AED", bg: "#F5F3FF",
      b: ["Use AI agents to automate workflows", "Workflow optimization & efficiency", "Automate tasks without coding"],
    },
  ],
  "data": [
    {
      t: "Data Science with AI", dur: "6 Weeks", ic: "fa-chart-simple",
      c: "#06B6D4", bg: "#ECFEFF",
      b: ["Master DSA, System Design & GenAI", "Real-world projects & mock interviews", "1:1 mentorship from MAANG engineers"],
    },
    {
      t: "Advanced Data Analysis Program", dur: "6 Weeks", ic: "fa-chart-line",
      c: "#6366F1", bg: "#EEF2FF",
      b: ["Industry-aligned curriculum", "End-to-end project experience", "AI-driven analytics & insights"],
    },
    {
      t: "SQL Management with AI", dur: "5 Weeks", ic: "fa-database",
      c: "#10B981", bg: "#ECFDF5",
      b: ["Master SQL & database management", "Use AI to optimize performance", "Build data pipelines with AI"],
    },
  ],
}

export const journey: JourneyStep[] = [
  { ic: "fa-book-open",    t: "Learn",          d: "Expert-led lessons"  },
  { ic: "fa-keyboard",     t: "Practice",       d: "Hands-on labs"       },
  { ic: "fa-hammer",       t: "Build",          d: "Real projects"       },
  { ic: "fa-user-graduate",t: "Mentorship",     d: "1:1 guidance"        },
  { ic: "fa-certificate",  t: "Certify",        d: "Recognized proof"    },
  { ic: "fa-headset",      t: "Career Support", d: "Resume & interviews" },
  { ic: "fa-briefcase",    t: "Land Roles",     d: "Hiring partners"     },
]

export const whyChoose: WhyChooseFeature[] = [
  { ic: "fa-brain",             c: "#7C3AED", bg: "#F5F3FF", t: "AI-First Curriculum",  d: "Every course is built around modern AI tools and workflows, not legacy theory."               },
  { ic: "fa-chalkboard-user",   c: "#6366F1", bg: "#EEF2FF", t: "Industry Mentors",     d: "Learn from full-stack and Agentic AI specialists working in the field today."                 },
  { ic: "fa-diagram-project",   c: "#06B6D4", bg: "#ECFEFF", t: "Real Projects",        d: "Build a portfolio of live, end-to-end work that proves your skills to employers."              },
  { ic: "fa-hand-holding-heart",c: "#10B981", bg: "#ECFDF5", t: "Practical Learning",   d: "Case studies, labs, and simulations designed for real-world readiness."                       },
  { ic: "fa-compass",           c: "#F97316", bg: "#FFF7ED", t: "Career Guidance",      d: "Resume building, mock interviews, and direct hiring-partner connections."                      },
  { ic: "fa-infinity",          c: "#D946EF", bg: "#FDF4FF", t: "Lifetime Ecosystem",   d: "Stay in a growing community of AI-powered professionals for life."                            },
]

export const outcomes: Outcome[] = [
  { ic: "fa-bolt",         c: "#F59E0B", bg: "#FFFBEB", v: "10x", l: "Productivity increase with AI tools"     },
  { ic: "fa-folder-open",  c: "#7C3AED", bg: "#F5F3FF", v: "5+",  l: "Portfolio projects you build & own"      },
  { ic: "fa-arrow-trend-up",c: "#10B981",bg: "#ECFDF5", v: "40%", l: "Targeted salary hike with AI skills"     },
  { ic: "fa-comments",     c: "#6366F1", bg: "#EEF2FF", v: "100%",l: "Interview readiness with mock prep"       },
]

export const testimonials: Testimonial[] = [
  {
    q:   "I went from spreadsheets all day to automating my whole reporting pipeline with AI. The salary-hike workshop genuinely changed my career trajectory.",
    n:   "Aniket Sharma",
    r:   "Data Analyst · 38% hike",
    img: "/brand/student-aniket.jpeg",
  },
  {
    q:   "The prompt engineering program turned ChatGPT into a real assistant for me. I now ship work in a fraction of the time I used to.",
    n:   "Priya Nair",
    r:   "Marketing Lead",
    img: "",
  },
  {
    q:   "Project-based and practical from day one. I built a no-code AI SaaS app I actually use — and put it straight into my portfolio.",
    n:   "Rahul Verma",
    r:   "Aspiring AI Developer",
    img: "",
  },
]

export const community: CommunityStat[] = [
  { ic: "fa-user-graduate",  c: "#7C3AED", bg: "#F5F3FF", v: "500+", l: "Students"   },
  { ic: "fa-chalkboard-user",c: "#6366F1", bg: "#EEF2FF", v: "20+",  l: "Mentors"    },
  { ic: "fa-diagram-project",c: "#06B6D4", bg: "#ECFEFF", v: "1k+",  l: "Projects"   },
  { ic: "fa-bullseye",       c: "#F97316", bg: "#FFF7ED", v: "30+",  l: "Workshops"  },
  { ic: "fa-building",       c: "#10B981", bg: "#ECFDF5", v: "10+",  l: "Businesses" },
]

export const stack: StackItem[] = [
  { n: "AI",          c: "ChatGPT · Claude · Gemini",  ic: "fa-robot",    color: "#7C3AED" },
  { n: "Automation",  c: "Agents · n8n · Zapier",       ic: "fa-gears",    color: "#6366F1" },
  { n: "Data",        c: "SQL · Power BI · Pandas",     ic: "fa-database", color: "#06B6D4" },
  { n: "Development", c: "Python · No-Code · APIs",     ic: "fa-code",     color: "#F97316" },
  { n: "Cloud",       c: "Deploy · Scale · Host",       ic: "fa-cloud",    color: "#10B981" },
  { n: "Business",    c: "Excel · LinkedIn · CRM",      ic: "fa-briefcase",color: "#F59E0B" },
]

export const trusted: string[] = [
  "TCS", "IBM", "Wipro", "Infosys", "HCL", "Tech Mahindra",
]

// ── Updated: "LMS Solutions" → "Univerzia LMS", + "Univerzia ERP" ──
export const footerCols: FooterColumn[] = [
  {
    h: "Learn",
    items: ["AI Workshops", "AI Mastery", "Tech Programs", "Data Programs", "Learning Paths"],
  },
  {
    h: "Company",
    items: ["About Univerzia", "Mentors", "Careers", "Contact", "Blog"],
  },
  {
    h: "Services",
    items: ["Website Design", "Web Development", "Univerzia LMS", "Univerzia ERP", "E-Commerce", "Digital Marketing"],
  },
]
