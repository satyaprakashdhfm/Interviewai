# InterviewAI

An intelligent interview preparation platform that helps users practice and improve their interviewing skills using AI technology.

## Project Overview

InterviewAI is a full-stack web application that provides users with an interactive interview practice environment. The application uses artificial intelligence to conduct mock interviews, provide real-time feedback, and help users improve their interview performance.

## Features

- **AI-Powered Interviews**: Practice interviews with AI-generated questions
- **Real-time Feedback**: Get instant feedback on your responses
- **User Authentication**: Secure login and signup functionality
- **Profile Management**: Track your progress and interview history
- **Interactive UI**: Modern and responsive user interface
- **Results Analysis**: Detailed analysis of your interview performance

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API communication

### Backend
- Node.js
- Flask (Python)
- MongoDB (Database)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── Cards/         # Profile information components
│   │   ├── Hero/          # Landing page hero section
│   │   ├── Instructions/  # Interview instructions
│   │   ├── Interview/     # Interview interface
│   │   ├── Login/        # Authentication components
│   │   └── ...
├── server/                # Backend Node.js server
│   ├── models/           # Database models
│   └── utilities.js      # Helper functions
└── app.py                # Flask application
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/satyaprakashdhfm/Interviewai.git
cd Interviewai
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Install Python dependencies (if using Flask backend):
```bash
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend development server:
```bash
cd client
npm start
```

2. Start the backend server:
```bash
cd server
npm start
```

3. Start the Flask server (if applicable):
```bash
python app.py
```

The application will be available at `http://localhost:3000`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Satya Prakash - [GitHub](https://github.com/satyaprakashdhfm)

Project Link: https://github.com/satyaprakashdhfm/Interviewai