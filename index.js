const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const handleSurvey = require("./src/controller/handleSurvey");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const surveyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    error: "Too many submissions from this IP, please try again later",
  },
});

app.post("/start-survey", surveyLimiter, handleSurvey);

app.listen(port, () => {
  console.log(`Survey app listening on port ${port}`);
});
