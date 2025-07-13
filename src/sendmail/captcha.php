<?php

require_once 'bootstrap.php';

setupSession();
unset($_SESSION['captcha_spam']);

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: image/png');

checkOrigin(ALLOWED_ORIGINS);
checkRequestMethod(['GET', 'OPTIONS']);

$text = randomString(5);  //The number defines the amount of digits
$_SESSION['captcha_spam'] = $text;

$img = ImageCreateFromPNG('captcha.PNG'); //Background image
$color = ImageColorAllocate($img, 0, 0, 0); //Color
$ttf = "./XFILES.TTF"; //Font
$ttfsize = 25; //Font size
$angle = rand(0, 5);
$t_x = rand(5, 30);
$t_y = 35;
imagettftext($img, $ttfsize, $angle, $t_x, $t_y, $color, $ttf, $text);
imagepng($img);
imagedestroy($img);
