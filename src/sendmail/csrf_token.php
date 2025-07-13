<?php

require_once 'bootstrap.php';

setupSession();

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

checkOrigin(ALLOWED_ORIGINS);
checkRequestMethod(['GET', 'OPTIONS']);

exitOnOptionRequest();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

exitWithResponse('csrf_token', 200, $_SESSION['csrf_token']);
