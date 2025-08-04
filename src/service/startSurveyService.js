const fs = require("fs");
const path = require("path");

const questionsPath = path.join(__dirname, "../config/questions.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

function getAnswerByQuestionId(qId, selectedIndexes, textAnswer) {
  const question = questions.find((q) => q.id === qId);
  if (!question) return null;

  // Handle text-based questions (text, email)
  if (question.type === 'text' || question.type === 'email') {
    return {
      question: question.question,
      section: question.section,
      type: question.type,
      answer: textAnswer || '',
      options: null
    };
  }

  // Handle choice-based questions (single-choice, multiple-choice)
  if (question.options && selectedIndexes) {
    return {
      question: question.question,
      section: question.section,
      type: question.type,
      options: question.options,
      selected: selectedIndexes.map((index) => question.options[index]),
    };
  }

  return {
    question: question.question,
    section: question.section,
    type: question.type,
    options: question.options || null,
    selected: []
  };
}

module.exports = { getAnswerByQuestionId };
