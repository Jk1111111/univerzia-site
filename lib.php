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
 * Library functions for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Render the UniverziaAi homepage for non-logged-in users
 */
function local_univerziaai_render_homepage()
{
    local_univerziaai_render_page('home');
}

/**
 * Render a specific page
 *
 * @param string $page The page identifier (home, about, contact, etc.)
 */
function local_univerziaai_render_page($page = 'home')
{
    global $CFG, $OUTPUT, $PAGE;

    // Get base URLs
    $baseurl = $CFG->wwwroot;
    $pluginurl = $CFG->wwwroot . '/local/univerziaai';
    $loginurl = $CFG->wwwroot . '/login/index.php';

    // Common data for all pages
    $commondata = [
        'baseurl' => $baseurl,
        'pluginurl' => $pluginurl,
        'loginurl' => $loginurl,
        'stylesurl' => $pluginurl . '/styles/styles.css',
        'scripturl' => $pluginurl . '/styles/script.js',
        'assetsurl' => $pluginurl . '/pix',
        'currentyear' => date('Y'),
    ];

    // Navigation data
    $navdata = local_univerziaai_get_navigation_data($page, $pluginurl, $loginurl);

    // Get page-specific data
    $pagedata = local_univerziaai_get_page_data($page, $pluginurl);

    // Merge all data
    $data = array_merge($commondata, $navdata, $pagedata);

    // Set up minimal page
    $PAGE->set_context(\context_system::instance());
    $PAGE->set_pagelayout('embedded');
    $PAGE->set_url('/');

    // Output the page directly (bypassing Moodle theme)
    local_univerziaai_output_page($page, $data);
}

/**
 * Get navigation data
 */
function local_univerziaai_get_navigation_data($activepage, $pluginurl, $loginurl)
{
    global $CFG;
    return [
        'nav_home_active' => ($activepage === 'home'),
        'nav_about_active' => ($activepage === 'about'),
        'nav_contact_active' => ($activepage === 'contact'),
        'nav_services_active' => in_array($activepage, ['services', 'website_design', 'website_development', 'lms', 'e_commerce', 'digital_marketing']),
        'nav_courses_active' => ($activepage === 'courses'),
        'nav_workshops_active' => ($activepage === 'ai_workshops'),
        'page_home' => $CFG->wwwroot,
        'page_about' => $pluginurl . '/about.php',
        'page_contact' => $pluginurl . '/page.php?p=contact',
        'page_services' => $pluginurl . '/page.php?p=services',
        'page_courses' => $pluginurl . '/page.php?p=courses',
        'page_ai_workshops' => $pluginurl . '/page.php?p=ai_workshops',
        'page_website_design' => $pluginurl . '/page.php?p=website_design',
        'page_website_development' => $pluginurl . '/page.php?p=website_development',
        'page_lms' => $pluginurl . '/page.php?p=lms',
        'page_e_commerce' => $pluginurl . '/page.php?p=e_commerce',
        'page_digital_marketing' => $pluginurl . '/page.php?p=digital_marketing',
        'page_privacy_policy' => $pluginurl . '/page.php?p=privacy_policy',
        'page_terms' => $pluginurl . '/page.php?p=terms',
        'page_ai_mastery_workshop' => $pluginurl . '/page.php?p=ai_mastery_workshop',
        'loginurl' => $loginurl,
    ];
}

/**
 * Get page-specific data
 */
function local_univerziaai_get_page_data($page, $pluginurl)
{
    $assetsurl = $pluginurl . '/pix';

    switch ($page) {
        case 'home':
            return local_univerziaai_get_home_data($assetsurl);
        case 'about':
            return local_univerziaai_get_about_data($assetsurl);
        case 'contact':
            return local_univerziaai_get_contact_data($assetsurl);
        case 'services':
            return local_univerziaai_get_services_data($assetsurl);
        case 'courses':
            return local_univerziaai_get_courses_data($assetsurl);
        case 'ai_workshops':
            return local_univerziaai_get_ai_workshops_data($assetsurl);
        case 'website_design':
            return local_univerziaai_get_website_design_data($assetsurl);
        case 'website_development':
            return local_univerziaai_get_website_development_data($assetsurl);
        case 'lms':
            return local_univerziaai_get_lms_data($assetsurl);
        case 'e_commerce':
            return local_univerziaai_get_e_commerce_data($assetsurl);
        case 'digital_marketing':
            return local_univerziaai_get_digital_marketing_data($assetsurl);
        case 'privacy_policy':
            return local_univerziaai_get_privacy_policy_data($assetsurl);
        case 'terms':
            return local_univerziaai_get_terms_data($assetsurl);
        case 'ai_mastery_workshop':
            return local_univerziaai_get_ai_mastery_workshop_data($assetsurl);
        default:
            return local_univerziaai_get_home_data($assetsurl);
    }
}

/**
 * Output the page HTML directly
 */
