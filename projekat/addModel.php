<?php


header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['proizvodjac']) && isset($_POST['naziv'])) {

    $proizvodjac_id=$_POST['proizvodjac'];
    
    $naziv = $_POST['naziv'];
    


    echo addModel($proizvodjac_id,$naziv);
}


?>