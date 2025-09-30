<?php

$data = include('transform.php');


require_once '../config.php';

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO radio (timestamp, artist, sender) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);


    foreach($data as $song) {
     $stmt->execute([
        $song['timestamp'],
        $song['artist'],   
        $song['sender'] 
    ]);
}

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}