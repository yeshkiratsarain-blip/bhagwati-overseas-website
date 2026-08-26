// Backend API Route for AI Counselor (/api/chat)
// Powered by RAG 2026 Ground-Truth Knowledge Base across 20 global study destinations

const RAG_GROUND_TRUTH_SYSTEM_PROMPT = `======================================================================
SYSTEM PROMPT: BHAGWATI OVERSEAS AI STUDY ABROAD & VISA COUNSELOR
======================================================================

You are the Senior International Admissions & Visa Consultant at Bhagwati Overseas Study Abroad (Ladwa, Kurukshetra, Haryana).

YOUR OPERATING RULES:
1. STRICT DOCUMENT GROUNDING (2026 GROUND-TRUTH KNOWLEDGE BASE):
   - Base all answers, eligibility criteria, PTE/IELTS cutoffs, tuition fees, embassy funds, visa steps, and gap rules EXCLUSIVELY on the 2026 Deep Research Report.
   - Never invent rules or quote outdated statistics.

2. FALLBACK FOR UNCOVERED SCENARIOS / COUNTRIES:
   - If a user asks about a niche scenario or a country NOT covered in your Ground-Truth Knowledge Base, DO NOT guess or hallucinate. Instead, respond honestly:
     "This specific pathway requires a case-by-case manual assessment. Please visit our office or click 'Book Free Assessment' for a verified evaluation."

3. SIMPLE, PLAIN & CONCISE LANGUAGE:
   - Explain complex visa and admission processes in simple, everyday language so students and parents can understand easily.
   - Avoid dense legal jargon, robotic filler phrases, and unnecessary introductory fluff.

4. 100% QUESTION RELEVANCE & ACCURACY:
   - Answer ONLY what the user asks.
   - If the user asks for UK universities, list UK universities.
   - If the user asks about Spouse Visa rules, provide spouse visa rules for that country.
   - If the user asks for Latvia costs, provide Latvia tuition, living, and show money.
   - Never dump generic fallback templates when a specific query is asked.

5. CLOSING CALL TO ACTION:
   - Conclude relevant profile queries naturally with:
     'For a personalized document audit and profile shortlisting, visit our office at Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa) or click Book Free Assessment.'
`;

