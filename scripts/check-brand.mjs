import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(resolve(root, name));
const master = (await read('public/assets/brand-mark.svg')).toString();
const geometry = master.match(/<path id="brand-geometry" d="([^"]+)"/)[1];
assert.ok(!master.includes('<rect'), 'Master must have a transparent background');
const raw = new Resvg(master, { fitTo: { mode: 'width', value: 64 } }).render();
assert.equal(raw.pixels[3], 0, 'Master corner must be transparent');
assert.equal(raw.pixels[(32 * 64 + 32) * 4 + 3], 255, 'Data diamond must be visible');

for (const size of [16,32,48,64,128,256]) {
  const data = await read(`public/assets/favicon-${size}.png`);
  assert.equal(data.readUInt32BE(16), size); assert.equal(data.readUInt32BE(20), size);
}
for (const [name, size] of [['brand-mark.png',1024],['brand-mark-on-dark.png',1024],['apple-touch-icon.png',180],['icon-192.png',192],['icon-512.png',512],['icon-maskable-192.png',192],['icon-maskable-512.png',512]]) {
  const data = await read('public/assets/'+name);
  assert.equal(data.readUInt32BE(16), size); assert.equal(data.readUInt32BE(20), size);
}
const ico = await read('public/favicon.ico');
assert.equal(ico.readUInt16LE(2), 1); assert.equal(ico.readUInt16LE(4), 3);
for (let i=0;i<3;i++) assert.equal(ico[6+i*16], [16,32,48][i]);
const card=await read('public/assets/social-card.png');
assert.equal(card.readUInt32BE(16),1200);assert.equal(card.readUInt32BE(20),630);
for (const file of ['public/index.html','public/assets/brand-logo.svg','public/assets/brand-mark-on-dark.svg','public/assets/social-card.svg','public/assets/landing-icons.svg']) {
  const content=(await read(file)).toString();assert.ok(content.includes(geometry),file+' must use master geometry');
  assert.ok(!content.includes('#43d3ff'),file+' must not use obsolete cyan branding');
}
const html=(await read('public/index.html')).toString();
assert.ok(!html.includes('m12 2 9 5-9 5-9-5 9-5Z'), 'Old stacked header mark remains');
assert.ok(html.includes('https://burma-project-ideas.vercel.app/assets/social-card.png'));
const manifest=JSON.parse((await read('public/site.webmanifest')).toString());
assert.equal(manifest.theme_color,'#0f0f0f');
assert.equal(manifest.icons.filter(i=>i.purpose==='maskable').length,2);
for(const icon of manifest.icons)await read('public'+icon.src.split('?')[0]);
// Every nontransparent master pixel fits the standard central 80% maskable safe circle.
for(let y=0;y<64;y++)for(let x=0;x<64;x++)if(raw.pixels[(y*64+x)*4+3]>128)assert.ok(Math.hypot(x+.5-32,y+.5-32)<=25.6);
console.log('Brand checks passed: shared geometry, transparency, icon dimensions, ICO entries, maskable safe area, metadata, and obsolete branding.');
