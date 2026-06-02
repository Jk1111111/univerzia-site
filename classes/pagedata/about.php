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
 * About page data for local_univerziaai
 *
 * SEO-optimized data for the About Univerzia AI page.
 *
 * @package    local_univerziaai
 * @copyright  2026 Univerzia AI Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get about page data with SEO-optimized meta tags
 *
 * @param string $assetsurl Base URL for plugin assets
 * @return array Page data array
 */
function local_univerziaai_get_about_data($assetsurl) {
    global $CFG;

    $baseurl = $CFG->wwwroot;

    return [
        // SEO Meta Tags.
        'pagetitle' => 'About Univerzia AI – AI Powered Learning Platform | Univerzia AI Pvt Ltd',
        'metadescription' => 'Univerzia AI is an AI-powered learning platform and digital agency based in Varanasi, India. '
            . 'Discover the mission, LMS platform, and services offered by Univerzia AI Pvt Ltd.',
        'metakeywords' => 'Univerzia AI, Univerzia AI Pvt Ltd, AI powered learning platform, AI LMS, '
            . 'edtech India, Univerzia AI Varanasi, AI courses, digital agency India, '
            . 'Univerzia AI LMS platform, AI education, e-learning India',
        'canonical' => $baseurl . '/local/univerziaai/about.php',
        'og_image' => $assetsurl . '/hero_student.png',
        'og_type' => 'website',

        // Page-specific JSON-LD schema (AboutPage).
        'schema_json' => [
            '@context' => 'https://schema.org',
            '@type' => 'AboutPage',
            'name' => 'About Univerzia AI – AI Powered Learning Platform',
            'description' => 'Learn about Univerzia AI Pvt Ltd, an AI-powered EdTech platform and digital agency. '
                . 'Univerzia AI offers LMS solutions, AI workshops, and IT services from Varanasi, India.',
            'url' => $baseurl . '/local/univerziaai/about.php',
            'mainEntity' => [
                '@type' => 'Organization',
                'name' => 'Univerzia AI Pvt Ltd',
                'alternateName' => 'Univerzia AI',
                'url' => 'https://univerziaai.in',
                'logo' => $baseurl . '/local/univerziaai/pix/logo.svg',
                'image' => $assetsurl . '/hero_student.png',
                'description' => 'Univerzia AI Pvt Ltd is an AI-powered EdTech platform and full-service digital agency '
                    . 'offering LMS solutions, AI workshops, web development, and digital marketing services.',
                'foundingDate' => '2024',
                'foundingLocation' => 'Varanasi, India',
                'email' => 'gautam.shukla@univerziaai.in',
                'telephone' => '+919511016762',
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => '1A/50 Awas Vikas Colony, Daulatpur, Pandeypur',
                    'addressLocality' => 'Varanasi',
                    'postalCode' => '221002',
                    'addressRegion' => 'Uttar Pradesh',
                    'addressCountry' => 'IN',
                ],
                'sameAs' => [
                    'https://www.linkedin.com/company/univerziaai/',
                    'https://www.instagram.com/univerzia.ai/',
                    'https://www.facebook.com/profile.php?id=61588087207351',
                    'https://x.com/UniverziaAi',
                ],
            ],
        ],

        // Page styles.
        'pagestyle' => '
            .about-hero {
                background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
                padding-top: 160px;
                padding-bottom: 100px;
                text-align: center;
            }
            .about-section { padding: 80px 0; }
            .about-section:nth-child(even) { background: #f9fafb; }
            .about-section-header { margin-bottom: 40px; }
            .about-section-header h2 {
                font-size: 2rem;
                font-weight: 700;
                color: var(--neutral-900);
                margin-bottom: 16px;
            }
            .about-content p {
                color: var(--neutral-600);
                font-size: 1.1rem;
                line-height: 1.8;
                margin-bottom: 20px;
            }
            .about-features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 30px;
                margin-top: 40px;
            }
            .about-feature-card {
                background: #fff;
                border: 1px solid var(--neutral-200);
                border-radius: 16px;
                padding: 32px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .about-feature-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
            }
            .about-feature-icon {
                font-size: 2.5rem;
                margin-bottom: 16px;
                display: inline-block;
                background: var(--neutral-100);
                padding: 16px;
                border-radius: 50%;
            }
            .about-feature-card h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 12px;
                color: var(--neutral-900);
            }
            .about-feature-card p {
                color: var(--neutral-600);
                line-height: 1.7;
                font-size: 0.95rem;
            }
            .dual-identity-section { padding: 80px 0; background: white; }
            .identity-card {
                background: #fff;
                border: 1px solid var(--neutral-200);
                border-radius: 20px;
                padding: 40px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                height: 100%;
            }
            .identity-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
            }
            .identity-icon {
                font-size: 3rem;
                margin-bottom: 20px;
                display: inline-block;
                background: var(--neutral-100);
                padding: 20px;
                border-radius: 50%;
            }
            .identity-card.agency-card:hover { border-color: var(--primary-500); }
            .identity-card.academy-card:hover { border-color: #10b981; }
            .story-bridge {
                background: var(--neutral-900);
                color: white;
                padding: 100px 0;
                position: relative;
                overflow: hidden;
            }
            .bridge-content {
                position: relative;
                z-index: 2;
                text-align: center;
                max-width: 800px;
                margin: 0 auto;
            }
            .why-choose-list {
                list-style: none;
                padding: 0;
                margin: 30px 0;
            }
            .why-choose-list li {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                margin-bottom: 20px;
                font-size: 1.05rem;
                color: var(--neutral-700);
                line-height: 1.7;
            }
            .why-choose-list li i {
                color: var(--primary-500);
                margin-top: 5px;
                flex-shrink: 0;
            }
        ',
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

        // Team members data.
        'team_members' => [
            [
                'name' => 'Gautam Shukla',
                'role' => 'CEO & Principal Architect',
                'bio' => 'Full-stack expert leading the technical direction. Passionate about teaching scalable architecture.',
                'image' => $assetsurl . '/gautam.png',
                'socials' => true,
            ],
            [
                'name' => 'Jodhraj Kalawat',
                'role' => 'Head of Engineering',
                'bio' => 'System Architect specializing in enterprise solutions. Ensures students learn Fortune 500 standards.',
                'image' => $assetsurl . '/jodhraj.png',
                'socials' => true,
            ],
            [
                'name' => 'Shashank Mathur',
                'role' => 'AI Solutions Lead',
                'bio' => 'Specializes in Agentic AI and Automation. Leads our workshop curriculum on cutting-edge AI tools.',
                'image' => $assetsurl . '/shashank.png',
                'socials' => true,
            ],
            [
                'name' => 'Aniket Mishra',
                'role' => 'Data Science Lead',
                'bio' => 'Expert in ML & Data Analytics. Bridges the gap between raw data and actionable business intelligence.',
                'image' => $assetsurl . '/aniket.jpeg',
                'socials' => true,
            ],
        ],

        // Stats data.
        'bridge_stats' => [
            ['value' => '50+', 'label' => 'Live Projects', 'color' => 'var(--primary-400)'],
            ['value' => '500+', 'label' => 'Students Trained', 'color' => '#10b981'],
            ['value' => '100%', 'label' => 'Practical Learning', 'color' => '#f59e0b'],
        ],
    ];
}
