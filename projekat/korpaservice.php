<?php
header('Access-Control-Allow-Methods: GET, POST');
include("shared.php");


function getOrder($token)
{
    $idKorisnika = tokenToId($token);
	

    global $conn;
    $query = 'SELECT narudzbina.id, narudzbina.id_broda,slika.link, model.naziv, narudzbina.period_id,
	(SELECT naziv FROM kategorija WHERE kategorija.id = brod.kategorija_id) AS type, brod.predjeno_milja, 
	brod.broj_putnika,narudzbina.id_Korpe, (brod.cena) AS total FROM narudzbina JOIN korpa ON narudzbina.id_korpe = korpa.id
	JOIN korisnici ON korpa.idKorisnika = korisnici.id JOIN brod ON narudzbina.id_broda = brod.id 
	JOIN model ON brod.model_id=model.id JOIN slika ON brod.slika_id=slika.id WHERE korpa.flag = 1 AND korpa.idKorisnika = ?';
    $korpa = array();
    if ($statement = $conn->prepare($query)) {
        $statement->bind_param('i', $idKorisnika);
        $statement->execute();
        $result = $statement->get_result();
        while ($row = $result->fetch_assoc()) {
            $order = array();
            $order['id_narudzbine'] = $row['id'];
			 $order['slika_id'] = $row['link'];
            $order['id'] = $row['id_broda'];
            $order['model'] = $row['naziv'];
            $order['cena'] = $row['total'];
			$order['kategorija'] = $row['type'];
            $order['predjeno_milja'] = $row['predjeno_milja'];
            $order['broj_putnika'] = $row['broj_putnika'];
            $order['period'] = $row['period_id'];
            $order['idKorpe'] = $row['id_Korpe'];
           
            array_push($korpa, $order);
        }
    }
    $message['korpa'] = $korpa;
    return json_encode($korpa);
}

function removeOrder($token, $id_broda)
{
    $idKorisnika = tokenToId($token);
    global $conn;
    $message = array();
    $query = 'DELETE narudzbina
      FROM narudzbina
      JOIN brod ON narudzbina.id_broda = brod.id
      JOIN korpa ON narudzbina.id_korpe = korpa.id
      WHERE narudzbina.id_broda = ? AND korpa.idKorisnika = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("ii", $id_broda, $idKorisnika);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}

function addOrder($token,$id_broda,$period)
{    echo $period;
    $id_korpe = tokenToCart($token);
    global $conn;
    $message = array();
    $query = 'INSERT INTO narudzbina (id_korpe, id_broda, period_id) VALUES  (?, ?, ?)';
    $statement = $conn->prepare($query);
    $statement->bind_param("iis", $id_korpe, $id_broda,$period);
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}

function updateOrder($token, $id_broda, $period)
{
    $idKorisnika = tokenToId($token);
    global $conn;
    $message = array();
    $query = 'UPDATE narudzbina
      JOIN korpa	
      ON narudzbina.id_korpe = korpa.id
      JOIN korisnici 
      ON korpa.idKorisnika = korisnici.id
      SET narudzbina.period_id = ?
      WHERE narudzbina.id_broda = ?
      AND korisnici.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("iii", $period, $id_broda, $idKorisnika);
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    if (!checkIfCartExists($token)) {
        createCart($token);
    }
    return json_encode($message);
}

function checkout($token)
{
    $token = str_replace('"', "", $token);
//    sendMail($token);
    $idKorisnika = tokenToId($token);
    global $conn;
    $message = array();
    $query = 'UPDATE korpa 
              SET flag = 2
              WHERE korpa.flag = 1 AND korpa.idKorisnika = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $idKorisnika);
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    if (!checkIfCartExists($token)) {
        createCart($token);
    }
    return json_encode($message);
}
function getReservations($token){
	 global $conn;
	$token = str_replace('"', "", $token);
	$idKorisnika = tokenToId($token);
	$query = 'SELECT narudzbina.id, narudzbina.id_broda,model.naziv, period.naziv as datum_putovanja, (SELECT naziv FROM kategorija WHERE kategorija.id = brod.kategorija_id) AS type,
	destinacija.ime,destinacija.drzava, brod.broj_putnika,narudzbina.id_Korpe, (brod.cena) AS total FROM narudzbina JOIN korpa ON narudzbina.id_korpe = korpa.id 
	JOIN korisnici ON korpa.idKorisnika = korisnici.id JOIN brod ON narudzbina.id_broda = brod.id JOIN model ON brod.model_id=model.id JOIN period ON narudzbina.period_id=period.id 
	JOIN destinacija ON brod.destinacija_id=destinacija.id WHERE korpa.flag = 2 AND korpa.idKorisnika = ?';
	 $korpa = array();
    if ($statement = $conn->prepare($query)) {
        $statement->bind_param('i', $idKorisnika);
        $statement->execute();
        $result = $statement->get_result();
        while ($row = $result->fetch_assoc()) {
            $order = array();
            $order['id_narudzbine'] = $row['id'];
            $order['id'] = $row['id_broda'];
            $order['model'] = $row['naziv'];
            $order['cena'] = $row['total'];
			$order['kategorija'] = $row['type'];
            $order['destinacija'] = $row['ime'];
			$order['destinacija_drzava'] = $row['drzava'];
			
            $order['broj_putnika'] = $row['broj_putnika'];
            $order['period'] = $row['datum_putovanja'];
            $order['idKorpe'] = $row['id_Korpe'];
           
            array_push($korpa, $order);
        }
    }
    $message['korpa'] = $korpa;
    return json_encode($korpa);
}


?>