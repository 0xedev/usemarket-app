# usemarket search and answer-engine visibility

Implementation and baseline: 13 November 2026. Operator: USEMARKET LTD.
Canonical website: https://usemarket.store/.

## Goal and honest success criteria

Make the official usemarket website the strongest navigational result for searches about this Nigerian brand. Separately grow qualified discovery for food and grocery delivery, vendor onboarding and rider opportunities in the supported cities. Rankings, indexing, AI citations and recommendations belong to the search or answer provider; no implementation guarantees first place. An assistant answering from a model's stored knowledge cannot be made current by deploying a website.

Use two separate scorecards: branded navigational discovery (usemarket, use market Nigeria, usemarket app) and relevant non-branded local searches. Being the first brand result does not imply first place for every grocery delivery query.

## Baseline evidence

- The live root, robots.txt and sitemap.xml returned HTTP 200 before this change. A missing path returned HTTP 404, rather than a soft 404.
- The sitemap contained five URLs: the homepage and four legal pages. There were no company, delivery coverage, support, ordering or FAQ pages.
- Both https://www.usemarket.store/ and https://usemarket.store/ returned HTTP 200 with the apex canonical. The www host lacked a redirect.
- The homepage already had server-rendered copy, index/follow robots metadata and OG image metadata from the previous fix.
- Public web search surfaced a www result containing the older launch/waitlist copy. Search-engine excerpts can be stale. This is a retrieval snapshot, not a verified Google Nigeria ranking or a Search Console indexing report.
- Public search also returned other similarly named brands. Clear company identity, location, app links and consistent third-party profiles matter for disambiguation.
- Search Console access and Google ranking/traffic data were unavailable in this session. No claim is made that Google has fetched or indexed this release.

## Work implemented

### Crawlable content and navigation

Seven purpose-specific information pages, plus an HTML sitemap, now complement the homepage and legal pages:

| URL | Visitor need |
| --- | --- |
| /about | Identify usemarket, its operator and official contact details |
| /how-it-works | Follow app or WhatsApp ordering steps |
| /delivery-areas | Understand Ibadan, Akure and Sango Ota coverage and address checks |
| /vendors | Find the vendor app and understand onboarding and catalogue responsibilities |
| /riders | Find the rider app and understand onboarding and delivery offers |
| /faq | Get ten direct answers to common questions |
| /contact | Find customer, vendor, rider and legal support routes |
| /sitemap | Navigate all public website pages |

The pages are linked from the homepage footer, linked to related guides and rendered as HTML on the server. Important facts do not depend on canvas, animation, hydration or hidden text. City coverage is explained on one substantive page; no duplicate city doorway pages were manufactured. No unverified vendor counts, reviews, ratings, opening hours, delivery promises or income claims were introduced.

### Metadata and entity identity

- Brand-led homepage title with a clear service category.
- Unique titles, descriptions, self-canonical URLs and OG URLs for new pages.
- Shared absolute image URLs and large-image social cards, including legal pages that previously overrode inherited social metadata without an image.
- Organization data uses the public brand name usemarket, legalName USEMARKET LTD, the business address, support email and three service cities.
- WebSite and page entities reference stable identifiers. Information pages include breadcrumbs. FAQ questions and answers are generated from the same content as the visible FAQ.
- Three MobileApplication entities link to the actual app destinations already used by the site. No price or rating was invented to pursue a rich result.
- FAQ markup describes the page; it is not a promise of a Google FAQ rich result.

### Sitemap and routing

- XML sitemap now lists 13 unique canonical HTTPS URLs.
- Last-modified dates are editorial dates for pages materially changed in this release, not a new timestamp generated on every request. Legal pages retain no fabricated last-modified value.
- robots.txt continues to allow public pages for all compliant crawlers and excludes /api/. The wildcard also covers OAI-SearchBot, Claude-SearchBot and Bingbot; no extra bot group is needed. Training access policy was not changed.
- The application redirects www to the apex with HTTP 301, preserving path and query. Preview hosts remain usable. Live verification is needed because a CDN or proxy can handle a hostname before application code runs.
- HTTP requests may still be redirected to HTTPS by the hosting edge before reaching the Worker. An application change does not reconfigure edge rules.

## Validation and limits

The production Worker build and 13 test cases check server-rendered content, 13 sitemap URLs, unique titles, canonical and social metadata, app URLs, matching FAQ answers, breadcrumb destinations, local links/assets, robots rules, redirect behavior and genuine 404s. Browser QA checks representative page appearance. A crawler user-agent test verifies this test client's access; it cannot prove access from a provider's verified crawler IP or rule out every WAF restriction.

