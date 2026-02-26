/**
 * Quran Sura Introduction Viewer
 * Source: https://dorar.net/en/tafseer/
 *
 * Fetches via local proxy: http://localhost:3000/proxy?url=...
 * The Sura IDs on dorar.net map as:
 *  Sura 1 (Al-Fatihah)  => ID 1233  (dorarId = 1232 + surahNumber)
 *  ...
 *  Sura 114 (An-Naas)   => ID 1346
 */

// ─────────────────────────────────────────────
//  Configuration
// ─────────────────────────────────────────────
const LOCAL_PROXY = 'http://localhost:3000/proxy?url=';
const PUBLIC_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest='
];
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyOKC9QrNWlrbCoQCrKcFsTjFS3JBjl9Y5JMBHnI73BKBQf_SRu2uSWZiH0ytVzEYS6/exec';

// Detect if running on localhost to prioritize local proxy
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const SOURCE_CONFIG = {
  dorar: {
    name: "Dorar.net (Intro)",
    urlTemplate: (sura) => `https://dorar.net/en/tafseer/${sura.id}`,
    isApi: false,
    label: "View on Dorar.net",
    footerPrefix: "Source: Dorar.net — The overall tafseer of Quran",
    footerUrl: "https://dorar.net/en/tafseer/"
  },
  quran_com_ashur: {
    name: "Quran.com (Ibn Ashur)",
    urlTemplate: (sura) => `https://quran.com/api/proxy/content/api/qdc/chapters/${sura.num}/info?language=en&resource_id=1030&include_resources=true`,
    isApi: true,
    label: "View on Quran.com",
    webUrl: (sura) => `https://quran.com/surah/${sura.num}/info`,
    footerPrefix: "Source: Quran.com — Adapted from Tafsir Ibn Ashur",
    footerUrl: "https://quran.com/surah/1/info"
  },
  quran_com_maududi: {
    name: "Quran.com (A. Maududi)",
    urlTemplate: (sura) => `https://quran.com/api/proxy/content/api/qdc/chapters/${sura.num}/info?language=en&resource_id=58&include_resources=true`,
    isApi: true,
    label: "View on Quran.com",
    webUrl: (sura) => `https://quran.com/surah/${sura.num}/info`,
    footerPrefix: "Source: Quran.com — Adapted from Tafsir A. Maududi",
    footerUrl: "https://quran.com/surah/1/info"
  }
};
// ─────────────────────────────────────────────
//  Sura Data (114 Suras)
// ─────────────────────────────────────────────
const SURAS = [
  { num: 1, name: "Al-Fatihah", arabic: "سورة الفاتحة", id: 1233 },
  { num: 2, name: "Al-Baqarah", arabic: "سورة البقرة", id: 1234 },
  { num: 3, name: "Al-'Imran", arabic: "سورة آل عمران", id: 1235 },
  { num: 4, name: "An-Nisaa'", arabic: "سورة النساء", id: 1236 },
  { num: 5, name: "Al-Ma'idah", arabic: "سورة المائدة", id: 1237 },
  { num: 6, name: "Al-An'am", arabic: "سورة الأنعام", id: 1238 },
  { num: 7, name: "Al-A'raf", arabic: "سورة الأعراف", id: 1239 },
  { num: 8, name: "Al-Anfal", arabic: "سورة الأنفال", id: 1240 },
  { num: 9, name: "At-Tawbah", arabic: "سورة التوبة", id: 1241 },
  { num: 10, name: "Yunus", arabic: "سورة يونس", id: 1242 },
  { num: 11, name: "Hud", arabic: "سورة هود", id: 1243 },
  { num: 12, name: "Yusuf", arabic: "سورة يوسف", id: 1244 },
  { num: 13, name: "Ar-Ra'd", arabic: "سورة الرعد", id: 1245 },
  { num: 14, name: "Ibraaheem", arabic: "سورة إبراهيم", id: 1246 },
  { num: 15, name: "Al-Hijr", arabic: "سورة الحجر", id: 1247 },
  { num: 16, name: "An-Nahl", arabic: "سورة النحل", id: 1248 },
  { num: 17, name: "Al-Israa", arabic: "سورة الإسراء", id: 1249 },
  { num: 18, name: "Al-Kahf", arabic: "سورة الكهف", id: 1250 },
  { num: 19, name: "Maryam", arabic: "سورة مريم", id: 1251 },
  { num: 20, name: "Taa Haa", arabic: "سورة طه", id: 1252 },
  { num: 21, name: "Al-Anbiyyaa", arabic: "سورة الأنبياء", id: 1253 },
  { num: 22, name: "Al-Hajj", arabic: "سورة الحج", id: 1254 },
  { num: 23, name: "Al-Mu'minun", arabic: "سورة المؤمنون", id: 1255 },
  { num: 24, name: "An-Nur", arabic: "سورة النور", id: 1256 },
  { num: 25, name: "Al-Furqaan", arabic: "سورة الفرقان", id: 1257 },
  { num: 26, name: "Ash-Shu'araa", arabic: "سورة الشعراء", id: 1258 },
  { num: 27, name: "An-Naml", arabic: "سورة النمل", id: 1259 },
  { num: 28, name: "Al-Qassas", arabic: "سورة القصص", id: 1260 },
  { num: 29, name: "Al-'Ankabut", arabic: "سورة العنكبوت", id: 1261 },
  { num: 30, name: "Ar-Rum", arabic: "سورة الروم", id: 1262 },
  { num: 31, name: "Luqmaan", arabic: "سورة لقمان", id: 1263 },
  { num: 32, name: "As-Sajdah", arabic: "سورة السجدة", id: 1264 },
  { num: 33, name: "Al-Ahzaab", arabic: "سورة الأحزاب", id: 1265 },
  { num: 34, name: "Saba'", arabic: "سورة سبأ", id: 1266 },
  { num: 35, name: "Faatir", arabic: "سورة فاطر", id: 1267 },
  { num: 36, name: "Yaa Seen", arabic: "سورة يس", id: 1268 },
  { num: 37, name: "As-Saafaat", arabic: "سورة الصافات", id: 1269 },
  { num: 38, name: "Saad", arabic: "سورة ص", id: 1270 },
  { num: 39, name: "Az-Zumar", arabic: "سورة الزمر", id: 1271 },
  { num: 40, name: "Ghaafir", arabic: "سورة غافر", id: 1272 },
  { num: 41, name: "Fussilat", arabic: "سورة فصلت", id: 1273 },
  { num: 42, name: "Ash-Shooraa", arabic: "سورة الشورى", id: 1274 },
  { num: 43, name: "Az-Zukhruf", arabic: "سورة الزخرف", id: 1275 },
  { num: 44, name: "Ad-Dukhaan", arabic: "سورة الدخان", id: 1276 },
  { num: 45, name: "Al-Jaathiyah", arabic: "سورة الجاثية", id: 1277 },
  { num: 46, name: "Al-Ahqaaf", arabic: "سورة الأحقاف", id: 1278 },
  { num: 47, name: "Muhammad", arabic: "سورة محمد", id: 1279 },
  { num: 48, name: "Al-Fat-h", arabic: "سورة الفتح", id: 1280 },
  { num: 49, name: "Al-Hujuraat", arabic: "سورة الحجرات", id: 1281 },
  { num: 50, name: "Qaaf", arabic: "سورة ق", id: 1282 },
  { num: 51, name: "Adh-Dhaariyyaat", arabic: "سورة الذاريات", id: 1283 },
  { num: 52, name: "AT-Tur", arabic: "سورة الطور", id: 1284 },
  { num: 53, name: "An-Najm", arabic: "سورة النجم", id: 1285 },
  { num: 54, name: "Al-Qamar", arabic: "سورة القمر", id: 1286 },
  { num: 55, name: "Ar-Rahmaan", arabic: "سورة الرحمن", id: 1287 },
  { num: 56, name: "Al-Waaqi'ah", arabic: "سورة الواقعة", id: 1288 },
  { num: 57, name: "Al-Hadeed", arabic: "سورة الحديد", id: 1289 },
  { num: 58, name: "Al-Mujaadalah", arabic: "سورة المجادلة", id: 1290 },
  { num: 59, name: "Al-Hashr", arabic: "سورة الحشر", id: 1291 },
  { num: 60, name: "Al-Mumtahanah", arabic: "سورة الممتحنة", id: 1292 },
  { num: 61, name: "As-Saff", arabic: "سورة الصف", id: 1293 },
  { num: 62, name: "Al-Jumu'ah", arabic: "سورة الجمعة", id: 1294 },
  { num: 63, name: "Al-Munaafiqoon", arabic: "سورة المنافقون", id: 1295 },
  { num: 64, name: "At-Taghaabun", arabic: "سورة التغابن", id: 1296 },
  { num: 65, name: "At-Talaaq", arabic: "سورة الطلاق", id: 1297 },
  { num: 66, name: "At-Tahreem", arabic: "سورة التحريم", id: 1298 },
  { num: 67, name: "Al-Mulk", arabic: "سورة الملك", id: 1299 },
  { num: 68, name: "Al-Qalam", arabic: "سورة القلم", id: 1300 },
  { num: 69, name: "Al-Haaqqah", arabic: "سورة الحاقة", id: 1301 },
  { num: 70, name: "Al-Ma'aarij", arabic: "سورة المعارج", id: 1302 },
  { num: 71, name: "Nooh", arabic: "سورة نوح", id: 1303 },
  { num: 72, name: "Al-Jinn", arabic: "سورة الجن", id: 1304 },
  { num: 73, name: "Al-Muzzammil", arabic: "سورة المزمل", id: 1305 },
  { num: 74, name: "Al-Muddath-thir", arabic: "سورة المدثر", id: 1306 },
  { num: 75, name: "Al-Qiyyaamah", arabic: "سورة القيامة", id: 1307 },
  { num: 76, name: "Al-Insaan", arabic: "سورة الإنسان", id: 1308 },
  { num: 77, name: "Al-Mursalaat", arabic: "سورة المرسلات", id: 1309 },
  { num: 78, name: "An-Naba'", arabic: "سورة النبأ", id: 1310 },
  { num: 79, name: "An-Naazi'aat", arabic: "سورة النازعات", id: 1311 },
  { num: 80, name: "Abasa", arabic: "سورة عبس", id: 1312 },
  { num: 81, name: "At-Takweer", arabic: "سورة التكوير", id: 1313 },
  { num: 82, name: "At-Infitaar", arabic: "سورة الانفطار", id: 1314 },
  { num: 83, name: "Al-Mutaffifeen", arabic: "سورة المطففين", id: 1315 },
  { num: 84, name: "Al-Inshiqaaq", arabic: "سورة الانشقاق", id: 1316 },
  { num: 85, name: "Al-Burooj", arabic: "سورة البروج", id: 1317 },
  { num: 86, name: "At-Taariq", arabic: "سورة الطارق", id: 1318 },
  { num: 87, name: "Al-A'laa", arabic: "سورة الأعلى", id: 1319 },
  { num: 88, name: "Al-Ghaashiyah", arabic: "سورة الغاشية", id: 1320 },
  { num: 89, name: "Al-Fajr", arabic: "سورة الفجر", id: 1321 },
  { num: 90, name: "Al-Balad", arabic: "سورة البلد", id: 1322 },
  { num: 91, name: "Ash-Shams", arabic: "سورة الشمس", id: 1323 },
  { num: 92, name: "Al-Layl", arabic: "سورة الليل", id: 1324 },
  { num: 93, name: "Adh-Dhuhaa", arabic: "سورة الضحى", id: 1325 },
  { num: 94, name: "Ash-Sharh", arabic: "سورة الشرح", id: 1326 },
  { num: 95, name: "At-Teen", arabic: "سورة التين", id: 1327 },
  { num: 96, name: "Al-'Alaq", arabic: "سورة العلق", id: 1328 },
  { num: 97, name: "Al-Qadr", arabic: "سورة القدر", id: 1329 },
  { num: 98, name: "Al-Bayyinah", arabic: "سورة البينة", id: 1330 },
  { num: 99, name: "Az-Zalzalah", arabic: "سورة الزلزلة", id: 1331 },
  { num: 100, name: "Al-'Aadiyaat", arabic: "سورة العاديات", id: 1332 },
  { num: 101, name: "Al-Qaari'ah", arabic: "سورة القارعة", id: 1333 },
  { num: 102, name: "At-Takaathur", arabic: "سورة التكاثر", id: 1334 },
  { num: 103, name: "Al-'Asr", arabic: "سورة العصر", id: 1335 },
  { num: 104, name: "Al-Humazah", arabic: "سورة الهمزة", id: 1336 },
  { num: 105, name: "Al-Feel", arabic: "سورة الفيل", id: 1337 },
  { num: 106, name: "Quraysh", arabic: "سورة قريش", id: 1338 },
  { num: 107, name: "Al-Maa'oon", arabic: "سورة الماعون", id: 1339 },
  { num: 108, name: "Al-Kawthar", arabic: "سورة الكوثر", id: 1340 },
  { num: 109, name: "Al-Kaafiroon", arabic: "سورة الكافرون", id: 1341 },
  { num: 110, name: "An-Nasr", arabic: "سورة النصر", id: 1342 },
  { num: 111, name: "Al-Masad", arabic: "سورة المسد", id: 1343 },
  { num: 112, name: "Al-Ikhlaas", arabic: "سورة الإخلاص", id: 1344 },
  { num: 113, name: "Al-Falaq", arabic: "سورة الفلق", id: 1345 },
  { num: 114, name: "An-Naas", arabic: "سورة الناس", id: 1346 },
];

