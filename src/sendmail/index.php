<?php

require_once 'bootstrap.php';

setupSession();

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
$csrfToken = $_POST['csrf_token'] ?? '';

validateCsrfToken($csrfToken);
validatePayload($name, $email, $message);
checkLastRequestTime();
validateCaptcha($securityCode);
// TODO fix reset captcha logic
sendEmail($name, $email, $message);
