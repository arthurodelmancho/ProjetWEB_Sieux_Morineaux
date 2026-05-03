class ChatHistory {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getHistory() {
    return this.messages;
  }
}

const historyMessages = new ChatHistory();

// Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
// Récupérer le JSON à partir de l'URL fournie
    fetch(url)
    //then est une méthode qui retourne une promesse et prend en paramètre une
    //fonction callback qui sera exécutée une fois la promesse résolue
    .then(response => {
    // Vérifier si la réponse est correcte
    if (!response.ok) {
    // Si la réponse n'est pas correcte, lancer une erreur
        throw new Error('Network response was not ok');
    }
    // Si la réponse est correcte, retourner le JSON
    return response.json();
    })
    //then ici permettra de récupérer le JSON retourné par la promesse
    .then(data => {
    // Vérifier si le JSON est vide ou mal formé
    if (Object.keys(data).length === 0 && data.constructor === Object) {
    // Si le JSON est vide ou mal formé, lancer une erreur
        throw new Error('Empty JSON or malformed JSON');
    }
    //On affiche le JSON dans la console. Il s'agit d'un objet contenant les
    // intentions du chatbot
    console.log(data);
    // Passer les intentions à la fonction sendMessage qui sera définie plus tard
    sendMessage(data.intents);
    })
    //catch est une méthode qui retourne une promesse et prend en paramètre une
    //fonction callback qui sera exécutée en cas d’erreur
    .catch(error => {
    // En cas d’erreur, afficher un message d’erreur dans la console
    console.error("There was a problem with the fetch operation:", error);
    }) ;
}

function sendMessage(Intents) {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    showMessage(message, "user");

    addLigne();

    const response = processMessage(Intents, message);
    showMessage(response, "bot");

    addLigne();
    input.value = "";

    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addLigne() {
    let chatBox = document.getElementById("chat-box");
    let br = document.createElement("br");
    chatBox.append(br);
}

function showMessage(message, type) {
    historyMessages.addMessage({ message, sender: type })
    let chatBox = document.getElementById("chat-box");
    let messageElement = document.createElement("div");
    messageElement.className = "message-" + type;
    messageElement.textContent = message;

    chatBox.append(messageElement);
}

// Fonction pour traiter le message de l'utilisateur
function processMessage(intents, message) {
    // Par défaut, la réponse est "Je suis désolé, je ne suis pas sûr de comprendre."
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    // Parcourir les intentions du chatbot
    intents.forEach(intent => {
        // Vérifier si le message de l'utilisateur correspond à l'un des motifs
        intent.patterns.forEach(pattern => {
            // Vérifier si le message de l'utilisateur contient le motif
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                // Sélectionner une réponse aléatoire parmi les réponses possibles
            response = intent.responses[Math.floor(Math.random() *
            intent.responses.length)];
            }
        });
    });
    // Retourner la réponse
    return response;
}

// création d'une session navigateur pour stocker les messages
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory',
    JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
}

// Fonction pour charger les messages de la session navigateur
function loadMessages() {
    // Récupérer l'historique des messages de la session navigateur
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessage(message, message.sender);
        });
    }

    const chatBox = document.getElementById("chat-box");
    const separator = document.createElement("div");
    separator.className = "history-separator";
    chatBox.append(separator);
}

window.addEventListener("beforeunload", saveMessages);
window.addEventListener("load", loadMessages);