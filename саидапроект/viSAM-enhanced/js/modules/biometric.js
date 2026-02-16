/**
 * Biometric Authentication Module
 * Provides fingerprint and Face ID authentication using Web Authentication API
 */

// Check if biometric authentication is available
export function isBiometricAvailable() {
    return window.PublicKeyCredential !== undefined &&
        navigator.credentials !== undefined;
}

// Check platform authenticator availability (Face ID, Touch ID, Windows Hello)
export async function isPlatformAuthenticatorAvailable() {
    if (!isBiometricAvailable()) return false;

    try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
        return false;
    }
}

// Register biometric credential
export async function registerBiometric(username) {
    if (!isBiometricAvailable()) {
        throw new Error('Biometric authentication not supported');
    }

    try {
        // Generate challenge (in production, this should come from server)
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const publicKeyOptions = {
            challenge: challenge,
            rp: {
                name: 'viSAM',
                id: window.location.hostname
            },
            user: {
                id: new Uint8Array(16),
                name: username,
                displayName: username
            },
            pubKeyCredParams: [
                { alg: -7, type: 'public-key' },  // ES256
                { alg: -257, type: 'public-key' } // RS256
            ],
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                userVerification: 'required',
                requireResidentKey: false
            },
            timeout: 60000,
            attestation: 'none'
        };

        const credential = await navigator.credentials.create({
            publicKey: publicKeyOptions
        });

        // Store credential ID
        if (credential) {
            const credentialId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
            localStorage.setItem('biometric-credential-id', credentialId);
            localStorage.setItem('biometric-username', username);
            return true;
        }

        return false;

    } catch (error) {
        console.error('Biometric registration error:', error);
        throw error;
    }
}

// Authenticate with biometric
export async function authenticateWithBiometric() {
    if (!isBiometricAvailable()) {
        throw new Error('Biometric authentication not supported');
    }

    const credentialId = localStorage.getItem('biometric-credential-id');
    if (!credentialId) {
        throw new Error('No biometric credential registered');
    }

    try {
        // Generate challenge
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        // Convert credential ID back to ArrayBuffer
        const rawId = Uint8Array.from(atob(credentialId), c => c.charCodeAt(0));

        const publicKeyOptions = {
            challenge: challenge,
            rpId: window.location.hostname,
            allowCredentials: [{
                id: rawId,
                type: 'public-key',
                transports: ['internal']
            }],
            userVerification: 'required',
            timeout: 60000
        };

        const assertion = await navigator.credentials.get({
            publicKey: publicKeyOptions
        });

        if (assertion) {
            return {
                success: true,
                username: localStorage.getItem('biometric-username')
            };
        }

        return { success: false };

    } catch (error) {
        console.error('Biometric authentication error:', error);
        throw error;
    }
}

// Remove biometric credential
export function removeBiometric() {
    localStorage.removeItem('biometric-credential-id');
    localStorage.removeItem('biometric-username');
}

// Check if biometric is registered
export function isBiometricRegistered() {
    return localStorage.getItem('biometric-credential-id') !== null;
}

// Get biometric info
export function getBiometricInfo() {
    return {
        isRegistered: isBiometricRegistered(),
        username: localStorage.getItem('biometric-username')
    };
}

// Prompt for biometric setup
export async function promptBiometricSetup(username) {
    const available = await isPlatformAuthenticatorAvailable();

    if (!available) {
        return {
            success: false,
            message: 'Biometric authentication is not available on this device'
        };
    }

    if (isBiometricRegistered()) {
        return {
            success: false,
            message: 'Biometric authentication is already set up'
        };
    }

    try {
        const registered = await registerBiometric(username);
        return {
            success: registered,
            message: registered ? 'Biometric authentication enabled' : 'Setup cancelled'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
