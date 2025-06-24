const nodemailer = require("nodemailer");
const { MAILER_CONFIG } = require("../config/config");

const transporter = nodemailer.createTransport({
  service: MAILER_CONFIG.service,
  host: "mail.esparkconsultants.com",
  port: 465, // Typically 465 for SSL/TLS
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
