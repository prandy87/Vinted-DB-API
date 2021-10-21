const express = require("express");
const router = express.Router();
const Offer = require("../../models/Offer");
const User = require("../../models/User");
const isAuthenticated = require("../../middleware/isAuthenticated");
const cloudinary = require("cloudinary").v2;

router.put("/offer/update", isAuthenticated, async (req, res) => {
  try {
    console.log(req.fields);
    if (req.fields) {
      const offerToUpdate = await Offer.findByIdAndUpdate(
        req.fields._id,
        req.fields
      );
      //let pictureToUpload = req.files.picture.path;

      //const loadedPicture = await cloudinary.uploader.upload(pictureToUpload, {
      //   folder: `/Vinted/offers/${offerToUpdate._id}`,
      // });
      // offerToUpdate.product_image = loadedPicture.secure_url;
      await offerToUpdate.save();
      if (offerToUpdate) {
        res.status(200).json(offerToUpdate);
      } else {
        res.status(404).json("Offer not found");
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
