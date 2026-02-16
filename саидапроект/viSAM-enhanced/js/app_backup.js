// Navigation Logic
function showScreen(screenId) {
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the selected screen
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
    }

    // Update bottom navigation active state
    updateBottomNav(screenId);
}

// Update bottom navigation active states
function updateBottomNav(activeScreenId) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === activeScreenId) {
            btn.classList.add('active');
        }
    });
}

// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = 'рџ‘ЃпёЏвЂЌрџ—ЁпёЏ';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = 'рџ‘ЃпёЏ';
    }
}

// Initialize bottom navigation buttons
document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.nav-btn');
    const menuItems = document.querySelectorAll('.menu-item, .nav-btn, .primary-btn, .settings-btn');

    // Add haptic feedback to all interactive elements
    menuItems.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(0.96)';
        });
        item.addEventListener('touchend', () => {
            item.style.transform = 'scale(1)';
        });
        // For desktop
        item.addEventListener('mousedown', () => {
            item.style.transform = 'scale(0.96)';
        });
        item.addEventListener('mouseup', () => {
            item.style.transform = 'scale(1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Load profile from localStorage
    loadProfile();

    navBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const screenId = this.dataset.screen;
            if (screenId) {
                showScreen(screenId);
            }
        });
    });

    // Set home screen as active by default
    showScreen('screen-home');

    // Initial entrance animation
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
});

// Add smooth scroll to top when changing screens
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced showScreen with scroll
const originalShowScreen = showScreen;
showScreen = function (screenId) {
    originalShowScreen(screenId);
    scrollToTop();
};

// ===================================
// Localization Functionality
// ===================================

