const nodemailer = require("nodemailer");
const { MAILER_CONFIG } = require("../config/config");

const transporter = nodemailer.createTransport({
  service: MAILER_CONFIG.service,
  host: MAILER_CONFIG.host,
  port: MAILER_CONFIG.port, // Typically 465 for SSL/TLS
  secure: true, // true for SSL
  auth: {
    user: MAILER_CONFIG.from,
    pass: MAILER_CONFIG.pass,
  },  
});

class MailService {
  sendMail(mailDetails) {
    try {
      return transporter.sendMail(mailDetails);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = new MailService();
