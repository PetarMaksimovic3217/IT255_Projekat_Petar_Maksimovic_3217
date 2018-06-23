<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');

include("korpaservice.php");

if (isset($_SERVER['HTTP_TOKEN']) && isset($_POST['id_broda']) && isset($_POST['period_id'])) {
    $token = $_SERVER['HTTP_TOKEN'];
    $id_broda = $_POST['id_broda'];
    $period = $_POST['period_id'];
    echo updateOrder($token, $id_broda, $period);
}


?>