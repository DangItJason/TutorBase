const nodemailer = require('nodemailer');

let config = require('./config.js');

function sendEmail(to, message, subject) {
  
  const transporter = nodemailer.createTransport(config.transport);
    const mailOptions = {
      to,
      subject: subject,
      html: message,
      ...config.mailOptions,
    };

    return new Promise((resolve, reject) => transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);
      return resolve(info);
    }));

  // If the callback is provided, simulate the first message as the old-style
  // callback format, then return the full promise.
  if (cb) {
    return p.then((info) => {
      cb(null, info[0]);
      return info;
    }, (err) => {
      cb(err);
      return err;
    });
  }

  return p;
}
module.exports = {
  send: sendEmail
};