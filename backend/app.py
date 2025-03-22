from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from routes.chat_routes import chat_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for Next.js frontend
CORS(app, resources={r"/api/*": {"origins": Config.FRONTEND_URL}})

# Register blueprints
app.register_blueprint(chat_bp, url_prefix='/api/chat')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Mental Health Chatbot API is running"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port, debug=Config.DEBUG)