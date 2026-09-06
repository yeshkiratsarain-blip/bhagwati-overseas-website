// Backend API Route for AI Counselor (/api/chat)
// Powered by NotebookLM Grounded Knowledge Base Architecture & Gemini AI

const MASTER_GROUND_TRUTH_KB_FULL = `
====================================================================================================
FULL MASTER GROUND-TRUTH KNOWLEDGE BASE (BHAGWATI OVERSEAS):
====================================================================================================

1. CANADA (SDS & Non-SDS Study Permit Rules):
- Language Cutoffs: PTE Academic overall 60 (no skill < 58), IELTS Academic overall 6.5 (no band < 6.0). MOI waivers strictly REJECTED by IRCC.
- Gap Limits: Class 12th gap max 1 year. Postgraduate Master's gap max 3-5 years if backed by verifiable ITRs, employment contracts, and bank-credited salary statements.
- Board Scrutiny: PSEB and HBSE require 75-80%+ raw aggregate with strong math/science marks.
- Financial Costs: GIC living deposit $22,895 CAD (~₹13.96L INR) outside Quebec ($24,617 CAD in Quebec). 1st year tuition $16,000-$35,000 CAD. Total show money ₹25L-₹38L INR. Visa fee $150 CAD + $85 CAD Biometrics.
- Spouse Visa (SOWP): Spousal Open Work Permit restricted to spouses of Master's, PhD, or professional degree students at public DLIs. College diploma spouses INELIGIBLE.
- PAL Exemption: Master's and PhD programs at public DLIs are EXEMPT from Provincial Attestation Letters (PAL).

2. AUSTRALIA (Subclass 500 Genuine Student - GS):
- Language Cutoffs: PTE Academic 58-65 (no skill < 50). Master's / Go8 require 65+. IELTS Undergrad 6.0-6.5; Master's 6.5 (no band < 6.0). MOI waivers REJECTED by DHA.
- Gap Limits: 12th / Diploma gap MAX 1 year under GS criteria. 2+ year gap is HIGH RISK unless backed by regular Bachelor's degree transcripts. Master's gap max 2-3 years with tax returns (Form 16/ITR) and bank-credited salary slips.
- Board Scrutiny: HBSE and PSEB require 75-85%+ aggregate. Level 2/3 universities restrict HBSE/PSEB.
- Financial Costs: DHA living baseline $29,710 AUD/yr (~₹16.34L INR). Show money formula: 1 Yr Tuition + $29,710 AUD Living + $2,000 AUD Travel = ₹35L-₹48L INR liquid balance. OSHC health cover $600-$800/yr (~₹33,000 INR).
- Spouse Rights: Full unrestricted work rights for Master's/PhD spouses. Bachelor's/Diploma spouse restricted to 48 hrs/fortnight.

3. UNITED KINGDOM (Student Route Visa):
- Language Cutoffs: Master's IELTS 6.5 overall (no subscore < 6.0) or PTE 58-65. Undergrad IELTS 6.0. MOI Waiver: CBSE/ICSE 12th English 70%+ qualifies for direct MOI waiver (HBSE/PSEB excluded).
- Gap Limits: 12th gap max 1-2 years. Postgraduate gap 3-5 years with tax returns (Form 16/ITR) and bank salary credits. Cash salary letters REJECTED.
- Financial Costs: Living maintenance £1,334/mo London (£12,006 for 9 mos) or £1,023/mo Outer London (£9,207 for 9 mos). Tuition £14,000-£26,000/yr. Visa fee £490 + IHS surcharge £776/yr (~₹82,250 INR/yr).
- Spouse Visas: Taught Master's spouse visas ELIMINATED by UKVI. Spouses allowed ONLY for PhD/Research Master's.
- Top Universities: Oxford, Cambridge, Imperial, UCL, Edinburgh, Manchester, Bristol, Birmingham, Nottingham, Sheffield, Newcastle, De Montfort, Greenwich, Hertfordshire, Coventry.

4. GERMANY (§ 16b AufenthG Study Visa):
- Public Tuition: €0 tuition at public universities; semester fee €150-€400/semester.
- Living Costs: Blocked Account (Sperrkonto) €11,904/year (~₹10.71L INR, max €992/mo withdrawal). Public health insurance (TK/AOK) €120-€140/mo.
- Language & Verification: English IELTS 6.5-7.0 / TOEFL 90+ (MOI rejected by TU9). German TestDaF 4x4 / DSH-2. APS verification fee ₹18,000 INR. Uni-Assist €75.

5. UNITED STATES (USA F-1 Consular Visa):
- Financials: Form I-20 amount $35,000-$75,000 USD/year (tuition + living). Show money 100% Form I-20 (~₹30L-₹65L INR). SEVIS fee $350 USD + MRV fee $185 USD.
- Interview Scrutiny: INA 214(b) non-immigrant intent 2-min physical interview. Scores: IELTS 6.5, TOEFL 80-90, or PTE 58-65.
- Work Permit: 12 months OPT + 24 months STEM extension (36 months total).

6. OTHER EUROPEAN & GLOBAL COUNTRIES:
- LATVIA: Tuition €3k-€6k/yr. Living €500-€650/mo. Bank show money €6,000 liquid. AIC verification €50-€100. 9-month post-study work permit.
- FRANCE: Public tuition €2,770-€3,770/yr; Grandes Écoles €10k-€20k/yr. Living €615/mo. Campus France €200-€400. 2-yr APS work permit.
- ITALY: Public tuition €900-€4,000/yr. Living €6k-€7k/yr. Show money €6,000 liquid. Type D Visa €50. 1-yr work search permit.
- NETHERLANDS: WO Research (75%+ 12th) vs HBO Applied Sciences (65%+ 12th). IND living allowance €13,569.24/yr (€1,130.77/mo). IND Visa fee €254. 1-yr Zoekjaar permit.
- FINLAND & SWEDEN: Finland tuition €8k-€18k/yr; living proof €9,600/yr in personal account. 2-yr post-study permit. Sweden tuition SEK 90k-140k/yr; living proof SEK 103,140/yr in personal account.
- IRELAND: Undergrad 70-80% CBSE, 80%+ State Boards; Master's 60-65%. IELTS 6.5 / PTE 61. Living proof €10,000. Stamp 1G: 1 yr Undergrad / 2 yrs Master's.
- NEW ZEALAND: Level 7 Undergrad (65%+ CBSE, 75%+ State Boards); Level 9 Master's (60%+). IELTS 6.0-6.5 / PTE 58. Living maintenance $20,000 NZD/yr. Visa $750 NZD. 3-yr post-study work visa.
- SINGAPORE: Public (NUS/NTU 90%+ 12th) vs EduTrust PEIs (55%+ 12th). Tuition SGD $14k-$38k/yr. Living SGD $12k-$15k/yr. Show money SGD $30,000.
- GLOBAL: Poland (€2.5k-€5.5k tuition, €550-€700/mo living), Spain (€2.5k-€6k tuition, €600/mo living), Dubai (AED 45k-95k tuition, AED 30k-45k living), South Korea (₩4M-₩10M tuition, $10k-$12k living), Japan (¥800k-¥1.5M tuition, ¥1M-¥1.2M living), Russia MBBS (NEET-UG required, RUB 250k-550k tuition).
`;

