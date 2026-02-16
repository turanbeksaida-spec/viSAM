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
        eyeIcon.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Initialize bottom navigation buttons
document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.nav-btn');

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
        help_item_1: "Типы документов для визы",
        help_item_2: "Правила оформления документов",
        help_item_3: "Инструкция по заполнению",
        help_item_4: "Загрузка совместных документов",
        help_item_5: "Связь с поддержкой",
        help_item_6: "Регистрация и подача",
        chat_welcome: "Вам нужна помощь нашей команды?",
        chat_start: "Написать сообщение...",
        label_name: "Имя",
        label_email: "Email",
        label_phone: "Номер телефона",
        label_password: "Пароль",
        btn_save: "Сохранить изменения",
        settings_title: "Настройки",
        settings_lang: "🌐 Смена языка",
        lang_desc: "Выберите язык интерфейса",
        settings_dark: "🌙 Темная тема",
        dark_theme_desc: "Удобно для работы в ночное время",
        settings_notify: "🔔 Уведомления",
        notifications_desc: "Получайте обновления о статусе визы",
        install_btn: "Установить приложение",
        save_success: "Профиль успешно сохранен!",
        status_success: "Документ прошел проверку",
        status_error: "Обнаружены ошибки в документе",
        status_attention: "Требуется внимание",
        on: "Вкл.",
        off: "Выкл.",
        ai_assistant_title: "ИИ-Помощник",
        status_online: "в сети",
        chat_welcome_ai: "Здравствуйте! Я ваш ИИ-помощник. Чем я могу вам помочь сегодня?",
        chat_input_placeholder: "Введите сообщение...",
        ai_typing: "ИИ печатает...",
        ai_response_visa: "Для оформления визы вам потребуются: загранпаспорт, фото, подтверждение дохода и страховка. Какой тип визы вас интересует?",
        ai_response_docs: "Вы можете загрузить документы в разделе 'Сканировать' для автоматической проверки.",
        ai_response_default: "Я могу помочь с информацией о типах виз, требованиях стран и проверке документов. Что именно вас интересует?"
    },
    en: {
        menu_docs: "Document List",
        menu_help: "Help",
        menu_profile: "My Profile",
        menu_apply: "Book Appointment",
        home_add_title: "Add-ons",
        home_add_text: "Help & Translator",
        home_add_hint: "Enjoy using it",
        nav_search: "Search",
        nav_docs: "Documents",
        nav_account: "Account",
        scan_hint: "Point camera at the document",
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
        found_issues: "Issues Found",
        req_for: "Requirements for",
        missing_docs: "Missing Documents",
        doc_req_visa: "Visa Document Requirements",
        doc_temp_id: "Temporary ID Documents",
        doc_sent: "Forwarded Documents",
        help_item_1: "Document types related to visa",
        help_item_2: "Document writing guide",
        help_item_3: "Filling out written documents",
        help_item_4: "Peer upload documents",
        help_item_5: "Communication documents",
        help_item_6: "Filing and registration docs",
        chat_welcome: "Maybe you need help with our team?",
        chat_start: "Start message...",
        label_name: "Name",
        label_email: "Email",
        label_phone: "Phone Number",
        label_password: "Password",
        btn_save: "Save Changes",
        settings_title: "Settings",
        settings_lang: "🌐 Change Language",
        lang_desc: "Select interface language",
        settings_dark: "🌙 Dark Theme",
        dark_theme_desc: "Useful for night-time form filling",
        settings_notify: "🔔 Notifications",
        notifications_desc: "Get notifications about visa status",
        install_btn: "Install App",
        save_success: "Profile saved successfully!",
        status_success: "Document passed check",
        status_error: "Errors found in document",
        status_attention: "Attention required",
        on: "On",
        off: "Off",
        ai_assistant_title: "AI Assistant",
        status_online: "online",
        chat_welcome_ai: "Hello! I am your AI visa assistant. How can I help you today?",
        chat_input_placeholder: "Type a message...",
        ai_typing: "AI is typing...",
        ai_response_visa: "To apply for a visa, you will need basic documents: passport, photos, proof of income, and insurance. What specific questions do you have?",
        ai_response_docs: "You can upload documents in the 'Scan' section for automatic verification by our AI.",
        ai_response_default: "I can help you with information about visa types, country requirements, and document checks. What exactly interests you?"
    },
    es: {
        menu_docs: "Lista de Documentos",
        menu_help: "Ayuda",
        menu_profile: "Mi Perfil",
        menu_apply: "Reservar Cita",
        home_add_title: "Complementos",
        home_add_text: "Ayuda y Traductor",
        home_add_hint: "Disfruta usándolo",
        nav_search: "Buscar",
        nav_docs: "Documentos",
        nav_account: "Cuenta",
        scan_hint: "Apunte la cámara al documento",
        scanner_title: "Escáner AI de Documentos",
        visa_type: "Tipo de Visa",
        visa_tourist: "Turista",
        visa_work: "Trabajo",
        visa_student: "Estudiante",
        visa_business: "Negocios",
        visa_transit: "Tránsito",
        dest_country: "País de Destino",
        country_usa: "EE. UU.",
        country_uk: "Reino Unido",
        country_germany: "Alemania",
        country_france: "Francia",
        country_canada: "Canadá",
        country_japan: "Japón",
        upload_doc: "Subir Documento",
        upload_click: "Haga clic para subir documento",
        upload_camera: "o use la cámara",
        btn_scan: "Escanear Documento",
        ai_analyzing: "AI analizando documento...",
        found_issues: "Problemas Encontrados",
        req_for: "Requisitos para",
        missing_docs: "Documentos Faltantes",
        doc_req_visa: "Requisitos de Visa",
        doc_temp_id: "Documentos de ID Temporal",
        doc_sent: "Documentos Enviados",
        help_item_1: "Tipos de documentos para visa",
        help_item_2: "Guía de redacción",
        help_item_3: "Llenado de documentos",
        help_item_4: "Subir documentos de pares",
        help_item_5: "Documentos de comunicación",
        help_item_6: "Documentos de registro",
        chat_welcome: "¿Necesita ayuda de nuestro equipo?",
        chat_start: "Iniciar mensaje...",
        label_name: "Nombre",
        label_email: "Email",
        label_phone: "Teléfono",
        label_password: "Contraseña",
        btn_save: "Guardar Cambios",
        settings_title: "Configuración",
        settings_lang: "🌐 Cambiar Idioma",
        lang_desc: "Seleccionar idioma",
        settings_dark: "🌙 Tema Oscuro",
        dark_theme_desc: "Útil para llenado nocturno",
        settings_notify: "🔔 Notificaciones",
        notifications_desc: "Reciba alertas de estado de visa",
        install_btn: "Instalar App",
        save_success: "¡Perfil guardado!",
        status_success: "Documento aprobado",
        status_error: "Errores en el documento",
        status_attention: "Requiere atención",
        on: "Encendido",
        off: "Apagado"
    },
    fr: {
        menu_docs: "Liste des Documents",
        menu_help: "Aide",
        menu_profile: "Mon Profil",
        menu_apply: "Prendre Rendez-vous",
        home_add_title: "Addons",
        home_add_text: "Aide & Traducteur",
        home_add_hint: "Profitez-en",
        nav_search: "Recherche",
        nav_docs: "Documents",
        nav_account: "Compte",
        scan_hint: "Pointez l'appareil vers le document",
        scanner_title: "Scanner AI de Documents",
        visa_type: "Type de Visa",
        visa_tourist: "Touriste",
        visa_work: "Travail",
        visa_student: "Étudiant",
        visa_business: "Affaires",
        visa_transit: "Transit",
        dest_country: "Pays de Destination",
        country_usa: "États-Unis",
        country_uk: "Royaume-Uni",
        country_germany: "Allemagne",
        country_france: "France",
        country_canada: "Canada",
        country_japan: "Japon",
        upload_doc: "Charger Document",
        upload_click: "Cliquer pour charger",
        upload_camera: "ou utiliser l'appareil",
        btn_scan: "Scanner le Document",
        ai_analyzing: "Analyse AI en cours...",
        found_issues: "Problèmes Trouvés",
        req_for: "Exigences pour",
        missing_docs: "Documents Manquants",
        doc_req_visa: "Exigences Visa",
        doc_temp_id: "ID Temporaire",
        doc_sent: "Documents Envoyés",
        help_item_1: "Types de documents visa",
        help_item_2: "Guide de rédaction",
        help_item_3: "Remplissage documents",
        help_item_4: "Charger documents pairs",
        help_item_5: "Documents communication",
        help_item_6: "Documents enregistrement",
        chat_welcome: "Besoin d'aide de notre équipe ?",
        chat_start: "Envoyer un message...",
        label_name: "Nom",
        label_email: "Email",
        label_phone: "Téléphone",
        label_password: "Mot de passe",
        btn_save: "Enregistrer",
        settings_title: "Paramètres",
        settings_lang: "🌐 Changer Langue",
        lang_desc: "Choisir la langue",
        settings_dark: "🌙 Mode Sombre",
        dark_theme_desc: "Utile pour le remplissage nocturne",
        settings_notify: "🔔 Notifications",
        notifications_desc: "Alertes statut visa",
        install_btn: "Installer l'App",
        save_success: "Profil enregistré !",
        status_success: "Document validé",
        status_error: "Erreurs détectées",
        status_attention: "Attention requise",
        on: "On",
        off: "Off"
    },
    de: {
        menu_docs: "Dokumentenliste",
        menu_help: "Hilfe",
        menu_profile: "Mein Profil",
        menu_apply: "Termin Buchen",
        home_add_title: "Zusätze",
        home_add_text: "Hilfe & Übersetzer",
        home_add_hint: "Viel Freude damit",
        nav_search: "Suche",
        nav_docs: "Dokumente",
        nav_account: "Konto",
        scan_hint: "Kamera auf Dokument richten",
        scanner_title: "AI Dokumenten-Scanner",
        visa_type: "Visum-Typ",
        visa_tourist: "Tourist",
        visa_work: "Arbeit",
        visa_student: "Student",
        visa_business: "Business",
        visa_transit: "Transit",
        dest_country: "Zielland",
        country_usa: "USA",
        country_uk: "Großbritannien",
        country_germany: "Deutschland",
        country_france: "Frankreich",
        country_canada: "Kanada",
        country_japan: "Japan",
        upload_doc: "Dokument Hochladen",
        upload_click: "Klicken zum Hochladen",
        upload_camera: "oder Kamera nutzen",
        btn_scan: "Dokument Scannen",
        ai_analyzing: "AI analysiert...",
        found_issues: "Gefundene Probleme",
        req_for: "Anforderungen für",
        missing_docs: "Fehlende Dokumente",
        doc_req_visa: "Visumanforderungen",
        doc_temp_id: "Ausweisdokumente",
        doc_sent: "Versandte Dokumente",
        help_item_1: "Visum-relevante Dokumente",
        help_item_2: "Leitfaden zum Schreiben",
        help_item_3: "Ausfüllen von Dokumenten",
        help_item_4: "Peer-Upload-Dokumente",
        help_item_5: "Kommunikationsunterlagen",
        help_item_6: "Registrierungsunterlagen",
        chat_welcome: "Hilfe von unserem Team benötigt?",
        chat_start: "Nachricht starten...",
        label_name: "Name",
        label_email: "Email",
        label_phone: "Telefonnummer",
        label_password: "Passwort",
        btn_save: "Speichern",
        settings_title: "Einstellungen",
        settings_lang: "🌐 Sprache Ändern",
        lang_desc: "Sprache wählen",
        settings_dark: "🌙 Dunkles Design",
        dark_theme_desc: "Nützlich für Nachtarbeit",
        settings_notify: "🔔 Benachrichtigungen",
        notifications_desc: "Visum-Status-Updates",
        install_btn: "App Installieren",
        save_success: "Profil gespeichert!",
        status_success: "Prüfung bestanden",
        status_error: "Fehler gefunden",
        status_attention: "Achtung nötig",
        on: "An",
        off: "Aus"
    },
    zh: {
        menu_docs: "文件列表",
        menu_help: "帮助",
        menu_profile: "我的个人资料",
        menu_apply: "预约申请",
        home_add_title: "附加功能",
        home_add_text: "帮助和翻译器",
        home_add_hint: "尽情使用",
        nav_search: "搜索",
        nav_docs: "文件",
        nav_account: "账户",
        scan_hint: "将相机对准文件",
        scanner_title: "AI 文件扫描仪",
        visa_type: "签证类型",
        visa_tourist: "旅游",
        visa_work: "工作",
        visa_student: "学生",
        visa_business: "商务",
        visa_transit: "过境",
        dest_country: "目的地国家",
        country_usa: "美国",
        country_uk: "英国",
        country_germany: "德国",
        country_france: "法国",
        country_canada: "加拿大",
        country_japan: "日本",
        upload_doc: "上传文件",
        upload_click: "点击上传文件",
        upload_camera: "或使用相机",
        btn_scan: "扫描文件",
        ai_analyzing: "AI 正在分析文件...",
        found_issues: "发现的问题",
        req_for: "要求列表 - ",
        missing_docs: "缺失的文件",
        doc_req_visa: "签证文件要求",
        doc_temp_id: "临时身份证件",
        doc_sent: "转发文件",
        help_item_1: "签证相关文件类型",
        help_item_2: "文件写作指南",
        help_item_3: "签署书面文件",
        help_item_4: "同行上传文件",
        help_item_5: "沟通文件",
        help_item_6: "备案登记文件",
        chat_welcome: "需要我们团队的帮助吗？",
        chat_start: "开始对话...",
        label_name: "姓名",
        label_email: "电子邮件",
        label_phone: "电话号码",
        label_password: "密码",
        btn_save: "保存更改",
        settings_title: "设置",
        settings_lang: "🌐 更改语言",
        lang_desc: "选择界面语言",
        settings_dark: "🌙 深色模式",
        dark_theme_desc: "适用于夜间填写表格",
        settings_notify: "🔔 通知",
        notifications_desc: "获取签证状态通知",
        install_btn: "安装应用",
        save_success: "个人资料已保存！",
        status_success: "文件通过检查",
        status_error: "文件中发现错误",
        status_attention: "需要注意",
        on: "开启",
        off: "关闭"
    },
    ar: {
        menu_docs: "قائمة المستندات",
        menu_help: "مساعدة",
        menu_profile: "ملفي الشخصي",
        menu_apply: "حجز موعد",
        home_add_title: "إضافات",
        home_add_text: "المساعدة والمترجم",
        home_add_hint: "استمتع بالاستخدام",
        nav_search: "بحث",
        nav_docs: "المستندات",
        nav_account: "الحساب",
        scan_hint: "وجه الكاميرا نحو المستند",
        scanner_title: "ماسح المستندات بالذكاء الاصطناعي",
        visa_type: "نوع التأشيرة",
        visa_tourist: "سياحية",
        visa_work: "عمل",
        visa_student: "طالب",
        visa_business: "أعمال",
        visa_transit: "ترانزيت",
        dest_country: "بلد الوجهة",
        country_usa: "الولايات المتحدة",
        country_uk: "المملكة المتحدة",
        country_germany: "ألمانيا",
        country_france: "فرنسا",
        country_canada: "كندا",
        country_japan: "اليابان",
        upload_doc: "تحميل مستند",
        upload_click: "اضغط لتحميل المستند",
        upload_camera: "أو استخدم الكاميرا",
        btn_scan: "مسح المستند",
        ai_analyzing: "الذكاء الاصطناعي يحلل المستند...",
        found_issues: "المشاكل التي تم العثور عليها",
        req_for: "المتطلبات لـ",
        missing_docs: "المستندات المفقودة",
        doc_req_visa: "متطلبات مستندات التأشيرة",
        doc_temp_id: "مستندات الهوية المؤقتة",
        doc_sent: "المستندات المرسلة",
        help_item_1: "أنواع المستندات المتعلقة بالتأشيرة",
        help_item_2: "دليل كتابة المستندات",
        help_item_3: "تعبئة المستندات المكتوبة",
        help_item_4: "تحميل مستندات الزملاء",
        help_item_5: "مستندات التواصل",
        help_item_6: "مستندات التسجيل",
        chat_welcome: "ربما تحتاج مساعدة من فريقنا؟",
        chat_start: "ابدأ المراسلة...",
        label_name: "الاسم",
        label_email: "البريد الإلكتروني",
        label_phone: "رقم الهاتف",
        label_password: "كلمة المرور",
        btn_save: "حفظ التغييرات",
        settings_title: "الإعدادات",
        settings_lang: "🌐 تغيير اللغة",
        lang_desc: "اختر لغة الواجهة",
        settings_dark: "🌙 المظهر الداكن",
        dark_theme_desc: "مفيد لتعبئة النماذج ليلاً",
        settings_notify: "🔔 الإشعارات",
        notifications_desc: "احصل على إشعارات حول حالة التأشيرة",
        install_btn: "تثبيت التطبيق",
        save_success: "تم حفظ الملف الشخصي بنجاح!",
        status_success: "اجتاز المستند الفحص",
        status_error: "تم العثور على أخطاء في المستند",
        status_attention: "مطلوب الاهتمام",
        on: "تفعيل",
        off: "إيقاف"
    },
    hi: {
        menu_docs: "दस्तावेज़ सूची",
        menu_help: "सहायता",
        menu_profile: "मेरी प्रोफ़ाइल",
        menu_apply: "अपॉइंटमेंट बुक करें",
        home_add_title: "ऐड-ऑन",
        home_add_text: "सहायता और अनुवादक",
        home_add_hint: "इसका उपयोग करने का आनंद लें",
        nav_search: "खोजें",
        nav_docs: "दस्तावेज़",
        nav_account: "खाता",
        scan_hint: "दस्तावेज़ पर कैमरा दिखाएं",
        scanner_title: "AI दस्तावेज़ स्कैनर",
        visa_type: "वीजा प्रकार",
        visa_tourist: "पर्यटक",
        visa_work: "कार्य",
        visa_student: "छात्र",
        visa_business: "व्यापार",
        visa_transit: "पारगमन",
        dest_country: "गंतव्य देश",
        country_usa: "अमेरिका",
        country_uk: "यूनाइटेड किंगडम",
        country_germany: "जर्मनी",
        country_france: "फ्रांस",
        country_canada: "कनाडा",
        country_japan: "जापान",
        upload_doc: "दस्तावेज़ अपलोड करें",
        upload_click: "दस्तावेज़ अपलोड करने के लिए क्लिक करें",
        upload_camera: "या कैमरे का उपयोग करें",
        btn_scan: "दस्तावेज़ स्कैन करें",
        ai_analyzing: "AI दस्तावेज़ का विश्लेषण कर रहा है...",
        found_issues: "पाई गई समस्याएं",
        req_for: "के लिए आवश्यकताएं",
        missing_docs: "लापता दस्तावेज़",
        doc_req_visa: "वीजा दस्तावेज़ आवश्यकताएं",
        doc_temp_id: "अस्थायी पहचान दस्तावेज़",
        doc_sent: "प्रेषित दस्तावेज़",
        help_item_1: "वीजा से संबंधित दस्तावेज़ प्रकार",
        help_item_2: "दस्तावेज़ लेखन गाइड",
        help_item_3: "लिखित दस्तावेज़ भरना",
        help_item_4: "पीयर अपलोड दस्तावेज़",
        help_item_5: "संचार दस्तावेज़",
        help_item_6: "पंजीकरण दस्तावेज़",
        chat_welcome: "क्या आपको हमारी टीम से सहायता चाहिए?",
        chat_start: "संदेश शुरू करें...",
        label_name: "नाम",
        label_email: "ईमेल",
        label_phone: "फ़ोन नंबर",
        label_password: "पासवर्ड",
        btn_save: "परिवर्तन सहेजें",
        settings_title: "सेटिंग्स",
        settings_lang: "🌐 भाषा बदलें",
        lang_desc: "इंटरफ़ेस की भाषा चुनें",
        settings_dark: "🌙 डार्क थीम",
        dark_theme_desc: "रात के समय फॉर्म भरने के लिए उपयोगी",
        settings_notify: "🔔 अधिसूचना",
        notifications_desc: "अपनी वीजा स्थिति के बारे में सूचनाएं प्राप्त करें",
        install_btn: "ऐप इंस्टॉल करें",
        save_success: "प्रोफ़ाइल सफलतापूर्वक सहेजी गई!",
        status_success: "दस्तावेज़ जाँच में सफल रहा",
        status_error: "दस्तावेज़ में त्रुटियाँ मिलीं",
        status_attention: "ध्यान देने की आवश्यकता है",
        on: "चालू",
        off: "बंद"
    }
};

