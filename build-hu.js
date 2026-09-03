#!/usr/bin/env node
/**
 * build-hu.js — renders the Hungarian pages from the Slovak source.
 *
 * The Slovak HTML is the single source of truth for markup; lang/hu.json is
 * the single source of truth for Hungarian copy. This script combines them
 * into real, crawlable URLs:
 *
 *   index.html   ->  hu/index.html      served at /hu
 *   contact.html ->  hu/kapcsolat.html  served at /hu/kapcsolat
 *
 * Previously the Hungarian version existed only as a client-side text swap on
 * ?lang=hu, whose canonical pointed back at the Slovak URL — so Google had no
 * Hungarian page to index at all.
 *
 * Run after editing any Slovak page or lang/hu.json:
 *
 *   node build-hu.js
 *
 * Output is committed; Vercel serves it statically with no build step.
 */

const fs = require("fs");
const path = require("path");

const SITE = "https://www.sidlokomarno.sk";
const t = JSON.parse(fs.readFileSync(path.join(__dirname, "lang/hu.json"), "utf8"));

/** Look up a nested key like "nav.contact"; throws rather than emitting Slovak. */
function tr(key) {
  const val = key.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), t);
  if (typeof val !== "string") throw new Error(`Missing hu translation: ${key}`);
  return val;
}

const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => escText(s).replace(/"/g, "&quot;");

const PAGES = [
  {
    src: "index.html",
    out: "hu/index.html",
    skUrl: `${SITE}/`,
    huUrl: `${SITE}/hu`,
    skPath: "/",
    metaKey: "index",
    links: { "index.html": "/hu", "contact.html": "/hu/kapcsolat" },
  },
  {
    src: "contact.html",
    out: "hu/kapcsolat.html",
    skUrl: `${SITE}/contact`,
    huUrl: `${SITE}/hu/kapcsolat`,
    skPath: "/contact",
    metaKey: "contact",
    links: { "index.html": "/hu", "contact.html": "/hu/kapcsolat", "index.html#homePricing": "/hu#homePricing" },
  },
];

// ---------------------------------------------------------------- transforms

/** Replace the text of every element carrying data-i18n. */
function translateText(html) {
  return html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)((?:[^<>]*?)\sdata-i18n="([^"]+)"(?:[^<>]*?))>([^<]*)<\/\1>/g,
    (_m, tag, attrs, key, _old) => `<${tag}${attrs}>${escText(tr(key))}</${tag}>`
  );
}

/** Replace title/alt/placeholder/value on elements carrying the paired marker. */
function translateAttrs(html) {
  const pairs = [
    ["data-i18n-title", "title"],
    ["data-i18n-alt", "alt"],
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-value", "value"],
  ];
  return html.replace(/<[a-zA-Z][^<>]*>/g, (tag) => {
    for (const [marker, attr] of pairs) {
      const m = tag.match(new RegExp(`${marker}="([^"]+)"`));
      if (!m) continue;
      const value = escAttr(tr(m[1]));
      const re = new RegExp(`(\\s${attr}=")[^"]*(")`);
      tag = re.test(tag) ? tag.replace(re, `$1${value}$2`) : tag.replace(/>$/, ` ${attr}="${value}">`);
    }
    return tag;
  });
}

/**
 * Make every asset path root-absolute.
 * /hu/kapcsolat resolves relative paths against /hu/, so "images/logo.svg"
 * would 404 at /hu/images/logo.svg. Root-absolute paths work at both depths.
 */
