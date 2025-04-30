const mongoose = require('mongoose');

const ligneCmdSchema = new mongoose.Schema({
  qte: { type: Number, required: true },
  commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande', required: true },
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true }
});

module.exports = mongoose.model('ligneCommande', ligneCmdSchema);