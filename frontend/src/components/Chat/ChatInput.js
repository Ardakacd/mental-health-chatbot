import { useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ 
  onSendMessage, 
  isLoading, 
  inputMessage, 
  setInputMessage, 
  disabled = false,
  requiresMoodSelection = false
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-grow">
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          rows="2"
          placeholder={requiresMoodSelection 
            ? "Please select a mood above first" 
            : "Type your message here..."}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || disabled}
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          {requiresMoodSelection 
            ? "You must select a mood before sending your first message" 
            : "Press Enter to send, Shift+Enter for new line"}
        </p>
      </div>
      <button
        type="submit"
        className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors disabled:bg-gray-300"
        disabled={!inputMessage.trim() || isLoading || disabled}
      >
        <FiSend className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;