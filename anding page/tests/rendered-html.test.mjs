import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function fetchSitePath(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://usemarket.store${path}`, {
      headers: { accept: path.endsWith(".xml") ? "application/xml" : "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("offers all three Android apps without a waitlist", async () => {
  const response = await fetchSitePath("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  for (const id of ["usemarket.store","com.usemarket.usemarketvendor","usemarket.rider"]) assert.ok(html.includes('href="https://play.google.com/store/apps/details?id='+id+'"'));
  assert.doesNotMatch(html, /waitlist/i);
  assert.doesNotMatch(html, developmentPreviewMeta);
});

test("serves robots rules that allow indexing and exclude the waitlist API", async () => {
  const response = await fetchSitePath("/robots.txt");
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.match(body, /User-Agent:\s*\*/i);
  assert.match(body, /Allow:\s*\//i);
  assert.match(body, /Disallow:\s*\/api\//i);
  assert.match(body, /Sitemap:\s*https:\/\/usemarket\.store\/sitemap\.xml/i);
});

test("serves a sitemap with every public site page", async () => {
  const response = await fetchSitePath("/sitemap.xml");
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/i);
  for (const url of [
    "https://usemarket.store/",
    "https://usemarket.store/terms",
    "https://usemarket.store/terms/customers",
    "https://usemarket.store/terms/vendors",
    "https://usemarket.store/terms/riders",
  ]) {
    assert.ok(body.includes(url), `sitemap should include ${url}`);
  }
});

test("renders page-specific canonical metadata and organization structured data", async () => {
  const pages = [
    ["/", "https://usemarket.store/"],
    ["/terms", "https://usemarket.store/terms"],
    ["/terms/customers", "https://usemarket.store/terms/customers"],
    ["/terms/vendors", "https://usemarket.store/terms/vendors"],
    ["/terms/riders", "https://usemarket.store/terms/riders"],
  ];

  for (const [path, canonical] of pages) {
    const response = await fetchSitePath(path);
    const html = await response.text();

    assert.equal(response.status, 200, `${path} should render`);
    assert.ok(html.includes(`href="${canonical}"`), `${path} should have its canonical URL`);
    assert.match(html, /name="description"/i, `${path} should have a description`);
  }

  const home = await (await fetchSitePath("/")).text();
  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /https:\/\/usemarket\.store\/#organization/);
});

test("references the supplied usemarket logo and icon assets", async () => {
  const html = await (await fetchSitePath("/")).text();

  for (const path of [
    "/favicon.svg",
    "/favicon.ico",
    "/icon-192.png",
    "/icon-512.png",
    "/usemarket-logo.png",
  ]) {
    assert.ok(html.includes(path), `rendered site should reference ${path}`);
  }
});

test("renders the updated general terms and failed-delivery policy", async () => {
  const response = await fetchSitePath("/terms");
  const html = await response.text();
  const textContent = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  assert.equal(response.status, 200);
  for (const text of [
    "Last updated: 3 November 2026",
    "5. Failed deliveries, redelivery and returns",
    "wait up to 10 minutes",
    "For 5 minutes after that",
    "The fee is 50% of the order's delivery fee",
    "The customer",
    "The vendor",
    "usemarket pays if nobody was at fault",
    "return fees you owe from your usemarket wallet balance",
    "Non-perishable goods",
    "return fees that you, as a vendor, owe from your available order earnings",
    "5.8 Rider pay for failed deliveries and returns",
    "6. Acceptable use",
    "abuse refunds, redelivery or promotions",
    "8. Suspension and termination",
    "return fees owed under section 5",
    "10. Governing law and disputes",
  ]) {
    assert.ok(textContent.includes(text), `general terms should include ${text}`);
  }
});
