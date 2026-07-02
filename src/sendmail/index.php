<?php

require_once 'bootstrap.php';

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

checkOrigin(ALLOWED_ORIGINS);
checkRequestMethod(['POST', 'OPTIONS']);
checkContentType('multipart/form-data');

exitOnOptionRequest();

$name = sanitizeInput($_POST["name"] ?? '');
$email = sanitizeInput($_POST["email"] ?? '');
$message = sanitizeInput($_POST["message"] ?? '');
$securityCode = $_POST["securityCode"] ?? '';
$csrfToken = $_POST['csrfToken'] ?? '';

validateCsrfToken($csrfToken);
validateCaptcha($securityCode);
validatePayload($name, $email, $message);
// Rate-limit only requests that passed validation, so a rejected
// attempt (e.g. expired session) does not lock the user into a cooldown.
checkLastRequestTime();
sendEmail($name, $email, $message);
