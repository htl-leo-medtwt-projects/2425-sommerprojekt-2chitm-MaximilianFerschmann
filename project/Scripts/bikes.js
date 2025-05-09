
const bikesContainer = document.getElementById('bikesContainer');
const favBikesContainer = document.getElementById('favBikesContainer');

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
        <div><div>
        <h3>MOTOR</h3>
        <img class="engineIMG" src="../Images/Engine/Gears.png"> 
        <p id="bikeStrokes">${bike.stroke}</p>
        <p id="bikeCcm">CC: ${bike.cc}cm³</p>
        </div>
        <div style="width: 100%;">
        <h3>POWER</h3>
        <img class="engineIMG"  src="../Images/Engine/Tacho.png">
        <p id="bikePower">PS: ${bike.hp}</p>  
        </div>
        </div>
        <div>
        <h2 id="bikeName">${bike.model}</h2>
        <img id="bikeImage" src="../${bike.image}" alt="Bike Image">
        </div>
        <div>
        <h3>DETAILS</h3>
        <img class="engineIMG" src="../Images/Engine/Weight.png">
        <p id="bikePrice">Preis: ${bike.price}€</p>

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
function loadFavorites() {
  let user = localStorage.getItem('loggedInUser');
  if (!user) {
    return;
  }
  let userData = JSON.parse(localStorage.getItem('user_' + user));
  let favBikes = userData.favbikes || [];
  favBikesContainer.innerHTML = ''; // Clear the container before loading favorites
  favBikes.forEach(bikeName => {
    let bike = bikes.find(bike => bike.model === bikeName);
    if (bike) {
      favBikesContainer.innerHTML += `
                <div class="Favbike-item" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <img src="../${bike.image}" alt="${bike.model}">
                    <h3>${bike.model}</h3>
                    <button onclick="loadBikeDetails('${bike.model}')"> Show Details </button>
                    <p id="setFav" onclick="removeFav('${bike.model}')"><img src="../Images/SternIcon_gefüllt.webp"></p>
                </div>
            `;
    }
  })
}
function setFav(bikename) {
  let user = localStorage.getItem('loggedInUser');
  if (!user) {
    alert('Bitte zuerst einloggen!');
    return;
  }
  let userData = JSON.parse(localStorage.getItem('user_' + user));
  let favBikes = userData.favbikes || [];
  if (favBikes.includes(bikename)) {
    alert('Dieses Bike ist bereits in deinen Favoriten!');
    return;
  } else {
    favBikes.push(bikename);
    userData.favbikes = favBikes;
    localStorage.setItem('user_' + user, JSON.stringify(userData));
  }
  loadFavorites();
}
function removeFav(bikename) {
  let user = localStorage.getItem('loggedInUser');
  let userData = JSON.parse(localStorage.getItem('user_' + user));
  let favBikes = userData.favbikes || [];
  console.log(favBikes)
  if (favBikes.includes(bikename)) {
    favBikes = favBikes.filter(bike => bike != bikename);
    userData.favbikes = favBikes;
    localStorage.setItem('user_' + user, JSON.stringify(userData));
  }
  setTimeout(() => {
    loadFavorites();
  }, 500); 
  
}

function loadBikes(bikes){
  console.log(bikes)
  bikes.forEach(bike => {
    bikesContainer.innerHTML += `
                <div class="bike-item" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <img src="../${bike.image}" alt="${bike.model}">
                    <h3>${bike.model}</h3>
                    <button onclick="loadBikeDetails('${bike.model}')"> Show Details </button>
                    <p id="setFav" onclick="setFav('${bike.model}')"><img src="../Images/SternIcon.png"></p>
                </div>
            `;

  });
 // Re-initialize AOS after loading new content
}
setTimeout(() => {
  AOS.init();
  loadFavorites();
}, 300);