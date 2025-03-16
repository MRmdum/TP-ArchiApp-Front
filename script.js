let msgs = [];

function fetchMessages() {
  return fetch('https://ebbd671e-5e36-4e42-a6a8-3a73079d02ea-00-2dt89h0rs1mlf.worf.replit.dev/msg/getAll')
    .then(response => response.json())
    .then(data => {
      msgs = data.map(item => ({
        msg: item.text,
        pseudo: item.pseudo,
        date: new Date(item.date).toLocaleString()
      }));
    })
    .catch(error => console.error("Erreur lors de la récupération des messages :", error));
}

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

  // Initial update
  fetchMessages().then(() => {
    if (msgs.length > 0) {
      alert(msgs[0].msg);
    } else {
      alert("Aucun message reçu.");
    }
  });
  update(msgs);

  // Update button event listener
  updateButton.addEventListener('click', function() {
    fetchMessages();
    update(msgs);
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
    const text = document.getElementById('messageText').value;
    const pseudo = document.getElementById('pseudoInput').value || 'Anonymous';

    if (text.trim() !== '') {
      // Send message to API
      fetch('https://ebbd671e-5e36-4e42-a6a8-3a73079d02ea-00-2dt89h0rs1mlf.worf.replit.dev/msg/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, pseudo })
      })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1) {
          // Clear the input field
          document.getElementById('messageText').value = '';
          // Refresh messages
          fetchMessages().then(() => update(msgs));
        }
      })
      .catch(error => console.error('Error:', error));
    }
  });
});
