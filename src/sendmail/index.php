<?php

require_once 'bootstrap.php';

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

checkOrigin(ALLOWED_ORIGINS);
checkRequestMethod(['POST', 'OPTIONS']);
checkContentType('multipart/form-data');

exitOnOptionRequest();

$name = sanitizeInput(getStringParam('name'));
$email = sanitizeInput(getStringParam('email'));
$message = sanitizeInput(getStringParam('message'));
$securityCode = getStringParam('securityCode');
$csrfToken = getStringParam('csrfToken');

validateCsrfToken($csrfToken);
validateCaptcha($securityCode);
validatePayload($name, $email, $message);
// Rate-limit only requests that passed validation, so a rejected
// attempt (e.g. expired session) does not lock the user into a cooldown.
checkLastRequestTime();
sendEmail($name, $email, $message);
