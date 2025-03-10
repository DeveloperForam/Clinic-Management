import React, { useState, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true); // Track if it's the first message

  const prescriptions = {
    fever: "Take Paracetamol (500mg) every 6 hours & drink warm fluids.",
    cold: "Take Antihistamine & rest. Stay hydrated!",
    cough: "Use cough syrup (Dextromethorphan) and warm honey tea.",
    headache: "Take Ibuprofen (200mg) & rest in a quiet room.",
    stomachache: "Take Omeprazole before meals to reduce acidity.",
    soreThroat: "Gargle with salt water and take throat lozenges.",
    nausea: "Use anti-nausea medication like Ondansetron.",
    diarrhea: "Take ORS solution & Loperamide (if necessary).",
    bodyPain: "Use Paracetamol or Ibuprofen for relief.",
    allergy: "Take Loratadine (10mg) once daily.",
    anxiety: "Try deep breathing exercises and consider a mild sedative if needed.",
    insomnia: "Drink warm milk, avoid screens before bed, and try Melatonin supplements."
  };

  useEffect(() => {
    if (isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in your browser.");
        setIsListening(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";

      recognition.onstart = () => console.log("Voice recognition started...");
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setMessage(voiceText);
        handleSendMessage(voiceText);
      };

      recognition.start();
    }
  }, [isListening]);

  const handleSendMessage = (msg) => {
    if (!msg.trim()) return;

    if (firstMessage) setFirstMessage(false); // Hide first-time message after first input

    const patientMessage = { text: msg, sender: "patient" };
    setChat([...chat, patientMessage]);
    setMessage("");
    setSuggestions([]);

    setBotTyping(true);
    setTimeout(() => {
      const systemResponse = { text: getPrescription(msg), sender: "bot" };
      setChat((prevChat) => [...prevChat, systemResponse]);
      setBotTyping(false);
    }, 1500);
  };

  const getPrescription = (symptom) => {
    for (let key in prescriptions) {
      if (symptom.toLowerCase().includes(key)) {
        return prescriptions[key];
      }
    }
    return "🤖 I'm not sure. Please consult a doctor.";
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (firstMessage) setFirstMessage(false); // Hide first-time message when typing

    if (e.target.value.length > 1) {
      const filteredSuggestions = Object.keys(prescriptions).filter((key) =>
        key.includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box">
        <div className="chat-header">💬 AI Health Assistant</div>

        <div className="chat-content">
          {firstMessage && (
            <div className="first-message">🤖 Ask about your symptoms for medicine suggestions!</div>
          )}

          {chat.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.sender === "patient" ? <FaUser className="icon" /> : <FaRobot className="icon" />}
              <span>{msg.text}</span>
            </div>
          ))}
          {botTyping && <div className="chat-message bot typing">🤖 Typing...</div>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Describe your symptoms..."
          />
          <button onClick={() => handleSendMessage(message)}>
            <FaPaperPlane />
          </button>
          <button onClick={() => setIsListening(true)} className={isListening ? "listening" : ""}>
            <FaMicrophone />
          </button>

          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((s, index) => (
                <div key={index} className="suggestion-item" onClick={() => handleSendMessage(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
