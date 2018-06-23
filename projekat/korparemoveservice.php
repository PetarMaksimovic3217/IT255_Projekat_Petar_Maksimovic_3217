<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');

include("korpaservice.php");


if (isset($_SERVER['HTTP_TOKEN']) && isset($_POST['id_broda'])) {
    $token = $_SERVER['HTTP_TOKEN'];
    $id_broda = $_POST['id_broda'];
    echo removeOrder($token, $id_broda);
}

?>