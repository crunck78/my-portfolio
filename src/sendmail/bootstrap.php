<?php

require '../vendor/autoload.php';

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    // Handle the case where the .env file is not found
    // For example, log the error or set default values
    error_log('Warning: .env file not found. Falling back to default environment variables.');
}

// Include configuration
require 'config.php';
require 'constants.php';
require 'functions.php';

setupSession();
