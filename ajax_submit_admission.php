<?php
define('AJAX_SCRIPT', true);

require_once('../../config.php');

// Define global variables
global $DB, $CFG;

// Initialize JSON response
$response = ['success' => false, 'message' => ''];

try {
    // Check if it's a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method.');
    }

    // Get and sanitize input parameters
    $firstname = required_param('firstname', PARAM_TEXT);
    $lastname = required_param('lastname', PARAM_TEXT);
    $email = required_param('email', PARAM_EMAIL);
    $phone = optional_param('phone', '', PARAM_TEXT);
    $country = optional_param('country', '', PARAM_TEXT);
    $department = required_param('department', PARAM_TEXT); // 'Academic' or 'Services'
    $course_or_service = required_param('course_service', PARAM_TEXT);
    $message_content = optional_param('message', '', PARAM_TEXT);

    // Basic Validation
    if (empty($firstname) || empty($lastname) || empty($email) || empty($department) || empty($course_or_service)) {
        throw new Exception('Please fill in all required fields.');
    }

    if (!validate_email($email)) {
        throw new Exception('Invalid email address.');
    }

    // Prepare data for insertion
    $data = new stdClass();
    $data->type = 'admission'; // Distinct type for admission/registration
    $data->firstname = $firstname;
    $data->lastname = $lastname;
    $data->fullname = $firstname . ' ' . $lastname;
    $data->email = $email;
    $data->phone = $phone;
    $data->country = $country;
    $data->department = $department;
    $data->course_or_service = $course_or_service;
    $data->subject = $department . ' Inquiry: ' . $course_or_service;
    $data->message = $message_content;
    $data->timecreated = time();

    // Insert into database
    if ($DB->insert_record('local_univerziaai_contact', $data)) {
        $response['success'] = true;
        $response['message'] = 'Application submitted successfully! We will contact you soon.';
    } else {
        throw new Exception('Database error: Unable to save application.');
    }

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;
