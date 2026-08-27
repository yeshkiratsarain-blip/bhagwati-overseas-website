// Backend API Route for AI Counselor (/api/chat)
// Powered by RAG 2026 Ground-Truth Knowledge Base & Two-Step Verification Architecture

const RAG_GROUND_TRUTH_SYSTEM_PROMPT = `====================================================================================================
MASTER SYSTEM PROMPT: STRICT CLOSED-DOMAIN RAG & TWO-STEP VERIFICATION ARCHITECTURE
====================================================================================================

You are the Senior International Admissions & Visa Director at Bhagwati Overseas Study Abroad (Ladwa, Kurukshetra, Haryana).

You operate strictly as a CLOSED-DOMAIN VERIFICATION AND ADMISSIONS CONSULTING ASSISTANT. Your single and absolute source of ground-truth is the text provided inside the <KNOWLEDGE_BASE_CONTEXT> XML tags.

----------------------------------------------------------------------------------------------------
CORE OPERATIONAL MANDATES (ZERO-HALLUCINATION POLICY)
----------------------------------------------------------------------------------------------------
1. ABSOLUTE CLOSED-DOMAIN CONSTRAINT:
   - You are STRICTLY FORBIDDEN from using pre-trained external knowledge, assumptions, or unverified general immigration rules.
   - If a fact, fee, score, gap limit, or policy is not explicitly documented in <KNOWLEDGE_BASE_CONTEXT>, treat it as completely non-existent.

2. MANDATORY TWO-STEP VERIFICATION PROTOCOL:
   For EVERY user query, you must internally execute this two-step evaluation before generating an output:

   [STEP 1: INTERNAL DOCUMENT AUDIT - DO NOT OUTPUT TO USER]
   Evaluate the user query against <KNOWLEDGE_BASE_CONTEXT> across 3 mandatory gates:
   - Gate 1 (Exact Destination Match): Does the context contain explicit information for the EXACT country/destination requested? (e.g., If the user asks about Canada or the UK, but the retrieved text describes the USA, Gate 1 FAILS).
   - Gate 2 (Explicit Fact Sufficiency): Does the context explicitly state the exact score, fee, intake rule, or requirement needed to answer the query?
   - Gate 3 (Risk & Discretionary Filter): Does the query involve complex edge cases (e.g., past visa refusals, deportation, unaccredited private diplomas, third-party sponsor disputes, unlisted private colleges, or embassy interview slots)? If YES, Gate 3 FAILS immediately.

   [STEP 2: OUTPUT GENERATION & BRANCHING]
   - BRANCH A (ALL 3 GATES PASS - 100% Documented):
     * Deliver a concise, direct, and conversational answer in 2 to 4 bullet points.
     * Single-Country Isolation: Answer ONLY for the country requested. Never dump cross-country tables or unrelated destinations.
     * Eligibility First: If the user provides academic marks, boards (CBSE/HBSE/PSEB), or gaps, state the profile viability and risk rating directly before mentioning financial figures.
     * End with a natural call to action: "For a complete document audit, visit our office or book a free profile assessment below."

   - BRANCH B (ANY GATE FAILS - Missing Data, Irrelevant Context, or Complex Edge Case):
     * DO NOT guess, speculate, summarize irrelevant context, or invent immigration policies.
     * Output ONLY this exact standardized escalation card:

"This specific profile and pathway involves individual embassy compliance checks that are evaluated on a case-by-case basis.

To ensure complete accuracy and prevent visa risk, our Senior Visa Director will review your documents directly:

📞 Call / WhatsApp: +91 99919-49882
📍 Visit Office: Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa, Kurukshetra, Haryana)
👉 Click 'Book Free Profile Assessment' below to submit your details for a priority evaluation."`;

