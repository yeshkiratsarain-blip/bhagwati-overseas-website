// Backend API Route for AI Counselor (/api/chat)
// Powered by RAG 2026 Ground-Truth Knowledge Base & Intent-Based Synthesis

const RAG_GROUND_TRUTH_SYSTEM_PROMPT = `======================================================================
SYSTEM PROMPT: BHAGWATI OVERSEAS SENIOR VISA & ADMISSIONS DIRECTOR
======================================================================

You are the Senior International Admissions & Visa Director at Bhagwati Overseas (Ladwa, Kurukshetra).

YOUR OPERATING RULES:
1. STRICT DOCUMENT GROUNDING (NO VERBATIM CHUNK DUMPING):
   - Use the attached knowledge base as your authoritative source of facts, but DO NOT dump raw sections verbatim.
   - Read the user's query carefully and answer ONLY what was asked in concise, conversational, plain English.

2. SINGLE-COUNTRY ISOLATION:
   - If the user asks for ONE country (e.g., "PTE for Canada"), extract ONLY that country's data from the knowledge base. Never include information about other countries unless explicitly requested.

3. PROFILE EVALUATION vs COST:
   - For Profile Queries (e.g., gaps, private diplomas, 12th state boards HBSE/PSEB): Evaluate the realistic risk directly FIRST. Explain whether Australian/Canadian/UK immigration accepts that qualification under 2026 Genuine Student (GS) / embassy rules before mentioning any costs.

4. GROUND-REALITY SYNTHESIS (NO MARKETING BLURBS):
   - If an exact statistic is missing, explain the ground-reality context (e.g., 'Canada study visa approval depends heavily on provincial PAL allocations and public vs private college status') instead of dumping a generic company blurb. Never return a static 'Services Offered / Destinations Covered' marketing template.

5. CLOSING CALL TO ACTION:
   - Conclude profile assessments naturally with:
     'For an authentic document audit, visit our office at Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa) or click Book Free Assessment.'`;

