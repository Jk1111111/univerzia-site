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
 * Contact page data for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get contact page data
 */
function local_univerziaai_get_contact_data($assetsurl)
{
    global $DB, $PAGE;

    $message = '';
    $msgtype = '';

    // Handle Form Submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && required_param('action', PARAM_TEXT) === 'submit_contact') {
        $type = required_param('type', PARAM_ALPHA); // 'student' or 'client'
        $fullname = required_param('fullname', PARAM_TEXT);
        $email = required_param('email', PARAM_EMAIL);
        $phone = optional_param('phone', '', PARAM_TEXT);
        $msg_content = required_param('message', PARAM_TEXT);

        $data = new stdClass();
        $data->type = $type;
        $data->fullname = $fullname;
        $data->email = $email;
        $data->phone = $phone;
        $data->message = $msg_content;
        $data->timecreated = time();

        $details = [];

        if ($type === 'student') {
            $data->subject = optional_param('learn_interest', '', PARAM_TEXT);
            $details['status'] = optional_param('status', '', PARAM_TEXT);
        } else {
            $data->subject = optional_param('service_required', '', PARAM_TEXT);
            $details['company'] = optional_param('company', '', PARAM_TEXT);
            $details['budget'] = optional_param('budget', '', PARAM_TEXT);
        }

        $data->details = json_encode($details);

        if ($DB->insert_record('local_univerziaai_contact', $data)) {
            $message = 'Thank you! Your message has been sent successfully.';
            $msgtype = 'success';
        } else {
            $message = 'Error sending message. Please try again.';
            $msgtype = 'error';
        }
    }

    return [
        'pagetitle' => 'Contact UniverziaAI | Get in Touch for AI & LMS Solutions',
        'metadescription' => 'Contact UniverziaAI for AI-powered LMS development, website design, digital marketing, and AI training workshops. Based in Varanasi, India.',
        'canonical' => $GLOBALS['CFG']->wwwroot . '/local/univerziaai/page.php?p=contact',
        'og_image' => $assetsurl . '/hero_student.png',
        'pagestyle' => '',
        'form_message' => $message,
        'form_success' => ($msgtype === 'success'),
        'form_error' => ($msgtype === 'error'),
        'extrajs' => '
            const mobileToggle = document.getElementById("mobileToggle");
            const navMenu = document.getElementById("navMenu");
            if (mobileToggle) {
                mobileToggle.addEventListener("click", () => {
                    navMenu.classList.toggle("active");
                    mobileToggle.classList.toggle("active");
                });
            }
            
            // Tab Toggle Logic
            // Tab Toggle Logic
            const studentForm = document.getElementById("student-fields");
            const clientForm = document.getElementById("client-fields");
            const typeInput = document.getElementById("form_type_input");

            function toggleForm(type) {
                typeInput.value = type;
                if (type === "student") {
                    studentForm.style.display = "block";
                    clientForm.style.display = "none";
                    document.getElementById("tab-student").classList.add("active");
                    document.getElementById("tab-client").classList.remove("active");
                } else {
                    studentForm.style.display = "none";
                    clientForm.style.display = "block";
                    document.getElementById("tab-student").classList.remove("active");
                    document.getElementById("tab-client").classList.add("active");
                }
            }

            document.getElementById("tab-student").addEventListener("click", () => toggleForm("student"));
            document.getElementById("tab-client").addEventListener("click", () => toggleForm("client"));

            // Initialize
            toggleForm("student");

        ',
        'contact_info' => [
            'email' => 'gautam.shukla@univerziaai.in',
            'phone' => '+91 9511016762',
            'phone_hours' => 'Mon-Sat, 9 AM - 6 PM IST',
            'address_line1' => '1A/50 Awas Vikas Colony, Daulatpur, Pandeypur',
            'address_line2' => 'Varanasi – 221002',
            'address_line3' => 'Uttar Pradesh, India',
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
        'student_interests' => [
            ['value' => 'Python/AI', 'label' => 'Python with AI'],
            ['value' => 'Data Science', 'label' => 'Data Science Mastery'],
            ['value' => 'Web Dev', 'label' => 'Full Stack Web Dev'],
            ['value' => 'Digital Marketing', 'label' => 'Digital Marketing'],
            ['value' => 'Other', 'label' => 'Other']
        ],
        'client_services' => [
            ['value' => 'Website Design', 'label' => 'Website Design'],
            ['value' => 'Web Development', 'label' => 'Custom Web Development'],
            ['value' => 'LMS', 'label' => 'LMS & E-Learning'],
            ['value' => 'E-Commerce', 'label' => 'E-Commerce Store'],
            ['value' => 'SEO/Marketing', 'label' => 'SEO & Digital Marketing']
        ],
        'faq_items' => [
            [
                'question' => 'How do I enroll in a workshop?',
                'answer' => 'Simply browse our courses page, select the workshop you\'re interested in, and click "Enroll Now". You\'ll be guided through a simple registration process.',
            ],
            [
                'question' => 'Do you provide invoices for services?',
                'answer' => 'Yes, for all our client services (Web Dev, LMS, etc.), we provide proper GST invoices and contracts.',
            ],
            [
                'question' => 'What is the typical timeline for a website?',
                'answer' => 'A standard business website typically takes 2-4 weeks. Complex custom web applications or LMS platforms may take 6-12 weeks depending on requirements.',
            ],
        ],
    ];
}
