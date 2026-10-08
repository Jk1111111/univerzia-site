export type SiteEvent = {
  slug: string;
  title: string;
  type: "Workshop" | "Competition" | "Training" | "Innovation Day";
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
};

export const events: SiteEvent[] = [
  {
    slug: "robotics-workshop-jan-2026",
    title: "Hands-On Robotics Workshop",
    type: "Workshop",
    date: "2026-02-14",
    location: "Bengaluru",
    description: "A half-day introductory workshop for teachers new to the STEM & Robotics curriculum.",
    status: "upcoming",
  },
  {
    slug: "inter-school-robotics-challenge-2026",
    title: "Inter-School Robotics Challenge",
    type: "Competition",
    date: "2026-03-08",
    location: "Multiple regional venues",
    description: "Teams from partner schools compete across line-following, obstacle course and open-innovation categories.",
    status: "upcoming",
  },
  {
    slug: "ai-educator-certification-mar-2026",
    title: "AI & Coding Educator Certification",
    type: "Training",
    date: "2026-03-21",
    location: "Online + in-person cohorts",
    description: "Certification workshop for teachers rolling out the AI & Coding track for the first time.",
    status: "upcoming",
  },
  {
    slug: "innovation-day-2025",
    title: "Univerzia Innovation Day",
    type: "Innovation Day",
    date: "2025-11-16",
    location: "Bengaluru",
    description: "A showcase day where partner-school students presented Maker Lab capstone projects to judges.",
    status: "past",
  },
  {
    slug: "teacher-training-cohort-oct-2025",
    title: "STEM & Robotics Teacher Training Cohort",
    type: "Training",
    date: "2025-10-05",
    location: "Pune",
    description: "A foundation-level certification cohort for newly onboarded partner schools.",
    status: "past",
  },
];
