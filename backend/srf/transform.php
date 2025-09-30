<?php 

$data = include('extract.php');

$songs = $data['songList'];

$transformed_data = [];
foreach($songs as $song) {
    $transformed_data[] = [
        'timestamp' => $song['date'],
        'artist' => $song['artist']['name'],
        'sender' => 'srf'
    ];

};



echo '<pre>';
var_dump($transformed_data);
echo '</pre>';

return $transformed_data;