// ─────────────────────────────────────────────
//  DOM References
// ─────────────────────────────────────────────
const suraSelect = document.getElementById('sura-select');
const sourceSelect = document.getElementById('source-select');
const fetchBtn = document.getElementById('fetch-btn');
const placeholderState = document.getElementById('placeholder-state');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const contentArea = document.getElementById('content-area');
const errorText = document.getElementById('error-text');
const retryBtn = document.getElementById('retry-btn');

const contentBadge = document.getElementById('content-sura-number');
const contentName = document.getElementById('content-sura-name');
const contentArabic = document.getElementById('content-sura-arabic');
// Updated for tabs
const introductionTextEn = document.getElementById('introduction-text-en');
const introductionTextTh = document.getElementById('introduction-text-th');
const tabBtns = document.querySelectorAll('.tab-btn');

const copyBtn = document.getElementById('copy-btn');
const sourceLink = document.getElementById('source-link');

// ─────────────────────────────────────────────
//  Tab Switching Logic
// ─────────────────────────────────────────────
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // UI Update
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Content Update
    introductionTextEn.classList.remove('active');
    introductionTextTh.classList.remove('active');

    if (tab === 'en') {
      introductionTextEn.classList.add('active');
    } else {
      introductionTextTh.classList.add('active');
      // Trigger translation if needed
      if (introductionTextTh.dataset.translatedFor !== suraSelect.value) {
        translateToThai();
      }
    }
  });
});