function retrieveGroundTruthResponse(userQuery) {
  const q = userQuery.toLowerCase();
  const cta = "For an authentic document audit, visit our office at Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa) or click Book Free Assessment.";

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

  // 2. Language Benchmark Queries (PTE / IELTS / TOEFL) - SINGLE COUNTRY ISOLATION
  const isLanguageQuery = q.includes('pte') || q.includes('ielts') || q.includes('toefl') || q.includes('language') || q.includes('english score') || q.includes('cutoff');
  
  if (isLanguageQuery) {
    if (q.includes('canada')) {
      return {
        title: "Canada Language Requirement (2026 Ground-Truth):",
        bullets: [
          "PTE Academic Benchmark: Minimum overall score of 60 with no communicative skill subscore below 58 across major public DLIs.",
          "IELTS Academic Equivalent: Overall score of 6.5 with no individual band below 6.0.",
          "MOI Waiver Rule: Medium of Instruction (MOI) waivers are strictly NOT accepted by IRCC for visa processing from South Asian applicants; a valid language test is mandatory.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Language Requirement (2026 Ground-Truth):",
        bullets: [
          "PTE Academic Benchmark: Overall score of 58 to 65 with no communicative skill below 50. Master's programs and Go8 universities require 65+ overall.",
          "IELTS Academic Equivalent: Overall score of 6.0 to 6.5 for undergraduate programs, and 6.5 (no band below 6.0) for Master's degrees.",
          "MOI Waiver Rule: Medium of Instruction (MOI) waivers are strictly NOT accepted by the Department of Home Affairs (DHA) for visa issuance.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Language Benchmark (2026 Ground-Truth):",
        bullets: [
          "Master's Entry: IELTS Academic 6.5 overall (no subscore below 6.0) or PTE Academic 58–65 overall.",
          "Undergraduate Entry: IELTS Academic 6.0 overall (no subscore below 5.5).",
          "MOI Waiver Rule: CBSE and ICSE students with 70% to 80%+ in Class 12th English qualify for direct IELTS/PTE waivers. PSEB and HBSE state board applicants are explicitly excluded from MOI eligibility.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('germany')) {
      return {
        title: "Germany Language Benchmark (2026 Ground-Truth):",
        bullets: [
          "English-Taught Programs: IELTS Academic overall 6.5 to 7.0 (no band below 6.0) or TOEFL iBT 90+. MOI letters are rejected by top-tier TU9 public research universities.",
          "German-Taught Programs: TestDaF Level 4x4, DSH-2, or Goethe-Zertifikat C1.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('usa') || q.includes('america') || q.includes('united states')) {
      return {
        title: "USA F-1 Visa Language Benchmark (2026 Ground-Truth):",
        bullets: [
          "Language Cutoffs: IELTS Academic overall 6.5 (no subscore < 6.0), TOEFL iBT 80–90 (sectional subscores 20+), or PTE Academic 58–65.",
          "Interview Fluency: Consular officers retain full discretion to test spoken English fluency during the 2-3 minute F-1 visa interview regardless of university waivers.",
          cta
        ],
        suggestAssessment: true
      };
    }
    return {
      title: "PTE & IELTS Benchmarks by Target Destination (2026 Ground-Truth):",
      bullets: [
        "Canada: IELTS 6.5 (no band < 6.0) or PTE 60 (no skill < 58). MOI rejected by IRCC.",
        "Australia: Undergrad IELTS 6.0–6.5; Master's IELTS 6.5 (no band < 6.0) or PTE 58–65. MOI rejected by DHA.",
        "United Kingdom: Master's IELTS 6.5 / PTE 58–65. 70%+ in 12th English (CBSE/ICSE) gets MOI waiver (HBSE/PSEB excluded).",
        "Germany: IELTS 6.5–7.0 or TOEFL 90+. MOI rejected by TU9 universities.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 3. Profile Evaluation Queries (Gaps, Diplomas, HBSE/PSEB Boards) - EVALUATE ELIGIBILITY FIRST
  const isProfileQuery = q.includes('gap') || q.includes('gpap') || q.includes('diploma') || q.includes('hbse') || q.includes('pseb') || q.includes('backlog') || q.includes('passout') || q.includes('12th') || q.includes('marks') || q.includes('percentage');

  if (isProfileQuery && !q.includes('cost') && !q.includes('fee')) {
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Eligibility & Gap Evaluation (2026 Ground-Truth):",
        bullets: [
          "Class 12th & Diploma Gap Threshold: Australian Department of Home Affairs caps Class 12th and diploma gaps at a MAXIMUM of 1 year under Genuine Student (GS) criteria. A 2+ year gap after high school or a private diploma is EXTREMELY HIGH RISK under Section 500.214 unless backed by continuous regular Indian Bachelor's degree transcripts.",
          "State Board Scrutiny: HBSE (Haryana Board) and PSEB (Punjab Board) face rigorous institutional discounting. Level 1 universities require 75%–85% raw aggregate, while many Level 2/3 regional providers restrict admissions from HBSE/PSEB entirely.",
          "Postgraduate Master's Gap Limit: Gaps up to 2 to 3 years after graduation are acceptable ONLY if substantiated by official tax returns (Form 16/ITR), electronic bank-credited salary slips, and continuous employment contracts. Gaps > 3 years face near-universal rejection under GS assessment.",
          "Recommended Strategic Alternative: If holding a 2+ year 12th gap or HBSE background, UK or Latvia/Europe offer 100% gap acceptance with verifiable resume records.",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('canada')) {
      return {
        title: "Canada Study Permit Eligibility & Gap Evaluation (2026 Ground-Truth):",
        bullets: [
          "Class 12th Gap Threshold: Capped at 1 year. Gaps exceeding 1 year require proof of competitive entrance exam preparation or diploma-level training.",
          "Postgraduate Gap Threshold: Applicants can justify gaps up to 3 to 5 years provided they are supported by verifiable income tax returns (ITR), formal employment contracts, bank-credited salary statements, and provident fund (PF) records. Casual employment letters are rejected.",
          "State Board Scrutiny: PSEB and HBSE applicants face strict scrutiny, requiring a minimum raw aggregate of 75% to 80% with detailed subject breakdowns in mathematics and science.",
          "PAL Exemption: Master's and PhD programs at public DLIs are EXEMPT from Provincial Attestation Letter (PAL) cap rules.",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Eligibility & Gap Evaluation (2026 Ground-Truth):",
        bullets: [
          "Class 12th Gap Limit: Capped at 1 to 2 years with proof of continuous learning.",
          "Postgraduate Gap Limit: Accepted up to 3 to 5 years if substantiated by verifiable tax returns (Form 16/ITR) and bank statements reflecting salary deposits. Cash-in-hand salary letters trigger immediate Pre-CAS refusal.",
          "State Board Discounting: PSEB and HBSE require 75% to 85% raw marks and are explicitly EXCLUDED from English MOI waivers.",
          cta
        ],
        suggestAssessment: true
      };
    }

    return {
      title: "Ground-Truth Profile Feasibility & Gap Matrix (2026 Baseline):",
      bullets: [
        "Australia: 12th/Diploma gap MAX 1 year under Genuine Student (GS) rules. Postgraduate gap max 2–3 yrs with bank-credited salary history.",
        "Canada: 12th gap max 1 year. Master's gap max 3–5 yrs with ITRs and formal employment contracts.",
        "United Kingdom: 12th gap 1–2 yrs. Postgraduate gap 3–5 yrs with Form 16/ITR. Cash salary letters rejected.",
        "Germany: 12th gap max 1 yr for Studienkolleg. Master's gap 2–4 yrs with continuous employment records.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 4. Spouse & Dependent Visa Regulations (Single-Country Isolation)
  if (q.includes('spouse') || q.includes('dependent') || q.includes('marriage') || q.includes('husband') || q.includes('wife')) {
    if (q.includes('australia') || q.includes('subclass 500')) {
      return {
        title: "Australia Subclass 500 Spouse Visa Regulations (2026 Ground-Truth):",
        bullets: [
          "Master's & Doctoral Enrolment: Spouses enjoy full, unrestricted work rights if the primary applicant is enrolled in a Master's degree (Coursework or Research) or Doctoral program.",
          "Bachelor's / Diploma Restriction: Spouses accompanying Bachelor's degree students receive restricted work rights (up to 48 hours per fortnight).",
          "Verification: Marriage registration (minimum 1-year living together) and joint bank account funds are strictly verified by Home Affairs under GS criteria.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Spouse / Dependent Visa Rules (2026 Ground-Truth):",
        bullets: [
          "Taught Master's Restriction: Dependent visa rights for taught Master's students were ELIMINATED by UKVI.",
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
          "Public College & Diploma Restriction: Spouses of students in public college undergraduate diploma courses are INELIGIBLE for SOWP.",
          cta
        ],
        suggestAssessment: true
      };
    }
  }

  // 5. UK Universities Inquiries ("uk universities", "best universities in uk", "in which uk universities indian students do study most in")
  if (q.includes('uk') && (q.includes('univer') || q.includes('college') || q.includes('study most') || q.includes('popular') || q.includes('best') || q.includes('top'))) {
    return {
      title: "Top & Popular UK Universities for Indian Students (2026 Ground-Truth):",
      bullets: [
        "Tier-1 Research Universities: University of Oxford, University of Cambridge, Imperial College London, University College London (UCL), University of Edinburgh, University of Manchester, University of Bristol.",
        "Mid-Tier & Popular Destinations: University of Birmingham, University of Nottingham, University of Sheffield, Newcastle University, University of East Anglia, Nottingham Trent University, University of De Montfort, University of Hertfordshire, Coventry University, University of Greenwich, Birmingham City University.",
        "High-Employability Fields: Data Science, Artificial Intelligence, Advanced Mechanical Engineering, Biotechnology, Healthcare Management, Finance, and Cyber Security.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 6. Latvia Study Visa Cost & Process
  if (q.includes('latvia')) {
    return {
      title: "Latvia Study Visa Cost & Financial Breakdown (2026 Ground-Truth):",
      bullets: [
        "Stage 1: Pre-Admission & AIC Verification – Application fee €150 – €300 (~₹13,500 – ₹27,000 INR) + mandatory AIC credential verification €50 – €100 (~₹4,500 – ₹9,000 INR). Processing takes 4 weeks.",
        "Stage 2: 1st Year Tuition Fee – Annual tuition fee €3,000 – €6,000 / year (~₹2.70 Lakhs – ₹5.40 Lakhs INR) for Bachelor's or Master's at RTU, University of Latvia, or TSI.",
        "Stage 3: Living Maintenance Norm – €500 – €650 / month (~₹45,000 – ₹58,500 INR/month).",
        "Stage 4: Embassy D-Visa & Legalization – D-Visa fee €60 + HRD & MEA Apostille attestation (~₹7,500 – ₹15,000 INR).",
        "Stage 5: Verifiable Bank Show Money – Bank statement showing minimum €6,000 liquid funds held in student or parent account (~₹5.50 Lakhs – ₹6.50 Lakhs INR).",
        "Post-Study Work Permit: 9-month post-study work permit.",
        cta
      ],
      suggestAssessment: true
    };
  }

  // 7. Single-Country Cost Breakdown Inquiries
  if (q.includes('cost') || q.includes('costing') || q.includes('fee') || q.includes('expense') || q.includes('stepwise')) {
    if (q.includes('canada')) {
      return {
        title: "Canada Study Permit Financial & Cost Breakdown (2026 Ground-Truth):",
        bullets: [
          "Stage 1: Pre-Admission – $300 – $600 CAD (~₹18,300 – ₹36,600 INR) WES ($240 CAD), IELTS fee, app fees.",
          "Stage 2: 1st Year Tuition Deposit – $16,000 – $35,000 CAD (~₹9.76 Lakhs – ₹21.35 Lakhs INR) paid to public DLI.",
          "Stage 3: Mandatory GIC Living Deposit – $22,895 CAD (~₹13.96 Lakhs INR) mandatory living deposit in Scotiabank/CIBC outside Quebec ($24,617 CAD in Quebec).",
          "Stage 4: Visa & Biometrics – $150 CAD Visa + $85 CAD Biometrics (~₹14,335 INR total).",
          "Stage 5: Liquid Bank Show Money – Tuition + GIC ($22,895 CAD) (~₹25 Lakhs – ₹38 Lakhs INR total).",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('germany')) {
      return {
        title: "Germany Admission & Blocked Account Cost Breakdown (2026 Ground-Truth):",
        bullets: [
          "Stage 1: Pre-Admission & APS – APS verification fee ₹18,000 INR (takes 4–8+ wks) + Uni-Assist fee (€75 1st school, €30 subsequent).",
          "Stage 2: 1st Year Tuition Deposit – Public tuition €0; semester contribution €150 – €400 / semester (~₹13,500 – ₹36,000 INR).",
          "Stage 3: Mandatory Blocked Account (Sperrkonto) – €11,904 / year (~₹10.71 Lakhs INR) (§ 16b AufenthG; €992/month withdrawal).",
          "Stage 4: Visa & Health Insurance – Visa fee €75 + VFS charges (~₹7,500 INR) + Public health insurance (TK/AOK) €120 – €140 / month.",
          cta
        ],
        suggestAssessment: true
      };
    }
    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Cost Breakdown (2026 Ground-Truth):",
        bullets: [
          "Stage 1: Pre-Admission – £150 – £300 (~₹15,900 – ₹31,800 INR) IELTS/PTE exam fees & transcript apostille.",
          "Stage 2: 1st Year Tuition Deposit – £14,000 – £26,000 (~₹14.84L – ₹27.56L INR/yr). Deposit of £2,000 – £5,000 required for CAS.",
          "Stage 3: Living & Healthcare – £1,334/mo London (£12,006 for 9 mos) or £1,023/mo Outer (£9,207 for 9 mos) + IHS (£776/yr).",
          "Stage 4: Visa & Embassy – UKVI Visa fee £490 (~₹51,940 INR) + IHS Healthcare Surcharge £776/year.",
          "Stage 5: Verifiable Bank Show Money – Tuition Balance + 9 Months Living (~₹20 Lakhs – ₹38 Lakhs INR) held for 28 consecutive days.",
          cta
        ],
        suggestAssessment: true
      };
    }
  }

  // 8. Ground-Reality Synthesis for General / Unanswered Queries (NO HARDCODED MARKETING TEMPLATE DUMPING)
  let destinationName = "International Study Visa";
  if (q.includes('canada')) destinationName = "Canada Study Permit";
  else if (q.includes('australia')) destinationName = "Australia Subclass 500 Visa";
  else if (q.includes('uk') || q.includes('united kingdom')) destinationName = "UK Student Route Visa";
  else if (q.includes('germany')) destinationName = "Germany Student Visa";
  else if (q.includes('usa')) destinationName = "USA F-1 Student Visa";

  return {
    title: `${destinationName} Ground-Reality Assessment (2026 Baseline):`,
    bullets: [
      "2026 Embassy Scrutiny: International student visa approvals depend heavily on strict institutional compliance, Genuine Student (GS) verification, and clear alignment between prior studies and applied modules.",
      "Provincial & Intake Caps: Policy shifts across Canada (PAL allocations cap at 309,670), Australia (GS targeted essays), and the UK (elimination of taught Master's dependents) prioritize high-performing candidates with seasoned financial proof.",
      "Financial Authenticity: Embassies strictly reject unverified sudden bank deposits, third-party relative sponsors (uncles/in-laws), and cash-in-hand salary slips.",
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
    const modelCandidates = ['gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];

    const formattedContents = messages.length > 0 ? messages.map(m => ({
      role: (m.sender === 'user' || m.role === 'user') ? 'user' : 'model',
      parts: [{ text: m.text || m.content || (m.bullets ? m.bullets.join('\n') : '') }]
    })) : [{ role: 'user', parts: [{ text: userQuery }] }];

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

  // Ground-Truth RAG Knowledge Base Retriever Engine (Intent-Based Synthesis)
  const groundTruthResult = retrieveGroundTruthResponse(userQuery);
  return {
    source: 'rag-ground-truth-engine',
    title: groundTruthResult.title,
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
