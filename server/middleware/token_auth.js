// middleware.js
const jwt = require('jsonwebtoken');
const secret = 'elonmuskismydaddy';
const parseCookies = require("../lib/parseCookies");

const withAuth = function (req, res, next) {

  const token = parseCookies(req.headers.cookie).token
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;