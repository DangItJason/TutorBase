const nodemailer = require("nodemailer");

const SMTP_TRANSPORT = {
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: 'entityc22@gmail.com',
         pass: 'pjqlgbfamedvcwmr'
     }
};

module.exports = {
  transport: SMTP_TRANSPORT,
  mailOptions: {
    from: '"TutorBase Team" <entityc22@gmail.com>',
  },
  debugEnabled: false,
};
