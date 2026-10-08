export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: "scienceLab" | "teacherTraining" | "kidsCoding" | "circuitMacro";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-stem-education-matters",
    title: "Why STEM Education Matters More Than Ever",
    excerpt:
      "The jobs today's students will hold in ten years mostly don't exist yet. Here's why hands-on STEM learning is the closest thing to future-proofing a classroom can offer.",
    category: "Perspective",
    readTime: "5 min read",
    date: "2026-01-14",
    image: "scienceLab",
  },
  {
    slug: "robotics-in-k12-education",
    title: "Robotics in K-12 Education: Where to Actually Start",
    excerpt:
      "Robotics labs fail for predictable reasons — usually not the equipment. A practical look at what separates a robotics program that gets used from one that gathers dust.",
    category: "Implementation",
    readTime: "7 min read",
    date: "2026-01-08",
    image: "kidsCoding",
  },
  {
    slug: "introducing-ai-in-schools",
    title: "How AI Can Be Introduced in Schools Responsibly",
    excerpt:
      "AI literacy doesn't mean handing students a chatbot. A framework for teaching how AI systems actually work — including where they get things wrong.",
    category: "AI & Coding",
    readTime: "6 min read",
    date: "2025-12-20",
    image: "kidsCoding",
  },
  {
    slug: "future-skills-students-need",
    title: "The Future Skills Students Actually Need",
    excerpt:
      "Coding is a skill. Debugging your own thinking is a meta-skill. A look at what separates the two, and why schools should teach both.",
    category: "Perspective",
    readTime: "4 min read",
    date: "2025-12-05",
    image: "circuitMacro",
  },
  {
    slug: "building-innovation-culture-in-schools",
    title: "Building an Innovation Culture in Schools",
    excerpt:
      "Innovation labs are only as good as the culture around them. What it takes to make a makerspace feel like a normal part of school life, not a novelty.",
    category: "Culture",
    readTime: "6 min read",
    date: "2025-11-22",
    image: "teacherTraining",
  },
];
