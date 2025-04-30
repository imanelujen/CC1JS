const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

router.get('/', async (req, res) => {
  const produits = await Produit.find();
  res.json(produits);
});

router.post('/', async (req, res) => {
  const produit = new Produit(req.body);
  await produit.save();
  res.json(produit);
});

module.exports = router;