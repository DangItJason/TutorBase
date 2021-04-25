// middleware.js
const jwt = require('jsonwebtoken');
const secret = require("../config/secret");
const parseCookies = require("../lib/parseCookies");

const withAuth = function (req, res, next) {
  const token = parseCookies(req.headers.cookie).token
  // const token = req.cookies.token

  if (!token) {
    console.log('Unauthorized: No token provided');
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log('Unauthorized: No token provided2');
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        console.log('Authorized');
        req.userid = decoded.userid;
        next();
      }
    });
  }
}

module.exports = withAuth;