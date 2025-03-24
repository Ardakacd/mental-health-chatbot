import { useChat } from '../../context/ChatContext';

const MoodSelector = ({ onMoodSelect, disabled = false }) => {
  const { currentMood, updateMood } = useChat();

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', defaultText: "I'm feeling happy today!" },
    { id: 'sad', emoji: '😔', label: 'Sad', defaultText: "I'm feeling a bit down today." },
    { id: 'anxious', emoji: '😰', label: 'Anxious', defaultText: "I'm feeling anxious about something." },
    { id: 'stressed', emoji: '😩', label: 'Stressed', defaultText: "I'm feeling really stressed out." },
    { id: 'neutral', emoji: '😐', label: 'Neutral', defaultText: "I'm feeling okay, just checking in." },
  ];

  const handleMoodChange = (mood) => {
    if (mood != currentMood){
    updateMood(mood);
    
    // Find the selected mood and get its default text
    const selectedMood = moods.find(m => m.id === mood);
    if (selectedMood && onMoodSelect ) {
      // Call the callback with the default text for this mood
      onMoodSelect(selectedMood.defaultText);
    }
}
  };

  return (
    <div className={`w-full ${disabled ? 'opacity-60' : ''}`}>
      <p className="text-sm text-gray-600 mb-2">
        {disabled 
          ? "Mood selected for this session"
          : "How are you feeling today? (required before sending first message)"}
      </p>
      <div className="flex justify-between">
        {moods.map(mood => (
          <button
            key={mood.id}
            onClick={() => !disabled && handleMoodChange(mood.id)}
            className={`mood-button ${currentMood === mood.id ? 'active' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
            aria-label={`Set mood to ${mood.label}`}
            title={disabled 
              ? "Mood selection is locked after first message" 
              : `Click to select "${mood.label}" mood and use default message: "${mood.defaultText}"`
            }
            disabled={disabled}
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