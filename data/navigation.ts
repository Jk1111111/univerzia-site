export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  dropdown?: NavLink[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Solutions",
    href: "/solutions",
    dropdown: [
      { label: "STEM & Robotics", href: "/solutions/stem-robotics", icon: "bot", description: "Hands-on mechanics to autonomous builds" },
      { label: "AI & Coding", href: "/solutions/ai-coding", icon: "code-2", description: "Block coding through to machine learning" },
      { label: "IoT & Smart Technology", href: "/solutions/iot", icon: "radio-tower", description: "Sensors, dashboards, connected devices" },
      { label: "AR / VR Learning", href: "/solutions/ar-vr", icon: "glasses", description: "Immersive simulations for STEM concepts" },
      { label: "Innovation & Maker Labs", href: "/solutions/innovation-labs", icon: "hammer", description: "Prototype-first makerspace model" },
      { label: "Teacher Training", href: "/solutions/teacher-training", icon: "graduation-cap", description: "Certification for confident delivery" },
      { label: "STEM Curriculum", href: "/solutions/stem-curriculum", icon: "book-open", description: "Grade-mapped lesson plans and projects" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      { label: "Primary School", href: "/programs/primary", icon: "sprout", description: "Playful first steps into STEM thinking" },
      { label: "Middle School", href: "/programs/middle-school", icon: "cpu", description: "Robotics, electronics and coding basics" },
      { label: "High School", href: "/programs/high-school", icon: "rocket", description: "AI, IoT and capstone innovation projects" },
    ],
  },
  { label: "For Schools", href: "/for-schools" },
  {
    label: "Resources",
    href: "/resources",
    dropdown: [
      { label: "Blog", href: "/resources/blog", icon: "book-open", description: "Ideas from the classroom and the lab" },
      { label: "Case Studies", href: "/resources/case-studies", icon: "bar-chart-3", description: "Outcomes from partner schools" },
      { label: "Events", href: "/resources/events", icon: "presentation", description: "Workshops, meets and demo days" },
      { label: "FAQ", href: "/resources/faq", icon: "search", description: "Answers for school decision-makers" },
      { label: "Downloads", href: "/resources/downloads", icon: "package-check", description: "Brochures and program guides" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Book a Demo", href: "/contact" };
