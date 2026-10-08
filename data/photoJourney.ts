import { media } from "./media";

export type PhotoJourneyItem = {
  id: string;
  tag: string;
  title: string;
  image: string;
};

// A deliberately mixed slice across the existing real-photo manifest — not a
// duplicate of any one section's set — so this becomes its own visual moment
// rather than a rehash of WhoWeAre/Testimonials/ProjectShowcase imagery.
export const photoJourney: PhotoJourneyItem[] = [
  {
    id: "labs",
    tag: "STEM Labs",
    title: "Where Curiosity Gets a Workbench",
    image: media.scienceLab[0],
  },
  {
    id: "robotics",
    tag: "Robotics",
    title: "Students Building Real, Working Machines",
    image: media.kidsCoding[0],
  },
  {
    id: "coding",
    tag: "AI & Coding",
    title: "From First Line of Code to Full Projects",
    image: media.kidsCoding[1],
  },
  {
    id: "teachers",
    tag: "Teacher Training",
    title: "Educators Trained to Lead, Not Just Supervise",
    image: media.teacherTraining[0],
  },
  {
    id: "classrooms",
    tag: "Smart Classrooms",
    title: "Technology Built Into Everyday Learning",
    image: media.scienceLab[1],
  },
  {
    id: "culture",
    tag: "Innovation Culture",
    title: "A Generation Building Its Own Future",
    image: media.kidsCoding[4],
  },
];
