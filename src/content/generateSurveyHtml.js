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
      ${result
        .map(
          (q, index) => `
          <div style="
            background: linear-gradient(to bottom, #FFFFFF, #F3F3FF);
            border-radius: 20px;
            border: 1px solid #D9D9FF;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0px 2px 10px rgba(32, 12, 80, 0.08);
          ">
            <h3 style="
              font-size: 20px;
              color: #2B106A;
              font-weight: 700;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              gap: 10px;
            ">
              <span style="font-size: 22px;">${
                pastelIcons[index % pastelIcons.length]
              }</span>
              ${q.question}
            </h3>
            <ul style="padding-left: 20px; margin: 0; list-style-type: disc;">
              ${q.options
                .map(
                  (opt) => `
                    <li style="
                      margin-bottom: 10px;
                      font-size: 15px;
                      font-weight: ${opt.isSelected ? "600" : "400"};
                      color: ${opt.isSelected ? "#1A4FFF" : "#555"};
                      background: ${
                        opt.isSelected
                          ? "rgba(26, 79, 255, 0.05)"
                          : "transparent"
                      };
                      padding: 4px 8px;
                      border-radius: 8px;
                      display: inline-block;
                    ">
                      ${opt.text}
                    </li>
                  `
                )
                .join("")}
            </ul>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

module.exports = generateSurveyHtml;
