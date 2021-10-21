const express = require("express");
const router = express.Router();
const Offer = require("../../models/Offer");
const cloudinary = require("cloudinary");

router.get("/offers", async (req, res) => {
  //console.log(req.fields);
  console.log(req.query);

  const filters = {};

  if (req.query.title) {
    filters["product_name"] = new RegExp(req.query.title, "i");
  }
  if (req.query.priceMax) {
    filters["product_price"] = { $lte: Number(req.query.priceMax) };
  }
  if (req.query.priceMin) {
    filters["product_price"] = { $gte: Number(req.query.priceMin) };
  }
  if (req.query.priceMin && req.query.priceMax) {
    filters["product_price"] = {
      $gte: Number(req.query.priceMin),
      $lte: Number(req.query.priceMax),
    };
  }

  console.log(filters);

  const sort = {};

  if (req.query.sort) {
    if (req.query.sort === "price-desc" || req.query.sort === "price-asc") {
      sort["product_price"] = req.query.sort.replace("price-", "");
    }
    if (req.query.sort === "asc" || req.query.sort === "desc") {
      sort["product_name"] = req.query.sort;
    }
  }
  console.log(sort);

  try {
    if (!req.query.page) {
      const offers = await Offer.find(filters)
        .select("product_name product_price")
        .sort(sort)
        .limit(4);
      res.json(offers);
    } else {
      const offers = await Offer.find(filters)
        .select("product_name product_price")
        .limit(4)
        .sort(sort)
        .skip(Number((req.query.page - 1) * 4));
      res.json(offers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
