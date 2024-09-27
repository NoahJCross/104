const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  res.json(product);
});

module.exports = router;
