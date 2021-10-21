const express = require("express");
const router = express.Router();
const Offer = require("../../models/Offer");
const cloudinary = require("cloudinary");

router.get("/offer/:id", async (req, res) => {
  console.log(req.params);
  try {
    const offerDetail = await Offer.findById(req.params.id).populate("owner", {
      account: 1,
    });
    res.json(offerDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