async function translateToThai() {
  const englishHtml = introductionTextEn.innerHTML;
  if (!englishHtml || englishHtml.trim().length < 10) return;

  const currentSura = suraSelect.value;

  // Show localized loading state
  introductionTextTh.innerHTML = `
    <div class="translation-placeholder">
      <div class="loader-dots"><span></span><span></span><span></span></div>
      <p>กำลังแปลเป็นภาษาไทย...</p>
    </div>
  `;

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: englishHtml,
        source: 'en',
        target: 'th',
        isHtml: true
      })
    });

    const data = await response.json();
    if (data.translatedText) {
      introductionTextTh.innerHTML = data.translatedText;
      introductionTextTh.dataset.translatedFor = currentSura;
    } else {
      throw new Error('Translation failed');
    }
  } catch (err) {
    introductionTextTh.innerHTML = `
      <div class="translation-placeholder" style="color: #f87171;">
        <p>⚠️ ไม่สามารถแปลภาษาไทยได้ในขณะนี้: ${err.message}</p>
        <button class="fetch-btn" style="margin-top: 10px; padding: 6px 12px; font-size: 0.8rem;" onclick="translateToThai()">ลองอีกครั้ง</button>
      </div>
    `;
  }
}
SURAS.forEach(sura => {
  const opt = document.createElement('option');
  opt.value = sura.num;
  opt.textContent = `${sura.num}. ${sura.name}`;
  suraSelect.appendChild(opt);
});

