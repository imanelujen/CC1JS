const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const LigneCmd = require('../models/ligneCommande'); // Corrected

router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find().populate('client');
    // Fetch lignecmds for each commande
    const commandesWithLignes = await Promise.all(
      commandes.map(async (commande) => {
        const lignes = await LigneCmd.find({ commande: commande._id }).populate('produit');
        return { ...commande.toObject(), lignes };
      })
    );
    res.json(commandesWithLignes);
  } catch (error) {
    console.error('Error fetching commandes:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { client, date, lignes } = req.body;
    const commande = new Commande({ client, date });
    await commande.save();

    for (let ligne of lignes) {
      const ligneCmd = new LigneCmd({
        qte: ligne.qte,
        commande: commande._id,
        produit: ligne.produit
      });
      await ligneCmd.save();
    }

    res.json(commande);
  } catch (error) {
    console.error('Error creating commande:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;