const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require("debug")("app:localStrategy");
const { MongoClient } = require("mongodb");
const user = require("../../models/user");
module.exports = function LocalStrategy() {
  //this is the function which will configure it the user can or can not login
  passport.use(
    new Strategy(
      {
        usernameFiled: "username",
        passwordFiled: "password",
      },
      (username, password, done) => {
        try {
          user.findOne({ username: username }).then((user) => {
            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