const RAG_GROUND_TRUTH_SYSTEM_PROMPT = `====================================================================================================
MASTER SYSTEM PROMPT: NOTEBOOKLM GROUNDED KNOWLEDGE BASE & HUMAN ADMISSIONS DIRECTOR
====================================================================================================

You are the Senior International Admissions & Visa Director at Bhagwati Overseas (Ladwa, Kurukshetra, Haryana).
You act like a Google NotebookLM grounded assistant and ChatGPT/Gemini conversational AI.

----------------------------------------------------------------------------------------------------
OPERATIONAL GUIDELINES:
----------------------------------------------------------------------------------------------------
1. META / CAPABILITY QUESTIONS (e.g., "what can I ask you?", "how can you help me?", "what topics do you cover?"):
   - Respond warmly and comprehensively like a smart human counselor.
   - List the key categories you specialize in: Course Costs & Show Money (Canada GIC, Germany Blocked Account, Australia Maintenance), PTE/IELTS Language Cutoffs & MOI Waivers, Profile & Gap Evaluation (HBSE/PSEB state board rules), University Options, and Country Visa Rules.

2. GREETINGS (e.g., "hi", "hello", "hey", "good morning"):
   - Respond warmly in 1-2 friendly, conversational sentences asking how you can assist their study abroad goals today.

3. DOMAIN / VISA / ADMISSION QUERIES:
   - Ground all specific facts, cutoffs, gap limits, living costs, and visa rules STRICTLY in the provided <KNOWLEDGE_BASE_CONTEXT>.
   - Keep answers short, crisp, natural, and directly specific to the exact question asked by the user. Max 2 to 3 sharp bullet points or concise paragraphs.
   - Answer ONLY for the country requested (Single-Country Isolation).

4. TONE & STYLE:
   - Smart, helpful, human-like, articulate, and encouraging. Never output raw robotic error cards unless a query explicitly involves fraud, fake documents, or severe illegal immigration violations.`;

