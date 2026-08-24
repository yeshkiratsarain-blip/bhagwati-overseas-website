import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const QUICK_PROMPTS = [
  "12th HBSE 2023 75% Non-Med for Australia?",
  "12th CBSE 2024 80% for UK with IELTS waiver?",
  "Graduation with 5-year gap for Canada Master's?",
  "Germany Public University with 68% B.Tech?",
  "Australia Subclass 500 Spouse Visa eligibility?",
  "Prior visa refusal remedy for UK/Canada?"
];

// High-IQ Study Abroad Visa & Profile Counseling Engine
function analyzeProfileAndCountry(userQuery) {
  const q = userQuery.toLowerCase();

  // 1. Detect Destination Country (Priority Checked)
  let targetCountry = null;
  if (q.includes('australia') || q.includes('aussie') || q.includes('subclass 500') || q.includes('melbourne') || q.includes('sydney') || q.includes('perth') || q.includes('brisbane') || q.includes('adelaide')) {
    targetCountry = 'Australia';
  } else if (q.includes('canada') || q.includes('toronto') || q.includes('vancouver') || q.includes('sds') || q.includes('pgwp') || q.includes('gic') || q.includes('ontario') || q.includes('alberta')) {
    targetCountry = 'Canada';
  } else if (q.includes('uk') || q.includes('united kingdom') || q.includes('london') || q.includes('cas') || q.includes('graduate route') || q.includes('birmingham') || q.includes('manchester')) {
    targetCountry = 'UK';
  } else if (q.includes('usa') || q.includes('united states') || q.includes('america') || q.includes('f1') || q.includes('opt') || q.includes('stem') || q.includes('i20')) {
    targetCountry = 'USA';
  } else if (q.includes('germany') || q.includes('aps') || q.includes('blocked account') || q.includes('berlin') || q.includes('munich') || q.includes('frankfurt')) {
    targetCountry = 'Germany';
  } else if (q.includes('ireland') || q.includes('dublin') || q.includes('france') || q.includes('italy') || q.includes('schengen') || q.includes('europe')) {
    targetCountry = 'Europe';
  } else if (q.includes('new zealand') || q.includes('nz') || q.includes('auckland')) {
    targetCountry = 'New Zealand';
  } else if (q.includes('singapore')) {
    targetCountry = 'Singapore';
  } else if (q.includes('mauritius')) {
    targetCountry = 'Mauritius';
  } else if (q.includes('russia') || q.includes('mbbs')) {
    targetCountry = 'Russia';
  }

  // 2. Detect Education Level & Gaps
  let is12th = q.includes('12th') || q.includes('10+2') || q.includes('intermediate') || q.includes('senior secondary') || q.includes('high school');
  let isGraduation = q.includes('graduat') || q.includes('bachelor') || q.includes('degree') || q.includes('b.tech') || q.includes('btech') || q.includes('b.com') || q.includes('bcom') || q.includes('b.sc') || q.includes('bsc') || q.includes('bba') || q.includes('bca') || q.includes('ba ');
  let isMasters = q.includes('master') || q.includes('pg ') || q.includes('postgrad') || q.includes('m.sc') || q.includes('msc') || q.includes('mba') || q.includes('m.tech') || q.includes('mtech');

  // Detect Passing Year
  let yearMatch = q.match(/201[5-9]|202[0-6]/);
  let passoutYear = yearMatch ? parseInt(yearMatch[0]) : null;
  let currentYear = 2026;
  let gapYears = passoutYear ? (currentYear - passoutYear) : null;

  // Detect Board
  let isHBSE = q.includes('haryana board') || q.includes('hbse') || q.includes('bseh');
  let isPSEB = q.includes('punjab board') || q.includes('pseb');
  let isCBSE = q.includes('cbse');
  let isICSE = q.includes('icse') || q.includes('isc');
  let isNIOS = q.includes('nios') || q.includes('open board') || q.includes('open school');

  // Detect Percentage
  let pctMatch = q.match(/(\d{2}(?:\.\d+)?)\s*%/);
  let percentage = pctMatch ? parseFloat(pctMatch[1]) : null;

  // Detect Stream
  let stream = null;
  if (q.includes('non medical') || q.includes('non-med') || q.includes('pcm')) stream = 'Non-Medical (PCM)';
  else if (q.includes('medical') || q.includes('pcb')) stream = 'Medical (PCB)';
  else if (q.includes('commerce')) stream = 'Commerce';
  else if (q.includes('arts') || q.includes('humanities')) stream = 'Arts / Humanities';
  else if (q.includes('computer') || q.includes('it ') || q.includes('cs')) stream = 'Computer Science / IT';

  // 3. Generate Grounded, Realistic Evaluation
  
  // CASE A: AUSTRALIA
  if (targetCountry === 'Australia') {
    let verdict = "Challenging — High Visa Scrutiny (Requires Strategic Pathway)";
    let hurdles = [];
    let solutions = [];

    if (isHBSE || isPSEB) {
      hurdles.push("State Board Scrutiny: Australian Department of Home Affairs and Level 1 universities place Haryana (HBSE) and Punjab (PSEB) state boards under rigorous Genuine Student (GS) verification.");
    }
    if (gapYears && gapYears >= 2 && (is12th || !isGraduation)) {
      hurdles.push(`Academic Gap (${gapYears} Years since ${passoutYear}): Direct entry into Australian Bachelor's with a 2+ year 12th gap is almost universally rejected by Level 1 universities without continuous accredited diploma studies.`);
    } else if (gapYears && gapYears >= 4 && isGraduation) {
      hurdles.push(`Post-Graduation Gap (${gapYears} Years): Requires solid ITR, salary credit in bank accounts, and relevant work experience letters.`);
    }
    hurdles.push("PTE / English Score: Minimum PTE 60-64+ overall (no communicative skill below 58) is practically required for smooth Level 1/2 COE issuance.");
    hurdles.push("Financial Evidence: Must demonstrate ₹28–₹32 Lakhs in 3-month-old verifiable funds held by parents/grandparents + annual family income proof of ₹8–₹12+ Lakhs/year.");

    if (gapYears && gapYears >= 2 && is12th) {
      solutions.push("Accredited D2D Pathway: Apply for a Diploma-to-Degree (1+2 years) package at a Level 2 Regional DLI (e.g. Adelaide, Perth, Geelong) which accepts justified gaps.");
      solutions.push("Alternative Destination: If Australia rejection risk is too high, UK or Germany offers direct Bachelor's entry for 70%+ HBSE/CBSE with fast-track visa issuance.");
    } else {
      solutions.push("Apply directly to Level 1/2 Regional Universities with high GS clearance rates and regional post-study work rights (up to 3-4 years).");
    }

    return {
      title: "Australia Subclass 500 Visa Assessment (Grounded & Realistic):",
      bullets: [
        `Direct Profile Verdict: ${verdict}`,
        ...hurdles,
        `Actionable Recommendation: ${solutions.join(' ')}`
      ],
      suggestAssessment: true
    };
  }

  // CASE B: UNITED KINGDOM (UK)
  if (targetCountry === 'UK') {
    let verdict = (percentage && percentage >= 65) ? "Strong to Moderate Eligibility" : "Moderate (Subject to English Proof)";
    let hurdles = [];
    let solutions = [];

    if (is12th && (isHBSE || isPSEB)) {
      hurdles.push("English Waiver (MOI): UK universities require 70%-75%+ in 12th English for HBSE/PSEB for IELTS waiver; otherwise, IELTS 6.0 (5.5 min) or PTE 59+ is required.");
    } else if (is12th && (isCBSE || isICSE)) {
      hurdles.push("English Waiver (MOI): 65%-70%+ in Class 12th English (CBSE/ICSE) gets full IELTS waiver across several top UK partner universities.");
    }

    if (gapYears && gapYears > 2 && is12th) {
      hurdles.push(`12th Academic Gap (${gapYears} Years): Acceptable up to 2-3 years; beyond that, diploma proof or computer course certification is required for CAS issuance.`);
    } else if (gapYears && gapYears <= 8 && isGraduation) {
      hurdles.push(`Graduation Gap (${gapYears} Years): Fully accepted with job offer letters, salary slips, and bank account credit proof.`);
    }

    hurdles.push("28-Day Maintenance Funds: Must hold £13,365 (London) or £10,224 (Outside London) in savings bank for 28 consecutive days before visa appointment.");
    hurdles.push("Credibility / Pre-CAS Interview: You must pass a 15-minute university credibility interview explaining course choice and modules.");

    solutions.push("Fast Offer Letters (48-72 hrs): Direct application with institutional fee waiver + dedicated CAS interview mock preparation in Ladwa.");

    return {
      title: "United Kingdom (UK) Study Visa Assessment:",
      bullets: [
        `Direct Profile Verdict: ${verdict}`,
        ...hurdles,
        `Actionable Recommendation: ${solutions.join(' ')}`
      ],
      suggestAssessment: true
    };
  }

  // CASE C: CANADA
  if (targetCountry === 'Canada') {
    let verdict = "Moderate (Strict Cap & Public DLI Verification Needed)";
    let hurdles = [
      "IRCC Visa Caps & PAL: Every Canadian study permit requires a Provincial Attestation Letter (PAL) allocated to approved public colleges/universities.",
      "Language Benchmark: Minimum IELTS Academic 6.0 in each band or PTE Academic 60+ for SDS processing.",
      "Mandatory GIC & 1st Year Fees: Full 1st year tuition fee + $20,635 CAD GIC in an approved Canadian bank (Scotiabank/CIBC/ICICI).",
      "PGWP Eligibility Check: Ensure your program is at a designated public institution to guarantee 3-Year Post-Graduation Work Permit (PGWP) eligibility."
    ];
    let solutions = [
      "Target high-in-demand STEM, Healthcare, or Business programs at public colleges in Ontario, Alberta, or British Columbia with provincial nomination pathways."
    ];

    return {
      title: "Canada Study Visa Assessment (Post-Cap Guidelines):",
      bullets: [
        `Direct Profile Verdict: ${verdict}`,
        ...hurdles,
        `Actionable Recommendation: ${solutions.join(' ')}`
      ],
      suggestAssessment: true
    };
  }

  // CASE D: GERMANY & EUROPE
  if (targetCountry === 'Germany' || targetCountry === 'Europe') {
    let verdict = "Strong for Public Universities (Cost-Effective & High PR Value)";
    let hurdles = [
      "Mandatory APS Certificate: Academic Evaluation Centre (APS) certificate is compulsory for all Indian Bachelor's/Master's applicants before visa booking.",
      "Blocked Account (€11,904/year): Compulsory deposit in Expatrio/Coracle/Fintiba to cover monthly living expenses (€992/month).",
      "Language Cutoffs: IELTS 6.5 (or Duolingo 115+) for English-taught Master's degrees at public universities."
    ];
    let solutions = [
      "Zero/Low Tuition Benefit: German public universities charge zero tuition fees. 18-month post-study Job Seeker Visa with direct EU Blue Card pathway."
    ];

    return {
      title: "Germany & Europe Public University Pathway:",
      bullets: [
        `Direct Profile Verdict: ${verdict}`,
        ...hurdles,
        `Actionable Recommendation: ${solutions.join(' ')}`
      ],
      suggestAssessment: true
    };
  }

  // CASE E: SPOUSE / DEPENDENT VISAS
  if (q.includes('spouse') || q.includes('dependent') || q.includes('marriage') || q.includes('husband') || q.includes('wife')) {
    return {
      title: "Spouse & Dependent Visa Regulations (Grounded Analysis):",
      bullets: [
        "Direct Profile Verdict: Feasible with Master's/Ph.D. Enrolment (Not applicable for Bachelor's/Diplomas in Canada & UK)",
        "Australia: Full unrestricted work rights for spouse if primary applicant is in Master's (Coursework or Research) or Doctoral degree on Subclass 500.",
        "Canada: Spouse Open Work Permit (SOWP) strictly restricted to spouses of Master's and Doctoral students at public universities.",
        "UK: Dependents strictly allowed ONLY for postgraduate research programs (Ph.D. or Master's by Research).",
        "Actionable Recommendation: Walk into Bhagwati Overseas Ladwa office with marriage registration, joint account statements, and passport proofs for a complete spouse audit."
      ],
      suggestAssessment: true
    };
  }

  // CASE F: PRIOR VISA REFUSAL
  if (q.includes('refusal') || q.includes('rejected') || q.includes('rejection') || q.includes('refuse')) {
    return {
      title: "Visa Refusal Recovery Strategy:",
      bullets: [
        "Direct Profile Verdict: Highly Solvable with Justified SOP & Document Rectification",
        "Root-Cause Audit: We analyze your official embassy refusal letter or order GCMS notes (for Canada) to identify the exact rejection grounds (GTE/GS, finances, home ties, or documentation).",
        "Addressing Section 214(b) / GST: Draft a compelling, evidence-backed Statement of Purpose addressing why your course progression is genuine and logically viable.",
        "Actionable Recommendation: Bring your original refusal letter and marksheets to our Ladwa office for a transparent, zero-charge profile reconstruct."
      ],
      suggestAssessment: true
    };
  }

  // CASE G: GENERAL INQUIRY WITH PROFILE DATA
  let boardText = isHBSE ? "Haryana Board (HBSE)" : isPSEB ? "Punjab Board (PSEB)" : isCBSE ? "CBSE" : isICSE ? "ICSE" : "your education board";
  let gapText = gapYears ? `${gapYears}-year gap (Passout: ${passoutYear})` : "your academic timeline";
  let pctText = percentage ? `${percentage}% marks` : "your academic percentage";

  return {
    title: "Bhagwati Overseas Professional Profile Evaluation:",
    bullets: [
      `Profile Overview: Analyzing ${pctText} from ${boardText} with ${gapText}.`,
      "Honest Country Matching: Different countries have radically different scrutiny levels for state boards and academic gaps (e.g. UK/Germany accept gaps up to 5-8 years; Australia requires strict GS & accredited pathways for gaps > 2 years).",
      "Score & Fund Verification: We verify whether you need IELTS, PTE, or qualify for Medium of Instruction (MOI) fee waivers + assist with legitimate bank funds verification.",
      "Actionable Recommendation: Submit your details below or visit our Ladwa head office (Behind Bus Stand) for an authentic, 1-on-1 document audit."
    ],
    suggestAssessment: true
  };
}

