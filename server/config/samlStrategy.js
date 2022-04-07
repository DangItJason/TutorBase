const SamlStrategy = require('passport-saml').Strategy;
const User = require("../models/User");

module.exports = new SamlStrategy(
	{
		callbackUrl: process.env.APP_BASE_URL,
		entryPoint: process.env['SAML_ENTRY_POINT'],
		issuer: process.env['SAML_ISSUER'],
		identifierFormat: null,
		decryptionPvk: fs.readFileSync(__dirname + '/saml/key.pem', 'utf8'),
		privateCert: fs.readFileSync(__dirname + '/saml/key.pem', 'utf8'),
		cert: fs.readFileSync(__dirname + '/saml/idp_cert.pem', 'utf8'),
		validateInResponseTo: false,
		disableRequestedAuthnContext: true
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
			console.log("Success");
			user.attributes = profile.attributes;
			return done(null, user);
		});
	}
);
