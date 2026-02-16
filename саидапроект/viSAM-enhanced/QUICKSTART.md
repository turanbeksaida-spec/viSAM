# viSAM Enhanced - Quick Start Guide

## 🚀 Getting Started

### Step 1: Update HTML

Add these lines to `index.html` in the `<head>` section:

```html
<!-- Enhanced CSS -->
<link rel="stylesheet" href="css/themes.css">
<link rel="stylesheet" href="css/animations.css">
```

Add this line before the closing `</body>` tag:

```html
<!-- Enhanced Integration -->
<script type="module" src="js/enhanced-integration.js"></script>
```

### Step 2: Update Service Worker Registration

The enhanced integration file will automatically register the new service worker.

### Step 3: Add Theme Selector to Settings

Add this HTML to your settings modal:

```html
<div class="settings-section">
    <h3>🎨 Theme Selection</h3>
    <select id="theme-selector" onchange="changeTheme(this.value)">
        <option value="theme-light">Light</option>
        <option value="theme-dark">Dark</option>
        <option value="theme-blue">Blue</option>
        <option value="theme-green">Green</option>
        <option value="theme-purple">Purple</option>
        <option value="theme-orange">Orange</option>
        <option value="theme-contrast">High Contrast</option>
    </select>
</div>
```

Add this JavaScript function:

```javascript
function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
}
```

### Step 4: Add Camera Button

Add camera button to your scanner screen:

```html
<button onclick="openCameraCapture()" class="primary-btn">
    📸 Use Camera
</button>
```

### Step 5: Add Export Button

Add export button to documents screen:

```html
<button onclick="exportDocuments()" class="primary-btn">
    📄 Export to PDF
</button>
```

### Step 6: Add Biometric Login

Add to your profile/login screen:

```html
<button onclick="setupBiometric()" class="primary-btn">
    👆 Setup Biometric Login
</button>

<button onclick="loginWithBiometric()" class="primary-btn">
    🔐 Login with Biometric
</button>
```

## 🔧 Configuration

### Gemini API Key

1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add it in Settings → Gemini AI Settings
3. The key is automatically encrypted and stored securely

### Notification Permission

The app will automatically request notification permission after 5 seconds.
You can also manually enable it in Settings.

## 📱 Testing

### Local Testing

1. Serve the app over HTTPS (required for PWA features):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Then access via: https://localhost:8000
   ```

2. Open browser DevTools → Application → Service Workers
3. Verify service worker is registered
4. Test offline mode by checking "Offline" in Network tab

### Mobile Testing

1. Deploy to a hosting service (Cloudflare Pages, Netlify, Vercel)
2. Access from mobile device
3. Install as PWA using browser's "Add to Home Screen"
4. Test camera, biometric, and offline features

## 🎯 Features Usage

### Camera Scanning

1. Click "Use Camera" button
2. Allow camera permission
3. Point at document
4. Click "Capture" button
5. Document is automatically analyzed by AI

### PDF Export

1. Go to Documents screen
2. Click "Export to PDF"
3. PDF is generated and downloaded automatically

### Biometric Login

1. Go to Profile/Settings
2. Click "Setup Biometric Login"
3. Follow device prompts
4. Use "Login with Biometric" on next visit

### Themes

1. Go to Settings
2. Select theme from dropdown
3. Theme is applied instantly and saved

## 🔍 Troubleshooting

### Camera Not Working

- Ensure HTTPS connection
- Check browser permissions
- Try different browser (Chrome/Safari recommended)

### Biometric Not Available

- Check device support (Touch ID, Face ID, Windows Hello)
- Ensure HTTPS connection
- Update browser to latest version

### PDF Export Fails

- Check internet connection (jsPDF loads from CDN)
- Ensure documents are loaded
- Check browser console for errors

### Service Worker Issues

- Clear browser cache
- Unregister old service workers
- Hard refresh (Ctrl+Shift+R)

## 📊 Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Camera | ✅ | ✅ | ✅ | ✅ |
| Biometric | ✅ | ✅ iOS 14+ | ❌ | ✅ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Notifications | ✅ | ⚠️ Limited | ✅ | ✅ |

## 🎉 What's New

✨ **6 Color Themes** - Choose your favorite look
📸 **Real Camera Access** - Scan documents directly
🔐 **Biometric Auth** - Secure login with fingerprint/Face ID
💾 **IndexedDB Storage** - Efficient local database
📄 **PDF Export** - Generate professional reports
🤖 **Gemini AI OCR** - Extract text automatically
🔔 **Push Notifications** - Stay updated
🔒 **AES-256 Encryption** - Secure your data
⚡ **Offline Mode** - Works without internet
🎨 **Micro-animations** - Smooth interactions

## 📞 Need Help?

- Check README.md for detailed documentation
- Review code comments in modules
- Test in browser DevTools console
- Check Service Worker status in Application tab

---

**Enjoy your enhanced viSAM experience! 🎊**
