const fs = require("fs");
const path = require("path");

const questionsPath = path.join(__dirname, "../config/questions.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

function getAnswerByQuestionId(qId, selectedIndexes) {
  const question = questions.find((q) => q.id === qId);
  if (!question) return null;

  return {
    question: question.question,
    options: question.options,
    selected: selectedIndexes.map((index) => question.options[index]),
  };
}

module.exports = { getAnswerByQuestionId };
