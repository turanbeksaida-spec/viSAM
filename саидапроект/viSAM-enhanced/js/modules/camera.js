/**
 * Camera Module
 * Provides camera access for document scanning
 */

let stream = null;
let videoElement = null;

// Initialize camera
export async function initCamera(videoElementId) {
    try {
        videoElement = document.getElementById(videoElementId);

        const constraints = {
            video: {
                facingMode: 'environment', // Use back camera on mobile
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        await videoElement.play();

        return true;
    } catch (error) {
        console.error('Camera initialization error:', error);
        throw new Error('Не удалось получить доступ к камере. Проверьте разрешения.');
    }
}

// Capture photo from camera
export function capturePhoto() {
    if (!videoElement || !stream) {
        throw new Error('Камера не инициализирована');
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.9);
}

// Capture with quality enhancement
export function capturePhotoEnhanced() {
    const imageData = capturePhoto();

    // Create canvas for enhancement
    const img = new Image();
    img.src = imageData;

    return new Promise((resolve) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');

            // Apply brightness and contrast enhancement
            ctx.filter = 'brightness(1.1) contrast(1.2)';
            ctx.drawImage(img, 0, 0);

            resolve(canvas.toDataURL('image/jpeg', 0.92));
        };
    });
}

// Stop camera
export function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    if (videoElement) {
        videoElement.srcObject = null;
    }
}

// Switch camera (front/back)
export async function switchCamera() {
    const currentFacingMode = stream?.getVideoTracks()[0].getSettings().facingMode;
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    stopCamera();

    const constraints = {
        video: {
            facingMode: newFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        }
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    await videoElement.play();
}

// Check camera availability
export async function isCameraAvailable() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.some(device => device.kind === 'videoinput');
    } catch {
        return false;
    }
}

// Get available cameras
export async function getAvailableCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'videoinput');
    } catch {
        return [];
    }
}

// Capture multiple photos (batch mode)
export async function captureBatch(count = 3, delayMs = 1000) {
    const photos = [];

    for (let i = 0; i < count; i++) {
        if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
        const photo = await capturePhotoEnhanced();
        photos.push(photo);
    }

    return photos;
}
