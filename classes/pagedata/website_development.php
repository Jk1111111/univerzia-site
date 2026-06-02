<?php
// Website Development page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_website_development_data($assetsurl)
{
    return [
        'pagetitle' => 'Web Development Services | Custom Web Apps - UniverziaAI',
        'metadescription' => 'Custom web development services by UniverziaAI. Full-stack development, web applications, API integration, and scalable solutions for businesses.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=website_development',
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

            // Strategies Accordion Logic
            const accItems = document.querySelectorAll(".strategy-acc-item");
            accItems.forEach(item => {
                const header = item.querySelector(".strategy-acc-header");
                header.addEventListener("click", () => {
                    const isActive = item.classList.contains("active");
                    
                    // Close all
                    accItems.forEach(other => {
                        other.classList.remove("active");
                        other.querySelector(".strategy-acc-body").style.maxHeight = null;
                    });

                    // Toggle clicked if it was not active
                    if (!isActive) {
                        item.classList.add("active");
                        const body = item.querySelector(".strategy-acc-body");
                        body.style.maxHeight = body.scrollHeight + "px";
                    }
                });
            });

            // Open first item by default
            if (accItems.length > 0) {
                const firstItem = accItems[0];
                firstItem.classList.add("active");
                firstItem.querySelector(".strategy-acc-body").style.maxHeight = firstItem.querySelector(".strategy-acc-body").scrollHeight + "px";
            }
        ',
        'hero_title' => 'Website Development',
        'hero_subtitle' => 'Robust, scalable, and high-performance websites built with the latest technologies.',
        'technologies' => ['PHP', 'Laravel', 'React.js', 'Node.js', 'Python/Django', 'WordPress', 'Moodle', 'Next.js'],
        'services' => [
            [
                'title' => 'HTML5 website',
                'description' => 'HTML builds websites, which can be static or dynamic with server-side languages like PHP or JavaScript.',
                'icon_class' => 'fa-solid fa-desktop'
            ],
            [
                'title' => 'Web Application',
                'description' => 'PHP can be used to create dynamic and database-driven pages, making it ideal for e-commerce or interactive sites.',
                'icon_class' => 'fa-solid fa-code'
            ],
            [
                'title' => 'WordPress Development',
                'description' => 'Our experts specialize in CMS platforms like WordPress, a leading open-source system for building websites of all sizes.',
                'icon_class' => 'fa-brands fa-wordpress-simple'
            ],
            [
                'title' => 'Internal Web Application',
                'description' => 'Joomla is a open-source CMS built with PHP, used for creating e-commerce and social networking sites.',
                'icon_class' => 'fa-solid fa-network-wired'
            ],
            [
                'title' => 'E-commerce Web Application',
                'description' => 'We create e-commerce websites that convert visitors into customers with attention-grabbing designs.',
                'icon_class' => 'fa-solid fa-cart-shopping'
            ],
            [
                'title' => 'ERP & CRM Application',
                'description' => 'CRM helps businesses manage client interactions to enhance satisfaction and drive sales.',
                'icon_class' => 'fa-solid fa-chart-line'
            ]
        ],
        'industry_features' => [
            'header_small' => '// WORKING AREAS',
            'title' => 'IT Services Customized for Your Industry',
            'highlight_question' => 'How can website boost your business and build your brand?',
            'description' => 'Websites boost visibility, attract customers, and serve as a 24/7 marketing tool, to showcase your brand.',
            'features' => [
                ['title' => 'Online Showcase', 'icon' => 'fa-solid fa-globe', 'color' => '#ff0055'],
                ['title' => 'Brand Identity', 'icon' => 'fa-regular fa-thumbs-up', 'color' => '#00ffcc'],
                ['title' => 'Customer Engagement', 'icon' => 'fa-solid fa-users-gear', 'color' => '#ffcc00'],
                ['title' => 'Revenue Growth', 'icon' => 'fa-solid fa-arrow-trend-up', 'color' => '#cc00ff']
            ]
        ],
        'industry_image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&fit=crop&q=80', // Tech team working
        'company_strategies' => [
            'header_small' => '// COMPANY STRATEGIES',
            'title' => 'Beyond Web Development, Innovation & Strategy',
            'description' => 'Cloud Software Solution is a renowned website development company in Bangalore, specializing in innovative solutions tailored to each client\'s needs.',
            'highlights' => [
                [
                    'title' => 'Best User Interfaces',
                    'desc' => 'Discover intuitive designs with our best user interfaces. We create engaging experiences that enhance usability and satisfaction.',
                    'icon' => 'fa-solid fa-laptop-code',
                    'color' => '#ff6b6b'
                ],
                [
                    'title' => 'Quality Web Design',
                    'desc' => 'Quality web design merges aesthetics with functionality. We create visually appealing websites that enhance user engagement.',
                    'icon' => 'fa-solid fa-palette',
                    'color' => '#feca57'
                ]
            ],
            'strategies' => [
                [
                    'title' => 'HTML5 Website',
                    'content' => 'We create user-friendly websites that reflect our clients\' values and vision, serving as the crucial first point of contact with potential customers.'
                ],
                [
                    'title' => 'PHP Web Application',
                    'content' => 'Cloud Software Solution is Bangalore\'s premier PHP development provider, focused on helping clients build a strong online presence.'
                ],
                [
                    'title' => 'WordPress Development',
                    'content' => 'A well-designed WordPress website attracts customers and builds credibility. We provide expert services to boost your brand\'s visibility.'
                ],
                [
                    'title' => 'Internal Web Application',
                    'content' => 'Streamline workflows and enhance team collaboration with a secure, user-friendly interface tailored for seamless internal operations.'
                ]
            ]
        ],
        'industries' => [
            'header_small' => '// INDUSTRIES WE EMPOWER',
            'title' => 'Digital Solutions Across Sectors',
            'description' => 'Delivering tailored strategies and robust platforms to drive growth in diverse industries.',
            'items' => [
                [
                    'title' => 'Retail & E-commerce',
                    'desc' => 'Driving digital sales with robust, secure storefronts that turn visitors into loyal customers.',
                    'icon' => 'fa-solid fa-cart-shopping',
                    'color' => '#3b82f6' // Blue
                ],
                [
                    'title' => 'Healthcare & Medical',
                    'desc' => 'Enhancing patient care through simple, compliant platforms that streamline appointments and data.',
                    'icon' => 'fa-solid fa-heart-pulse',
                    'color' => '#10b981' // Green
                ],
                [
                    'title' => 'EdTech & Learning',
                    'desc' => 'Empowering institutions with interactive LMS platforms that engage students and simplify administration.',
                    'icon' => 'fa-solid fa-graduation-cap',
                    'color' => '#f59e0b' // Amber
                ],
                [
                    'title' => 'Travel & Hospitality',
                    'desc' => 'Captivating travelers with immersive booking experiences and seamless itinerary management.',
                    'icon' => 'fa-solid fa-plane-departure',
                    'color' => '#06b6d4' // Cyan
                ],
                [
                    'title' => 'FinTech & Banking',
                    'desc' => 'Building trust with high-security banking portals that prioritize data protection and user ease.',
                    'icon' => 'fa-solid fa-building-columns',
                    'color' => '#6366f1' // Indigo
                ],
                [
                    'title' => 'Real Estate',
                    'desc' => 'Showcasing properties with high-definition galleries and smart search tools.',
                    'icon' => 'fa-solid fa-city',
                    'color' => '#8b5cf6' // Violet
                ]
            ]
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
                'Website Design',
                'Custom Web Development',
                'LMS Development',
                'E-Commerce Solutions',
                'Digital Marketing & SEO',
                'App Development',
                'AI Automation Solutions'
            ]
        ]
    ];
}
