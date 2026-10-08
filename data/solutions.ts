import type { SceneVariant } from "@/components/illustrations/ScenePanel";
import { media } from "./media";

export type Solution = {
  icon: string;
  variant: SceneVariant;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  accent: "electric" | "cyan" | "violet" | "green" | "amber" | "orange";
  size: "lg" | "md";
  href: string;
  image?: string;
};

export const solutions: Solution[] = [
  {
    icon: "bot",
    variant: "robotics",
    title: "STEM & Robotics",
    tagline: "Build. Test. Rebuild.",
    description: "A structured lab program that takes students from basic mechanics to autonomous robot builds.",
    features: ["Grade-appropriate robotics kits and building blocks", "Guided project sheets with open-ended extensions", "Progression from assembly to independent design"],
    accent: "electric",
    size: "lg",
    href: "/solutions/stem-robotics",
    image: media.kidsCoding[0],
  },
  {
    icon: "code-2",
    variant: "ai-coding",
    title: "AI & Coding",
    tagline: "From logic to intelligence.",
    description: "A coding-to-AI pathway that starts with block programming and ends with real machine learning projects.",
    features: ["Visual and text-based coding tracks by age group", "Hands-on AI projects using vision, speech and data", "Capstone builds that combine logic with creativity"],
    accent: "violet",
    size: "lg",
    href: "/solutions/ai-coding",
    image: media.kidsCoding[1],
  },
  {
    icon: "radio-tower",
    variant: "iot",
    title: "IoT & Smart Technology",
    tagline: "Sense. Connect. Act.",
    description: "Students design connected devices that sense, transmit and act on real-world data.",
    features: ["Sensor-based mini-projects using everyday scenarios", "Cloud dashboard integration for live data viewing", "Smart-campus themed challenge projects"],
    accent: "cyan",
    size: "md",
    href: "/solutions/iot",
    image: media.circuitMacro[0],
  },
  {
    icon: "glasses",
    variant: "arvr",
    title: "AR / VR Learning",
    tagline: "Step inside the concept.",
    description: "Immersive modules that let students explore concepts too big, small or abstract for a textbook.",
    features: ["Curriculum-linked AR simulations", "VR lab experiences for science and engineering topics", "Creator tools for student-built AR content"],
    accent: "orange",
    size: "md",
    href: "/solutions/ar-vr",
  },
  {
    icon: "hammer",
    variant: "innovation",
    title: "Innovation & Maker Labs",
    tagline: "Their idea. Their build.",
    description: "A dedicated makerspace model where students prototype solutions to problems they choose themselves.",
    features: ["Modular lab layout adaptable to any classroom size", "Tool and material library for rapid prototyping", "Idea-to-prototype mentoring framework"],
    accent: "green",
    size: "md",
    href: "/solutions/innovation-labs",
  },
  {
    icon: "graduation-cap",
    variant: "teacher-training",
    title: "Teacher Training",
    tagline: "Confidence, certified.",
    description: "A certification pathway that builds teacher confidence across every Univerzia module.",
    features: ["Hands-on workshops before classroom rollout", "Ongoing refresher sessions each term", "Mentor-educator support network"],
    accent: "electric",
    size: "md",
    href: "/solutions/teacher-training",
    image: media.teacherTraining[0],
  },
  {
    icon: "book-open",
    variant: "curriculum",
    title: "STEM Curriculum",
    tagline: "Mapped to your timetable.",
    description: "A scaffolded, grade-by-grade curriculum designed to fit within existing school timetables.",
    features: ["Lesson plans mapped to national and state boards", "Assessment rubrics tied to measurable outcomes", "Flexible pacing for full-year or term-based delivery"],
    accent: "cyan",
    size: "md",
    href: "/solutions/stem-curriculum",
  },
  {
    icon: "building-2",
    variant: "implementation",
    title: "School Implementation",
    tagline: "We handle the heavy lifting.",
    description: "End-to-end setup covering infrastructure, scheduling and long-term program management.",
    features: ["Lab design and equipment installation", "Timetable integration planning", "Dedicated implementation manager per school"],
    accent: "violet",
    size: "lg",
    href: "/for-schools",
  },
];
