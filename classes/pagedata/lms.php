<?php
// LMS page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_lms_data($assetsurl)
{
    return [
        'pagetitle' => 'LMS Development | Moodle & Custom eLearning - UniverziaAI',
        'metadescription' => 'Expert LMS development services by UniverziaAI. Moodle, IOMAD, multi-tenant LMS solutions for schools, organizations, and corporate training.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=lms',
        'og_image' => $assetsurl . '/website-development.png',
        'pagestyle' => '',
        'extrajs' => '
            const mobileToggle = document.getElementById("mobileToggle");
            const navMenu = document.getElementById("navMenu");
            if (mobileToggle) {
                mobileToggle.addEventListener("click", () => {
                    navMenu.classList.toggle("active");
                    mobileToggle.classList.toggle("active");
                });
            }
        ',
        'hero_title' => 'Enhance Your Online Education Experience',
        'hero_subtitle' => 'Unlocking Effortless Learning Management for Schools, Organizations, and Companies, Enriching the Moodle™ Software Experience with Trusted LMS Services.',
        'hero_image' => $assetsurl . '/website-development.png', // Placeholder due to generation failure
        'features' => [
            ['icon' => '<i class="fa-solid fa-graduation-cap"></i>', 'title' => 'Certified Moodle Expertise', 'description' => 'We are official Moodle partners with over a decade of experience deploying mission-critical learning environments.'],
            ['icon' => '<i class="fa-regular fa-building"></i>', 'title' => 'Multi-Tenant (IOMAD)', 'description' => 'Manage multiple departments or clients from a single installation. Perfect for training companies and franchises.'],
            ['icon' => '<i class="fa-solid fa-gamepad"></i>', 'title' => 'Gamification & Engagement', 'description' => 'Boost learner retention with badges, points, leaderboards, and interactive course content.'],
            ['icon' => '<i class="fa-solid fa-chart-bar"></i>', 'title' => 'Advanced Analytics', 'description' => 'Track progress, identify knowledge gaps, and prove ROI with custom reporting dashboards.'],
            ['icon' => '<i class="fa-solid fa-plug"></i>', 'title' => 'Seamless Integrations', 'description' => 'Connect Moodle with your HRIS, CRM, or SSO provider (Microsoft 365, Google Workspace) for a unified experience.'],
            ['icon' => '<i class="fa-solid fa-cloud"></i>', 'title' => 'Managed Cloud Hosting', 'description' => 'High-performance, secure, and auto-scaling hosting on AWS or Azure. We handle the infrastructure; you focus on teaching.'],
        ],
        'admission_form_options' => [
            'academic' => [
                'AI Tools Workshop',
                'AI Mastery Workshop',
                'Prompt Engineering Mastery',
                'Python with AI',
                'Data Science with AI',
                'SQL Management with AI',
                'No-Code AI SaaS Apps',
                'Agentic AI & Automation'
            ],
            'services' => [
                'LMS Theme Design',
                'Custom Plugin Development',
                'Moodle Installation & Upgrades',
                'Mobile App Customization',
                'IOMAD Support & Development',
                'LMS Hosting',
                'Training & Support'
            ]
        ]
    ];
}
