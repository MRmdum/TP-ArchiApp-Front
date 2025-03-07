
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Pour permettre les requêtes cross-origin
app.use(bodyParser.json());
app.use(express.static('./')); // Servir les fichiers statiques

// Stockage des messages en mémoire
let messages = [
  { "msg": "Hello World", "pseudo": "User1", "date": new Date().toLocaleString() },
  { "msg": "Bienvenue sur le forum", "pseudo": "Admin", "date": new Date().toLocaleString() },
  { "msg": "J'adore cette messagerie simple!", "pseudo": "User3", "date": new Date().toLocaleString() }
];

// Routes API
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { msg, pseudo } = req.body;
  
  if (!msg || msg.trim() === '') {
    return res.status(400).json({ error: 'Le message ne peut pas être vide' });
  }
  
  const newMessage = {
    msg,
    pseudo: pseudo || 'Anonymous',
    date: new Date().toLocaleString()
  };
  
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
