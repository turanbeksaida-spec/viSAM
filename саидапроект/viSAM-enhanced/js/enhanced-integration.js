/**
 * Enhanced App Integration
 * This file integrates all new modules with the existing app
 * Add this script AFTER app.js in index.html
 */

import { initDB, migrateFromLocalStorage } from './modules/storage.js';
import { secureStorage } from './modules/encryption.js';
import { isCameraAvailable } from './modules/camera.js';
import { loadJsPDF } from './modules/pdf-export.js';
import { setApiKey } from './modules/ocr.js';
import { requestPermission, setRegistration } from './modules/notifications.js';
import { isPlatformAuthenticatorAvailable } from './modules/biometric.js';

// Initialize enhanced features
async function initEnhancedFeatures() {
    console.log('[Enhanced] Initializing enhanced features...');

    try {
        // Initialize IndexedDB
        await initDB();
        console.log('[Enhanced] IndexedDB initialized');

        // Migrate from localStorage
        await migrateFromLocalStorage();
        console.log('[Enhanced] Data migrated');

        // Load jsPDF library
        await loadJsPDF();
        console.log('[Enhanced] PDF library loaded');

        // Check camera availability
        const cameraAvailable = await isCameraAvailable();
        if (cameraAvailable) {
            console.log('[Enhanced] Camera available');
            document.body.classList.add('camera-supported');
        }

        // Check biometric availability
        const biometricAvailable = await isPlatformAuthenticatorAvailable();
        if (biometricAvailable) {
            console.log('[Enhanced] Biometric auth available');
            document.body.classList.add('biometric-supported');
        }

        // Load Gemini API key
        const apiKey = await secureStorage.getItem('gemini_api_key');
        if (apiKey) {
            setApiKey(apiKey);
        }

        // Request notification permission if not already granted
        if ('Notification' in window && Notification.permission === 'default') {
            setTimeout(() => {
                requestPermission().catch(console.error);
            }, 5000); // Ask after 5 seconds
        }

        // Register service worker
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register('./sw.js');
            setRegistration(registration);
            console.log('[Enhanced] Service Worker registered');
        }

        console.log('[Enhanced] All features initialized successfully');
    } catch (error) {
        console.error('[Enhanced] Initialization error:', error);
    }
}

// Theme management
function initThemeSystem() {
    const savedTheme = localStorage.getItem('app-theme') || 'theme-light';
    document.body.className = savedTheme;

    // Add theme selector to settings if not exists
    const themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
        themeSelector.value = savedTheme;
        themeSelector.addEventListener('change', (e) => {
            const theme = e.target.value;
            document.body.className = theme;
            localStorage.setItem('app-theme', theme);
        });
    }
}

// Export functionality
window.exportDocuments = async function () {
    try {
        const { exportDocumentsToPDF } = await import('./modules/pdf-export.js');
        const { getAllItems, getItem } = await import('./modules/storage.js');

        const documents = await getAllItems('documents');
        const profile = await getItem('profile', 'main');

        await exportDocumentsToPDF(documents, profile);

        const { showNotification } = await import('./modules/notifications.js');
        showNotification('PDF Export', {
            body: 'Documents exported successfully',
            icon: './assets/icons/icon-512.png'
        });
    } catch (error) {
        console.error('Export error:', error);
        alert('Failed to export documents: ' + error.message);
    }
};

// Camera capture is now handled inline in app.js

// Biometric login
window.setupBiometric = async function () {
    try {
        const { promptBiometricSetup } = await import('./modules/biometric.js');
        const username = document.getElementById('name')?.value || 'User';

        const result = await promptBiometricSetup(username);
        alert(result.message);
    } catch (error) {
        console.error('Biometric setup error:', error);
        alert('Biometric setup failed: ' + error.message);
    }
};

window.loginWithBiometric = async function () {
    try {
        const { authenticateWithBiometric } = await import('./modules/biometric.js');
        const result = await authenticateWithBiometric();

        if (result.success) {
            alert('Welcome back, ' + result.username + '!');
            // Load user profile
            loadProfile();
        }
    } catch (error) {
        console.error('Biometric login error:', error);
        alert('Biometric login failed: ' + error.message);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initEnhancedFeatures();
    initThemeSystem();
});

console.log('[Enhanced] Integration loaded');
