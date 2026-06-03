/* ─────────────────────────────────────────────────────────────────
   Univerzia AI — Programs / Course catalog content
   TypeScript port of ui_kits/programs/courses-data.js
   Source of truth: classes/pagedata/courses.php
   Adding a course here makes it appear automatically — no markup edits.
   ───────────────────────────────────────────────────────────────── */

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Mentor {
  name: string;
  role: string;
  initials: string;
  grad: string;
}

export interface Category {
  key: string;
  label: string;
}

export interface CurriculumModule {
  number: string;
  title: string;
  color: string;
  topics: string[];
}

export interface Course {
  id: string;
  cat: string;
  title: string;
  icon: string;
  brand?: boolean;
  c: string;
  duration: string;
  level: Level;
  mentor: string;
  popular?: boolean;
  desc: string;
  learn?: string[];
  includes?: string[];
  curriculum?: CurriculumModule[];
}

/* Mentor roster */
export const mentors: Record<string, Mentor> = {
  gautam: {
    name: "Gautam Shukla",
    role: "Full-Stack Dev · AI & Data Science",
    initials: "GS",
    grad: "linear-gradient(135deg,#7C3AED,#6366F1)",
  },
  shashank: {
    name: "Shashank Mathur",
    role: "AI Solutions Lead · Agentic AI",
    initials: "SM",
    grad: "linear-gradient(135deg,#F97316,#FB923C)",
  },
};

/* Category facets — power the filter pills */
export const categories: Category[] = [
  { key: "all", label: "All Courses" },
  { key: "ai-workshops", label: "AI Workshops" },
  { key: "ai-mastery", label: "AI Mastery" },
  { key: "tech", label: "Tech Program" },
  { key: "data", label: "Data Program" },
];

export const catLabel: Record<string, string> = {
  "ai-workshops": "AI Workshops",
  "ai-mastery": "AI Mastery",
  tech: "Tech Program",
  data: "Data Program",
};