// ─────────────────────────────────────────────
//  Enable button when a sura is selected
// ─────────────────────────────────────────────
suraSelect.addEventListener('change', () => {
  fetchBtn.disabled = !suraSelect.value;
});

// ─────────────────────────────────────────────
//  Show / hide state panels
// ─────────────────────────────────────────────
function showState(state) {
  placeholderState.hidden = state !== 'placeholder';
  loadingState.hidden = state !== 'loading';
  errorState.hidden = state !== 'error';
  contentArea.hidden = state !== 'content';
}

// ─────────────────────────────────────────────
//  Fetch page HTML via Proxy (with fallback)
// ─────────────────────────────────────────────
async function fetchPage(dorarUrl) {
  // 1. Try Local Proxy first if on localhost
  if (isLocalhost) {
    try {
      const res = await fetch(LOCAL_PROXY + encodeURIComponent(dorarUrl), { signal: AbortSignal.timeout(5000) });
      if (res.ok) return await res.text();
    } catch (e) {
      console.warn('Local proxy failed, trying public ones...');
    }
  }

  // 2. Try Public Proxies sequentially
  let lastError = null;
  for (const proxyBase of PUBLIC_PROXIES) {
    try {
      const proxyUrl = proxyBase + (proxyBase.includes('allorigins') ? encodeURIComponent(dorarUrl) : dorarUrl);
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
      if (res.ok) return await res.text();

      const errorData = await res.json().catch(() => ({}));
      lastError = errorData.error || `Proxy Error: ${res.status}`;
    } catch (e) {
      lastError = e.message;
      console.error(`Proxy ${proxyBase} failed:`, e);
    }
  }

  throw new Error(lastError || 'All proxy attempts failed. Check your internet or try again later.');
}

