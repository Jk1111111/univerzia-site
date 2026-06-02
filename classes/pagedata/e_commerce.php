<?php
// E-Commerce page data
defined('MOODLE_INTERNAL') || die();

function local_univerziaai_get_e_commerce_data($assetsurl)
{
    return [
        'pagetitle' => 'E-Commerce Development | Online Store Solutions - UniverziaAI',
        'metadescription' => 'E-commerce website development by UniverziaAI. Build your online store with payment integration, inventory management, and scalable architecture.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=e_commerce',
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
        'hero_title' => 'E-Commerce Development',
        'hero_subtitle' => 'E-commerce has become an integral part of modern business. With the increasing popularity of online shopping, it has become essential for businesses to have an online presence to reach out to their customers. UniverziaAi offers comprehensive e-commerce website development services to help businesses establish a strong online presence.',
        'hero_image' => $assetsurl . '/ecommerce.jpg', // Placeholder
        'process_intro' => 'We follow the Agile Methodology for our Design and Development Processes. We do process driven project execution so that we can help businesses to establish a strong online presence and reach out to their customers. It involves requirement gathering, Project documentation, project planning etc. to deliver a flawless project in decided timelines.',
        'process_steps' => [
            ['icon' => '<i class="fa-solid fa-list-check"></i>', 'title' => 'Requirement Gathering', 'description' => 'During the requirement gathering stage of website development, our team works closely with the client to understand their unique needs and goals. We identify the website’s purpose, target audience, and functionality requirements to create a detailed plan for the project. This collaborative process ensures that the final product meets the client’s specific needs and expectations. After this we create a development roadmap.'],
            ['icon' => '<i class="fa-solid fa-magnifying-glass-chart"></i>', 'title' => 'Research and Planning', 'description' => 'In the research and planning stage of website development, we conduct a thorough analysis of the client’s industry, competitors, and target audience. This information is used to inform the website’s design, functionality, and content strategy. By taking a strategic approach to website development, we create websites that are tailored to the client’s specific needs and designed to achieve their goals.'],
            ['icon' => '<i class="fa-solid fa-pen-ruler"></i>', 'title' => 'Wireframe Designing', 'description' => 'During the wireframe designing stage of website development, we create a visual representation of the website’s layout and functionality. This allows the client to see the website’s structure and provide feedback on the design. By creating a wireframe, we can make revisions and adjustments to the website’s design before moving on to the development stage, ensuring that the final product meets the client’s expectations.'],
            ['icon' => '<i class="fa-solid fa-code"></i>', 'title' => 'Website Development', 'description' => 'During the website development stage, our team of experienced professionals uses the latest technologies and industry trends to build a fully functional website. We ensure that the website is optimized for speed, security, and ease of use. Throughout the development process, we remain in close communication with the client to ensure that the website meets their specific requirements and goals.'],
            ['icon' => '<i class="fa-solid fa-file-pen"></i>', 'title' => 'Content Creation', 'description' => 'In the content creation stage of website development, our team creates high-quality, engaging content that is tailored to the client’s specific needs and goals. We ensure that the content is optimized for search engines and aligned with the client’s branding and messaging. By taking a strategic approach to content creation, we help our clients to create a strong online presence and connect with their target audience.'],
            ['icon' => '<i class="fa-solid fa-bug-slash"></i>', 'title' => 'Testing', 'description' => 'During the testing stage of website development, we thoroughly evaluate the website’s functionality, usability, and performance. Our team performs rigorous testing to ensure that the website is optimised for speed, security, and compatibility with various devices and browsers. With testing, we ensure that the final product is of the highest quality and meets the client’s expectations.'],
        ],
        'ecommerce_types_intro' => 'At UniverziaAi we do need basis development which is based on the client\'s requirement. We do development on different technology and platforms.',
        'ecommerce_types' => [
            ['icon' => '<i class="fa-solid fa-file-code"></i>', 'title' => 'Static Website', 'description' => 'Static website development involves creating a simple, fixed website design that displays the same content to all visitors. These websites are built using HTML, CSS, and JavaScript, and do not feature dynamic content. The development process typically involves designing and coding individual pages using these languages, with a focus on creating an easy-to-navigate site that presents information clearly and concisely.<br><br>Static websites are typically faster and less expensive to design and develop.'],
            ['icon' => '<i class="fa-solid fa-gears"></i>', 'title' => 'Dynamic Website', 'description' => 'Dynamic website development involves creating a website that features dynamic content, such as user accounts or databases. The development process for dynamic websites is typically more complex and time-consuming than static websites, as they require the use of backend technologies and scripting languages.<br><br>Dynamic websites are ideal for businesses or that require frequent updates, e-commerce functionality, or user interaction, as they allow for personalised content and interactive features.'],
            ['icon' => '<i class="fa-solid fa-building"></i>', 'title' => 'Corporate Websites', 'description' => 'Corporate websites are designed to represent the brand and values of a business or organisation. These websites often feature a clean and professional design, with a focus on showcasing products, services, and company information.<br><br>The development process for corporate websites may include advanced functionality such as user accounts, e-commerce capabilities, and search engine optimisation to increase visibility and reach a wider audience.'],
            ['icon' => '<i class="fa-solid fa-cart-shopping"></i>', 'title' => 'E-Commerce Websites', 'description' => 'E-commerce websites are designed for businesses to sell products or services online. These websites feature advanced functionality such as shopping carts, payment gateways, and order tracking systems.<br><br>The development process for e-commerce websites typically includes creating a user-friendly interface, optimising for search engines, and ensuring the security of online transactions.'],
            ['icon' => '<i class="fa-regular fa-lightbulb"></i>', 'title' => 'Idea Based Website', 'description' => 'Idea-based websites are created to showcase a specific idea, concept, or message. These websites are often designed with a unique and creative layout, and may feature interactive elements to engage visitors.<br><br>The development process for idea-based websites typically involves a strong focus on visual design and user experience, and may include custom functionality to bring the idea to life.'],
            ['icon' => '<i class="fa-solid fa-globe"></i>', 'title' => 'Web Portals', 'description' => 'Web portals are designed to provide users with a single point of access to a variety of information and resources. These websites often feature personalised content, user accounts, and social networking capabilities.<br><br>The development process for web portals involves integrating a variety of information sources and creating a flexible and scalable platform to support a large user base.'],
        ],
        'faq_items' => [
            ['question' => 'How Long Does It Take To Design And Develop An E-Commerce Website', 'answer' => '<p>The timeline for designing and developing an e-commerce website depends on its complexity, the number of products, and the specific features required. A basic store might take 4-6 weeks, while a more complex custom solution could take several months.</p>'],
            ['question' => 'Do You Work On Readymade Themes Or Custom Designs', 'answer' => '<p>We work with both. We can customize readymade themes for faster deployment and lower cost, or create a completely custom design from scratch to perfectly match your unique brand identity and specific functional requirements.</p>'],
            ['question' => 'How Much Experience UniverziaAi Has In E-Commerce', 'answer' => '<p>UniverziaAi has extensive experience in e-commerce development, having delivered numerous successful projects across various platforms like WooCommerce, Shopify, and Magento. Our team understands the nuances of online selling, payment integration, and user experience optimization.</p>'],
        ],
        'admission_form_options' => [
            'academic' => [
                'AI Tools Workshop',
                'AI Mastery Workshop',
                'Prompt Engineering Mastery',
                'Custom Corporate Training',
            ],
            'services' => [
                'Website Design',
                'Website Development',
                'E-Commerce Development',
                'Digital Marketing',
                'SEO Optimization',
                'App Development',
            ]
        ]
    ];
}
