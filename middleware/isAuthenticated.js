const express = require("express");
const User = require("../models/User");

//finds out if a would-be offer poster has an account on Vinted DataBase.
//by checking if user has a token from Vinted DataBase.

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    }).select("account _id");

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json("unauthorized");
    }
  } catch (error) {
    res.status(401).json("unauthorized");
  }
};

module.exports = isAuthenticated;

// On crée une clé "user" dans req.
//La route dans laquelle le middleware est appelé pourra avoir accès à req.user
