<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // preluare date din formular
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // validare date
    if (empty($name) || empty($email) || empty($message)) {
        die('All fields are required.');
    }

    // construire message de email
    $to = 'contact@mihai-andrei-neacsu.de';
    $subject = 'Mesaj nou de la ' . $name;
    $body = "Nume: $name\n\nEmail: $email\n\nMesaj:\n$message";

    // trimitere email
    if (mail($to, $subject, $body)) {
        echo 'The message was successfully sent.';
    } else {
        echo 'An error occurred while sending the message. Please try again later.';
    }

} else {
    die('Access forbidden.');
}

?>