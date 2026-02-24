/**
 * GAS Translation API for Quran Sura Introduction
 * Handles POST requests to translate text/HTML from English to Thai
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const text = data.text;
    const source = data.source || 'en';
    const target = data.target || 'th';
    
    // Translate using Google Translation Service
    const translatedText = LanguageApp.translate(text, source, target);
    
    return ContentService.createTextOutput(JSON.stringify({
      translatedText: translatedText
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET for basic testing
function doGet() {
  return ContentService.createTextOutput("Translation API is Active").setMimeType(ContentService.MimeType.TEXT);
}