export type JourneyStep = {
  icon: string;
  title: string;
  description: string;
};

export const schoolJourney = {
  eyebrow: "For School Leaders",
  headline: "We Don't Just Supply Equipment. We Build the Whole Ecosystem.",
  intro:
    "From the first conversation to the trophy shelf, every stage of the Univerzia partnership is planned, staffed and supported — so your team never has to figure it out alone.",
  steps: [
    { icon: "search", title: "Consultation", description: "We understand your school's goals, space and student profile through an initial consultation." },
    { icon: "pencil-ruler", title: "Planning", description: "A custom lab and curriculum roadmap is mapped to your grades, timetable and budget." },
    { icon: "wrench", title: "Lab Setup", description: "Workstations, kits and devices are installed and tested, ready for the first session." },
    { icon: "book-open", title: "Curriculum", description: "Grade-wise lesson plans and project sheets are handed to teachers before rollout." },
    { icon: "graduation-cap", title: "Teacher Training", description: "Educators complete hands-on certification so they can lead sessions with confidence." },
    { icon: "rocket", title: "Student Programs", description: "Structured sessions begin, pairing curriculum with hands-on project time." },
    { icon: "trophy", title: "Competitions", description: "Students showcase builds at inter-school meets and innovation challenges." },
    { icon: "life-buoy", title: "Ongoing Support", description: "A dedicated team handles maintenance, updates and year-on-year renewal." },
  ] satisfies JourneyStep[],
};
