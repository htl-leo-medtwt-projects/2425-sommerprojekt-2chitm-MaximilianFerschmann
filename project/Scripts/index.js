document.body.innerHTML += `
    ${'<div class="backgroundKTM">KTM</div>'.repeat(10)}
`
const homeSlidersrc = ["300EXC.png", "125SX.png", "450EXC-F.png", "350EXC-F.png"];
let currenthomeindex = 0;

function homeSlider(value) {
    const sliderImage = document.getElementById("home-slider-image");
    const images = homeSlidersrc.map(src => `Images/Bikes/${src}`);

    // Entferne die aktive Klasse vom aktuellen Bild
    sliderImage.classList.remove("active");

    // Berechne den neuen Index
    currenthomeindex += value;
    if (currenthomeindex < 0) {
        currenthomeindex = homeSlidersrc.length - 1;
    } else if (currenthomeindex >= homeSlidersrc.length) {
        currenthomeindex = 0;
    }

    // Warte auf das Ende der Ausblendungsanimation
    setTimeout(() => {
        sliderImage.src = images[currenthomeindex];
        sliderImage.classList.add("active"); // Füge die aktive Klasse hinzu für die Einblendung
    }, 600); // Passt zur Dauer der CSS-Transition
}

// Automatischer Slider (optional)
homeSlider(0); // Initiales Bild setzen
let autoSlideInterval = setInterval(() => homeSlider(1), 5000); // Wechselt alle 5 Sekunden




let currentHelmetIndex = 0;
let helmets = [];

fetch('./Data/Helmets.json')
  .then(response => response.json())
  .then(data => {
    helmets = data;
    console.log(helmets);
  })
  .catch(error => console.error('Fehler:', error));


function helmetSlider(value) {
    value = parseInt(value)
    console.log(value);
    const helmetImage = document.getElementById("helmet-slider-image");
    helmetImage.classList.remove("active");
    currentHelmetIndex += value;
    if (currentHelmetIndex < 0) {
        currentHelmetIndex = helmets.length - 1;
    } else if (currentHelmetIndex >= helmets.length) {
        currentHelmetIndex = 0;
    }
    setTimeout(() => {
        helmetImage.src = helmets[currentHelmetIndex].image;
        helmetImage.classList.add("active");
    }, 100);
}