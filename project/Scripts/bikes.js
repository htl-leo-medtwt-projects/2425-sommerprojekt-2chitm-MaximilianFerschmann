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
                    <img src="../${bike.image}" alt="${bike.name}">
                    <h3>${bike.model}</h3>
                    <p>${bike.stroke}</p>
                    <p>Price: ${bike.price}€</p>
                    <p>Horsepower: ${bike.hp}</p>
                    <p>Weight: ${bike.weight}</p>
                    <button class="like">Like</button>
                </div>
            `;
                     
        });
}