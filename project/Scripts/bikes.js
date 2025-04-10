
const bikesContainer = document.getElementById('bikesContainer');

let bikes = [];
fetch('../Data/bikes.json')
  .then(response => response.json())
  .then(data => {
    bikes = data;
    console.log(bikes);
    loadBikes(bikes);
  })
  .catch(error => console.error('Fehler:', error));


const detailContainer = document.getElementById('bikeDetails');
function loadBikeDetails(bikename) {
  detailContainer.className = 'flex';
  console.log(bikename);
  let bike = bikes.find(bike => bike.model === bikename);
  if (bike) {
    bikesContainer.style.opacity = '0.2';
    document.getElementById('filter').style.opacity = '0.2';
    detailContainer.innerHTML = `
        <button id="closeDetails" onclick="closeDetails()">X</button>
        <div>
        <h3>MOTOR</h3>
        <img class="engineIMG" src="../Images/Engine/Gears.png"> 
        <p id="bikeStrokes">${bike.stroke}</p>
        <p id="bikeCcm">Hubraum: ${bike.cc}cm³</p>
        <h3>POWER</h3>
        <img class="engineIMG" src="../Images/Engine/Tacho.png">
        <p id="bikePower">PS: ${bike.hp}</p>  
        </div>
        <div>
        <h2 id="bikeName">${bike.model}</h2>
        <img id="bikeImage" src="../${bike.image}" alt="Bike Image">
        </div>
        <div>
        <h3>DETAILS</h3>
        <p id="bikePrice">Preis: ${bike.price}€</p>
        <img class="engineIMG" src="../Images/Engine/Weight.png">
        <p id="bikeWeight">Gewicht: ${bike.weight}kg</p>
        </div>
        

    `

  } else {
    console.log('Bike not found');
  }

}
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeDetails();
  }
})
function closeDetails() {
  detailContainer.className = 'hidden';
  bikesContainer.style.opacity = '1';
  document.getElementById('filter').style.opacity = '1';
}

function loadFilteredBikes() {
  let name = document.getElementById('filter-input').value;
  let strokes = document.getElementById('strokes').value;
  let maxccm = parseInt(document.getElementById('maxccm').value) || Infinity;
  let minccm = parseInt(document.getElementById('minccm').value) || 0;
  let maxprice = parseInt(document.getElementById('maxprice').value) || Infinity;
  let minprice = parseInt(document.getElementById('minprice').value) || 0;
  let model = document.getElementById('bike-model').value;

  // Filterlogik
  let filteredBikes = bikes.filter(bike => {
    return (
      bike.model.toLowerCase().includes(name.toLowerCase()) &&
      (bike.stroke == strokes || strokes === 'all') &&
      (bike.cc <= maxccm) &&
      (bike.cc >= minccm) &&
      (bike.price <= maxprice) &&
      (bike.price >= minprice) &&
      (bike.type.toLowerCase().includes(model.toLowerCase()) || model === 'all')
    );
  });

  // Container leeren und gefilterte Bikes lade
  bikesContainer.innerHTML = ''; 
  loadBikes(filteredBikes);
}

function loadBikes(bikes){
  console.log(bikes)
  bikes.forEach(bike => {
    bikesContainer.innerHTML += `
                <div class="bike-item" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <img src="../${bike.image}" alt="${bike.model}">
                    <h3>${bike.model}</h3>
                    <button onclick="loadBikeDetails('${bike.model}')"> Show Details </button>
                </div>
            `;

  });
}
AOS.init();