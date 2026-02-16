import * as storage from './modules/storage.js';
import { secureStorage } from './modules/encryption.js';
import * as ocr from './modules/ocr.js';
import * as camera from './modules/camera.js';

// Navigation Logic
export function showScreen(screenId) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => screen.classList.remove('active'));
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) selectedScreen.classList.add('active');
    updateBottomNav(screenId);
    scrollToTop();
}
window.showScreen = showScreen;

function updateBottomNav(activeScreenId) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === activeScreenId) btn.classList.add('active');
    });
}

export function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}
window.togglePassword = togglePassword;

document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const screenId = this.dataset.screen;
            if (screenId) showScreen(screenId);
        });
    });
});
const translations = {
    ru: {
        app_title: "viSAM - Управление документами",
        menu_docs: "Список документов",
        menu_help: "Помощь",
        menu_profile: "Мой профиль",
        menu_apply: "Записаться на подачу",
        home_add_title: "Дополнительно",
        home_add_text: "Помощь и переводчик",
        home_add_hint: "Удобно в использовании",
        nav_search: "Поиск",
        nav_docs: "Документы",
        nav_account: "Аккаунт",
        scan_hint: "Наведите камеру на документ",
        scanner_title: "AI Сканер документов",
        visa_type: "Тип визы",
        visa_tourist: "Туристическая",
        visa_work: "Рабочая",
        visa_student: "Студенческая",
        visa_business: "Бизнес",
        visa_transit: "Транзитная",
        dest_country: "Страна назначения",
        country_usa: "США",
        country_uk: "Великобритания",
        country_germany: "Германия",
        country_france: "Франция",
        country_canada: "Канада",
        country_japan: "Япония",
        upload_doc: "Загрузить документ",
        upload_click: "Нажмите для загрузки документа",
        upload_camera: "или используйте камеру",
        btn_scan: "Сканировать документ",
        ai_analyzing: "AI анализирует документ...",
        found_issues: "Найденные проблемы",
        req_for: "Требования для",
        missing_docs: "Недостающие документы",
        doc_req_visa: "Требования к документам на визу",
        doc_temp_id: "Временное удостоверение личности",
        doc_sent: "Отправленные документы",
        label_name: "Имя",
        label_email: "Email",
        label_phone: "Номер телефона",
        label_password: "Пароль",
        btn_save: "Сохранить изменения",
        settings_title: "Настройки",
        settings_lang: "🌐 Смена языка",
        lang_desc: "Выберите язык интерфейса",
        settings_dark: "🌙 Темная тема",
        dark_theme_desc: "Полезно для ночного заполнения анкет",
        settings_notify: "🔔 Уведомления",
        notifications_desc: "Получайте уведомления о статусе вашей визы",
        settings_ai: "🤖 Настройки Gemini AI",
        ai_desc: "Интеграция с реальным интеллектом для чата и анализа документов. AI всегда активен.",
        gemini_key: "Gemini API Key",
        gemini_placeholder: "Вставьте ваш API ключ...",
        key_hint: "Ключ хранится локально в вашем браузере.",
        get_key: "Получить ключ →",
        save_success: "Профиль успешно сохранен!",
        status_success: "Документ прошел проверку",
        status_error: "Обнаружены ошибки в документе",
        status_attention: "Требуется внимание",
        on: "Вкл.",
        off: "Выкл.",
        ai_assistant_title: "ИИ-Помощник",
        status_online: "в сети",
        chat_welcome: "Вам нужна помощь нашей команды?",
        chat_start: "Написать сообщение...",
        chat_welcome_ai: "Здравствуйте! Чем я могу вам помочь?",
        chat_input_placeholder: "Введите сообщение...",
        btn_close_settings: "Готово",
        viewer_title: "Просмотр документа",
        req_passport: "Загранпаспорт",
        req_ds160: "Форма DS-160",
        req_photo55: "Фото 5x5 см",
        req_finance: "Фин. подтверждение",
        req_insurance: "Страховка",
        help_item_1: "Типы документов для визы",
        help_item_2: "Правила оформления документов",
        help_item_3: "Инструкция по заполнению",
        help_item_4: "Загрузка совместных документов",
        help_item_5: "Связь с поддержкой",
        help_item_6: "Регистрация и подача",
        install_guide_title: "Инструкция по установке",
        guide_android: "Нажмите на три точки в углу браузера и выберите \"Установить приложение\" или \"Добавить на главный экран\".",
        guide_ios: "Нажмите кнопку \"Поделиться\" (квадрат со стрелкой) и выберите \"На экран «Домой»\".",
        guide_desktop: "Нажмите на иконку монитора со стрелкой в адресной строке браузера.",
        approval_probability: "Вероятность одобрения",
        country_korea: "Южная Корея",
        country_china: "Китай",
        country_australia: "Австралия",
        country_turkey: "Турция",
        req_itinerary: "Маршрут поездки",
        req_accommodation: "Подтверждение проживания",
        req_bank_statement: "Выписка из банка",
        req_online_app: "Онлайн анкета",
        req_employer_letter: "Справка с работы",
        req_job_offer: "Предложение о работе",
        req_qualifications: "Дипломы/Сертификаты",
        req_admission: "Письмо о зачислении",
        req_work_permit: "Разрешение на работу",
        req_campus_france: "Campus France",
        req_loi: "Letter of Introduction",
        req_caq_quebec: "CAQ (Квебек)",
        req_photo_japan: "Фото (Япония)",
        req_guarantee: "Гарантийное письмо",
        req_coe: "CoE (Certificate of Eligibility)",
        req_keta: "K-ETA",
        req_jw202: "Форма JW202/201",
        req_nomination: "Подтверждение номинации",
        req_skills: "Оценка квалификации",
        req_coe_aus: "CoE (Австралия)",
        req_evisa: "Электронная виза (e-Visa)"
    },
    en: {
        app_title: "viSAM - Document Manager",
        menu_docs: "Document List",
        menu_help: "Help",
        menu_profile: "My Profile",
        menu_apply: "Book Appointment",
        home_add_title: "Additional",
        home_add_text: "Help and Translator",
        home_add_hint: "Convenient to use",
        nav_search: "Search",
        nav_docs: "Documents",
        nav_account: "Account",
        scan_hint: "Point camera at document",
        scanner_title: "AI Document Scanner",
        visa_type: "Visa Type",
        visa_tourist: "Tourist",
        visa_work: "Work",
        visa_student: "Student",
        visa_business: "Business",
        visa_transit: "Transit",
        dest_country: "Destination Country",
        country_usa: "USA",
        country_uk: "United Kingdom",
        country_germany: "Germany",
        country_france: "France",
        country_canada: "Canada",
        country_japan: "Japan",
        upload_doc: "Upload Document",
        upload_click: "Click to upload document",
        upload_camera: "or use camera",
        btn_scan: "Scan Document",
        ai_analyzing: "AI is analyzing document...",
        found_issues: "Found Issues",
        req_for: "Requirements for",
        missing_docs: "Missing Documents",
        doc_req_visa: "Visa Document Requirements",
        doc_temp_id: "Temporary ID",
        doc_sent: "Sent Documents",
        label_name: "Name",
        label_email: "Email",
        label_phone: "Phone Number",
        label_password: "Password",
        btn_save: "Save Changes",
        settings_title: "Settings",
        settings_lang: "🌐 Change Language",
        lang_desc: "Choose interface language",
        settings_dark: "🌙 Dark Theme",
        dark_theme_desc: "Useful for night-time form filling",
        settings_notify: "🔔 Notifications",
        notifications_desc: "Receive notifications about your visa status",
        settings_ai: "🤖 Gemini AI Settings",
        ai_desc: "Integration with real intelligence for chat and document analysis. AI is always active.",
        gemini_key: "Gemini API Key",
        gemini_placeholder: "Paste your API key here...",
        key_hint: "Key is stored locally in your browser.",
        get_key: "Get Key →",
        save_success: "Profile saved successfully!",
        status_success: "Document passed check",
        status_error: "Errors found in document",
        status_attention: "Attention required",
        on: "On",
        off: "Off",
        ai_assistant_title: "AI Assistant",
        status_online: "online",
        chat_welcome: "Do you need help from our team?",
        chat_start: "Write a message...",
        chat_welcome_ai: "Hello! How can I help you?",
        chat_input_placeholder: "Enter message...",
        btn_close_settings: "Done",
        viewer_title: "Document Viewer",
        req_passport: "Passport",
        req_ds160: "DS-160 Form",
        req_photo55: "Photo 5x5 cm",
        req_finance: "Finance proof",
        req_insurance: "Insurance",
        help_item_1: "Visa document types",
        help_item_2: "Document rules",
        help_item_3: "Filling instructions",
        help_item_4: "Uploading joint documents",
        help_item_5: "Contact support",
        help_item_6: "Registration and filing",
        install_guide_title: "Installation Guide",
        guide_android: "Click on the three dots in the browser corner and select \"Install App\" or \"Add to Home Screen\".",
        guide_ios: "Click the \"Share\" button (square with arrow) and select \"Add to Home Screen\".",
        guide_desktop: "Click on the monitor icon with an arrow in the browser address bar.",
        approval_probability: "Approval Probability",
        country_korea: "South Korea",
        country_china: "China",
        country_australia: "Australia",
        country_turkey: "Turkey",
        req_itinerary: "Travel Itinerary",
        req_accommodation: "Accommodation Proof",
        req_bank_statement: "Bank Statement",
        req_online_app: "Online Application",
        req_employer_letter: "Employer Letter",
        req_job_offer: "Job Offer",
        req_qualifications: "Qualifications",
        req_admission: "Admission Letter",
        req_work_permit: "Work Permit",
        req_campus_france: "Campus France",
        req_loi: "Letter of Introduction",
        req_caq_quebec: "CAQ (Quebec)",
        req_photo_japan: "Photo (Japan)",
        req_guarantee: "Guarantee Letter",
        req_coe: "CoE (Certificate of Eligibility)",
        req_keta: "K-ETA",
        req_jw202: "JW202/201 Form",
        req_nomination: "Nomination Proof",
        req_skills: "Skills Assessment",
        req_coe_aus: "CoE (Australia)",
        req_evisa: "e-Visa"
    },
    es: { app_title: "viSAM - Gestión", settings_lang: "🌐 Idioma", on: "On", off: "Off" },
    fr: { app_title: "viSAM - Gestion", settings_lang: "🌐 Langue", on: "On", off: "Off" },
    de: { app_title: "viSAM - Verwaltung", settings_lang: "🌐 Sprache", on: "On", off: "Off" },
    zh: { app_title: "viSAM - 文件管理", settings_lang: "🌐 语言", on: "开启", off: "关闭" },
    ar: { app_title: "viSAM - إدارة", settings_lang: "🌐 اللغة", on: "تفعيل", off: "إيقاف" },
    hi: { app_title: "viSAM - प्रबंधन", settings_lang: "🌐 भाषा", on: "चालू", off: "बंद" }
};
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

