const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require('debug')('app:localStrategy');
const { MongoClient } = require('mongodb');
module.exports = function LocalStrategy() {
  //this is the function which will configure it the user can or can not login
  passport.use(
    new Strategy(
      {
        usernameFiled: "username",
        passwordFiled: "password",
      },
      (username, password, done) => {
        const url="mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority" 
        const dbName='ONLINESTORE';
        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
         } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
