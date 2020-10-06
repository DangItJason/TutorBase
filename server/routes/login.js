var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcrypt = require("bcryptjs");
var passport = require("passport");

passport.use(new (require("passport-cas").Strategy)(
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
          return done(null, false, { message: "Unknown user" });
        }
        //Success
        console.log("Success");

        user.attributes = profile.attributes;
        return done(null, user);
      });
    }
  )
);

// router.get("/", passport.authenticate("cas"), function (req, res) {
//   User.findOne({
//     email: req.body.email,
//   }).then(function (user) {
//     if (user) {
//       bcrypt.compare(req.body.password, user.password, function (err, result) {
//         if (result == true) {
//           console.log("Login success...");
//           return res.json({ message: "success" });
//         } else {
//           console.log("Incorrect password...");
//           return res.json({ message: "failure" });
//         }
//       });
//     }
//     if (!user) {
//       console.log("User does not exist");
//       return res.json({ message: "dne" }); //does not exist
//     }
//   });
// });

// router.get('/', passport.authenticate('cas'), function(err, user, info) {
//   if (err) {
//     return next(err);
//   }

//   if (!user) {
//     req.session.messages = info.message;
//     return res.redirect('/signup');
//   }

//   req.logIn(user, function (err) {
//     if (err) {
//       return next(err);
//     }

//     req.session.messages = '';
//     return res.redirect('/home');
//   });
// })

router.get("/", (req, res, next) => {
  passport.authenticate('cas', function (err, user, info) {
    if (err) {
      return next(err);
    }
  
    if (!user) {
      req.session.messages = info.message;
      return res.redirect('/signup');
    }
  
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
  
      req.session.messages = '';
      return res.redirect('http://localhost:3000/clientDashboard');
    });
  })(req, res, next);
});


module.exports = router;
