<?php

// -> Datenbank zugangsdaten einbinden
require_once '../config.php';

// -> json aktivieren
header('Content-Type: application/json');

// -> Verbindung mit der Datenbank
try {
    // -> login auf Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // -> Daten aus URL holen
    $artist = $_GET['artist'];

    // -> sql statement schreiben
    $sql = "SELECT * FROM radio WHERE timestamp >= CURDATE() - INTERVAL 30 DAY AND artist = :artist";
    $stmt = $pdo->prepare($sql);

    // -> sql statement ausführen
    $stmt->execute(['artist' => $artist]);

    // -> daten in empfang nehmen
    $results = $stmt->fetchAll();

    // -> daten als json zurückgeben
    echo json_encode($results);


} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}