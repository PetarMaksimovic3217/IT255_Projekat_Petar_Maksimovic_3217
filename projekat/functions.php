<?php
include("shared.php");


function checkIfLoggedIn()
{
    global $conn;
    if (isset($_SERVER['HTTP_TOKEN'])) {
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM KORISNICI WHERE TOKEN=?");
        $result->bind_param("s", $token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function login($email, $lozinka)
{
    global $conn;
    $rarray = array();
    if (checkLogin($email, $lozinka)) {
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE EMAIL=?");
        $result2->bind_param("ss", $id, $email);
        $result2->execute();
        $rarray['token'] = $id;
        if (!checkIfCartExists($id)) {
            createCart($id);
        }
    } else {
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Invalid username/password";
    }
    return json_encode($rarray);
}

function checkLogin($email, $lozinka)
{
    global $conn;
    $lozinka = md5($lozinka);
    $result = $conn->prepare("SELECT * FROM KORISNICI WHERE EMAIL=? AND LOZINKA=?");
    $result->bind_param("ss", $email, $lozinka);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return true;
    } else {
        return false;
    }
}

function checkLoginID($id)
{
    global $conn;
    $result = $conn->prepare("SELECT * FROM KORISNICI WHERE ID=? ");
    $result->bind_param("i", $id);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return true;
    } else {
        return false;
    }
}

function register($ime, $prezime, $adresa, $email, $lozinka)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfUserExists($email)) {
        $errors .= "Profile with that email already exists\r\n";
    }
    if (strlen($email) < 5) {
        $errors .= "Email must have at least 5 characters\r\n";
    }
    if (strlen($lozinka) < 5) {
        $errors .= "Password must have at least 5 characters\r\n";
    }
    if (strlen($ime) < 3) {
        $errors .= "First name must have at least 3 characters\r\n";
    }
    if (strlen($prezime) < 3) {
        $errors .= "Last name must have at least 3 characters\r\n";
    }
    if ($errors == "") {
        $stmt = $conn->prepare("INSERT INTO KORISNICI (IME, PREZIME, ADRESA, EMAIL, LOZINKA) VALUES (?, ?, ?, ?,?)");
        $sifra = md5($lozinka);
        $stmt->bind_param("sssss", $ime, $prezime, $adresa, $email, $sifra);
        if ($stmt->execute()) {
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE EMAIL=?");
            $result2->bind_param("ss", $id, $email);
            $result2->execute();
            $rarray['token'] = $id;
            //createCart($id);

        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else {
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }

    return json_encode($rarray);
}

function checkIfUserExists($email)
{
    global $conn;
    $result = $conn->prepare("SELECT * FROM KORISNICI WHERE EMAIL=?");
    $result->bind_param("s", $email);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return true;
    } else {
        return false;
    }
}


function getUser($token)
{
    $token = str_replace('"', "", $token);
    $idKorpe = tokenToCart($token);
    global $conn;
    $query = 'SELECT id, ime, prezime, adresa, email, token, uloga_id,
      (SELECT ime FROM uloga WHERE uloga.id = korisnici.uloga_id) AS role_name 
      FROM KORISNICI
      WHERE KORISNICI.token = ?';
    $user = array();
    $statement = $conn->prepare($query);
    $statement->bind_param('i', $token);
    if ($statement->execute()) {
        $result = $statement->get_result();
        while ($row = $result->fetch_assoc()) {
            $user['id'] = $row['id'];
            $user['ime'] = $row['ime'];
            $user['prezime'] = $row['prezime'];
            $user['adresa'] = $row['adresa'];
            $user['email'] = $row['email'];
            $user['uloga_id'] = $row['uloga_id'];
            $user['uloga_ime'] = $row['role_name'];

        }
    }
    return json_encode($user);
}


function addKategorija($naziv)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO kategorija(naziv) VALUES (?)");
            $stmt->bind_param('s',$naziv);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function removeKategorija($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM kategorija
      WHERE kategorija.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}


function getKategorija()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM KATEGORIJA");
    $num_rows = $result->num_rows;
    $kategorija = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM KATEGORIJA");
        while ($row = $result2->fetch_assoc()) {
            array_push($kategorija, $row);
        }
    }
    $rarray['kategorija'] = $kategorija;
    return json_encode($rarray);

}
function addProizvodjac($naziv)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO proizvodjac(naziv) VALUES (?)");
            $stmt->bind_param('s',$naziv);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}
function removeProizvodjac($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM proizvodjac
      WHERE proizvodjac.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}


function getProizvodjac()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM PROIZVODJAC");
    $num_rows = $result->num_rows;
    $proizvodjac = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM PROIZVODJAC");
        while ($row = $result2->fetch_assoc()) {
            array_push($proizvodjac, $row);
        }
    }
    $rarray['proizvodjac'] = $proizvodjac;
    return json_encode($rarray);

}

function addModel($proizvodjac, $naziv)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO model (proizvodjac_id, naziv ) VALUES ( ?, ?)");
            $stmt->bind_param('is', $proizvodjac, $naziv);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}
function removeModel($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM model
      WHERE model.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}
function getModel()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM MODEL");
    $num_rows = $result->num_rows;
    $model = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM MODEL");
        while ($row = $result2->fetch_assoc()) {
            array_push($model, $row);
        }
    }
    $rarray['model'] = $model;
    return json_encode($rarray);

}

