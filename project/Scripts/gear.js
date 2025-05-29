let gear = [];

// Lade die JSON-Daten
fetch('../Data/Helmets.json')
    .then(response => response.json())
    .then(data => {
        gear = data;
        console.log('Daten geladen:', gear);
        createFilterButtons();
        populateKitSelectors();
    })
    .catch(error => console.error('Fehler beim Laden der Daten:', error));

const container = document.getElementById('container');
const filterContainer = document.getElementById('filter');

// Kategorien extrahieren & Buttons erstellen
function createFilterButtons() {
    const types = [...new Set(gear.map(item => item.typ))]; // Einzigartige Typen
    const allButton = document.createElement('button');
    allButton.textContent = 'Alle';
    allButton.value = 'all';
    allButton.classList.add('active-filter');
    allButton.addEventListener('click', () => filterItems('all'));
    filterContainer.appendChild(allButton);

    types.forEach(type => {
        const button = document.createElement('button');
        button.textContent = capitalizeType(type);
        button.value = type;
        button.addEventListener('click', () => filterItems(type));
        filterContainer.appendChild(button);
    });
}

// Übersetzung der Typen (optional)
function capitalizeType(type) {
    if (type === 'helmet') return 'Helme';
    if (type === 'glove') return 'Handschuhe';
    if (type === 'boots') return 'Stiefel';
    return type.charAt(0).toUpperCase() + type.slice(1); // Standard
}

// Items filtern
function filterItems(category = 'all') {
    const filtered = category === 'all' ? gear : gear.filter(item => item.typ === category);

    // Aktuelle Ansicht aktualisieren
    loadGear(filtered);

    // Aktiven Button markieren
    Array.from(filterContainer.children).forEach(btn => {
        btn.classList.toggle('active-filter', btn.value === category);
    });
}

// Zeige Gear an
function loadGear(items) {
    container.innerHTML = '';
    items.forEach(item => {
        const gearItem = document.createElement('div');
        gearItem.className = 'gear-item';
        gearItem.dataset.aos = 'fade-up';
        gearItem.dataset.aosAnchorPlacement = 'center-left';
        gearItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <img src="../${item.image}" alt="${item.name}">
        `;
        container.appendChild(gearItem);
    });
}

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

 // Array für gespeicherte Kits

function createKit(helmetName, gloveName, bootsName) {
    const helmet = gear.find(item => item.typ === 'helmet' && item.name === helmetName);
    const gloves = gear.find(item => item.typ === 'glove' && item.name === gloveName);
    const boots = gear.find(item => item.typ === 'boot' && item.name === bootsName);
    console.log(helmet,gloves,boots);

    if (!helmet || !gloves || !boots) {
        console.error("Ein oder mehrere Teile konnten nicht gefunden werden.");
        return;
    }
    let user = localStorage.getItem('loggedInUser');
    let userData = JSON.parse(localStorage.getItem('user_' + user));
    let kits = userData.kits || [];
    const kit = {
        id: kits.length + 1,
        name: `Kit ${kits.length + 1}`,
        helmet,
        gloves,
        boots
    };
    
    kits.push(kit);
    userData.kits = kits;   
    
    localStorage.setItem('user_' + user, JSON.stringify(userData));
    console.log("Neues Kit erstellt:", kit);
    showKits(); // Aktualisiere die Anzeige der Kits
}

function populateKitSelectors() {
    const helmetSelect = document.getElementById('helmet-select');
    const gloveSelect = document.getElementById('glove-select');
    const bootsSelect = document.getElementById('boots-select');

    const helmets = gear.filter(item => item.typ === 'helmet');
    const gloves = gear.filter(item => item.typ === 'glove');
    const boots = gear.filter(item => item.typ === 'boot');

    fillSelect(helmetSelect, helmets);
    fillSelect(gloveSelect, gloves);
    fillSelect(bootsSelect, boots);
}

function fillSelect(selectElement, items) {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        selectElement.appendChild(option);
    });
}

function showKits() {
    const user = localStorage.getItem('loggedInUser');
    const userData = JSON.parse(localStorage.getItem('user_' + user));
    const kits = userData.kits || [];
    
    const kitContainer = document.getElementById('kit-container');
    kitContainer.innerHTML = ''; // Leeren des Containers

    kits.forEach(kit => {
        const kitDiv = document.createElement('div');
        kitDiv.className = 'kit-item';
        kitDiv.innerHTML = `
            <h3>${kit.name}</h3>
            <div class="kit-details">
            <div><h3>${kit.helmet.name}</h3> <img src="../${kit.helmet.image}" alt="${kit.helmet.name}"></div>
            <div><h3>${kit.gloves.name}</h3> <img src="../${kit.gloves.image}" alt="${kit.gloves.name}"></div>
            <div><h3>${kit.boots.name}</h3> <img src="../${kit.boots.image}" alt="${kit.boots.name}"></div>
            </div>
        `;
        kitContainer.appendChild(kitDiv);
    });
}

document.getElementById('create-kit-btn').addEventListener('click', () => {
    const helmet = document.getElementById('helmet-select').value;
    const gloves = document.getElementById('glove-select').value;
    const boots = document.getElementById('boots-select').value;
    console.log(boots,gloves,helmet);

    createKit(helmet, gloves, boots);
});




setTimeout(() => {
    AOS.init();
    loadGear(gear); 
    showKits(); // Zeige Kits nach dem Laden der Seite

}, 300);
