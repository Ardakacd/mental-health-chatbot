import Link from 'next/link';
import { useChat } from '../../context/ChatContext';

const Header = () => {
  const { initiateNewChat } = useChat();

  const handleNewChat = async () => {
    if (confirm('Start a new conversation? This will clear your current chat.')) {
      await initiateNewChat();
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary-600 flex items-center">
            <span className="mr-2">🧠</span>
            <span>MindfulChat</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={handleNewChat}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                >
                  New Conversation
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header