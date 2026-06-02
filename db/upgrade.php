<?php
defined('MOODLE_INTERNAL') || die();

/**
 * Upgrade function for local_univerziaai
 *
 * @param int $oldversion the version we are upgrading from
 * @return bool result
 */
function xmldb_local_univerziaai_upgrade($oldversion)
{
    global $DB;

    $dbman = $DB->get_manager();

    if ($oldversion < 2026020402) {
        // Define table local_univerziaai_contact to be created.
        $table = new xmldb_table('local_univerziaai_contact');

        // Adding fields to table local_univerziaai_contact.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('type', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, 'student');
        $table->add_field('fullname', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('email', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('phone', XMLDB_TYPE_CHAR, '50', null, null, null, null);
        $table->add_field('subject', XMLDB_TYPE_CHAR, '255', null, null, null, null);
        $table->add_field('details', XMLDB_TYPE_TEXT, null, null, null, null, null);
        $table->add_field('message', XMLDB_TYPE_TEXT, null, null, XMLDB_NOTNULL, null, null);
        $table->add_field('timecreated', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);

        // Adding keys to table local_univerziaai_contact.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);

        // Conditionally launch create table for local_univerziaai_contact.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // Univerziaai savepoint reached.
        upgrade_plugin_savepoint(true, 2026020402, 'local', 'univerziaai');
    }

    if ($oldversion < 2026020403) {
        // Define table local_univerziaai_registrations to be created.
        $table = new xmldb_table('local_univerziaai_registrations');

        // Adding fields to table local_univerziaai_registrations.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('firstname', XMLDB_TYPE_CHAR, '100', null, XMLDB_NOTNULL, null, null);
        $table->add_field('lastname', XMLDB_TYPE_CHAR, '100', null, XMLDB_NOTNULL, null, null);
        $table->add_field('email', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('phone', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, null);
        $table->add_field('address', XMLDB_TYPE_TEXT, null, null, null, null, null);
        $table->add_field('workshop_type', XMLDB_TYPE_CHAR, '50', null, XMLDB_NOTNULL, null, 'ai_workshop');
        $table->add_field('amount', XMLDB_TYPE_NUMBER, '10,2', null, XMLDB_NOTNULL, null, null);
        $table->add_field('currency', XMLDB_TYPE_CHAR, '10', null, XMLDB_NOTNULL, null, 'INR');
        $table->add_field('status', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, 'pending');
        $table->add_field('razorpay_order_id', XMLDB_TYPE_CHAR, '100', null, null, null, null);
        $table->add_field('razorpay_payment_id', XMLDB_TYPE_CHAR, '100', null, null, null, null);
        $table->add_field('razorpay_signature', XMLDB_TYPE_CHAR, '255', null, null, null, null);
        $table->add_field('timecreated', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
        $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);

        // Adding keys to table local_univerziaai_registrations.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);

        // Adding indexes to table local_univerziaai_registrations.
        $table->add_index('email_idx', XMLDB_INDEX_NOTUNIQUE, ['email']);
        $table->add_index('status_idx', XMLDB_INDEX_NOTUNIQUE, ['status']);

        // Conditionally launch create table for local_univerziaai_registrations.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // Univerziaai savepoint reached.
        upgrade_plugin_savepoint(true, 2026020403, 'local', 'univerziaai');
    }

    if ($oldversion < 2026020404) {
        // Define table local_univerziaai_contact to be modified.
        $table = new xmldb_table('local_univerziaai_contact');

        // Adding fields to table local_univerziaai_contact.
        $field = new xmldb_field('firstname', XMLDB_TYPE_CHAR, '100', null, null, null, null, 'fullname');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $field = new xmldb_field('lastname', XMLDB_TYPE_CHAR, '100', null, null, null, null, 'firstname');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $field = new xmldb_field('country', XMLDB_TYPE_CHAR, '100', null, null, null, null, 'phone');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $field = new xmldb_field('department', XMLDB_TYPE_CHAR, '50', null, null, null, null, 'country');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $field = new xmldb_field('course_or_service', XMLDB_TYPE_CHAR, '100', null, null, null, null, 'department');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        // Univerziaai savepoint reached.
        upgrade_plugin_savepoint(true, 2026020404, 'local', 'univerziaai');
    }

    return true;
}
