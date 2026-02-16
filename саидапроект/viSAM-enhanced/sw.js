const CACHE_NAME = 'visam-enhanced-v2.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/main.css',
    './css/themes.css',
    './css/animations.css',
    './js/app.js',
    './js/enhanced-integration.js',
    './js/modules/storage.js',
    './js/modules/encryption.js',
    './js/modules/camera.js',
    './js/modules/pdf-export.js',
    './js/modules/ocr.js',
    './js/modules/notifications.js',
    './js/modules/biometric.js',
    './js/utils/validation.js',
    './js/utils/helpers.js',
    './assets/icons/icon-512.png',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching app shell');
            return cache.addAll(ASSETS_TO_CACHE.filter(url => !url.startsWith('http')));
        }).catch(err => {
            console.error('[SW] Cache failed:', err);
        })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - Network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) &&
        !event.request.url.includes('cdnjs.cloudflare.com')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Clone the response before caching
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Return offline page for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }

                    return new Response('Offline - Content not available', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                });
            })
    );
});

// Background sync for document uploads
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);

    if (event.tag === 'sync-documents') {
        event.waitUntil(syncDocuments());
    }
});

async function syncDocuments() {
    try {
        // Get pending uploads from IndexedDB
        const db = await openDB();
        const tx = db.transaction(['pendingUploads'], 'readonly');
        const store = tx.objectStore('pendingUploads');
        const uploads = await store.getAll();

        // Process each upload
        for (const upload of uploads) {
            try {
                // Send to server (implement your upload logic here)
                console.log('[SW] Syncing document:', upload);

                // Remove from pending after successful upload
                const deleteTx = db.transaction(['pendingUploads'], 'readwrite');
                const deleteStore = deleteTx.objectStore('pendingUploads');
                await deleteStore.delete(upload.id);
            } catch (error) {
                console.error('[SW] Upload failed:', error);
            }
        }
    } catch (error) {
        console.error('[SW] Sync failed:', error);
    }
}

// Push notification handler
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received');

    const data = event.data ? event.data.json() : {};
    const title = data.title || 'viSAM Notification';
    const options = {
        body: data.body || 'You have a new notification',
        icon: './assets/icons/icon-512.png',
        badge: './assets/icons/icon-512.png',
        vibrate: [200, 100, 200],
        data: data.url || '/',
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked');

    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data || '/')
    );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);

    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }

    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.delete(CACHE_NAME).then(() => {
                return caches.open(CACHE_NAME);
            })
        );
    }
});

// Helper to open IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('viSAMDB', 1);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

console.log('[SW] Service Worker loaded');
