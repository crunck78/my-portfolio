<?php

$logDirectory = $_ENV['ERROR_LOG'];
$year = date('Y');
$biweek = ceil(date('z') / 14);
$logFileName = "errorlog{$year}{$biweek}.txt";

ini_set('log_errors', 'On');
ini_set('error_log', "{$logDirectory}{$logFileName}");
error_reporting(E_ALL & ~E_DEPRECATED);
ini_set('display_errors', 'Off');
ini_set('display_startup_errors', 'Off');
