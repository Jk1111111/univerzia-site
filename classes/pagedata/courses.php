<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Courses page data for local_univerziaai
 *
 * @package    local_uniwersiaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get courses page data
 */
function local_univerziaai_get_courses_data($assetsurl)
{
    return [
        'pagetitle' => 'AI & Data Science Courses | Learn with UniverziaAI',
        'metadescription' => 'Enroll in AI, Data Science, Python, Prompt Engineering, and No-Code AI courses at UniverziaAI. Practical, hands-on training with industry mentors.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=courses',
        'og_image' => $assetsurl . '/hero_student.png',
        'pagestyle' => '',
        'hero_title' => 'Most Popular and demanding',
        'hero_highlight' => 'courses',
        'hero_subtitle' => 'Often open to graduates, sometimes freshers too, depending on programme design. Tools & domain coverage: NumPy, Pandas, scikit-learn, SQL, Tableau/Power BI, maybe deep learning/NLP if advanced.',
        'extrajs' => '
            document.addEventListener("DOMContentLoaded", function() {
                // Category tabs functionality
                const categoryTabs = document.querySelectorAll(".cx-tab");
                const contentPanels = document.querySelectorAll(".cx-panel");

                categoryTabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        categoryTabs.forEach(t => t.classList.remove("cx-tab--active"));
                        tab.classList.add("cx-tab--active");

                        const category = tab.dataset.category;

                        contentPanels.forEach(panel => {
                            panel.classList.remove("cx-panel--active");
                        });

                        const targetPanel = document.getElementById("panel-" + category);
                        if (targetPanel) {
                            targetPanel.classList.add("cx-panel--active");
                        }
                    });
                });
            });
        ',
        'category_tabs' => [
            ['category' => 'ai-workshops', 'label' => 'AI Workshops', 'icon' => '<i class="fa-solid fa-bullseye"></i>', 'active' => true],
            ['category' => 'ai-mastery', 'label' => 'AI Mastery', 'icon' => '<i class="fa-solid fa-rocket"></i>', 'active' => false],
            ['category' => 'tech', 'label' => 'Tech Program', 'icon' => '<i class="fa-solid fa-laptop-code"></i>', 'active' => false],
            ['category' => 'data', 'label' => 'Data Program', 'icon' => '<i class="fa-solid fa-chart-simple"></i>', 'active' => false],
        ],
        // AI Workshops - Special content section (not course cards)
        'ai_workshops_content' => [
            'description' => 'This workshop teaches how to use AI tools and prompt engineering to save time, boost productivity, grow professionally, and stay relevant in the future job market.',
            'outcomes' => [
                'How to use AI & ChatGPT to save massive time in daily work',
                'Prompt engineering as a career and productivity skill',
                'AI for professional growth (Excel, coding, LinkedIn, interviews)',
                'How to stay relevant and secure in the AI-driven job market'
            ]
        ],
        // AI Mastery Workshops - Key points + AI courses
        'ai_mastery_content' => [
            'description' => 'All AI-related courses are included in the AI Mastery Workshops. Master the complete AI toolkit and transform your career.',
            'key_points' => [
                'Comprehensive AI training from beginner to advanced levels',
                'Learn prompt engineering, automation, and AI-powered workflows',
                'Boost productivity by 10x with cutting-edge AI tools',
                'Future-proof your career with in-demand AI skills',
                'Get hands-on experience with real-world AI projects',
                'Join a community of AI-powered professionals'
            ]
        ],
        // Tech Program content
        'tech_program_content' => [
            'description' => 'Master cutting-edge programming and AI development skills. Build real-world applications and automate workflows with our hands-on tech programs.',
            'courses' => [
                [
                    'title' => 'Python with AI',
                    'duration' => '5 Weeks',
                    'icon' => '<i class="fa-brands fa-python"></i>',
                    'description' => 'Master Python from scratch and integrate AI capabilities to build smart, automated applications.',
                    'modal_id' => 'modal-python-ai',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Python Essentials & AI Transformation',
                            'color' => '#306998',
                            'topics' => [
                                'Why Python? (Simplicity, Libraries, Community)',
                                'Real-World Applications: AI/ML, Web Dev, Automation',
                                'Variables & Naming Rules',
                                'Data Types: Numbers, Strings, Booleans',
                                'Google Colab Setup & AI Code Generation',
                                'Type Conversion (int, float, str, list)'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'Data Types, Control Flow & Banking Project',
                            'color' => '#FFD43B',
                            'topics' => [
                                'Deep Dive into Data Types',
                                'Practical Typecasting (Account systems, UPI logic)',
                                'Control Flow: if, elif, else, loops',
                                'Data Structures: Lists, Dictionaries',
                                'Mini Project: Simple Banking System (Deposit, Balance check)'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Logic Building, Operators & Loop Control',
                            'color' => '#646464',
                            'topics' => [
                                'Flowcharts & Logic Visualization',
                                'Operators: Comparison vs Assignment',
                                'Loops Mastery: while, for, range()',
                                'Loop Control: break, continue, pass',
                                'Practical Programs: Calculator, Even/Odd Checker'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'Functions & Advanced Practical Logic',
                            'color' => '#306998',
                            'topics' => [
                                'Understanding Functions (def, parameters)',
                                'Built-in vs User-defined Functions',
                                'Advanced Functional Programming: map(), lambda',
                                'Practical Exercises: Word filtering, Character counting',
                                'Refactoring for clean code'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Data Analysis with NumPy & Pandas',
                            'color' => '#E8652B',
                            'topics' => [
                                'EDA Fundamentals: Identifying patterns & outliers',
                                'Core Libraries: NumPy, Pandas, Matplotlib, Seaborn',
                                'Data Cleaning: Handling missing values, duplicates',
                                'Data Aggregation & Grouping',
                                'Visualizations: Bar, Line, Pie charts, Histograms'
                            ]
                        ]
                    ]
                ],
                [
                    'title' => 'Coding Using AI – Build No-Code AI SaaS Apps',
                    'duration' => '6 Weeks',
                    'icon' => '<i class="fa-solid fa-laptop-code"></i>',
                    'description' => 'Create AI-powered web apps, chatbots, and dashboards without writing traditional code.',
                    'modal_id' => 'modal-nocode-ai',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Introduction to No-Code & AI Ecosystem',
                            'color' => '#8e44ad',
                            'topics' => [
                                'The Rise of No-Code Development',
                                'Overview of Tools: Bubble, Glide, FlutterFlow',
                                'Integrating AI Models (OpenAI, Claude) without code',
                                'Understanding APIs & Webhooks basics'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'Building User Interfaces & Database Design',
                            'color' => '#2980b9',
                            'topics' => [
                                'UI/UX Principles for No-Code Apps',
                                'Responsive Design Layouts',
                                'Database Structuring: Users, Content, Relations',
                                'Data Types and Security Rules'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Logic & Workflows',
                            'color' => '#27ae60',
                            'topics' => [
                                'Creating Visual Workflows',
                                'Conditional Logic & Triggers',
                                'User Authentication & Profiles',
                                'Connecting Frontend Actions to Backend Data'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'AI Integration & Chatbots',
                            'color' => '#d35400',
                            'topics' => [
                                'Connecting OpenAI API',
                                'Building Custom Chat Interfaces',
                                'Prompt Engineering for App Logic',
                                'Handling AI Responses & Error States'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Launch & Monetization',
                            'color' => '#c0392b',
                            'topics' => [
                                'Deployment Strategies',
                                'Setting up Payments (Stripe Integration)',
                                'SaaS Business Models',
                                'Marketing your No-Code AI App'
                            ]
                        ]
                    ]
                ],
                [
                    'title' => 'AI Automation Workflow – Agentic AI',
                    'duration' => '6 Weeks',
                    'icon' => '<i class="fa-solid fa-robot"></i>',
                    'description' => 'Use AI agents to automate complex workflows and boost business efficiency at scale.',
                    'modal_id' => 'modal-agentic-ai',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Foundations of AI Agents',
                            'color' => '#16a085',
                            'topics' => [
                                'What are AI Agents?',
                                'Difference between Chatbots and Agents',
                                'Tools Overview: AutoGPT, BabyAGI, LangChain',
                                'Use Cases in Business Automation'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'Workflow Automation Platforms',
                            'color' => '#2c3e50',
                            'topics' => [
                                'Deep Dive into Make (Integromat)',
                                'Introduction to Zapier & n8n',
                                'Connecting Apps & Transferring Data',
                                'Triggering Automations based on Events'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Building Autonomous Agents',
                            'color' => '#8e44ad',
                            'topics' => [
                                'Defining Agent Goals & Constraints',
                                'Memory & Context Management',
                                'Tool Use: Web Browsing, File Execution',
                                'Multi-Agent Collaboration'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'Advanced Integration & Custom Actions',
                            'color' => '#e67e22',
                            'topics' => [
                                'Webhooks & API Requests',
                                'Parsing Unstructured Data with AI',
                                'Automating Content Creation & Social Media',
                                'CRM & Email Automation Workflows'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Deployment & Optimization',
                            'color' => '#34495e',
                            'topics' => [
                                'Hosting AI Agents',
                                'Monitoring Performance & Costs',
                                'Error Handling & Reliability',
                                'Scaling Automated Systems'
                            ]
                        ]
                    ]
                ]
            ]
        ],
        // Data Program content
        'data_program_content' => [
            'description' => 'Transform raw data into actionable insights. Learn data science, analytics, and database management with AI-powered tools and techniques.',
            'courses' => [
                [
                    'title' => 'Data Science with AI',
                    'duration' => '6 Weeks',
                    'icon' => '<i class="fa-solid fa-chart-simple"></i>',
                    'description' => 'Master DSA, system design, and generative AI with real-world projects and 1:1 mentorship.',
                    'modal_id' => 'modal-data-science',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Introduction to Data Science & AI',
                            'color' => '#306998',
                            'topics' => [
                                'What is Data Science?',
                                'AI vs ML vs Deep Learning',
                                'Data Science Lifecycle',
                                'Tools Setup: Python, Jupyter, Anaconda'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'Python for Data Analysis',
                            'color' => '#FFD43B',
                            'topics' => [
                                'Python Basics Recap',
                                'NumPy for Numerical Computing',
                                'Pandas (DataFrames & Series)',
                                'Data Cleaning & Preprocessing'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Data Visualization',
                            'color' => '#E8652B',
                            'topics' => [
                                'Matplotlib Fundamentals',
                                'Seaborn for Statistical Plots',
                                'Creating Dashboards',
                                'Storytelling with Data'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'Introduction to Machine Learning',
                            'color' => '#27ae60',
                            'topics' => [
                                'Supervised vs Unsupervised Learning',
                                'Linear Regression Basics',
                                'Logistic Regression',
                                'Model Evaluation Metrics'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Generative AI Basics',
                            'color' => '#8e44ad',
                            'topics' => [
                                'Intro to LLMs (Large Language Models)',
                                'Prompt Engineering for Data',
                                'Using AI for Code Generation',
                                'Future of AI in Data Science'
                            ]
                        ]
                    ]
                ],
                [
                    'title' => 'Advanced Data Analysis Program',
                    'duration' => '6 Weeks',
                    'icon' => '<i class="fa-solid fa-chart-line"></i>',
                    'description' => 'Comprehensive, industry-aligned curriculum with hands-on, end-to-end project experience.',
                    'modal_id' => 'modal-adv-analytics',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Data Analysis Foundations',
                            'color' => '#2980b9',
                            'topics' => [
                                'The Data Analysis Process',
                                'Asking the Right Questions',
                                'Data Types & Measurement Levels',
                                'Excel for Data Analysis'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'SQL for Data Analysis',
                            'color' => '#e67e22',
                            'topics' => [
                                'Relational Databases Overview',
                                'SELECT, FROM, WHERE',
                                'Joins and Unions',
                                'Aggregations (GROUP BY)'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Data Visualization with BI Tools',
                            'color' => '#f1c40f',
                            'topics' => [
                                'Introduction to Power BI / Tableau',
                                'Connecting to Data Sources',
                                'Building Interactive Charts',
                                'Designing Effective Dashboards'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'Statistical Analysis',
                            'color' => '#c0392b',
                            'topics' => [
                                'Descriptive Statistics',
                                'Probability Basics',
                                'Hypothesis Testing',
                                'Correlation vs Causation'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Capstone Project',
                            'color' => '#2c3e50',
                            'topics' => [
                                'Choosing a Real-world Dataset',
                                'End-to-End Analysis',
                                'Creating a Report/Dashboard',
                                'Presenting Findings'
                            ]
                        ]
                    ]
                ],
                [
                    'title' => 'SQL Management with AI',
                    'duration' => '5 Weeks',
                    'icon' => '<i class="fa-solid fa-database"></i>',
                    'description' => 'Master SQL queries, database management, and use AI to optimize performance and build pipelines.',
                    'modal_id' => 'modal-sql-ai',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Database Fundamentals',
                            'color' => '#34495e',
                            'topics' => [
                                'What is a DBMS?',
                                'Relational vs Non-Relational',
                                'ER Diagrams & Schema Design',
                                'Installing SQL Workbench'
                            ]
                        ],
                        [
                            'number' => '02',
                            'title' => 'Core SQL Commands',
                            'color' => '#2980b9',
                            'topics' => [
                                'DDL (CREATE, ALTER, DROP)',
                                'DML (INSERT, UPDATE, DELETE)',
                                'DQL (SELECT)',
                                'Constraints (PK, FK, UNIQUE)'
                            ]
                        ],
                        [
                            'number' => '03',
                            'title' => 'Advanced Querying',
                            'color' => '#16a085',
                            'topics' => [
                                'Subqueries',
                                'Joins (Inner, Left, Right, Full)',
                                'Views & Indexes',
                                'Stored Procedures Basics'
                            ]
                        ],
                        [
                            'number' => '04',
                            'title' => 'AI for SQL',
                            'color' => '#8e44ad',
                            'topics' => [
                                'Writing Queries with AI Assistants',
                                'Optimizing Queries using AI',
                                'Debugging SQL Errors with AI',
                                'Natural Language to SQL'
                            ]
                        ],
                        [
                            'number' => '05',
                            'title' => 'Database Administration Basics',
                            'color' => '#7f8c8d',
                            'topics' => [
                                'User Management',
                                'Backup & Recovery',
                                'Security Best Practices',
                                'Performance Tuning'
                            ]
                        ]
                    ]
                ],
                [
                    'title' => 'Excel with AI',
                    'duration' => '4 Weeks',
                    'icon' => '<i class="fa-solid fa-file-excel"></i>',
                    'description' => 'Master Excel for data analysis. Use AI to generate formulas, automate tasks, and visualize trends instantly.',
                    'modal_id' => 'modal-excel-ai',
                    'curriculum' => [
                        [
                            'number' => '01',
                            'title' => 'Excel Essentials & AI Integration',
                            'color' => '#1D6F42',
                            'topics' => ['Interface & Shortcuts', 'Basic Formulas (SUM, COUNT)', 'Intro to AI in Excel']
                        ],
                        [
                            'number' => '02',
                            'title' => 'Data Management',
                            'color' => '#217346',
                            'topics' => ['Sorting & Filtering', 'Conditional Formatting', 'Data Validation', 'AI Data Cleaning']
                        ],
                        [
                            'number' => '03',
                            'title' => 'Functions & AI Formulas',
                            'color' => '#107C41',
                            'topics' => ['VLOOKUP & XLOOKUP', 'IF & Nested Logic', 'Generating Formulas with AI']
                        ],
                        [
                            'number' => '04',
                            'title' => 'Analysis & Visualization',
                            'color' => '#33c481',
                            'topics' => ['Pivot Tables', 'Charts & Graphs', 'Building Dashboards', 'AI Insights']
                        ]
                    ]
                ]
            ]
        ],
        'programs' => [
            // AI MASTERY WORKSHOPS - All AI-related courses
            [
                'id' => 'prompt-eng',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Prompt Engineering Mastery',
                'bullets' => [
                    'Get 10x better responses from AI tools',
                    'Turn AI into your personal assistant',
                    'Master advanced prompt engineering techniques'
                ],
                'button_text' => 'Explore Program',
                'button_style' => 'outline'
            ],
            [
                'id' => 'office-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Day to Day Office Work Using AI',
                'bullets' => [
                    'Reduce workload by 50% using AI',
                    'Master Microsoft & Google AI tools',
                    'Turn boring data into beautiful charts'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'job-hunt-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Job Hunting to Get 40% Salary Hike Using AI',
                'bullets' => [
                    'Create an irresistible resume with AI',
                    'Prepare for interviews like a pro',
                    'Negotiate salary using AI tools'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'side-hustle-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Build a Side Hustle Using AI',
                'bullets' => [
                    'Find profitable AI business ideas in minutes',
                    'Automate & scale your side hustle',
                    'Sell AI-generated content & products'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'research-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '6 Weeks',
                'title' => 'AI-Powered Research & Report Writing',
                'bullets' => [
                    'Summarize research papers in seconds',
                    'Fast & accurate data collection',
                    'Turn raw data into insightful AI reports'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
        ],
        'form_action_url' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/ajax_submit_admission.php',
    ];
}
