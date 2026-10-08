import { media } from "./media";

// Drop a real photo path in `image` to replace the illustrated placeholder tile automatically.
export type GalleryItem = {
  caption: string;
  icon: string;
  accent: "electric" | "cyan" | "violet" | "green" | "amber" | "orange";
  span: "wide" | "tall" | "normal";
  image?: string;
};

export const galleryItems: GalleryItem[] = [
  { caption: "Students collaborating on a robotics kit assembly during a lab session.", icon: "bot", accent: "electric", span: "wide", image: media.kidsCoding[2] },
  { caption: "Close-up circuit board detail from an electronics build session.", icon: "cpu", accent: "amber", span: "tall", image: media.circuitMacro[1] },
  { caption: "Teacher guiding a small group through a coding exercise on laptops.", icon: "laptop", accent: "cyan", span: "normal", image: media.kidsCoding[4] },
  { caption: "A hands-on science and engineering lab session in progress.", icon: "building-2", accent: "violet", span: "normal", image: media.scienceLab[2] },
  { caption: "A teacher-led workshop session presenting new project concepts.", icon: "presentation", accent: "green", span: "tall", image: media.teacherTraining[0] },
  { caption: "Young student programming a robot using block-based coding software.", icon: "code-2", accent: "electric", span: "normal", image: media.kidsCoding[1] },
  { caption: "Teachers participating in a hands-on training workshop.", icon: "graduation-cap", accent: "cyan", span: "wide", image: media.teacherTraining[1] },
  { caption: "A student's colorful robotics building blocks and controller.", icon: "trophy", accent: "orange", span: "normal", image: media.kidsCoding[0] },
  { caption: "Macro detail of a circuit board used in an AI vision project.", icon: "scan-eye", accent: "violet", span: "normal", image: media.circuitMacro[2] },
  { caption: "A teacher and student working through a science experiment together.", icon: "cloud-sun", accent: "green", span: "wide", image: media.scienceLab[0] },
];
