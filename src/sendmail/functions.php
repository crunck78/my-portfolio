<?php

function randomString($len)
{
    srand(date("s"));
   //The $possible string contains all characters, which should be used
    $possible = "ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    $str = "";
    while (strlen($str) < $len) {
        $str .= substr($possible, (rand() % (strlen($possible))), 1);
    }
       return($str);
}

function checkOrigin(array $allowedOrigins)
{
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        $origin = $_SERVER['HTTP_ORIGIN'];

        if (!in_array($origin, $allowedOrigins)) {
            exitWithResponse('detail', 403, 'Forbidden.');
        }
        header("Access-Control-Allow-Origin: $origin");
    }
}

function checkRequestMethod(array $allowedMethods)
{
    if (!in_array($_SERVER['REQUEST_METHOD'], $allowedMethods)) {
        exitWithResponse('detail', 405, 'Not Allowed.');
    }
}

function checkContentType(string $contentType)
{
  // Ensure the request content type is multipart/form-data
    if (!isset($_SERVER['CONTENT_TYPE']) || strpos($_SERVER['CONTENT_TYPE'], $contentType) !== 0) {
        exitWithResponse('detail', 400, 'Invalid content type.');
    }
}

function exitOnOptionRequest()
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
}

function setupSession()
{
    session_set_cookie_params([
    'samesite' => 'Strict',
    'secure' => true,
    'httponly' => true
    ]);

    session_start();
}

function checkLastRequestTime()
{
    $cooldownPeriod = 10; // seconds
    $currentTime = time();

    // Check if the last request time is set in the session
    if (isset($_SESSION['lastRequestTime'])) {
        $lastRequestTime = $_SESSION['lastRequestTime'];

        // Calculate the time since the last request
        $timeSinceLastRequest = $currentTime - $lastRequestTime;

        // Check if the cooldown period has passed
        if ($timeSinceLastRequest < $cooldownPeriod) {
            // Cooldown period not yet passed
            $remainingTime = $cooldownPeriod - $timeSinceLastRequest;
            exitWithResponse('detail', 429, "Please wait $remainingTime seconds before trying again.");
        }
    }

    // Cooldown period has passed, or this is the first request
    // Update the last request time
    $_SESSION['lastRequestTime'] = $currentTime;
}

function validateCsrfToken(string $csrfClientToken)
{

    $csrfSessionToken = $_SESSION['csrfToken'] ?? null;

    if (!$csrfSessionToken || !hash_equals($csrfSessionToken, $csrfClientToken)) {
        exitWithResponse('detail', 403, 'Invalid CSRF token.');
    }
}

function validateCaptcha($securityCode)
{
    $sessionCaptchaSpam = $_SESSION['securityCode'] ?? null;
    if (!$sessionCaptchaSpam || $securityCode !== $sessionCaptchaSpam) {
         exitWithResponse('detail', 400, 'Wrong Security code');
    }

    unset($_SESSION['securityCode']);
}

function sanitizeInput(string $data): string
{
    $data = trim($data);
    $data = preg_replace('/\s+/', ' ', $data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validatePayload(string $name, string $email, string $message)
{
    $nameMaxLength = 50;
    $emailMaxLength = 50;
    $messageMaxLength = 1500;

    if (empty($name) || empty($email) || empty($message)) {
        exitWithResponse('detail', 400, 'All fields are required.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exitWithResponse('detail', 400, 'Invalid email.');
    }

    if (strlen($name) > $nameMaxLength) {
        exitWithResponse('detail', 400, 'Name exceeds maximum length.');
    }

    if (strlen($email) > $emailMaxLength) {
        exitWithResponse('detail', 400, 'Email exceeds maximum length.');
    }

    if (strlen($message) > $messageMaxLength) {
        exitWithResponse('detail', 400, 'Message exceeds maximum length.');
    }
}

function sendEmail(string $name, string $email, string $message)
{
    $subject = "[Contact Form] New message";

    $body = sprintf(
        "Name: %s\nEmail: %s\nMessage:\n%s",
        $name,
        $email,
        $message,
    );

    $headersString = sprintf(
        "From: %s\r\nReply-To: %s\r\nContent-Type: text/plain; charset=utf-8\r\n",
        FROM_EMAIL,
        $email
    );

    if (!mail(TO_EMAIL, $subject, $body, $headersString)) {
        exitWithResponse('detail', 500, 'An error occurred while sending the message.');
    }

    exitWithResponse('detail', 200, 'The message was successfully sent.');
}

function generateResponse(string $type, int $code, string $message): bool|string
{
    $response = array($type => $message);
    http_response_code($code);
    return json_encode($response);
}

function exitWithResponse(string $type, int $code, string $message)
{
    $response = generateResponse($type, $code, $message);
    echo $response;
    exit;
}
