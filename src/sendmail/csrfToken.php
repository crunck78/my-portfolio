<?php

require_once 'bootstrap.php';

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

checkOrigin(ALLOWED_ORIGINS);
checkRequestMethod(['GET', 'OPTIONS']);

exitOnOptionRequest();

if (empty($_SESSION['csrfToken'])) {
    $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
}

exitWithResponse('csrfToken', 200, $_SESSION['csrfToken']);
