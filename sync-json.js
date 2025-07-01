import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enFilePath = path.join(__dirname, 'messages', 'en.json');
const langFilePath = process.argv[2];

if (!langFilePath) {
    console.error('Please provide a language file path to sync.');
    process.exit(1);
}

const targetFilePath = path.join(__dirname, langFilePath)

const enFile = fs.readFileSync(enFilePath, 'utf8');
const langFile = fs.readFileSync(targetFilePath, 'utf8');

const enObj = JSON.parse(enFile);
const langObj = JSON.parse(langFile);

function sync(en, lang) {
  for (const key in en) {
    if (Object.prototype.hasOwnProperty.call(en, key)) {
      const enValue = en[key];
      const langValue = lang[key];

      if (!Object.prototype.hasOwnProperty.call(lang, key)) {
        lang[key] = enValue;
      } else if (typeof enValue === 'object' && enValue !== null && !Array.isArray(enValue)) {
        // also check if langValue is object. if not, overwrite it.
        if (typeof langValue === 'object' && langValue !== null && !Array.isArray(langValue)) {
            sync(enValue, langValue);
        } else {
            lang[key] = enValue;
        }
      }
    }
  }
  return lang;
}

const syncedLangObj = sync(enObj, langObj);

fs.writeFileSync(targetFilePath, JSON.stringify(syncedLangObj, null, 2) + '\n');
console.log(`${langFilePath} has been synced with messages/en.json`); 