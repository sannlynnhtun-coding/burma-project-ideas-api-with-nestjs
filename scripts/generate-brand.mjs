import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = fileURLToPath(new URL('../', import.meta.url));
const assets = resolve(root, 'public/assets');
const master = await readFile(resolve(assets, 'brand-mark.svg'), 'utf8');
const geometry = master.match(/<path id="brand-geometry" d="([^"]+)"/)[1];
const mark = (color = '#fafafa') => `<path d="${geometry}" fill="${color}" stroke="none"/>`;
const svg = (body, width = 64, height = width) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${body}</svg>\n`;
const png = (source, width) => new Resvg(source, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true } }).render().asPng();
const save = (name, body) => writeFile(resolve(assets, name), body);

await save('brand-logo.svg', svg(`<title>Burma Project Ideas</title><style>:root{color:#171717}@media(prefers-color-scheme:dark){:root{color:#fafafa}}</style>${mark('currentColor')}`));
await save('brand-mark-on-dark.svg', svg(`<title>Burma Project Ideas</title>${mark()}`));
await save('brand-mark.png', png(master, 1024));
await save('brand-mark-on-dark.png', png(svg(mark()), 1024));
for (const size of [16, 32, 48, 64, 128, 256]) await save(`favicon-${size}.png`, png(svg(`<rect width="64" height="64" rx="12" fill="#171717"/>${mark()}`), size));
await save('apple-touch-icon.png', png(svg(`<rect width="64" height="64" fill="#171717"/>${mark()}`), 180));
for (const size of [192, 512]) {
  const source = svg(`<rect width="64" height="64" fill="#171717"/>${mark()}`);
  await save(`icon-${size}.png`, png(source, size));
  await save(`icon-maskable-${size}.png`, png(source, size));
}

// ICO directory entries embed the same generated PNGs at 16, 32, and 48 pixels.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => readFile(resolve(assets, `favicon-${size}.png`))));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((data, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
await writeFile(resolve(root, 'public/favicon.ico'), Buffer.concat([header, ...images]));

const social = svg(`<rect width="1200" height="630" fill="#0f0f0f"/><rect x="40" y="40" width="1120" height="550" rx="12" fill="none" stroke="#303030"/><g transform="translate(80 174) scale(3.7)">${mark()}</g><g font-family="Arial, sans-serif" fill="#fafafa"><text x="410" y="216" font-size="58" font-weight="700" letter-spacing="-2">Burma Project</text><text x="410" y="282" font-size="58" font-weight="700" letter-spacing="-2">Ideas API</text><text x="410" y="356" font-size="25" fill="#b5b5b5">Myanmar data. Ready to build with.</text><text x="410" y="410" font-size="22" font-family="Myanmar Text, Noto Sans Myanmar, sans-serif" fill="#b5b5b5" lang="my">မြန်မာဒေတာများဖြင့် စတင်ဖန်တီးပါ။</text><text x="410" y="490" font-size="18" fill="#b5b5b5">burma-project-ideas.vercel.app</text></g>`, 1200, 630);
await save('social-card.svg', social);
await save('social-card.png', png(social, 1200));

const symbol = `<symbol id="i-brand" viewBox="0 0 64 64">${mark('currentColor')}</symbol>`;
const htmlPath = resolve(root, 'public/index.html');
const html = await readFile(htmlPath, 'utf8');
await writeFile(htmlPath, html.replace(/<symbol id="i-brand"[\s\S]*?<\/symbol>/, symbol));
const spritePath = resolve(assets, 'landing-icons.svg');
const sprite = await readFile(spritePath, 'utf8');
await writeFile(spritePath, sprite.replace(/<symbol id="logo-mark"[\s\S]*?<\/symbol>/, symbol.replace('i-brand', 'logo-mark')));

// Review artwork shows the exact generated mark on both theme surfaces and at small sizes.
const swatches = ['#f5f5f5', '#0f0f0f'].map((background, i) => {
  const ink = i ? '#fafafa' : '#171717';
  return `<g transform="translate(${i * 480} 0)"><rect width="480" height="480" fill="${background}"/><g transform="translate(136 48) scale(3.25)">${mark(ink)}</g><text x="48" y="320" font-family="Arial, sans-serif" font-size="20" fill="${ink}">Burma Project Ideas</text>${[16,24,32,48].map((size,j)=>`<g transform="translate(${48+j*96} 370) scale(${size/64})">${mark(ink)}</g><text x="${48+j*96}" y="442" font-family="Arial, sans-serif" font-size="13" fill="${ink}">${size}px</text>`).join('')}</g>`;
}).join('');
await mkdir(resolve(root, 'design'), { recursive: true });
await writeFile(resolve(root, 'design/brand-preview.png'), png(svg(swatches, 960, 480), 960));
console.log('Generated transparent master exports, favicons, app icons, social card, sprites, and brand preview.');