// ─────────────────────────────────────────────
//  Extract "Intro-Summary of Sura" — returns raw innerHTML
//
//  Real dorar.net HTML structure:
//  <p class="card-text">
//    <span style="font-weight:bold;"><span style="color:rgb(153,0,0);">Heading</span><br></span>
//    <b>Term:</b> <span class="tip">[n] footnote text</span> <br>
//    body text <span style="color:rgb(0,204,204);">"quote"</span>
//    <div><span class="aaya" style="color:rgb(0,153,0);">Quran verse</span></div>
//    ...
//  </p>
// ─────────────────────────────────────────────
function extractIntroduction(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Find the primary starting point
  const firstP = doc.querySelector('p.card-text');

  if (firstP) {
    // Because the source HTML has <div> inside <p>, the parser auto-closes the <p>
    // We must collect the <p> and all its subsequent siblings until we hit the footer/hr
    const container = doc.createElement('div');
    let current = firstP;

    while (current) {
      // Stop markers: The HR before the next/prev buttons, or the buttons container itself
      if (current.tagName === 'HR' && current.nextElementSibling?.classList.contains('d-flex')) break;
      if (current.classList?.contains('d-flex') && current.classList?.contains('justify-content-between')) break;

      // Don't include empty text nodes or comments at the end
      container.appendChild(current.cloneNode(true));
      current = current.nextSibling;
    }

    if (container.textContent.trim().length > 100) {
      return sanitizeAndAdaptHtml(container);
    }
  }

  // Fallback for different page structures
  for (const el of doc.querySelectorAll('h6, h5, h4, strong')) {
    if (el.textContent.trim().toLowerCase().includes('intro-Summary of sura')) {
      let parent = el.parentElement;
      for (let d = 0; d < 8 && parent; d++, parent = parent.parentElement) {
        const ct = parent.querySelector('p.card-text');
        if (ct) {
          // Re-apply the sibling collection logic from this point
          const container = doc.createElement('div');
          let current = ct;
          while (current && current.tagName !== 'HR') {
            container.appendChild(current.cloneNode(true));
            current = current.nextSibling;
          }
          return sanitizeAndAdaptHtml(container);
        }
      }
    }
  }

  throw new Error(
    'Could not extract the Intro-Summary of Sura section.\n' +
    'Please make sure the local proxy server (server.js) is running.'
  );
}

