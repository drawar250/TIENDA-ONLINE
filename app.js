// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AlzaSyCzKkqON5pqg_FoOqjiICMtInMC6vnx_M",
  authDomain: "realtime-ec549.firebaseapp.com",
  databaseURL: "https://realtime-ec549-default-rtdb.firebaseio.com",
  projectId: "realtime-ec549",
  storageBucket: "realtime-ec549.appspot.com",
  messagingSenderId: "769438819719",
  appId: "1:769438819719:web:c9704c8fdb22a0a93df22"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia al nodo de mensajes
const messagesRef = ref(database, "messages");

// Enviar mensaje
const sendMessage = (message) => {
  push(messagesRef, { text: message });
};

// Escuchar mensajes en tiempo real
onValue(messagesRef, (snapshot) => {
  const chatBox = document.querySelector(".chat-box");
  chatBox.innerHTML = ""; // Limpiar mensajes anteriores
  snapshot.forEach((childSnapshot) => {
    const message = childSnapshot.val().text;
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
  });
});

// Manejar el envío del formulario
document.getElementById("chatform").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatinput");
  const message = input.value;
  if (message) {
    sendMessage(message);
    input.value = ""; // Limpiar el campo de entrada
  }
});
