/* ═══════════════════════════════════════════════════════════════
   Univerzia AI — AI Workshops (single flagship workshop funnel)
   Ported from Univerzia AI Design System/ui_kits/ai-workshops/aiw-data.js
   ═══════════════════════════════════════════════════════════════ */

export interface HeroStat {
  v: string;
  suffix: string;
  l: string;
}
export interface SessionItem {
  ic: string;
  t: string;
}
export interface Hero {
  pill: string;
  title: [string, string, string];
  sub: string;
  stats: HeroStat[];
  session: SessionItem[];
  checklist: string[];
}

export interface MediaItem {
  src: string;
  t: string;
}
export interface Media {
  label: string;
  items: MediaItem[];
}

export interface RealityStat {
  type: "risk" | "change" | "opportunity";
  ic: string;
  c: string;
  bg: string;
  v: string;
  t: string;
  d: string;
  src: string;
}
export interface Reality {
  eyebrow: string;
  title: string;
  sub: string;
  stats: RealityStat[];
}

export interface CurriculumModule {
  ic: string;
  brand: boolean;
  c: string;
  t: string;
  d: string;
  points: string[];
}
export interface Curriculum {
  eyebrow: string;
  title: string;
  sub: string;
  modules: CurriculumModule[];
}

export interface WhyJoinItem {
  ic: string;
  c: string;
  bg: string;
  t: string;
  d: string;
  brand?: boolean;
}
export interface WhyJoin {
  eyebrow: string;
  title: string;
  sub: string;
  items: WhyJoinItem[];
}

export interface ToolItem {
  n: string;
  cat: string;
  ic?: string;
  mono?: string;
  c: string;
}
export interface Tools {
  eyebrow: string;
  title: string;
  sub: string;
  items: ToolItem[];
}

export interface BonusItem {
  badge: string;
  ic: string;
  t: string;
  d: string;
  worth: string;
}
export interface Bonuses {
  eyebrow: string;
  title: string;
  sub: string;
  total: string;
  items: BonusItem[];
}

export interface JourneyStep {
  ic: string;
  t: string;
  d: string;
}
export interface Journey {
  eyebrow: string;
  title: string;
  sub: string;
  steps: JourneyStep[];
}

export interface OutcomeItem {
  ic: string;
  c: string;
  bg: string;
  v: string;
  l: string;
}
export interface Outcomes {
  eyebrow: string;
  title: string;
  sub: string;
  items: OutcomeItem[];
}

export interface Certificate {
  eyebrow: string;
  title: string;
  sub: string;
  img: string;
  points: string[];
}

export interface TrainerItem {
  n: string;
  initials: string;
  grad: string;
  role: string;
  exp: string;
  ex: string;
}
export interface Trainers {
  eyebrow: string;
  title: string;
  sub: string;
  items: TrainerItem[];
}

export interface ReviewItem {
  q: string;
  n: string;
  r: string;
  rating: number;
  img: string;
}
export interface Reviews {
  eyebrow: string;
  title: string;
  sub: string;
  items: ReviewItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}
export interface Faq {
  eyebrow: string;
  title: string;
  sub: string;
  items: FaqItem[];
}

export interface Cta {
  title: string;
  sub: string;
  priceNow: string;
  priceWas: string;
  off: string;
}

export interface AiWorkshopsData {
  hero: Hero;
  media: Media;
  reality: Reality;
  curriculum: Curriculum;
  whyJoin: WhyJoin;
  tools: Tools;
  bonuses: Bonuses;
  journey: Journey;
  outcomes: Outcomes;
  certificate: Certificate;
  trainers: Trainers;
  reviews: Reviews;
  faq: Faq;
  cta: Cta;
}

