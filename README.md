# EduPulse Survey Backend

A comprehensive survey system for educational institutions built with Node.js and Express.

## Features

- ✅ **Comprehensive Survey Questions** - Organized into sections (Basic Information, Marketing & Engagement, Interest in EduPulse, Final Opt-in & CTA)
- ✅ **Multiple Question Types** - Text, Email, Single-choice, Multiple-choice
- ✅ **Email Integration** - Automatic email sending to hello@edupulse.co.uk
- ✅ **Rate Limiting** - Prevents spam submissions
- ✅ **CORS Support** - Configurable cross-origin requests
- ✅ **Beautiful HTML Email Templates** - Responsive email design with sections and highlighting

## Question Structure

### Basic Information
1. School Name (Required) - Text input
2. School Type - Single choice (Primary, Secondary, Special Education, Independent, Academy Trust, Other)
3. School Location - Text input
4. Name & Role in School - Text input
5. Email Address (Required) - Email input

### Marketing & Engagement
6. How does your school handle marketing? - Multiple choice
7. What marketing channels do you use? - Multiple choice
8. What are your biggest marketing challenges? - Multiple choice

### Interest in EduPulse
9. What EduPulse features appeal to you? - Multiple choice
10. Interest in Trust-wide discount? - Single choice
11. Open to call/demo? - Single choice

### Final Opt-in & CTA
12. Receive updates and tips? - Single choice

## API Endpoints

### GET `/questions`
Returns all survey questions with their structure and options.

### POST `/start-survey`
Submit survey responses.

**Request Body:**
```json
{
  "email": "user@school.edu",
  "responses": [
    {
      "questionId": "q1",
      "textAnswer": "School Name"
    },
    {
      "questionId": "q2",
      "selectedIndexes": [0]
    },
    {
      "questionId": "q7",
      "selectedIndexes": [5],
      "otherText": "Custom channel description"
    }
  ]
}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_SERVICE=gmail
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com

# Email destination (fixed to hello@edupulse.co.uk)
CLIENT_EMAIL=hello@edupulse.co.uk

# CORS Origins
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eSpark-Consultants/lucy-landing-be.git
   cd lucy-landing-be
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your SMTP credentials
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will run on port 3000.

## Usage

### Testing with curl

Get questions:
```bash
curl http://localhost:3000/questions
```

Submit survey:
```bash
curl -X POST http://localhost:3000/start-survey \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@school.edu",
    "responses": [
      {"questionId": "q1", "textAnswer": "Test School"},
      {"questionId": "q2", "selectedIndexes": [0]}
    ]
  }'
```

## Email Features

- **Automatic routing** to hello@edupulse.co.uk
- **Section-based organization** in email templates
- **Visual highlighting** of selected options
- **Professional styling** with EduPulse branding
- **Responsive design** for all email clients

## Rate Limiting

- **Window:** 15 minutes
- **Max requests:** 3 per IP
- Prevents spam and abuse

## CORS Configuration

Configure allowed origins in the `CORS_ORIGINS` environment variable for cross-origin requests.

## File Structure

```
├── src/
│   ├── config/
│   │   ├── config.js          # Environment configuration
│   │   └── questions.json     # Survey questions data
│   ├── controller/
│   │   └── handleSurvey.js    # Main survey handling logic
│   ├── service/
│   │   ├── mailService.js     # Email sending service
│   │   └── startSurveyService.js  # Question processing
│   └── content/
│       └── generateSurveyHtml.js  # HTML email generation
├── index.js                   # Express server setup
├── package.json
└── .env.example
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to eSpark Consultants and EduPulse.
