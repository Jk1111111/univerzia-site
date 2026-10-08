export type WhyStemTopic = {
  icon: string;
  tag: string;
  title: string;
  description: string;
};

export const whyStem = {
  headline: "Skills That Outlast the Syllabus",
  intro:
    "The world is changing faster than textbooks can keep up, so we designed a learning approach that builds the thinking skills behind every future breakthrough.",
  topics: [
    { icon: "brain", tag: "Critical Thinking", title: "Question First, Answer Later", description: "Students learn to break down problems before rushing to solve them." },
    { icon: "puzzle", tag: "Problem Solving", title: "Stuck Is Just Step One", description: "Every challenge is reframed as a puzzle with more than one path through." },
    { icon: "sparkles", tag: "Creativity", title: "Original by Design", description: "Open-ended projects reward imagination as much as accuracy." },
    { icon: "users", tag: "Collaboration", title: "Better Built Together", description: "Team-based builds teach students to design, disagree and deliver together." },
    { icon: "code-2", tag: "Coding", title: "Logic Made Visible", description: "Students turn abstract logic into programs, apps and animations they can see work." },
    { icon: "bot", tag: "Robotics", title: "From Circuit to Motion", description: "Learners wire, assemble and program machines that move, sense and respond." },
    { icon: "cpu", tag: "AI Literacy", title: "Understanding the Machine", description: "Students explore how intelligent systems learn, decide and sometimes get it wrong." },
    { icon: "lightbulb", tag: "Innovation", title: "Ideas With an Exit Plan", description: "Every concept is pushed toward a working prototype, not just a diagram." },
  ] satisfies WhyStemTopic[],
};
