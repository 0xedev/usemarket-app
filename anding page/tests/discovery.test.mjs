import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, access } from 'node:fs/promises';
import { default as worker } from '../dist/server/index.js';

const origin = 'https://usemarket.store';
const env = { ASSETS: { fetch: async () => new Response('Not found', {status:404}) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const request = (path) => worker.fetch(new Request(new URL(path, origin)), env, ctx);
const scripts = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => {
  const data = JSON.parse(m[1]); return data['@graph'] ?? [data];
});
const meta = (html, key) => [...html.matchAll(/<meta\s+[^>]*>/g)].map(m=>m[0]).find(tag=>tag.includes(`="${key}"`));

let paths;
let pages;
test.before(async () => {
  const res = await request('/sitemap.xml');
  assert.equal(res.status,200);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(urls.length,13);
  assert.ok(urls.every(url=>url.startsWith(origin+'/') && !url.includes('?')));
  paths = urls.map(u=>new URL(u).pathname);
  pages = new Map(await Promise.all(paths.map(async path=>{
    const response = await request(path);
    assert.equal(response.status,200,path);
    assert.match(response.headers.get('content-type'),/^text\/html/i);
    return [path,await response.text()];
  })));
});

test('all sitemap pages render useful HTML, unique titles, canonical URLs and share images', () => {
  const titles = [];
  for(const [path,html] of pages) {
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `canonical: ${path}`);
    assert.match(html,/<h1[\s>]/, `heading: ${path}`);
    assert.doesNotMatch(meta(html,'robots')??'',/noindex/,path);
    assert.ok(meta(html,'og:image')?.includes(`${origin}/usemarket-hero.png`), `image: ${path}`);
    assert.ok(meta(html,'twitter:card')?.includes('summary_large_image'),`card: ${path}`);
    if(!path.startsWith('/terms')) {
      assert.ok(meta(html,'og:url')?.includes(`content="${origin}${path}"`), `og:url: ${path}`);
    }
    titles.push(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  }
  assert.equal(new Set(titles).size,titles.length,'page titles must be distinct');
});

test('new discovery pages are linked from the homepage and HTML sitemap', () => {
  for (const path of paths.filter(p=>p!=='/')) {
    if(!path.startsWith('/terms/')) assert.ok(pages.get('/').includes(`href="${path}"`),`home: ${path}`);
    if(path!=='/sitemap') assert.ok(pages.get('/sitemap').includes(`href="${path}"`),`directory: ${path}`);
  }
});

test('structured entity data identifies the company, service cities and real Android app destinations', () => {
  const data = scripts(pages.get('/'));
  const org = data.find(x=>x['@type']==='Organization');
  assert.equal(org.name,'usemarket');
  assert.equal(org.legalName,'USEMARKET LTD');
  assert.equal(org.email,'support@usemarket.store');
  assert.deepEqual(org.areaServed.map(x=>x.name),['Ibadan','Akure','Sango Ota']);
  const apps = data.filter(x=>x['@type']==='MobileApplication');
  assert.equal(apps.length,3);
  for(const app of apps) {
    assert.equal(app.operatingSystem,'Android');
    assert.ok(pages.get('/').includes(`href="${app.downloadUrl}"`));
    assert.equal(app.aggregateRating,undefined,'do not invent ratings');
  }
});

test('FAQ answers and breadcrumbs match the visible page', () => {
  const html=pages.get('/faq');
  const data=scripts(html);
  const faq=data.find(x=>x['@type']==='FAQPage');
  assert.equal(faq.mainEntity.length,10);
  const unescape=s=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"');
  const visible=unescape(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' '));
  for(const q of faq.mainEntity) {
    assert.ok(visible.includes(q.name),q.name);
    assert.ok(visible.includes(q.acceptedAnswer.text),q.name);
  }
  for(const path of ['/about','/how-it-works','/delivery-areas','/vendors','/riders','/faq','/contact','/sitemap']) {
    const breadcrumb=scripts(pages.get(path)).find(x=>x['@type']==='BreadcrumbList');
    assert.equal(breadcrumb.itemListElement[1].item,origin+path);
  }
});

test('internal page and static asset links do not produce dead ends', async () => {
  const assets = new Set();
  for(const [path,html] of pages) {
    for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target=m[1];
      if(paths.includes(target)) continue;
      // Built JS/CSS and public image/font assets are served by ASSETS in production.
      if(/\.[a-z0-9]+$/i.test(target)) assets.add(target);
      else assert.fail(`Unlisted internal link ${target} on ${path}`);
    }
  }
  for(const path of assets) await access(new URL('../dist/client'+path,import.meta.url));
  const image=await readFile(new URL('../dist/client/usemarket-hero.png',import.meta.url));
  assert.ok(image.length < 5*1024*1024);
});

test('www consolidation preserves paths and queries without redirecting previews', async () => {
  for(const url of ['https://www.usemarket.store/faq?from=search','http://usemarket.store/faq?from=search']) {
    const res=await worker.fetch(new Request(url),env,ctx);
    assert.equal(res.status,301);
    assert.equal(res.headers.get('location'),origin+'/faq?from=search');
  }
  const preview=await worker.fetch(new Request('https://preview.example/faq'),env,ctx);
  assert.equal(preview.status,200);
  assert.equal(preview.headers.get('location'),null);
  assert.equal((await request('/this-page-does-not-exist')).status,404);
});

test('robots allows public discovery while excluding API routes', async () => {
  const response=await request('/robots.txt');
  const body=await response.text();
  assert.equal(response.status,200);
  assert.match(body,/User-Agent:\s*\*/i);
  assert.match(body,/Allow:\s*\//i);
  assert.doesNotMatch(body,/Disallow:\s*\/\s*$/m);
  assert.match(body,/Disallow:\s*\/api\//i);
  assert.match(body,/Sitemap: https:\/\/usemarket\.store\/sitemap\.xml/);
});
