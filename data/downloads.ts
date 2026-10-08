export type Download = {
  slug: string;
  title: string;
  description: string;
  fileType: "PDF";
  fileSize: string;
  category: string;
};

export const downloads: Download[] = [
  {
    slug: "novastem-school-brochure",
    title: "Univerzia School Partnership Brochure",
    description: "A complete overview of solutions, programs and the implementation journey — designed to share with your management team.",
    fileType: "PDF",
    fileSize: "2.4 MB",
    category: "Overview",
  },
  {
    slug: "stem-robotics-curriculum-guide",
    title: "STEM & Robotics Curriculum Guide",
    description: "Grade-wise breakdown of the STEM & Robotics lesson plans and project structure.",
    fileType: "PDF",
    fileSize: "1.8 MB",
    category: "Curriculum",
  },
  {
    slug: "ai-coding-curriculum-guide",
    title: "AI & Coding Curriculum Guide",
    description: "The full progression from block coding to applied AI, with sample project briefs.",
    fileType: "PDF",
    fileSize: "1.6 MB",
    category: "Curriculum",
  },
  {
    slug: "school-implementation-checklist",
    title: "School Implementation Checklist",
    description: "A planning checklist covering space, timetable and infrastructure needs before rollout.",
    fileType: "PDF",
    fileSize: "900 KB",
    category: "Planning",
  },
  {
    slug: "teacher-training-datasheet",
    title: "Teacher Training Program Datasheet",
    description: "Workshop structure, duration and certification pathway for educators.",
    fileType: "PDF",
    fileSize: "1.1 MB",
    category: "Training",
  },
];
