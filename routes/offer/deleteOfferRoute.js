const express = require("express");
const router = express.Router();
const Offer = require("../../models/Offer");
const User = require("../../models/User");
const isAuthenticated = require("../../middleware/isAuthenticated");

router.delete("/offer/delete", isAuthenticated, async (req, res) => {
  console.log(req.fields);
  try {
    const deleteOffer = await Offer.findOneAndDelete({ _id: req.fields._id });
    res.json(
      `Your offer number ${deleteOffer._id} has succesfully been deleted.`
    );
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
