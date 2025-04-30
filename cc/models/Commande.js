const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
});

module.exports = mongoose.model('Commande', commandeSchema);