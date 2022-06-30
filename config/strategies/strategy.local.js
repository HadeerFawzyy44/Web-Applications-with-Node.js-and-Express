const passport = require("passport");
const { Strategy } = require("passport-local");

module.exports = function LocalStrategy() {
  //this is the function which will configure it the user can or can not login
  passport.use(
    new Strategy(
      {
        usernameFiled: "username",
        passwordFiled: "password",
      },
      (username, password, done) => {
        const user = { username, password, name: "johm" };
        done(null, user);
      }
    )
  );
};
