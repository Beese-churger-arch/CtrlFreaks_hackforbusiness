import React, { useState, useEffect, useRef } from 'react';
// import '../css/Assistant.css';
import '../../css/Assistant.css';


const synth = window.speechSynthesis;
const recognition = window.webkitSpeechRecognition
  ? new window.webkitSpeechRecognition()
  : null;

export default function AssistantCore({ systemPrompt }) {
  const [messages, setMessages] = useState([{ role: 'system', content: systemPrompt }]);
  const [input, setInput] = useState('');
  const endRef = useRef();

  const speak = text => synth.speak(new SpeechSynthesisUtterance(text));

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    const res = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ messages: newMsgs })
    });
    const data = await res.json();
    const assistantMsg = { role: 'assistant', content: data.reply };
    setMessages([...newMsgs, assistantMsg]);
    speak(data.reply);
  };

  const startListening = () => {
    if (!recognition) return;
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = e => setInput(e.results[0][0].transcript);
  };

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  return (
    <div className="assistant-container">
      <div className="chat-window" aria-live="polite">
        {messages.slice(1).map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong> {m.content}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          aria-label="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startListening}>🎙️</button>
      </div>
    </div>
  );
}