const translations = {
    ru: {
        app_title: "viSAM - РЈРїСЂР°РІР»РµРЅРёРµ РґРѕРєСѓРјРµРЅС‚Р°РјРё",
        menu_docs: "РЎРїРёСЃРѕРє РґРѕРєСѓРјРµРЅС‚РѕРІ",
        menu_help: "РџРѕРјРѕС‰СЊ",
        menu_profile: "РњРѕР№ РїСЂРѕС„РёР»СЊ",
        menu_apply: "Р—Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° РїРѕРґР°С‡Сѓ",
        home_add_title: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ",
        home_add_text: "РџРѕРјРѕС‰СЊ Рё РїРµСЂРµРІРѕРґС‡РёРє",
        home_add_hint: "РЈРґРѕР±РЅРѕ РІ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРё",
        nav_search: "РџРѕРёСЃРє",
        nav_docs: "Р”РѕРєСѓРјРµРЅС‚С‹",
        nav_account: "РђРєРєР°СѓРЅС‚",
        scan_hint: "РќР°РІРµРґРёС‚Рµ РєР°РјРµСЂСѓ РЅР° РґРѕРєСѓРјРµРЅС‚",
        scanner_title: "AI РЎРєР°РЅРµСЂ РґРѕРєСѓРјРµРЅС‚РѕРІ",
        visa_type: "РўРёРї РІРёР·С‹",
        visa_tourist: "РўСѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ",
        visa_work: "Р Р°Р±РѕС‡Р°СЏ",
        visa_student: "РЎС‚СѓРґРµРЅС‡РµСЃРєР°СЏ",
        visa_business: "Р‘РёР·РЅРµСЃ",
        visa_transit: "РўСЂР°РЅР·РёС‚РЅР°СЏ",
        dest_country: "РЎС‚СЂР°РЅР° РЅР°Р·РЅР°С‡РµРЅРёСЏ",
        country_usa: "РЎРЁРђ",
        country_uk: "Р’РµР»РёРєРѕР±СЂРёС‚Р°РЅРёСЏ",
        country_germany: "Р“РµСЂРјР°РЅРёСЏ",
        country_france: "Р¤СЂР°РЅС†РёСЏ",
        country_canada: "РљР°РЅР°РґР°",
        country_japan: "РЇРїРѕРЅРёСЏ",
        upload_doc: "Р—Р°РіСЂСѓР·РёС‚СЊ РґРѕРєСѓРјРµРЅС‚",
        btn_scan: "РЎРєР°РЅРёСЂРѕРІР°С‚СЊ РґРѕРєСѓРјРµРЅС‚",
        ai_analyzing: "AI Р°РЅР°Р»РёР·РёСЂСѓРµС‚ РґРѕРєСѓРјРµРЅС‚...",
        found_issues: "РќР°Р№РґРµРЅРЅС‹Рµ РїСЂРѕР±Р»РµРјС‹",
        req_for: "РўСЂРµР±РѕРІР°РЅРёСЏ РґР»СЏ",
        missing_docs: "РќРµРґРѕСЃС‚Р°СЋС‰РёРµ РґРѕРєСѓРјРµРЅС‚С‹",
        doc_req_visa: "РўСЂРµР±РѕРІР°РЅРёСЏ Рє РґРѕРєСѓРјРµРЅС‚Р°Рј РЅР° РІРёР·Сѓ",
        doc_temp_id: "Р’СЂРµРјРµРЅРЅРѕРµ СѓРґРѕСЃС‚РѕРІРµСЂРµРЅРёРµ Р»РёС‡РЅРѕСЃС‚Рё",
        doc_sent: "РћС‚РїСЂР°РІР»РµРЅРЅС‹Рµ РґРѕРєСѓРјРµРЅС‚С‹",
        settings_title: "РќР°СЃС‚СЂРѕР№РєРё",
        settings_lang: "рџЊђ РЎРјРµРЅР° СЏР·С‹РєР°",
        save_success: "РџСЂРѕС„РёР»СЊ СѓСЃРїРµС€РЅРѕ СЃРѕС…СЂР°РЅРµРЅ!",
        status_success: "Р”РѕРєСѓРјРµРЅС‚ РїСЂРѕС€РµР» РїСЂРѕРІРµСЂРєСѓ",
        status_error: "РћР±РЅР°СЂСѓР¶РµРЅС‹ РѕС€РёР±РєРё РІ РґРѕРєСѓРјРµРЅС‚Рµ",
        status_attention: "РўСЂРµР±СѓРµС‚СЃСЏ РІРЅРёРјР°РЅРёРµ",
        on: "Р’РєР».",
        off: "Р’С‹РєР».",
        ai_assistant_title: "РР-РџРѕРјРѕС‰РЅРёРє",
        status_online: "РІ СЃРµС‚Рё",
        chat_welcome_ai: "Р—РґСЂР°РІСЃС‚РІСѓР№С‚Рµ! Р§РµРј СЏ РјРѕРіСѓ РІР°Рј РїРѕРјРѕС‡СЊ?",
        btn_close_settings: "Р“РѕС‚РѕРІРѕ",
        viewer_title: "РџСЂРѕСЃРјРѕС‚СЂ РґРѕРєСѓРјРµРЅС‚Р°",
        req_passport: "Р—Р°РіСЂР°РЅРїР°СЃРїРѕСЂС‚",
        req_ds160: "Р¤РѕСЂРјР° DS-160",
        req_photo55: "Р¤РѕС‚Рѕ 5x5 СЃРј",
        req_finance: "Р¤РёРЅ. РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ",
        req_insurance: "РЎС‚СЂР°С…РѕРІРєР°"
    },
    en: {
        app_title: "viSAM - Document Manager",
        menu_docs: "Document List",
        menu_help: "Help",
        menu_profile: "My Profile",
        menu_apply: "Book Appointment",
        nav_search: "Search",
        nav_docs: "Documents",
        nav_account: "Account",
        scanner_title: "AI Document Scanner",
        visa_tourist: "Tourist",
        dest_country: "Destination Country",
        country_usa: "USA",
        btn_scan: "Scan Document",
        ai_analyzing: "AI is analyzing...",
        settings_title: "Settings",
        settings_lang: "рџЊђ Change Language",
        save_success: "Profile saved!",
        status_success: "Check passed",
        on: "On",
        off: "Off",
        ai_assistant_title: "AI Assistant",
        status_online: "online",
        chat_welcome_ai: "Hello! How can I help you?",
        btn_close_settings: "Done",
        viewer_title: "Document Viewer",
        req_passport: "Valid Passport",
        req_ds160: "DS-160 Form",
        req_photo55: "Photo 5x5 cm",
        req_finance: "Proof of finances",
        req_insurance: "Insurance"
    },
    es: { app_title: "viSAM - GestiГіn", settings_lang: "рџЊђ Idioma", on: "On", off: "Off" },
    fr: { app_title: "viSAM - Gestion", settings_lang: "рџЊђ Langue", on: "On", off: "Off" },
    de: { app_title: "viSAM - Verwaltung", settings_lang: "рџЊђ Sprache", on: "On", off: "Off" },
    zh: { app_title: "viSAM - ж–‡д»¶з®Ўзђ†", settings_lang: "рџЊђ иЇ­иЁЂ", on: "ејЂеђЇ", off: "е…ій—­" },
    ar: { app_title: "viSAM - ШҐШЇШ§Ш±Ш©", settings_lang: "рџЊђ Ш§Щ„Щ„ШєШ©", on: "ШЄЩЃШ№ЩЉЩ„", off: "ШҐЩЉЩ‚Ш§ЩЃ" },
    hi: { app_title: "viSAM - а¤ЄаҐЌа¤°а¤¬а¤‚а¤§а¤Ё", settings_lang: "рџЊђ а¤­а¤ѕа¤·а¤ѕ", on: "а¤ља¤ѕа¤ІаҐ‚", off: "а¤¬а¤‚а¤¦" }
};
function showScreen(screenId) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => screen.classList.remove('active'));
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) selectedScreen.classList.add('active');
    updateBottomNav(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBottomNav(activeScreenId) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === activeScreenId) btn.classList.add('active');
    });
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = 'рџ”’';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = 'рџ‘ЃпёЏ';
    }
}
function applyTranslations(lang) {
    const translation = translations[lang] || translations.ru;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translation[key]) {
            if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
                el.placeholder = translation[key];
            } else {
                el.textContent = translation[key];
            }
        }
    });

    document.title = translation.app_title || 'viSAM - Document Manager';
    const settingsTitle = document.querySelector('.settings-header h2');
    if (settingsTitle) settingsTitle.textContent = translation.settings_title;

    const darkLabel = document.getElementById('dark-theme-label');
    if (darkLabel) {
        darkLabel.textContent = document.getElementById('dark-theme-toggle').checked ? translation.on : translation.off;
    }
}
let scannerState = { selectedVisaType: null, selectedCountry: null, uploadedDocument: null, uploadedFileName: null };