export function openScanner() {
    showScreen('screen-ai-scanner');
}
window.openScanner = openScanner;

export function removeDocument() {
    scannerState.uploadedDocument = null;
    scannerState.uploadedFileName = null;
    const previewImg = document.getElementById('preview-image');
    if (previewImg) previewImg.src = '';
    const uploadPreview = document.getElementById('uploaded-preview');
    if (uploadPreview) uploadPreview.style.display = 'none';
    const placeholder = document.querySelector('.upload-placeholder');
    if (placeholder) placeholder.style.display = 'block';
    updateScanButton();
}
window.removeDocument = removeDocument;

// Inline Camera Logic
export async function startInlineCamera() {
    try {
        await camera.initCamera('camera-preview-inline');
        document.getElementById('camera-preview-inline').style.display = 'block';
        document.getElementById('camera-controls-inline').style.display = 'flex';
        document.querySelector('.upload-placeholder').style.display = 'none';
        document.getElementById('open-camera-btn').style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
}
window.startInlineCamera = startInlineCamera;

export function stopInlineCamera() {
    camera.stopCamera();
    document.getElementById('camera-preview-inline').style.display = 'none';
    document.getElementById('camera-controls-inline').style.display = 'none';
    if (!scannerState.uploadedDocument) {
        document.querySelector('.upload-placeholder').style.display = 'block';
    }
    document.getElementById('open-camera-btn').style.display = 'block';
}
window.stopInlineCamera = stopInlineCamera;

export async function captureFromInlineCamera() {
    const photo = await camera.capturePhotoEnhanced();
    stopInlineCamera();

    // Create a Blob from the data URL for scannerState
    const response = await fetch(photo);
    const blob = await response.blob();

    scannerState.uploadedDocument = blob;
    scannerState.uploadedFileName = `camera_capture_${Date.now()}.jpg`;

    const previewImg = document.getElementById('preview-image');
    if (previewImg) previewImg.src = photo;
    const uploadPreview = document.getElementById('uploaded-preview');
    if (uploadPreview) uploadPreview.style.display = 'block';

    updateScanButton();
}
window.captureFromInlineCamera = captureFromInlineCamera;

export async function scanDocument() {
    const loader = document.getElementById('scanning-loader');
    const scanBtn = document.getElementById('scan-btn');
    const resultsArea = document.getElementById('scan-results');

    if (loader) loader.style.display = 'block';
    if (scanBtn) scanBtn.disabled = true;
    if (resultsArea) resultsArea.style.display = 'none';

    try {
        const imageData = document.getElementById('preview-image').src;
        const results = await ocr.analyzeDocument(
            imageData,
            scannerState.selectedVisaType,
            scannerState.selectedCountry
        );

        displayResults(
            results.hasIssues || false,
            results.issues || [],
            results.requirements || [],
            scannerState.selectedCountry,
            results.missingDocs || [],
            results.approvalProbability || 50
        );

        await saveDocumentToHistory({
            fileName: scannerState.uploadedFileName,
            country: scannerState.selectedCountry,
            visaType: scannerState.selectedVisaType,
            hasIssues: results.hasIssues,
            analysis: results
        });

        // AI Auto-Fill Feature
        if (results.extractedInfo) {
            handleAIAutoFill(results.extractedInfo);
        }

    } catch (error) {
        console.error('Scan Error:', error);
        const lang = localStorage.getItem('language') || 'ru';
        const msg = lang === 'ru' ?
            'Ошибка при анализе документа. Проверьте ваш API ключ в настройках.' :
            'Failed to analyze document. Please check your API key in settings.';
        alert(msg);
    } finally {
        if (loader) loader.style.display = 'none';
        if (scanBtn) scanBtn.disabled = false;
    }
}
window.scanDocument = scanDocument;

export function toggleDarkTheme() {
    const isDark = document.getElementById('dark-theme-toggle').checked;
    const theme = isDark ? 'theme-dark' : 'theme-light';

    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
    localStorage.setItem('dark-theme', isDark);

    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;
    const darkLabel = document.getElementById('dark-theme-label');
    if (darkLabel) {
        darkLabel.textContent = isDark ? translation.on : translation.off;
    }
}
window.toggleDarkTheme = toggleDarkTheme;

export function toggleNotifications() {
    const isOn = document.getElementById('notifications-toggle').checked;
    localStorage.setItem('notifications-enabled', isOn);

    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;
    const notifyLabel = document.getElementById('notifications-label');
    if (notifyLabel) {
        notifyLabel.textContent = isOn ? translation.on : translation.off;
    }
}
window.toggleNotifications = toggleNotifications;

export function toggleInstallInstructions() {
    const modal = document.getElementById('install-instructions-modal');
    if (modal) modal.classList.toggle('active');
}
window.toggleInstallInstructions = toggleInstallInstructions;

export async function saveGeminiKey() {
    const key = document.getElementById('gemini-api-key').value.trim();
    await secureStorage.setItem('gemini_api_key', key);
}
window.saveGeminiKey = saveGeminiKey;

export function toggleGeminiKeyVis() {
    const input = document.getElementById('gemini-api-key');
    input.type = input.type === 'password' ? 'text' : 'password';
}
window.toggleGeminiKeyVis = toggleGeminiKeyVis;
function applyTranslations(lang) {
    const translation = translations[lang] || translations.en || translations.ru;
    const fallback = translations.en || translations.ru;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = translation[key] || fallback[key] || translations.ru[key];

        if (translatedText) {
            if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
                el.placeholder = translatedText;
            } else {
                el.textContent = translatedText;
            }

            if (el.hasAttribute('title')) {
                el.setAttribute('title', translatedText);
            }
            if (el.hasAttribute('aria-label')) {
                el.setAttribute('aria-label', translatedText);
            }
        }
    });

    document.title = (translation.app_title || fallback.app_title) || 'viSAM - Document Manager';

    const darkToggle = document.getElementById('dark-theme-toggle');
    const darkLabel = document.getElementById('dark-theme-label');
    if (darkToggle && darkLabel) {
        darkLabel.textContent = darkToggle.checked ? (translation.on || fallback.on) : (translation.off || fallback.off);
    }

    const notifyToggle = document.getElementById('notifications-toggle');
    const notifyLabel = document.getElementById('notifications-label');
    if (notifyToggle && notifyLabel) {
        notifyLabel.textContent = notifyToggle.checked ? (translation.on || fallback.on) : (translation.off || fallback.off);
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
    },
    germany: {
        name: 'country_germany',
        tourist: ['req_passport', 'req_insurance', 'req_finance', 'req_employer_letter', 'req_hotel'],
        work: ['req_job_offer', 'req_qualifications', 'req_insurance', 'req_passport'],
        student: ['req_admission', 'req_insurance', 'req_finance', 'req_passport']
    },
    france: {
        name: 'country_france',
        tourist: ['req_passport', 'req_insurance', 'req_finance', 'req_accommodation'],
        work: ['req_work_permit', 'req_passport', 'req_insurance'],
        student: ['req_admission', 'req_campus_france', 'req_finance']
    },
    canada: {
        name: 'country_canada',
        tourist: ['req_passport', 'req_finance', 'req_travel_history', 'req_family_info'],
        work: ['req_work_permit', 'req_job_offer', 'req_passport'],
        student: ['req_loi', 'req_finance', 'req_caq_quebec']
    },
    japan: {
        name: 'country_japan',
        tourist: ['req_passport', 'req_photo_japan', 'req_itinerary', 'req_guarantee'],
        work: ['req_coe', 'req_passport', 'req_photo_japan'],
        student: ['req_coe', 'req_admission', 'req_passport']
    },
    south_korea: {
        name: 'country_korea',
        tourist: ['req_passport', 'req_finance', 'req_itinerary', 'req_keta'],
        work: ['req_work_permit', 'req_contract', 'req_passport'],
        student: ['req_admission', 'req_transcript', 'req_finance']
    },
    china: {
        name: 'country_china',
        tourist: ['req_passport', 'req_finance', 'req_itinerary', 'req_invitation'],
        work: ['req_work_permit', 'req_passport', 'req_contract'],
        student: ['req_jw202', 'req_admission', 'req_passport']
    },
    australia: {
        name: 'country_australia',
        tourist: ['req_passport', 'req_finance', 'req_purpose', 'req_insurance'],
        work: ['req_nomination', 'req_passport', 'req_skills'],
        student: ['req_coe_aus', 'req_passport', 'req_finance']
    },
    turkey: {
        name: 'country_turkey',
        tourist: ['req_passport', 'req_evisa', 'req_hotel', 'req_finance'],
        work: ['req_work_permit', 'req_passport', 'req_contract'],
        student: ['req_admission', 'req_passport', 'req_finance']
    }
};

