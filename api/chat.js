// Backend API Route for AI Counselor (/api/chat)
// Powered by RAG 2026 Ground-Truth Knowledge Base & Two-Step Verification Architecture

const RAG_GROUND_TRUTH_SYSTEM_PROMPT = `====================================================================================================
MASTER SYSTEM PROMPT: HUMAN-LIKE CONVERSATIONAL RAG & STRICT ZERO-HALLUCINATION ARCHITECTURE
====================================================================================================

You are the Senior International Admissions & Visa Director at Bhagwati Overseas (Ladwa, Kurukshetra, Haryana).
You speak naturally, warmly, and intelligently like a top-tier human expert counselor—never robotic, wordy, or repetitive.

----------------------------------------------------------------------------------------------------
CONVERSATIONAL CHRONOLOGY & INTENT RULES
----------------------------------------------------------------------------------------------------
1. GREETINGS (e.g., "hi", "hello", "hey", "good morning", "namaste"):
   - Respond warmly, naturally, and professionally like a helpful human advisor.
   - Ask what specific study abroad or visa query they need assistance with today.
   - Keep response very short (1-2 friendly, conversational sentences).

2. GENERIC / INDUSTRY QUESTIONS (e.g., "can you tell me anything about study abroad industry?", "what is study abroad?", "how can you help me"):
   - Respond naturally like a human expert in 2-3 concise sentences.
   - Provide a clear, high-level overview of global study opportunities (admissions, scholarships, visa guidance for Canada, UK, Australia, USA, Germany, Europe), then ask which country or field of study they are considering.

3. SPECIFIC DOMAIN / VISA / ADMISSION QUERIES (e.g., PTE cutoffs, living costs, gaps, spouse visas, specific countries):
   - ABSOLUTE CLOSED-DOMAIN CONSTRAINT: Rely STRICTLY on the facts inside <KNOWLEDGE_BASE_CONTEXT>. Never invent external facts, fees, scores, or policies.
   - STRICT CONCISENESS & LENGTH MANDATE: Your answer MUST be very short, concise, direct, to the point, and strictly specific to the exact question asked by the user.
   - Do NOT write long preambles, walls of text, or dump unrelated country statistics.
   - Keep responses to 2 to 3 sharp bullet points max.
   - Single-Country Isolation: Answer ONLY for the specific country requested.

4. COMPLEX EDGE CASES / UNCOVERED COUNTRIES (e.g., past refusals, deportation, unaccredited private diplomas):
   - Be honest, direct, and brief. Advise them to have their documents audited directly by the Senior Director at Bhagwati Overseas (Ladwa).`;

