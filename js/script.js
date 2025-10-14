// -> Ausgabe Daten
let data = null

// -> API
async function get30days(artist) {
    const url = `https://im3.alinabosshard.ch/backend/api/get30days.php?artist=${artist}`;
    try {
        const response = await fetch(url);
        const api_data = await response.json();
        console.log(data);
        data = api_data

        // Array für Chart aufbereiten
        const chartData = prepareChartData(data);

        // Chart updaten
        updateChart(chartData);
        } catch (error) {
        console.error(error);
    }
}


 // -> Chart initialisieren
 const canvas = document.querySelector("#chart");

 const chart = new Chart(canvas, {
   type: 'bar',
   data: {
     labels: [],
     datasets: [
       {
         label: '',
         data: [],
         borderWidth: 0,
         backgroundColor:"rgb(221, 83, 65, 100)",
       },
       {
         label: '',
         data: [],
         borderWidth: 0,
         backgroundColor:"rgb(245, 127, 91, 100)",
       }
     ]
   },
   options: {
    plugins: {
        legend: {
          display: false // <--- hier wird die Legende ausgeblendet
        }
      },
      scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "gespielte Songs",
          font: {
          size: 14,        // optional: Schriftgröße
          weight: 'bold',
          color: "rgb(121, 74, 58, 100)"
        }
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Tag",
          align: 'end',      // Text am Ende der Achse
          font: {
          size: 14,
          weight: 'bold',
          color: "rgb(121, 74, 58, 100)"
          }
        },
      },

    },
    
  },
});


// -> Datenaufbereitung
function prepareChartData(rawData) {
    // 1️⃣ Leeres Objekt für Tageszählung
    const counts = {};
  
    rawData.forEach((item) => {
      // Datum aus timestamp extrahieren (ohne Uhrzeit)
      const date = new Date(item.timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}.${month}`;
  
      // Sicherstellen, dass der Tag existiert
      if (!counts[formattedDate]) {
        counts[formattedDate] = { nrj: 0, srf: 0 };
      }
  
      // Sender zählen
      if (item.sender === "nrj") counts[formattedDate].nrj++;
      if (item.sender === "srf") counts[formattedDate].srf++;
    });
  
    // 2️⃣ Sortieren nach Datum
    const sortedKeys = Object.keys(counts).sort((a, b) => {
      const [dayA, monthA] = a.split(".").map(Number);
      const [dayB, monthB] = b.split(".").map(Number);
      return new Date(2025, monthA - 1, dayA) - new Date(2025, monthB - 1, dayB);
    });
  
    // 3️⃣ Arrays für Chart erzeugen
    const labels = sortedKeys.slice(-30); // nur die letzten 30 Tage
    const nrjData = labels.map((d) => counts[d].nrj);
    const srfData = labels.map((d) => counts[d].srf);
  
    return { labels, nrjData, srfData };
  }
  
  // -> Chart aktualisieren
  function updateChart(chartData) {
    chart.data.labels = chartData.labels;
    chart.data.datasets[0].data = chartData.nrjData;
    chart.data.datasets[1].data = chartData.srfData;
    chart.update();
  }
  
  // -> Suchfunktion
  const input = document.querySelector("#artist");
  const btn_go = document.querySelector("#go");
  
  btn_go.addEventListener("click", function () {
    const artist = input.value.trim();
    if (artist) {
      get30days(artist);
    }
  });