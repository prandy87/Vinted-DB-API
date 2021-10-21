const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const Offer = require("../../models/Offer.js");
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../../middleware/isAuthenticated");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const newOffer = new Offer({
      product_name: req.fields.title,
      product_description: req.fields.description,
      product_price: req.fields.price,
      product_details: [
        { MARQUE: req.fields.brand },
        { TAILLE: req.fields.size },
        { ÉTAT: req.fields.condition },
        { COULEUR: req.fields.color },
        { EMPLACEMENT: req.fields.city },
      ],

      owner: req.user,
    });
    let pictureToUpload = req.files.picture.path;

    const loadedPicture = await cloudinary.uploader.upload(pictureToUpload, {
      folder: `/Vinted/offers/${newOffer._id}`,
    });
    newOffer.product_image = loadedPicture.secure_url;

    await newOffer.save();

    res.json(newOffer);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