function applyTranslations(lang) {
    const translation = translations[lang] || translations.ru;

    // Translate data-i18n elements
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

    // Handle Title and Meta
    document.title = lang === 'ru' ? 'VISA - Управление документами' : (translation.scanner_title || 'VISA - Document Manager');

    // Update labels in settings
    if (document.querySelector('.settings-header h2')) {
        document.querySelector('.settings-header h2').textContent = translation.settings_title;
    }

    // Update theme and notification labels if they exist
    const darkLabel = document.getElementById('dark-theme-label');
    if (darkLabel) {
        darkLabel.textContent = document.getElementById('dark-theme-toggle').checked ? translation.on : translation.off;
    }
    const notifyLabel = document.getElementById('notifications-label');
    if (notifyLabel) {
        notifyLabel.textContent = document.getElementById('notifications-toggle').checked ? translation.on : translation.off;
    }
}

// ===================================
// AI Scanner Functionality
// ===================================

// Scanner state
let scannerState = {
    selectedVisaType: null,
    selectedCountry: null,
    uploadedDocument: null,
    uploadedFileName: null
};

// Country data with visa requirements
const countryRequirements = {
    usa: {
        name: 'США',
        tourist: [
            'Действующий загранпаспорт (минимум 6 месяцев)',
            'Заполненная форма DS-160',
            'Фотография 5x5 см',
            'Подтверждение финансовой состоятельности',
            'Бронь отеля или приглашение',
            'Билеты туда и обратно'
        ],
        work: [
            'Действующий загранпаспорт',
            'Форма I-129 от работодателя',
            'Письмо от работодателя США',
            'Подтверждение квалификации',
            'Контракт или оффер'
        ],
        student: [
            'Форма I-20 от учебного заведения',
            'Подтверждение зачисления',
            'Финансовые гарантии',
            'Результаты TOEFL/IELTS',
            'Академическая транскрипт'
        ],
        business: [
            'Приглашение от компании США',
            'Документы о цели поездки',
            'Регистрация компании',
            'Финансовые документы'
        ],
        transit: [
            'Билет в третью страну',
            'Виза в страну назначения',
            'Загранпаспорт'
        ]
    },
    uk: {
        name: 'Великобритания',
        tourist: [
            'Загранпаспорт (6+ месяцев)',
            'Онлайн заявка',
            'Банковская выписка за 6 месяцев',
            'Подтверждение проживания',
            'Маршрут поездки'
        ],
        work: [
            'Certificate of Sponsorship',
            'Подтверждение квалификации',
            'Знание английского (IELTS)',
            'Финансовые документы'
        ],
        student: [
            'CAS от университета',
            'IELTS сертификат',
            'Финансовые гарантии',
            'Документы об образовании'
        ],
        business: [
            'Приглашение от UK компании',
            'Документы бизнеса',
            'Финансовые выписки'
        ],
        transit: [
            'Билет в третью страну',
            'Виза третьей страны'
        ]
    },
    germany: {
        name: 'Германия',
        tourist: [
            'Шенгенская анкета',
            'Загранпаспорт',
            'Медицинская страховка (30000€)',
            'Бронь отеля',
            'Финансовые гарантии',
            'Билеты'
        ],
        work: [
            'Разрешение на работу',
            'Контракт с работодателем',
            'Подтверждение квалификации',
            'Медицинская страховка'
        ],
        student: [
            'Приглашение от университета',
            'Подтверждение зачисления',
            'Финансовые гарантии (11208€/год)',
            'Медицинская страховка'
        ],
        business: [
            'Приглашение от немецкой компании',
            'Регистрация компании',
            'Медицинская страховка'
        ],
        transit: [
            'Билет транзитом',
            'Виза конечной страны'
        ]
    },
    france: {
        name: 'Франция',
        tourist: [
            'Шенгенская виза анкета',
            'Загранпаспорт (3+ месяцев после поездки)',
            'Страховка 30000€',
            'Бронирование жилья',
            'Финансовые документы'
        ],
        work: [
            'Разрешение на работу',
            'Контракт',
            'Диплом с апостилем'
        ],
        student: [
            'Приглашение от университета',
            'Campus France',
            'Финансовые гарантии',
            'Знание французского (TCF/DELF)'
        ],
        business: [
            'Приглашение',
            'Документы компании'
        ],
        transit: [
            'Транзитная виза',
            'Билеты'
        ]
    },
    canada: {
        name: 'Канада',
        tourist: [
            'eTA или виза',
            'Загранпаспорт',
            'Финансовые документы',
            'Связи с родиной',
            'Маршрут'
        ],
        work: [
            'LMIA или Job Offer',
            'Work Permit',
            'Подтверждение квалификации'
        ],
        student: [
            'Letter of Acceptance',
            'Study Permit',
            'Финансовые гарантии',
            'IELTS/TOEFL'
        ],
        business: [
            'Бизнес-план',
            'Финансовые документы'
        ],
        transit: [
            'Транзитная виза',
            'Билеты'
        ]
    },
    japan: {
        name: 'Япония',
        tourist: [
            'Анкета',
            'Загранпаспорт',
            'Фото 4.5x4.5 см',
            'Маршрут поездки',
            'Финансовые гарантии',
            'Бронь отеля'
        ],
        work: [
            'Certificate of Eligibility',
            'Контракт с работодателем',
            'Академические документы'
        ],
        student: [
            'COE от университета',
            'Документы об образовании',
            'Финансовые документы',
            'Мотивационное письмо'
        ],
        business: [
            'Приглашение от японской компании',
            'Бизнес документы'
        ],
        transit: [
            'Билет в третью страну',
            'Виза (если требуется)'
        ]
    }
};

