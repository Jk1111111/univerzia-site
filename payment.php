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
 * Payment handler for Razorpay integration
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../config.php');

// Razorpay API credentials (Test Mode)
define('RAZORPAY_KEY_ID', 'rzp_test_SCBOT0Gy9Xc1lS');
define('RAZORPAY_KEY_SECRET', 'NN6Vi8tIazvB1wHPimx3oay4');

// Set headers for JSON response
header('Content-Type: application/json');

// Get the action
$action = required_param('action', PARAM_ALPHA);

try {
    switch ($action) {
        case 'createorder':
            create_razorpay_order();
            break;
        case 'verifypayment':
            verify_razorpay_payment();
            break;
        default:
            throw new Exception('Invalid action');
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Create a Razorpay order and save registration
 */
function create_razorpay_order()
{
    global $DB;

    // Get user details from POST
    $firstname = required_param('firstname', PARAM_TEXT);
    $lastname = required_param('lastname', PARAM_TEXT);
    $email = required_param('email', PARAM_EMAIL);
    $phone = required_param('phone', PARAM_TEXT);
    $address = optional_param('address', '', PARAM_TEXT);
    $workshop_type = optional_param('workshop_type', 'ai_workshop', PARAM_ALPHANUMEXT);
    $amount = optional_param('amount', 9, PARAM_INT); // Default ₹9

    // Amount in paise (Razorpay uses smallest currency unit)
    $amount_paise = $amount * 100;

    // Create Razorpay order using cURL
    $order_data = [
        'amount' => $amount_paise,
        'currency' => 'INR',
        'receipt' => 'workshop_' . time(),
        'notes' => [
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'workshop_type' => $workshop_type
        ]
    ];

    $ch = curl_init('https://api.razorpay.com/v1/orders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200) {
        throw new Exception('Failed to create Razorpay order: ' . $response);
    }

    $order = json_decode($response, true);

    if (empty($order['id'])) {
        throw new Exception('Invalid Razorpay order response');
    }

    // Save registration to database
    $now = time();
    $registration = new stdClass();
    $registration->firstname = $firstname;
    $registration->lastname = $lastname;
    $registration->email = $email;
    $registration->phone = $phone;
    $registration->address = $address;
    $registration->workshop_type = $workshop_type;
    $registration->amount = $amount;
    $registration->currency = 'INR';
    $registration->status = 'pending';
    $registration->razorpay_order_id = $order['id'];
    $registration->timecreated = $now;
    $registration->timemodified = $now;

    $registration->id = $DB->insert_record('local_univerziaai_registrations', $registration);

    // Return order details for frontend
    echo json_encode([
        'success' => true,
        'order_id' => $order['id'],
        'registration_id' => $registration->id,
        'amount' => $amount_paise,
        'currency' => 'INR',
        'key_id' => RAZORPAY_KEY_ID,
        'prefill' => [
            'name' => $firstname . ' ' . $lastname,
            'email' => $email,
            'contact' => $phone
        ]
    ]);
}

/**
 * Verify Razorpay payment signature and update registration
 */
function verify_razorpay_payment()
{
    global $DB;

    $razorpay_order_id = required_param('razorpay_order_id', PARAM_TEXT);
    $razorpay_payment_id = required_param('razorpay_payment_id', PARAM_TEXT);
    $razorpay_signature = required_param('razorpay_signature', PARAM_TEXT);
    $registration_id = required_param('registration_id', PARAM_INT);

    // Verify signature
    $expected_signature = hash_hmac(
        'sha256',
        $razorpay_order_id . '|' . $razorpay_payment_id,
        RAZORPAY_KEY_SECRET
    );

    if ($expected_signature !== $razorpay_signature) {
        // Update status to failed
        $DB->set_field('local_univerziaai_registrations', 'status', 'failed', ['id' => $registration_id]);
        throw new Exception('Payment verification failed: Invalid signature');
    }

    // Update registration with payment details
    $registration = $DB->get_record('local_univerziaai_registrations', ['id' => $registration_id]);

    if (!$registration) {
        throw new Exception('Registration not found');
    }

    $registration->razorpay_payment_id = $razorpay_payment_id;
    $registration->razorpay_signature = $razorpay_signature;
    $registration->status = 'paid';
    $registration->timemodified = time();

    $DB->update_record('local_univerziaai_registrations', $registration);

    echo json_encode([
        'success' => true,
        'message' => 'Payment verified successfully',
        'registration' => [
            'id' => $registration->id,
            'name' => $registration->firstname . ' ' . $registration->lastname,
            'email' => $registration->email,
            'status' => 'paid'
        ]
    ]);
}
