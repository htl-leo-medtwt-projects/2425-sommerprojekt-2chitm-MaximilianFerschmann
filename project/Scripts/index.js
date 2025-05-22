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
        currentHelmetIndex = 4;
    } else if (currentHelmetIndex >= 5) {
        currentHelmetIndex = 0;
    }
    setTimeout(() => {
        helmetImage.src = helmets[currentHelmetIndex].image;
        helmetImage.classList.add("active");
    }, 100);
}
function renderHelmets(data) {
    data = data.slice(0, 5);
    const container = document.getElementById('helmets-container');

    data.forEach(helmet => {
        // Erstelle ein neues div-Element für jeden Helm
        const helmetDiv = document.createElement('div');

        // Erstelle das img-Element
        const img = document.createElement('img');
        img.src = helmet.image;
        img.alt = helmet.name;

        // Erstelle das vertikale Linien-Element
        const verticalLine = document.createElement('section');
        verticalLine.className = 'vertikal-line';
        const h3 = document.createElement('h3');
        h3.textContent = helmet.name;

        // Füge alle Elemente zum helmetDiv hinzu
        helmetDiv.appendChild(img);
        helmetDiv.appendChild(verticalLine);
        helmetDiv.appendChild(h3);

        // Füge das helmetDiv zum Container hinzu
        container.appendChild(helmetDiv);
    })
}
setTimeout(() => {
    renderHelmets(helmets);
}, 1000); // Warte 0.1 Sekunde, um sicherzustellen, dass die Daten geladen sind


function showLogIn() {

    const loginContainer = document.getElementById('login_container');
    if (loginContainer.style.display === 'flex') {
        loginContainer.style.display = 'none';
        return
    }
    console.log('showLogIn function called');
    if (localStorage.getItem('loggedInUser')) {
        loginContainer.innerHTML = `
        <button id="Logout" onclick="logOut()">Log Out</button>
        `
        loginContainer.style.display = 'flex';
    } else {
        loginContainer.innerHTML = `
        <a href="./Pages/Log_in.html">Log In</a>
        `
        loginContainer.style.display = 'flex';
    }
}
function logOut() {
    localStorage.removeItem('loggedInUser');
    const loginContainer = document.getElementById('login_container');
    loginContainer.style.display = 'none';
}
const slider = document.getElementById("product-kategories-slider");
const leftBtn = document.querySelector(".slider-button-left");
const rightBtn = document.querySelector(".slider-button-right");

// Definiere verschiedene Inhalte als Strings (kann auch JSON sein)
const slides = [
    `
        <h1>Cross und Visier Helme</h1>
        <p>
            Entdecke unsere Auswahl an Cross- und Visierhelmen, die sowohl für Offroad-Abenteuer
            als auch für den Straßenverkehr geeignet sind.
        </p>
        <img class="product-kategories-slider-img" src="Images/Helmets/bell_moto_9s.png">
        `,
    `
        <h1>Jackets & Protektoren</h1>
        <p>
            Schütze dich mit unseren hochwertigen Motorrad-Jacken und Protektoren,
            die Sicherheit und Komfort kombinieren.
        </p>
        <img class="product-kategories-slider-img" src="Images/Clothing/jacket_protection.png">
        `,
    `
        <h1>Offroad Schuhe</h1>
        <p>
            Robuste und komfortable Schuhe für alle Geländebedingungen – perfekt geeignet für Trail und Rennstrecke.
        </p>
        <img class="product-kategories-slider-img" src="Images/Boots/offroad_boots.png">
        `
];

let currentIndex = 0;

function updateSliderContent(index) {
    index = index + currentIndex;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slider.style.opacity = 0;

    setTimeout(() => {
        slider.innerHTML = slides[currentIndex];
        slider.style.opacity = 1;
    }, 200);
}

leftBtn.addEventListener("click", () => {
    updateSliderContent(currentIndex - 1);
});

rightBtn.addEventListener("click", () => {
    updateSliderContent(currentIndex + 1);
});

// Initialen Inhalt laden
updateSliderContent(0);