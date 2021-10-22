require("dotenv").config(); //pour utiliser le .env

const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose.connect("mongodb://localhost:27017/Vinted");

const signUpRoute = require("./routes/user/signUpRoute");
app.use(signUpRoute);

const loginRoute = require("./routes/user/loginRoute");
app.use(loginRoute);

const publishRoute = require("./routes/offer/publishRoute");
app.use(publishRoute);

const listOffers = require("./routes/offer/listOffers");
app.use(listOffers);

const deleteOfferRoute = require("./routes/offer/deleteOfferRoute");
app.use(deleteOfferRoute);

const modifyOfferRoute = require("./routes/offer/modifyOfferRoute");
app.use(modifyOfferRoute);

const offerDetailRoute = require("./routes/offer/offerDetailRoute");
app.use(offerDetailRoute);

app.all("*", (req, res) => {
  res.status(404).json("Page not found");
});
app.listen(3000, () => {
  console.log("VINTED server up and running.");
});
