const CasStrategy = require("passport-cas").Strategy;
const User = require("../models/User");

module.exports = new CasStrategy(
  {
    version: 'CAS3.0',
    ssoBaseURL: "https://cas-auth.rpi.edu/cas",
    serverBaseURL: "http://localhost:9000",
  },
  function (profile, done) {
    var login = profile.user.toLowerCase();
    var query = login + "@rpi.edu"; //Email Query

    console.log("Login: " + login);
    console.log("Query: " + query);

    User.findOne({ email: query }, function (err, user) {
      if (err) {
        console.log("Err");
        return done(err);
      }

      if (!user) {
        console.log("Unknown User");
        return done(null, false, { message: "Unknown user", email: query });
      }

      //Success
      console.log("Success");

      user.attributes = profile.attributes;

      return done(null, user);
    });
  }
);
