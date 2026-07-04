import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

export default function MedicalChatbot() {
  const { t } = useLang();

  const suggestions = [t.chat_suggest_1, t.chat_suggest_2, t.chat_suggest_3, t.chat_suggest_4];

  const [messages, setMessages] = useState([
    { sender: 'ai', text: t.chat_greeting }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  // Re-sync greeting when language changes
  useEffect(() => {
    setMessages([{ sender: 'ai', text: t.chat_greeting }]);
  }, [t]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(p => [...p, { sender: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { sender: 'ai', text: t.chat_ai_reply(text) }]);
    }, 1500);
  };

  const onSubmit = (e) => { e.preventDefault(); send(input); };

  return (
    <div className="max-w-2xl mx-auto flex flex-col animate-float-in" style={{ height: 'calc(100vh - 120px)' }}>

      {/* Header */}
      <div className="clay mb-4 p-4 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '4px 4px 12px rgba(78,203,160,0.3),-2px -2px 6px rgba(255,255,255,0.9)' }}>
          🤖
        </div>
        <div>
          <h3 id="chatbot-title" className="font-black text-base tracking-tight" style={{ color: '#1A3D35' }}>{t.chat_title}</h3>
          <p className="text-[11px] font-semibold flex items-center gap-1.5" style={{ color: '#6B8F85' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: '#4ECBA0' }} />
            {t.chat_subtitle}
          </p>
        </div>
      </div>

      {/* Chat window */}
      <div className="clay flex-1 overflow-y-auto p-5 space-y-4" style={{ background: 'rgba(238,246,243,0.6)' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-1"
                style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', color: 'white', boxShadow: '2px 2px 6px rgba(78,203,160,0.3)' }}>
                H
              </div>
            )}
            <div className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed font-medium ${
              msg.sender === 'user'
                ? 'rounded-3xl rounded-br-sm text-white'
                : 'clay-sm text-teal-900 rounded-3xl rounded-bl-sm'
            }`}
              style={msg.sender === 'user' ? { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '3px 3px 10px rgba(78,203,160,0.25)' } : {}}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1"
                style={{ background: 'rgba(78,203,160,0.15)', color: '#38B2AC', border: '1px solid rgba(78,203,160,0.25)' }}>
                Me
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-1"
              style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', color: 'white' }}>H</div>
            <div className="clay-sm px-4 py-3 flex items-center gap-1.5">
              {[0.0, 0.2, 0.4].map((d, i) => (
                <span key={i} className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: '#4ECBA0', animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts — show only on first message */}
      {messages.length === 1 && !typing && (
        <div className="flex flex-wrap gap-2 py-3">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => send(s)}
              className="clay-sm text-[11px] font-semibold px-3 py-1.5 hover:text-teal-700 transition-colors"
              style={{ color: '#6B8F85' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={onSubmit} className="flex gap-2.5 mt-3">
        <input id="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat_placeholder}
          className="clay-input flex-1 px-4 py-3 text-sm text-teal-900 placeholder-teal-300 font-medium" />
        <button id="chat-send-btn" type="submit"
          className="clay-btn px-5 py-3 text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)' }}>
          {t.chat_send}
        </button>
      </form>
    </div>
  );
}
