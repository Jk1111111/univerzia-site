export type ProgramDetail = {
  slug: string;
  title: string;
  gradeRange: string;
  tagline: string;
  eyebrow: string;
  heroDescription: string;
  focusAreas: string[];
  learningJourney: { stage: string; description: string }[];
  activities: string[];
  projects: string[];
  skills: string[];
  outcomes: string[];
};

export const programsDetail: ProgramDetail[] = [
  {
    slug: "primary",
    title: "Primary School Program",
    gradeRange: "Grades 3-5",
    tagline: "Curiosity first, structure second.",
    eyebrow: "Programs / Primary School",
    heroDescription:
      "For our youngest learners, the goal isn't mastery — it's curiosity. Simple robotics, hands-on exploration and playful problem-solving lay the groundwork for everything that follows.",
    focusAreas: ["Curiosity & exploration", "Basic STEM concepts", "Creativity", "Simple robotics", "Collaborative problem solving"],
    learningJourney: [
      { stage: "Explore", description: "Open-ended play with building blocks, simple circuits and everyday materials." },
      { stage: "Wonder", description: "Guided questions turn play into early scientific thinking — what happens if...?" },
      { stage: "Build", description: "First guided robotics builds with immediate, visible results." },
      { stage: "Share", description: "Show-and-tell sessions build early presentation confidence." },
    ],
    activities: [
      "Building simple machines with everyday materials",
      "Introductory block-based coding games",
      "Guided robot assembly with large, safe components",
      "Team challenges (build the tallest tower, the fastest car)",
    ],
    projects: ["A simple moving toy car", "A basic light-up circuit craft", "A block-coded animated story", "A team-built structure challenge"],
    skills: ["Fine motor and spatial skills", "Early cause-and-effect reasoning", "Following and adapting instructions", "Working in small teams"],
    outcomes: [
      "Comfortable exploring and experimenting without fear of getting it wrong",
      "Basic familiarity with how simple machines and circuits work",
      "First exposure to sequencing and logic through block coding",
      "Confidence presenting their work to classmates",
    ],
  },
  {
    slug: "middle-school",
    title: "Middle School Program",
    gradeRange: "Grades 6-8",
    tagline: "Where engineering thinking begins.",
    eyebrow: "Programs / Middle School",
    heroDescription:
      "Middle school students are ready for real tools and real logic. This stage introduces coding, electronics, robotics and early IoT concepts through structured, hands-on projects.",
    focusAreas: ["Coding", "Electronics", "Robotics", "Sensors & IoT basics", "Engineering thinking"],
    learningJourney: [
      { stage: "Foundations", description: "Structured robotics builds and block-to-text coding transition." },
      { stage: "Systems Thinking", description: "Introducing sensors and how inputs drive automated behavior." },
      { stage: "Guided Projects", description: "Semi-open project briefs with defined success criteria." },
      { stage: "Presentation", description: "Documenting and presenting builds to peers and teachers." },
    ],
    activities: [
      "Sensor-based robotics builds (line-following, obstacle-avoidance)",
      "Transitioning from block coding to real Python syntax",
      "Simple circuit design and soldering basics (supervised)",
      "Introductory IoT builds connecting a sensor to a dashboard",
    ],
    projects: ["A line-following robot", "A Python-based quiz or game", "A soil-moisture monitoring circuit", "A classroom temperature dashboard"],
    skills: ["Structured debugging", "Basic electronics and circuit reading", "Text-based programming fundamentals", "Data reading and interpretation"],
    outcomes: [
      "Working knowledge of both block-based and text-based programming",
      "Ability to design and troubleshoot a basic sensor circuit",
      "Understanding of how automated systems make decisions",
      "Experience presenting a technical project with a clear structure",
    ],
  },
  {
    slug: "high-school",
    title: "High School Program",
    gradeRange: "Grades 9-12",
    tagline: "From student to innovator.",
    eyebrow: "Programs / High School",
    heroDescription:
      "Senior students are ready for advanced robotics, AI, IoT and open-ended innovation work — building capstone projects that reflect real engineering and design thinking.",
    focusAreas: ["Advanced robotics", "AI & machine learning", "Python programming", "IoT & automation", "Innovation & real-world projects"],
    learningJourney: [
      { stage: "Advanced Foundations", description: "Deeper robotics and Python fluency, building on middle-school foundations." },
      { stage: "Applied AI & IoT", description: "Training simple models and building full sense-connect-act systems." },
      { stage: "Capstone Design", description: "Self-directed projects solving a real, self-identified problem." },
      { stage: "Showcase & Competition", description: "Presenting finished work at school events and inter-school competitions." },
    ],
    activities: [
      "Autonomous robotics builds with multiple sensor inputs",
      "Training and evaluating simple AI/ML models",
      "Full IoT builds with live cloud dashboards",
      "Independent capstone project design and mentoring",
    ],
    projects: ["An AI-based waste-sorting classifier", "A smart-agriculture irrigation system", "An assistive-technology prototype", "A school-safety monitoring system"],
    skills: ["Independent project planning", "Applied AI/ML fundamentals", "System-level engineering thinking", "Technical pitching and documentation"],
    outcomes: [
      "A portfolio-ready capstone project demonstrating real technical depth",
      "Practical exposure to AI concepts beyond textbook theory",
      "Experience competing at inter-school robotics/innovation events",
      "Readiness for further study or competitions in engineering and computer science",
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return programsDetail.find((p) => p.slug === slug);
}