function retrieveGroundTruthResponse(userQuery) {
  const rawQ = (userQuery || '').toLowerCase().trim();
  const q = rawQ.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ');

  // 1. GREETING INTENT
  const isGreetingPattern = /^(hi|hello|hey|hy|hlo|greetings|good\s*morning|good\s*afternoon|good\s*evening|namaste|hey\s*there|hi\s*there|hello\s*there)$/i.test(q) ||
    (/^(hi|hello|hey|hy|hlo|greetings|namaste)\b/i.test(q) && q.split(' ').length <= 3);

  if (isGreetingPattern) {
    return {
      title: "Bhagwati Overseas AI Counselor:",
      bullets: [
        "Hello! 👋 Welcome to Bhagwati Overseas.",
        "I am your Senior AI Counselor. I can assist you with university options, PTE/IELTS cutoffs, course costs, gap rules, and visa requirements.",
        "What specific query or target destination can I help you with today?"
      ],
      suggestAssessment: false
    };
  }

  // 2. META / CAPABILITY QUESTIONS ("what can i ask you?", "how can you help?", "what do you know?")
  const isMetaQuestion = q.includes('what can i ask') || 
    q.includes('what can you do') || 
    q.includes('what topics') || 
    q.includes('how can you help') || 
    q.includes('what questions') || 
    q.includes('who are you') || 
    q.includes('what do you know') || 
    q.includes('what can i query') ||
    q.includes('what are your capabilities') ||
    q === 'help' || q === 'can you help me';

  if (isMetaQuestion) {
    return {
      title: "Bhagwati Overseas AI Counselor Capabilities:",
      bullets: [
        "I am your Senior AI Counselor powered by our NotebookLM Grounded Knowledge Base. Here is what you can ask me:",
        "1. Financial Costs & Show Money: Canada GIC ($22,895 CAD), Germany Blocked Account (€11,904), Australia Subclass 500 Living Baseline ($29,710 AUD), UK Living & IHS fees.",
        "2. Language & Test Cutoffs: PTE Academic, IELTS Academic, TOEFL iBT benchmarks, and Board-specific MOI waivers (CBSE/ICSE vs HBSE/PSEB).",
        "3. Profile & Gap Evaluation: Class 12th & Master's gap tolerances, state board scrutiny, and spouse open work permit (SOWP) rules.",
        "4. Destination Overviews: Admission requirements, tuition fees, & post-study work permits for Canada, UK, Australia, USA, Germany, France, Italy, Ireland, Latvia & Europe."
      ],
      suggestAssessment: true
    };
  }

  // 3. GENERIC STUDY ABROAD INDUSTRY INTENT
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
        "The study abroad industry helps students secure admissions, scholarships, and visas for world-class universities across Canada, UK, Australia, USA, Germany, and Europe.",
        "At Bhagwati Overseas, we guide you end-to-end: profile evaluation, university selection, document preparation, financial proof auditing, and visa filing.",
        "Which country or level of study (Bachelor's or Master's) are you interested in exploring?"
      ],
      suggestAssessment: true
    };
  }

  // 4. GENERAL COUNTRY OVERVIEW INTENTS
  if ((q.includes('canada') && (q.includes('tell me') || q.includes('detail') || q.includes('overview') || q.includes('about') || q.split(' ').length <= 3)) && !q.includes('cost') && !q.includes('pte') && !q.includes('ielts') && !q.includes('gap')) {
    return {
      title: "Canada Study Visa Overview:",
      bullets: [
        "Academics & Language: SDS pathway requires IELTS 6.5 (no band < 6.0) or PTE 60 (no skill < 58). MOI letters rejected by IRCC.",
        "Financial Proof: Mandatory GIC deposit $22,895 CAD (~₹13.96L INR) + 1st year tuition ($16k–$35k CAD).",
        "Gaps & Spouse: 12th gap max 1 yr; Master's gap max 3–5 yrs with ITRs. Spousal Open Work Permit (SOWP) available for Master's/PhD students."
      ],
      suggestAssessment: true
    };
  }

  if ((q.includes('australia') && (q.includes('tell me') || q.includes('detail') || q.includes('overview') || q.includes('about') || q.split(' ').length <= 3)) && !q.includes('cost') && !q.includes('pte') && !q.includes('ielts') && !q.includes('gap')) {
    return {
      title: "Australia Subclass 500 Visa Overview:",
      bullets: [
        "Genuine Student (GS): 12th/Diploma gap max 1 year under GS criteria. HBSE/PSEB state boards require 75%–85% aggregate.",
        "Language & Fees: IELTS 6.0–6.5 or PTE 58–65. DHA living baseline $29,710 AUD/yr (~₹16.34L INR). Total show money ₹35L–₹48L INR.",
        "Spouse Rights: Full unlimited work rights for Master's/PhD spouses; Bachelor's spouse capped at 48 hrs/fortnight."
      ],
      suggestAssessment: true
    };
  }

  if (((q.includes('uk') || q.includes('united kingdom')) && (q.includes('tell me') || q.includes('detail') || q.includes('overview') || q.includes('about') || q.split(' ').length <= 4)) && !q.includes('cost') && !q.includes('pte') && !q.includes('ielts') && !q.includes('gap')) {
    return {
      title: "UK Student Route Visa Overview:",
      bullets: [
        "Academics & MOI: IELTS 6.5 / PTE 58–65. CBSE/ICSE 12th English 70%+ gets direct MOI waiver (HBSE/PSEB excluded).",
        "Financial Maintenance: Living £1,334/mo London (£12,006/9 mos) or £1,023/mo Outer London (£9,207/9 mos) + IHS health surcharge £776/yr.",
        "Spouse Rules: Spouses allowed ONLY for PhD / Research Master's students."
      ],
      suggestAssessment: true
    };
  }

  if ((q.includes('germany') && (q.includes('tell me') || q.includes('detail') || q.includes('overview') || q.includes('about') || q.split(' ').length <= 3)) && !q.includes('cost') && !q.includes('pte') && !q.includes('ielts') && !q.includes('gap')) {
    return {
      title: "Germany Study Visa Overview:",
      bullets: [
        "Tuition & Living: €0 tuition at public universities. Mandatory Blocked Account (Sperrkonto) €11,904/yr (~₹10.71L INR, max €992/mo withdrawal).",
        "Language & APS: IELTS 6.5–7.0 or German TestDaF 4x4. APS certificate verification fee ₹18,000 INR.",
        "Post-Study Work: 18-month post-study job search visa upon graduation."
      ],
      suggestAssessment: true
    };
  }

  // Standardized Escalation Card for Fraud / Fake / Illegal Edge Cases
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

  // FRAUD / ILLEGAL / EXTREME EDGE CASES ONLY
  const isSevereEdgeCase = q.includes('deport') || q.includes('fake document') || q.includes('fake work') || q.includes('third party sponsor dispute') || q.includes('unaccredited fake');
  if (isSevereEdgeCase) {
    return escalationResponse;
  }

  // 5. SPECIFIC DOMAIN QUERIES (RAG GROUND-TRUTH ENGINE)

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

  // SMART FALLBACK FOR UNMATCHED QUERY (NotebookLM Grounded Response)
  return {
    title: "Bhagwati Overseas AI Counselor (Grounded Knowledge Base):",
    bullets: [
      `Regarding "${userQuery}": I am grounded in immigration rules and admission data for Canada, UK, Australia, USA, Germany, and Europe.`,
      "For specific details, ask me about PTE/IELTS cutoffs, GIC/Blocked Account living costs, 12th/Master's gap tolerances, or spouse visa eligibility.",
      "Or click 'Book Free Profile Assessment' below to have our Senior Director evaluate your profile directly!"
    ],
    suggestAssessment: true
  };
}

