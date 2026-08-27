import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

const QUICK_PROMPTS = [
  "In which UK universities do Indian students study most?",
  "12th HBSE 2023 75% Non-Med for Australia?",
  "12th CBSE 2024 80% for UK with IELTS waiver?",
  "Stepwise costing for Bachelor's in Australia?",
  "Latvia Bachelor's Cost & Expenses Breakdown?",
  "Canada SDS 1st Year Tuition + GIC Breakdown?",
  "Germany Public University APS & Blocked Account Cost?",
  "Australia Subclass 500 Spouse Visa eligibility?"
];

// Helper to render dynamic AI response content (supports strings, arrays, bold titles, bullets)
function renderStructuredMessage(title, bullets) {
  if (bullets && Array.isArray(bullets)) {
    return (
      <div className="chat-structured-content">
        {title && <p className="chat-p-line"><strong>{title}</strong></p>}
        {bullets.map((b, idx) => {
          const colonIndex = b.indexOf(':');
          if (colonIndex > -1) {
            const label = b.substring(0, colonIndex).trim();
            const body = b.substring(colonIndex + 1).trim();
            return (
              <div key={idx} className="chat-bullet-row">
                <span className="chat-bullet-dot" />
                <div>
                  <strong className="chat-bullet-label">{label}:</strong>{' '}
                  <span className="chat-bullet-body">{body}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="chat-bullet-row">
              <span className="chat-bullet-dot" />
              <span className="chat-bullet-body">{b}</span>
            </div>
          );
        })}
      </div>
    );
  }

  const lines = (title || '').split('\n').filter(l => l.trim().length > 0);
  return (
    <div className="chat-structured-content">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || /^\d+\./.test(trimmed)) {
          const content = trimmed.replace(/^([•\-]|(\d+\.))\s*/, '');
          const colonIndex = content.indexOf(':');
          if (colonIndex > -1) {
            return (
              <div key={idx} className="chat-bullet-row">
                <span className="chat-bullet-dot" />
                <div>
                  <strong className="chat-bullet-label">{content.substring(0, colonIndex).trim()}:</strong>{' '}
                  <span className="chat-bullet-body">{content.substring(colonIndex + 1).trim()}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="chat-bullet-row">
              <span className="chat-bullet-dot" />
              <span className="chat-bullet-body">{content}</span>
            </div>
          );
        }
        return <p key={idx} className="chat-p-line">{trimmed}</p>;
      })}
    </div>
  );
}

export default function AICounselorChat({ isOpen, onClose, onOpenAssessment }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      title: "Bhagwati Overseas Senior AI Counselor:",
      bullets: [
        "Welcome: I am your Senior International Admissions & Visa Director at Bhagwati Overseas (Ladwa, Haryana).",
        "How I can assist: Ask me any direct question (e.g. popular UK/Australia universities for Indian students, PTE cutoffs, stepwise costing, spouse visas, or profile evaluation).",
        "Getting started: Type your question below or pick a quick prompt to begin!"
      ],
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStepText, setThinkingStepText] = useState('Connecting to AI Counselor Engine...');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, thinkingStepText]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInputMsg('');

    setIsTyping(true);
    setThinkingStepText('1/3 Reading & sorting your question...');

    const stepTimer1 = setTimeout(() => {
      setThinkingStepText('2/3 Researching embassy regulations & university criteria...');
    }, 900);

    const stepTimer2 = setTimeout(() => {
      setThinkingStepText('3/3 Synthesizing blunt, realistic & expert visa advice...');
    }, 1800);

    const startTime = Date.now();

    try {
      // Connect to real dynamic /api/chat endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, messages: newMessages })
      });

      // Ensure at least 2.5 seconds of realistic thinking delay
      const elapsedTime = Date.now() - startTime;
      const minThinkingDelay = 2500;
      if (elapsedTime < minThinkingDelay) {
        await new Promise(resolve => setTimeout(resolve, minThinkingDelay - elapsedTime));
      }

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (response.ok) {
        const data = await response.json();
        let aiMessage;
        if (data.bullets) {
          aiMessage = {
            sender: 'ai',
            title: data.title,
            bullets: data.bullets,
            suggestAssessment: data.suggestAssessment !== false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        } else if (data.text) {
          const lines = data.text.split('\n').filter(l => l.trim().length > 0);
          aiMessage = {
            sender: 'ai',
            title: data.title || "Bhagwati Overseas Senior AI Counselor:",
            bullets: lines,
            suggestAssessment: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        if (aiMessage) {
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);
          return;
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Server Error:', response.status, errorData);
      }
    } catch (err) {
      console.warn("Backend /api/chat fetch error:", err);
    }

    // Graceful Network Error Fallback
    setMessages(prev => [
      ...prev,
      {
        sender: 'ai',
        title: "Bhagwati Overseas AI Counselor:",
        bullets: [
          "Connection issue: Unable to reach AI endpoint.",
          "Direct Assistance: Please visit Bhagwati Overseas Ladwa office (Above Nirula Clinic, Behind Bus Stand, Ladwa) or click Book Free Assessment for instant assistance."
        ],
        suggestAssessment: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-modal animate-fade-in" onClick={e => e.stopPropagation()}>
        
        {/* Chat Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header-info">
            <div className="ai-avatar-box">
              <Bot size={22} style={{ color: '#ffffff' }} />
              <span className="online-indicator" />
            </div>
            <div>
              <h3 className="ai-name">Bhagwati AI Counselor</h3>
              <p className="ai-status">Online • Senior International Admissions Director</p>
            </div>
          </div>

          <button className="ai-close-btn" onClick={onClose} aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="ai-chat-body">
          
          <div className="ai-notice-box">
            <ShieldCheck size={16} className="text-orange" />
            <span>Honest, unvarnished visa evaluation (15+ yrs Haryana & Punjab experience).</span>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
              <div className="chat-bubble-content">
                {msg.sender === 'user' ? (
                  <p className="chat-user-text">{msg.text}</p>
                ) : (
                  renderStructuredMessage(msg.title, msg.bullets)
                )}

                {msg.suggestAssessment && (
                  <button 
                    className="btn btn-orange btn-sm chat-cta-btn"
                    onClick={() => {
                      onClose();
                      onOpenAssessment && onOpenAssessment();
                    }}
                  >
                    <span>Book Free Profile Assessment</span>
                    <ArrowUpRight size={14} />
                  </button>
                )}

                <span className="chat-bubble-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Wait & Think Counselor Animation State */}
          {isTyping && (
            <div className="chat-bubble-wrapper ai-msg">
              <div className="chat-bubble-content ai-thinking-card">
                <div className="ai-thinking-header">
                  <Sparkles size={14} className="ai-thinking-sparkle" />
                  <span className="ai-thinking-title">Senior Director Thinking...</span>
                </div>
                <p className="ai-thinking-step">{thinkingStepText}</p>
                <div className="typing-indicator-box">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="ai-quick-prompts">
          <span className="prompts-label">Quick Prompts:</span>
          <div className="prompts-scroll">
            {QUICK_PROMPTS.map((prompt, pIdx) => (
              <button 
                key={pIdx} 
                type="button"
                className="prompt-chip" 
                onClick={(e) => {
                  e.preventDefault();
                  handleSend(prompt);
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <form 
          className="ai-chat-footer"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input 
            type="text" 
            className="ai-chat-input"
            placeholder="Ask any question e.g. popular UK universities for Indian students..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            autoCapitalize="sentences"
            autoCorrect="on"
            enterKeyHint="send"
          />
          <button type="submit" className="ai-send-btn" disabled={!inputMsg.trim()}>
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
