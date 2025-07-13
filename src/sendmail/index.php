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

checkLastRequestTime();
validateCsrfToken($csrfToken);
validateCaptcha($securityCode);
validatePayload($name, $email, $message);
sendEmail($name, $email, $message);
