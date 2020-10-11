const CasStrategy = require("passport-cas").Strategy;

module.exports = new CasStrategy(
  {
    ssoBaseURL: "https://cas-auth.rpi.edu/cas",
    serverBaseURL: "http://localhost:9000/",
  },
  function (login, done) {
    User.findOne({ login: login }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Unknown user" });
      }
      return done(null, user);
    });
  }
);
