const express = require("express");
const router = express.Router();

const User = require("../../models/User.js");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const cloudinary = require("cloudinary").v2;

router.post("/user/signup", async (req, res) => {
  if (req.fields.email && req.fields.username) {
    try {
      const registeredEmail = await User.findOne({ email: req.fields.email });
      if (!registeredEmail) {
        try {
          const salt = uid2(16); //ou 64
          const hash = SHA256(req.fields.password + salt).toString(encBase64);
          const token = uid2(16); //ou 64

          const newUser = new User({
            email: req.fields.email,
            account: {
              username: req.fields.username,
              phone: req.fields.phone,
            },
            token: token,
            hash: hash,
            salt: salt,
          });
          let pictureToUpload = req.files.avatar.path;
          const loadedPicture = await cloudinary.uploader.upload(
            pictureToUpload,
            {
              folder: `/Vinted/users/${newUser._id}`,
            }
          );
          newUser.account.avatar = loadedPicture.secure_url;
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            token: newUser.token,
            account: newUser.account,
          });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      } else {
        res.status(400).json("email provided is already registered");
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.status(400).json("Please provide a username and email");
  }
});

module.exports = router;

//Modifier votre route /signup pour permettre l'upload d'une photo de profil
