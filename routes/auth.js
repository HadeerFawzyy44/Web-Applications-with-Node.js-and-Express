const express = require("express");
const { greenBright } = require("chalk");
const authRoutes = express.Router();
const passport = require("passport");
const debug = require("debug")("app:authRoutes");
const { MongoClient } = require("mongodb");

authRoutes.route("/SignUp").post((req, res) => {
  //create user in database
  const { username, email, password } = req.body;
  let url =
    "mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority";
  const dbName = "ONLINESTORE";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to the mongo DB");

      const db = client.db(dbName);
      const user = { username, email, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);
      // const userinfo = await db.collection('users').findOne({ _id:new ObjectID(results.insertedId) })
      // debug(userinfo)
      req.login(results.ops[0], () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

authRoutes.route("/profile").get((req, res) => {
  const user = req.user;
  console.log(req.user);
  res.render("profile", { user });
});

module.exports = authRoutes;
