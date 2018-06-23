<?php

header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['ime']) && isset($_POST['prezime']) && isset($_POST['adresa']) && isset($_POST['email']) && isset($_POST['lozinka'])) {

    $ime = $_POST['ime'];
    $prezime = $_POST['prezime'];
    $adresa = $_POST['adresa'];
    $email = $_POST['email'];
    $lozinka = $_POST['lozinka'];

    echo register($ime, $prezime, $adresa, $email, $lozinka);

}

?>