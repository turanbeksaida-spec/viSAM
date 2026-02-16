/**
 * Push Notifications Module
 * Handles push notifications for visa status updates
 */

let registration = null;

// Request notification permission
export async function requestPermission() {
    if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
}

// Check if notifications are supported and permitted
export function isNotificationSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
}

export function getNotificationPermission() {
    if (!('Notification' in window)) return 'denied';
    return Notification.permission;
}

// Show local notification
export function showNotification(title, options = {}) {
    if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    const defaultOptions = {
        icon: '/assets/icons/icon-512.png',
        badge: '/assets/icons/icon-512.png',
        vibrate: [200, 100, 200],
        tag: 'viSAM-notification',
        requireInteraction: false,
        ...options
    };

    if (registration && registration.showNotification) {
        // Use service worker notification
        registration.showNotification(title, defaultOptions);
    } else {
        // Fallback to regular notification
        new Notification(title, defaultOptions);
    }
}

// Set service worker registration
export function setRegistration(reg) {
    registration = reg;
}

// Schedule notification
export function scheduleNotification(title, options, delayMs) {
    setTimeout(() => {
        showNotification(title, options);
    }, delayMs);
}

// Notification templates
export const notificationTemplates = {
    documentUploaded: (documentName) => ({
        title: '📄 Document Uploaded',
        body: `${documentName} has been successfully uploaded`,
        icon: '/assets/icons/icon-512.png'
    }),

    documentAnalyzed: (documentName, status) => ({
        title: '🔍 Analysis Complete',
        body: `${documentName} analysis: ${status}`,
        icon: '/assets/icons/icon-512.png'
    }),

    visaStatusUpdate: (status) => ({
        title: '📋 Visa Status Update',
        body: `Your visa application status: ${status}`,
        icon: '/assets/icons/icon-512.png',
        requireInteraction: true
    }),

    missingDocuments: (count) => ({
        title: '⚠️ Missing Documents',
        body: `You have ${count} missing document${count > 1 ? 's' : ''}`,
        icon: '/assets/icons/icon-512.png'
    }),

    appointmentReminder: (date) => ({
        title: '📅 Appointment Reminder',
        body: `Your visa appointment is on ${date}`,
        icon: '/assets/icons/icon-512.png',
        requireInteraction: true
    }),

    applicationApproved: () => ({
        title: '✅ Application Approved!',
        body: 'Congratulations! Your visa application has been approved',
        icon: '/assets/icons/icon-512.png',
        requireInteraction: true,
        vibrate: [200, 100, 200, 100, 200]
    }),

    applicationRejected: () => ({
        title: '❌ Application Update',
        body: 'Your visa application requires attention',
        icon: '/assets/icons/icon-512.png',
        requireInteraction: true
    })
};

// Send notification using template
export function sendTemplateNotification(templateName, ...args) {
    const template = notificationTemplates[templateName];
    if (!template) {
        console.error(`Notification template '${templateName}' not found`);
        return;
    }

    const { title, ...options } = template(...args);
    showNotification(title, options);
}

// Notification history (stored in IndexedDB)
export async function saveNotificationHistory(notification) {
    try {
        const { addItem } = await import('./storage.js');
        await addItem('notifications', {
            ...notification,
            timestamp: Date.now(),
            read: false
        });
    } catch (error) {
        console.error('Failed to save notification history:', error);
    }
}

// Get notification history
export async function getNotificationHistory() {
    try {
        const { getAllItems } = await import('./storage.js');
        return await getAllItems('notifications');
    } catch (error) {
        console.error('Failed to get notification history:', error);
        return [];
    }
}

// Clear all notifications
export async function clearNotifications() {
    if (registration && registration.getNotifications) {
        const notifications = await registration.getNotifications();
        notifications.forEach(notification => notification.close());
    }
}
