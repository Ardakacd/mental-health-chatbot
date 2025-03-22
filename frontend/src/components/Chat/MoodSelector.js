import { useChat } from '../../context/ChatContext';

const MoodSelector = () => {
  const { currentMood, updateMood } = useChat();

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'sad', emoji: '😔', label: 'Sad' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'stressed', emoji: '😩', label: 'Stressed' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
  ];

  const handleMoodChange = (mood) => {
    updateMood(mood);
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-600 mb-2">How are you feeling today?</p>
      <div className="flex justify-between">
        {moods.map(mood => (
          <button
            key={mood.id}
            onClick={() => handleMoodChange(mood.id)}
            className={`mood-button ${currentMood === mood.id ? 'active' : ''}`}
            aria-label={`Set mood to ${mood.label}`}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;