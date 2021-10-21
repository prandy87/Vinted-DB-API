const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/login", async (req, res) => {
  console.log(req.fields);

  if (req.fields.email && req.fields.password) {
    const findUser = await User.findOne({ email: req.fields.email });
    if (!findUser) {
      res.status(400).json("invalid email");
    } else {
      try {
        if (
          findUser.hash !==
          SHA256(req.fields.password + findUser.salt).toString(encBase64)
        ) {
          res.status(401).json("invalid password"); //401 = non-authorized
        } else {
          res.status(200).json({
            _id: findUser._id,
            token: findUser.token,
            account: findUser.account,
          });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } else {
    res.status(400).json("Please fill in your email and password");
  }
});

module.exports = router;

//ajouter try catch manquants à chaque fois qu'on interroge le serveur