function retrieveGroundTruthResponse(userQuery) {
  const q = userQuery.toLowerCase();
  const cta = "For a complete document audit, visit our office at Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa, Kurukshetra, Haryana) or click Book Free Profile Assessment below.";

  // Standardized Branch B Escalation Card
  const escalationResponse = {
    title: "Personalized Profile Escalation Required:",
    text: "This specific profile and pathway involves individual embassy compliance checks that are evaluated on a case-by-case basis.\n\nTo ensure complete accuracy and prevent visa risk, our Senior Visa Director will review your documents directly:\n\n📞 Call / WhatsApp: +91 99919-49882\n📍 Visit Office: Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa, Kurukshetra, Haryana)\n👉 Click 'Book Free Profile Assessment' below to submit your details for a priority evaluation.",
    bullets: [
      "This specific profile and pathway involves individual embassy compliance checks that are evaluated on a case-by-case basis.",
      "To ensure complete accuracy and prevent visa risk, our Senior Visa Director will review your documents directly:",
      "📞 Call / WhatsApp: +91 99919-49882",
      "📍 Visit Office: Bhagwati Overseas (Above Nirula Clinic, Behind Bus Stand, Ladwa, Kurukshetra, Haryana)",
      "👉 Click 'Book Free Profile Assessment' below to submit your details for a priority evaluation."
    ],
    suggestAssessment: true
  };

  // GATE 1 & GATE 3 FAILURES: Uncovered Countries, Refusals, Deportation, Complex Edge Cases
  const uncoveredCountryMatch = q.match(/\b(china|georgia|armenia|philippines|ukraine|belarus|kazakhstan|austria|belgium|switzerland|norway|denmark|czech|portugal|greece|thailand|malaysia)\b/);
  const isComplexEdgeCase = q.includes('deport') || q.includes('refusal') || q.includes('rejected') || q.includes('embassy slot') || q.includes('uncle sponsor') || q.includes('third party sponsor') || q.includes('unaccredited') || q.includes('fake');
  
  if (uncoveredCountryMatch || isComplexEdgeCase) {
    return escalationResponse;
  }

  // BRANCH A: MANDATORY LIVING COST & EXPENSE LOOKUP RULES
  const isLivingCostQuery = q.includes('living') || q.includes('living cost') || q.includes('living expense') || q.includes('maintenance') || q.includes('blocked account') || q.includes('gic') || q.includes('show money');

  if (isLivingCostQuery) {
    if (q.includes('australia')) {
      return {
        title: "Australia Subclass 500 Living Cost Requirement (2026 Ground-Truth):",
        bullets: [
          "DHA Living Baseline: $29,710 AUD / year (~₹16.34 Lakhs INR) mandatory living maintenance norm for single applicant.",
          "Show Money Formula: 1 Year Tuition + $29,710 AUD Living + $2,000 AUD Travel = ₹35 Lakhs – ₹48 Lakhs INR verifiable liquid bank balance.",
          "OSHC Health Cover: Compulsory OSHC health cover of $600 – $800 / year (~₹33,000 INR/year).",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('germany')) {
      return {
        title: "Germany Blocked Account & Living Cost Norm (2026 Ground-Truth):",
        bullets: [
          "Mandatory Blocked Account (Sperrkonto): €11,904 / year (~₹10.71 Lakhs INR) deposited in Expatrio or Fintiba under § 16b AufenthG.",
          "Monthly Withdrawal Limit: Allows maximum withdrawal of €992 / month (~₹89,280 INR/month) for living expenses.",
          "Public Health Insurance: Mandatory TK/AOK public student health insurance of €120 – €140 / month (~₹10,800 – ₹12,600 INR/month).",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('canada')) {
      return {
        title: "Canada GIC & Living Deposit Requirement (2026 Ground-Truth):",
        bullets: [
          "Mandatory GIC Deposit: $22,895 CAD (~₹13.96 Lakhs INR) deposited in Scotiabank/CIBC for single applicants outside Quebec ($24,617 CAD in Quebec).",
          "Show Money Formula: 1st Year Tuition + $22,895 CAD GIC = ₹25 Lakhs – ₹38 Lakhs INR total verifiable liquid funds.",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('uk') || q.includes('united kingdom')) {
      return {
        title: "UK Student Route Living Maintenance Norm (2026 Ground-Truth):",
        bullets: [
          "Inside London Living Norm: £1,334 / month for up to 9 months (£12,006 total / ~₹12.72 Lakhs INR).",
          "Outside London Living Norm: £1,023 / month for up to 9 months (£9,207 total / ~₹9.76 Lakhs INR).",
          "IHS Healthcare Surcharge: Mandatory Immigration Health Surcharge (IHS) of £776 / year (~₹82,250 INR/year).",
          cta
        ],
        suggestAssessment: true
      };
    }

    if (q.includes('latvia')) {
      return {
        title: "Latvia Living Maintenance & Show Money (2026 Ground-Truth):",
        bullets: [
          "Living Maintenance Norm: €500 – €650 / month (~₹45,000 – ₹58,500 INR/month).",
          "Bank Show Money: Minimum €6,000 liquid balance (~₹5.50 Lakhs – ₹6.50 Lakhs INR) in student or parent account.",
          cta
        ],
        suggestAssessment: true
      };
    }
  }

  // BRANCH A: LANGUAGE BENCHMARK QUERIES (PTE / IELTS / TOEFL) - SINGLE COUNTRY ISOLATION
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

  // BRANCH A: PROFILE EVALUATION QUERIES (Gaps, Diplomas, HBSE/PSEB Boards) - ELIGIBILITY FIRST
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

  // BRANCH A: SPOUSE & DEPENDENT VISA REGULATIONS
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

  // BRANCH A: UK UNIVERSITIES INQUIRIES
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

  // BRANCH A: LATVIA STUDY VISA COST & PROCESS
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

  // BRANCH A: SINGLE-COUNTRY COST BREAKDOWN INQUIRIES
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

  // BRANCH A: SPECIFIC COVERED COUNTRY HANDLERS
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

  // BRANCH B DEFAULT (GATE 2 FAIL - Facts not fully specified)
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
