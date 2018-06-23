<?php

include("config.php");

function tokenToId($token)
{
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT id FROM korisnici WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $id = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $id = $row['id'];
        }
        return $id;
    }
}

function tokenToCart($token)
{
    $token = str_replace('"', "", $token);
    $user_id = tokenToId($token);
    global $conn;
    $query = 'SELECT korpa.id 
      FROM korpa
      WHERE korpa.idKorisnika = ?';
    $result = $conn->prepare($query);
    $result->bind_param('i', $user_id);
    $id = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $id = $row['id'];
        }
        return $id;
    }
}


function checkIfCartExists($token)
{
    $token = str_replace('"', "", $token);
    $user_id = tokenToId($token);
    global $conn;
    $query = 'SELECT EXISTS (SELECT * FROM korpa WHERE flag = 1 AND idKorisnika = ?)';
    $statement = $conn->prepare($query);
    $statement->bind_param('i', $user_id);
    $statement->execute();
    $result = $statement->get_result()->fetch_row()[0];
    if ($result == 1) {
        return true;
    } else {
        return false;
    }
}

function createCart($token)
{
    $token = str_replace('"', "", $token);
    $user_id = tokenToId($token);
    global $conn;
    $message = array();
    $query = 'INSERT INTO korpa (idKorisnika, flag) VALUES (?, ?)';
    $statement = $conn->prepare($query);
    $flag = 1;
    $statement->bind_param("ii", $user_id, $flag);
    if ($statement->execute()) {
        $message['success'];
    } else {
        $message['error'];
    }
    return json_encode($message);
}


?>
