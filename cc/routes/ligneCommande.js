// routes/ligneCommande.js
const express = require('express');
const router = express.Router();
const LigneCmd = require('../models/ligneCommande');

// GET all LigneCmd entries
router.get('/', async (req, res) => {
  try {
    const ligneCmds = await LigneCmd.find().populate('produit').populate('commande');
    res.json(ligneCmds);
  } catch (error) {
    console.error('Error fetching ligneCommandes:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT to update a LigneCmd (e.g., update quantity)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qte } = req.body;
    if (typeof qte !== 'number' || qte < 0) {
      return res.status(400).json({ error: 'Invalid quantity value' });
    }
    const updatedLigneCmd = await LigneCmd.findByIdAndUpdate(
      id,
      { qte },
      { new: true }
    ).populate('produit');
    if (!updatedLigneCmd) {
      return res.status(404).json({ error: 'LigneCmd not found' });
    }
    res.json(updatedLigneCmd);
  } catch (error) {
    console.error('Error updating ligneCommande:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;