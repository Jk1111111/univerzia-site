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
 * Home page data for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get home page data
 *
 * @param string $assetsurl Base URL for assets
 * @return array Page data
 */
function local_univerziaai_get_home_data($assetsurl)
{
    return [
        'pagetitle' => 'UniverziaAI | AI-Powered LMS & Learning Solutions',
        'metadescription' => 'UniverziaAI provides AI-powered LMS, chatbot, and digital learning solutions for enterprises and institutions. Website design, development, and AI training.',
        'canonical' => $GLOBALS['CFG']->wwwroot,
        'og_image' => $assetsurl . '/hero_student.png',
        'schema_json' => [
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => 'UniverziaAI',
            'description' => 'AI-powered LMS, digital learning solutions, and IT services for enterprises and institutions.',
            'url' => $GLOBALS['CFG']->wwwroot,
            'telephone' => '+919511016762',
            'email' => 'gautam.shukla@univerziaai.in',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Awas Vikas Colony, Daulatpur Road',
                'addressLocality' => 'Varanasi',
                'addressRegion' => 'Uttar Pradesh',
                'addressCountry' => 'IN',
            ],
            'priceRange' => '$$',
            'openingHours' => 'Mo-Sa 09:00-18:00',
        ],
        'pagestyle' => '
            .home-hero {
                background: #000;
                padding-top: 140px;
                padding-bottom: 100px;
                position: relative;
                overflow: hidden;
                width: 100%;
            }
            .hero-split {
                display: flex;
                align-items: center;
                gap: 50px;
                flex-wrap: wrap;
            }
            .hero-split-text {
                flex: 1;
                min-width: 300px;
            }
            .hero-split-visual {
                flex: 1;
                min-width: 300px;
                position: relative;
            }
            .service-card-hub {
                background: white;
                padding: 30px;
                border-radius: 16px;
                border: 1px solid var(--neutral-200);
                transition: all 0.3s ease;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .service-card-hub:hover {
                transform: translateY(-8px);
                box-shadow: var(--shadow-xl);
                border-color: var(--primary-200);
            }
            .service-icon-large {
                font-size: 3rem;
                margin-bottom: 20px;
                background: var(--primary-100);
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            .section-header-center {
                text-align: center;
                max-width: 800px;
                margin: 0 auto 60px;
            }
            .course-preview-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
            }
            .home-stats {
                background: var(--neutral-900);
                color: white;
                padding: 60px 0;
                margin-top: -50px;
                position: relative;
                z-index: 10;
                border-radius: 20px;
                box-shadow: var(--shadow-xl);
            }
            .cta-box {
                background: linear-gradient(135deg, var(--primary-600), var(--primary-500));
                border-radius: 24px;
                padding: 60px;
                text-align: center;
                color: white;
                position: relative;
                overflow: hidden;
            }
            .cta-box h2 { color: white; margin-bottom: 20px; }
            .cta-box p { color: rgba(255, 255, 255, 0.9); margin-bottom: 30px; font-size: 1.2rem; }

            /* Hero Slider Styles */
            .custom-hero-slider {
                position: relative;
                width: 100%;
                overflow: hidden;
                background: #000;
                touch-action: pan-y;
            }
            .slider-track {
                display: flex;
                width: 100%;
                will-change: transform;
                transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .slider-slide {
                flex: 0 0 100%;
                max-width: 100%;
                width: 100%;
                display: flex; 
                align-items: center;
                justify-content: center;
            }
            .slider-indicators {
                position: absolute;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 12px;
                z-index: 10;
            }
            .slider-indicators .indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                border: none;
                cursor: pointer;
                padding: 0;
                transition: all 0.3s ease;
            }
            .slider-indicators .indicator:hover {
                background-color: rgba(255, 255, 255, 0.8);
            }
            .slider-indicators .indicator.active {
                background-color: #ffffff;
                transform: scale(1.3);
            }
            @media (max-width: 768px) {
                .slider-indicators { bottom: 20px; }
                .slider-indicators .indicator { width: 10px; height: 10px; }
            }
        ',

        'page_js' => '
            document.addEventListener("DOMContentLoaded", function() {
                // Hero Slider Logic
                const slider = document.getElementById("homeHeroSlider");
                const sliderTrack = document.getElementById("sliderTrack");
                const heroSlides = document.querySelectorAll(".slider-slide");
                const heroIndicators = document.querySelectorAll(".slider-indicators .indicator");
                
                if (slider && sliderTrack && heroSlides.length > 0) {
                    let slideCurrentIndex = 0;
                    const totalHeroSlides = heroSlides.length;
                    let heroSlideInterval;
                    const heroIntervalTime = 3000; // 3 seconds

                    function goToHeroSlide(index) {
                        if (index < 0) slideCurrentIndex = totalHeroSlides - 1;
                        else if (index >= totalHeroSlides) slideCurrentIndex = 0;
                        else slideCurrentIndex = index;

                        const translateX = -(slideCurrentIndex * 100);
                        sliderTrack.style.transform = `translateX(${translateX}%)`;

                        heroIndicators.forEach((ind, i) => {
                            if (i === slideCurrentIndex) ind.classList.add("active");
                            else ind.classList.remove("active");
                        });
                    }

                    function nextHeroSlide() { goToHeroSlide(slideCurrentIndex + 1); }
                    function startHeroSlide() { heroSlideInterval = setInterval(nextHeroSlide, heroIntervalTime); }
                    function stopHeroSlide() { clearInterval(heroSlideInterval); }

                    // Hover to pause
                    slider.addEventListener("mouseenter", stopHeroSlide);
                    slider.addEventListener("mouseleave", startHeroSlide);

                    // Indicator clicks
                    heroIndicators.forEach((indicator) => {
                        indicator.addEventListener("click", function() {
                            const slideIndex = parseInt(this.getAttribute("data-index"));
                            goToHeroSlide(slideIndex);
                            stopHeroSlide();
                            startHeroSlide();
                        });
                    });

                    // Touch support
                    let heroTouchStartX = 0;
                    let heroTouchEndX = 0;

                    slider.addEventListener("touchstart", e => {
                        heroTouchStartX = e.changedTouches[0].screenX;
                        stopHeroSlide();
                    }, {passive: true});

                    slider.addEventListener("touchend", e => {
                        heroTouchEndX = e.changedTouches[0].screenX;
                        if (heroTouchStartX - heroTouchEndX > 50) nextHeroSlide();
                        else if (heroTouchEndX - heroTouchStartX > 50) goToHeroSlide(slideCurrentIndex - 1);
                        startHeroSlide();
                    }, {passive: true});

                    startHeroSlide();
                }

                // Mobile Menu Toggle
                const mobileToggle = document.getElementById("mobileToggle");
                const navMenu = document.getElementById("navMenu");
                if (mobileToggle) {
                    mobileToggle.addEventListener("click", () => {
                        navMenu.classList.toggle("active");
                        mobileToggle.classList.toggle("active");
                    });
                }
                
                // Distribute program cards to their respective grids
                const allCardsContainer = document.getElementById("all-program-cards");
                if (allCardsContainer) {
                    const cards = allCardsContainer.querySelectorAll(".program-card");
                    cards.forEach(card => {
                        const category = card.dataset.category;
                        let targetGrid = null;
                        
                        if (category === "ai-mastery") {
                            targetGrid = document.getElementById("grid-ai-mastery");
                        } else if (category === "tech") {
                            targetGrid = document.getElementById("grid-tech");
                        } else if (category === "data") {
                            targetGrid = document.getElementById("grid-data");
                        }
                        
                        if (targetGrid) {
                            const clone = card.cloneNode(true);
                            clone.style.display = "flex";
                            targetGrid.appendChild(clone);
                        }
                    });
                }
                
                // Category tabs functionality
                const categoryTabs = document.querySelectorAll(".cx-tab");
                const contentPanels = document.querySelectorAll(".cx-panel");

                categoryTabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        categoryTabs.forEach(t => t.classList.remove("cx-tab--active"));
                        tab.classList.add("cx-tab--active");

                        const category = tab.dataset.category;

                        contentPanels.forEach(panel => {
                            panel.classList.remove("cx-panel--active");
                        });

                        const targetPanel = document.getElementById("panel-" + category);
                        if (targetPanel) {
                            targetPanel.classList.add("cx-panel--active");
                        }
                    });
                });
                
                // Join Now Modal functionality
                const openModalBtn = document.getElementById("openJoinModal");
                const closeModalBtn = document.getElementById("closeJoinModal");
                const modalOverlay = document.getElementById("joinModalOverlay");
                const joinForm = document.getElementById("joinForm");
                
                if (openModalBtn && modalOverlay) {
                    openModalBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        modalOverlay.classList.add("active");
                        document.body.style.overflow = "hidden";
                    });
                }
                
                if (closeModalBtn && modalOverlay) {
                    closeModalBtn.addEventListener("click", () => {
                        modalOverlay.classList.remove("active");
                        document.body.style.overflow = "";
                    });
                }
                
                if (modalOverlay) {
                    modalOverlay.addEventListener("click", (e) => {
                        if (e.target === modalOverlay) {
                            modalOverlay.classList.remove("active");
                            document.body.style.overflow = "";
                        }
                    });
                }
                
                if (joinForm) {
                    const joinSuccessContainer = document.getElementById("joinSuccessContainer");
                    const joinFormMessage = document.getElementById("joinFormMessage");
                    const title = document.querySelector(".modal-form-title");
                    const submitBtn = joinForm.querySelector(".modal-submit-btn");
                    const joinCloseBtn = document.getElementById("joinCloseBtn");

                    joinForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        
                        // Reset message
                        joinFormMessage.textContent = "";
                        submitBtn.disabled = true;
                        submitBtn.textContent = "Processing...";

                        const formData = new FormData(joinForm);

                        fetch("' . $GLOBALS['CFG']->wwwroot . '/local/univerziaai/ajax_submit_join.php", {
                            method: "POST",
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                // Hide form and title, show success container
                                joinForm.style.display = "none";
                                if(title) title.style.display = "none";
                                joinSuccessContainer.style.display = "flex";
                                joinForm.reset();
                            } else {
                                joinFormMessage.textContent = data.message || "An error occurred.";
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            joinFormMessage.textContent = "Network error. Please try again.";
                        })
                        .finally(() => {
                            submitBtn.disabled = false;
                            submitBtn.textContent = "Submit Now";
                        });
                    });

                    if (joinCloseBtn) {
                        joinCloseBtn.addEventListener("click", () => {
                            modalOverlay.classList.remove("active");
                            document.body.style.overflow = "";
                            // Reset view for next open after delay
                            setTimeout(() => {
                                joinSuccessContainer.style.display = "none";
                                joinForm.style.display = "block";
                                if(title) title.style.display = "block";
                            }, 300);
                        });
                    }
                    
                    // Reset view when closing via X button
                    if (closeModalBtn) {
                        closeModalBtn.addEventListener("click", () => {
                            setTimeout(() => {
                                joinSuccessContainer.style.display = "none";
                                joinForm.style.display = "block";
                                if(title) title.style.display = "block";
                                joinFormMessage.textContent = "";
                            }, 300);
                        });
                    }
                }

                // Benefits Slider
                const track = document.getElementById("benefitsTrack");
                const prevBtn = document.getElementById("prevBenefitBtn");
                const nextBtn = document.getElementById("nextBenefitBtn");
                const counter = document.getElementById("benefitCounter");
                
                if (track && prevBtn && nextBtn) {
                    const itemsRequest = 7; 
                    const visibleItems = 3;
                    let currentIndex = 0;
                    
                    const slides = Array.from(track.children);
                    for (let i = 0; i < visibleItems; i++) {
                        const clone = slides[i].cloneNode(true);
                        track.appendChild(clone);
                    }
                    
                    const itemsTotal = itemsRequest; // Use simpler variable for modulo
                    
                    function updateSlider(animate = true) {
                        const slideWidth = 100 / visibleItems;
                        const moveAmount = currentIndex * slideWidth;
                        
                        if (animate) {
                            track.style.transition = "transform 0.5s ease-in-out";
                        } else {
                            track.style.transition = "none";
                        }
                        
                        track.style.transform = `translateX(-${moveAmount}%)`;
                        
                        let displayIndex = (currentIndex % itemsTotal) + 1;
                        if (counter) counter.textContent = `${displayIndex} / ${itemsTotal}`;
                    }
                    
                    nextBtn.addEventListener("click", () => {
                        if (currentIndex >= itemsTotal) {
                            currentIndex = 0;
                            updateSlider(false);
                            void track.offsetWidth;
                            requestAnimationFrame(() => {
                                currentIndex++;
                                updateSlider(true);
                            });
                        } else {
                            currentIndex++;
                            updateSlider(true);
                            if (currentIndex === itemsTotal) {
                                setTimeout(() => {
                                    currentIndex = 0;
                                    updateSlider(false);
                                }, 500);
                            }
                        }
                    });
                    
                    prevBtn.addEventListener("click", () => {
                        if (currentIndex <= 0) {
                            currentIndex = itemsTotal;
                            updateSlider(false);
                            void track.offsetWidth;
                            requestAnimationFrame(() => {
                                currentIndex--;
                                updateSlider(true);
                            });
                        } else {
                            currentIndex--;
                            updateSlider(true);
                        }
                    });
                }

                // FAQ Accordion
                const faqContainer = document.querySelector(".faq-accordion");
                if (faqContainer) {
                    faqContainer.addEventListener("click", (e) => {
                        const header = e.target.closest(".faq-header");
                        if (!header) return;
                        
                        const item = header.parentElement;
                        const currentlyActive = faqContainer.querySelector(".faq-item.active");
                        
                        if (currentlyActive && currentlyActive !== item) {
                            currentlyActive.classList.remove("active");
                            const activeBody = currentlyActive.querySelector(".faq-body");
                            if (activeBody) activeBody.style.maxHeight = 0;
                        }
                        
                        item.classList.toggle("active");
                        const body = item.querySelector(".faq-body");
                        
                        if (item.classList.contains("active")) {
                            body.style.maxHeight = body.scrollHeight + "px";
                        } else {
                            body.style.maxHeight = 0;
                        }
                    });
                }
            });
        ',
        'faq_items' => [
            [
                'question' => 'Why choose UniverziaAi for AI & Tech learning?',
                'answer' => 'UniverziaAi focuses on practical, project-based learning. Our curriculum is designed by industry experts to ensure you gain job-ready skills in AI, Data Science, and Python, not just theoretical knowledge.'
            ],
            [
                'question' => 'Do I need coding experience to join?',
                'answer' => 'Not at all! We have programs tailored for absolute beginners (like our No-Code AI SaaS course) as well as advanced tracks for experienced developers. There is a path for everyone.'
            ],
            [
                'question' => 'How do your Digital Solutions help businesses?',
                'answer' => 'We provide end-to-end digital transformation services – from custom website development and LMS solutions to AI-driven automation and data analytics – helping you scale efficiency and growth.'
            ],
            [
                'question' => 'Are the certifications industry-recognized?',
                'answer' => 'Yes, our certificates are recognized by leading tech companies. We also provide a portfolio of real-world projects that validates your skills to potential employers.'
            ],
            [
                'question' => 'What career support do you provide?',
                'answer' => 'We offer dedicated career support including resume building, mock interviews, LinkedIn profile optimization, and direct connections to our network of hiring partners.'
            ]
        ],
        'category_tabs' => [
            ['category' => 'ai-workshops', 'label' => 'AI Workshops', 'icon' => '<i class="fa-solid fa-bullseye"></i>', 'active' => true],
            ['category' => 'ai-mastery', 'label' => 'AI Mastery', 'icon' => '<i class="fa-solid fa-rocket"></i>', 'active' => false],
            ['category' => 'tech', 'label' => 'Tech Program', 'icon' => '<i class="fa-solid fa-laptop-code"></i>', 'active' => false],
            ['category' => 'data', 'label' => 'Data Program', 'icon' => '<i class="fa-solid fa-chart-simple"></i>', 'active' => false],
        ],
        // AI Workshops - Special content section (not course cards)
        'ai_workshops_content' => [
            'description' => 'This workshop teaches how to use AI tools and prompt engineering to save time, boost productivity, grow professionally, and stay relevant in the future job market.',
            'outcomes' => [
                'How to use AI & ChatGPT to save massive time in daily work',
                'Prompt engineering as a career and productivity skill',
                'AI for professional growth (Excel, coding, LinkedIn, interviews)',
                'How to stay relevant and secure in the AI-driven job market'
            ]
        ],
        // AI Mastery Workshops - Key points + AI courses
        'ai_mastery_content' => [
            'description' => 'All AI-related courses are included in the AI Mastery Workshops. Master the complete AI toolkit and transform your career.',
            'key_points' => [
                'Comprehensive AI training from beginner to advanced levels',
                'Learn prompt engineering, automation, and AI-powered workflows',
                'Boost productivity by 10x with cutting-edge AI tools',
                'Future-proof your career with in-demand AI skills',
                'Get hands-on experience with real-world AI projects',
                'Join a community of AI-powered professionals'
            ]
        ],
        // Tech Program content
        'tech_program_content' => [
            'description' => 'Master cutting-edge programming and AI development skills. Build real-world applications and automate workflows with our hands-on tech programs.',
            'courses' => [
                ['title' => 'Python with AI', 'duration' => '5 Weeks', 'icon' => '<i class="fa-brands fa-python"></i>', 'description' => 'Master Python from scratch and integrate AI capabilities to build smart, automated applications.'],
                ['title' => 'Coding Using AI – Build No-Code AI SaaS Apps', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-laptop-code"></i>', 'description' => 'Create AI-powered web apps, chatbots, and dashboards without writing traditional code.'],
                ['title' => 'AI Automation Workflow – Agentic AI', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-robot"></i>', 'description' => 'Use AI agents to automate complex workflows and boost business efficiency at scale.']
            ]
        ],
        // Data Program content
        'data_program_content' => [
            'description' => 'Transform raw data into actionable insights. Learn data science, analytics, and database management with AI-powered tools and techniques.',
            'courses' => [
                ['title' => 'Data Science with AI', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-chart-simple"></i>', 'description' => 'Master DSA, system design, and generative AI with real-world projects and 1:1 mentorship.'],
                ['title' => 'Advanced Data Analysis Program', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-chart-line"></i>', 'description' => 'Comprehensive, industry-aligned curriculum with hands-on, end-to-end project experience.'],
                ['title' => 'SQL Management with AI', 'duration' => '5 Weeks', 'icon' => '<i class="fa-solid fa-database"></i>', 'description' => 'Master SQL queries, database management, and use AI to optimize performance and build pipelines.'],
                ['title' => 'Coding Using AI – Build No-Code AI SaaS Apps', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-laptop-code"></i>', 'description' => 'Create AI-powered apps, chatbots, and interactive dashboards without writing code.'],
                ['title' => 'Agentic AI & Automation', 'duration' => '6 Weeks', 'icon' => '<i class="fa-solid fa-gears"></i>', 'description' => 'Use AI agents to automate workflows and drive business efficiency without coding.']
            ]
        ],
        // Benefits Slider Items
        'benefits_slider_items' => [
            [
                'title' => 'Practical, Hands-On Experience',
                'text' => 'Engage in case studies, projects, and simulations that prepare you for real-world challenges and job-ready skills.'
            ],
            [
                'title' => 'Global Networking Opportunities',
                'text' => 'Connect with a diverse community of learners, professionals, and experts across the globe — expanding your professional network and global perspective.'
            ],
            [
                'title' => 'Dedicated Career Support',
                'text' => 'Receive personalized guidance, resume-building sessions, and interview preparation to help you secure the right opportunities after completion.'
            ],
            [
                'title' => 'Globally Recognized Programs',
                'text' => 'Gain access to accredited and industry-relevant courses offered in partnership with leading universities and institutions worldwide.'
            ],
            [
                'title' => 'Expert Faculty & Mentorship',
                'text' => 'Learn from experienced educators, industry professionals, and global mentors who bring real-world insights into every lesson.'
            ],
            [
                'title' => 'Career-Focused Learning',
                'text' => 'Our programs are designed to bridge the gap between academics and industry, equipping you with the skills and confidence needed to excel in your career.'
            ],
            [
                'title' => 'Flexible & Accessible Learning',
                'text' => 'Study at your own pace with flexible online options, recorded sessions, and live interactive classes that fit your schedule.'
            ]
        ],
        'programs' => [
            // AI MASTERY WORKSHOPS - All AI-related courses
            [
                'id' => 'prompt-eng',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Prompt Engineering Mastery',
                'bullets' => [
                    'Get 10x better responses from AI tools',
                    'Turn AI into your personal assistant',
                    'Master advanced prompt engineering techniques'
                ],
                'button_text' => 'Explore Program',
                'button_style' => 'outline'
            ],
            [
                'id' => 'office-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Day to Day Office Work Using AI',
                'bullets' => [
                    'Reduce workload by 50% using AI',
                    'Master Microsoft & Google AI tools',
                    'Turn boring data into beautiful charts'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'job-hunt-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Job Hunting to Get 40% Salary Hike Using AI',
                'bullets' => [
                    'Create an irresistible resume with AI',
                    'Prepare for interviews like a pro',
                    'Negotiate salary using AI tools'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'side-hustle-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '5 Weeks',
                'title' => 'Build a Side Hustle Using AI',
                'bullets' => [
                    'Find profitable AI business ideas in minutes',
                    'Automate & scale your side hustle',
                    'Sell AI-generated content & products'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'research-ai',
                'category' => 'ai-mastery',
                'is_ai_mastery' => true,
                'duration' => '6 Weeks',
                'title' => 'AI-Powered Research & Report Writing',
                'bullets' => [
                    'Summarize research papers in seconds',
                    'Fast & accurate data collection',
                    'Turn raw data into insightful AI reports'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            // TECH PROGRAM
            [
                'id' => 'python-ai',
                'category' => 'tech',
                'duration' => '5 Weeks',
                'title' => 'Python with AI',
                'bullets' => [
                    'Master Python programming from scratch',
                    'Integrate AI capabilities into applications',
                    'Build smart applications and automate tasks'
                ],
                'button_text' => 'Explore Program',
                'button_style' => 'outline'
            ],
            [
                'id' => 'no-code-ai-tech',
                'category' => 'tech',
                'duration' => '6 Weeks',
                'title' => 'Coding Using AI – Build No-Code AI SaaS Applications',
                'bullets' => [
                    'Create AI-powered apps without writing code',
                    'Build chatbots & interactive dashboards',
                    'Deploy & scale AI SaaS products'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'agentic-ai-tech',
                'category' => 'tech',
                'duration' => '6 Weeks',
                'title' => 'AI Automation Workflow – Agentic AI',
                'bullets' => [
                    'Use AI agents to automate workflows',
                    'Workflow optimization & business efficiency',
                    'Automate tasks without coding'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            // DATA PROGRAM
            [
                'id' => 'data-science',
                'category' => 'data',
                'duration' => '6 Weeks',
                'title' => 'Data Science with AI',
                'bullets' => [
                    'Master DSA, System Design & Generative AI',
                    'Real-world projects & mock interviews',
                    '1:1 mentorship from MAANG engineers'
                ],
                'button_text' => 'Explore Program',
                'button_style' => 'outline'
            ],
            [
                'id' => 'advanced-data',
                'category' => 'data',
                'duration' => '6 Weeks',
                'title' => 'Advanced Data Analysis Program',
                'bullets' => [
                    'Comprehensive, industry-aligned curriculum',
                    'Hands-on, end-to-end project experience',
                    'Advanced analytics and AI-driven insights focus'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'sql-ai',
                'category' => 'data',
                'duration' => '5 Weeks',
                'title' => 'SQL Management with AI',
                'bullets' => [
                    'Master SQL queries and database management',
                    'Use AI to optimize database performance',
                    'Build data pipelines with AI assistance'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'no-code-ai-data',
                'category' => 'data',
                'duration' => '6 Weeks',
                'title' => 'Coding Using AI – Build No-Code AI SaaS Applications',
                'bullets' => [
                    'Create AI-powered apps without writing code',
                    'Build chatbots & interactive dashboards',
                    'Deploy & scale AI SaaS products'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
            [
                'id' => 'agentic-ai-data',
                'category' => 'data',
                'duration' => '6 Weeks',
                'title' => 'Agentic AI & Automation',
                'bullets' => [
                    'Use AI agents to automate workflows',
                    'Workflow optimization & business efficiency',
                    'Automate tasks without coding'
                ],
                'button_text' => 'Program Overview',
                'button_style' => 'filled'
            ],
        ],
        'hero_image' => $assetsurl . '/hero_student.png',
        'services' => [
            [
                'icon' => '<i class="fa-solid fa-palette"></i>',
                'title' => 'Website Design',
                'description' => 'Create stunning, user-centric designs that captive your audience and build brand identity.',
                'link_text' => 'View Designs <i class="fa-solid fa-arrow-right"></i>',
            ],
            [
                'icon' => '<i class="fa-solid fa-laptop-code"></i>',
                'title' => 'Website Development',
                'description' => 'Robust, scalable, and high-performance websites built with the latest technologies.',
                'link_text' => 'Explore Solutions <i class="fa-solid fa-arrow-right"></i>',
            ],
            [
                'icon' => '<i class="fa-solid fa-rocket"></i>',
                'title' => 'Digital Marketing',
                'description' => 'Drive traffic and convert leads with SEO, PPC, and Social Media strategies.',
                'link_text' => 'Grow Now <i class="fa-solid fa-arrow-right"></i>',
            ],
            [
                'icon' => '<i class="fa-solid fa-graduation-cap"></i>',
                'title' => 'LMS Solutions',
                'description' => 'Custom Learning Management Systems for schools, universities, and corporate training.',
                'link_text' => 'View LMS Features <i class="fa-solid fa-arrow-right"></i>',
            ],
            [
                'icon' => '<i class="fa-solid fa-cart-shopping"></i>',
                'title' => 'E-Commerce',
                'description' => 'Build powerful online stores that drive sales and provide seamless shopping experiences.',
                'link_text' => 'Start Selling <i class="fa-solid fa-arrow-right"></i>',
            ],
        ],
        'mentors' => [
            [
                'name' => 'Gautam Shukla',
                'role' => 'Full-Stack Developer | AI & Data Science Expert',
                'description' => 'Gautam brings deep experience in building scalable, production-ready applications and AI-driven solutions. His practical, project-driven teaching approach focuses on data modeling, transformation, and optimization.',
                'image' => $assetsurl . '/gautam.png'
            ],
            [
                'name' => 'Shashank Mathur',
                'role' => 'AI Solutions Lead | Agentic AI Specialist',
                'description' => 'Shashank is a seasoned technology expert with hands-on experience across full-stack development and Agentic AI. He leads our workshop curriculum on cutting-edge AI tools and automation workflows.',
                'image' => $assetsurl . '/shashank.png'
            ]
        ],
        'mentor_cta' => [
            'badge' => 'Teach your way',
            'title' => 'Inspire learners',
            'desc_1' => 'Join our community of expert instructors delivering world-class education.',
            'desc_2' => 'Share your knowledge and help shape the future of technology professionals.',
            'btn_text' => 'Become a instructor'
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
        ],
        'featured_courses' => [
            [
                'badge' => 'Trending <i class="fa-solid fa-fire"></i>',
                'badge_class' => 'hot',
                'icon' => '<i class="fa-solid fa-robot"></i>',
                'title' => 'ChatGPT & AI Tools Workshop',
                'description' => 'Get 10x better responses from AI. Master prompt engineering.',
                'rating' => '5.0',
            ],
            [
                'badge' => 'Bestseller',
                'badge_class' => '',
                'icon' => '<i class="fa-solid fa-chart-simple"></i>',
                'title' => 'Power BI Mastery',
                'description' => 'Transform data into actionable insights for business intelligence.',
                'rating' => '4.8',
            ],
            [
                'badge' => 'New',
                'badge_class' => 'new',
                'icon' => '<i class="fa-brands fa-python"></i>',
                'title' => 'Python with AI',
                'description' => 'Build smart applications and automate tasks with Python.',
                'rating' => '4.9',
            ],
        ],
        'stats' => [
            ['value' => '10+', 'label' => 'Clients'],
            ['value' => '500+', 'label' => 'Students Enrolled'],
            ['value' => '96%', 'label' => 'Success Rate'],
        ],
        'trusted_companies' => ['TCS', 'IBM', 'WIPRO', 'INFOSYS', 'HCL', 'TECH MAHINDRA'],
    ];
}
