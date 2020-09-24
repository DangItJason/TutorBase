const CasStrategy = require('passport-cas').Strategy;

module.exports = new CasStrategy({
    version: 'CAS3.0',
    ssoBaseURL: 'https://cas-auth.rpi.edu/cas',
    serverBaseURL: 'http://localhost:9000'
},
    function (username, profile, done) {
        console.log(usename);
        console.log(profile);
        done(null, username);
    }
);
