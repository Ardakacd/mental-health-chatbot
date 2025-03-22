import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import MoodSelector from './MoodSelector';

const ChatInterface = ({ initialChatId, onNewChat }) => {
  const chatEndRef = useRef(null);
  const { 
    messages, 
    isLoading, 
    currentChatId, 
    sendUserMessage, 
    initiateNewChat 
  } = useChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat if needed
  useEffect(() => {
    const startChat = async () => {
      if (!initialChatId) {
        const newChatId = await initiateNewChat();
        if (newChatId && onNewChat) {
          onNewChat(newChatId);
        }
      }
    };

    startChat();
  }, [initialChatId, initiateNewChat, onNewChat]);

  return (
    <div className="flex flex-col h-[600px]">
      {/* Mood selector */}
      <div className="bg-gray-50 p-3 border-b">
        <MoodSelector />
      </div>
      
      {/* Chat messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center mb-4">
              Welcome! How are you feeling today?
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
          onSendMessage={sendUserMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default ChatInterface;