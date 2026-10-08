import type { SceneVariant } from "@/components/illustrations/ScenePanel";
import type { ProjectCategory } from "./projects";

export type SolutionDetail = {
  slug: string;
  navLabel: string;
  title: string;
  tagline: string;
  eyebrow: string;
  heroDescription: string;
  variant: SceneVariant;
  accent: "electric" | "cyan" | "violet" | "green" | "amber" | "orange";
  whatIsIt: string;
  whySchoolsNeedIt: string[];
  whatStudentsLearn: string[];
  whatStudentsBuild: string[];
  whatSchoolReceives: string[];
  curriculumStructure: { stage: string; description: string }[];
  benefits: { title: string; description: string }[];
  implementation: string;
  exampleProjectCategories: ProjectCategory[];
  faqs: { question: string; answer: string }[];
};

export const solutionsDetail: SolutionDetail[] = [
  {
    slug: "stem-robotics",
    navLabel: "STEM & Robotics",
    title: "STEM & Robotics",
    tagline: "Build. Test. Rebuild.",
    eyebrow: "Solutions / STEM & Robotics",
    heroDescription:
      "A structured lab program that takes students from basic mechanics to autonomous robot builds — using kits, guided projects and a progression path that rewards independent design.",
    variant: "robotics",
    accent: "electric",
    whatIsIt:
      "STEM & Robotics is Univerzia's foundational hands-on lab program. Students work with grade-appropriate robotics kits — motors, sensors, controllers and building blocks — to design, assemble and program physical machines. It's the entry point into engineering thinking: every lesson ends with something that moves.",
    whySchoolsNeedIt: [
      "Bridges the gap between textbook physics/engineering concepts and real, testable machines",
      "Gives students a tangible way to fail, debug and iterate — a skill textbooks rarely teach",
      "Provides a visible, demonstrable outcome for parents and management (working robots, not just worksheets)",
      "Forms the foundation that later AI, IoT and coding modules build on top of",
    ],
    whatStudentsLearn: [
      "Mechanical assembly, gears, motors and structural design",
      "Basic circuits, sensors and how machines sense the world",
      "Block-based and text-based programming to control hardware",
      "Systematic debugging — isolating whether a failure is mechanical, electrical or logical",
    ],
    whatStudentsBuild: [
      "Line-following and obstacle-avoiding robots",
      "Simple robotic arms and grippers",
      "Sensor-triggered automated mechanisms",
      "Open-ended capstone builds solving a self-chosen problem",
    ],
    whatSchoolReceives: [
      "A dedicated robotics lab or mobile-cart setup, sized to your space",
      "A grade-wise kit inventory with a replacement/spares plan",
      "Lesson plans and project sheets mapped to your timetable",
      "Teacher certification before student sessions begin",
    ],
    curriculumStructure: [
      { stage: "Foundation (Grades 6-7)", description: "Mechanical assembly, basic circuits, guided builds with fixed outcomes." },
      { stage: "Application (Grades 8-9)", description: "Sensor integration, programmable behavior, semi-guided project briefs." },
      { stage: "Independent Design (Grades 10+)", description: "Open-ended problem statements, student-chosen builds, peer review." },
    ],
    benefits: [
      { title: "Visible outcomes", description: "Every unit ends in a working, demonstrable machine — easy to showcase at school events." },
      { title: "Cross-subject reinforcement", description: "Reinforces physics, math and design concepts through direct application." },
      { title: "Scalable difficulty", description: "The same kit family scales from simple assembly to autonomous, sensor-driven builds." },
    ],
    implementation:
      "Typical rollout takes 6-8 weeks from consultation to first session: lab/space assessment, kit selection, teacher certification (2-3 day workshop), then a phased student launch starting with one grade band before scaling school-wide.",
    exampleProjectCategories: ["Robotics"],
    faqs: [
      {
        question: "Do we need a dedicated room for this?",
        answer: "A dedicated lab is ideal but not required — many partner schools start with a mobile kit cart shared across classrooms and expand to a dedicated space later.",
      },
      {
        question: "What happens if a kit part breaks or goes missing?",
        answer: "Every kit package includes a spares allowance and a straightforward reorder process through your implementation manager.",
      },
      {
        question: "Can non-engineering teachers run these sessions?",
        answer: "Yes — the certification workshop is designed for teachers without an engineering background, with scripted lesson plans and troubleshooting guides.",
      },
    ],
  },
  {
    slug: "ai-coding",
    navLabel: "AI & Coding",
    title: "AI & Coding",
    tagline: "From logic to intelligence.",
    eyebrow: "Solutions / AI & Coding",
    heroDescription:
      "A coding-to-AI pathway that starts with visual block programming and ends with real machine learning projects — vision, speech and data, built by students themselves.",
    variant: "ai-coding",
    accent: "violet",
    whatIsIt:
      "AI & Coding is a progressive programming track that takes students from drag-and-drop logic blocks to writing real Python, and eventually to training and using simple AI models. It treats coding as a thinking tool, not a syntax memorization exercise.",
    whySchoolsNeedIt: [
      "Computational thinking is now a core literacy, not an elective extra",
      "AI is increasingly part of national curriculum guidance — schools need a structured way to introduce it responsibly",
      "Gives students an on-ramp from visual coding to real, employable programming skills",
      "Creates natural cross-links with the Robotics and IoT tracks (coding the machines they build)",
    ],
    whatStudentsLearn: [
      "Sequencing, loops, conditionals and variables through visual blocks",
      "Text-based programming fundamentals (Python)",
      "How machine learning models are trained, tested and where they fail",
      "Responsible-AI basics: bias, data quality and limitations",
    ],
    whatStudentsBuild: [
      "Interactive games and animations (block-based)",
      "Command-line and simple GUI Python programs",
      "Image-classification and voice-recognition mini-projects",
      "A capstone AI project applied to a real-world problem of the student's choosing",
    ],
    whatSchoolReceives: [
      "A computer-lab-ready curriculum requiring no specialized hardware beyond standard PCs",
      "Age-banded project sheets from block-coding through to Python",
      "Pre-configured, safe AI training tools suited to school networks",
      "Teacher training on both the coding track and the AI modules",
    ],
    curriculumStructure: [
      { stage: "Logic Foundations (Grades 6-7)", description: "Block-based programming — sequencing, loops, conditionals, events." },
      { stage: "Real Code (Grades 8-9)", description: "Transition to Python: syntax, functions, simple data structures." },
      { stage: "Applied AI (Grades 10+)", description: "Training and evaluating vision/speech/text models on curated datasets." },
    ],
    benefits: [
      { title: "Gentle on-ramp", description: "Block coding removes the syntax barrier so younger students focus on logic first." },
      { title: "Real employability skills", description: "Python is the same language used in industry — no throwaway teaching language." },
      { title: "Responsible AI framing", description: "Every AI module includes a discussion of limitations and bias, not just capability." },
    ],
    implementation:
      "Runs on your existing computer lab — no new hardware required for the coding track. AI modules use lightweight, browser-based training tools. Teacher onboarding is a 2-day workshop plus ongoing office hours during the first term.",
    exampleProjectCategories: ["AI", "Coding"],
    faqs: [
      {
        question: "Do we need powerful computers for the AI modules?",
        answer: "No — the AI training tools we use are designed to run in a standard browser on typical school lab machines.",
      },
      {
        question: "Is this suitable for students with zero coding background?",
        answer: "Yes, the track starts entirely in block-based visual coding before any text syntax is introduced.",
      },
      {
        question: "How is AI taught responsibly to school-age students?",
        answer: "Every AI project includes a structured discussion of how the model can be wrong, where its training data came from, and its limitations — not just what it can do.",
      },
    ],
  },
  {
    slug: "iot",
    navLabel: "IoT & Smart Technology",
    title: "IoT & Smart Technology",
    tagline: "Sense. Connect. Act.",
    eyebrow: "Solutions / IoT & Smart Technology",
    heroDescription:
      "Students design connected devices that sense real-world data, send it to a dashboard, and act on it automatically — the same pattern behind smart homes, smart cities and smart farms.",
    variant: "iot",
    accent: "cyan",
    whatIsIt:
      "IoT & Smart Technology teaches the sense-connect-act loop that underlies modern connected devices. Students wire sensors (temperature, moisture, motion, light), connect them to a simple cloud dashboard, and program automated responses — building a mental model for how the physical and digital worlds talk to each other.",
    whySchoolsNeedIt: [
      "IoT sits at the intersection of the Robotics and Coding tracks — a natural third step",
      "Directly ties classroom science (data, measurement, graphs) to a live, working system",
      "Introduces networking and data concepts in a hands-on, low-abstraction way",
      "High relevance to real-world career paths in automation and smart infrastructure",
    ],
    whatStudentsLearn: [
      "How sensors convert physical signals into digital data",
      "Sending data from a device to a cloud dashboard",
      "Reading and interpreting live data trends",
      "Programming conditional, automated responses (if moisture is low, turn on the pump)",
    ],
    whatStudentsBuild: [
      "Smart irrigation and soil-monitoring setups",
      "Home automation mini-projects (light/temperature triggers)",
      "Campus environment dashboards (classroom temperature, noise levels)",
      "A connected-device capstone addressing a school or community need",
    ],
    whatSchoolReceives: [
      "Sensor kits scoped to your enrolled grade bands",
      "A pre-configured, student-safe cloud dashboard (no personal data collection)",
      "Project sheets tying each build to a measurable, real outcome",
      "Teacher training covering both the hardware and dashboard side",
    ],
    curriculumStructure: [
      { stage: "Sensing Basics (Grades 7-8)", description: "Wiring individual sensors, reading raw values, simple thresholds." },
      { stage: "Connected Systems (Grades 9-10)", description: "Sending data to a dashboard, visualizing trends over time." },
      { stage: "Automation Projects (Grades 10+)", description: "Full sense-connect-act builds solving a chosen real-world problem." },
    ],
    benefits: [
      { title: "Cross-curricular data literacy", description: "Students read and interpret real sensor data, reinforcing science and math skills." },
      { title: "Builds on prior tracks", description: "Reuses robotics wiring skills and coding logic already taught in earlier modules." },
      { title: "Community-relevant projects", description: "Capstones are framed around real school or local problems, not abstract exercises." },
    ],
    implementation:
      "Best introduced after at least one term of the Robotics track, since it reuses wiring and basic programming skills. Setup includes sensor kits, a shared dashboard account per class, and a half-day teacher workshop.",
    exampleProjectCategories: ["IoT"],
    faqs: [
      {
        question: "Does this require an internet connection in the classroom?",
        answer: "A connection is needed to send data to the dashboard, but sessions are designed to tolerate intermittent connectivity — data queues locally and syncs when available.",
      },
      {
        question: "Is any student data collected or stored?",
        answer: "No personal data is collected — dashboards only display sensor readings (temperature, moisture, etc.), not any information about students.",
      },
      {
        question: "What grade level is this best suited for?",
        answer: "We recommend introducing IoT from Grade 7 onward, after students have basic wiring and programming exposure from the Robotics track.",
      },
    ],
  },
  {
    slug: "ar-vr",
    navLabel: "AR / VR Learning",
    title: "AR / VR Learning",
    tagline: "Step inside the concept.",
    eyebrow: "Solutions / AR / VR Learning",
    heroDescription:
      "Immersive modules that let students explore concepts too big, too small or too abstract for a textbook — from a beating heart to a solar system, at true scale.",
    variant: "arvr",
    accent: "orange",
    whatIsIt:
      "AR/VR Learning brings curriculum-linked immersive simulations into science and engineering topics. Using headsets or tablet-based AR, students can walk through a human circulatory system, manipulate a 3D molecule, or explore planetary orbits — experiences that are impossible to replicate with diagrams alone.",
    whySchoolsNeedIt: [
      "Makes abstract or hard-to-visualize concepts concrete and memorable",
      "Engages visual and kinesthetic learners who struggle with text-only material",
      "Differentiates the school's offering with a genuinely novel classroom experience",
      "Doubles as an early, low-risk introduction to spatial computing concepts",
    ],
    whatStudentsLearn: [
      "3D spatial reasoning and scale",
      "How immersive simulations model real scientific systems",
      "Basic AR content interaction and navigation",
      "For senior students: an introduction to how AR/VR content itself is built",
    ],
    whatStudentsBuild: [
      "Guided walkthroughs of curriculum topics (biology, astronomy, chemistry)",
      "AR-anchored object explorations using tablets",
      "For senior students: simple AR creator-tool projects (placing and annotating 3D objects)",
    ],
    whatSchoolReceives: [
      "A content library mapped to your science and engineering syllabus",
      "Either headset-based or tablet-AR delivery, depending on your budget and space",
      "Session plans that fit inside a standard class period",
      "Teacher training on running sessions safely and effectively",
    ],
    curriculumStructure: [
      { stage: "Guided Exploration (Grades 6-8)", description: "Teacher-led walkthroughs of curriculum-linked 3D simulations." },
      { stage: "Independent Interaction (Grades 9-10)", description: "Students navigate and annotate simulations individually or in pairs." },
      { stage: "Creator Tools (Grades 10+)", description: "Introductory AR content placement and simple scene building." },
    ],
    benefits: [
      { title: "Memorable learning", description: "Immersive experiences measurably improve recall of spatial and scientific concepts." },
      { title: "Flexible delivery", description: "Works with either dedicated headsets or tablet-based AR, depending on budget." },
      { title: "Differentiated offering", description: "A visible, novel feature that sets the school's program apart for open days and admissions." },
    ],
    implementation:
      "Can launch with as few as 5-10 headsets or a class set of AR-ready tablets shared across sections. Implementation includes content licensing setup, a device care/rotation plan, and a one-day teacher training session.",
    exampleProjectCategories: [],
    faqs: [
      {
        question: "Are headsets required, or can this run on tablets?",
        answer: "Both options are supported — many schools start with tablet-based AR, which needs no dedicated headset budget, and add headsets later.",
      },
      {
        question: "Is VR content safe for younger students?",
        answer: "Yes — session lengths and content are calibrated by age group, with breaks built in and no content requiring intense motion.",
      },
      {
        question: "Which subjects does the content library cover?",
        answer: "The initial library focuses on biology, chemistry, physics and astronomy, with additional subject packs added over time.",
      },
    ],
  },
  {
    slug: "innovation-labs",
    navLabel: "Innovation & Maker Labs",
    title: "Innovation & Maker Labs",
    tagline: "Their idea. Their build.",
    eyebrow: "Solutions / Innovation & Maker Labs",
    heroDescription:
      "A dedicated makerspace model where students choose the problem, design the solution and build the prototype — with tools, materials and mentorship on tap.",
    variant: "innovation",
    accent: "green",
    whatIsIt:
      "Innovation & Maker Labs is the least scripted of Univerzia's programs by design. Instead of a fixed project brief, students identify a real problem — at school, at home or in their community — and are mentored through ideation, prototyping and iteration using a shared tool and material library.",
    whySchoolsNeedIt: [
      "Builds genuine ownership and initiative, not just guided task completion",
      "Gives naturally creative or entrepreneurial students an outlet the standard curriculum doesn't provide",
      "Produces the most compelling showcase projects for school events and competitions",
      "Complements structured tracks (Robotics, Coding, IoT) by giving students a place to combine those skills freely",
    ],
    whatStudentsLearn: [
      "Problem framing and user-need identification",
      "Rapid, low-cost prototyping techniques",
      "Iteration based on testing and feedback, not first-attempt perfection",
      "Basic project pitching and presentation",
    ],
    whatStudentsBuild: [
      "Cross-disciplinary prototypes combining robotics, coding and everyday materials",
      "Assistive-technology concepts",
      "Sustainability and campus-improvement projects",
      "Anything a student can defend as solving a real problem",
    ],
    whatSchoolReceives: [
      "A modular lab layout that adapts to any available classroom size",
      "A shared tool and material library with a restocking plan",
      "A mentoring framework for teachers to guide without over-directing",
      "A showcase/exhibition structure for end-of-term project days",
    ],
    curriculumStructure: [
      { stage: "Ideation Sprints (all grades)", description: "Structured brainstorming sessions to identify and frame real problems." },
      { stage: "Prototyping Cycles", description: "Build-test-refine loops using the shared tool library, with mentor check-ins." },
      { stage: "Showcase & Pitch", description: "End-of-term exhibition where students present finished prototypes." },
    ],
    benefits: [
      { title: "Genuine ownership", description: "Self-chosen problems produce noticeably higher engagement than assigned briefs." },
      { title: "Skill integration", description: "Gives students a place to combine robotics, coding and IoT skills freely." },
      { title: "Showcase-ready output", description: "Produces the projects schools most want to display at events and competitions." },
    ],
    implementation:
      "Works best as a weekly or biweekly open-lab slot rather than a fixed weekly class, since project timelines vary. Setup includes a shared tool/material budget and a mentor-training session focused on facilitation over instruction.",
    exampleProjectCategories: ["Sustainability"],
    faqs: [
      {
        question: "How do teachers grade something this open-ended?",
        answer: "We provide a rubric focused on process — problem framing, iteration and presentation — rather than grading the novelty of the final idea alone.",
      },
      {
        question: "What if a student's idea needs materials we don't have?",
        answer: "The shared material library covers common prototyping needs; your implementation manager can help source anything project-specific.",
      },
      {
        question: "Can this run alongside our existing robotics or coding classes?",
        answer: "Yes — it's designed as a complementary open-lab slot where students apply skills learned in the structured tracks.",
      },
    ],
  },
  {
    slug: "teacher-training",
    navLabel: "Teacher Training",
    title: "Teacher Training",
    tagline: "Confidence, certified.",
    eyebrow: "Solutions / Teacher Training",
    heroDescription:
      "A certification pathway that builds real classroom confidence across every Univerzia module — because a program is only as good as the teacher running it.",
    variant: "teacher-training",
    accent: "electric",
    whatIsIt:
      "Teacher Training is the enablement layer behind every other Univerzia solution. Rather than handing teachers a manual, we run hands-on workshops before classroom rollout, followed by ongoing refresher sessions and a mentor-educator support network for year-round questions.",
    whySchoolsNeedIt: [
      "The single biggest predictor of program success is teacher confidence, not equipment quality",
      "Removes the dependency on hiring specialized STEM/robotics teachers",
      "Keeps existing staff current as curriculum and technology evolve each year",
      "Reduces support-ticket load on the implementation team over time",
    ],
    whatStudentsLearn: [],
    whatStudentsBuild: [],
    whatSchoolReceives: [
      "Pre-rollout hands-on workshops for every module a school adopts",
      "Termly refresher sessions covering curriculum updates",
      "Access to a mentor-educator network for day-to-day questions",
      "Printed and digital facilitation guides for every lesson",
    ],
    curriculumStructure: [
      { stage: "Foundation Workshop", description: "2-3 day hands-on session before any student-facing rollout." },
      { stage: "Classroom Shadowing", description: "First-term sessions supported by a Univerzia mentor, in person or remote." },
      { stage: "Ongoing Certification", description: "Termly refreshers keep teachers current as curriculum evolves." },
    ],
    benefits: [
      { title: "No specialist hiring needed", description: "Existing science, math or computer teachers can confidently lead sessions." },
      { title: "Consistent delivery quality", description: "Standardized facilitation guides keep classroom quality consistent across sections." },
      { title: "Year-round support", description: "The mentor network means questions get answered mid-term, not just at initial training." },
    ],
    implementation:
      "Runs ahead of every other solution's rollout — typically 2-3 days per module, scheduled around school holidays or professional-development days to minimize disruption.",
    exampleProjectCategories: [],
    faqs: [
      {
        question: "Do teachers need a technical or engineering background?",
        answer: "No — our workshops are designed for teachers from any subject background, with structured, step-by-step facilitation guides.",
      },
      {
        question: "How much time do teachers need to commit?",
        answer: "The initial workshop is 2-3 days; ongoing refreshers are typically half a day per term.",
      },
      {
        question: "What happens if a trained teacher leaves the school?",
        answer: "New teachers can join the next scheduled workshop, or we can arrange a dedicated onboarding session for a mid-year replacement.",
      },
    ],
  },
  {
    slug: "stem-curriculum",
    navLabel: "STEM Curriculum",
    title: "STEM Curriculum",
    tagline: "Mapped to your timetable.",
    eyebrow: "Solutions / STEM Curriculum",
    heroDescription:
      "A scaffolded, grade-by-grade curriculum designed to fit within existing school timetables — structured enough to follow, flexible enough to adapt.",
    variant: "curriculum",
    accent: "cyan",
    whatIsIt:
      "STEM Curriculum is the structured backbone that ties every Univerzia module together into a coherent, gradeable program. It provides lesson plans, project sheets and assessment rubrics mapped to national and state board frameworks, so STEM learning integrates with — rather than competes with — the rest of the academic calendar.",
    whySchoolsNeedIt: [
      "Prevents STEM sessions from feeling like disconnected, ad-hoc activities",
      "Gives academic coordinators a gradeable, reportable structure for parents and management",
      "Ensures continuity even as individual teachers change over time",
      "Aligns with NEP 2020 guidance on experiential and skill-based learning",
    ],
    whatStudentsLearn: [],
    whatStudentsBuild: [],
    whatSchoolReceives: [
      "A full-year, grade-wise lesson plan calendar",
      "Assessment rubrics tied to measurable, reportable outcomes",
      "Flexible pacing options for full-year or term-based delivery",
      "Alignment mapping to CBSE, ICSE and major state board frameworks",
    ],
    curriculumStructure: [
      { stage: "Term Planning", description: "Full-year calendar mapped against your existing academic schedule." },
      { stage: "Assessment Design", description: "Rubrics for practical, project-based and written evaluation." },
      { stage: "Continuous Review", description: "Annual curriculum updates reflecting new technology and board guidance." },
    ],
    benefits: [
      { title: "Reportable structure", description: "Turns hands-on sessions into a gradeable subject with clear, trackable outcomes." },
      { title: "Board-aligned", description: "Mapped to CBSE, ICSE and major state boards, plus NEP 2020 guidance." },
      { title: "Continuity across staff changes", description: "The written curriculum ensures quality doesn't depend on any one teacher." },
    ],
    implementation:
      "Curriculum mapping is typically the first deliverable in any Univerzia partnership — completed during the Planning stage, before lab setup or teacher training begins.",
    exampleProjectCategories: [],
    faqs: [
      {
        question: "Can the curriculum be customized to our specific timetable?",
        answer: "Yes — pacing can be adjusted for full-year weekly sessions or compressed term-based blocks, depending on your timetable structure.",
      },
      {
        question: "Does this replace our existing computer science or science curriculum?",
        answer: "No — it's designed to complement existing subjects with hands-on, project-based reinforcement, not replace core academic requirements.",
      },
      {
        question: "How often is the curriculum updated?",
        answer: "We review and update curriculum content annually to reflect new board guidance and technology changes.",
      },
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutionsDetail.find((s) => s.slug === slug);
}
