# viSAM Enhanced - Advanced Visa Document Management

![viSAM Enhanced](./assets/icons/icon-512.png)

## 🚀 Features

### Core Features
- 📸 **Real Camera Access** - Capture documents directly with device camera
- 🔐 **Data Encryption** - AES-256 encryption for sensitive information
- 💾 **IndexedDB Storage** - Efficient local database for documents
- 📄 **PDF Export** - Generate PDF reports of your documents
- 🔔 **Push Notifications** - Get updates about visa status
- 👆 **Biometric Auth** - Login with fingerprint or Face ID

### AI-Powered
- 🤖 **Gemini Vision OCR** - Extract text from documents automatically
- 🎯 **Document Analysis** - AI validates document completeness
- 📊 **Approval Probability** - Calculate visa approval chances
- ✨ **Auto-Fill Forms** - Extract data from scanned documents

### Enhanced UX
- 🎨 **6 Color Themes** - Light, Dark, Blue, Green, Purple, Orange, High Contrast
- ⚡ **Offline Support** - Full functionality without internet
- 📱 **PWA** - Install as native app on any device
- 🌍 **20+ Countries** - Extended country support
- 📈 **Progress Tracking** - Visual timeline of visa application

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Safari, Firefox, Edge)
- HTTPS connection (required for PWA features)
- Gemini API key (for AI features)

### Setup

1. **Clone or download** the project
2. **Serve via HTTPS** (required for camera and biometric features)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
3. **Open in browser**: `https://localhost:8000`
4. **Install as PWA**: Click install button in browser

### Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it in app Settings → Gemini AI Settings

## 🏗️ Project Structure

```
viSAM-enhanced/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── css/
│   ├── main.css           # Base styles
│   ├── themes.css         # Color themes
│   └── animations.css     # Animations
├── js/
│   ├── app.js            # Main application
│   ├── modules/
│   │   ├── storage.js    # IndexedDB wrapper
│   │   ├── encryption.js # AES-256 encryption
│   │   ├── camera.js     # Camera access
│   │   ├── pdf-export.js # PDF generation
│   │   ├── ocr.js        # Gemini Vision OCR
│   │   ├── notifications.js # Push notifications
│   │   └── biometric.js  # Biometric auth
│   └── utils/
│       ├── validation.js # Form validation
│       └── helpers.js    # Helper functions
└── assets/
    └── icons/            # App icons
```

## 🎯 Usage

### Scanning Documents

1. Click on VISA logo or navigate to AI Scanner
2. Select visa type and destination country
3. Click camera button or upload image
4. AI will analyze the document automatically
5. Review results and recommendations

### Managing Documents

- View all documents in Documents section
- Search and filter by country or type
- Export to PDF for printing
- Delete unwanted documents

### Biometric Login

1. Go to Settings
2. Enable biometric authentication
3. Follow device prompts to register
4. Use fingerprint/Face ID to login

### Themes

Choose from 6 themes in Settings:
- **Light** - Clean and bright
- **Dark** - Easy on the eyes
- **Blue** - Professional
- **Green** - Natural
- **Purple** - Creative
- **Orange** - Energetic
- **High Contrast** - Maximum accessibility

## 🔒 Security

- **Client-side encryption** - All sensitive data encrypted with AES-256
- **Secure storage** - API keys stored encrypted in localStorage
- **Biometric auth** - Uses Web Authentication API
- **No server** - All processing happens locally
- **HTTPS required** - Ensures secure communication

## 🌐 Browser Support

| Browser | Version | Features |
|---------|---------|----------|
| Chrome  | 90+     | ✅ All   |
| Safari  | 14+     | ✅ All   |
| Firefox | 88+     | ✅ All   |
| Edge    | 90+     | ✅ All   |

**Note**: Biometric auth requires platform support (Touch ID, Face ID, Windows Hello)

## 📱 PWA Features

- **Offline mode** - Works without internet
- **Install prompt** - Add to home screen
- **Background sync** - Upload when online
- **Push notifications** - Visa status updates
- **Share target** - Share documents to app

## 🛠️ Development

### Adding New Countries

Edit country data in `app.js`:

```javascript
const countryRequirements = {
  newCountry: {
    name: 'Country Name',
    tourist: ['Requirement 1', 'Requirement 2'],
    work: [...],
    student: [...],
    business: [...],
    transit: [...]
  }
};
```

### Adding New Themes

Add theme in `css/themes.css`:

```css
body.theme-custom {
  --visa-blue: #yourcolor;
  --bg-primary: #yourcolor;
  /* ... */
}
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📞 Support

For issues or questions:
- Check existing documentation
- Review code comments
- Contact support team

## 🎉 Acknowledgments

- **Gemini AI** - Document analysis
- **jsPDF** - PDF generation
- **Web APIs** - Camera, Biometric, Notifications

---

**Made with ❤️ for visa applicants worldwide**
