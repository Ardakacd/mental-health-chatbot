import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.environ.get('FLASK_ENV', 'development') == 'development'
    
    # CORS settings
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    
    # Add Langchain/OpenAI settings here
    # OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')