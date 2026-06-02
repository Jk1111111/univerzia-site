<?php
// Privacy Policy page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_privacy_policy_data($assetsurl)
{
    return [
        'pagetitle' => 'Privacy Policy | UniverziaAI',
        'metadescription' => 'Read the UniverziaAI privacy policy. Learn how we collect, use, and protect your personal data when you use our LMS, website, and AI training services.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=privacy_policy',
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
        'company_address' => 'Awas Vikas Colony, Daulatpur Road, Varanasi, Uttar Pradesh, India',
        'last_updated' => 'February 14, 2026',
    ];
}
