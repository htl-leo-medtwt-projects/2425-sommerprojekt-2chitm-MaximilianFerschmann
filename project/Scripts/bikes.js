const bikesContainer = document.getElementById('bikesContainer');


let bikes = [];
fetch('../Data/bikes.json')
  .then(response => response.json())
  .then(data => {
    bikes = data;
    console.log(bikes);
    loadAllBikes();
  })
  .catch(error => console.error('Fehler:', error));

function loadAllBikes(){
        bikes.forEach(bike => {
            bikesContainer.innerHTML += `
                <div class="bike-item">
                    <img src="../${bike.image}" alt="${bike.model}">
                    <h3>${bike.model}</h3>
                    <button onclick="loadBikeDetails('${bike.model}')"> Show Details </button>
                </div>
            `;
                     
        });
}
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
        <h2 id="bikeName">${bike.model}</h2>
        <img id="bikeImage" src="../${bike.image}" alt="Bike Image">
        </div>
        <div>
        <p id="bikePrice">Preis: ${bike.price}€</p>
        <p id="bikeCcm">Hubraum: ${bike.cc}cm³</p>
        <p id="bikeStrokes">${bike.stroke}</p>
        <p id="bikeWeight">Gewicht: ${bike.weight}kg</p>
        <p id="bikePower">PS: ${bike.hp}</p>    
        </div>
    `
  
  } else {
    console.log('Bike not found');
  }

}
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDetails();
  }
})
function closeDetails() {
  detailContainer.className = 'hidden';
  bikesContainer.style.opacity = '1';
  document.getElementById('filter').style.opacity = '1';
}