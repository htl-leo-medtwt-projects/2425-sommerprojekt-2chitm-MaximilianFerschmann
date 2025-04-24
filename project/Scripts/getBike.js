const answerContainer1 = document.querySelector("#answer1");
const answerContainer2 = document.querySelector("#answer2");
const questionContainer = document.querySelector("#question");
const imageContainer = document.querySelector("#image");
const descriptionContainer = document.querySelector(".description");
const resetButton = document.querySelector("#reset-button"); // Reset-Button

let bikes = [];
let currentQuestionIndex = 0;
let filteredBikes = [];

// Fragen und Antwortmöglichkeiten
const questions = [
  {
    question: "Welchen Motortyp bevorzugen Sie?",
    answers: ["2-Takt", "4-Takt"],
    filterKey: "stroke",
    filterValues: ["2-Stroke", "4-Stroke"]
  },
  {
    question: "Welche Leistungsklasse bevorzugen Sie?",
    answers: ["Klein (bis 250cc)", "Groß (über 250cc)"],
    filterKey: "cc",
    filterValues: [250, 2000]
  },
  {
    question: "Welchen Fahrstil bevorzugen Sie?",
    answers: ["Offroad", "Street"],
    filterKey: "type",
    filterValues: [["SX", "EXC", "EXC-F"], ["Duke", "Adventure", "Super Adventure S", "Super Adventure R"]]
  }
];

// Daten laden
fetch('../Data/bikes.json')
  .then(response => response.json())
  .then(data => {
    bikes = data;
    filteredBikes = [...bikes]; // Initial alle Bikes übernehmen
    loadQuestion();
  })
  .catch(error => console.error('Fehler:', error));

// Frage laden
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    answerContainer1.style.display = "none";
    answerContainer2.style.display = "none";
    showResult();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  answerContainer1.textContent = currentQuestion.answers[0];
  answerContainer2.textContent = currentQuestion.answers[1];

  answerContainer1.onclick = () => handleAnswer(0);
  answerContainer2.onclick = () => handleAnswer(1);
}

// Antwort verarbeiten
function handleAnswer(answerIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const filterValue = currentQuestion.filterValues[answerIndex];

  if (Array.isArray(filterValue)) {
    filteredBikes = filteredBikes.filter(bike => filterValue.includes(bike[currentQuestion.filterKey]));
  } else if (typeof filterValue === "number") {
    if(answerIndex === 0) {
      filteredBikes = filteredBikes.filter(bike => bike.cc <= 250);
    } else {
      filteredBikes = filteredBikes.filter(bike => bike.cc > 250);
    }
  } else {
    filteredBikes = filteredBikes.filter(bike => bike[currentQuestion.filterKey] === filterValue);
  }
  console.log(filteredBikes); // Debugging-Ausgabe

  currentQuestionIndex++;
  loadQuestion();
}

// Ergebnis anzeigen
function showResult() {
  if (filteredBikes.length === 0) {
    questionContainer.textContent = "Es wurde kein passendes Motorrad gefunden.";
    imageContainer.src = "";
    descriptionContainer.textContent = "";
    return;
  } else {
    document.querySelector(".right-section").style.display = "none";
    document.querySelector(".left-section").style.display = "flex"; 
  }

  const selectedBike = filteredBikes[0];
  document.querySelector('#title').textContent = `${selectedBike.model}`;
  imageContainer.src = '../' + selectedBike.image;
  descriptionContainer.textContent = `Typ: ${selectedBike.type}, Hubraum: ${selectedBike.cc}cc, Leistung: ${selectedBike.hp} PS, Gewicht: ${selectedBike.weight} kg, Preis: ${selectedBike.price} €`;
}

// Reset-Funktion
function resetQuiz() {
  currentQuestionIndex = 0; // Zurück zum ersten Schritt
  filteredBikes = [...bikes]; // Alle Bikes wiederherstellen
  loadQuestion(); // Erste Frage laden
  imageContainer.src = ""; // Bild zurücksetzen
  descriptionContainer.textContent = ""; // Beschreibung zurücksetzen
  answerContainer1.style.display = "flex"; // Antwort-Container wieder anzeigen
  answerContainer2.style.display = "flex"; // Antwort-Container wieder anzeigen
  document.querySelector(".right-section").style.display = "flex";
  document.querySelector(".left-section").style.display = "none"; 
  document.querySelector('#title').textContent = ""; // Titel zurücksetzen
}

// Event-Listener für den Reset-Button
resetButton.addEventListener("click", resetQuiz);