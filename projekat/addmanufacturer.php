<?php


header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['naziv'])) {


    
    $naziv = $_POST['naziv'];
    


    echo addProizvodjac($naziv);
}


?>