const countryRequirements = {
    usa: {
        name: 'country_usa',
        tourist: ['req_passport', 'req_ds160', 'req_photo55', 'req_finance', 'req_hotel', 'req_tickets'],
        work: ['req_passport', 'req_i129', 'req_employer_letter', 'req_qualifications', 'req_contract'],
        student: ['req_i20', 'req_enrolment', 'req_finance', 'req_language_test', 'req_transcript'],
        business: ['req_invitation_biz', 'req_purpose', 'req_registration', 'req_finance'],
        transit: ['req_tickets', 'req_transit_visa', 'req_passport']
    },
    uk: {
        name: 'country_uk',
        tourist: ['req_passport', 'req_online_app', 'req_bank_statement', 'req_accommodation', 'req_itinerary'],
        work: ['req_cos', 'req_qualifications', 'req_language_test', 'req_finance'],
        student: ['req_cas', 'req_language_test', 'req_finance', 'req_edu_docs'],
        business: ['req_invitation_biz', 'req_registration', 'req_bank_statement'],
        transit: ['req_tickets', 'req_transit_visa']
    }
};

function selectVisaType(type) {
    scannerState.selectedVisaType = type;
    document.querySelectorAll('.visa-type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    updateScanButton();
}

function selectCountry(country) {
    scannerState.selectedCountry = country;
    document.querySelectorAll('.country-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-country="${country}"]`).classList.add('active');
    updateScanButton();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    scannerState.uploadedDocument = file;
    scannerState.uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('preview-image').src = e.target.result;
        document.getElementById('uploaded-preview').style.display = 'block';
        document.querySelector('.upload-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
    updateScanButton();
}

function updateScanButton() {
    const scanBtn = document.getElementById('scan-btn');
    scanBtn.disabled = !(scannerState.selectedVisaType && scannerState.selectedCountry && scannerState.uploadedDocument);
}
function saveDocumentToHistory(doc) {
    const imageData = document.getElementById('preview-image').src;
    doc.imageData = imageData;
    let history = JSON.parse(localStorage.getItem('visa_doc_history') || '[]');
    history.unshift(doc);
    localStorage.setItem('visa_doc_history', JSON.stringify(history.slice(0, 20)));
    updateDocumentList();
}

function updateDocumentList() {
    const history = JSON.parse(localStorage.getItem('visa_doc_history') || '[]');
    const docList = document.querySelector('#screen-documents .document-list');
    if (!docList) return;
    docList.innerHTML = history.length ? '' : '<p style="text-align: center; padding: 20px; opacity: 0.5;">No history</p>';
    history.forEach((doc, index) => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `<div onclick="viewDocument(${index})"><h4>${doc.fileName}</h4><p>${doc.country} вЂў ${doc.date}</p></div>`;
        docList.appendChild(item);
    });
}

function viewDocument(index) {
    const history = JSON.parse(localStorage.getItem('visa_doc_history') || '[]');
    const doc = history[index];
    if (!doc) return;
    document.getElementById('viewer-image').src = doc.imageData;
    document.getElementById('viewer-title').textContent = doc.fileName;
    document.getElementById('document-viewer-modal').classList.add('active');
}

function closeDocumentViewer() {
    document.getElementById('document-viewer-modal').classList.remove('active');
}
function displayResults(hasIssues, issues, requirements, countryName, missingDocs, approvalProbability = 50) {
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    document.getElementById('status-text').textContent = hasIssues ? translation.status_error : translation.status_success;

    const requirementsList = document.getElementById('requirements-list');
    const selectedCountryEl = document.getElementById('selected-country-name');
    if (selectedCountryEl) selectedCountryEl.textContent = translation[countryName] || countryName;
    requirementsList.innerHTML = '';
    requirements.forEach(req => {
        const li = document.createElement('li');
        li.className = 'requirement-item';
        li.innerHTML = `<span class="check-icon">вњ“</span> ${translation[req] || req}`;
        requirementsList.appendChild(li);
    });

    const missingDocsSection = document.getElementById('missing-docs-section');
    const missingDocsList = document.getElementById('missing-docs-list');
    missingDocsList.innerHTML = '';
    if (missingDocs.length > 0) {
        missingDocsSection.style.display = 'block';
        missingDocs.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'missing-doc-item';
            li.innerHTML = `<span class="missing-icon">вњ•</span> ${translation[doc] || doc}`;
            missingDocsList.appendChild(li);
        });
    } else {
        missingDocsSection.style.display = 'none';
    }
    document.getElementById('scan-results').style.display = 'block';
}
function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('active');
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    setTimeout(toggleSettings, 300);
}

function saveProfile() {
    const profileData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    localStorage.setItem('user_profile', JSON.stringify(profileData));
    const lang = localStorage.getItem('language') || 'ru';
    alert(translations[lang].save_success);
    showScreen('screen-home');
}
async function callGemini(prompt, imageData = null) {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) return null;
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        let contents = [{ parts: [{ text: prompt }] }];
        if (imageData) contents[0].parts.push({ inline_data: { mime_type: "image/jpeg", data: imageData.split(',')[1] } });
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents }) });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini Error:', error);
        return null;
    }
}

async function handleSendMessage() {
    const input = document.getElementById('chat-user-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    renderChatMessage('user', text, new Date().toLocaleTimeString());
    const aiResponse = await callGemini(text) || "AI is offline";
    renderChatMessage('ai', aiResponse, new Date().toLocaleTimeString());
}

function renderChatMessage(sender, text, time) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.innerHTML = `<div class="message-content"><p>${text}</p><span>${time}</span></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'ru';
    applyTranslations(lang);
    showScreen('screen-home');
});
