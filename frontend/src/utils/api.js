import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send a message to the chatbot
 * 
 * @param {Object} data - Message data
 * @param {string} data.message - User's message
 * @param {string|null} data.chat_id - Chat session ID (optional)
 * @param {string} data.mood - User's mood (optional)
 * @returns {Promise<Object>} - Response data
 */
export const sendMessage = async (data) => {
  try {
    const response = await api.post('/chat/message', data);
    return response.data;
  } catch (error) {
    console.error('API Error - Send Message:', error);
    throw error;
  }
};

/**
 * Start a new chat session
 * 
 * @param {Object} data - Initial chat data
 * @param {string} data.initial_mood - User's initial mood (optional)
 * @returns {Promise<Object>} - New chat session data
 */
export const startNewChat = async (data = {}) => {
  try {
    const response = await api.post('/chat/new', data);
    return response.data;
  } catch (error) {
    console.error('API Error - New Chat:', error);
    throw error;
  }
};

/**
 * Get chat history for a specific chat session
 * 
 * @param {string} chatId - Chat session ID
 * @returns {Promise<Object>} - Chat history data
 */
export const getChatHistory = async (chatId) => {
  try {
    const response = await api.get(`/chat/${chatId}/history`);
    return response.data;
  } catch (error) {
    console.error('API Error - Get Chat History:', error);
    throw error;
  }
};

export default api;