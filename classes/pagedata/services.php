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
 * Services page data for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get services page data
 */
function local_univerziaai_get_services_data($assetsurl)
{
    return [
        'pagetitle' => 'IT Services | Website, LMS & Digital Marketing - UniverziaAI',
        'metadescription' => 'Explore UniverziaAI IT services: website design, web development, LMS solutions, e-commerce development, and digital marketing. Trusted by 50+ clients.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=services',
        'og_image' => $assetsurl . '/hero_student.png',
        'pagestyle' => '
            .service-section-header { text-align: center; max-width: 800px; margin: 0 auto var(--space-3xl); }
            .services-category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--space-2xl); margin-bottom: var(--space-3xl); }
            .service-cat-card { background: #fff; border-radius: var(--radius-lg); padding: var(--space-xl); box-shadow: var(--shadow-md); border: 1px solid var(--neutral-200); transition: var(--transition-base); height: 100%; }
            .service-cat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--primary-400); }
            .cat-icon-box { width: 60px; height: 60px; background: var(--primary-100); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: var(--space-lg); color: var(--primary-600); }
            .cat-title { font-size: 1.5rem; margin-bottom: var(--space-md); color: var(--neutral-900); }
            .cat-list { list-style: none; padding: 0; margin: 0; }
            .cat-list li { position: relative; padding-left: 24px; margin-bottom: 12px; color: var(--neutral-700); line-height: 1.5; }
            .cat-list li::before { content: "\f00c"; font-family: "Font Awesome 6 Free"; font-weight: 900; position: absolute; left: 0; color: var(--primary-500); }
            .why-us-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-xl); margin-top: var(--space-2xl); }
            .why-card { text-align: center; padding: var(--space-lg); }
            .why-icon { font-size: 3rem; margin-bottom: var(--space-md); background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .why-title { font-size: 1.25rem; margin-bottom: var(--space-sm); }
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
        'service_categories' => [
            [
                'id' => 'web-design',
                'icon' => '<i class="fa-solid fa-palette"></i>',
                'title' => 'Website Design',
                'description' => 'First impressions matter. We treat your website as a digital masterpiece that converts visitors into loyal customers through intuitive UI/UX.',
                'features' => ['Custom Brand Identity', 'Mobile-First Responsive Design', 'Conversion Rate Optimization (CRO)', 'Interactive Prototyping', 'Accessibility Compliance', 'User Journey Mapping'],
            ],
            [
                'id' => 'web-dev',
                'icon' => '<i class="fa-solid fa-laptop-code"></i>',
                'title' => 'Website Development',
                'description' => 'Robust, scalable, and high-performance engineering. We build the digital infrastructure that powers your business growth.',
                'features' => ['Enterprise-Grade Security', 'Scalable Cloud Architecture', 'Custom API Integrations', 'High-Performance SPA/PWA', 'Database Optimization', 'Maintenance & Support'],
            ],
            [
                'id' => 'lms',
                'icon' => '<i class="fa-solid fa-graduation-cap"></i>',
                'title' => 'LMS Solutions',
                'description' => 'Empower your workforce or students with world-class learning platforms. Official Moodle/IOMAD expertise tailored to your needs.',
                'features' => ['Corporate Training Portals', 'University Learning Systems', 'Gamified Learning Paths', 'Custom Reporting Dashboards', 'Multi-Tenant Architectures', 'Integration with HRIS/ERP'],
            ],
            [
                'id' => 'ecommerce',
                'icon' => '<i class="fa-solid fa-cart-shopping"></i>',
                'title' => 'E-Commerce',
                'description' => 'Turn traffic into revenue. We build secure, high-converting online stores that provide seamless shopping experiences.',
                'features' => ['Custom WooCommerce/Shopify', 'Secure Payment Gateways', 'Inventory Automation', 'Omnichannel Sales', 'Personalized Recommendations', 'Speed Optimization'],
            ],
            [
                'id' => 'marketing',
                'icon' => '<i class="fa-solid fa-bullhorn"></i>',
                'title' => 'Digital Marketing',
                'description' => 'Don\'t just exist online—dominate. Our data-driven strategies ensure you reach the right audience at the right time.',
                'features' => ['SEO & Local Search', 'Targeted PPC Campaigns', 'Social Media Strategy', 'Content Marketing', 'Email Automation Flows', 'Analytics & ROI Tracking'],
            ],
        ],
        'why_us' => [
            ['icon' => '<i class="fa-solid fa-handshake"></i>', 'title' => 'Partners, Not Vendors', 'description' => 'We align deeply with your business goals, treating your success as our own metric for quality.'],
            ['icon' => '<i class="fa-solid fa-rocket"></i>', 'title' => 'Results-Driven', 'description' => 'We focus on tangible outcomes: more leads, higher sales, and better engagement.'],
            ['icon' => '<i class="fa-solid fa-shield-halved"></i>', 'title' => 'Enterprise Security', 'description' => 'We adhere to strict security standards to protect your data and your users\' privacy.'],
            ['icon' => '<i class="fa-solid fa-lightbulb"></i>', 'title' => 'Innovation First', 'description' => 'We leverage the latest tech (AI, Cloud, PWA) to keep you ahead of the competition.'],
        ],
    ];
}
