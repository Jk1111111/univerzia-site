// Placeholder/demo case studies — structured so real, verified case studies can replace these.
export type CaseStudy = {
  slug: string;
  schoolType: string;
  headline: string;
  summary: string;
  metrics: { value: string; label: string }[];
  solutionTags: string[];
  image: "scienceLab" | "teacherTraining" | "kidsCoding" | "circuitMacro";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mid-size-cbse-school-robotics-rollout",
    schoolType: "Mid-size CBSE school, Tier-2 city",
    headline: "Standing Up a Robotics Lab From Scratch in One Term",
    summary:
      "A demo illustration of how a school with no prior STEM infrastructure could move from first consultation to a running Grade 6-8 robotics program within a single term.",
    metrics: [
      { value: "6 weeks", label: "Consultation to launch (illustrative)" },
      { value: "3 grades", label: "Bands covered in year one" },
      { value: "12", label: "Teachers certified" },
    ],
    solutionTags: ["STEM & Robotics", "Teacher Training"],
    image: "kidsCoding",
  },
  {
    slug: "large-school-group-multi-campus-curriculum",
    schoolType: "Multi-campus school group",
    headline: "Standardizing STEM Curriculum Across Multiple Campuses",
    summary:
      "A demo scenario showing how a school group might roll out one consistent STEM curriculum across several campuses without losing local flexibility.",
    metrics: [
      { value: "4 campuses", label: "Illustrative rollout scope" },
      { value: "1 curriculum", label: "Shared across all sites" },
      { value: "Ongoing", label: "Support model" },
    ],
    solutionTags: ["STEM Curriculum", "School Implementation"],
    image: "teacherTraining",
  },
  {
    slug: "school-innovation-lab-competition-ready",
    schoolType: "Independent school, urban",
    headline: "From Maker Lab to Competition Podium",
    summary:
      "An illustrative case of how an open innovation lab program could prepare students for inter-school robotics and innovation competitions within a year.",
    metrics: [
      { value: "1 year", label: "Program-to-competition timeline" },
      { value: "8 teams", label: "Student teams formed" },
      { value: "Multiple", label: "Events participated in" },
    ],
    solutionTags: ["Innovation & Maker Labs"],
    image: "scienceLab",
  },
];
