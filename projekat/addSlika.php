<?php


header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['link'])) {
    $link = $_POST['link'];
    


    echo addSlika($link);
}


?>