function generateSurveyHtml(result) {
  const pastelIcons = [
    "📘",
    "🎯",
    "🌸",
    "🧠",
    "💡",
    "📣",
    "🎨",
    "🛠️",
    "💼",
    "🕰️",
  ];

  // Group questions by section
  const sections = {};
  result.forEach((q, index) => {
    if (!sections[q.section]) {
      sections[q.section] = [];
    }
    sections[q.section].push({ ...q, originalIndex: index });
  });

  return `
    <div style="
      font-family: 'Segoe UI', Roboto, sans-serif;
      padding: 32px;
      background: linear-gradient(to bottom right, #F8F6FE, #fff);
      border-radius: 32px;
      border: 1px solid #ECECFF;
      box-shadow: 0 8px 24px rgba(26, 79, 255, 0.05);
      max-width: 840px;
      margin: 48px auto;
    ">
      ${Object.entries(sections)
        .map(([sectionName, questions]) => `
          <div style="
            background: linear-gradient(to bottom, #FFFFFF, #F9F9FF);
            border-radius: 20px;
            border: 2px solid #E0E0FF;
            padding: 28px;
            margin-bottom: 36px;
            box-shadow: 0px 4px 16px rgba(32, 12, 80, 0.12);
          ">
            <h2 style="
              font-size: 24px;
              color: #2B106A;
              font-weight: 800;
              margin-bottom: 20px;
              text-align: center;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 3px solid #D9D9FF;
              padding-bottom: 12px;
            ">
              ${sectionName}
            </h2>
            ${questions
              .map(
                (q) => `
                <div style="
                  background: linear-gradient(to bottom, #FFFFFF, #F3F3FF);
                  border-radius: 16px;
                  border: 1px solid #D9D9FF;
                  padding: 20px;
                  margin-bottom: 24px;
                  box-shadow: 0px 2px 8px rgba(32, 12, 80, 0.06);
                ">
                  <h3 style="
                    font-size: 18px;
                    color: #2B106A;
                    font-weight: 700;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  ">
                    <span style="font-size: 20px;">${
                      pastelIcons[q.originalIndex % pastelIcons.length]
                    }</span>
                    ${q.question}
                  </h3>
                  ${q.type === 'text' || q.type === 'email' 
                    ? `
                      <div style="
                        background: rgba(26, 79, 255, 0.08);
                        border: 2px solid #B8B8FF;
                        border-radius: 12px;
                        padding: 16px;
                        font-size: 16px;
                        font-weight: 600;
                        color: #1A4FFF;
                        word-wrap: break-word;
                      ">
                        ${q.answer || 'No answer provided'}
                      </div>
                    `
                    : `
                      <ul style="padding-left: 20px; margin: 0; list-style-type: disc;">
                        ${q.options
                          .map(
                            (opt) => `
                              <li style="
                                margin-bottom: 8px;
                                font-size: 15px;
                                font-weight: ${opt.isSelected ? "600" : "400"};
                                color: ${opt.isSelected ? "#1A4FFF" : "#555"};
                                background: ${
                                  opt.isSelected
                                    ? "rgba(26, 79, 255, 0.08)"
                                    : "transparent"
                                };
                                padding: 6px 12px;
                                border-radius: 8px;
                                display: inline-block;
                                margin-right: 8px;
                                border: ${
                                  opt.isSelected 
                                    ? "2px solid #B8B8FF" 
                                    : "1px solid transparent"
                                };
                              ">
                                ${opt.isSelected ? "✓ " : ""}${opt.text}
                              </li>
                            `
                          )
                          .join("")}
                      </ul>
                    `
                  }
                </div>
              `
              )
              .join("")}
          </div>
        `)
        .join("")}
    </div>
  `;
}

module.exports = generateSurveyHtml;