/* All live courses */
export const courses: Course[] = [
  /* ── AI WORKSHOPS — flagship foundation ──────────────────── */
  {
    id: "ai-foundation-workshop",
    cat: "ai-workshops",
    title: "AI Tools & Prompt Engineering Workshop",
    icon: "fa-bullseye",
    brand: false,
    c: "#7C3AED",
    duration: "2 Weeks",
    level: "Beginner",
    mentor: "gautam",
    popular: true,
    desc: "Use AI tools and prompt engineering to save massive time, boost productivity, and stay relevant in the AI-driven job market.",
    learn: [
      "Use AI & ChatGPT to save massive time in daily work",
      "Prompt engineering as a career and productivity skill",
      "AI for professional growth (Excel, coding, LinkedIn, interviews)",
      "Stay relevant and secure in the AI-driven job market",
    ],
    includes: [
      "AI Tools",
      "Prompt Engineering",
      "AI Productivity",
      "ChatGPT Mastery",
      "AI for Excel",
      "AI for LinkedIn",
      "AI for Interviews",
      "AI for Coding",
    ],
  },

  /* ── AI MASTERY ──────────────────────────────────────────── */
  {
    id: "prompt-eng",
    cat: "ai-mastery",
    title: "Prompt Engineering Mastery",
    icon: "fa-wand-magic-sparkles",
    brand: false,
    c: "#6366F1",
    duration: "5 Weeks",
    level: "Intermediate",
    mentor: "gautam",
    popular: true,
    desc: "Turn AI into a personal assistant. Master advanced prompting to get dramatically better, more reliable results from any AI tool.",
    learn: [
      "Get 10x better responses from AI tools",
      "Turn AI into your personal assistant",
      "Master advanced prompt engineering techniques",
    ],
  },
  {
    id: "office-ai",
    cat: "ai-mastery",
    title: "Day to Day Office Work Using AI",
    icon: "fa-briefcase",
    brand: false,
    c: "#F59E0B",
    duration: "5 Weeks",
    level: "Beginner",
    mentor: "shashank",
    desc: "Cut your daily workload in half. Master Microsoft & Google AI tools and turn boring data into beautiful charts in minutes.",
    learn: [
      "Reduce workload by 50% using AI",
      "Master Microsoft & Google AI tools",
      "Turn boring data into beautiful charts",
    ],
  },
  {
    id: "job-hunt-ai",
    cat: "ai-mastery",
    title: "Job Hunting to Get 40% Salary Hike Using AI",
    icon: "fa-arrow-trend-up",
    brand: false,
    c: "#10B981",
    duration: "5 Weeks",
    level: "Intermediate",
    mentor: "gautam",
    popular: true,
    desc: "Build an irresistible AI-crafted resume, prepare for interviews like a pro, and negotiate a 40% salary hike using AI tools.",
    learn: [
      "Create an irresistible resume with AI",
      "Prepare for interviews like a pro",
      "Negotiate salary using AI tools",
    ],
  },
  {
    id: "side-hustle-ai",
    cat: "ai-mastery",
    title: "Build a Side Hustle Using AI",
    icon: "fa-rocket",
    brand: false,
    c: "#D946EF",
    duration: "5 Weeks",
    level: "Intermediate",
    mentor: "shashank",
    desc: "Find profitable AI business ideas in minutes, automate and scale your side hustle, and sell AI-generated content & products.",
    learn: [
      "Find profitable AI business ideas in minutes",
      "Automate & scale your side hustle",
      "Sell AI-generated content & products",
    ],
  },
  {
    id: "research-ai",
    cat: "ai-mastery",
    title: "AI-Powered Research & Report Writing",
    icon: "fa-file-lines",
    brand: false,
    c: "#7C3AED",
    duration: "6 Weeks",
    level: "Intermediate",
    mentor: "gautam",
    desc: "Summarize research papers in seconds, collect data fast and accurately, and turn raw data into insightful AI-written reports.",
    learn: [
      "Summarize research papers in seconds",
      "Fast & accurate data collection",
      "Turn raw data into insightful AI reports",
    ],
  },

  /* ── TECH PROGRAM ────────────────────────────────────────── */
  {
    id: "python-ai",
    cat: "tech",
    title: "Python with AI",
    icon: "fa-python",
    brand: true,
    c: "#3776AB",
    duration: "5 Weeks",
    level: "Beginner",
    mentor: "gautam",
    popular: true,
    desc: "Master Python from scratch and integrate AI capabilities to build smart, automated applications.",
    curriculum: [
      { number: "01", title: "Python Essentials & AI Transformation", color: "#306998", topics: ["Why Python? (Simplicity, Libraries, Community)", "Real-World Applications: AI/ML, Web Dev, Automation", "Variables & Naming Rules", "Data Types: Numbers, Strings, Booleans", "Google Colab Setup & AI Code Generation", "Type Conversion (int, float, str, list)"] },
      { number: "02", title: "Data Types, Control Flow & Banking Project", color: "#FFB300", topics: ["Deep Dive into Data Types", "Practical Typecasting (Account systems, UPI logic)", "Control Flow: if, elif, else, loops", "Data Structures: Lists, Dictionaries", "Mini Project: Simple Banking System"] },
      { number: "03", title: "Logic Building, Operators & Loop Control", color: "#646464", topics: ["Flowcharts & Logic Visualization", "Operators: Comparison vs Assignment", "Loops Mastery: while, for, range()", "Loop Control: break, continue, pass", "Practical Programs: Calculator, Even/Odd Checker"] },
      { number: "04", title: "Functions & Advanced Practical Logic", color: "#306998", topics: ["Understanding Functions (def, parameters)", "Built-in vs User-defined Functions", "Advanced Functional Programming: map(), lambda", "Practical Exercises: Word filtering, Character counting", "Refactoring for clean code"] },
      { number: "05", title: "Data Analysis with NumPy & Pandas", color: "#E8652B", topics: ["EDA Fundamentals: Identifying patterns & outliers", "Core Libraries: NumPy, Pandas, Matplotlib, Seaborn", "Data Cleaning: Handling missing values, duplicates", "Data Aggregation & Grouping", "Visualizations: Bar, Line, Pie charts, Histograms"] },
    ],
  },
  {
    id: "nocode-ai",
    cat: "tech",
    title: "Coding Using AI — Build No-Code AI SaaS Apps",
    icon: "fa-laptop-code",
    brand: false,
    c: "#F97316",
    duration: "6 Weeks",
    level: "Intermediate",
    mentor: "shashank",
    desc: "Create AI-powered web apps, chatbots, and dashboards without writing traditional code.",
    curriculum: [
      { number: "01", title: "Introduction to No-Code & AI Ecosystem", color: "#8e44ad", topics: ["The Rise of No-Code Development", "Overview of Tools: Bubble, Glide, FlutterFlow", "Integrating AI Models (OpenAI, Claude) without code", "Understanding APIs & Webhooks basics"] },
      { number: "02", title: "Building User Interfaces & Database Design", color: "#2980b9", topics: ["UI/UX Principles for No-Code Apps", "Responsive Design Layouts", "Database Structuring: Users, Content, Relations", "Data Types and Security Rules"] },
      { number: "03", title: "Logic & Workflows", color: "#27ae60", topics: ["Creating Visual Workflows", "Conditional Logic & Triggers", "User Authentication & Profiles", "Connecting Frontend Actions to Backend Data"] },
      { number: "04", title: "AI Integration & Chatbots", color: "#d35400", topics: ["Connecting OpenAI API", "Building Custom Chat Interfaces", "Prompt Engineering for App Logic", "Handling AI Responses & Error States"] },
      { number: "05", title: "Launch & Monetization", color: "#c0392b", topics: ["Deployment Strategies", "Setting up Payments (Stripe Integration)", "SaaS Business Models", "Marketing your No-Code AI App"] },
    ],
  },
  {
    id: "agentic-ai",
    cat: "tech",
    title: "AI Automation Workflow — Agentic AI",
    icon: "fa-robot",
    brand: false,
    c: "#7C3AED",
    duration: "6 Weeks",
    level: "Advanced",
    mentor: "shashank",
    desc: "Use AI agents to automate complex workflows and boost business efficiency at scale.",
    curriculum: [
      { number: "01", title: "Foundations of AI Agents", color: "#16a085", topics: ["What are AI Agents?", "Difference between Chatbots and Agents", "Tools Overview: AutoGPT, BabyAGI, LangChain", "Use Cases in Business Automation"] },
      { number: "02", title: "Workflow Automation Platforms", color: "#2c3e50", topics: ["Deep Dive into Make (Integromat)", "Introduction to Zapier & n8n", "Connecting Apps & Transferring Data", "Triggering Automations based on Events"] },
      { number: "03", title: "Building Autonomous Agents", color: "#8e44ad", topics: ["Defining Agent Goals & Constraints", "Memory & Context Management", "Tool Use: Web Browsing, File Execution", "Multi-Agent Collaboration"] },
      { number: "04", title: "Advanced Integration & Custom Actions", color: "#e67e22", topics: ["Webhooks & API Requests", "Parsing Unstructured Data with AI", "Automating Content Creation & Social Media", "CRM & Email Automation Workflows"] },
      { number: "05", title: "Deployment & Optimization", color: "#34495e", topics: ["Hosting AI Agents", "Monitoring Performance & Costs", "Error Handling & Reliability", "Scaling Automated Systems"] },
    ],
  },

  /* ── DATA PROGRAM ────────────────────────────────────────── */
  {
    id: "data-science",
    cat: "data",
    title: "Data Science with AI",
    icon: "fa-chart-simple",
    brand: false,
    c: "#06B6D4",
    duration: "6 Weeks",
    level: "Intermediate",
    mentor: "gautam",
    popular: true,
    desc: "Master DSA, system design, and generative AI with real-world projects and 1:1 mentorship.",
    curriculum: [
      { number: "01", title: "Introduction to Data Science & AI", color: "#306998", topics: ["What is Data Science?", "AI vs ML vs Deep Learning", "Data Science Lifecycle", "Tools Setup: Python, Jupyter, Anaconda"] },
      { number: "02", title: "Python for Data Analysis", color: "#FFB300", topics: ["Python Basics Recap", "NumPy for Numerical Computing", "Pandas (DataFrames & Series)", "Data Cleaning & Preprocessing"] },
      { number: "03", title: "Data Visualization", color: "#E8652B", topics: ["Matplotlib Fundamentals", "Seaborn for Statistical Plots", "Creating Dashboards", "Storytelling with Data"] },
      { number: "04", title: "Introduction to Machine Learning", color: "#27ae60", topics: ["Supervised vs Unsupervised Learning", "Linear Regression Basics", "Logistic Regression", "Model Evaluation Metrics"] },
      { number: "05", title: "Generative AI Basics", color: "#8e44ad", topics: ["Intro to LLMs (Large Language Models)", "Prompt Engineering for Data", "Using AI for Code Generation", "Future of AI in Data Science"] },
    ],
  },
  {
    id: "adv-analytics",
    cat: "data",
    title: "Advanced Data Analysis Program",
    icon: "fa-chart-line",
    brand: false,
    c: "#6366F1",
    duration: "6 Weeks",
    level: "Intermediate",
    mentor: "gautam",
    desc: "Comprehensive, industry-aligned curriculum with hands-on, end-to-end project experience.",
    curriculum: [
      { number: "01", title: "Data Analysis Foundations", color: "#2980b9", topics: ["The Data Analysis Process", "Asking the Right Questions", "Data Types & Measurement Levels", "Excel for Data Analysis"] },
      { number: "02", title: "SQL for Data Analysis", color: "#e67e22", topics: ["Relational Databases Overview", "SELECT, FROM, WHERE", "Joins and Unions", "Aggregations (GROUP BY)"] },
      { number: "03", title: "Data Visualization with BI Tools", color: "#D4A017", topics: ["Introduction to Power BI / Tableau", "Connecting to Data Sources", "Building Interactive Charts", "Designing Effective Dashboards"] },
      { number: "04", title: "Statistical Analysis", color: "#c0392b", topics: ["Descriptive Statistics", "Probability Basics", "Hypothesis Testing", "Correlation vs Causation"] },
      { number: "05", title: "Capstone Project", color: "#2c3e50", topics: ["Choosing a Real-world Dataset", "End-to-End Analysis", "Creating a Report/Dashboard", "Presenting Findings"] },
    ],
  },
  {
    id: "sql-ai",
    cat: "data",
    title: "SQL Management with AI",
    icon: "fa-database",
    brand: false,
    c: "#10B981",
    duration: "5 Weeks",
    level: "Beginner",
    mentor: "shashank",
    desc: "Master SQL queries, database management, and use AI to optimize performance and build pipelines.",
    curriculum: [
      { number: "01", title: "Database Fundamentals", color: "#34495e", topics: ["What is a DBMS?", "Relational vs Non-Relational", "ER Diagrams & Schema Design", "Installing SQL Workbench"] },
      { number: "02", title: "Core SQL Commands", color: "#2980b9", topics: ["DDL (CREATE, ALTER, DROP)", "DML (INSERT, UPDATE, DELETE)", "DQL (SELECT)", "Constraints (PK, FK, UNIQUE)"] },
      { number: "03", title: "Advanced Querying", color: "#16a085", topics: ["Subqueries", "Joins (Inner, Left, Right, Full)", "Views & Indexes", "Stored Procedures Basics"] },
      { number: "04", title: "AI for SQL", color: "#8e44ad", topics: ["Writing Queries with AI Assistants", "Optimizing Queries using AI", "Debugging SQL Errors with AI", "Natural Language to SQL"] },
      { number: "05", title: "Database Administration Basics", color: "#7f8c8d", topics: ["User Management", "Backup & Recovery", "Security Best Practices", "Performance Tuning"] },
    ],
  },
  {
    id: "excel-ai",
    cat: "data",
    title: "Excel with AI",
    icon: "fa-file-excel",
    brand: false,
    c: "#1D6F42",
    duration: "4 Weeks",
    level: "Beginner",
    mentor: "shashank",
    desc: "Master Excel for data analysis. Use AI to generate formulas, automate tasks, and visualize trends instantly.",
    curriculum: [
      { number: "01", title: "Excel Essentials & AI Integration", color: "#1D6F42", topics: ["Interface & Shortcuts", "Basic Formulas (SUM, COUNT)", "Intro to AI in Excel"] },
      { number: "02", title: "Data Management", color: "#217346", topics: ["Sorting & Filtering", "Conditional Formatting", "Data Validation", "AI Data Cleaning"] },
      { number: "03", title: "Functions & AI Formulas", color: "#107C41", topics: ["VLOOKUP & XLOOKUP", "IF & Nested Logic", "Generating Formulas with AI"] },
      { number: "04", title: "Analysis & Visualization", color: "#33c481", topics: ["Pivot Tables", "Charts & Graphs", "Building Dashboards", "AI Insights"] },
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────── */
export const LEVELS: Record<Level, string> = {
  Beginner: "#10B981",
  Intermediate: "#6366F1",
  Advanced: "#7C3AED",
};
export const LEVEL_ORDER: Record<Level, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export function weeks(d: string): number {
  const m = (d || "").match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}
export function moduleCount(c: Course): number {
  return c.curriculum
    ? c.curriculum.length
    : c.includes
      ? c.includes.length
      : c.learn
        ? c.learn.length
        : 0;
}
