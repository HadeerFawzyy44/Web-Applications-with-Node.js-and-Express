const express = require("express");
const { greenBright } = require("chalk");
const authRoutes = express.Router();
const passport = require("passport");
const debug = require("debug")("app:authRoutes");
const { MongoClient,ObjectID } = require("mongodb");
const User = require('../models/user')

authRoutes.route("/register").post((req, res) => {
  //create user in database
  try{
  const { username, email, password } = req.body;
  const user = new User({username:username , email:email , password:password})
     user.save()
          .then(
            result=>{
              req.login(user, () => {
                res.redirect("/auth/profile");
              });
            }
          )
          .catch(
            err=> console.log(err)
          )
  }catch(error){
    debug(error.stack);
  }
});

authRoutes.route("/profile").get((req, res) => {
  const user = req.user;
  console.log(req.user);
  res.render("profile", { user });
});

authRoutes.route("/login").get((req,res)=>{
  res.render("signin");
})
.post(
  passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/',
  })
);



module.exports = authRoutes;
