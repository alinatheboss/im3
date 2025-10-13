async function get30days(artist) {
    const url = `https://im3.alinabosshard.ch/backend/api/get30days.php?artist=${artist}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }  catch (error) {
        console.error(error)
    }
}


const input = document.querySelector('#artist');
const btn_go = document.querySelector('#go');
btn_go.addEventListener('click', function() {
    const artist = input.value;
    get30days(artist);
})