import { media } from "./media";

// Placeholder testimonials — fictional names and schools for design purposes only.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  school: string;
  audience: "Principal" | "Teacher" | "Parent";
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Bringing Univerzia into our school changed how students approach problems in every subject, not just science. The structured rollout meant our teachers were confident from week one.",
    name: "Anita Sharma",
    role: "Principal",
    school: "Greenfield Public School",
    audience: "Principal",
    photo: media.headshots[2],
  },
  {
    quote:
      "We were looking for a program that wouldn't just sit in a storeroom after the first term. Three years in, our robotics lab is still the busiest room in the building.",
    name: "Rajesh Kulkarni",
    role: "Principal",
    school: "Silver Oak International School",
    audience: "Principal",
    photo: media.headshots[0],
  },
  {
    quote:
      "I was hesitant about teaching robotics with no engineering background, but the training gave me everything I needed. My students now ask better questions than I do.",
    name: "Meera Iyer",
    role: "STEM Educator",
    school: "Maple Leaf School",
    audience: "Teacher",
    photo: media.headshots[3],
  },
  {
    quote:
      "The curriculum strikes a rare balance — structured enough to follow, open enough for students to surprise you. My quietest students often produce the most original projects.",
    name: "Vikram Nair",
    role: "Computer Science Teacher",
    school: "Riverside Academy",
    audience: "Teacher",
    photo: media.headshots[1],
  },
  {
    quote:
      "My daughter used to see coding as something abstract and difficult. Now she explains her robotics project to us at the dinner table with more excitement than her exam results.",
    name: "Sunita Reddy",
    role: "Parent",
    school: "Grade 7 Student",
    audience: "Parent",
    photo: media.headshots[5],
  },
  {
    quote:
      "What stood out was how practical everything felt. My son isn't just learning theory — he's building things he's genuinely proud to show us.",
    name: "Arvind Menon",
    role: "Parent",
    school: "Grade 9 Student",
    audience: "Parent",
    photo: media.headshots[4],
  },
];