// ─────────────────────────────────────────────
//  Sanitize & adapt the extracted HTML element:
//  - Remove dangerous tags (script, iframe, style, link, object)
//  - Remove all external href/src attributes
//  - Convert dorar.net inline color styles → CSS classes
//    so they render nicely on our dark theme
//  - Keep bold, italic, <br>, <b>, inline structure
//  - Wrap <span class="tip"> footnotes nicely
// ─────────────────────────────────────────────
function sanitizeAndAdaptHtml(element) {
  // Work on a clone so we don't mutate the parsed doc
  const clone = element.cloneNode(true);

  // Remove dangerous tags entirely
  ['script', 'iframe', 'object', 'embed', 'form', 'input',
    'button', 'link', 'meta', 'style', 'noscript'].forEach(tag => {
      clone.querySelectorAll(tag).forEach(el => el.remove());
    });

  // Remove event handlers and dangerous attributes from every element
  clone.querySelectorAll('*').forEach(el => {
    // Remove event-handler attributes
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
    });
    // Remove href/src/action that point externally
    ['href', 'src', 'action', 'data', 'formaction'].forEach(a => {
      el.removeAttribute(a);
    });
  });

  // ── Remap inline color styles → semantic CSS classes ──
  clone.querySelectorAll('[style]').forEach(el => {
    const style = el.getAttribute('style') || '';

    // rgb(153, 0, 0)  → dark red  → labels / headings
    if (/rgb\(\s*153\s*,\s*0\s*,\s*0\s*\)/.test(style)) {
      el.classList.add('di-label');
    }
    // rgb(0, 204, 204) → cyan → hadith quotes
    if (/rgb\(\s*0\s*,\s*204\s*,\s*204\s*\)/.test(style)) {
      el.classList.add('di-quote');
    }
    // rgb(0, 153, 0)  → green → Quran verses
    if (/rgb\(\s*0\s*,\s*153\s*,\s*0\s*\)/.test(style)) {
      el.classList.add('di-verse');
    }
    // rgb(0, 204, 0) or rgb(0, 255, 0) → also verse
    if (/rgb\(\s*0\s*,\s*(204|255)\s*,\s*0\s*\)/.test(style)) {
      el.classList.add('di-verse');
    }

    // Keep only font-weight and font-size from style (safe CSS)
    const keepParts = [];
    const weightMatch = style.match(/font-weight\s*:\s*[^;]+/);
    if (weightMatch) keepParts.push(weightMatch[0]);
    const sizeMatch = style.match(/font-size\s*:\s*[^;]+/);
    if (sizeMatch) keepParts.push(sizeMatch[0]);

    if (keepParts.length > 0) {
      el.setAttribute('style', keepParts.join('; '));
    } else {
      el.removeAttribute('style');
    }
  });

  // ── Style footnote <span class="tip"> ──
  clone.querySelectorAll('span.tip').forEach(tip => {
    const fullText = tip.textContent.trim();
    // Extract only the number [n] from "[n] Tafsir..."
    const match = fullText.match(/\[(\d+)\]/);
    const num = match ? match[1] : '?';

    tip.textContent = num; // Show only the number
    tip.classList.add('di-footnote');
    tip.setAttribute('data-tip', fullText); // Store full text for popup
    tip.removeAttribute('style');
  });

  // ── Style Quran verse spans ──
  clone.querySelectorAll('span.aaya').forEach(v => {
    v.classList.add('di-verse');
    v.removeAttribute('style');
  });
  clone.querySelectorAll('span.ref').forEach(r => {
    r.removeAttribute('style');
  });

  // Clean up excessive whitespace in text nodes but keep line-breaking structure
  (function collapseWhitespace(node) {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        // Keep some spacing if it's intentional, otherwise collapse
        const content = child.textContent;
        if (content.trim() === "" && content.includes("\n")) {
          // Keep as is if it's a structural newline
        } else {
          child.textContent = content.replace(/[ \t]{2,}/g, ' ').replace(/\u00a0/g, ' ');
        }
      } else {
        collapseWhitespace(child);
      }
    }
  })(clone);

  return clone.innerHTML.trim();
}