function retrieveGroundTruthResponse(userQuery) {
  const rawQ = (userQuery || '').toLowerCase().trim();
  // Strip common punctuation for cleaner matching
  const q = rawQ.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ');

  // 1. GREETING INTENT (Chronology step 1)
  const isGreetingPattern = /^(hi|hello|hey|hy|hlo|greetings|good\s*morning|good\s*afternoon|good\s*evening|namaste|hey\s*there|hi\s*there|hello\s*there)$/i.test(q) ||
    (/^(hi|hello|hey|hy|hlo|greetings|namaste)\b/i.test(q) && q.split(' ').length <= 3);

  if (isGreetingPattern) {
    return {
      title: "Bhagwati Overseas AI Counselor:",
      bullets: [
        "Hello! 👋 Welcome to Bhagwati Overseas.",
        "I am here to help you with study abroad admissions, PTE/IELTS cutoffs, course costs, gap evaluation, and visa requirements.",
        "What specific query or destination can I assist you with today?"
      ],
      suggestAssessment: false
    };
  }

  // 2. GENERIC STUDY ABROAD INDUSTRY / INTRO INTENT (Chronology step 2)
  const isGenericQuery = q.includes('study abroad industry') || 
    q.includes('tell me about study abroad') || 
    q.includes('what is study abroad') || 
    q.includes('why study abroad') || 
    q.includes('how study abroad works') ||
    q.includes('about bhagwati overseas') ||
    q.includes('what services') ||
    (q.includes('study abroad') && (q.includes('anything') || q.includes('tell me') || q.includes('information') || q.includes('general') || q.includes('overview')));

  if (isGenericQuery) {
    return {
      title: "Study Abroad Overview & Services:",
      bullets: [
        "The study abroad industry helps students secure admissions, scholarships, and visas for world-class universities across top destinations like Canada, UK, Australia, USA, Germany, and Europe.",
        "At Bhagwati Overseas, we guide you end-to-end: profile evaluation, university selection, document preparation, financial proof auditing, and visa filing.",
        "Which country or course (Bachelor's or Master's) are you interested in exploring?"
      ],
      suggestAssessment: true
    };
  }

  // Standardized Escalation Card for Complex Cases / Uncovered Countries
  const escalationResponse = {
    title: "Personalized Profile Review Required:",
    bullets: [
      "This specific profile or pathway involves individual embassy compliance checks evaluated on a case-by-case basis.",
      "To prevent visa risk, our Senior Visa Director will review your exact academic and financial documents directly.",
      "📞 Call / WhatsApp: +91 99919-49882 | 📍 Office: Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa, Haryana)",
      "👉 Click 'Book Free Profile Assessment' below to submit your details for priority evaluation."
    ],
    suggestAssessment: true
  };

  // UNCOVERED COUNTRIES & COMPLEX EDGE CASES
  const uncoveredCountryMatch = q.match(/\b(china|georgia|armenia|philippines|ukraine|belarus|kazakhstan|austria|belgium|switzerland|norway|denmark|czech|portugal|greece|thailand|malaysia)\b/);
  const isComplexEdgeCase = q.includes('deport') || q.includes('refusal') || q.includes('rejected') || q.includes('embassy slot') || q.includes('uncle sponsor') || q.includes('third party sponsor') || q.includes('unaccredited') || q.includes('fake');
  
  if (uncoveredCountryMatch || isComplexEdgeCase) {
    return escalationResponse;
  }

  // 3. SPECIFIC DOMAIN QUERIES (RAG GROUND-TRUTH ENGINE)

  // A. LIVING COST & MAINTENANCE QUERIES
  const isLivingCostQuery = q.includes('living') || q.includes('maintenance') || q.includes('blocked account') || q.includes('gic') || q.includes('show money');

  if (isLivingCostQuery) {
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Living Cost Requirement:",
        bullets: [
          "DHA Baseline: $29,710 AUD / year (~₹16.34 Lakhs INR) living maintenance norm for single applicant.",
          "Show Money Formula: 1 Year Tuition + $29,710 AUD Living + $2,000 AUD Travel = ₹35L–₹48L INR verifiable liquid balance.",
          "OSHC Cover: Mandatory OSHC health cover of $600–$800 / year (~₹33,000 INR)."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('germany')) {
      return {
        title: "Germany Blocked Account & Living Cost Norm:",
        bullets: [
          "Blocked Account (Sperrkonto): €11,904 / year (~₹10.71 Lakhs INR) under § 16b AufenthG.",
          "Monthly Withdrawal: Max €992 / month (~₹89,280 INR) for living expenses.",
          "Health Insurance: Mandatory public insurance (TK/AOK) of €120–€140 / month."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('canada')) {
      return {
        title: "Canada GIC & Living Deposit Requirement:",
        bullets: [
          "Mandatory GIC: $22,895 CAD (~₹13.96 Lakhs INR) in Scotiabank/CIBC outside Quebec ($24,617 CAD in Quebec).",
          "Show Money Formula: 1st Year Tuition + $22,895 CAD GIC = ₹25L–₹38L INR total verifiable liquid funds."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Living Maintenance Norm:",
        bullets: [
          "Inside London: £1,334 / month up to 9 months (£12,006 total / ~₹12.72 Lakhs INR).",
          "Outside London: £1,023 / month up to 9 months (£9,207 total / ~₹9.76 Lakhs INR).",
          "IHS Surcharge: Mandatory UKVI Healthcare Surcharge of £776 / year (~₹82,250 INR)."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('latvia')) {
      return {
        title: "Latvia Living Maintenance & Show Money:",
        bullets: [
          "Living Maintenance: €500–€650 / month (~₹45,000–₹58,500 INR).",
          "Bank Show Money: Minimum €6,000 liquid balance (~₹5.50L–₹6.50L INR) in student or parent account."
        ],
        suggestAssessment: true
      };
    }
  }

  // B. LANGUAGE BENCHMARK QUERIES (PTE / IELTS / TOEFL)
  const isLanguageQuery = q.includes('pte') || q.includes('ielts') || q.includes('toefl') || q.includes('language') || q.includes('english score') || q.includes('cutoff');
  
  if (isLanguageQuery) {
    if (q.includes('canada')) {
      return {
        title: "Canada Language Benchmark:",
        bullets: [
          "PTE Academic: Overall 60 with no skill subscore below 58 across major public DLIs.",
          "IELTS Academic: Overall 6.5 with no band below 6.0.",
          "MOI Waiver: Medium of Instruction (MOI) letters are strictly REJECTED by IRCC."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Language Benchmark:",
        bullets: [
          "PTE Academic: Overall 58 to 65 (no skill < 50). Master's / Go8 universities require 65+.",
          "IELTS Academic: Undergrad 6.0–6.5; Master's 6.5 (no band < 6.0).",
          "MOI Waiver: MOI letters are strictly REJECTED by DHA."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Language Benchmark:",
        bullets: [
          "Master's Entry: IELTS 6.5 overall (no subscore < 6.0) or PTE 58–65 overall.",
          "Undergrad Entry: IELTS 6.0 overall (no subscore < 5.5).",
          "MOI Waiver: CBSE/ICSE 12th English 70%+ qualifies for MOI waiver (HBSE/PSEB excluded)."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('germany')) {
      return {
        title: "Germany Language Benchmark:",
        bullets: [
          "English-Taught: IELTS 6.5–7.0 or TOEFL iBT 90+. MOI letters rejected by TU9 universities.",
          "German-Taught: TestDaF Level 4x4, DSH-2, or Goethe C1."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('usa') || q.includes('america') || q.includes('united states')) {
      return {
        title: "USA F-1 Visa Language Benchmark:",
        bullets: [
          "Scores: IELTS 6.5 (no subscore < 6.0), TOEFL iBT 80–90, or PTE 58–65.",
          "Interview Fluency: Consular officers test spoken English directly during the 2-minute F-1 visa interview."
        ],
        suggestAssessment: true
      };
    }
    return {
      title: "Language Cutoffs by Country:",
      bullets: [
        "Canada: IELTS 6.5 (no band < 6.0) or PTE 60. MOI strictly rejected.",
        "Australia: IELTS 6.0–6.5 (Undergrad) / 6.5 (Master's) or PTE 58–65. MOI rejected.",
        "UK: IELTS 6.5 / PTE 58–65. CBSE/ICSE 70%+ English gets MOI waiver (HBSE/PSEB excluded).",
        "Germany: IELTS 6.5–7.0 / TOEFL 90+. MOI rejected by top public universities."
      ],
      suggestAssessment: true
    };
  }

  // C. PROFILE EVALUATION QUERIES (Gaps, Diplomas, Board Scrutiny)
  const isProfileQuery = q.includes('gap') || q.includes('gpap') || q.includes('diploma') || q.includes('hbse') || q.includes('pseb') || q.includes('backlog') || q.includes('passout') || q.includes('12th') || q.includes('marks') || q.includes('percentage');

  if (isProfileQuery && !q.includes('cost') && !q.includes('fee')) {
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Gap & Profile Rules:",
        bullets: [
          "12th / Diploma Gap: Max 1 year under Genuine Student (GS) criteria. 2+ year gap is HIGH RISK unless backed by regular Bachelor's transcripts.",
          "State Boards: HBSE and PSEB require 75%–85% raw aggregate; Level 2/3 universities restrict HBSE/PSEB admissions.",
          "Master's Gap: Accepted up to 2–3 years ONLY with tax returns (Form 16/ITR) and bank-credited salary slips."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('canada')) {
      return {
        title: "Canada Study Permit Gap & Profile Rules:",
        bullets: [
          "12th Gap: Max 1 year limit.",
          "Postgraduate Gap: Up to 3–5 years accepted with verifiable ITRs, formal employment contracts, and bank salary credits.",
          "State Boards: PSEB and HBSE require 75%–80%+ raw aggregate with strong math/science scores.",
          "PAL Exemption: Master's and PhD programs at public DLIs are exempt from Provincial Attestation Letter (PAL) caps."
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Gap & Board Rules:",
        bullets: [
          "12th Gap: Max 1–2 years with proof of continuous learning.",
          "Postgraduate Gap: Up to 3–5 years with tax returns (Form 16/ITR) and bank salary credits. Cash salary letters cause immediate CAS refusal.",
          "State Boards: PSEB/HBSE require 75%–85% raw marks and are excluded from English MOI waivers."
        ],
        suggestAssessment: true
      };
    }

    return {
      title: "Study Visa Gap Tolerances:",
      bullets: [
        "Australia: 12th gap max 1 year; Master's gap max 2–3 years with bank salary history.",
        "Canada: 12th gap max 1 year; Master's gap max 3–5 years with ITRs and formal work contracts.",
        "UK: 12th gap max 1–2 years; Master's gap max 3–5 years with Form 16/ITR (no cash salary).",
        "Germany: 12th gap max 1 year for Studienkolleg; Master's gap 2–4 years with work proof."
      ],
      suggestAssessment: true
    };
  }

  // D. SPOUSE & DEPENDENT VISA RULES
  if (q.includes('spouse') || q.includes('dependent') || q.includes('marriage') || q.includes('husband') || q.includes('wife')) {
    if (q.includes('australia') || q.includes('subclass 500')) {
      return {
        title: "Australia Subclass 500 Spouse Visa Rules:",
        bullets: [
          "Master's / PhD Enrolment: Spouse receives full, unrestricted work rights.",
          "Bachelor's / Diploma: Spouse work rights restricted to 48 hours per fortnight.",
          "Verification: Min 1-year marriage registration & joint bank funds strictly audited under GS rules."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Spouse Visa Rules:",
        bullets: [
          "Taught Master's: Spouses are ELIMINATED from accompanying taught Master's students by UKVI.",
          "Exempt Programs: Spouses allowed ONLY for PhD / Doctoral or research-based Master's degrees."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('canada')) {
      return {
        title: "Canada Spousal Open Work Permit (SOWP):",
        bullets: [
          "Master's & PhD: Spouses of Master's/PhD/professional degree students at public DLIs qualify for SOWP.",
          "Public College Diplomas: Spouses of undergraduate college diploma students are INELIGIBLE for SOWP."
        ],
        suggestAssessment: true
      };
    }
  }

  // E. UK UNIVERSITIES INQUIRIES
  if (q.includes('uk') && (q.includes('univer') || q.includes('college') || q.includes('study most') || q.includes('popular') || q.includes('best') || q.includes('top'))) {
    return {
      title: "Top UK Universities for Indian Students:",
      bullets: [
        "Tier-1 Universities: Oxford, Cambridge, Imperial, UCL, Edinburgh, Manchester, Bristol.",
        "Popular & Accessible Options: Birmingham, Nottingham, Sheffield, Newcastle, De Montfort, Greenwich, Hertfordshire, Coventry, Birmingham City.",
        "High-Employability Courses: Data Science, AI, Mechanical Eng, Biotech, Finance, Cyber Security."
      ],
      suggestAssessment: true
    };
  }

  // F. LATVIA STUDY VISA COST & PROCESS
  if (q.includes('latvia')) {
    return {
      title: "Latvia Study Visa & Financial Breakdown:",
      bullets: [
        "Tuition Fee: €3,000–€6,000 / year (~₹2.70L–₹5.40L INR) at RTU, University of Latvia, or TSI.",
        "Living Expenses: €500–€650 / month (~₹45,000–₹58,500 INR).",
        "Bank Show Money: €6,000 liquid balance (~₹5.50L–₹6.50L INR).",
        "Post-Study Work: 9-month post-study work permit upon graduation."
      ],
      suggestAssessment: true
    };
  }

  // G. STEPWISE COST BREAKDOWN QUERIES
  if (q.includes('cost') || q.includes('costing') || q.includes('fee') || q.includes('expense') || q.includes('stepwise')) {
    if (q.includes('canada')) {
      return {
        title: "Canada Cost Breakdown:",
        bullets: [
          "Pre-Admission: $300–$600 CAD (~₹18k–₹36k INR) WES evaluation, IELTS & application fees.",
          "Tuition Deposit: $16,000–$35,000 CAD / year (~₹9.76L–₹21.35L INR) to public DLI.",
          "GIC Living Deposit: $22,895 CAD (~₹13.96L INR) mandatory living deposit.",
          "Visa Fees: $150 CAD Visa + $85 CAD Biometrics (~₹14,335 INR total)."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('germany')) {
      return {
        title: "Germany Cost Breakdown:",
        bullets: [
          "APS & Pre-Admission: APS fee ₹18,000 INR + Uni-Assist fee (€75 1st school).",
          "Public Tuition: €0 tuition; semester contribution €150–€400 / semester.",
          "Blocked Account: €11,904 / year (~₹10.71L INR) mandatory blocked deposit.",
          "Health Insurance & Visa: €120–€140 / month public insurance + €75 Visa fee."
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Cost Breakdown:",
        bullets: [
          "Tuition Deposit: £14,000–£26,000 / year tuition. £2,000–£5,000 deposit required for CAS.",
          "Living Maintenance: £1,334/mo (London) or £1,023/mo (Outer London) for 9 months.",
          "Visa & IHS: UKVI Visa fee £490 (~₹51,940 INR) + IHS Health Surcharge £776 / year."
        ],
        suggestAssessment: true
      };
    }
  }

  // H. SPECIFIC COVERED COUNTRY HANDLERS
  if (q.includes('usa') || q.includes('united states') || q.includes('america')) {
    return {
      title: "USA F-1 Visa Key Breakdown:",
      bullets: [
        "Form I-20 Cost: $35,000–$75,000 USD / year tuition + living (~₹29.4L–₹63L INR).",
        "Fees: SEVIS I-901 fee $350 USD + MRV Visa fee $185 USD (~₹44,940 INR).",
        "Interview & STEM OPT: INA 214(b) non-immigrant intent physical interview. 12-month OPT + 24-month STEM extension (36 months total)."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('france')) {
    return {
      title: "France Study Visa Breakdown:",
      bullets: [
        "Tuition & Living: Public tuition €2,770–€3,770/yr; Grandes Écoles €10k–€20k/yr. Living norm €615/month (~₹6.64L INR/yr).",
        "Process & Visa: Campus France screening (€200–€400) + VLS-TS Visa (€50).",
        "Post-Study Work: 2-year APS work permit for Master's graduates."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('italy')) {
    return {
      title: "Italy Study Visa Breakdown:",
      bullets: [
        "Tuition & Living: Public tuition €900–€4,000/yr (income-based). Living expenses €6,000–€7,000/yr.",
        "Visa & Show Money: Type D Student Visa €50. Min €6,000 liquid bank balance required (6-month history).",
        "Post-Study Work: 1-year job search permit upon graduation."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('netherlands') || q.includes('dutch')) {
    return {
      title: "Netherlands TEV Visa Breakdown:",
      bullets: [
        "Structure: WO Research (75%+ 12th / 4-yr B.Tech) vs HBO Applied Sciences (65%+ 12th including HBSE/PSEB).",
        "IND Living & Fees: IND mandatory living allowance €13,569.24/year (€1,130.77/mo). IND Visa fee €254. Non-EU tuition €11k–€22k/yr.",
        "Post-Study Work: 1-year Orientation Year Visa (Zoekjaar)."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('finland') || q.includes('sweden')) {
    return {
      title: "Finland & Sweden Nordic Visa Breakdown:",
      bullets: [
        "Finland: Tuition €8,000–€18,000/yr. Mandatory living proof €9,600/yr (€800/mo) in student's OWN account. 2-year post-study permit.",
        "Sweden: Tuition SEK 90,000–140,000/yr. Living proof SEK 103,140/yr in personal account. 1-year post-study permit."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('ireland')) {
    return {
      title: "Ireland Student Visa Breakdown:",
      bullets: [
        "Academics: Undergrad 70%–80% (CBSE/ICSE) / 80%+ (State Boards). Master's 60%–65%. IELTS 6.5 / PTE 61.",
        "Financials: ISD mandatory living proof €10,000 + 1st year tuition balance. 6-month clear bank statement required.",
        "Post-Study Work: Stamp 1G: Bachelor's 1 year; Master's 2 years."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('new zealand') || q.includes('nz')) {
    return {
      title: "New Zealand Student Visa Breakdown:",
      bullets: [
        "Academics: Undergrad Level 7 (65%+ CBSE, 75%+ State Boards); Master's Level 9 (60%+). IELTS 6.0–6.5 or PTE 58.",
        "Maintenance: INZ living norm $20,000 NZD/year ($1,666/mo). Visa fee $750 NZD. 6-month bank history or FTS.",
        "Post-Study Work: 3-year Post-Study Work Visa for Bachelor's (L7) & Master's (L9)."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('singapore')) {
    return {
      title: "Singapore Student's Pass Breakdown:",
      bullets: [
        "Public vs PEI: Public (NUS/NTU 90%+ 12th) vs EduTrust PEIs (55%+ 12th). D2D transfer options to UK/Australia.",
        "Costs & Visa: Tuition SGD $14,000–$38,000/yr. Living SGD $12,000–$15,000/yr. Show money SGD $30,000 liquid.",
        "Post-Study Work: Public university 1-year LTVP; PEI graduates require corporate Employment Pass."
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('poland') || q.includes('spain') || q.includes('malta') || q.includes('mauritius') || q.includes('cyprus') || q.includes('dubai') || q.includes('uae') || q.includes('korea') || q.includes('japan') || q.includes('russia')) {
    return {
      title: "Global Study & Visa Guidelines:",
      bullets: [
        "Poland: Tuition €2,500–€5,500/yr, Living €550–€700/mo, Show money PLN 12,000. 9-month TRC permit.",
        "Spain: Tuition €2,500–€6,000/yr, Living €600/mo, Visa €80. 12-month post-study permit.",
        "Dubai (UAE): Tuition AED 45k–95k/yr, Living AED 30k–45k/yr. 5-Year Green Visa option.",
        "South Korea: Tuition ₩4M–₩10M/yr, Living $10k–$12k/yr, Show money $20,000. D-10 Visa.",
        "Japan: Tuition ¥800k–¥1.5M/yr, Living ¥1M–¥1.2M/yr, Show money ¥2,000,000.",
        "Russia (MBBS): NEET-UG required. Tuition RUB 250k–550k/yr (~₹2.30L–₹5.06L INR)."
      ],
      suggestAssessment: true
    };
  }

  // DEFAULT (GATE 2 FAIL - Facts not fully specified for custom query)
  return escalationResponse;
}

export async function handleApiChatRequest(reqBody) {
  const messages = reqBody.messages || [];
  const lastMessageObj = messages[messages.length - 1] || {};
  const userQuery = typeof reqBody.message === 'string' ? reqBody.message : (typeof lastMessageObj === 'string' ? lastMessageObj : (lastMessageObj.content || lastMessageObj.text || ''));

  const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  // Retrieve ground-truth context dynamically
  const groundTruthResult = retrieveGroundTruthResponse(userQuery);
  const retrievedContextText = groundTruthResult.bullets ? groundTruthResult.bullets.join('\n') : (groundTruthResult.text || '');

  if (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    const modelCandidates = ['gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];

    const formattedContents = messages.length > 0 ? messages.map(m => ({
      role: (m.sender === 'user' || m.role === 'user') ? 'user' : 'model',
      parts: [{ text: m.text || m.content || (m.bullets ? m.bullets.join('\n') : '') }]
    })) : [{ role: 'user', parts: [{ text: userQuery }] }];

    const fullSystemInstruction = `${RAG_GROUND_TRUTH_SYSTEM_PROMPT}\n\n<KNOWLEDGE_BASE_CONTEXT>\n${retrievedContextText}\n</KNOWLEDGE_BASE_CONTEXT>`;

    for (const modelName of modelCandidates) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiKey
          },
          body: JSON.stringify({
            contents: formattedContents,
            system_instruction: { parts: [{ text: fullSystemInstruction }] },
            generationConfig: {
              temperature: 0.2,
              topP: 0.95,
              maxOutputTokens: 2048
            }
          })
        });

        if (response.ok) {
          const geminiData = await response.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            return {
              source: `google-${modelName}`,
              title: `Bhagwati Overseas AI Counselor:`,
              text: rawText,
              suggestAssessment: true
            };
          }
        }
      } catch (err) {
        console.warn(`Gemini model ${modelName} call failed, trying next option:`, err.message);
      }
    }
  }

  // Fallback to Ground-Truth RAG Knowledge Base Engine (Strict Two-Step Verification)
  return {
    source: 'rag-ground-truth-engine',
    title: groundTruthResult.title,
    text: groundTruthResult.text,
    bullets: groundTruthResult.bullets,
    suggestAssessment: groundTruthResult.suggestAssessment
  };
}

// Vercel Serverless Function Handler (/api/chat)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-goog-api-key'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let reqBody = req.body;
    if (typeof reqBody === 'string') {
      try { reqBody = JSON.parse(reqBody); } catch (e) {}
    }
    reqBody = reqBody || {};

    const result = await handleApiChatRequest(reqBody);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Vercel Serverless /api/chat Error:", err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