// Open AI Scanner
function openScanner() {
    // Reset scanner state
    resetScannerState();
    showScreen('screen-ai-scanner');
}

// Reset scanner state
function resetScannerState() {
    scannerState = {
        selectedVisaType: null,
        selectedCountry: null,
        uploadedDocument: null,
        uploadedFileName: null
    };

    // Remove all active states
    document.querySelectorAll('.visa-type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.country-btn').forEach(btn => btn.classList.remove('active'));

    // Hide results and loader
    document.getElementById('scan-results').style.display = 'none';
    document.getElementById('scanning-loader').style.display = 'none';

    // Reset upload area
    document.getElementById('uploaded-preview').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'flex';

    // Disable scan button
    updateScanButton();
}

// Select visa type
function selectVisaType(type) {
    scannerState.selectedVisaType = type;

    // Update UI
    document.querySelectorAll('.visa-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');

    updateScanButton();
}

// Select country
function selectCountry(country) {
    scannerState.selectedCountry = country;

    // Update UI
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-country="${country}"]`).classList.add('active');

    updateScanButton();
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    scannerState.uploadedDocument = file;
    scannerState.uploadedFileName = file.name;

    // Show preview
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview-image').src = e.target.result;
        document.getElementById('uploaded-preview').style.display = 'block';
        document.querySelector('.upload-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);

    updateScanButton();
}

// Remove document
function removeDocument() {
    scannerState.uploadedDocument = null;
    scannerState.uploadedFileName = null;

    document.getElementById('uploaded-preview').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'flex';
    document.getElementById('document-input').value = '';

    updateScanButton();
}

// Update scan button state
function updateScanButton() {
    const scanBtn = document.getElementById('scan-btn');
    const canScan = scannerState.selectedVisaType &&
        scannerState.selectedCountry &&
        scannerState.uploadedDocument;

    scanBtn.disabled = !canScan;
}

// Scan document (AI simulation)
function scanDocument() {
    // Hide previous results
    document.getElementById('scan-results').style.display = 'none';

    // Show loader
    document.getElementById('scanning-loader').style.display = 'block';

    // Simulate AI processing
    setTimeout(() => {
        performAIScan();
    }, 2500); // 2.5 second delay to simulate processing
}

// Perform AI scan (simulation)
function performAIScan() {
    // Hide loader
    document.getElementById('scanning-loader').style.display = 'none';

    // Generate random scan results
    const hasIssues = Math.random() > 0.3; // 70% chance of having issues
    const issues = generateRandomIssues(hasIssues);

    // Get requirements for selected country and visa type
    const requirements = countryRequirements[scannerState.selectedCountry][scannerState.selectedVisaType];
    const countryName = countryRequirements[scannerState.selectedCountry].name;

    // Generate missing documents
    const missingDocs = generateMissingDocuments();

    // Display results
    displayResults(hasIssues, issues, requirements, countryName, missingDocs);
}

// Generate random issues
function generateRandomIssues(hasIssues) {
    if (!hasIssues) return [];

    const possibleIssues = [
        '⚠️ Фотография не соответствует требованиям (фон должен быть белым)',
        '⚠️ Подпись выходит за границы поля',
        '⚠️ Недостаточная четкость текста в разделе "Адрес"',
        '⚠️ Дата рождения указана в неправильном формате',
        '⚠️ Отсутствует печать на документе',
        '⚠️ Документ содержит помарки или исправления',
        '⚠️ Срок действия паспорта истекает менее чем через 6 месяцев'
    ];

    const numIssues = Math.floor(Math.random() * 3) + 1;
    const selectedIssues = [];

    for (let i = 0; i < numIssues; i++) {
        const randomIndex = Math.floor(Math.random() * possibleIssues.length);
        if (!selectedIssues.includes(possibleIssues[randomIndex])) {
            selectedIssues.push(possibleIssues[randomIndex]);
        }
    }

    return selectedIssues;
}

// Generate missing documents
function generateMissingDocuments() {
    const possibleMissing = [
        'Медицинская страховка',
        'Справка с места работы',
        'Выписка из банка за последние 3 месяца',
        'Свидетельство о браке (если применимо)',
        'Бронь авиабилетов'
    ];

    const shouldHaveMissing = Math.random() > 0.5;
    if (!shouldHaveMissing) return [];

    const numMissing = Math.floor(Math.random() * 2) + 1;
    return possibleMissing.slice(0, numMissing);
}

// Display scan results
function displayResults(hasIssues, issues, requirements, countryName, missingDocs) {
    // Set status
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');

    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    if (!hasIssues && missingDocs.length === 0) {
        statusBadge.className = 'status-badge success-badge';
        statusBadge.textContent = '✓';
        statusText.textContent = translation.status_success;
    } else if (hasIssues) {
        statusBadge.className = 'status-badge error-badge';
        statusBadge.textContent = '!';
        statusText.textContent = translation.status_error;
    } else {
        statusBadge.className = 'status-badge warning-badge';
        statusBadge.textContent = '⚠';
        statusText.textContent = translation.status_attention;
    }

    // Display issues
    const issuesSection = document.getElementById('issues-section');
    const issuesList = document.getElementById('issues-list');
    issuesList.innerHTML = '';

    if (issues.length > 0) {
        issuesSection.style.display = 'block';
        issues.forEach(issue => {
            const li = document.createElement('li');
            li.className = 'issue-item';
            li.textContent = issue;
            issuesList.appendChild(li);
        });
    } else {
        issuesSection.style.display = 'none';
    }

    // Display requirements
    const requirementsList = document.getElementById('requirements-list');
    document.getElementById('selected-country-name').textContent = countryName;
    requirementsList.innerHTML = '';

    requirements.forEach(req => {
        const li = document.createElement('li');
        li.className = 'requirement-item';
        li.innerHTML = `<span class="check-icon">✓</span> ${req}`;
        requirementsList.appendChild(li);
    });

    // Display missing documents
    const missingDocsSection = document.getElementById('missing-docs-section');
    const missingDocsList = document.getElementById('missing-docs-list');
    missingDocsList.innerHTML = '';

    if (missingDocs.length > 0) {
        missingDocsSection.style.display = 'block';
        missingDocs.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'missing-doc-item';
            li.innerHTML = `<span class="missing-icon">✕</span> ${doc}`;
            missingDocsList.appendChild(li);
        });
    } else {
        missingDocsSection.style.display = 'none';
    }

    // Show results
    document.getElementById('scan-results').style.display = 'block';

    // Scroll to results
    setTimeout(() => {
        document.getElementById('scan-results').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}
// ===================================
// Settings Functionality
// ===================================

// Toggle Settings Modal
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('active');
}

// Toggle Dark Theme
function toggleDarkTheme() {
    const isDark = document.getElementById('dark-theme-toggle').checked;
    const body = document.body;
    const label = document.getElementById('dark-theme-label');
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    if (isDark) {
        body.classList.add('dark-mode');
        label.textContent = translation.on;
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        label.textContent = translation.off;
        localStorage.setItem('theme', 'light');
    }
}

// Toggle Notifications
function toggleNotifications() {
    const isNotifications = document.getElementById('notifications-toggle').checked;
    const label = document.getElementById('notifications-label');
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    if (isNotifications) {
        label.textContent = translation.on;
        localStorage.setItem('notifications', 'on');

        // Request Permission if turning on
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    } else {
        label.textContent = translation.off;
        localStorage.setItem('notifications', 'off');
    }
}

// Change Language (Simulation)
function changeLanguage(lang) {
    // Update active state in UI
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // Save language preference
    localStorage.setItem('language', lang);

    // Apply translations
    applyTranslations(lang);

    // Close modal after selection
    setTimeout(toggleSettings, 300);
}

// ===================================
// Profile Functionality
// ===================================

function saveProfile() {
    const profileData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    localStorage.setItem('user_profile', JSON.stringify(profileData));

    // Show success message
    const currentLang = localStorage.getItem('language') || 'ru';
    alert(translations[currentLang].save_success);

    showScreen('screen-home');
}

function loadProfile() {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
        const data = JSON.parse(savedProfile);
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
    }
}

// ===================================
// PWA Installation
// ===================================

let deferredPrompt;
const installBtn = document.createElement('button');
installBtn.className = 'primary-btn install-app-btn';
installBtn.style.display = 'none';
installBtn.style.marginTop = '20px';
installBtn.setAttribute('data-i18n', 'install_btn');
installBtn.textContent = 'Установить приложение';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
});

function showInstallPromotion() {
    const settingsBody = document.querySelector('.settings-body');
    if (settingsBody && !document.querySelector('.install-app-btn')) {
        settingsBody.appendChild(installBtn);
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installBtn.style.display = 'none';
            }
        });
    }
}

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    deferredPrompt = null;
    installBtn.style.display = 'none';
});

// Load saved settings on startup
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('language') || 'ru';
    applyTranslations(savedLang);

    // Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('dark-theme-toggle').checked = true;
        document.body.classList.add('dark-mode');
    }

    // Notifications
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications === 'off') {
        document.getElementById('notifications-toggle').checked = false;
    }

    // Update labels after settings are applied
    applyTranslations(savedLang);

    // Profile data
    loadProfile();
});

// ===================================
// PWA Service Worker Registration
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);

                // Check for updates periodically or on reload
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // New content is available; please refresh.
                                    console.log('New content is available; please refresh.');
                                    if (confirm('Доступно обновление! Перезагрузить страницу для применения изменений?')) {
                                        window.location.reload();
                                    }
                                } else {
                                    // Content is cached for offline use.
                                    console.log('Content is cached for offline use.');
                                }
                            }
                        };
                    }
                };
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });

    // Ensure only one reload happens
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    });
}
// ===================================
// AI Chat Assistant Logic
// ===================================

function handleSendMessage() {
    const input = document.getElementById('chat-user-input');
    const text = input.value.trim();

    if (text) {
        // Clear input
        input.value = '';

        // Render user message
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        renderChatMessage('user', text, time);

        // Process AI response after a short delay
        setTimeout(() => {
            showAITypingIndicator();

            setTimeout(() => {
                removeAITypingIndicator();
                const aiResponse = processAIResponse(text);
                const aiTime = new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0');
                renderChatMessage('ai', aiResponse, aiTime);
            }, 1500);
        }, 500);
    }
}

function renderChatMessage(sender, text, time) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === 'ai' ? '🤖' : '👤';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${time}</span>
        </div>
    `;

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showAITypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.className = 'message ai-message typing';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p><i>${translation.ai_typing || '...'}</i></p>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeAITypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function processAIResponse(userMessage) {
    const lang = localStorage.getItem('language') || 'ru';
    const translation = translations[lang] || translations.ru;
    const msg = userMessage.toLowerCase();

    if (msg.includes('виз') || msg.includes('visa')) {
        return translation.ai_response_visa;
    } else if (msg.includes('документ') || msg.includes('doc')) {
        return translation.ai_response_docs;
    } else {
        return translation.ai_response_default;
    }
}

// Add enter key listener for chat
document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-user-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});
