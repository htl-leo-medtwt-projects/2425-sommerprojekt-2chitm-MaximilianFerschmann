let gear = [];

// Lade die JSON-Daten
fetch('../Data/Helmets.json')
    .then(response => response.json())
    .then(data => {
        gear = data;
        console.log('Daten geladen:', gear);
        createFilterButtons();

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

setTimeout(() => {
    AOS.init();
    loadGear(gear); // Zeige alle Items an
}, 300);