function addSlika($link)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO slika (link) VALUES (?)");
            $stmt->bind_param('s', $link);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function removeSlika($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM slika
      WHERE slika.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}


function getSlika()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM SLIKA");
    $num_rows = $result->num_rows;
    $slika = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM SLIKA");
        while ($row = $result2->fetch_assoc()) {
            array_push($slika, $row);
        }
    }
    $rarray['slika'] = $slika;
    return json_encode($rarray);

}

function addDestinacija($ime,$drzava,$link)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO destinacija (ime,drzava,slika) VALUES (?,?,?)");
            $stmt->bind_param('sss', $ime,$drzava,$link);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function removeDestinacija($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM destinacija
      WHERE destinacija.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}


function getDestinacija()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM DESTINACIJA");
    $num_rows = $result->num_rows;
    $destinacija = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM DESTINACIJA");
        while ($row = $result2->fetch_assoc()) {
            array_push($destinacija, $row);
        }
    }
    $rarray['destinacija'] = $destinacija;
    return json_encode($rarray);

}

function getOneDestinacija($id)
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM DESTINACIJA WHERE id=".$id);
    $num_rows = $result->num_rows;
    $destinacija = array();
    if ($num_rows > 0) {
       
        while ($row = $result->fetch_assoc()) {
             $destination = array();
                $one_destination['id'] = $row['id'];
                $one_destination['ime'] = $row['ime'];
                $one_destination['drzava'] = $row['drzava'];
                $one_destination['slika'] = $row['slika'];
                $destinacija = $one_destination;
        }
    }
    $rarray['destinacija'] = $destinacija;
    return json_encode($rarray);

}



function addBrod($kategorija,$model,$predjeno_milja,$boja,$broj_putnika,$registracija,$destinacija,$slika,$cena)
{
    global $conn;
    $rarray = array();
    $errors = "";
    if (checkIfLoggedIn()) {

        if ($errors == "") {
            $stmt = $conn->prepare("INSERT INTO brod (kategorija_id,model_id,predjeno_milja,boja,broj_putnika,registracija,destinacija_id,slika_id,cena) VALUES (?,?,?,?,?,?,?,?,?)");
            $stmt->bind_param('iissisiii', $kategorija,$model,$predjeno_milja,$boja,$broj_putnika,$registracija,$destinacija,$slika,$cena);

            if ($stmt->execute()) {
                $rarray['success'] = "ok";
            } else {
                $rarray['error'] = "Database connection error";
            }
            return json_encode($rarray);
        } else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = json_encode($errors);
            return json_encode($rarray);
        }

    } else {
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function removeBrod($id)
{
    global $conn;
    $message = array();
    $query = 'DELETE
      FROM brod
      WHERE brod.id = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    $statement->execute();
    if ($statement->execute()) {
        $message['success'] = "OK";
    } else {
        $message['error'] = "Error!";
    }
    return json_encode($message);
}


function getBrod()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM BROD");
    $num_rows = $result->num_rows;
    $brod = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM BROD");
        while ($row = $result2->fetch_assoc()) {
            array_push($brod, $row);
        }
    }
    $rarray['brod'] = $brod;
    return json_encode($rarray);

}

function getBrodovi(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT slika.link as slika, proizvodjac.naziv as proizvodjac_naziv, model.naziv as model_naziv, brod.id as brod_id, brod.registracija as brod_registracija, brod.predjeno_milja as brod_predjeno_milja, brod.broj_putnika as brod_broj_putnika, destinacija.ime as baza FROM brod join model on brod.model_id = model.id join proizvodjac on model.proizvodjac_id = proizvodjac.id join slika on brod.slika_id = slika.id join destinacija on brod.destinacija_id=destinacija.id");
		$num_rows = $result->num_rows;
		$brodovi = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT slika.link as slika, proizvodjac.naziv as proizvodjac_naziv, model.naziv as model_naziv, brod.id as brod_id, brod.registracija as brod_registracija, brod.predjeno_milja as brod_predjeno_milja, brod.broj_putnika as brod_broj_putnika, destinacija.ime as baza FROM brod join model on brod.model_id = model.id join proizvodjac on model.proizvodjac_id = proizvodjac.id join slika on brod.slika_id = slika.id join destinacija on brod.destinacija_id=destinacija.id");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['slika'] = $row['slika'];
				$one_veh['proizvodjac_naziv'] = $row['proizvodjac_naziv'];
				$one_veh['model_naziv'] = $row['model_naziv'];
				$one_veh['brod_id'] = $row['brod_id'];
				$one_veh['brod_registracija'] = $row['brod_registracija'];
				$one_veh['brod_predjeno_milja'] = $row['brod_predjeno_milja'];
				$one_veh['brod_broj_putnika'] = $row['brod_broj_putnika'];
				$one_veh['baza'] = $row['baza'];
				array_push($brodovi,$one_veh);
			}
		}
		$rarray['brodovi'] = $brodovi;
		return json_encode($rarray);
}
function getPeriod()
{
    global $conn;
    $rarray = array();

    $result = $conn->query("SELECT * FROM PERIOD");
    $num_rows = $result->num_rows;
    $period = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT * FROM PERIOD");
        while ($row = $result2->fetch_assoc()) {
            array_push($period, $row);
        }
    }
    $rarray['period'] = $period;
    return json_encode($rarray);

}



?>