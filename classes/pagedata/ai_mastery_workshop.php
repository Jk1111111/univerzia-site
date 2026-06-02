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
 * AI Mastery Workshop page data for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get AI Mastery Workshop page data
 *
 * @param string $assetsurl Base URL for assets
 * @return array Page data
 */
function local_univerziaai_get_ai_mastery_workshop_data($assetsurl)
{
    global $CFG;
    $pluginurl = $CFG->wwwroot . '/local/univerziaai';

    return [
        'pagetitle' => 'AI Mastery Workshop | 6-Phase Complete AI Training | UniverziaAI',
        'metadescription' => 'Master AI from fundamentals to deployment with our 6-phase AI Mastery Workshop. Learn Python, Machine Learning, Deep Learning, NLP, and Generative AI with hands-on projects.',
        'canonical' => $CFG->wwwroot . '/local/univerziaai/page.php?p=ai_mastery_workshop',
        'og_image' => $assetsurl . '/og-default.png',
        'schema_json' => [
            '@context' => 'https://schema.org',
            '@type' => 'Course',
            'name' => 'AI Mastery Workshop - Complete 6-Phase AI Training',
            'description' => 'Master AI from fundamentals to deployment. 6 phases, 30+ topics, hands-on projects.',
            'provider' => [
                '@type' => 'Organization',
                'name' => 'UniverziaAI',
                'url' => $CFG->wwwroot,
            ],
            'educationalLevel' => 'Beginner to Advanced',
            'numberOfCredits' => '6 Phases',
        ],

        // Hero section
        'hero_badge' => 'AI Mastery Workshop',
        'hero_title' => 'Master AI from <span class="amw-gradient-text">Fundamentals</span> to <span class="amw-gradient-text">Deployment</span>',
        'hero_subtitle' => 'A comprehensive 6-phase program that takes you from AI basics to building and deploying real-world AI solutions. No prior experience needed.',
        'hero_stats' => [
            ['value' => '6', 'label' => 'Phases'],
            ['value' => '30+', 'label' => 'Topics'],
            ['value' => '10+', 'label' => 'Projects'],
            ['value' => '100%', 'label' => 'Hands-On'],
        ],

        // Curriculum phases
        'phases' => [
            [
                'number' => '01',
                'title' => 'Foundations of AI-Powered Business',
                'subtitle' => 'Build your AI foundation — from GenAI basics to personal branding and productivity',
                'icon' => '<i class="fa-solid fa-brain"></i>',
                'color' => '#F08042',
                'is_first' => true,
                'topics' => [
                    ['name' => 'Intro to GenAI', 'icon' => '<i class="fa-solid fa-microchip"></i>'],
                    ['name' => 'Prompt Engineering', 'icon' => '<i class="fa-solid fa-wand-magic-sparkles"></i>'],
                    ['name' => 'Research Work using AI', 'icon' => '<i class="fa-solid fa-magnifying-glass-chart"></i>'],
                    ['name' => 'Day-to-Day Productivity Boost using AI', 'icon' => '<i class="fa-solid fa-bolt"></i>'],
                    ['name' => 'LinkedIn using AI', 'icon' => '<i class="fa-brands fa-linkedin"></i>'],
                    ['name' => 'Personal Branding with AI', 'icon' => '<i class="fa-solid fa-user-astronaut"></i>'],
                    ['name' => 'Job Hunting using AI', 'icon' => '<i class="fa-solid fa-briefcase"></i>'],
                ],
            ],
            [
                'number' => '02',
                'title' => 'AI-Powered Business Analysis',
                'subtitle' => 'Master data tools and business analytics supercharged with AI',
                'icon' => '<i class="fa-solid fa-chart-pie"></i>',
                'color' => '#9D5CFF',
                'topics' => [
                    ['name' => 'POWERPOINT with AI: Design & Storytelling', 'icon' => '<i class="fa-solid fa-file-powerpoint"></i>'],
                    ['name' => 'EXCEL with AI', 'icon' => '<i class="fa-solid fa-file-excel"></i>'],
                    ['name' => 'POWER BI with AI', 'icon' => '<i class="fa-solid fa-chart-column"></i>'],
                    ['name' => 'SQL for Data Management Using AI', 'icon' => '<i class="fa-solid fa-database"></i>'],
                    ['name' => 'Python Using AI', 'icon' => '<i class="fa-brands fa-python"></i>'],
                    ['name' => 'ATS Friendly Resume Writing', 'icon' => '<i class="fa-solid fa-file-lines"></i>'],
                    ['name' => 'AI-Powered Business Analytics', 'icon' => '<i class="fa-solid fa-chart-line"></i>'],
                ],
            ],
            [
                'number' => '03',
                'title' => 'AI-Powered Development & Testing',
                'subtitle' => 'Build, test, and deploy apps using AI-assisted development workflows',
                'icon' => '<i class="fa-solid fa-code"></i>',
                'color' => '#F5A623',
                'topics' => [
                    ['name' => 'AI-Powered Web Development (GitHub Pages site)', 'icon' => '<i class="fa-solid fa-globe"></i>'],
                    ['name' => 'AI-Powered App Development (Prompt-to-App)', 'icon' => '<i class="fa-solid fa-mobile-screen-button"></i>'],
                    ['name' => 'AI-Powered Software Testing & Automation', 'icon' => '<i class="fa-solid fa-vial"></i>'],
                    ['name' => 'Interview Skills', 'icon' => '<i class="fa-solid fa-user-tie"></i>'],
                    ['name' => 'No-Code Apps with AI (Bubble, OpenAI API, Streamlit)', 'icon' => '<i class="fa-solid fa-puzzle-piece"></i>'],
                ],
            ],
            [
                'number' => '04',
                'title' => 'Agentic AI & Automation',
                'subtitle' => 'Automate workflows and lead teams with AI-powered tools',
                'icon' => '<i class="fa-solid fa-robot"></i>',
                'color' => '#E8652B',
                'topics' => [
                    ['name' => 'AI Automation Workflows with Make', 'icon' => '<i class="fa-solid fa-gears"></i>'],
                    ['name' => 'Working with N8N session', 'icon' => '<i class="fa-solid fa-diagram-project"></i>'],
                    ['name' => 'AI in Leadership & Team Management', 'icon' => '<i class="fa-solid fa-people-group"></i>'],
                    ['name' => 'Business Communication with AI', 'icon' => '<i class="fa-solid fa-comments"></i>'],
                ],
            ],
            [
                'number' => '05',
                'title' => 'Business Applications of AI',
                'subtitle' => 'Apply AI across business functions — from marketing to legal to cybersecurity',
                'icon' => '<i class="fa-solid fa-building"></i>',
                'color' => '#C084FC',
                'topics' => [
                    ['name' => 'AI-Driven Product Management & Strategy', 'icon' => '<i class="fa-solid fa-bullseye"></i>'],
                    ['name' => 'AI in Supply Chain & Operations', 'icon' => '<i class="fa-solid fa-truck-fast"></i>'],
                    ['name' => 'AI in Marketing & Personalization', 'icon' => '<i class="fa-solid fa-bullhorn"></i>'],
                    ['name' => 'AI Powered Designing', 'icon' => '<i class="fa-solid fa-palette"></i>'],
                    ['name' => 'AI in Sales & CRM Automation', 'icon' => '<i class="fa-solid fa-handshake"></i>'],
                    ['name' => 'AI in Legal', 'icon' => '<i class="fa-solid fa-scale-balanced"></i>'],
                    ['name' => 'Cyber Security', 'icon' => '<i class="fa-solid fa-shield-halved"></i>'],
                    ['name' => 'AI Ethics, Bias & Responsible AI', 'icon' => '<i class="fa-solid fa-heart-pulse"></i>'],
                ],
            ],
            [
                'number' => '06',
                'title' => 'Advanced AI & Machine Intelligence',
                'subtitle' => 'Deep dive into ML, Deep Learning, and NLP to build intelligent systems from scratch',
                'icon' => '<i class="fa-solid fa-network-wired"></i>',
                'color' => '#F08042',
                'topics' => [
                    ['name' => 'Python Using AI (ML Pre-requisite)', 'icon' => '<i class="fa-brands fa-python"></i>'],
                    ['name' => 'Machine Learning Session', 'icon' => '<i class="fa-solid fa-brain"></i>'],
                    ['name' => 'Deep Learning Session', 'icon' => '<i class="fa-solid fa-circle-nodes"></i>'],
                    ['name' => 'NLP Session', 'icon' => '<i class="fa-solid fa-language"></i>'],
                ],
            ],
        ],

        // Program highlights
        'highlights' => [
            ['icon' => '<i class="fa-solid fa-calendar-days"></i>', 'title' => '6-Phase Curriculum', 'description' => 'Structured learning path from AI basics to capstone deployment'],
            ['icon' => '<i class="fa-solid fa-laptop-code"></i>', 'title' => '10+ Hands-On Projects', 'description' => 'Build real-world AI applications at every phase'],
            ['icon' => '<i class="fa-solid fa-user-tie"></i>', 'title' => 'Expert Mentorship', 'description' => 'Learn from industry professionals with years of AI experience'],
            ['icon' => '<i class="fa-solid fa-certificate"></i>', 'title' => 'Industry Certification', 'description' => 'Earn a recognized certificate upon completion'],
            ['icon' => '<i class="fa-solid fa-users"></i>', 'title' => 'Community Access', 'description' => 'Join a network of AI professionals and learners'],
            ['icon' => '<i class="fa-solid fa-briefcase"></i>', 'title' => 'Career Support', 'description' => 'Resume building, mock interviews, and placement assistance'],
        ],

        // Target audience
        'target_audience' => [
            ['icon' => '<i class="fa-solid fa-graduation-cap"></i>', 'title' => 'Students & Fresh Graduates', 'description' => 'Build a strong foundation in AI and land your first tech role'],
            ['icon' => '<i class="fa-solid fa-building"></i>', 'title' => 'Working Professionals', 'description' => 'Upskill in AI to advance your career or switch to AI roles'],
            ['icon' => '<i class="fa-solid fa-lightbulb"></i>', 'title' => 'Entrepreneurs & Freelancers', 'description' => 'Leverage AI to build products, automate tasks, and scale business'],
            ['icon' => '<i class="fa-solid fa-chalkboard-user"></i>', 'title' => 'Educators & Researchers', 'description' => 'Deepen your AI knowledge for teaching and academic research'],
        ],

        // Form config
        'form_action_url' => $pluginurl . '/ajax_submit_admission.php',

        // Page styles
        'pagestyle' => '
            /* ========== AMW Hero ========== */
            .amw-hero {
                background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
                padding: 160px 0 100px;
                position: relative;
                overflow: hidden;
                color: #fff;
            }
            .amw-hero::before {
                content: "";
                position: absolute;
                top: -50%;
                right: -20%;
                width: 600px;
                height: 600px;
                background: radial-gradient(circle, rgba(240,128,66,0.15) 0%, transparent 70%);
                border-radius: 50%;
            }
            .amw-hero::after {
                content: "";
                position: absolute;
                bottom: -30%;
                left: -10%;
                width: 500px;
                height: 500px;
                background: radial-gradient(circle, rgba(157,92,255,0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            .amw-hero .container { position: relative; z-index: 2; }
            .amw-hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(240,128,66,0.15);
                border: 1px solid rgba(240,128,66,0.3);
                color: #F08042;
                padding: 8px 20px;
                border-radius: 50px;
                font-size: 0.85rem;
                font-weight: 600;
                letter-spacing: 0.5px;
                margin-bottom: 24px;
            }
            .amw-hero h1 {
                font-family: "Sora", sans-serif;
                font-size: 3.2rem;
                font-weight: 800;
                line-height: 1.15;
                margin-bottom: 20px;
                color: #fff;
            }
            .amw-gradient-text {
                background: linear-gradient(135deg, #F08042, #F5A623);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .amw-hero-subtitle {
                font-size: 1.15rem;
                color: rgba(255,255,255,0.7);
                max-width: 640px;
                line-height: 1.7;
                margin-bottom: 40px;
            }
            .amw-hero-stats {
                display: flex;
                gap: 40px;
                flex-wrap: wrap;
                margin-bottom: 40px;
            }
            .amw-stat {
                text-align: center;
            }
            .amw-stat-value {
                font-family: "Sora", sans-serif;
                font-size: 2.2rem;
                font-weight: 800;
                background: linear-gradient(135deg, #F08042, #F5A623);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .amw-stat-label {
                font-size: 0.85rem;
                color: rgba(255,255,255,0.6);
                margin-top: 4px;
                font-weight: 500;
            }
            .amw-hero-cta {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            .amw-btn-primary {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: linear-gradient(135deg, #F08042, #E8652B);
                color: #fff;
                padding: 14px 32px;
                border-radius: 12px;
                font-weight: 700;
                font-size: 1rem;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
            }
            .amw-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(240,128,66,0.4);
                color: #fff;
                text-decoration: none;
            }
            .amw-btn-secondary {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: transparent;
                color: #fff;
                padding: 14px 32px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1rem;
                border: 1px solid rgba(255,255,255,0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
            }
            .amw-btn-secondary:hover {
                background: rgba(255,255,255,0.1);
                border-color: rgba(255,255,255,0.5);
                color: #fff;
                text-decoration: none;
            }

            /* ========== AMW Curriculum ========== */
            .amw-curriculum {
                padding: 100px 0;
                background: #fafbfc;
            }
            .amw-section-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(240,128,66,0.1);
                color: #F08042;
                padding: 6px 16px;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 16px;
            }
            .amw-section-title {
                font-family: "Sora", sans-serif;
                font-size: 2.4rem;
                font-weight: 800;
                color: #1a1a2e;
                margin-bottom: 12px;
            }
            .amw-section-subtitle {
                color: #64748b;
                font-size: 1.05rem;
                max-width: 600px;
                line-height: 1.7;
                margin-bottom: 50px;
            }
            .amw-section-header-center {
                text-align: center;
                margin-bottom: 0;
            }
            .amw-section-header-center .amw-section-subtitle {
                margin-left: auto;
                margin-right: auto;
            }
            .amw-timeline {
                position: relative;
                max-width: 900px;
                margin: 0 auto;
            }
            .amw-timeline::before {
                content: "";
                position: absolute;
                left: 28px;
                top: 0;
                bottom: 0;
                width: 3px;
                background: linear-gradient(180deg, #F08042 0%, #9D5CFF 50%, #F5A623 100%);
                border-radius: 3px;
            }
            .amw-phase {
                position: relative;
                padding-left: 76px;
                margin-bottom: 16px;
            }
            .amw-phase-dot {
                position: absolute;
                left: 14px;
                top: 24px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 0.75rem;
                color: #fff;
                z-index: 2;
                box-shadow: 0 0 0 6px #fafbfc;
            }
            .amw-phase-card {
                background: #fff;
                border-radius: 16px;
                border: 1px solid #e2e8f0;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            .amw-phase-card:hover {
                border-color: #F08042;
                box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            }
            .amw-phase-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 22px 28px;
                gap: 16px;
            }
            .amw-phase-header-left {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            .amw-phase-icon {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                color: #fff;
                flex-shrink: 0;
            }
            .amw-phase-info h3 {
                font-family: "Sora", sans-serif;
                font-size: 1.1rem;
                font-weight: 700;
                color: #1a1a2e;
                margin: 0 0 4px;
            }
            .amw-phase-info p {
                font-size: 0.85rem;
                color: #64748b;
                margin: 0;
            }
            .amw-phase-toggle {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }
            .amw-phase.amw-phase--open .amw-phase-toggle {
                background: #F08042;
                color: #fff;
                transform: rotate(180deg);
            }
            .amw-phase-body {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease;
            }
            .amw-phase--open .amw-phase-body {
                border-top: 1px solid #e2e8f0;
            }
            .amw-topics-list {
                padding: 20px 28px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .amw-topic {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 12px 16px;
                background: #f8fafc;
                border-radius: 10px;
                transition: all 0.2s ease;
            }
            .amw-topic:hover {
                background: #fff5f0;
                transform: translateX(4px);
            }
            .amw-topic-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background: rgba(240,128,66,0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #F08042;
                font-size: 0.9rem;
                flex-shrink: 0;
            }
            .amw-topic-name {
                font-size: 0.95rem;
                color: #334155;
                font-weight: 500;
            }

            /* ========== AMW Highlights ========== */
            .amw-highlights {
                padding: 100px 0;
                background: #fff;
            }
            .amw-highlights-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
            }
            .amw-highlight-card {
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 32px 28px;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            .amw-highlight-card::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #F08042, #F5A623);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .amw-highlight-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                border-color: transparent;
            }
            .amw-highlight-card:hover::before { opacity: 1; }
            .amw-highlight-icon {
                width: 64px;
                height: 64px;
                border-radius: 16px;
                background: rgba(240,128,66,0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #F08042;
                margin: 0 auto 20px;
            }
            .amw-highlight-card h3 {
                font-family: "Sora", sans-serif;
                font-size: 1.05rem;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 8px;
            }
            .amw-highlight-card p {
                font-size: 0.9rem;
                color: #64748b;
                line-height: 1.6;
                margin: 0;
            }

            /* ========== AMW Target Audience ========== */
            .amw-audience {
                padding: 100px 0;
                background: #fafbfc;
            }
            .amw-audience-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 24px;
            }
            .amw-audience-card {
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 32px 24px;
                text-align: center;
                transition: all 0.3s ease;
            }
            .amw-audience-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                border-color: #F08042;
            }
            .amw-audience-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(240,128,66,0.15), rgba(157,92,255,0.15));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;
                color: #F08042;
                margin: 0 auto 18px;
            }
            .amw-audience-card h3 {
                font-family: "Sora", sans-serif;
                font-size: 1rem;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 8px;
            }
            .amw-audience-card p {
                font-size: 0.85rem;
                color: #64748b;
                line-height: 1.6;
                margin: 0;
            }

            /* ========== AMW Registration Form ========== */
            .amw-register {
                padding: 100px 0;
                background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
                color: #fff;
                position: relative;
                overflow: hidden;
            }
            .amw-register::before {
                content: "";
                position: absolute;
                top: -40%;
                right: -15%;
                width: 500px;
                height: 500px;
                background: radial-gradient(circle, rgba(240,128,66,0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            .amw-register .container { position: relative; z-index: 2; }
            .amw-register-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
                align-items: start;
            }
            .amw-register-info h2 {
                font-family: "Sora", sans-serif;
                font-size: 2.2rem;
                font-weight: 800;
                color: #fff;
                margin-bottom: 16px;
            }
            .amw-register-info p {
                color: rgba(255,255,255,0.7);
                font-size: 1.05rem;
                line-height: 1.7;
                margin-bottom: 32px;
            }
            .amw-register-features {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .amw-register-feature {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 14px 18px;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 12px;
            }
            .amw-register-feature i {
                color: #F08042;
                font-size: 1.1rem;
                flex-shrink: 0;
            }
            .amw-register-feature span {
                color: rgba(255,255,255,0.85);
                font-size: 0.95rem;
            }
            .amw-form-card {
                background: rgba(255,255,255,0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 36px;
            }
            .amw-form-card h3 {
                font-family: "Sora", sans-serif;
                font-size: 1.3rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 24px;
                text-align: center;
            }
            .amw-form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
            .amw-form-group {
                margin-bottom: 16px;
            }
            .amw-form-group label {
                display: block;
                font-size: 0.85rem;
                color: rgba(255,255,255,0.7);
                margin-bottom: 6px;
                font-weight: 500;
            }
            .amw-form-group input,
            .amw-form-group textarea {
                width: 100%;
                padding: 12px 16px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 10px;
                color: #fff;
                font-size: 0.95rem;
                font-family: "DM Sans", sans-serif;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }
            .amw-form-group input::placeholder,
            .amw-form-group textarea::placeholder {
                color: rgba(255,255,255,0.4);
            }
            .amw-form-group input:focus,
            .amw-form-group textarea:focus {
                outline: none;
                border-color: #F08042;
                background: rgba(255,255,255,0.12);
            }
            .amw-form-submit {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #F08042, #E8652B);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 8px;
            }
            .amw-form-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(240,128,66,0.4);
            }
            .amw-form-submit:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            .amw-form-message {
                text-align: center;
                margin-top: 12px;
                font-size: 0.9rem;
            }
            .amw-form-message.success { color: #22c55e; }
            .amw-form-message.error { color: #ef4444; }

            /* ========== Responsive ========== */
            @media (max-width: 1024px) {
                .amw-hero h1 { font-size: 2.6rem; }
                .amw-highlights-grid { grid-template-columns: repeat(2, 1fr); }
                .amw-audience-grid { grid-template-columns: repeat(2, 1fr); }
                .amw-register-layout { grid-template-columns: 1fr; gap: 40px; }
            }
            @media (max-width: 768px) {
                .amw-hero { padding: 120px 0 70px; }
                .amw-hero h1 { font-size: 2rem; }
                .amw-hero-stats { gap: 24px; }
                .amw-stat-value { font-size: 1.8rem; }
                .amw-section-title { font-size: 1.8rem; }
                .amw-curriculum, .amw-highlights, .amw-audience, .amw-register { padding: 70px 0; }
                .amw-timeline::before { left: 18px; }
                .amw-phase { padding-left: 56px; }
                .amw-phase-dot { left: 4px; width: 28px; height: 28px; font-size: 0.7rem; }
                .amw-phase-header { padding: 16px 20px; flex-wrap: wrap; }
                .amw-phase-icon { width: 40px; height: 40px; font-size: 1.1rem; }
                .amw-highlights-grid { grid-template-columns: 1fr; }
                .amw-audience-grid { grid-template-columns: 1fr; }
                .amw-form-row { grid-template-columns: 1fr; }
                .amw-register-info h2 { font-size: 1.8rem; }
            }
        ',

        'extrajs' => '
            document.addEventListener("DOMContentLoaded", function() {
                // Accordion functionality
                const phases = document.querySelectorAll(".amw-phase");
                phases.forEach(phase => {
                    const header = phase.querySelector(".amw-phase-header");
                    const body = phase.querySelector(".amw-phase-body");

                    header.addEventListener("click", () => {
                        const isOpen = phase.classList.contains("amw-phase--open");

                        // Close all phases
                        phases.forEach(p => {
                            p.classList.remove("amw-phase--open");
                            const pBody = p.querySelector(".amw-phase-body");
                            if (pBody) pBody.style.maxHeight = "0";
                        });

                        // Open clicked if it was closed
                        if (!isOpen) {
                            phase.classList.add("amw-phase--open");
                            body.style.maxHeight = body.scrollHeight + "px";
                        }
                    });
                });

                // Open first phase by default
                const firstPhase = document.querySelector(".amw-phase");
                if (firstPhase) {
                    firstPhase.classList.add("amw-phase--open");
                    const firstBody = firstPhase.querySelector(".amw-phase-body");
                    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
                }

                // Smooth scroll for CTA
                const scrollBtns = document.querySelectorAll("[data-scroll-to]");
                scrollBtns.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        e.preventDefault();
                        const target = document.querySelector(btn.dataset.scrollTo);
                        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                });

                // Registration form AJAX
                const form = document.getElementById("amwRegForm");
                if (form) {
                    form.addEventListener("submit", function(e) {
                        e.preventDefault();
                        const btn = form.querySelector(".amw-form-submit");
                        const msg = document.getElementById("amwFormMessage");
                        const origText = btn.textContent;

                        btn.disabled = true;
                        btn.textContent = "Sending...";
                        msg.textContent = "";
                        msg.className = "amw-form-message";

                        const formData = new FormData(form);
                        formData.append("department", "Academic");
                        formData.append("course_service", "AI Mastery Workshop");

                        fetch(form.dataset.action, {
                            method: "POST",
                            body: formData
                        })
                        .then(r => r.json())
                        .then(data => {
                            if (data.success) {
                                msg.textContent = "Thank you! We will contact you soon with workshop details.";
                                msg.className = "amw-form-message success";
                                form.reset();
                            } else {
                                msg.textContent = data.message || "Something went wrong. Please try again.";
                                msg.className = "amw-form-message error";
                            }
                        })
                        .catch(() => {
                            msg.textContent = "Network error. Please try again later.";
                            msg.className = "amw-form-message error";
                        })
                        .finally(() => {
                            btn.disabled = false;
                            btn.textContent = origText;
                        });
                    });
                }
            });
        ',
    ];
}
