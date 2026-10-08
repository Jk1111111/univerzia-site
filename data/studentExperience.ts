import { media } from "./media";

export const studentExperience = {
  eyebrow: "For Students",
  headline: "Stop Studying Technology. Start Shaping It.",
  paragraph:
    "This isn't a class where you take notes and wait for the bell. It's where you wire your first circuit, debug your first program, and watch your own robot move for the first time. Every session ends with something you built, broke, fixed and made better — because that's how real innovators actually learn.",
  activities: ["Coding", "Robotics", "Electronics", "AI Projects", "Team Builds", "Competitions"],
  // exactly 3 entries to fill a 2x2 grid: one spanning both columns + two beneath it
  moments: [
    { label: "Robot Builds", icon: "bot", accent: "electric", image: media.kidsCoding[2], span: "lg" },
    { label: "Live Coding", icon: "code-2", accent: "violet", image: media.kidsCoding[1], span: "sm" },
    { label: "Competitions", icon: "trophy", accent: "green", image: media.scienceLab[3], span: "sm" },
  ] as { label: string; icon: string; accent: "electric" | "violet" | "orange" | "green"; image: string; span: "lg" | "sm" }[],
};