function absolutiseAssets(html) {
  return html
    .replace(/(\s(?:src|href)=")(?!https?:|\/|#|mailto:|tel:|javascript:)/g, "$1/")
    .replace(/(\s(?:src|href)=")\/(index\.html|contact\.html)/g, "$1$2"); // links handled separately
}

/** Point internal links at their Hungarian counterparts. */
function rewriteLinks(html, links) {
  return html.replace(/(\shref=")([^"]+)(")/g, (m, a, href, z) => {
    if (/^(https?:|mailto:|tel:|#|\/)/.test(href)) return m;
    const [file, hash] = href.split("#");
    const target = links[href] || links[file];
    if (!target) return m;
    return `${a}${links[href] ? target : target + (hash ? "#" + hash : "")}${z}`;
  });
}

/** Swap the whole head block: language, meta, canonical, hreflang, social. */
function rewriteHead(html, page) {
  const title = tr(`meta.title.${page.metaKey}`);
  const desc = tr(`meta.description.${page.metaKey}`);

  html = html.replace('<html lang="sk" data-static-lang="sk">', '<html lang="hu" data-static-lang="hu">');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escText(title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${escAttr(desc)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${escAttr(title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${escAttr(desc)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(">)/, `$1${escAttr(title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${escAttr(desc)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${page.huUrl}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${page.huUrl}$2`);

  // og:locale flips; the hreflang cluster stays reciprocal with the Slovak page
  html = html.replace('<meta property="og:locale" content="sk_SK">', '<meta property="og:locale" content="hu_HU">');
  html = html.replace(
    '<meta property="og:locale:alternate" content="hu_HU">',
    '<meta property="og:locale:alternate" content="sk_SK">'
  );
  return html;
}

/** The flag in the nav points back to the Slovak counterpart. */
function rewriteFlag(html, page) {
  return html
    .replace(/<a href="\/hu(?:\/kapcsolat)?" class="flag-link"/, `<a href="${page.skPath}" class="flag-link"`)
    .replace(/(<a href="[^"]*" class="flag-link"[^>]*\stitle=")[^"]*(")/, `$1${escAttr(tr("nav.flagTitle"))}$2`)
    .replace(/(class="flag-link"[\s\S]{0,120}?<img src=")\/images\/flag-hu\.png(" alt=")[^"]*(")/,
             `$1/images/flag-sk.png$2Slovak flag$3`);
}

/** Rebuild JSON-LD in Hungarian rather than shipping Slovak structured data. */
function rewriteSchema(html, page) {
  const faq = t.servicesPage.faq;
  const blocks = [];

  if (page.metaKey === "index") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`, // stable across languages: one business, two pages
      name: "Sídlo Komárno",
      url: page.huUrl,
      inLanguage: "hu",
      description: "Professzionális virtuális székhely cége számára Szlovákiában.",
      image: `${SITE}/images/og-image.jpg`,
      telephone: "+421907056857",
      email: "virtualnesidlokn@gmail.com",
      knowsLanguage: ["sk", "hu"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "VIVA PARK 6139/1-A0",
        addressLocality: "Komárno",
        postalCode: "945 01",
        addressCountry: "SK",
      },
      areaServed: [
        { "@type": "City", name: "Komárom" },
        { "@type": "City", name: "Pozsony" },
        { "@type": "City", name: "Rimaszombat" },
        { "@type": "Country", name: "Szlovákia" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "16:00",
        },
      ],
      priceRange: "€€",
      currenciesAccepted: "EUR",
      makesOffer: [
        {
          "@type": "Offer",
          name: "Virtuális székhely Komárom",
          description:
            "Virtuális székhely a székhely létrehozásához szükséges hozzájárulással, küldemények átvételével és megőrzésével, szkenneléssel és e-mail értesítésekkel.",
          price: "25",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      ],
    });
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "hu",
      mainEntity: [1, 2, 3, 4, 5].map((i) => ({
        "@type": "Question",
        name: faq[`q${i}`],
        acceptedAnswer: { "@type": "Answer", text: faq[`a${i}`] },
      })),
    });
  } else {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: page.huUrl,
      inLanguage: "hu",
      name: tr("meta.title.contact"),
      mainEntity: { "@id": `${SITE}/#business` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tr("footer.home"), item: `${SITE}/hu` },
          { "@type": "ListItem", position: 2, name: tr("footer.contact"), item: page.huUrl },
        ],
      },
    });
  }

  const rendered = blocks
    .map((b) => `    <script type="application/ld+json">\n    ${JSON.stringify(b, null, 4).replace(/\n/g, "\n    ")}\n    </script>`)
    .join("\n");

  // drop the Slovak blocks, then insert the Hungarian ones in their place
  let first = true;
  return html.replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\n/g, () => {
    if (first) {
      first = false;
      return rendered + "\n";
    }
    return "";
  });
}

// ---------------------------------------------------------------------- main

fs.mkdirSync(path.join(__dirname, "hu"), { recursive: true });

for (const page of PAGES) {
  let html = fs.readFileSync(path.join(__dirname, page.src), "utf8");

  html = rewriteHead(html, page);
  html = translateText(html);
  html = translateAttrs(html);
  html = rewriteLinks(html, page.links);
  html = absolutiseAssets(html);
  html = rewriteFlag(html, page);
  html = rewriteSchema(html, page);

  html = html.replace(
    "<head>",
    "<head>\n    <!-- Generated by build-hu.js from " + page.src + " + lang/hu.json. Do not edit by hand. -->"
  );

  fs.writeFileSync(path.join(__dirname, page.out), html);
  console.log(`${page.src.padEnd(14)} -> ${page.out.padEnd(20)} (${page.huUrl})`);
}

console.log("\nHungarian pages rebuilt.");
