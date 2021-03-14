// Checks if User is logged in otherwise redirects the user

isLoggedIn = function (req, res, next) {
    console.log(req.user)
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("http://localhost:3000/login");
    }
}

module.exports = isLoggedIn;