
<?php

function fetchRadioNRJdata() {
    $url = "https://energy.ch/api/channels/bern/playouts";

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    curl_close($ch);

    return json_decode($response, true);
}

return fetchRadioNRJdata( )


?>
