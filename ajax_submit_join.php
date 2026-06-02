<?php
define('AJAX_SCRIPT', true);

require_once('../../config.php');

// Define global variables
global $DB;

// Initialize JSON response
$response = ['success' => false, 'message' => ''];

try {
    // Check if it's a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method.');
    }

    // Get and sanitize input parameters
    $fullname = required_param('name', PARAM_TEXT);
    $email = required_param('email', PARAM_EMAIL);
    $phone = required_param('phone', PARAM_TEXT);
    $program = required_param('program', PARAM_TEXT);

    // Basic Validation
    if (empty($fullname) || empty($email) || empty($phone) || empty($program)) {
        throw new Exception('Please fill in all required fields.');
    }

    if (!validate_email($email)) {
        throw new Exception('Invalid email address.');
    }

    // Split name into first and last name
    $parts = explode(' ', $fullname, 2);
    $firstname = $parts[0];
    $lastname = isset($parts[1]) ? $parts[1] : '';

    // Prepare data for insertion
    $data = new stdClass();
    $data->type = 'join_now'; // Type for this specific form
    $data->firstname = $firstname;
    $data->lastname = $lastname;
    $data->fullname = $fullname;
    $data->email = $email;
    $data->phone = $phone;
    $data->course_or_service = $program;
    $data->subject = 'Join Now Inquiry: ' . $program;
    $data->message = 'User requested to join program: ' . $program; // Required field
    $data->timecreated = time();

    // Insert into database
    if ($DB->insert_record('local_univerziaai_contact', $data)) {
        $response['success'] = true;
        $response['message'] = 'Application submitted successfully!';
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