No field Core Web Vitals or Google ranking baseline is available without Search Console/CrUX data. A build's large JavaScript chunk warning remains for the existing dynamically loaded three.js scene. Content and information pages must remain understandable without that scene. Do not treat a generic technical score as a ranking prediction.

## Account-dependent actions: next priority

These have NOT been submitted or verified by this implementation.

1. Open Google Search Console with the account that owns usemarket.store. Prefer a Domain property so www and apex are measured together. Complete DNS verification only if ownership is not already verified; use the exact record Google supplies.
2. Submit https://usemarket.store/sitemap.xml under Sitemaps. Record its status and discovered URL count.
3. Inspect the homepage, /about, /delivery-areas and /how-it-works. Run Test live URL, review rendered HTML/canonical/crawl access and request indexing where appropriate. Request indexing once after significant edits; repeated submissions do not guarantee faster indexing.
4. Inspect an indexed www URL and confirm the redirect and Google's selected canonical after recrawling. Keep Search Console evidence of any mismatch.
5. Read Page indexing and Crawl stats. Investigate exclusions by reason, not by blindly adding more pages. Test any blocked bot using verified crawler identity and security logs before changing WAF rules. Do not disable security site-wide.
6. Verify Bing Webmaster Tools and submit the same canonical sitemap. Use its indexing/URL tools if available. IndexNow is an optional later integration after verified host ownership and supported-engine requirements are understood; it does not submit to Google.
7. Configure a measured conversion baseline if an approved analytics property exists: Google Play clicks by app role, WhatsApp ordering clicks and support clicks. Do not insert a guessed analytics ID or transmit personal order details.

## Brand authority and local discovery

- Review the three Google Play listings. Use the same brand spelling, operator name, support email and https://usemarket.store/ website. Link the vendor/rider listings to their relevant guides where the store permits it.
- Update verified company social profiles to the canonical domain and current service description. Add sameAs only for confirmed company profiles; do not attach a founder's personal profile or a similarly named business by guesswork.
- Check eligibility for a Google Business Profile before creating one. Use real, eligible staffed premises or compliant service-area arrangements; do not invent branches in Akure or Ota, publish a private address as a storefront, or claim walk-in hours without evidence.
- Ask actual partner vendors to link to their official usemarket onboarding or shopping destination where useful to customers. Outreach requires separate explicit authorization; no messages have been sent.
- Publish earned news about real launches or partnerships with original details. Avoid paid link schemes, fabricated press mentions and mass-generated comparison articles.

## Useful content backlog, ordered by evidence available

1. Add real coverage boundaries or a supported address checker when the production API and city teams can supply approved zones. Keep exact address availability authoritative in the app.
2. Publish original ordering walkthroughs with current app screenshots and dates. Customer experience and support teams should verify the steps.
3. Add approved, specific vendor stories: actual shop, location, products, permission and measurable outcomes. Do not manufacture testimonials.
4. Add category guides based on real vendor availability and customer questions. Prioritize useful details over repeating delivery keywords.
5. Create individual city pages only when each can provide distinct, verified local shops, coverage, delivery guidance and original photographs or reporting. Avoid copying one page with a city-name substitution.
6. Recheck FAQ answers when fees, rollout, onboarding or app behavior changes. Dates should reflect real editorial review.

## 90-day measurement plan

| Timing | Work | Evidence / target |
| --- | --- | --- |
| First week | Verify Search Console/Bing; submit sitemap; inspect key URLs | Ownership and submission status recorded; critical pages fetchable; canonical and redirect checked |
| Weeks 2–4 | Review indexing and branded queries weekly; correct real exclusions; align official profiles | Indexed canonical page count, impressions, clicks, CTR and query position trend; no invented ranking baseline |
| Weeks 4–8 | Publish original content from actual customer/vendor questions; earn relevant local references | Qualified non-branded impressions and app/WhatsApp click-through; real referring sites |
| Weeks 8–12 | Compare 28-day periods; improve pages with impressions but weak usefulness or CTR | Branded top-result progress, query clusters, organic conversions and useful AI citations |

For branded rank checks, record the exact query, date, country, device and method. Search results vary; a single personalized screenshot is not a universal rank. For AI checks, use a stable set of prompts (for example “What is usemarket in Nigeria?”, “Where does usemarket deliver?” and “How can I become a usemarket vendor?”), record whether browsing was enabled, capture cited URLs, verify answer accuracy and measure changes over time. Do not score success only by whether an assistant says “number one.”

## Sources and implementation boundaries

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google AI search guidance: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots
- Anthropic crawler documentation: https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

AI discovery depends on crawl access, useful attributable content, provider indexes and external evidence. There is no special schema that commands agents to recommend a business, and no such instructions were added. Google does not require an llms.txt file; this release prioritizes useful HTML, structured facts and ordinary crawlable links.
