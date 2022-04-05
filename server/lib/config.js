const nodemailer = require("nodemailer");

const SMTP_TRANSPORT = {
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAILPASS
     }
};

module.exports = {
  transport: SMTP_TRANSPORT,
  mailOptions: {
    from: '"TutorBase Team" <email@gmail.com>',
  },
  debugEnabled: false,
};
