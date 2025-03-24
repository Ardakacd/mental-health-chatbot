from flask import Blueprint, request, jsonify
from services.chat_service import process_chat_message, start_new_chat

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
def chat_message():
    """
    Process a new chat message from the user
    
    Expects JSON with:
    {
        "message": "User's message",
        "chat_id": "unique_chat_id", (optional, if continuing a conversation)
        "mood": "happy|sad|neutral|anxious|stressed" (optional)
    }
    """
    data = request.json
    
    if not data or 'message' not in data:
        return jsonify({"error": "Message is required"}), 400
    
    user_message = data.get('message')
    chat_id = data.get('chat_id')
    mood = data.get('mood', 'neutral')
    
    # Process the message using the chat service
    # This is where you would later integrate with Langchain
    response = process_chat_message(user_message, chat_id, mood)
    
    return jsonify(response), 200

@chat_bp.route('/new', methods=['POST'])
def new_chat():
    """
    Start a new chat session
    
    Expects JSON with:
    {
        "initial_mood": "happy|sad|neutral|anxious|stressed" (optional)
    }
    """
    data = request.json or {}
    initial_mood = data.get('initial_mood', 'z')
    
    # Create a new chat session
    chat_data = start_new_chat(initial_mood)
    
    return jsonify(chat_data), 201

@chat_bp.route('/<chat_id>/history', methods=['GET'])
def get_chat_history(chat_id):
    """
    Get the history of a specific chat session
    
    This is a placeholder - in a real implementation, you would fetch
    the chat history from a database
    """
    # For now, return dummy data
    history = [
        {"role": "assistant", "content": "Hello! How are you feeling today?"},
        {"role": "user", "content": "I'm feeling a bit anxious."},
        {"role": "assistant", "content": "I'm sorry to hear that. Would you like to talk about what's making you anxious?"}
    ]
    
    return jsonify({"chat_id": chat_id, "history": history}), 200