const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/cc', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/clients', require('./routes/Client'));
app.use('/api/produits', require('./routes/produits'));
app.use('/api/commandes', require('./routes/Commande'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
//console.log('Current directory:', cc);