function selectVisaType(type) {
    scannerState.selectedVisaType = type;
    document.querySelectorAll('.visa-type-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`[data-type="${type}"]`);
    if (btn) btn.classList.add('active');
    updateScanButton();
}

function selectCountry(country) {
    scannerState.selectedCountry = country;
    document.querySelectorAll('.country-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`[data-country="${country}"]`);
    if (btn) btn.classList.add('active');
    updateScanButton();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    scannerState.uploadedDocument = file;
    scannerState.uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = e => {
        const previewImg = document.getElementById('preview-image');
        if (previewImg) previewImg.src = e.target.result;
        const uploadPreview = document.getElementById('uploaded-preview');
        if (uploadPreview) uploadPreview.style.display = 'block';
        const placeholder = document.querySelector('.upload-placeholder');
        if (placeholder) placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
    updateScanButton();
}

function updateScanButton() {
    const scanBtn = document.getElementById('scan-btn');
    if (scanBtn) scanBtn.disabled = !(scannerState.selectedVisaType && scannerState.selectedCountry && scannerState.uploadedDocument);
}
export async function saveDocumentToHistory(doc) {
    const imageData = document.getElementById('preview-image').src;
    doc.imageData = imageData;
    doc.uploadDate = new Date().toISOString();
    doc.date = new Date().toLocaleDateString();

    try {
        await storage.addItem('documents', doc);
        updateDocumentList();
    } catch (error) {
        console.error('Error saving document:', error);
    }
}
window.saveDocumentToHistory = saveDocumentToHistory;

export async function updateDocumentList() {
    let history = [];
    try {
        history = await storage.getAllItems('documents');
        // Sort by date descending
        history.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } catch (error) {
        console.error('Error loading documents:', error);
    }

    const docList = document.querySelector('#screen-documents .document-list');
    if (!docList) return;

    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.en || translations.ru;
    const fallback = translations.en || translations.ru;

    docList.innerHTML = history.length ? '' : `<p style="text-align: center; padding: 20px; opacity: 0.5;">${translation.no_history || fallback.no_history || 'No history'}</p>`;

    history.forEach((doc) => {
        const item = document.createElement('div');
        item.className = 'document-item';
        const countryKey = 'country_' + doc.country;
        const visaKey = 'visa_' + doc.visaType;
        const localizedCountry = translation[countryKey] || fallback[countryKey] || doc.country;
        const localizedVisa = translation[visaKey] || fallback[visaKey] || doc.visaType;

        item.innerHTML = `
            <div class="document-content" onclick="viewDocument(${doc.id})">
                <h4>${doc.fileName}</h4>
                <p>${localizedCountry} • ${localizedVisa} • ${doc.date}</p>
            </div>
            <button class="document-action delete-btn" onclick="deleteDocument(${doc.id}, event)" aria-label="Delete">
                <span class="action-icon">🗑️</span>
            </button>
        `;
        docList.appendChild(item);
    });
}
window.updateDocumentList = updateDocumentList;

export async function deleteDocument(id, event) {
    if (event) event.stopPropagation();

    const lang = localStorage.getItem('language') || 'ru';
    const confirmMsg = lang === 'ru' ? 'Вы уверены, что хотите удалить этот документ?' : 'Are you sure you want to delete this document?';

    if (confirm(confirmMsg)) {
        try {
            await storage.deleteItem('documents', id);
            updateDocumentList();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }
}
window.deleteDocument = deleteDocument;

export async function viewDocument(id) {
    let doc;
    try {
        doc = await storage.getItem('documents', id);
    } catch (error) {
        console.error('Error fetching document:', error);
        return;
    }

    if (!doc) return;

    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    document.getElementById('viewer-image').src = doc.imageData;
    document.getElementById('viewer-title').textContent = doc.fileName;

    const metaEl = document.getElementById('viewer-meta');
    if (metaEl) {
        const localizedCountry = translation[doc.country] || doc.country;
        const localizedVisa = translation['visa_' + doc.visaType] || doc.visaType;
        metaEl.innerHTML = `
            <p><strong>${translation.dest_country || 'Country'}:</strong> ${localizedCountry}</p>
            <p><strong>${translation.visa_type || 'Visa'}:</strong> ${localizedVisa}</p>
            <p><strong>Date:</strong> ${doc.date}</p>
        `;
    }

    const statusEl = document.getElementById('viewer-status');
    if (statusEl) {
        statusEl.textContent = doc.hasIssues ? translation.status_error : translation.status_success;
        statusEl.className = 'viewer-status ' + (doc.hasIssues ? 'status-error' : 'status-success');
    }

    document.getElementById('document-viewer-modal').classList.add('active');
}
window.viewDocument = viewDocument;

export function closeDocumentViewer() {
    document.getElementById('document-viewer-modal').classList.remove('active');
}
window.closeDocumentViewer = closeDocumentViewer;
function displayResults(hasIssues, issues, requirements, countryName, missingDocs, approvalProbability = 50) {
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    const statusText = document.getElementById('status-text');
    if (statusText) statusText.textContent = hasIssues ? translation.status_error : translation.status_success;

    const requirementsList = document.getElementById('requirements-list');
    const selectedCountryEl = document.getElementById('selected-country-name');
    if (selectedCountryEl) selectedCountryEl.textContent = translation[countryName] || countryName;

    if (requirementsList) {
        requirementsList.innerHTML = '';
        requirements.forEach(req => {
            const li = document.createElement('li');
            li.className = 'requirement-item';
            li.innerHTML = `<span class="check-icon">✓</span> ${translation[req] || req}`;
            requirementsList.appendChild(li);
        });
    }

    const missingDocsSection = document.getElementById('missing-docs-section');
    const missingDocsList = document.getElementById('missing-docs-list');
    if (missingDocsList) {
        missingDocsList.innerHTML = '';
        if (missingDocs.length > 0) {
            if (missingDocsSection) missingDocsSection.style.display = 'block';
            missingDocs.forEach(doc => {
                const li = document.createElement('li');
                li.className = 'missing-doc-item';
                li.innerHTML = `<span class="missing-icon">✖</span> ${translation[doc] || doc}`;
                missingDocsList.appendChild(li);
            });
        } else {
            if (missingDocsSection) missingDocsSection.style.display = 'none';
        }
    }
    const scanResults = document.getElementById('scan-results');
    if (scanResults) scanResults.style.display = 'block';

    // Update Probability Bar
    const probSection = document.getElementById('probability-section');
    const probBar = document.getElementById('probability-bar');
    const probText = document.getElementById('probability-text');

    if (probSection && probBar && probText) {
        probSection.style.display = 'block';
        setTimeout(() => {
            probBar.style.width = approvalProbability + '%';
            probText.textContent = approvalProbability + '%';

            // Color based on probability
            if (approvalProbability < 40) probBar.style.background = 'var(--accent-error)';
            else if (approvalProbability < 75) probBar.style.background = 'var(--visa-blue)';
            else probBar.style.background = 'var(--accent-success)';
        }, 100);
    }
}

function handleAIAutoFill(info) {
    const lang = localStorage.getItem('language') || 'ru';
    const confirmMsg = lang === 'ru'
        ? 'AI обнаружил информацию о профиле в документе. Обновить ваш профиль?'
        : 'AI found profile information in the document. Update your profile?';

    if (confirm(confirmMsg)) {
        const saved = localStorage.getItem('user_profile');
        let profile = saved ? JSON.parse(saved) : {};

        if (info.name) profile.name = info.name;
        if (info.email) profile.email = info.email;
        if (info.phone) profile.phone = info.phone;

        localStorage.setItem('user_profile', JSON.stringify(profile));
        loadProfile();

        const successMsg = lang === 'ru' ? 'Профиль обновлен!' : 'Profile updated!';
        alert(successMsg);
    }
}
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.toggle('active');
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    setTimeout(toggleSettings, 300);
}

function saveProfile() {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const profileData = {
        name: nameEl ? nameEl.value : '',
        email: emailEl ? emailEl.value : '',
        phone: phoneEl ? phoneEl.value : ''
    };
    localStorage.setItem('user_profile', JSON.stringify(profileData));
    const lang = localStorage.getItem('language') || 'ru';
    alert(translations[lang].save_success);
    showScreen('screen-home');
}

export async function loadProfile() {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
        const data = JSON.parse(saved);
        if (document.getElementById('name')) document.getElementById('name').value = data.name || '';
        if (document.getElementById('email')) document.getElementById('email').value = data.email || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = data.phone || '';
    }

    const geminiKey = await secureStorage.getItem('gemini_api_key');
    if (geminiKey && document.getElementById('gemini-api-key')) {
        document.getElementById('gemini-api-key').value = geminiKey;
    }
}
window.loadProfile = loadProfile;
async function callGemini(prompt, imageData = null) {
    const apiKey = await secureStorage.getItem('gemini_api_key');
    if (!apiKey) return null;
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        let contents = [{ parts: [{ text: prompt }] }];
        if (imageData) contents[0].parts.push({ inline_data: { mime_type: "image/jpeg", data: imageData.split(',')[1] } });
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents }) });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (error) {
        console.error('Gemini Error:', error);
        return null;
    }
}

export async function handleSendMessage() {
    const input = document.getElementById('chat-user-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    renderChatMessage('user', text, new Date().toLocaleTimeString());
    const aiResponse = await callGemini(text) || "AI is offline";
    renderChatMessage('ai', aiResponse, new Date().toLocaleTimeString());
}
window.handleSendMessage = handleSendMessage;

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
    loadProfile();
    updateDocumentList();
    showScreen('screen-home');

    // Set initial theme
    const savedTheme = localStorage.getItem('app-theme') || 'theme-light';
    document.body.className = savedTheme;

    const isDark = savedTheme === 'theme-dark';
    const darkToggle = document.getElementById('dark-theme-toggle');
    if (darkToggle) darkToggle.checked = isDark;

    const translation = translations[lang] || translations.ru;
    const darkLabel = document.getElementById('dark-theme-label');
    if (darkLabel && darkToggle) {
        darkLabel.textContent = isDark ? translation.on : translation.off;
    }
});
