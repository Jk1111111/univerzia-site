<?php
// AI Workshops page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_ai_workshops_data($assetsurl)
{
    global $CFG;

    $payment_endpoint = $CFG->wwwroot . '/local/univerziaai/payment.php';

    return [
        'pagetitle' => 'AI Tools Workshop | Hands-On AI Training - UniverziaAI',
        'metadescription' => 'Join our live AI Tools Workshop. Learn ChatGPT, AI automation, and 50+ AI hacks in a 3+ hour hands-on session. Certificate included. Register now for just ₹9.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=ai_workshops',
        'og_image' => $assetsurl . '/ai_tools_hero.png',
        'pagestyle' => '',
        'extracss' => '',
        // Payment configuration
        'payment_endpoint' => $payment_endpoint,
        'payment_amount' => 9,
        'payment_currency' => 'INR',
        'razorpay_key' => 'rzp_test_SCBOT0Gy9Xc1lS',
        'business_name' => 'UniverziaAI',
        'business_logo' => $assetsurl . '/logo.png',
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
        'hero_title' => 'Learn to use <span class="text-orange">AI Tools & ChatGPT</span> <i class="fa-solid fa-robot"></i>',
        'hero_subtitle' => 'Create any kind of <span class="text-highlight-orange">Presentations under 10 secs</span>, do any kind of IT work under 10 mins, become <span class="text-highlight-orange">top 1% of excel users</span> who can use the functions and <span class="text-highlight-orange">save your job</span> and 90% of your time on daily basis',
        'hero_checklist' => [
            'BECOME A HIGHLY PAID PROMPT ENGINEER (AVERAGE SALARY 17LPA)',
            'NO PRIOR TECHNICAL OR AI KNOWLEDGE REQUIRED',
            'SAVE UPTO 2 HOURS EVERYDAY',
            'GROW YOUR SALARY UPTO 3X'
        ],
        'session_details' => [
            ['icon' => '<i class="fa-regular fa-calendar-days"></i>', 'text' => 'On ' . date('M j, Y', strtotime('next Sunday'))],
            ['icon' => '<i class="fa-solid fa-hourglass-half"></i>', 'text' => '3+ Hours'],
            ['icon' => '<i class="fa-solid fa-video"></i>', 'text' => 'Live Session'],
            ['icon' => '<i class="fa-regular fa-clock"></i>', 'text' => '11:00 AM Onwards']
        ],
        'benefits_list' => [
            'Get <span class="text-orange">certified by be10x</span> to highlight your AI tool capabilities in your resume',
            'Learn from <span class="text-orange">IIT Kharagpur</span> alumni',
            'Be among the top 1% professionals to <span class="text-orange">avoid being laid off</span>',
            '<span class="text-orange">No technical AI knowledge</span> required to master AI tools',
            'Proven to <span class="text-orange">reduce your work</span> by 2 hours daily'
        ],
        'cta_price_original' => '929',
        'cta_price_current' => '9',
        'why_join' => [
            ['icon' => '<i class="fa-solid fa-magnifying-glass"></i>', 'title' => 'Smart Research', 'desc' => 'Research for any presentation or report in minutes.'],
            ['icon' => '<i class="fa-solid fa-stopwatch"></i>', 'title' => 'Rapid Reporting', 'desc' => 'Complete comprehensive research or reports in under 20 minutes.'],
            ['icon' => '<i class="fa-solid fa-bolt"></i>', 'title' => 'Instant Decks', 'desc' => 'Create professional presentations in under 10 seconds.'],
            ['icon' => '<i class="fa-solid fa-laptop-code"></i>', 'title' => 'No-Code Coding', 'desc' => 'Learn to code using AI with absolute zero technical knowledge.'],
            ['icon' => '<i class="fa-solid fa-wand-magic-sparkles"></i>', 'title' => 'Excel Wizardry', 'desc' => 'Use complex Excel formulas with AI without memorizing them.'],
            ['icon' => '<i class="fa-brands fa-linkedin"></i>', 'title' => 'LinkedIn Growth', 'desc' => 'Master LinkedIn tools that will accelerate your career growth.'],
            ['icon' => '<i class="fa-solid fa-briefcase"></i>', 'title' => 'Pro Focused', 'desc' => 'Specially designed curriculum for working professionals.'],
            ['icon' => '<i class="fa-solid fa-rocket"></i>', 'title' => 'Future Skills', 'desc' => 'Prompt Engineering: The most critical career skill of the future.'],
            ['icon' => '<i class="fa-solid fa-arrow-trend-up"></i>', 'title' => 'Career Boost', 'desc' => 'Supercharge your career with the blueprint for ChatGPT & AI tools.'],
            ['icon' => '<i class="fa-solid fa-shield-halved"></i>', 'title' => 'Job Security', 'desc' => 'Future-proof your job by learning skills that make you irreplaceable.']
        ],
        'market_reality_stats' => [
            [
                'type' => 'risk',
                'icon' => '<i class="fa-solid fa-arrow-trend-down"></i>',
                'value' => '85 Million',
                'title' => 'Jobs Displaced',
                'desc' => 'By 2025, shifting division of labour between humans and machines will displace 85 million jobs.',
                'source' => 'World Economic Forum'
            ],
            [
                'type' => 'change',
                'icon' => '<i class="fa-solid fa-triangle-exclamation"></i>',
                'value' => '44%',
                'title' => 'Skills Disruption',
                'desc' => '44% of workers’ core skills are expected to change in the next 5 years.',
                'source' => 'Future of Jobs Report'
            ],
            [
                'type' => 'opportunity',
                'icon' => '<i class="fa-solid fa-rocket"></i>',
                'value' => '97 Million',
                'title' => 'New Roles Emerging',
                'desc' => 'New roles adapted to the new division of labour between humans, machines, and algorithms.',
                'source' => 'World Economic Forum'
            ]
        ],
        'media_mentions_image' => $assetsurl . '/news_collage.png',
        'curriculum_modules' => [
            ['icon' => '<i class="fa-brands fa-linkedin"></i>', 'color' => 'bg-blue', 'title' => 'AI Tools for LinkedIn', 'desc' => 'Learn using AI tools to find leads, get jobs, and write amazing posts.'],
            ['icon' => '<i class="fa-solid fa-file-excel"></i>', 'color' => 'bg-green', 'title' => 'AI Tools for Microsoft Excel', 'desc' => 'Master excel formulas without remembering them.'],
            ['icon' => '<i class="fa-solid fa-file-powerpoint"></i>', 'color' => 'bg-red', 'title' => 'AI Tools for Building Presentations', 'desc' => 'Create attention grabbing presentations in minutes.'],
            ['icon' => '<i class="fa-solid fa-chart-pie"></i>', 'color' => 'bg-cyan', 'title' => 'AI Tools for Interview Skills', 'desc' => 'Learn important aspects of interviews and get hired.'],
            ['icon' => '<i class="fa-solid fa-file-lines"></i>', 'color' => 'bg-indigo', 'title' => 'AI Tools for Report Building (research)', 'desc' => 'Create versatile research reports with the help of AI.'],
            ['icon' => '<i class="fa-solid fa-laptop-code"></i>', 'color' => 'bg-blue-dark', 'title' => 'AI Tools for Coding/ Programming', 'desc' => 'Develop new features in a few clicks.']
        ],
        'news_articles' => [
            [
                'source' => 'Forbes',
                'date' => 'May 2024',
                'headline' => 'AI Prompt Engineers Earn $300k Salaries: Here\'s How To Learn The Skill For Free',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/200px-Forbes_logo.svg.png'
            ],
            [
                'source' => 'India Today',
                'date' => 'June 2024',
                'headline' => 'Netflix is hiring for many AI-related positions with annual salary up to Rs 7.4 crore: all details',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/2/28/India_Today_Logo.svg' // Using placeholder or text if image fails is fine, but mustache will handle it.
            ],
            [
                'source' => 'CNBC Make It',
                'date' => 'April 2024',
                'headline' => '69 million jobs to emerge in the next five years — and A.I. could play a key role: World Economic Forum',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg'
            ]
        ],
        'bonuses' => [
            ['badge' => 'Bonus 1', 'icon' => '<i class="fa-regular fa-file"></i>', 'title' => '50+ easy to implement productivity hacks', 'worth' => '₹5000'],
            ['badge' => 'Bonus 2', 'icon' => '<i class="fa-solid fa-chart-pie"></i>', 'title' => '800+ Premium Customizable PPT templates', 'worth' => '₹3000'],
            ['badge' => 'Bonus 3', 'icon' => '<i class="fa-regular fa-clock"></i>', 'title' => 'Ebook on Time Management', 'worth' => '₹2500']
        ],
        'mentors' => [
            [
                'name' => 'Gautam Shukla',
                'title' => '8+ years exp | Ex-Netsmartz<br>Full-Stack Developer | AI & Data Science Expert',
                'bio' => 'Gautam brings deep experience in building scalable, production-ready applications and AI-driven solutions.',
                'image' => $assetsurl . '/gautam.png',
                'socials' => true
            ],
            [
                'name' => 'Jodhraj Kalawat',
                'title' => 'System Architect<br>8+ years of experience | Ex-Hitachi',
                'bio' => 'A specialist in designing scalable and high-performance systems and enterprise-grade application design.',
                'image' => $assetsurl . '/jodhraj.png',
                'socials' => true
            ],
            [
                'name' => 'Shashank Mathur',
                'title' => 'Full-Stack | AI & Agentic AI Specialist<br>8+ years of experience | Ex-Bosch, Infosys',
                'bio' => 'Shashank is a versatile technology expert with hands-on experience across full-stack development and Agentic AI.',
                'image' => $assetsurl . '/shashank.png',
                'socials' => true
            ],
            [
                'name' => 'Aniket Mishra',
                'title' => 'AI & Machine Learning Expert<br>9+ years of experience | Ex-Cognizant',
                'bio' => 'Aniket has strong expertise in AI and ML solutions, working on real-world data models and intelligent systems.',
                'image' => $assetsurl . '/aniket.jpeg',
                'socials' => true
            ]
        ],
        'certificate_section' => [
            'src' => $assetsurl . '/certificate_sample.png',
            'title' => 'Get a Certification for the Workshop',
            'desc' => 'Yes! You will be certified by AI Tools Expert Trainers, which adds significant credibility to your certificate and your resume.'
        ],
        'faq' => [
            ['question' => 'Will the workshop be live or pre-recorded?', 'answer' => 'It includes both live interactive sessions and high-quality pre-recorded content for flexibility.'],
            ['question' => 'How much time do I have to complete the program?', 'answer' => 'You get lifetime access! There is no time limit, learn at your own pace.'],
            ['question' => 'I have a full time job. Is this for me?', 'answer' => 'Absolutely! The program is designed for working professionals with flexible schedules.'],
            ['question' => 'Will I get a certificate?', 'answer' => 'Yes! You will receive an industry-recognized certificate upon completion.']
        ]
    ];
}
