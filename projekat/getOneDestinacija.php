<?php
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Origin: *");

include("functions.php");

  if(isset($_GET['id'])){
      $id = intval($_GET['id']);
      echo getOneDestinacija($id);
  }


?>