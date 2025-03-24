import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import MoodSelector from './MoodSelector';

// Default message for neutral mood
const DEFAULT_NEUTRAL_MESSAGE = "I'm feeling okay, just checking in.";

const ChatInterface = ({ initialChatId, onNewChat }) => {
  const chatEndRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');
  const [moodSelected, setMoodSelected] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  
  const { 
    messages, 
    isLoading, 
    currentChatId, 
    sendUserMessage, 
    initiateNewChat,
    updateMood
  } = useChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if first message has been sent
  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter(message => message.role === 'user');
      if (userMessages.length > 0) {
        setFirstMessageSent(true);
      }
    }else{
        setFirstMessageSent(false)
    }
  }, [messages]);

  // Initialize chat if needed
  useEffect(() => {
    const startChat = async () => {
      if (!initialChatId) {
        // Set initial mood to neutral by default
        updateMood('neutral');
        
        const newChatId = await initiateNewChat('neutral');
        if (newChatId && onNewChat) {
          onNewChat(newChatId);
        }
      }
    };

    startChat();
  }, [initialChatId, initiateNewChat, onNewChat, updateMood]);

  // Function to handle mood selection
  const handleMoodSelection = (moodText) => {
    setInputMessage(moodText);
    setMoodSelected(true);
  };
  
  // Enhanced sendMessage function to track first message
  const handleSendMessage = (message) => {
    sendUserMessage(message);
    if (!firstMessageSent) {
      setFirstMessageSent(true);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Mood selector */}
      <div className="bg-gray-50 p-3 border-b">
        <MoodSelector 
          onMoodSelect={handleMoodSelection} 
          disabled={firstMessageSent}
        />
      </div>
      
      {/* Chat messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center mb-4">
              Welcome! How are you feeling today?
            </p>
            <p className="text-center text-sm">
              Select a mood icon above to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble 
                key={index} 
                message={message.content} 
                isUser={message.role === 'user'} 
              />
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          disabled={!moodSelected && !firstMessageSent}
          requiresMoodSelection={!moodSelected && !firstMessageSent}
        />
      </div>
    </div>
  );
};

export default ChatInterface;