// Plain-text version of the content for copy functionality
function getPlainText(htmlStr) {
  const tmp = document.createElement('div');
  tmp.innerHTML = htmlStr;
  // Replace <br> with newline
  tmp.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
  tmp.querySelectorAll('div').forEach(d => d.insertAdjacentText('afterend', '\n'));
  return tmp.textContent
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─────────────────────────────────────────────
//  Main fetch and display handler
// ─────────────────────────────────────────────
let currentSuraNum = null;

async function loadIntroduction() {
  const num = parseInt(suraSelect.value, 10);
  if (!num) return;

  const sura = SURAS[num - 1];
  currentSuraNum = num;

  const selectedSourceKey = sourceSelect.value || 'dorar';
  const config = SOURCE_CONFIG[selectedSourceKey];
  const url = config.urlTemplate(sura);

  showState('loading');
  fetchBtn.disabled = true;

  try {
    let intro = '';
    let finalSourceUrl = url;

    if (config.isApi) {
      const data = await fetchApi(url);
      intro = data.chapter_info ? data.chapter_info.text : '';
      if (!intro) throw new Error('Could not find introduction text in API response.');
      finalSourceUrl = config.webUrl ? config.webUrl(sura) : url;
      // Wrap in a div to match extraction logic expectations if needed
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = intro;
      intro = sanitizeAndAdaptHtml(tempDiv);
    } else {
      const html = await fetchPage(url);
      intro = extractIntroduction(html);
    }

    // Populate content — render as HTML to preserve full formatting
    contentBadge.textContent = sura.num;
    contentName.textContent = sura.name;
    contentArabic.textContent = sura.arabic;

    // Reset Tabs and Content
    introductionTextEn.innerHTML = intro;
    introductionTextEn.classList.remove('active');
    introductionTextTh.innerHTML = '';
    introductionTextTh.classList.add('active');
    introductionTextTh.dataset.translatedFor = ''; // Reset cache

    tabBtns.forEach(b => b.classList.remove('active'));
    tabBtns[0].classList.add('active'); // Set Thai as active tab

    sourceLink.href = finalSourceUrl;
    sourceLink.title = config.label;
    sourceLink.setAttribute('aria-label', config.label);

    // Update footer link
    const footerSpan = document.querySelector('.content-footer span');
    if (footerSpan) {
      footerSpan.innerHTML = `${config.footerPrefix}: <a href="${config.footerUrl}" target="_blank" rel="noopener noreferrer">${config.name}</a>`;
    }

    showState('content');
    contentArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Trigger translation immediately
    translateToThai();

  } catch (err) {
    console.error('Error:', err);
    errorText.textContent = err.message || 'Unable to fetch the introduction. Please try again.';
    showState('error');
  } finally {
    fetchBtn.disabled = false;
  }
}

async function fetchApi(apiUrl) {
  // Use proxies for API too if needed, or just direct fetch if it has CORS
  // Quran.com API usually has CORS, but let's be safe.
  try {
    const res = await fetch(apiUrl);
    if (res.ok) return await res.json();
    throw new Error(`API Error: ${res.status}`);
  } catch (e) {
    // If direct fetch fails, try proxies
    const text = await fetchPage(apiUrl);
    return JSON.parse(text);
  }
}

// ─────────────────────────────────────────────
//  Event Listeners
// ─────────────────────────────────────────────
fetchBtn.addEventListener('click', loadIntroduction);

retryBtn.addEventListener('click', () => {
  if (currentSuraNum) {
    suraSelect.value = currentSuraNum;
    loadIntroduction();
  }
});

suraSelect.addEventListener('keydown', e => {
  if (e.key === 'Enter' && suraSelect.value) loadIntroduction();
});

// Copy button
copyBtn.addEventListener('click', async () => {
  const sura = SURAS[parseInt(suraSelect.value, 10) - 1];

  // Get content from the currently active tab
  const activeIntro = document.querySelector('.introduction-text.active');
  const plainBody = getPlainText(activeIntro.innerHTML);

  const selectedSourceKey = sourceSelect.value || 'dorar';
  const config = SOURCE_CONFIG[selectedSourceKey];
  const finalUrl = config.webUrl ? config.webUrl(sura) : config.urlTemplate(sura);

  const fullText = [
    `${sura.name} — ${config.name}`,
    `${sura.arabic}`,
    '',
    plainBody,
    '',
    `Source: ${finalUrl}`,
  ].join('\n');

  try {
    await navigator.clipboard.writeText(fullText);
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>`;
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>`;
    }, 2000);
  } catch (_) {
    // Fallback: select text
    const range = document.createRange();
    range.selectNode(activeIntro);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
});
