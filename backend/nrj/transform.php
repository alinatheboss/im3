<?php 

$data = include('extract.php');

$tansformed_data = [];
foreach($data as $song) {
    if ( !empty($song['artist'])) {
        $transformed_data[] = [
            'timestamp' => $song['playFrom'],
            'artist' => $song['artist'],
            'sender' => 'nrj'
        ];
    }

};



echo '<pre>';
var_dump($transformed_data);
echo '</pre>';

return $transformed_data;