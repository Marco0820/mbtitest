import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from '@vitalets/google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enFilePath = path.join(__dirname, 'messages', 'en.json');
const langFilePath = process.argv[2];

if (!langFilePath) {
    console.error('Please provide a language file path to translate.');
    process.exit(1);
}

// Extract language code from file name, e.g., 'zh-CN' from 'messages/zh-CN.json'
const langCodeMatch = langFilePath.match(/([a-z]{2}(-[A-Z]{2})?)\.json$/);
if (!langCodeMatch) {
    console.error(`Could not extract language code from ${langFilePath}`);
    process.exit(1);
}
const toLang = langCodeMatch[1];

const targetFilePath = path.join(__dirname, langFilePath);

const enFile = fs.readFileSync(enFilePath, 'utf8');
const langFile = fs.readFileSync(targetFilePath, 'utf8');

const enObj = JSON.parse(enFile);
const langObj = JSON.parse(langFile);

// Simple delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateObject(en, lang, to) {
    let changes = 0;
    for (const key in en) {
        if (Object.prototype.hasOwnProperty.call(en, key)) {
            const enValue = en[key];
            const langValue = lang[key];

            if (typeof enValue === 'string') {
                // If langValue is the same as enValue, it needs translation.
                if (enValue === langValue) {
                    try {
                        console.log(`Translating "${enValue}" to ${to}...`);
                        const { text } = await translate(enValue, { to: to });
                        lang[key] = text;
                        changes++;
                        await delay(200); // Wait 200ms to avoid rate limiting
                    } catch (err) {
                        console.error(`Could not translate "${enValue}". Error: ${err.message}`);
                    }
                }
            } else if (typeof enValue === 'object' && enValue !== null && !Array.isArray(enValue)) {
                if (typeof langValue === 'object' && langValue !== null && !Array.isArray(langValue)) {
                    changes += await translateObject(enValue, langValue, to);
                }
            }
        }
    }
    return changes;
}

console.log(`Starting translation for ${langFilePath} to language "${toLang}"...`);

translateObject(enObj, langObj, toLang).then(changes => {
    if (changes > 0) {
        fs.writeFileSync(targetFilePath, JSON.stringify(langObj, null, 2) + '\n');
        console.log(`\nFinished translating ${langFilePath}. ${changes} values were updated.`);
    } else {
        console.log(`\nNo values needed translation in ${langFilePath}.`);
    }
}).catch(err => {
    console.error(`An error occurred during translation process: ${err}`);
}); 