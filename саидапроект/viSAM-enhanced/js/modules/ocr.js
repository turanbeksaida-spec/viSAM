/**
 * OCR Module - Gemini Vision API Integration
 * Provides document text recognition and analysis
 */

import { secureStorage } from './encryption.js';

let geminiApiKey = null;

// Set API key
export function setApiKey(key) {
    geminiApiKey = key;
}

// Get API key from settings
export async function getApiKey() {
    return geminiApiKey || await secureStorage.getItem('gemini_api_key');
}

// Analyze document with Gemini Vision
export async function analyzeDocument(imageData, visaType, country) {
    const apiKey = await getApiKey();

    if (!apiKey) {
        throw new Error('Gemini API key not configured. Please add it in settings.');
    }

    try {
        // Remove data URL prefix if present
        const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `You are an expert visa document analyzer. Analyze this document image for a ${visaType} visa application to ${country}.
        
        Compare the document against standard international requirements for this visa type.
        
        Please provide a detailed analysis in JSON format:
        {
          "documentType": "string (e.g., Passport, Bank Statement, Invitation Letter)",
          "extractedText": "all readable text from the document",
          "extractedInfo": {
            "name": "full name if found",
            "email": "email if found",
            "phone": "phone if found",
            "passportNumber": "number if found",
            "expiryDate": "expiry if found"
          },
          "isComplete": boolean (is the document fully visible and all mandatory fields present?),
          "quality": "excellent|good|fair|poor",
          "hasIssues": boolean,
          "issues": ["list of specific issues found"],
          "requirements": ["list of met requirements"],
          "missingDocs": ["related documents that might be needed"],
          "approvalProbability": number (0-100),
          "recommendations": ["step-by-step guidance"]
        }
        
        Ensure "extactedText" is comprehensive. If it's a passport, extract name, number, expiry, and DOB.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text;

        if (!text) {
            throw new Error('No response from AI');
        }

        // Try to parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: create structured response from text
        return {
            documentType: 'Unknown',
            extractedText: text,
            isComplete: text.toLowerCase().includes('complete'),
            quality: 'good',
            issues: [],
            missingInfo: [],
            approvalProbability: 50,
            recommendations: [text]
        };

    } catch (error) {
        console.error('OCR Analysis error:', error);
        throw error;
    }
}

// Extract text only (simple OCR)
export async function extractText(imageData) {
    const apiKey = await getApiKey();

    if (!apiKey) {
        throw new Error('Gemini API key not configured');
    }

    try {
        const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: 'Extract all text from this image. Return only the extracted text, no additional commentary.' },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            }
        );

        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || '';

    } catch (error) {
        console.error('Text extraction error:', error);
        throw error;
    }
}

// Auto-fill form from document
export async function autoFillFromDocument(imageData) {
    const apiKey = await getApiKey();

    if (!apiKey) {
        throw new Error('Gemini API key not configured');
    }

    try {
        const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `Extract personal information from this document. Return as JSON:
{
  "name": "full name",
  "email": "email address",
  "phone": "phone number",
  "dateOfBirth": "date of birth",
  "passportNumber": "passport number",
  "nationality": "nationality"
}
Only include fields that are clearly visible in the document.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text;

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {};

    } catch (error) {
        console.error('Auto-fill error:', error);
        return {};
    }
}

// Validate document quality
export async function validateDocumentQuality(imageData) {
    const apiKey = await getApiKey();

    if (!apiKey) {
        return { quality: 'unknown', issues: ['API key not configured'] };
    }

    try {
        const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `Assess the quality of this document image for official use. Check for:
- Image clarity and resolution
- Proper lighting
- No glare or shadows
- All text is readable
- Document is not cropped
- No distortion

Return JSON:
{
  "quality": "excellent|good|fair|poor",
  "score": 0-100,
  "issues": ["array of quality issues"],
  "isAcceptable": boolean
}`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text;

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return { quality: 'good', score: 75, issues: [], isAcceptable: true };

    } catch (error) {
        console.error('Quality validation error:', error);
        return { quality: 'unknown', score: 0, issues: [error.message], isAcceptable: false };
    }
}
