/**
 * Validation Utilities
 * Input validation and sanitization functions
 */

// Email validation
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (international format)
export function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Sanitize HTML to prevent XSS
export function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Validate file type
export function isValidFileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']) {
    return allowedTypes.includes(file.type);
}

// Validate file size (in MB)
export function isValidFileSize(file, maxSizeMB = 10) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
}

// Validate image dimensions
export async function validateImageDimensions(file, minWidth = 800, minHeight = 600) {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img.width >= minWidth && img.height >= minHeight);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(false);
        };

        img.src = url;
    });
}

// Validate form data
export function validateProfileForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Invalid email address');
    }

    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Invalid phone number');
    }

    if (data.password && data.password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Password strength checker
export function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(checks).forEach(check => {
        if (check) strength++;
    });

    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return {
        strength: levels[strength - 1] || 'Very Weak',
        score: strength,
        checks
    };
}

// Sanitize filename
export function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Validate date
export function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// Validate age (must be 18+)
export function isValidAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 18;
    }

    return age >= 18;
}
