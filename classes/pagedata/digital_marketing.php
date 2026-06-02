<?php
// Digital Marketing page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_digital_marketing_data($assetsurl)
{
    global $CFG;
    $pluginurl = $CFG->wwwroot . '/local/univerziaai';

    return [
        'pagetitle' => 'Digital Marketing & SEO Services - UniverziaAI',
        'metadescription' => 'Digital marketing and SEO services by UniverziaAI. Search engine optimization, social media marketing, paid advertising, and brand management.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=digital_marketing',
        'og_image' => $assetsurl . '/website-development.png',
        'pluginurl' => $pluginurl,

        // Hero Section
        'hero_title' => 'Dominate the <span class="lms-gradient-text">Digital Landscape</span>',
        'hero_subtitle' => 'From visibility to viral growth, we craft data-driven strategies that turn clicks into loyal customers.',
        'hero_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop', // Analytics Dashboard

        // 1. SEO Section
        'seo_title' => 'Search Engine Optimization (SEO)',
        'seo_badge' => 'ORGANIC GROWTH',
        'seo_desc' => 'Be the first answer properly. Our SEO strategies are built on technical excellence, high-quality content, and authoritative backlinks to secure your spot at the top of search results.',
        'seo_features' => [
            ['icon' => '<i class="fa-solid fa-magnifying-glass-chart"></i>', 'text' => 'Keyword & Competitor Analysis'],
            ['icon' => '<i class="fa-solid fa-code"></i>', 'text' => 'Technical SEO Audits'],
            ['icon' => '<i class="fa-solid fa-link"></i>', 'text' => 'High-Quality Link Building'],
            ['icon' => '<i class="fa-solid fa-file-pen"></i>', 'text' => 'Content Optimization'],
        ],
        'seo_image' => 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&h=400&fit=crop', // SEO Concept

        // 2. SMO Section
        'smo_title' => 'Social Media Optimization (SMO)',
        'smo_badge' => 'COMMUNITY & BRAND',
        'smo_desc' => 'Turn followers into fans. We create engaging, shareable content that sparks conversations and builds a loyal community around your brand across all major platforms.',
        'smo_features' => [
            ['icon' => '<i class="fa-brands fa-instagram"></i>', 'text' => 'Instagram Growth Strategy'],
            ['icon' => '<i class="fa-brands fa-linkedin-in"></i>', 'text' => 'LinkedIn B2B Networking'],
            ['icon' => '<i class="fa-solid fa-hashtag"></i>', 'text' => 'Viral Campaign Management'],
            ['icon' => '<i class="fa-solid fa-users-viewfinder"></i>', 'text' => 'Community Engagement'],
        ],
        'smo_image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop', // Social Media Apps

        // 3. PPC Section
        'ppc_title' => 'Paid Advertising (PPC)',
        'ppc_badge' => 'INSTANT RESULTS',
        'ppc_desc' => 'Stop wasting ad spend. Our certified experts design laser-targeted campaigns on Google and Social Media that maximize your ROI and lower your Cost Per Acquisition (CPA).',
        'ppc_features' => [
            ['icon' => '<i class="fa-brands fa-google"></i>', 'text' => 'Google Search & Display Ads'],
            ['icon' => '<i class="fa-brands fa-meta"></i>', 'text' => 'Facebook & Instagram Ads'],
            ['icon' => '<i class="fa-solid fa-bullseye"></i>', 'text' => 'Retargeting Campaigns'],
            ['icon' => '<i class="fa-solid fa-sack-dollar"></i>', 'text' => 'ROAS Optimization'],
        ],
        'ppc_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', // Analytics/Graph

        // 4. Branding Section
        'branding_title' => 'Brand Management',
        'branding_badge' => 'IDENTITY & REPUTATION',
        'branding_desc' => 'Your brand is your promise. We help you define your unique voice, visual identity, and story, ensuring you resonate deeply with your target audience.',
        'branding_features' => [
            ['icon' => '<i class="fa-solid fa-fingerprint"></i>', 'text' => 'Brand Identity Design'],
            ['icon' => '<i class="fa-solid fa-bullhorn"></i>', 'text' => 'Brand Storytelling'],
            ['icon' => '<i class="fa-solid fa-star"></i>', 'text' => 'Reputation Management'],
            ['icon' => '<i class="fa-solid fa-palette"></i>', 'text' => 'Visual Style Guides'],
        ],
        'branding_image' => 'https://images.unsplash.com/photo-1493612276216-9c7836983c59?w=600&h=400&fit=crop', // Creative/Design

        // 5. Analytics Section
        'analytics_title' => 'Data Analytics',
        'analytics_badge' => 'INSIGHTS & ACTION',
        'analytics_desc' => 'Guesswork is expensive. We implement advanced tracking and reporting to help you understand user behavior, optimize funnels, and make data-backed decisions.',
        'analytics_features' => [
            ['icon' => '<i class="fa-solid fa-chart-pie"></i>', 'text' => 'Google Analytics 4 Setup'],
            ['icon' => '<i class="fa-solid fa-filter"></i>', 'text' => 'Conversion Rate Optimization (CRO)'],
            ['icon' => '<i class="fa-solid fa-user-group"></i>', 'text' => 'User Behavior Tracking'],
            ['icon' => '<i class="fa-solid fa-file-contract"></i>', 'text' => 'Custom Reporting Dashboards'],
        ],
        'analytics_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', // Data/Charts

        // FAQ Section
        'faq_items' => [
            [
                'question' => 'How long does it take to see results from SEO?',
                'answer' => 'SEO is a long-term strategy. While some technical fixes can show immediate impact, significant organic growth usually takes 3-6 months depending on competition and keyword difficulty.'
            ],
            [
                'question' => 'Which social media platforms are best for my business?',
                'answer' => 'It depends on your audience. B2B businesses often thrive on LinkedIn, while B2C lifestyle brands see great engagement on Instagram and TikTok. We analyze your target demographic to recommend the best mix.'
            ],
            [
                'question' => 'How do you measure the success of a campaign?',
                'answer' => 'We define Key Performance Indicators (KPIs) upfront, such as Conversion Rate, Cost Per Lead (CPL), and Return on Ad Spend (ROAS). We provide transparency through regular, detailed reports.'
            ],
            [
                'question' => 'Do you offer custom packages?',
                'answer' => 'Absolutely. Every business is unique. We audit your current digital presence and create a tailored roadmap that aligns with your specific goals and budget.'
            ]
        ],

        // Contact Form Options
        'admission_form_options' => [
            'academic' => [], // Empty for service page
            'services' => [
                'SEO Services',
                'Social Media Marketing',
                'Paid Advertising (PPC)',
                'Brand Management',
                'Data Analytics',
                'Full Digital Marketing Suite'
            ]
        ]
    ];
}
