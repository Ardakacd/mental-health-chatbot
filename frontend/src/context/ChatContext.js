import { createContext, useState, useContext } from 'react';
import { sendMessage, startNewChat } from '../utils/api';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentMood, setCurrentMood] = useState('neutral');

  // Add a new message to the chat (user or bot)
  const addMessage = (message, role) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { role, content: message, timestamp: new Date().toISOString() }
    ]);
  };

  // Send a user message to the API and handle the response
  const sendUserMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to the chat immediately
    addMessage(message, 'user');
    
    setIsLoading(true);
    try {
      const response = await sendMessage({
        message,
        chat_id: currentChatId,
        mood: currentMood
      });
      
      // Save the chat ID if this is a new conversation
      if (response.chat_id && !currentChatId) {
        setCurrentChatId(response.chat_id);
      }
      
      // Add the bot's response to the chat
      addMessage(response.response, 'assistant');
      
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new chat session
  const initiateNewChat = async (initialMood = 'neutral') => {
    setIsLoading(true);
    
    try {
      // Clear existing messages
      setMessages([]);
      
      const response = await startNewChat({ initial_mood: initialMood });
      
      // Set the new chat ID
      setCurrentChatId(response.chat_id);
      
      // Add the bot's greeting to the chat
      addMessage(response.greeting, 'assistant');
      
      return response.chat_id;
    } catch (error) {
      console.error('Error starting new chat:', error);
      addMessage('Sorry, I encountered an error starting our conversation. Please refresh the page.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  // Update the user's mood
  const updateMood = (mood) => {
    setCurrentMood(mood);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        currentChatId,
        currentMood,
        sendUserMessage,
        initiateNewChat,
        updateMood
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}