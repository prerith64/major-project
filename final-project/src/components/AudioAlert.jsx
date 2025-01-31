import React, { useEffect, useRef } from 'react';

const AudioAlert = ({ injured }) => {
  const alertMessage = 'Alert: soldier is injured, need medication';
  const intervalRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (injured) {
      speak(alertMessage);
      intervalRef.current = setInterval(() => speak(alertMessage), 5000);
    } else {
      window.speechSynthesis.cancel();
      clearInterval(intervalRef.current);
    }

    return () => {
      window.speechSynthesis.cancel();
      clearInterval(intervalRef.current);
    };
  }, [injured]);

  return null;
};

export default AudioAlert;
