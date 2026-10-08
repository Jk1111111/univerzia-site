export type TrustPoint = {
  icon: string;
  label: string;
  description: string;
};

export const trustPoints: TrustPoint[] = [
  { icon: "hand-metal", label: "Hands-On Labs", description: "Learning built around doing, not memorizing." },
  { icon: "package-check", label: "End-to-End Setup", description: "From lab design to full deployment support." },
  { icon: "graduation-cap", label: "Educator Training", description: "Teachers trained to lead, not just supervise." },
  { icon: "shield-check", label: "NEP-Aligned Design", description: "Curriculum mapped to national education goals." },
  { icon: "trending-up", label: "Future-Skill Focus", description: "Built for careers that don't exist yet." },
  { icon: "hammer", label: "Project-Based Outcomes", description: "Every module ends in something students build." },
];
