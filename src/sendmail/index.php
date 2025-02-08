<?php

$nameRegex = "/^[A-Za-z .'-]+$/";
$emailRegex = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";

if (!test_request()) {
  $response = get_email_send_request_response('detail', 405, 'Access forbidden.');
  echo $response;
  exit();
}

$name = test_input($_POST["name"]);
$email = test_input($_POST["email"]);
$message = test_input($_POST["message"]);

if (empty($name) || empty($email) || empty($message)) {
  $response = get_email_send_request_response('detail', 400, 'All fields are required.');
  echo $response;
  exit();
}

if (!test_regex($name, $nameRegex)) {
  $response = get_email_send_request_response('detail', 400, 'Invalid name');
  echo $response;
  exit();
}

if (!test_regex($email, $emailRegex)) {
  $response = get_email_send_request_response('detail', 400, 'Invalid email');
  echo $response;
  exit();
}

$to = 'contact@mihai-andrei-neacsu.de';
$subject = 'New message from ' . $name;
$body = "Name: $name\n\nEmail: $email\n\Message:\n$message";
$headers = "From: $email";

if (!mail($to, $subject, $body, $headers)) {
  $response = get_email_send_request_response('detail', 400, 'An error occurred while sending the message.');
  echo $response;
  exit();
}

$response = get_email_send_request_response('detail', 200, 'The message was successfully sent.');
echo $response;
exit();

function test_input(string $data): string
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function test_regex(string $data, string $regex): int|false
{
  return preg_match($regex, $data);
}

function test_request(): bool
{
  return $_SERVER['REQUEST_METHOD'] === 'POST';
}

function get_email_send_request_response(string $type, int $code, string $message): string
{
  $response = array($type => $message);
  http_response_code($code);
  return json_encode($response);
}
