<?php
header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['email']) && isset($_POST['lozinka'])) {

    $email = $_POST['email'];
    $lozinka = $_POST['lozinka'];
    echo login($email, $lozinka);

}
?>