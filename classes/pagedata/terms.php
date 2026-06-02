<?php
// Terms and Conditions page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_terms_data($assetsurl)
{
    return [
        'pagetitle' => 'Terms & Conditions | UniverziaAI',
        'metadescription' => 'Read the UniverziaAI terms and conditions. Understand the rules and regulations governing the use of our LMS platform, courses, and IT services.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=terms',
        'og_image' => $assetsurl . '/hero_student.png',
        'pagestyle' => '
            .legal-page { padding-top: 140px; padding-bottom: 80px; }
            .legal-container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
            .legal-container h1 { font-size: 2.5rem; margin-bottom: 10px; color: var(--neutral-900); }
            .legal-updated { color: var(--neutral-500); margin-bottom: 40px; font-size: 0.95rem; }
            .legal-container h2 { font-size: 1.5rem; margin-top: 40px; margin-bottom: 16px; color: var(--neutral-800); }
            .legal-container p, .legal-container li { color: var(--neutral-700); line-height: 1.8; margin-bottom: 12px; }
            .legal-container ul { padding-left: 24px; }
            .legal-container a { color: var(--primary-600); text-decoration: underline; }
        ',
        'extrajs' => '',
        'company_name' => 'UniverziaAI',
        'company_email' => 'gautam.shukla@univerziaai.in',
        'company_website' => $GLOBALS['CFG']->wwwroot,
        'last_updated' => 'February 14, 2026',
    ];
}