export const aiWorkshops: AiWorkshopsData = {
  hero: {
    pill: "Next live cohort · This Sunday · Seats filling fast",
    title: ["Master ", "AI Tools & ChatGPT", " in one live weekend"],
    sub: "A 3+ hour hands-on workshop where you'll learn 50+ AI tools and hacks to build presentations in seconds, finish a day's work in minutes, and save 2 hours every single day.",
    stats: [
      { v: "500", suffix: "+", l: "Learners trained" },
      { v: "30", suffix: "+", l: "Live cohorts run" },
      { v: "4.9", suffix: "/5", l: "Average rating" },
      { v: "96", suffix: "%", l: "Completion rate" },
    ],
    session: [
      { ic: "fa-calendar-days", t: "This Sunday" },
      { ic: "fa-hourglass-half", t: "3+ Hours" },
      { ic: "fa-video", t: "Live + Recorded" },
      { ic: "fa-clock", t: "11:00 AM IST" },
    ],
    checklist: [
      "No prior technical or AI knowledge needed",
      "Save up to 2 hours of work every day",
      "Industry-recognized certificate included",
      "Lifetime access to recordings & resources",
    ],
  },

  media: {
    label: "The AI skills gap is making headlines",
    items: [
      { src: "Forbes", t: "AI prompt engineers are commanding salaries up to $300k — and the skill can be learned." },
      { src: "India Today", t: "Companies are hiring for AI roles with packages running into crores." },
      { src: "CNBC", t: "The World Economic Forum projects 69M+ new jobs where AI plays a key role." },
    ],
  },

  reality: {
    eyebrow: "Why now",
    title: "AI isn't coming for your job — someone using AI is",
    sub: "The workplace is being rewritten. The professionals who adapt first won't just stay relevant — they'll pull ahead.",
    stats: [
      { type: "risk", ic: "fa-arrow-trend-down", c: "#EF4444", bg: "#FEF2F2", v: "85M", t: "Jobs displaced", d: "Roles expected to be displaced by AI and automation by 2025.", src: "World Economic Forum" },
      { type: "change", ic: "fa-triangle-exclamation", c: "#F59E0B", bg: "#FFFBEB", v: "44%", t: "Skills disrupted", d: "Of workers' core skills are expected to change within five years.", src: "Future of Jobs Report" },
      { type: "opportunity", ic: "fa-rocket", c: "#10B981", bg: "#ECFDF5", v: "97M", t: "New roles emerging", d: "New roles created by the shift toward humans working with AI.", src: "World Economic Forum" },
    ],
  },

  curriculum: {
    eyebrow: "Workshop curriculum",
    title: "Everything you'll master in one session",
    sub: "Eight hands-on modules covering the AI tools that deliver the biggest payoff in real, everyday work.",
    modules: [
      { ic: "fa-robot", brand: false, c: "#10B981", t: "ChatGPT Mastery", d: "Turn ChatGPT into a personal assistant", points: ["50+ daily productivity hacks", "Prompts that get reliable results", "Automate your repetitive tasks"] },
      { ic: "fa-wand-magic-sparkles", brand: false, c: "#6366F1", t: "Prompt Engineering", d: "Get 10x better responses from any AI", points: ["Advanced prompting frameworks", "Reusable prompt library", "Avoid common AI mistakes"] },
      { ic: "fa-file-excel", brand: false, c: "#1D6F42", t: "AI Tools for Excel", d: "Become a top-1% Excel user", points: ["Complex formulas without memorizing", "Automate spreadsheets end-to-end", "Turn raw data into charts instantly"] },
      { ic: "fa-file-powerpoint", brand: false, c: "#D24726", t: "AI Tools for Presentations", d: "Pro decks in under 10 seconds", points: ["Auto-research any topic", "Design-grade slides, zero skill", "On-brand templates in a click"] },
      { ic: "fa-linkedin", brand: true, c: "#0A66C2", t: "AI Tools for LinkedIn", d: "Stand out to recruiters & clients", points: ["Find leads and land jobs", "Write posts that go viral", "Build an irresistible profile"] },
      { ic: "fa-comments", brand: false, c: "#D946EF", t: "AI Tools for Interviews", d: "Walk in prepared, get hired", points: ["Realistic AI mock interviews", "Proven answer frameworks", "Company & role research in minutes"] },
      { ic: "fa-file-lines", brand: false, c: "#7C3AED", t: "AI Tools for Research & Reports", d: "Research and write in a fraction of the time", points: ["Summarize papers in seconds", "Fast, accurate data collection", "Polished reports from raw data"] },
      { ic: "fa-laptop-code", brand: false, c: "#F97316", t: "AI Tools for Coding", d: "Build software with zero code", points: ["Ship features without coding", "Build no-code apps & chatbots", "Debug and refactor using AI"] },
    ],
  },

  whyJoin: {
    eyebrow: "Why join this workshop",
    title: "Ten reasons it pays for itself in a week",
    sub: "Practical, hands-on outcomes designed specifically for busy working professionals.",
    items: [
      { ic: "fa-magnifying-glass", c: "#7C3AED", bg: "#F5F3FF", t: "Smart Research", d: "Research any presentation or report in minutes, not hours." },
      { ic: "fa-stopwatch", c: "#6366F1", bg: "#EEF2FF", t: "Rapid Reporting", d: "Complete comprehensive reports in under 20 minutes." },
      { ic: "fa-bolt", c: "#F59E0B", bg: "#FFFBEB", t: "Instant Decks", d: "Create professional presentations in under 10 seconds." },
      { ic: "fa-laptop-code", c: "#F97316", bg: "#FFF7ED", t: "No-Code Coding", d: "Learn to build with AI with zero technical knowledge." },
      { ic: "fa-wand-magic-sparkles", c: "#06B6D4", bg: "#ECFEFF", t: "Excel Wizardry", d: "Use complex Excel formulas with AI without memorizing them." },
      { ic: "fa-linkedin", c: "#0A66C2", bg: "#EFF6FF", t: "LinkedIn Growth", d: "Master AI tools that accelerate your career visibility.", brand: true },
      { ic: "fa-briefcase", c: "#10B981", bg: "#ECFDF5", t: "Built for Pros", d: "A curriculum designed for working professionals' real needs." },
      { ic: "fa-rocket", c: "#D946EF", bg: "#FDF4FF", t: "Future Skills", d: "Prompt engineering — the most critical career skill of the decade." },
      { ic: "fa-arrow-trend-up", c: "#EF4444", bg: "#FEF2F2", t: "Career Boost", d: "The complete blueprint for ChatGPT & AI tools at work." },
      { ic: "fa-shield-halved", c: "#0EA5E9", bg: "#F0F9FF", t: "Job Security", d: "Become the irreplaceable, AI-fluent person on your team." },
    ],
  },

  tools: {
    eyebrow: "AI tools covered",
    title: "Get hands-on with the tools shaping every industry",
    sub: "From writing and design to research, automation and code — you'll use 50+ tools, including these essentials.",
    items: [
      { n: "ChatGPT", cat: "Conversational AI", ic: "fa-comment-dots", c: "#10A37F" },
      { n: "Claude", cat: "Reasoning & writing", mono: "C", c: "#D97757" },
      { n: "Gemini", cat: "Multimodal AI", ic: "fa-gem", c: "#4285F4" },
      { n: "Midjourney", cat: "Image generation", ic: "fa-sailboat", c: "#3B3B5C" },
      { n: "Perplexity", cat: "AI research", ic: "fa-magnifying-glass", c: "#20808D" },
      { n: "Notion AI", cat: "AI workspace", mono: "N", c: "#111827" },
      { n: "Copilot", cat: "AI coding & office", ic: "fa-wand-magic-sparkles", c: "#0078D4" },
      { n: "Canva AI", cat: "AI design", ic: "fa-palette", c: "#00C4CC" },
      { n: "n8n", cat: "AI automation", ic: "fa-diagram-project", c: "#EA4B71" },
      { n: "Zapier", cat: "Workflow automation", ic: "fa-bolt", c: "#FF4F00" },
      { n: "Runway", cat: "AI video", ic: "fa-film", c: "#111827" },
      { n: "ElevenLabs", cat: "AI voice", ic: "fa-volume-high", c: "#5B21B6" },
    ],
  },

  bonuses: {
    eyebrow: "Free bonuses",
    title: "Enroll today and unlock ₹10,500 in bonuses",
    sub: "Included free with your seat — yours to keep forever, even after the workshop.",
    total: "₹10,500",
    items: [
      { badge: "Bonus 1", ic: "fa-bolt", t: "50+ ready-to-use productivity hacks", d: "A swipe file of AI workflows you can apply from day one.", worth: "₹5,000" },
      { badge: "Bonus 2", ic: "fa-file-powerpoint", t: "800+ premium PPT templates", d: "Fully customizable, presentation-ready slide decks.", worth: "₹3,000" },
      { badge: "Bonus 3", ic: "fa-clock", t: "Time Management ebook", d: "The system to reclaim your hours and focus on what matters.", worth: "₹2,500" },
    ],
  },

  journey: {
    eyebrow: "How it works",
    title: "From enrolled to AI-ready in six steps",
    sub: "A guided path that takes you from sign-up to applying AI skills at work with confidence.",
    steps: [
      { ic: "fa-user-plus", t: "Enroll", d: "Reserve your seat for the next cohort" },
      { ic: "fa-video", t: "Attend Live", d: "Join the 3+ hour hands-on session" },
      { ic: "fa-keyboard", t: "Practice", d: "Build along in real time" },
      { ic: "fa-toolbox", t: "Apply 50+ Tools", d: "Use AI on your real work" },
      { ic: "fa-certificate", t: "Get Certified", d: "Earn your certificate" },
      { ic: "fa-briefcase", t: "Grow", d: "Save hours, stand out, get ahead" },
    ],
  },

  outcomes: {
    eyebrow: "Measurable outcomes",
    title: "Results you can measure from week one",
    sub: "",
    items: [
      { ic: "fa-bolt", c: "#F59E0B", bg: "#FFFBEB", v: "10x", l: "Productivity with AI workflows" },
      { ic: "fa-clock", c: "#7C3AED", bg: "#F5F3FF", v: "2 hrs", l: "Saved every single day" },
      { ic: "fa-toolbox", c: "#06B6D4", bg: "#ECFEFF", v: "50+", l: "AI tools mastered" },
      { ic: "fa-arrow-trend-up", c: "#10B981", bg: "#ECFDF5", v: "3x", l: "Faster everyday work" },
    ],
  },

  certificate: {
    eyebrow: "Certification",
    title: "Earn a certificate that proves your AI edge",
    sub: "Complete the workshop and receive an industry-recognized certificate from Univerzia AI's expert trainers — a credible addition to your resume and LinkedIn that signals you're AI-ready.",
    img: "/brand/certificate-sample.png",
    points: ["Industry-recognized & shareable", "Adds credibility to your resume", "Showcase it on your LinkedIn profile"],
  },

  trainers: {
    eyebrow: "Meet your trainers",
    title: "Learn from practitioners, not lecturers",
    sub: "Industry experts with 8+ years of hands-on experience building AI and software at leading companies.",
    items: [
      { n: "Gautam Shukla", initials: "GS", grad: "linear-gradient(135deg,#7C3AED,#6366F1)", role: "Full-Stack Dev · AI & Data Science", exp: "8+ yrs", ex: "Ex-Netsmartz" },
      { n: "Shashank Mathur", initials: "SM", grad: "linear-gradient(135deg,#F97316,#FB923C)", role: "Full-Stack · Agentic AI Specialist", exp: "8+ yrs", ex: "Ex-Bosch, Infosys" },
      { n: "Jodhraj Kalawat", initials: "JK", grad: "linear-gradient(135deg,#06B6D4,#0EA5E9)", role: "System Architect", exp: "8+ yrs", ex: "Ex-Hitachi" },
      { n: "Aniket Mishra", initials: "AM", grad: "linear-gradient(135deg,#10B981,#34D399)", role: "AI & Machine Learning Expert", exp: "9+ yrs", ex: "Ex-Cognizant" },
    ],
  },

  reviews: {
    eyebrow: "Success stories",
    title: "Loved by 500+ professionals",
    sub: "Real learners, real outcomes — here's what happens when you put AI to work.",
    items: [
      { q: "I automated my entire reporting pipeline after this workshop. I genuinely save two hours a day now — and it helped me land a 38% hike.", n: "Aniket Sharma", r: "Data Analyst · 38% hike", rating: 5, img: "/brand/student-aniket.jpeg" },
      { q: "The prompt engineering module turned ChatGPT into a real assistant. I ship marketing work in a fraction of the time it used to take.", n: "Priya Nair", r: "Marketing Lead", rating: 5, img: "" },
      { q: "Zero coding background, and I built a working no-code app in the coding module. It went straight into my portfolio.", n: "Rahul Verma", r: "Aspiring AI Developer", rating: 5, img: "" },
      { q: "Practical from minute one. The presentation module alone paid for the workshop — I build client decks in seconds now.", n: "Sneha Iyer", r: "Business Consultant", rating: 5, img: "" },
    ],
  },

  faq: {
    eyebrow: "Questions, answered",
    title: "Frequently asked questions",
    sub: "Everything you need to know before you join your first workshop.",
    items: [
      { q: "Will the workshop be live or pre-recorded?", a: "Both. You get a live, interactive 3+ hour session with expert trainers, plus lifetime access to the recording so you can revisit anything at your own pace." },
      { q: "Do I need prior AI or technical knowledge?", a: "Not at all. This workshop is built for complete beginners and working professionals. We start from the fundamentals — no coding or AI background required." },
      { q: "I have a full-time job. Is this for me?", a: "Absolutely. The curriculum is designed specifically for busy professionals, and with lifetime access you can learn and re-watch whenever it suits you." },
      { q: "Will I get a certificate?", a: "Yes. You'll receive an industry-recognized certificate of completion that you can add to your resume and LinkedIn to highlight your AI skills." },
      { q: "How long do I have to complete the workshop?", a: "You get lifetime access to recordings, resources and all bonuses. There's no time limit — learn at your own pace and come back whenever you need a refresher." },
      { q: "What kind of support do I get?", a: "You join a community of AI-powered professionals with mentor guidance and doubt-clearing, plus career support including resume reviews and mock-interview practice." },
      { q: "What if it's not for me?", a: "We want you to feel confident enrolling. If the workshop isn't the right fit, just reach out to our team and we'll make it right." },
    ],
  },

  cta: {
    title: "Reserve your seat for this weekend",
    sub: "Join 500+ professionals already using AI to save time, ship faster and future-proof their careers. Limited seats — secure yours now.",
    priceNow: "₹9",
    priceWas: "₹929",
    off: "99% OFF",
  },
};
