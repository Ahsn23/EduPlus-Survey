const { MAILER_CONFIG } = require("../config/config");
const MailService = require("../service/mailService");
const { getAnswerByQuestionId } = require("../service/startSurveyService");
const generateSurveyHtml = require("../content/generateSurveyHtml");

const handleSurvey = async (req, res) => {
  const responses = req.body.responses;
  const recipientEmail = req.body.email;

  const result = responses.map(({ questionId, selectedIndexes, otherText }) => {
    const questionObj = getAnswerByQuestionId(questionId, selectedIndexes);
    const options = [...questionObj.options];

    const hasOther = selectedIndexes.includes(options.length - 1);
    if (hasOther && otherText) {
      options[options.length - 1] = `${
        options[options.length - 1]
      }: ${otherText}`;
    }

    const optionsWithHighlight = options.map((opt, index) => ({
      text: opt,
      isSelected: selectedIndexes.includes(index),
    }));

    return {
      questionId,
      question: questionObj.question,
      options: optionsWithHighlight,
    };
  });

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
    to: MAILER_CONFIG.clientEmail, 
    subject: "📋 Survey Submission Results",
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
