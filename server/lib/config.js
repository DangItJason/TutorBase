const nodemailer = require("nodemailer");
const secrets = require("./secrets");

const SMTP_TRANSPORT = {
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: 'email@gmail.com',
         pass: secrets.EMAILPASS
     }
};

module.exports = {
  transport: SMTP_TRANSPORT,
  mailOptions: {
    from: '"TutorBase Team" <email@gmail.com>',
  },
  debugEnabled: false,
};
