# Mental Health Chatbot

A personalized mental health chatbot that interacts with users, analyzing their input (both text and sentiment), and provides tailored recommendations or coping strategies for managing mental health.

## Project Overview

This project consists of:

1. **Frontend (Next.js)**: A web interface for users to interact with the chatbot
2. **Backend (Flask API)**: RESTful API to process user input and generate responses
3. **Langchain Integration** (to be implemented separately): For retrieval-augmented generation using chat models and prompt templates

## Project Structure

```
mental-health-chatbot/
├── frontend/                      # Next.js Frontend
│   ├── public/                    # Static assets
│   ├── src/                       # Source code
│   │   ├── components/            # React components
│   │   ├── pages/                 # Next.js pages
│   │   ├── styles/                # Global styles
│   │   ├── utils/                 # Utility functions
│   │   └── context/               # React context
│   ├── .env.local                 # Environment variables
│   └── package.json               # Dependencies and scripts
│
├── backend/                       # Flask Backend
│   ├── app.py                     # Main Flask application
│   ├── config.py                  # Configuration settings
│   ├── routes/                    # API routes
│   ├── services/                  # Business logic
│   ├── utils/                     # Utility functions
│   ├── requirements.txt           # Python dependencies
│   └── .env                       # Environment variables
```

## Features

- Interactive chat interface
- Mood tracking and customized responses based on user's emotional state
- Persistent chat sessions
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- npm or yarn

### Setting Up the Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with the following content:

```
FLASK_ENV=development
SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:3000
```

6. Run the Flask server:

```bash
python app.py
```

The backend server will run on http://localhost:5000 by default.

### Setting Up the Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the frontend directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The frontend will be available at http://localhost:3000.

## Implementing the Langchain Integration

To implement the Langchain integration:

1. Add your Langchain code to the `services/chat_service.py` file in the backend.
2. Update the `process_chat_message` and `start_new_chat` functions to use your Langchain implementation.
3. Make sure to install the required dependencies:

```bash
pip install langchain openai chromadb faiss-cpu
```

4. Add your API keys and model configuration in the `.env` file:

```
OPENAI_API_KEY=your-openai-api-key
```

## Deployment

### Backend Deployment

The backend can be deployed to platforms like Heroku, AWS, or Google Cloud:

```bash
# Example for Heroku
heroku create mental-health-chatbot-api
git subtree push --prefix backend heroku main
```

### Frontend Deployment

The Next.js frontend can be deployed to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- This project was developed as a demonstration of using Next.js, Flask, and Langchain for building AI-powered chat applications.
