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
 * Page handler for local_univerziaai
 *
 * @package    local_univerziaai
 * @copyright  2026 UniverziaAi
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once('../../config.php');
require_once($CFG->dirroot . '/local/univerziaai/lib.php');

// Get the page parameter
$page = optional_param('p', 'home', PARAM_ALPHANUMEXT);

// Valid pages
$validpages = [
    'home',
    'about',
    'contact',
    'services',
    'courses',
    'ai_workshops',
    'website_design',
    'website_development',
    'lms',
    'e_commerce',
    'digital_marketing',
    'privacy_policy',
    'terms',
    'ai_mastery_workshop'
];

// Validate page
if (!in_array($page, $validpages)) {
    $page = 'home';
}

// Render the page
local_univerziaai_render_page($page);
