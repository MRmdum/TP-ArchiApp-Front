
// Factorial function
function fact(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

// Testing the factorial function
console.log("Factorial of 6:", fact(6));

// Function that applies a function to each element of an array
function applique(f, tab) {
  return tab.map(f);
}

// Testing applique with fact
console.log("Factorials of [1,2,3,4,5,6]:", applique(fact, [1, 2, 3, 4, 5, 6]));

// Testing applique with an anonymous function
console.log("Increment each element:", applique(function(n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]));

// API URL
const API_URL = '/api/messages';

// Function to fetch messages from API
async function fetchMessages() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const messages = await response.json();
    update(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
  }
}

// Function to send a new message
async function sendMessage(message, pseudo) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msg: message, pseudo })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Rafraîchir les messages après l'envoi
    fetchMessages();
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
  }
}

// Function to update the message list
function update(messages) {
  const messageList = document.getElementById('message-list');

  // Clear existing messages
  messageList.innerHTML = '';

  // Add each message to the list
  messages.forEach(messageObj => {
    const newMessage = document.createElement('li');
    newMessage.className = 'list-group-item';
    newMessage.innerHTML = `<strong>${messageObj.pseudo}</strong> (${messageObj.date}): ${messageObj.msg}`;
    messageList.appendChild(newMessage);
  });
}

// Basic functionality for the send button
document.addEventListener('DOMContentLoaded', function() {
  const messageList = document.getElementById('message-list');

  // Add an update button
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Mettre à jour';
  updateButton.className = 'btn update-btn';
  updateButton.style.marginRight = '10px';
  document.querySelector('.card-body').appendChild(updateButton);

  // Add a toggle theme button
  const themeToggle = document.createElement('button');
  themeToggle.textContent = 'Changer de thème';
  themeToggle.className = 'btn theme-btn';
  themeToggle.style.marginLeft = '10px';
  document.querySelector('.card-body').appendChild(themeToggle);

  // Add a pseudo input
  const pseudoInput = document.createElement('input');
  pseudoInput.type = 'text';
  pseudoInput.id = 'pseudoInput';
  pseudoInput.className = 'form-control';
  pseudoInput.placeholder = 'Votre pseudo';
  pseudoInput.style.marginBottom = '10px';
  document.querySelector('.mb-3').insertBefore(pseudoInput, document.getElementById('messageText'));

  // Initial fetch of messages
  fetchMessages();

  // Set interval to refresh messages every 5 seconds
  setInterval(fetchMessages, 5000);

  // Update button event listener
  updateButton.addEventListener('click', function() {
    fetchMessages();
  });

  // Theme toggle functionality
  themeToggle.addEventListener('click', function() {
    const body = document.body;
    if (body.style.backgroundColor === 'white' || body.style.backgroundColor === '') {
      // Switch to dark theme
      body.style.backgroundColor = '#212529';
      body.style.color = '#f8f9fa';
      document.querySelectorAll('.card').forEach(card => {
        card.style.backgroundColor = '#343a40';
      });
      document.querySelectorAll('.list-group-item').forEach(item => {
        item.style.backgroundColor = '#495057';
      });
      document.querySelectorAll('.form-control').forEach(control => {
        control.style.backgroundColor = '#495057';
        control.style.color = '#f8f9fa';
      });
    } else {
      // Switch to light theme
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
      document.querySelectorAll('.card').forEach(card => {
        card.style.backgroundColor = '#f8f9fa';
      });
      document.querySelectorAll('.list-group-item').forEach(item => {
        item.style.backgroundColor = '#e9ecef';
      });
      document.querySelectorAll('.form-control').forEach(control => {
        control.style.backgroundColor = 'white';
        control.style.color = 'black';
      });
    }
  });

  // Send button event listener
  document.querySelector('.btn').addEventListener('click', function() {
    const messageText = document.getElementById('messageText').value;
    const pseudo = document.getElementById('pseudoInput').value || 'Anonymous';

    if (messageText.trim() !== '') {
      // Send the message to the API
      sendMessage(messageText, pseudo);

      // Clear the input field
      document.getElementById('messageText').value = '';
    }
  });
});