function retrieveGroundTruthResponse(userQuery) {
  const q = userQuery.toLowerCase();

  // CTA String
  const cta = "For a personalized document audit and profile shortlisting, visit our office at Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa) or click Book Free Assessment.";

  // 1. Uncovered Country Fallback Rule
  const uncoveredCountryMatch = q.match(/\b(china|georgia|armenia|philippines|ukraine|belarus|kazakhstan|austria|belgium|switzerland|norway|denmark|czech|portugal|greece|thailand|malaysia)\b/);
  if (uncoveredCountryMatch) {
    return {
      title: "Manual Assessment Required:",
      bullets: [
        "This specific pathway requires a case-by-case manual assessment. Please visit our office or click 'Book Free Assessment' for a verified evaluation."
      ],
      suggestAssessment: true
    };
  }

  // 2. Spouse / Dependent Visa Regulations
  if (q.includes('spouse') || q.includes('dependent') || q.includes('marriage') || q.includes('husband') || q.includes('wife')) {
    if (q.includes('australia') || q.includes('subclass 500')) {
      return {
        title: "Australia Subclass 500 Spouse Visa Regulations (2026 Ground-Truth):",
        bullets: [
          "Master's & Doctoral Enrolment: Spouses enjoy full, unrestricted work rights in Australia if the primary applicant is enrolled in a Master's degree (Coursework or Research) or Doctoral program.",
          "Bachelor's / Diploma Restriction: Spouses accompanying Bachelor's degree students receive restricted work rights (up to 48 hours per fortnight).",
          "Financial & Relationship Verification: Proof of genuine marriage (minimum 1-year living together or registered marriage certificate) and joint bank account funds are strictly verified by Home Affairs under Genuine Student (GS) criteria.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Spouse / Dependent Visa Rules (2026 Ground-Truth):",
        bullets: [
          "Taught Master's Restriction: Dependent visa rights for taught Master's students were ELIMINATED by UKVI. Spouses can no longer accompany students on taught Master's or Bachelor's tracks.",
          "Exempt Programs: Spouses are allowed ONLY if the primary student is enrolled in a PhD / Doctoral program or a research-based Postgraduate program.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('canada')) {
      return {
        title: "Canada Spousal Open Work Permit (SOWP) Rules (2026 Ground-Truth):",
        bullets: [
          "Master's & PhD Exemption: Spousal Open Work Permits (SOWP) are restricted to spouses of students enrolled in Master's, Doctoral, or specific professional degree programs at public DLIs.",
          "Public College & Diploma Restriction: Spouses of students in public college undergraduate diploma or certificate courses are INELIGIBLE for SOWP under IRCC regulations.",
          cta
        ],
        suggestAssessment: true
      };
    }
    return {
      title: "Spouse & Dependent Visa Regulations (2026 Ground-Truth):",
      bullets: [
        "Australia (Subclass 500): Spouses receive full unrestricted work rights if the primary applicant is enrolled in a Master's degree.",
        "United Kingdom (UK): Dependent visas are strictly restricted to PhD and research-focused Master's programs. Taught Master's dependents are eliminated.",
        "Canada: Spousal Open Work Permits (SOWP) are restricted to Master's and PhD students at public DLIs; college diploma dependents are ineligible.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 3. UK Universities Inquiries ("uk universities", "best universities in uk", "in which uk universities indian students do study most in")
  if (q.includes('uk') && (q.includes('univer') || q.includes('college') || q.includes('study most') || q.includes('popular') || q.includes('best') || q.includes('top'))) {
    return {
      title: "Top & Popular UK Universities for Indian Students (2026 Ground-Truth):",
      bullets: [
        "Tier-1 Research Universities: University of Oxford, University of Cambridge, Imperial College London, University College London (UCL), University of Edinburgh, University of Manchester, University of Bristol (highest visa clearance rates).",
        "Mid-Tier & Popular Destinations: University of Birmingham, University of Nottingham, University of Sheffield, Newcastle University, University of East Anglia, Nottingham Trent University, University of De Montfort, University of Hertfordshire, Coventry University, University of Greenwich, Birmingham City University.",
        "High-Employability Fields: Data Science, Artificial Intelligence, Advanced Mechanical Engineering, Biotechnology, Healthcare Management, Finance, and Cyber Security.",
        "Entry Benchmarks: Bachelor's 55%–65% for Master's entry. IELTS 6.5 (no band < 6.0) or PTE 58–65. CBSE/ICSE 70%–80% in 12th English qualifies for MOI waiver (PSEB and HBSE explicitly excluded from MOI).",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 4. Latvia Study Visa Cost & Process ("cost for latvia study visa", "latvia bachelor cost")
  if (q.includes('latvia')) {
    return {
      title: "Latvia Study Visa Cost & Financial Breakdown (2026 Ground-Truth):",
      bullets: [
        "Stage 1: Pre-Admission & AIC Verification – Application fee €150 – €300 (~₹13,500 – ₹27,000 INR) + mandatory Academic Information Centre (AIC) credential verification €50 – €100 (~₹4,500 – ₹9,000 INR). Processing takes 4 weeks.",
        "Stage 2: 1st Year Tuition Fee – Annual tuition fee €3,000 – €6,000 / year (~₹2.70 Lakhs – ₹5.40 Lakhs INR) for Bachelor's or Master's at RTU, University of Latvia, or TSI.",
        "Stage 3: Living Maintenance Norm – €500 – €650 / month (~₹45,000 – ₹58,500 INR/month) estimated living expenses.",
        "Stage 4: Embassy D-Visa & Legalization – Long-term D-Visa application fee €60 + HRD & MEA Apostille attestation of marksheets (~₹7,500 – ₹15,000 INR).",
        "Stage 5: Verifiable Bank Show Money – Bank statement showing minimum €6,000 liquid funds held in student or parent account (~₹5.50 Lakhs – ₹6.50 Lakhs INR).",
        "Post-Study Work Permit: Graduates qualify for a 9-month post-study work permit to seek employment in Latvia.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 5. Canada SDS / PAL / GIC & Tuition Costing ("canada sds 1st year tuition + gic breakdown", "cost of canada")
  if (q.includes('canada') && (q.includes('cost') || q.includes('costing') || q.includes('fee') || q.includes('gic') || q.includes('tuition') || q.includes('sds') || q.includes('pal'))) {
    return {
      title: "Canada Study Permit Financial & Cost Breakdown (2026 Ground-Truth):",
      bullets: [
        "PAL Exemption Rule: Master's and Doctoral degree applicants enrolling at public DLIs are EXEMPT from Provincial Attestation Letter (PAL) requirements. Undergrad/Diploma applicants require a PAL within provincial cap allocations (309,670 total spaces).",
        "SDS Discontinuation: Student Direct Stream (SDS) was permanently discontinued on November 8, 2024. All applicants must apply through the regular study permit stream subject to full financial scrutiny.",
        "Stage 1: Pre-Admission – $300 – $600 CAD (~₹18,300 – ₹36,600 INR) WES credential evaluation ($240 CAD), IELTS fee, application fees.",
        "Stage 2: 1st Year Tuition Deposit – $16,000 – $35,000 CAD (~₹9.76 Lakhs – ₹21.35 Lakhs INR) paid to public DLI prior to PAL/LOA release.",
        "Stage 3: Mandatory GIC Living Deposit – $22,895 CAD (~₹13.96 Lakhs INR) mandatory living deposit in Scotiabank/CIBC outside Quebec ($24,617 CAD in Quebec).",
        "Stage 4: Visa & Biometrics – $150 CAD Visa + $85 CAD Biometrics (~₹14,335 INR total).",
        "Stage 5: Liquid Bank Show Money – Tuition + GIC ($22,895 CAD) (~₹25 Lakhs – ₹38 Lakhs INR total).",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 6. Germany Process & Costs ("germany process", "germany cost", "aps certificate")
  if (q.includes('germany')) {
    return {
      title: "Germany Admission, APS & Blocked Account Breakdown (2026 Ground-Truth):",
      bullets: [
        "Stage 1: Pre-Admission & APS Certificate – Mandatory APS India verification fee ₹18,000 INR (takes 4–8+ weeks) + Uni-Assist application fee (€75 1st school, €30 subsequent).",
        "Stage 2: 1st Year Tuition Deposit – Public university tuition is €0 (Zero Tuition), except in Baden-Württemberg (€1,500/semester). Semester contribution €150 – €400 / semester (~₹13,500 – ₹36,000 INR).",
        "Stage 3: Mandatory Blocked Account (Sperrkonto) – €11,904 / year (~₹10.71 Lakhs INR) deposited in Expatrio/Fintiba (§ 16b AufenthG; allows €992/month withdrawal).",
        "Stage 4: Visa & Insurance – German National Visa fee €75 + VFS charges (~₹7,500 INR) + Public health insurance (TK/AOK) €120 – €140 / month (~₹10,800 – ₹12,600 INR/month).",
        "Undergrad Equivalence: CBSE/ICSE 70%–80%. State board students (HBSE/PSEB) MUST complete 1 year of recognized Indian Bachelor's (60%+) or pass Studienkolleg entrance test (Aufnahmeprüfung).",
        "Post-Study Work Permit: 18-month Post-Study Work Visa (Aufenthaltserlaubnis zur Arbeitsplatzsuche). EU Blue Card leads to PR in 27 months (21 months with B1 German).",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 7. Australia 3-Year Gap / Subclass 500 Costing & Rules
  if (q.includes('australia')) {
    if (q.includes('3 year') || q.includes('3 yrs') || q.includes('gap') || q.includes('gpap')) {
      return {
        title: "Australia Subclass 500 Academic Gap Assessment (2026 Ground-Truth):",
        bullets: [
          "Class 12th Gap Limit: Department of Home Affairs rules cap Class 12th academic gaps at a MAXIMUM of 1 year under Genuine Student (GS) criteria. A 3-year gap after high school faces near-universal rejection under Section 500.214.",
          "Postgraduate Gap Limit: Master's gaps up to 2 to 3 years are acceptable ONLY if backed by official income tax returns (ITR), salary slips showing electronic bank credits, and continuous work experience.",
          "State Board Scrutiny: HBSE (Haryana Board) and PSEB (Punjab Board) qualifications face institutional discounting; Tier-1 Level 1 universities require 75%–85% raw aggregate.",
          "Recommended Alternatives for 3-Year 12th Gap: UK or Latvia/Europe where 2–3 year gaps are accepted, or 1-year Indian degree transfer.",
          cta
        ],
        suggestAssessment: true
      };
    }
    return {
      title: "Australia Subclass 500 Cost & Financial Breakdown (2026 Ground-Truth):",
      bullets: [
        "Stage 1: Pre-Admission – $300 – $500 AUD (~₹16,500 – ₹27,500 INR) language testing, notary, medical exam (₹6,000 – ₹8,000).",
        "Stage 2: 1st Year Tuition Deposit – $30,000 – $48,000 AUD (~₹16.50 Lakhs – ₹26.40 Lakhs INR) for 1st semester/year CoE.",
        "Stage 3: 12-Month Living Expenses – $29,710 AUD (~₹16.34 Lakhs INR) mandatory DHA baseline for single applicant.",
        "Stage 4: Visa Fee & OSHC – Subclass 500 Visa Fee $2,500 AUD (~₹1.37 Lakhs INR) + compulsory OSHC health cover $600 – $800 / year (~₹33,000 INR/year).",
        "Stage 5: Verifiable Bank Show Money – Tuition + Living ($29,710) + Travel ($2,000) = ₹35 Lakhs – ₹48 Lakhs INR held in an approved bank for 3 to 6 months. Immediate family sponsors only.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 8. Language Cutoff Queries (PTE / IELTS)
  if (q.includes('pte') || q.includes('ielts') || q.includes('cutoff') || q.includes('score') || q.includes('english')) {
    return {
      title: "PTE & IELTS Language Benchmarks by Country (2026 Ground-Truth):",
      bullets: [
        "United Kingdom (UK): Master's IELTS 6.5 (no sub-score < 6.0) or PTE 58–65. Undergrad IELTS 6.0 (no sub-score < 5.5). CBSE/ICSE 70%–80% 12th English qualifies for MOI (HBSE/PSEB excluded).",
        "Canada: Master's & Undergrad IELTS 6.5 (no band < 6.0) or PTE 60 (no skill < 58). MOI waivers strictly NOT accepted by IRCC.",
        "Australia: Undergrad IELTS 6.0–6.5; Master's IELTS 6.5 (no band < 6.0) or PTE 58–65 (no skill < 50). MOI strictly NOT accepted by DHA.",
        "United States (USA): IELTS 6.5 (no sub-score < 6.0) or TOEFL 80–90 or PTE 58–65.",
        "Germany: IELTS 6.5–7.0 or TOEFL 90+. MOI rejected by TU9 public research universities.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 9. Academic Gap Queries
  if (q.includes('gap') || q.includes('gpap') || q.includes('passout')) {
    return {
      title: "Academic & Work Gap Acceptance Matrix by Country (2026 Ground-Truth):",
      bullets: [
        "United Kingdom (UK): Class 12th gap max 1–2 years. Post-graduation gap 3–5 years accepted with Form 16/ITR and bank-credited salary statements. Cash salary letters rejected.",
        "Canada: Class 12th gap max 1 year. Postgraduate gap 3–5 years accepted with ITRs, employment contracts, and provident fund (PF) records.",
        "Australia: Class 12th gap MAX 1 year. Postgraduate gap 2–3 years max with continuous electronic bank salary credits. Gaps > 3 years face near-universal rejection under GS assessment.",
        "Germany: Class 12th gap max 1 year for Studienkolleg. Master's gap 2–4 years accepted with continuous employment filings.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 10. Specific Country Handler (USA, France, Italy, Netherlands, Finland, Sweden, Ireland, New Zealand, Singapore, Poland, Spain, Malta, UAE, Korea, Japan, Russia)
  if (q.includes('usa') || q.includes('united states') || q.includes('america')) {
    return {
      title: "United States (USA) F-1 Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "Regulatory Scrutiny: INA Section 214(b) non-immigrant intent evaluation during 2-3 minute physical consular interview (30-35% refusal rate in India).",
        "Form I-20 Cost: $35,000 – $75,000 USD / year (~₹29.4L – ₹63L INR/year) tuition + living.",
        "SEVIS & Visa Fees: SEVIS I-901 fee $350 USD + MRV Visa application fee $185 USD (~₹44,940 INR total).",
        "Liquid Funds: 100% of Form I-20 amount required in verifiable liquid savings/FDs/loans (~₹30L – ₹65L INR). Multi-year projected funds 1.5x–2x total course cost.",
        "PSWP & STEM OPT: 12 months OPT; STEM-designated degrees receive +24 months extension (total 36 months OPT). H-1B dual intent visa via annual lottery.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('france')) {
    return {
      title: "France Study Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "Campus France Process: Mandatory pre-consular screening and interview on Études en France (EeF) portal. Campus France fee €200 – €400 (~₹18,000 – ₹36,000 INR).",
        "Tuition & Living: Public university tuition €2,770 – €3,770/year (Grandes Écoles business schools €10,000 – €20,000/year). Living norm €615/month (€7,380/year) (~₹6.64 Lakhs INR).",
        "Visa & Show Money: Long-stay VLS-TS Visa €50. Bank statement history showing €7,380 living + tuition balance.",
        "PSWP: 2-year APS (Autorisation Provisoire de Séjour) post-study work permit for Master's graduates.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('italy')) {
    return {
      title: "Italy Study Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "Universitaly & CIMEA: Pre-enrollment via Universitaly portal + CIMEA Statement of Comparability (€150).",
        "Tuition & Living: Public university tuition €900 – €4,000/year (based on ISEE family income). Mandatory living expenses €6,000 – €7,000/year (~₹5.40L – ₹6.30L INR).",
        "Visa & Show Money: Type D Student Visa €50. Minimum €6,000 liquid bank balance required (6-month history). Pending DSU scholarship does NOT exempt financial proof.",
        "PSWP: 1-year post-study work permit (Permesso di Soggiorno per Ricerca Occupazione).",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('netherlands') || q.includes('dutch')) {
    return {
      title: "Netherlands TEV Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "WO vs HBO Structure: WO Research Universities require 75%-85% 12th (CBSE/ICSE) or 4-yr B.Tech; 3-yr degrees require 1-yr Pre-Master's. HBO Applied Sciences accept 65%-75% 12th (including State Boards PSEB/HBSE).",
        "IND Living Norm & Fees: Mandatory IND living allowance €13,569.24/year (€1,130.77/month) (~₹12.21 Lakhs INR). IND Visa fee €254 (~₹22,860 INR). Non-EU tuition €11,000 – €22,000/year.",
        "PSWP: 1-year Orientation Year Visa (Zoekjaar) within 3 years of graduation.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('finland') || q.includes('sweden')) {
    return {
      title: "Finland & Sweden Nordic Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "Finland: Apply via Studyinfo.fi. Migri online residence permit fee €600. Non-EU tuition €8,000 – €18,000/year. Mandatory living proof €9,600/year (€800/month) held in student's OWN personal bank account (joint/parent accounts REJECTED). 2-year post-study permit.",
        "Sweden: Apply via Universityadmissions.se. Migrationsverket fee SEK 1,500. Non-EU tuition SEK 90,000 – 140,000/year. Mandatory living proof SEK 103,140/year held in student's personal account. 1-year post-study permit.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('ireland')) {
    return {
      title: "Ireland Student Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "Academic Criteria: Undergrad 70%-80% (CBSE/ICSE) or 80%+ (State Boards). Master's 60%-65% (First Class). IELTS 6.5 (no sub-score < 6.0) or PTE 61. MOI rejected.",
        "Financial Proof: ISD mandatory living proof €10,000 (~₹9.00 Lakhs INR) + 1st year tuition balance (€10,000 – €22,000). Continuous 6-month bank statement history required. Unexplained sudden deposits lead to refusal.",
        "PSWP: Stamp 1G: Bachelor's 1 year; Master's 2 years.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('new zealand') || q.includes('nz')) {
    return {
      title: "New Zealand Fee Paying Student Visa Breakdown (2026 Ground-Truth):",
      bullets: [
        "NZQF Levels: Undergrad Level 7 (65%-75% CBSE/ICSE, 75%-80% State Boards); Master's Level 9 (60%+). IELTS 6.0 (Undergrad) / 6.5 (Master's) or PTE 58. MOI rejected.",
        "Financial Maintenance: INZ living maintenance norm $20,000 NZD/year ($1,666/month) (~₹10.00 Lakhs INR). Visa fee $750 NZD. 6-month bank history required or ANZ Funds Transfer Scheme (FTS).",
        "PSWP: Master's Level 9: 3-year Post-Study Work Visa; Bachelor's Level 7: 3-year Post-Study Work Visa.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('singapore')) {
    return {
      title: "Singapore Student's Pass Breakdown (2026 Ground-Truth):",
      bullets: [
        "Public vs PEI: Autonomous Public (NUS/NTU/SMU 90%+ 12th, IELTS 6.5+) vs EduTrust PEIs (55%+ 12th including State Boards, IELTS 6.0). D2D transfer pathways to UK/Australia.",
        "Costs & Visa: Tuition SGD $14,000 – $38,000/year (~₹8.68L – ₹23.56L INR). Living SGD $12,000 – $15,000/year. ICA SOLAR processing fee SGD $90 ($5,580 INR). Show money SGD $30,000 liquid (3-month history).",
        "PSWP: Public university 1-year LTVP; PEI graduates must secure immediate corporate EP/S Pass sponsorship.",
        cta
      ],
      suggestAssessment: true
    };
  }

  if (q.includes('poland') || q.includes('spain') || q.includes('malta') || q.includes('mauritius') || q.includes('cyprus') || q.includes('dubai') || q.includes('uae') || q.includes('korea') || q.includes('japan') || q.includes('russia')) {
    return {
      title: "Global Visa & Financial Guidelines (2026 Ground-Truth):",
      bullets: [
        "Poland: Tuition €2,500–€5,500/yr, Living €550–€700/mo, Bank show money PLN 12,000 + travel. Visa €80. 9-month TRC post-study permit.",
        "Spain: Public tuition €2,500–€6,000/yr, IPREM living norm €600/mo (€7,200/yr), Visa €80. 12-month post-study job search permit.",
        "Malta: Tuition €5,000–€9,000/yr, Living €800/mo (€9,600/yr), Visa €100 + VFS. 9-month post-study work permit.",
        "Mauritius: Tuition $4,000–$9,000/yr, Living $3,000–$5,000/yr, Visa $150, Show money $4,000. 1-year Young Professional Permit.",
        "Cyprus: Tuition €3,000–€7,000/yr, Living €4,000–€6,000/yr, Ministry Entry Permit €150, Show money €7,000.",
        "UAE (Dubai): Tuition AED 45,000–95,000/yr, Living AED 30,000–45,000/yr, GDRFA Entry Permit & Medical AED 3,000–5,000. 5-Year Green Visa option.",
        "South Korea: D-2 Visa. 12th/Bachelor's 60%+. Tuition ₩4M–₩10M/yr, Living $10k–$12k/yr, Show money $20,000. D-10 Job Seeker Visa.",
        "Japan: Bachelor's 65%+; Master's 4-yr degree. Tuition ¥800k–¥1.5M/yr, Living ¥1M–¥1.2M/yr, Visa ¥3,000, Bank show money ¥2,000,000. Designated Activities Visa.",
        "Russia: General Medicine (PCB 50% General, 40% Reserved; NEET-UG required for India registration). Tuition RUB 250k–550k/yr (~₹2.30L–₹5.06L INR), Living RUB 150k–250k/yr, Show money RUB 200k–400k (unaged). RVPO / RVP permits.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 11. General Conversational Ground-Truth Fallback
  return {
    title: "Bhagwati Overseas Admissions Assistance (2026 Baseline):",
    bullets: [
      "Expert Guidance: We specialize in international university admissions, study visas, CAS/CoE/PAL processing, and document verification for students across Haryana and Punjab.",
      "Destinations Covered: United Kingdom, Canada, Australia, USA, Germany, France, Italy, Netherlands, Finland, Sweden, Latvia, Poland, Spain, Malta, Ireland, New Zealand, Singapore, Mauritius, Cyprus, UAE, South Korea, Japan, and Russia.",
      "Services Provided: University shortlisting, IELTS/PTE waivers, Genuine Student (GS) bank fund verification, APS filings, and visa SOP drafting.",
      cta
    ],
    suggestAssessment: true
  };
}

export async function handleApiChatRequest(reqBody) {
  const messages = reqBody.messages || [];
  const lastMessageObj = messages[messages.length - 1] || {};
  const userQuery = typeof reqBody.message === 'string' ? reqBody.message : (typeof lastMessageObj === 'string' ? lastMessageObj : (lastMessageObj.content || lastMessageObj.text || ''));

  const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    const modelCandidates = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];

    const formattedContents = messages.length > 0 ? messages.map(m => ({
      role: (m.sender === 'user' || m.role === 'user') ? 'user' : 'model',
      parts: [{ text: m.text || m.content || (m.bullets ? m.bullets.join('\n') : '') }]
    })) : [{ role: 'user', parts: [{ text: userQuery }] }];

    for (const modelName of modelCandidates) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: formattedContents,
            system_instruction: { parts: [{ text: RAG_GROUND_TRUTH_SYSTEM_PROMPT }] },
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

  // Ground-Truth RAG Knowledge Base Retriever Engine
  const groundTruthResult = retrieveGroundTruthResponse(userQuery);
  return {
    source: 'rag-ground-truth-engine',
    title: groundTruthResult.title,
    bullets: groundTruthResult.bullets,
    suggestAssessment: groundTruthResult.suggestAssessment
  };
}
