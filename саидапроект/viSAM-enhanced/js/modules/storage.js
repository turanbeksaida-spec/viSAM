/**
 * IndexedDB Storage Module
 * Provides efficient data storage for documents, profiles, and app data
 */

const DB_NAME = 'viSAMDB';
const DB_VERSION = 1;
let db = null;

// Initialize IndexedDB
export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Documents store
            if (!db.objectStoreNames.contains('documents')) {
                const documentsStore = db.createObjectStore('documents', { keyPath: 'id', autoIncrement: true });
                documentsStore.createIndex('type', 'type', { unique: false });
                documentsStore.createIndex('country', 'country', { unique: false });
                documentsStore.createIndex('date', 'uploadDate', { unique: false });
            }

            // Profile store
            if (!db.objectStoreNames.contains('profile')) {
                db.createObjectStore('profile', { keyPath: 'id' });
            }

            // Settings store
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }

            // Progress tracking store
            if (!db.objectStoreNames.contains('progress')) {
                const progressStore = db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
                progressStore.createIndex('status', 'status', { unique: false });
            }
        };
    });
}

// Generic CRUD operations
export async function addItem(storeName, item) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.add(item);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getItem(storeName, id) {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getAllItems(storeName) {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function updateItem(storeName, item) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteItem(storeName, id) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Search documents by criteria
export async function searchDocuments(criteria) {
    const allDocs = await getAllItems('documents');
    return allDocs.filter(doc => {
        if (criteria.type && doc.type !== criteria.type) return false;
        if (criteria.country && doc.country !== criteria.country) return false;
        if (criteria.searchText) {
            const searchLower = criteria.searchText.toLowerCase();
            return doc.name?.toLowerCase().includes(searchLower) ||
                doc.description?.toLowerCase().includes(searchLower);
        }
        return true;
    });
}

// Migrate data from localStorage to IndexedDB
export async function migrateFromLocalStorage() {
    try {
        // Migrate profile
        const profileData = localStorage.getItem('userProfile');
        if (profileData) {
            const profile = JSON.parse(profileData);
            await updateItem('profile', { id: 'main', ...profile });
        }

        // Migrate settings
        const lang = localStorage.getItem('selectedLanguage');
        if (lang) {
            await updateItem('settings', { key: 'language', value: lang });
        }

        const darkMode = localStorage.getItem('darkMode');
        if (darkMode) {
            await updateItem('settings', { key: 'darkMode', value: darkMode === 'true' });
        }

        console.log('Migration from localStorage completed');
    } catch (error) {
        console.error('Migration error:', error);
    }
}
