const form = document.getElementById("authForm");
const messageDiv = document.getElementById("message");
const toggleBtn = document.getElementById("toggleMode");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");

let isLogin = false;
/* HashString function von Chatgpt*/
async function hashString(input) {
    // Kodiere den String als UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
  
    // Erstelle den Hash (z.B. SHA-256)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  
    // Konvertiere den Hash in einen Hexadezimalstring
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
}
function showMessage(text, success = false) {
  messageDiv.textContent = text;
  messageDiv.style.color = success ? "#d4f4dd" : "#ffeb3b";
}
async function saveUser(username, password, favbikes, kits) {
  const hashedPassword = await hashString(password); // Passwort hashen
  localStorage.setItem("user_" + username, JSON.stringify({ username, password: hashedPassword, favbikes, kits }));
}
async function compareUser(username, password) {
  const user = getUser(username);
  if (!user) return false;
  const hashedPassword = await hashString(password);
  return user.password == hashedPassword;  
}
function getUser(username) {
  return JSON.parse(localStorage.getItem("user_" + username));
}

function handleRegister() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showMessage("Bitte Benutzernamen und Passwort eingeben.");
    return;
  }

  if (getUser(username)) {
    showMessage("Benutzername bereits vergeben.");
    return;
  }

  saveUser(username, password, [], []).then(() => {
    showMessage("Registrierung erfolgreich!", true);
    form.reset();     
  });
}

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;


  if (!username || !password) {
    showMessage("Bitte Benutzernamen und Passwort eingeben.");
    return;
  }

  const user = getUser(username);

  if (compareUser(username, password) == false) {
    showMessage("Ungültige Anmeldedaten.");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  showMessage("Erfolgreich angemeldet!", true);
  form.reset();
  setTimeout(() => {
    window.location.href = "../index.html"; // Weiterleitung nach erfolgreicher Anmeldung
  }, 1000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isLogin) {
    handleLogin();
  } else {
    handleRegister();
  }
});

toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Anmeldung" : "Registrierung";
  submitBtn.textContent = isLogin ? "Anmelden" : "Registrieren";
  toggleBtn.textContent = isLogin ? "Zur Registrierung" : "Zum Login";
  messageDiv.textContent = "";
});