// Clean Message Renderer
function renderStructuredMessage(text, bullets) {
  if (bullets && Array.isArray(bullets)) {
    return (
      <div className="chat-structured-content">
        <p className="chat-p-line">{text}</p>
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

  // Fallback string parser
  const lines = (text || '').split('\n').filter(l => l.trim().length > 0);
  return (
    <div className="chat-structured-content">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          const content = trimmed.replace(/^[•\-]\s*/, '');
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
      title: "Bhagwati Overseas AI Counselor",
      bullets: [
        "Welcome: I am your AI Study Abroad & Visa Specialist at Bhagwati Overseas (Ladwa).",
        "How I can help: Share your 10+2 / Degree percentage, passing year, Board (HBSE/PSEB/CBSE), English scores (IELTS/PTE), and preferred destination for a 100% grounded, realistic visa evaluation."
      ],
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      const evaluation = analyzeProfileAndCountry(text);
      const aiMessage = {
        sender: 'ai',
        title: evaluation.title,
        bullets: evaluation.bullets,
        suggestAssessment: evaluation.suggestAssessment,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 450);
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
              <p className="ai-status">Online • Study Abroad & Visa Specialist</p>
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
            <span>Grounded, realistic profile evaluation (Haryana & Punjab student focus).</span>
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

          {isTyping && (
            <div className="chat-bubble-wrapper ai-msg">
              <div className="chat-bubble-content typing-indicator-box">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="ai-quick-prompts">
          <span className="prompts-label">Quick Profile Queries:</span>
          <div className="prompts-scroll">
            {QUICK_PROMPTS.map((prompt, pIdx) => (
              <button key={pIdx} className="prompt-chip" onClick={() => handleSend(prompt)}>
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
            placeholder="e.g. 12th HBSE 2023 75% for Australia bachelor?"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputMsg.trim()}>
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
