import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const csvPath = process.argv[2] || join(dir, '006_webviewer.csv');
const csv = readFileSync(csvPath, 'utf8').replace(/<\/script/gi, '<\\/script');
const template = readFileSync(join(dir, 'viewer.source.html'), 'utf8');
if (!template.includes('___EMBEDDED_CSV___')) {
  throw new Error('viewer.source.html is missing the ___EMBEDDED_CSV___ placeholder.');
}
const html = template.replace('___EMBEDDED_CSV___', csv.trim());
writeFileSync(join(dir, 'index.html'), html);
console.log(`Wrote index.html (${html.length} bytes) from ${csvPath}`);
