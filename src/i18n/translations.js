const translations = {
  en: {
    // ── App / Sidebar ──────────────────────────────
    appName: 'HEAL',
    appTagline: 'Health AI',
    nav_timeline: 'Health Timeline',
    nav_chatbot: 'AI Assistant',
    nav_consent: 'Doctor Access',
    role_label: 'Role',
    logout: 'Logout',

    // ── Auth ───────────────────────────────────────
    auth_brand: 'HEAL',
    auth_tagline: 'Your personal health companion',
    auth_role_patient: 'Patient',
    auth_role_doctor: 'Doctor',
    auth_role_admin: 'Admin',
    auth_id_label: '12-Digit Aadhaar ID',
    auth_id_placeholder: '0000 0000 0000',
    auth_mobile_label: 'Linked Mobile Number',
    auth_mobile_placeholder: '10-digit mobile',
    auth_send_otp: 'Send Verification Code',
    auth_otp_sent_to: 'OTP sent to',
    auth_otp_label: '6-Digit Passcode',
    auth_otp_placeholder: '• • • • • •',
    auth_otp_hint: "Tip: use any 6 digits, e.g. 123456",
    auth_verify: 'Verify & Enter HEAL',
    auth_back: '← Change number',
    auth_invalid_fields: 'Enter a valid 12-digit Aadhaar number and 10-digit mobile number.',
    auth_invalid_otp: "Enter a 6-digit OTP. Try '123456'.",

    // ── Dashboard ─────────────────────────────────
    dash_title: 'Health Timeline',
    dash_subtitle: 'Your chronological repository of indexed medical documents.',
    dash_total: 'Total Records',
    dash_role: 'Role',
    dash_upload: 'Upload Record',
    dash_processing: 'Processing…',
    dash_emergency_label: 'Emergency Access Card',
    dash_blood: 'Type',
    dash_allergy: 'Allergies',
    dash_chronic: 'Chronic',
    dash_qr_btn: 'Show QR Pass →',
    dash_view: 'View',
    dash_empty: 'No records yet.',
    dash_empty_sub: 'Upload a PDF or image report to build your timeline.',
    // QR Modal
    qr_badge: 'Emergency QR Pass',
    qr_title: 'MedPass QR',
    qr_for: 'For first responders & paramedic access',
    qr_blood: 'Blood: O+ · Allergies: Penicillin',
    qr_close: 'Close',

    // ── Chatbot ───────────────────────────────────
    chat_title: 'HEAL AI Assistant',
    chat_subtitle: 'Health-trained · Secure · Confidential',
    chat_greeting: "Hi! I've reviewed your health documents. Ask me anything about your lab results, diagnostic terms, or medical findings — I'll explain in simple, clear language.",
    chat_placeholder: 'e.g. What does high WBC count indicate…',
    chat_send: 'Send',
    chat_suggest_1: 'What does high Bilirubin mean?',
    chat_suggest_2: 'Explain my CBC results',
    chat_suggest_3: 'What does Anemia mean?',
    chat_suggest_4: 'Is my ECG normal?',
    chat_ai_reply: (q) => `Regarding "${q}": based on the medical data in your HEAL vault, this typically falls within expected physiological boundaries. Always follow up with your physician for a formal diagnosis.`,

    // ── Consent ───────────────────────────────────
    consent_title: 'Doctor Access Control',
    consent_subtitle: 'Manage who can view your health records. Clinicians are blocked by default.',
    consent_active: 'Active',
    consent_total: 'Total',
    consent_search: 'Search by name, specialty…',
    consent_status_active: '● Active',
    consent_status_blocked: '● Blocked',
    consent_grant: 'Grant Access',
    consent_revoke: 'Revoke',
    consent_empty: 'No doctors matched your search.',
    consent_note: 'Medical record access is end-to-end encrypted. Revoking access immediately removes the clinician\'s ability to view any documents in your vault.',

    // ── OCR Facility label ─────────────────────────
    ocr_facility: 'AI Cloud OCR',

    // ── Language Switcher ─────────────────────────
    lang_label: 'Language',
  },

  hi: {
    // ── App / Sidebar ──────────────────────────────
    appName: 'HEAL',
    appTagline: 'स्वास्थ्य AI',
    nav_timeline: 'स्वास्थ्य समयरेखा',
    nav_chatbot: 'AI सहायक',
    nav_consent: 'डॉक्टर अनुमति',
    role_label: 'भूमिका',
    logout: 'लॉग आउट',

    // ── Auth ───────────────────────────────────────
    auth_brand: 'HEAL',
    auth_tagline: 'आपका व्यक्तिगत स्वास्थ्य सहायक',
    auth_role_patient: 'मरीज़',
    auth_role_doctor: 'डॉक्टर',
    auth_role_admin: 'प्रशासक',
    auth_id_label: '12-अंकीय आधार आईडी',
    auth_id_placeholder: '0000 0000 0000',
    auth_mobile_label: 'लिंक्ड मोबाइल नंबर',
    auth_mobile_placeholder: '10-अंकीय मोबाइल',
    auth_send_otp: 'OTP भेजें',
    auth_otp_sent_to: 'OTP भेजा गया',
    auth_otp_label: '6-अंकीय पासकोड',
    auth_otp_placeholder: '• • • • • •',
    auth_otp_hint: 'संकेत: कोई भी 6 अंक, जैसे 123456',
    auth_verify: 'सत्यापित करें और HEAL में प्रवेश करें',
    auth_back: '← नंबर बदलें',
    auth_invalid_fields: 'कृपया वैध 12-अंकीय आधार और 10-अंकीय मोबाइल नंबर दर्ज करें।',
    auth_invalid_otp: "6-अंकीय OTP दर्ज करें। '123456' आज़माएं।",

    // ── Dashboard ─────────────────────────────────
    dash_title: 'स्वास्थ्य समयरेखा',
    dash_subtitle: 'आपके अनुक्रमित चिकित्सा दस्तावेज़ों का कालानुक्रमिक भंडार।',
    dash_total: 'कुल रिकॉर्ड',
    dash_role: 'भूमिका',
    dash_upload: 'रिकॉर्ड अपलोड करें',
    dash_processing: 'प्रक्रियारत…',
    dash_emergency_label: 'आपातकालीन एक्सेस कार्ड',
    dash_blood: 'रक्त समूह',
    dash_allergy: 'एलर्जी',
    dash_chronic: 'जीर्ण रोग',
    dash_qr_btn: 'QR पास दिखाएं →',
    dash_view: 'देखें',
    dash_empty: 'अभी कोई रिकॉर्ड नहीं।',
    dash_empty_sub: 'अपनी समयरेखा बनाने के लिए PDF या छवि रिपोर्ट अपलोड करें।',
    // QR Modal
    qr_badge: 'आपातकालीन QR पास',
    qr_title: 'MedPass QR',
    qr_for: 'प्रथम प्रतिसाद व पैरामेडिक्स के लिए',
    qr_blood: 'रक्त: O+ · एलर्जी: पेनिसिलिन',
    qr_close: 'बंद करें',

    // ── Chatbot ───────────────────────────────────
    chat_title: 'HEAL AI सहायक',
    chat_subtitle: 'स्वास्थ्य-प्रशिक्षित · सुरक्षित · गोपनीय',
    chat_greeting: 'नमस्ते! मैंने आपके स्वास्थ्य दस्तावेज़ समीक्षा किए हैं। अपनी लैब रिपोर्ट, चिकित्सा शब्दावली या निदान के बारे में कुछ भी पूछें — मैं सरल भाषा में समझाऊंगा।',
    chat_placeholder: 'जैसे: उच्च WBC गिनती का क्या मतलब है…',
    chat_send: 'भेजें',
    chat_suggest_1: 'उच्च बिलीरुबिन का क्या मतलब है?',
    chat_suggest_2: 'मेरी CBC रिपोर्ट समझाएं',
    chat_suggest_3: 'एनीमिया क्या होता है?',
    chat_suggest_4: 'क्या मेरी ECG सामान्य है?',
    chat_ai_reply: (q) => `"${q}" के संदर्भ में: आपके HEAL वॉल्ट के चिकित्सा डेटा के अनुसार, यह सामान्यतः अपेक्षित शारीरिक सीमाओं के भीतर आता है। औपचारिक निदान के लिए अपने चिकित्सक से परामर्श लें।`,

    // ── Consent ───────────────────────────────────
    consent_title: 'डॉक्टर एक्सेस नियंत्रण',
    consent_subtitle: 'प्रबंधित करें कि कौन आपके स्वास्थ्य रिकॉर्ड देख सकता है। डिफ़ॉल्ट रूप से सभी ब्लॉक हैं।',
    consent_active: 'सक्रिय',
    consent_total: 'कुल',
    consent_search: 'नाम, विशेषता से खोजें…',
    consent_status_active: '● सक्रिय',
    consent_status_blocked: '● अवरुद्ध',
    consent_grant: 'अनुमति दें',
    consent_revoke: 'रद्द करें',
    consent_empty: 'कोई डॉक्टर नहीं मिला।',
    consent_note: 'मेडिकल रिकॉर्ड एक्सेस एंड-टू-एंड एन्क्रिप्टेड है। अनुमति रद्द करने पर चिकित्सक तुरंत आपके दस्तावेज़ नहीं देख सकेगा।',

    // ── OCR Facility label ─────────────────────────
    ocr_facility: 'AI क्लाउड OCR',

    // ── Language Switcher ─────────────────────────
    lang_label: 'भाषा',
  },
};

export default translations;
