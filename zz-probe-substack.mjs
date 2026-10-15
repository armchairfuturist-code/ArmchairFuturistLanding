import { XMLParser } from 'fast-xml-parser';
const r = await fetch('https://armchairfuturist.substack.com/feed', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
});
const text = await r.text();
console.log('feed status:', r.status, 'bytes:', text.length);
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', processEntities: false, htmlEntities: false });
const xml = parser.parse(text);
const items = xml.rss?.channel?.item || [];
const arr = Array.isArray(items) ? items : [items];
console.log('items parsed:', arr.length);
const t = (v) => (typeof v === 'string' ? 'string' : Array.isArray(v) ? 'array(' + v.length + ')' : v === undefined ? 'undefined' : typeof v);
for (const it of arr.slice(0, 6)) {
  let out;
  try { out = String(it.description ?? '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim().slice(0,36); }
  catch (e) { out = 'THREW: ' + e.message; }
  console.log(`  title=${t(it.title)} desc=${t(it.description)} media=${t(it['media:content'])} enc=${t(it.enclosure)} :: ${out}`);
}
const it = arr[0];
console.log('enclosure shape:', JSON.stringify(it.enclosure));
const enc = it.enclosure;
console.log('enc.type:', enc.type, '| enc.url present:', !!enc.url);
console.log('=> imageUrl the route would produce:', (it['media:content']||it['media:thumbnail']||{}).url || (typeof enc==='string'?enc:(enc.url && enc.type?.startsWith('image/') ? enc.url : '')) || '(EMPTY)');
