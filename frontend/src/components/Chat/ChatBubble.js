const ChatBubble = ({ message, isUser }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
          {!isUser && (
            <div className="font-semibold text-primary-700 mb-1">MindfulChat</div>
          )}
          <div className="whitespace-pre-wrap">{message}</div>
        </div>
      </div>
    );
  };
  
  export default ChatBubble;