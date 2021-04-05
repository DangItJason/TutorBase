const nodemailer = require("nodemailer");

const SMTP_TRANSPORT = {
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: 'EMAIL@gmail.com',
         pass: 'APPSPECIFICPASSWORD'
     }
};

module.exports = {
  transport: SMTP_TRANSPORT,
  mailOptions: {
    from: '"TutorBase Team" <EMAIL@gmail.com>',
  },
  debugEnabled: false,
};
