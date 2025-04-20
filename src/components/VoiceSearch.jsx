import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

export const VoiceSearch = ({ onSearch }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError("Your browser does not support speech recognition");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      onSearch(transcript);
      resetTranscript();
    }
  }, [transcript, onSearch, resetTranscript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "en-US" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full ${
          listening
            ? "bg-red-500 animate-pulse"
            : "bg-white/7 hover:bg-white/10"
        } transition-colors`}
        aria-label={listening ? "Listening..." : "Start voice search"}
      >
        <MicrophoneIcon className="w-6 h-6 text-white " />
      </button>

      {error && (
        <div className="absolute top-full right-0 mt-2 p-2 bg-red-500 text-white text-center rounded-md whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};
