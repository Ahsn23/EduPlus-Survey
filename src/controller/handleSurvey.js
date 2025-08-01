const { MAILER_CONFIG } = require("../config/config");
const MailService = require("../service/mailService");
const { getAnswerByQuestionId } = require("../service/startSurveyService");
const generateSurveyHtml = require("../content/generateSurveyHtml");

const handleSurvey = async (req, res) => {
  const responses = req.body.responses;
  const recipientEmail = req.body.email;

  const result = responses.map(({ questionId, selectedIndexes, otherText, textAnswer }) => {
    const questionObj = getAnswerByQuestionId(questionId, selectedIndexes, textAnswer);
    
    if (!questionObj) {
      return null;
    }

    // Handle text-based questions
    if (questionObj.type === 'text' || questionObj.type === 'email') {
      return {
        questionId,
        question: questionObj.question,
        section: questionObj.section,
        type: questionObj.type,
        answer: questionObj.answer,
        options: null
      };
    }

    // Handle choice-based questions
    const options = [...questionObj.options];
    const hasOther = selectedIndexes && selectedIndexes.includes(options.length - 1);
    if (hasOther && otherText) {
      options[options.length - 1] = `${
        options[options.length - 1]
      }: ${otherText}`;
    }

    const optionsWithHighlight = options.map((opt, index) => ({
      text: opt,
      isSelected: selectedIndexes ? selectedIndexes.includes(index) : false,
    }));

    return {
      questionId,
      question: questionObj.question,
      section: questionObj.section,
      type: questionObj.type,
      options: optionsWithHighlight,
    };
  }).filter(Boolean); // Remove any null entries

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #F8F6FE; padding: 40px; border-radius: 24px;">
    <center>
      <h2 style="
        color: #2B106A;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 12px;
        letter-spacing: 0.5px;
      ">
        💌 EduPulse Survey Submission
      </h2>
      <p style="
        font-size: 14px;
        color: #555;
        margin-top: 0;
        margin-bottom: 10px;
      ">
        Thank you for sharing your thoughts! Here's what you submitted:
      </p>
    </center>
    ${generateSurveyHtml(result)}
  </div>
`;

  const mailDetails = {
    from: MAILER_CONFIG.from,
    to: "hello@edupulse.co.uk", 
    subject: "📋 EduPlus Survey Submission Results",
    html: htmlContent,
  };

  try {
    await MailService.sendMail(mailDetails);
    res.json({
      message: "Survey submitted and emailed successfully 💌",
      surveyResult: result,
    });
  } catch (err) {
    res.status(500).json({
      error: "Survey submission failed",
      details: err.message,
    });
  }
};

module.exports = handleSurvey;