export async function handleApiChatRequest(reqBody) {
  const messages = reqBody.messages || [];
  const lastMessageObj = messages[messages.length - 1] || {};
  const userQuery = typeof reqBody.message === 'string' ? reqBody.message : (typeof lastMessageObj === 'string' ? lastMessageObj : (lastMessageObj.content || lastMessageObj.text || ''));

  const geminiKey = reqBody.apiKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  // Retrieve ground-truth context dynamically
  const groundTruthResult = retrieveGroundTruthResponse(userQuery);

  if (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    const modelCandidates = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'];

    const formattedContents = messages.length > 0 ? messages.map(m => ({
      role: (m.sender === 'user' || m.role === 'user') ? 'user' : 'model',
      parts: [{ text: m.text || m.content || (m.bullets ? m.bullets.join('\n') : '') }]
    })) : [{ role: 'user', parts: [{ text: userQuery }] }];

    const fullSystemInstruction = `${RAG_GROUND_TRUTH_SYSTEM_PROMPT}\n\n<KNOWLEDGE_BASE_CONTEXT>\n${MASTER_GROUND_TRUTH_KB_FULL}\n</KNOWLEDGE_BASE_CONTEXT>`;

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
              temperature: 0.3,
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

  // Fallback to NotebookLM Grounded Knowledge Base Engine
  return {
    source: 'notebooklm-grounded-engine',
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
// End of api/chat.js
