require("dotenv").config();

const getEnv = (key) => {
  if (!process.env[key]) {
    console.log(`${key} NOT FOUND IN ENV`);
    return null;
  }
  return process.env[key];
};
const MAILER_CONFIG = {
  host: getEnv("SMTP_HOST"),
  port: Number(getEnv("SMTP_PORT")),
  secure: Boolean(getEnv("SMTP_SECURE")),
  service: getEnv("SMTP_SERVICE"),
  pass: getEnv("SMTP_PASS"),
  from: getEnv("SMTP_FROM"),
};

const corsOriginsRaw = getEnv("CORS_ORIGINS"); // 🌟 only call once
const CORS_ORIGINS = corsOriginsRaw ? corsOriginsRaw.split(",") : [];

module.exports = { MAILER_CONFIG, CORS_ORIGINS };