function local_univerziaai_output_page($page, $data)
{
    global $OUTPUT, $PAGE;

    // Render the template
    $templatename = 'local_univerziaai/page_' . $page;

    // Output raw HTML (not through Moodle theme)
    header('Content-Type: text/html; charset=utf-8');

    $pagetitle = $data['pagetitle'] ?? 'UniverziaAI | AI-Powered LMS & Learning Solutions';
    $metadesc = $data['metadescription'] ?? 'UniverziaAI provides AI-powered LMS, chatbot, and digital learning solutions for enterprises and institutions.';
    $canonical = $data['canonical'] ?? $data['baseurl'];
    $ogimage = $data['og_image'] ?? ($data['assetsurl'] . '/og-default.png');
    $ogtype = $data['og_type'] ?? 'website';

    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>' . htmlspecialchars($pagetitle) . '</title>';
    echo '<meta name="description" content="' . htmlspecialchars($metadesc) . '">';
    echo '<link rel="canonical" href="' . htmlspecialchars($canonical) . '">';

    // Open Graph Tags
    echo '<meta property="og:title" content="' . htmlspecialchars($pagetitle) . '">';
    echo '<meta property="og:description" content="' . htmlspecialchars($metadesc) . '">';
    echo '<meta property="og:type" content="' . htmlspecialchars($ogtype) . '">';
    echo '<meta property="og:url" content="' . htmlspecialchars($canonical) . '">';
    echo '<meta property="og:image" content="' . htmlspecialchars($ogimage) . '">';
    echo '<meta property="og:site_name" content="UniverziaAI">';
    echo '<meta property="og:locale" content="en_IN">';

    // Twitter Card Tags
    echo '<meta name="twitter:card" content="summary_large_image">';
    echo '<meta name="twitter:title" content="' . htmlspecialchars($pagetitle) . '">';
    echo '<meta name="twitter:description" content="' . htmlspecialchars($metadesc) . '">';
    echo '<meta name="twitter:image" content="' . htmlspecialchars($ogimage) . '">';

    // Keywords meta tag (if provided by page data).
    if (!empty($data['metakeywords'])) {
        echo '<meta name="keywords" content="' . htmlspecialchars($data['metakeywords']) . '">';
    }

    // Additional SEO meta tags
    echo '<meta name="robots" content="index, follow">';
    echo '<meta name="author" content="Univerzia AI Pvt Ltd">';
    echo '<meta name="geo.region" content="IN-UP">';
    echo '<meta name="geo.placename" content="Varanasi">';

    // JSON-LD Structured Data - Organization (on every page).
    $orgSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'Univerzia AI Pvt Ltd',
        'alternateName' => 'Univerzia AI',
        'url' => 'https://univerziaai.in',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => $data['pluginurl'] . '/pix/logo.svg',
            'width' => 200,
            'height' => 60,
        ],
        'image' => $data['pluginurl'] . '/pix/hero_student.png',
        'description' => 'Univerzia AI Pvt Ltd is an AI-powered EdTech platform and digital agency offering '
            . 'LMS solutions, AI workshops, web development, and digital marketing services from Varanasi, India.',
        'email' => 'gautam.shukla@univerziaai.in',
        'telephone' => '+919511016762',
        'foundingDate' => '2024',
        'foundingLocation' => 'Varanasi, India',
        'numberOfEmployees' => [
            '@type' => 'QuantitativeValue',
            'minValue' => 10,
            'maxValue' => 50,
        ],
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
    ];
    echo '<script type="application/ld+json">' . json_encode($orgSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';

    // JSON-LD Structured Data - WebSite (for sitelinks search box).
    $websiteSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'Univerzia AI',
        'alternateName' => 'Univerzia AI Pvt Ltd',
        'url' => 'https://univerziaai.in',
    ];
    echo '<script type="application/ld+json">' . json_encode($websiteSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';

    // Page-specific JSON-LD schema
    if (!empty($data['schema_json'])) {
        echo '<script type="application/ld+json">' . json_encode($data['schema_json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }

    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';
    echo '<link rel="stylesheet" href="' . $data['stylesurl'] . '">';
    if (!empty($data['extracss'])) {
        echo '<link rel="stylesheet" href="' . $data['extracss'] . '">';
    }
    echo '<link rel="icon" type="image/svg+xml" href="' . $data['assetsurl'] . '/favicon.svg">';
    echo '<link rel="shortcut icon" href="' . $data['assetsurl'] . '/favicon.svg">';
    echo '<link rel="apple-touch-icon" href="' . $data['assetsurl'] . '/favicon.svg">';
    if (!empty($data['pagestyle'])) {
        echo '<style>' . $data['pagestyle'] . '</style>';
    }
    echo '</head>';
    echo '<body>';

    // Render the Mustache template
    echo $OUTPUT->render_from_template($templatename, $data);

    echo '<script src="' . $data['scripturl'] . '"></script>';
    if (!empty($data['extrajs'])) {
        echo '<script>' . $data['extrajs'] . '</script>';
    }
    echo '</body>';
    echo '</html>';
}

// Include page data functions
require_once(__DIR__ . '/classes/pagedata/home.php');
require_once(__DIR__ . '/classes/pagedata/about.php');
require_once(__DIR__ . '/classes/pagedata/contact.php');
require_once(__DIR__ . '/classes/pagedata/services.php');
require_once(__DIR__ . '/classes/pagedata/courses.php');
require_once(__DIR__ . '/classes/pagedata/ai_workshops.php');
require_once(__DIR__ . '/classes/pagedata/website_design.php');
require_once(__DIR__ . '/classes/pagedata/website_development.php');
require_once(__DIR__ . '/classes/pagedata/lms.php');
require_once(__DIR__ . '/classes/pagedata/e_commerce.php');
require_once(__DIR__ . '/classes/pagedata/digital_marketing.php');
require_once(__DIR__ . '/classes/pagedata/privacy_policy.php');
require_once(__DIR__ . '/classes/pagedata/terms.php');
require_once(__DIR__ . '/classes/pagedata/ai_mastery_workshop.php');
