const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const handleSurvey = require("./src/controller/handleSurvey");
const { CORS_ORIGINS } = require("./src/config/config");
const questions = require("./src/config/questions.json");

const app = express();
const port = process.env.PORT || 3002;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (CORS_ORIGINS.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());

const surveyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    error: "Too many submissions from this IP, please try again later",
  },
});

// Endpoint to get survey questions
app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/start-survey", surveyLimiter, handleSurvey);

app.listen(port, () => {
  console.log(`Survey app listening on port ${port}`);
});
