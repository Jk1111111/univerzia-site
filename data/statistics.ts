// Placeholder statistics for design purposes only — replace with verified figures before launch.
export type Statistic = {
  value: number;
  suffix: string;
  label: string;
};

export const primaryStatistic: Statistic = {
  value: 60000,
  suffix: "+",
  label: "Students Learning With Univerzia",
};

export const supportingStatistics: Statistic[] = [
  { value: 250, suffix: "+", label: "Partner Schools" },
  { value: 1200, suffix: "+", label: "Trained Educators" },
  { value: 30, suffix: "+", label: "Cities Reached" },
  { value: 96, suffix: "%", label: "School Satisfaction" },
];
