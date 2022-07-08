const express = require("express");
const path = require("path");
const debug = require("debug")("app:productsrouter");
const { MongoClient, ObjectID } = require("mongodb");
const Product = require("../models/product");
const productsrouter = express.Router();

productsrouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
});
productsrouter.route("/").get((req, res) => {
  try {
    Product.find({}).then((products) => {
      res.render("products", { products });
    });
  } catch (e) {
    debug(e.stack);
  }
});

productsrouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const Id = new ObjectID(id);
  try {
    Product.findById(Id).then((product) => {
      res.render("product", { product });
    });
  } catch (error) {
    debug(error.stack);
  }
});

module.exports = productsrouter;
