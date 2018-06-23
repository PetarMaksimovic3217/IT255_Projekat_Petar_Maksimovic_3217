<?php


header('Access-Control-Allow-Methods: POST');
include("functions.php");

if (isset($_POST['kategorija']) && isset($_POST['model']) && isset($_POST['predjeno_milja']) && isset($_POST['boja']) && isset($_POST['broj_putnika']) && isset($_POST['registracija']) && isset($_POST['destinacija']) && isset($_POST['slika_id']) && isset($_POST['cena'])) {
    
    $kategorija=$_POST['kategorija'];
    
    $model = $_POST['model'];
	
	 $predjeno_milja=$_POST['predjeno_milja'];
    
    $boja = $_POST['boja'];
	
	 $broj_putnika=$_POST['broj_putnika'];
    
    $registracija = $_POST['registracija'];
	
	 $destinacija=$_POST['destinacija'];
    
    $slika = $_POST['slika_id'];
	
	 $cena = $_POST['cena'];
    


    echo addBrod($kategorija,$model,$predjeno_milja,$boja,$broj_putnika,$registracija,$destinacija,$slika,$cena);
}


?>