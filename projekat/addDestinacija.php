<?php


header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['ime']) && isset($_POST['drzava']) && isset($_POST['link'])) {

    $ime=$_POST['ime'];
    
    $drzava = $_POST['drzava'];
	
	 $link = $_POST['link'];
    


    echo addDestinacija($ime,$drzava,$link);
}


?>