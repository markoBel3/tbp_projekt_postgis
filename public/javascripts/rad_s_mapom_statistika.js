var map;
document.addEventListener("DOMContentLoaded", function(event) { 
    map = L.map('map').setView([46.307824, 16.338171], 8);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png')
    .addTo(map);
    dodajMarkere();
  });

async function dodajMarkere() {
    const url = `http://localhost:3000/statistika/dohvatiPutovanja`;
    let rez = await fetch(url);
    if (!rez.ok) {
        alert("Could not fetch data");
        return;
    }
    let json = await rez.json();
    json.forEach((element, index, array) => {
        L.marker([element.st_y,element.st_x]).addTo(map);
    });

    
}

