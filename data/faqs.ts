export type Faq = { question: string; answer: string; category: string };

export const faqs: Faq[] = [
  {
    question: "What does a Univerzia program include?",
    answer:
      "A Univerzia program includes lab infrastructure, curriculum materials, hands-on kits, teacher training and ongoing technical support. Schools also receive assessment tools and progress-tracking dashboards to measure student outcomes over time.",
    category: "Program Overview",
  },
  {
    question: "Which school boards does Univerzia support?",
    answer:
      "Our curriculum is designed to align with CBSE, ICSE and major state board frameworks, along with NEP 2020 guidelines. Content is adapted to fit each school's existing academic structure without disrupting core subjects.",
    category: "School Boards",
  },
  {
    question: "How is teacher training conducted?",
    answer:
      "Training combines in-person workshops with follow-up online sessions, covering both technical skills and classroom facilitation techniques. Teachers are certified before student sessions begin and receive refresher training each academic term.",
    category: "Teacher Training",
  },
  {
    question: "Is the curriculum fixed or customizable?",
    answer:
      "While our core curriculum framework stays consistent for quality, schools can adjust pacing, project themes and elective modules based on grade levels and available time. We work with academic coordinators to fit the program into existing timetables.",
    category: "Curriculum",
  },
  {
    question: "Can the program be tailored to our school's specific needs?",
    answer:
      "Yes — customization options include lab size, kit selection, subject integration and language of instruction. Our implementation team conducts an initial assessment to recommend the best-fit configuration for your campus.",
    category: "Customization",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Most schools move from initial consultation to a fully functional lab within six to ten weeks, depending on infrastructure readiness. Larger campuses or multi-lab setups may require a phased rollout across a term.",
    category: "Implementation & Duration",
  },
  {
    question: "What kind of ongoing support is provided?",
    answer:
      "Schools receive dedicated support for equipment maintenance, curriculum updates and teacher queries throughout the academic year. A relationship manager is assigned to each partner school for continuity.",
    category: "Ongoing Support",
  },
  {
    question: "What age groups can participate in Univerzia programs?",
    answer:
      "Our programs are structured across primary, middle and senior school levels, with content complexity increasing by grade. Activities range from simple building blocks for younger students to advanced AI and IoT projects for senior grades.",
    category: "Grade Levels",
  },
  {
    question: "What infrastructure does a school need to get started?",
    answer:
      "A dedicated classroom or lab space with basic electrical points and internet connectivity is typically sufficient to begin. Our team assesses your existing space and recommends any additional setup required during the consultation phase.",
    category: "Infrastructure & Lab Setup",
  },
  {
    question: "What happens if equipment breaks or needs replacement?",
    answer:
      "Every kit package includes a spares allowance for common wear-and-tear parts, and a straightforward reorder process through your assigned relationship manager for anything beyond that.",
    category: "Equipment",
  },
  {
    question: "How can our school get started with Univerzia?",
    answer:
      "Getting started begins with booking a demo session, where our team walks you through the program and assesses your school's needs. From there, we move into a customized proposal, followed by scheduling and implementation.",
    category: "Implementation & Duration",
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
