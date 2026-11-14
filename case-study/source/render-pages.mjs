import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SRC_DIR = import.meta.dirname;

function readSvg(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function imgUri(absOrRel) {
  const full = path.isAbsolute(absOrRel) ? absOrRel : path.join(ROOT, absOrRel);
  const ext = path.extname(full).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg';
  const b64 = fs.readFileSync(full).toString('base64');
  return `data:${mime};base64,${b64}`;
}

function shotUri(name) {
  return imgUri(path.join(SRC_DIR, 'shots', name));
}

function fontLinks() {
  const files = [
    'node_modules/@fontsource/baloo-2/600.css',
    'node_modules/@fontsource/baloo-2/700.css',
    'node_modules/@fontsource/baloo-2/800.css',
    'node_modules/@fontsource/plus-jakarta-sans/400.css',
    'node_modules/@fontsource/plus-jakarta-sans/500.css',
    'node_modules/@fontsource/plus-jakarta-sans/600.css',
    'node_modules/@fontsource/plus-jakarta-sans/700.css',
    'node_modules/@fontsource/fraunces/600-italic.css',
    'node_modules/@fontsource/fraunces/700-italic.css',
    'node_modules/@fontsource/jetbrains-mono/400.css',
    'node_modules/@fontsource/jetbrains-mono/500.css',
  ];
  return files
    .map((f) => `<link rel="stylesheet" href="file:///${path.join(SRC_DIR, f).replace(/\\/g, '/')}" />`)
    .join('\n');
}

function pageShell({ num, total, copy, bgClass = '', tall = false, badge = '', body }) {
  const numStr = String(num).padStart(2, '0');
  const totStr = String(total).padStart(2, '0');
  return `
  <section class="page ${bgClass} ${tall ? 'tall' : ''}" data-page="${numStr}">
    <div>
      <div class="page-top">
        <span class="mono-tag">${badge || copy.meta.conceptTag}</span>
        <span class="label-text">${copy.meta.pageWord} ${numStr} / ${totStr}</span>
      </div>
      ${body}
    </div>
    <div class="page-footer">
      <span>LÜPÜK — ${copy.meta.docTitle.toUpperCase()}</span>
      <span>${numStr} / ${totStr}</span>
    </div>
  </section>`;
}

export function renderHtml(copy, { products, categories, attributions }) {
  const total = 22;
  const stylesCss = fs.readFileSync(path.join(SRC_DIR, 'styles.css'), 'utf8');
  const logoMain = readSvg('public/brand/logo-main.svg');
  const logoHoriz = readSvg('public/brand/logo-horizontal.svg');
  const logoMark = readSvg('public/brand/logo-mark.svg');
  const logoMono = readSvg('public/brand/logo-mono.svg');

  const surfaces = [
    { token: '--color-cream', hex: '#FFF8EE', role: 'Page Canvas', ratio: '16.45:1 w/ Ink' },
    { token: '--color-cream-alt', hex: '#FDF1DF', role: 'Card Surface', ratio: '15.55:1 w/ Ink' },
    { token: '--color-ink', hex: '#2B1410', role: 'Primary Ink & Borders', ratio: 'Base Dark' },
    { token: '--color-tomato', hex: '#C8281C', role: 'Primary CTA', ratio: '5.31:1 w/ Cream' },
    { token: '--color-butter', hex: '#FFD447', role: 'Price Badge & Ticker', ratio: '12.20:1 w/ Ink' },
    { token: '--color-deep-blue', hex: '#1E4DD8', role: 'Focus Ring & Links', ratio: '5.22:1 w/ Cream' },
  ];

  // Page 1: Cover
  const p01 = `
  <section class="page bg-cream" data-page="01">
    <div class="page-top">
      <span class="mono-tag">${copy.p01.kicker}</span>
      <span class="mono-tag">${copy.meta.conceptTag}</span>
    </div>
    <div style="display:grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px; align-items: center; margin: 12px 0;">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <div style="width: 340px;">${logoMain}</div>
        <p class="lead" style="font-size:32px; color:var(--ink); font-weight:600;">${copy.p01.subtitle}</p>
        <div class="grid-2" style="gap:16px; margin-top:8px;">
          <div class="box-outline" style="padding:16px 20px;">
            <div class="label-text" style="color:var(--ink-soft);">${copy.p01.metaScopeLabel}</div>
            <div class="body-text" style="font-size:22px; font-weight:600; margin-top:4px;">${copy.p01.metaScopeValue}</div>
          </div>
          <div class="box-outline" style="padding:16px 20px;">
            <div class="label-text" style="color:var(--ink-soft);">${copy.p01.metaRoleLabel} · ${copy.p01.metaYearLabel}</div>
            <div class="body-text" style="font-size:22px; font-weight:600; margin-top:4px;">${copy.meta.ownerRolePlaceholder} · ${copy.meta.ownerYearPlaceholder}</div>
          </div>
        </div>
      </div>
      <div class="box-pop" style="background:var(--powder-blue); padding:28px; display:flex; flex-direction:column; gap:18px; align-items:center;">
        <div class="grid-2" style="gap:16px; width:100%;">
          <div style="background:var(--white); border:2px solid var(--ink); border-radius:16px; padding:14px; display:flex; justify-content:center;">
            <img src="${imgUri('public/images/products/visne-limon-cam-seker-400.webp')}" style="width:150px; height:150px; object-fit:contain;" />
          </div>
          <div style="background:var(--white); border:2px solid var(--ink); border-radius:16px; padding:14px; display:flex; justify-content:center;">
            <img src="${imgUri('public/images/products/orman-meyveli-ayicik-400.webp')}" style="width:150px; height:150px; object-fit:contain;" />
          </div>
        </div>
        <div class="cover-band pattern-checker" style="border-radius:10px;"></div>
      </div>
    </div>
    <div class="page-footer">
      <span>${copy.meta.docTitle.toUpperCase()}</span>
      <span>01 / ${total}</span>
    </div>
  </section>`;

  // Page 2: Summary
  const p02 = pageShell({
    num: 2, total, copy, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:20px;">${copy.p02.title}</h2>
      <p class="lead" style="font-size:32px; color:var(--ink); margin-bottom:28px;">${copy.p02.lead}</p>
      <div class="grid-asym" style="margin-bottom:28px;">
        <div style="display:flex; flex-direction:column; gap:20px;">
          <p class="body-text">${copy.p02.body1}</p>
          <p class="body-text" style="padding:18px 22px; border-left:6px solid var(--tomato); background:var(--cream);">${copy.p02.body2}</p>
        </div>
        <div class="grid-2" style="gap:18px;">
          ${copy.p02.facts.map((f) => `
            <div class="box-outline" style="text-align:center; padding:22px 16px;">
              <div style="font-family:var(--font-display); font-weight:800; font-size:56px; line-height:1;">${f.value}</div>
              <div class="label-text" style="margin-top:8px;">${f.label}</div>
            </div>`).join('')}
        </div>
      </div>`,
  });

  // Page 3: Idea + Abstract Diagram (NO ref/)
  const p03 = pageShell({
    num: 3, total, copy,
    body: `
      <h2 style="margin-bottom:14px;">${copy.p03.title}</h2>
      <p class="lead" style="margin-bottom:28px;">${copy.p03.lead}</p>
      <div class="grid-asym">
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p03.decisions.map((d) => `
            <div class="box-outline" style="display:flex; gap:20px; align-items:flex-start; padding:20px 24px;">
              <span style="font-family:var(--font-mono); font-size:26px; font-weight:500; background:var(--butter); border:2px solid var(--ink); border-radius:12px; padding:4px 12px;">${d.num}</span>
              <div>
                <div style="font-family:var(--font-display); font-weight:700; font-size:30px; line-height:1.1;">${d.head}</div>
                <p class="body-text" style="font-size:24px; margin-top:4px; color:var(--ink-soft);">${d.text}</p>
              </div>
            </div>`).join('')}
        </div>
        <div class="box-flat" style="border:2px solid var(--ink); display:flex; flex-direction:column; align-items:center; gap:14px;">
          <svg viewBox="0 0 420 380" width="400" height="360">
            <rect x="45" y="45" width="330" height="305" rx="26" fill="#FDF1DF" stroke="#2B1410" stroke-width="4"/>
            <path d="M45 45 L62 25 L79 45 L96 25 L113 45 L130 25 L147 45 L164 25 L181 45 L198 25 L215 45 L232 25 L249 45 L266 25 L283 45 L300 25 L317 45 L334 25 L351 45 L375 45" fill="#C8281C" stroke="#2B1410" stroke-width="4" stroke-linejoin="round"/>
            <rect x="75" y="70" width="145" height="34" rx="17" fill="#C8281C" stroke="#2B1410" stroke-width="3"/>
            <rect x="260" y="70" width="88" height="34" rx="10" fill="#FFF8EE" stroke="#2B1410" stroke-width="2.5"/>
            <rect x="75" y="122" width="273" height="165" rx="18" fill="#FFFFFF" stroke="#2B1410" stroke-width="3"/>
            <circle cx="211" cy="205" r="46" fill="#8ECAE6" stroke="#2B1410" stroke-width="3"/>
            <polygon points="325,248 334,261 349,255 347,270 362,275 352,287 362,299 347,304 349,319 334,313 325,326 316,313 301,319 303,304 288,299 298,287 288,275 303,270 301,255 316,261" fill="#FFD447" stroke="#2B1410" stroke-width="3"/>
            <rect x="75" y="302" width="185" height="24" rx="8" fill="#2B1410"/>
          </svg>
          <div class="label-text" style="text-align:center;">${copy.p03.diagramCaption}</div>
        </div>
      </div>`,
  });

  // Page 4: Brand & Logo System
  const p04 = pageShell({
    num: 4, total, copy,
    body: `
      <h2 style="margin-bottom:14px;">${copy.p04.title}</h2>
      <p class="lead" style="margin-bottom:26px;">${copy.p04.lead}</p>
      <div class="grid-4" style="margin-bottom:24px;">
        <div class="box-outline" style="display:flex; flex-direction:column; align-items:center; justify-content:space-between; height:230px; padding:18px;">
          <div style="width:190px;">${logoMain}</div>
          <div class="label-text" style="text-align:center;"><strong>${copy.p04.variants[0].name}</strong><br/>${copy.p04.variants[0].note}</div>
        </div>
        <div class="box-outline" style="display:flex; flex-direction:column; align-items:center; justify-content:space-between; height:230px; padding:18px;">
          <div style="width:210px; margin-top:26px;">${logoHoriz}</div>
          <div class="label-text" style="text-align:center;"><strong>${copy.p04.variants[1].name}</strong><br/>${copy.p04.variants[1].note}</div>
        </div>
        <div class="box-outline" style="display:flex; flex-direction:column; align-items:center; justify-content:space-between; height:230px; padding:18px;">
          <div style="width:96px; margin-top:16px;">${logoMark}</div>
          <div class="label-text" style="text-align:center;"><strong>${copy.p04.variants[2].name}</strong><br/>${copy.p04.variants[2].note}</div>
        </div>
        <div class="box-outline" style="background:var(--ink); color:var(--cream); display:flex; flex-direction:column; align-items:center; justify-content:space-between; height:230px; padding:18px;">
          <div style="width:210px; margin-top:26px;">${logoMono}</div>
          <div class="label-text" style="text-align:center; color:var(--cream);"><strong>${copy.p04.variants[3].name}</strong><br/>${copy.p04.variants[3].note}</div>
        </div>
      </div>
      <div class="box-flat" style="border:2px solid var(--ink); padding:20px 28px;">
        <div class="label-text" style="font-weight:700; margin-bottom:8px;">${copy.p04.rulesTitle}</div>
        <div class="grid-3">
          ${copy.p04.rules.map((r) => `<p class="body-text" style="font-size:23px;">• ${r}</p>`).join('')}
        </div>
      </div>`,
  });

  // Page 5: Color System
  const p05 = pageShell({
    num: 5, total, copy,
    body: `
      <h2 style="margin-bottom:12px;">${copy.p05.title}</h2>
      <p class="lead" style="margin-bottom:24px;">${copy.p05.lead}</p>
      <div class="label-text" style="font-weight:700; margin-bottom:10px;">${copy.p05.surfacesTitle}</div>
      <div class="grid-3" style="gap:16px; margin-bottom:24px;">
        ${surfaces.map((s) => `
          <div class="box-outline" style="padding:14px 18px; display:flex; align-items:center; gap:16px;">
            <div style="width:54px; height:54px; border-radius:12px; border:2px solid var(--ink); background:${s.hex}; shrink:0;"></div>
            <div>
              <div style="font-family:var(--font-mono); font-size:20px; font-weight:700;">${s.hex}</div>
              <div class="label-text">${s.role} · ${s.ratio}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="label-text" style="font-weight:700; margin-bottom:10px;">${copy.p05.categoriesTitle}</div>
      <div class="grid-3" style="gap:16px;">
        ${categories.map((c) => `
          <div style="border:2px solid var(--ink); border-radius:18px; padding:16px 20px; background:${c.color}; color:${c.inkColor};">
            <div style="font-family:var(--font-display); font-weight:700; font-size:28px; line-height:1.1;">${c.name}</div>
            <div class="label-text" style="margin-top:6px;">${c.color} · ${c.badge}</div>
          </div>`).join('')}
      </div>`,
  });

  // Page 6: Typography
  const p06 = pageShell({
    num: 6, total, copy, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:12px;">${copy.p06.title}</h2>
      <p class="lead" style="margin-bottom:24px;">${copy.p06.lead}</p>
      <div class="grid-2" style="gap:24px;">
        ${copy.p06.families.map((f, idx) => {
          const ff = idx === 0 ? 'var(--font-display); font-weight:800; font-size:38px;' : idx === 1 ? 'var(--font-body); font-weight:500; font-size:28px;' : idx === 2 ? 'var(--font-serif); font-style:italic; font-weight:700; font-size:40px;' : 'var(--font-mono); font-weight:500; font-size:26px;';
          return `
          <div class="box-outline" style="padding:22px 26px;">
            <div class="label-text" style="color:var(--tomato);">${f.role}</div>
            <div style="font-family:var(--font-display); font-weight:700; font-size:32px; margin-top:2px;">${f.name}</div>
            <div style="font-family:${ff} margin:12px 0; padding:12px 16px; background:var(--cream); border-radius:12px; border:2px solid var(--ink);">${f.sample}</div>
            <p class="label-text" style="color:var(--ink-soft);">${f.note}</p>
          </div>`;
        }).join('')}
      </div>`,
  });

  // Page 7: Packaging Label System (isolated component screenshots + callouts)
  const p07 = pageShell({
    num: 7, total, copy,
    body: `
      <h2 style="margin-bottom:12px;">${copy.p07.title}</h2>
      <p class="lead" style="margin-bottom:24px;">${copy.p07.lead}</p>
      <div class="grid-asym-rev" style="align-items:center;">
        <div class="shot-frame" style="padding:18px; background:var(--cream-alt); display:flex; justify-content:center;">
          <img src="${shotUri('comp-packcard.png')}" style="max-height:480px; width:auto;" />
        </div>
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${copy.p07.callouts.map((c) => `
            <div class="box-outline" style="display:flex; gap:16px; align-items:center; padding:16px 22px;">
              <span style="width:42px; height:42px; border-radius:999px; background:var(--butter); border:2px solid var(--ink); display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-weight:700; font-size:22px; flex-shrink:0;">${c.num}</span>
              <div>
                <div style="font-family:var(--font-mono); font-weight:700; font-size:22px;">${c.name}</div>
                <div class="body-text" style="font-size:23px; color:var(--ink-soft);">${c.desc}</div>
              </div>
            </div>`).join('')}
          <div class="grid-2" style="gap:16px; margin-top:4px;">
            <div class="shot-frame" style="padding:10px; display:flex; justify-content:center; align-items:center; height:105px;">
              <img src="${shotUri('comp-starburst.png')}" style="max-height:85px; width:auto;" />
            </div>
            <div class="shot-frame" style="padding:10px; display:flex; justify-content:center; align-items:center; height:105px;">
              <img src="${shotUri('comp-zigzag.png')}" style="max-height:40px; width:100%; object-fit:contain;" />
            </div>
          </div>
        </div>
      </div>`,
  });

  // Page 8: Patterns & Texture
  const p08 = pageShell({
    num: 8, total, copy,
    body: `
      <h2 style="margin-bottom:12px;">${copy.p08.title}</h2>
      <p class="lead" style="margin-bottom:24px;">${copy.p08.lead}</p>
      <div class="grid-3" style="gap:24px; margin-bottom:24px;">
        <div class="box-outline" style="padding:0; overflow:hidden;">
          <div class="pattern-checker" style="height:210px; border-bottom:2px solid var(--ink);"></div>
          <div style="padding:18px 20px;">
            <div style="font-family:var(--font-mono); font-weight:700; font-size:22px;">${copy.p08.patterns[0].name}</div>
            <p class="body-text" style="font-size:22px; margin-top:6px;">${copy.p08.patterns[0].desc}</p>
          </div>
        </div>
        <div class="box-outline" style="padding:0; overflow:hidden;">
          <div class="pattern-halftone" style="height:210px; border-bottom:2px solid var(--ink);"></div>
          <div style="padding:18px 20px;">
            <div style="font-family:var(--font-mono); font-weight:700; font-size:22px;">${copy.p08.patterns[1].name}</div>
            <p class="body-text" style="font-size:22px; margin-top:6px;">${copy.p08.patterns[1].desc}</p>
          </div>
        </div>
        <div class="box-outline" style="padding:0; overflow:hidden;">
          <div class="pattern-notebook" style="height:210px; border-bottom:2px solid var(--ink);"></div>
          <div style="padding:18px 20px;">
            <div style="font-family:var(--font-mono); font-weight:700; font-size:22px;">${copy.p08.patterns[2].name}</div>
            <p class="body-text" style="font-size:22px; margin-top:6px;">${copy.p08.patterns[2].desc}</p>
          </div>
        </div>
      </div>
      <div class="shot-frame" style="padding:0;">
        <img src="${shotUri('comp-ticker.png')}" style="width:100%; height:64px; object-fit:cover;" />
        <div style="padding:12px 20px; border-top:2px solid var(--ink); display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-family:var(--font-mono); font-size:22px;">${copy.p08.patterns[3].name}</strong>
          <span class="label-text">${copy.p08.patterns[3].desc}</span>
        </div>
      </div>`,
  });

  // Page 9: Voice & Tone
  const p09 = pageShell({
    num: 9, total, copy, bgClass: 'bg-butter',
    body: `
      <h2 style="margin-bottom:14px;">${copy.p09.title}</h2>
      <p class="lead" style="color:var(--ink); margin-bottom:28px;">${copy.p09.lead}</p>
      <div class="grid-asym">
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p09.rules.map((r, i) => `
            <div class="box-outline" style="padding:20px 24px;">
              <div class="label-text" style="color:var(--tomato);">RULE 0${i + 1}</div>
              <p class="body-text" style="margin-top:4px;">${r}</p>
            </div>`).join('')}
        </div>
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${copy.p09.samples.map((s) => `
            <div class="box-pop" style="padding:16px 22px;">
              <div class="label-text" style="color:var(--ink-soft);">${s.where}</div>
              <div style="font-family:var(--font-display); font-weight:700; font-size:26px; margin-top:4px;">“${s.quote}”</div>
            </div>`).join('')}
        </div>
      </div>`,
  });

  // Page 10: Product Universe (24 SKUs)
  const p10 = pageShell({
    num: 10, total, copy,
    body: `
      <h2 style="margin-bottom:10px;">${copy.p10.title}</h2>
      <p class="lead" style="margin-bottom:18px;">${copy.p10.lead}</p>
      <div class="sku-grid" style="margin-bottom:18px;">
        ${products.map((p) => {
          const thumb = `public/${p.image.replace(/\.webp$/, '-400.webp').replace(/^\//, '')}`;
          return `
          <div class="sku-tile">
            <img src="${imgUri(thumb)}" alt="" />
            <span>${p.id.toUpperCase()}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="box-flat" style="border:2px solid var(--ink); padding:14px 22px;">
        <p class="label-text" style="font-size:21px;">${copy.p10.note}</p>
      </div>`,
  });

  // Page 11: Site Map & User Flows (Custom SVG diagram)
  const p11 = pageShell({
    num: 11, total, copy, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:10px;">${copy.p11.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p11.lead}</p>
      <div class="box-outline" style="padding:18px; margin-bottom:18px;">
        <svg viewBox="0 0 1200 320" width="1200" height="290" style="width:100%; height:auto;">
          <rect x="460" y="12" width="280" height="54" rx="27" fill="#FFD447" stroke="#2B1410" stroke-width="3"/>
          <text x="600" y="47" text-anchor="middle" font-family="JetBrains Mono" font-size="22" font-weight="700" fill="#2B1410">/ (HomePage)</text>
          <path d="M600 66 V105 M140 105 H1060 M140 105 V135 M370 105 V135 M600 105 V135 M830 105 V135 M1060 105 V135" stroke="#2B1410" stroke-width="3" fill="none"/>
          <rect x="30" y="135" width="220" height="52" rx="14" fill="#8ECAE6" stroke="#2B1410" stroke-width="3"/>
          <text x="140" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/shop/:cat</text>
          <rect x="265" y="135" width="210" height="52" rx="14" fill="#FF6FA8" stroke="#2B1410" stroke-width="3"/>
          <text x="370" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/mix</text>
          <rect x="495" y="135" width="210" height="52" rx="14" fill="#FFF8EE" stroke="#2B1410" stroke-width="3"/>
          <text x="600" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/about · /info</text>
          <rect x="725" y="135" width="210" height="52" rx="14" fill="#C9A7FF" stroke="#2B1410" stroke-width="3"/>
          <text x="830" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/credits</text>
          <rect x="955" y="135" width="210" height="52" rx="14" fill="#C8281C" stroke="#2B1410" stroke-width="3"/>
          <text x="1060" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#FFF8EE">* (404)</text>
          <path d="M140 187 V235 M370 187 V235 H490" stroke="#2B1410" stroke-width="3" fill="none"/>
          <rect x="30" y="235" width="240" height="52" rx="14" fill="#FFFFFF" stroke="#2B1410" stroke-width="3"/>
          <text x="150" y="268" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/product/:slug</text>
          <path d="M270 261 H490" stroke="#2B1410" stroke-width="3" fill="none"/>
          <rect x="490" y="235" width="240" height="52" rx="14" fill="#FFD447" stroke="#2B1410" stroke-width="3"/>
          <text x="610" y="268" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">CartDrawer / /cart</text>
          <path d="M730 261 H860" stroke="#2B1410" stroke-width="3" fill="none"/>
          <rect x="860" y="235" width="280" height="52" rx="14" fill="#9AE63B" stroke="#2B1410" stroke-width="3"/>
          <text x="1000" y="268" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="600" fill="#2B1410">/checkout (Demo)</text>
        </svg>
      </div>
      <div class="grid-3" style="gap:18px;">
        ${copy.p11.flows.map((f) => `<div class="box-flat" style="border:2px solid var(--ink); padding:14px 18px;"><p class="label-text" style="font-size:20px;">${f}</p></div>`).join('')}
      </div>`,
  });

  // Page 12: Screen Home (Tall)
  const p12 = pageShell({
    num: 12, total, copy, tall: true,
    body: `
      <h2 style="margin-bottom:10px;">${copy.p12.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p12.lead}</p>
      <div class="grid-asym" style="align-items:start;">
        <div class="shot-frame" style="max-height:700px;">
          <img src="${shotUri('desktop-home.png')}" style="width:100%; height:700px; object-fit:cover; object-position:top;" />
        </div>
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p12.decisions.map((d) => `<div class="box-outline" style="padding:18px 22px;"><p class="body-text" style="font-size:24px;">• ${d}</p></div>`).join('')}
          <div class="shot-frame" style="padding:12px; background:var(--cream-alt);">
            <img src="${shotUri('comp-retrodialog.png')}" />
          </div>
          <div class="label-text">${copy.meta.placeholderCaption}</div>
        </div>
      </div>`,
  });

  // Page 13: Screen Shop (Tall)
  const p13 = pageShell({
    num: 13, total, copy, tall: true, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:10px;">${copy.p13.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p13.lead}</p>
      <div class="grid-asym" style="align-items:start;">
        <div class="shot-frame" style="max-height:700px;">
          <img src="${shotUri('desktop-shop.png')}" style="width:100%; height:700px; object-fit:cover; object-position:top;" />
        </div>
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p13.decisions.map((d) => `<div class="box-outline" style="padding:18px 22px;"><p class="body-text" style="font-size:24px;">• ${d}</p></div>`).join('')}
          <div class="shot-frame" style="width:260px; align-self:center;">
            <img src="${shotUri('mobile-shop.png')}" style="width:100%; height:350px; object-fit:cover; object-position:top;" />
          </div>
          <div class="label-text">${copy.meta.placeholderCaption}</div>
        </div>
      </div>`,
  });

  // Page 14: Screen Product Detail
  const p14 = pageShell({
    num: 14, total, copy,
    body: `
      <h2 style="margin-bottom:10px;">${copy.p14.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p14.lead}</p>
      <div class="grid-asym-rev">
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p14.decisions.map((d) => `<div class="box-outline" style="padding:18px 22px;"><p class="body-text" style="font-size:24px;">• ${d}</p></div>`).join('')}
          <div class="label-text">${copy.meta.placeholderCaption}</div>
        </div>
        <div class="shot-frame" style="max-height:510px;">
          <img src="${shotUri('desktop-pdp.png')}" style="width:100%; height:510px; object-fit:cover; object-position:top;" />
        </div>
      </div>`,
  });

  // Page 15: Screen Mix
  const p15 = pageShell({
    num: 15, total, copy, bgClass: 'bg-powder',
    body: `
      <h2 style="margin-bottom:10px;">${copy.p15.title}</h2>
      <p class="lead" style="color:var(--ink); margin-bottom:20px;">${copy.p15.lead}</p>
      <div class="grid-asym">
        <div class="shot-frame" style="max-height:510px;">
          <img src="${shotUri('desktop-mix.png')}" style="width:100%; height:510px; object-fit:cover; object-position:top;" />
        </div>
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${copy.p15.decisions.map((d) => `<div class="box-outline" style="padding:18px 22px;"><p class="body-text" style="font-size:24px;">• ${d}</p></div>`).join('')}
          <div class="label-text" style="color:var(--ink);">${copy.meta.placeholderCaption}</div>
        </div>
      </div>`,
  });

  // Page 16: Screen Cart & Demo Checkout
  const p16 = pageShell({
    num: 16, total, copy,
    body: `
      <h2 style="margin-bottom:10px;">${copy.p16.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p16.lead}</p>
      <div class="grid-3" style="gap:20px; margin-bottom:18px;">
        <div class="shot-frame" style="height:410px;"><img src="${shotUri('desktop-drawer.png')}" style="height:410px; object-fit:cover; object-position:top right;" /></div>
        <div class="shot-frame" style="height:410px;"><img src="${shotUri('desktop-cart.png')}" style="height:410px; object-fit:cover; object-position:top;" /></div>
        <div class="shot-frame" style="height:410px;"><img src="${shotUri('desktop-checkout.png')}" style="height:410px; object-fit:cover; object-position:top;" /></div>
      </div>
      <div class="grid-2" style="gap:20px;">
        ${copy.p16.decisions.map((d) => `<div class="box-flat" style="border:2px solid var(--ink); padding:14px 20px;"><p class="label-text" style="font-size:21px;">• ${d}</p></div>`).join('')}
      </div>`,
  });

  // Page 17: Mobile & Utility Pages
  const p17 = pageShell({
    num: 17, total, copy, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:10px;">${copy.p17.title}</h2>
      <p class="lead" style="margin-bottom:20px;">${copy.p17.lead}</p>
      <div class="grid-4" style="gap:18px; margin-bottom:18px;">
        <div class="shot-frame" style="height:400px;"><img src="${shotUri('mobile-home.png')}" style="height:400px; object-fit:cover; object-position:top;" /></div>
        <div class="shot-frame" style="height:400px;"><img src="${shotUri('desktop-about.png')}" style="height:400px; object-fit:cover; object-position:top;" /></div>
        <div class="shot-frame" style="height:400px;"><img src="${shotUri('desktop-credits.png')}" style="height:400px; object-fit:cover; object-position:top;" /></div>
        <div class="shot-frame" style="height:400px;"><img src="${shotUri('desktop-404.png')}" style="height:400px; object-fit:cover; object-position:top;" /></div>
      </div>
      <div class="grid-2" style="gap:20px;">
        ${copy.p17.decisions.map((d) => `<div class="box-outline" style="padding:14px 20px;"><p class="label-text" style="font-size:21px;">• ${d}</p></div>`).join('')}
      </div>`,
  });

  // Page 18: Accessibility & Responsiveness
  const p18 = pageShell({
    num: 18, total, copy,
    body: `
      <h2 style="margin-bottom:12px;">${copy.p18.title}</h2>
      <p class="lead" style="margin-bottom:24px;">${copy.p18.lead}</p>
      <div class="grid-2" style="gap:20px; margin-bottom:24px;">
        ${copy.p18.items.map((it) => `
          <div class="box-outline" style="padding:20px 24px;">
            <div class="label-text" style="color:var(--deep-blue); font-weight:700;">${it.label}</div>
            <p class="body-text" style="font-size:25px; margin-top:6px;">${it.value}</p>
          </div>`).join('')}
      </div>
      <div class="box-flat" style="border:2px solid var(--ink); padding:18px 24px;">
        <table class="spec-table">
          <thead><tr><th>Foreground</th><th>Background</th><th>Ratio</th><th>WCAG AA</th></tr></thead>
          <tbody>
            <tr><td>#2B1410 (Ink)</td><td>#FFF8EE (Cream)</td><td>16.45:1</td><td>AA / AAA</td></tr>
            <tr><td>#2B1410 (Ink)</td><td>#FFD447 (Butter)</td><td>12.20:1</td><td>AA / AAA</td></tr>
            <tr><td>#FFF8EE (Cream)</td><td>#C8281C (Tomato)</td><td>5.31:1</td><td>AA</td></tr>
            <tr><td>#1E4DD8 (Focus)</td><td>#FFF8EE (Cream)</td><td>5.22:1</td><td>AA</td></tr>
          </tbody>
        </table>
      </div>`,
  });

  // Page 19: Process (Optional)
  const p19 = pageShell({
    num: 19, total, copy, badge: copy.meta.processOptionalTag,
    body: `
      <h2 style="margin-bottom:12px;">${copy.p19.title}</h2>
      <p class="lead" style="margin-bottom:26px;">${copy.p19.lead}</p>
      <div class="grid-2" style="gap:28px;">
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${copy.p19.steps.map((s) => `<div class="box-outline" style="padding:18px 22px;"><p class="body-text" style="font-size:24px;">${s}</p></div>`).join('')}
        </div>
        <div class="box-flat" style="border:2px solid var(--ink); padding:24px 28px;">
          <div class="label-text" style="color:var(--tomato); font-weight:700; margin-bottom:14px;">${copy.p19.learnedTitle}</div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${copy.p19.learned.map((l) => `<p class="body-text" style="font-size:25px;">• ${l}</p>`).join('')}
          </div>
        </div>
      </div>`,
  });

  // Page 20: Limits & Next Steps
  const p20 = pageShell({
    num: 20, total, copy, bgClass: 'bg-cream-alt',
    body: `
      <h2 style="margin-bottom:12px;">${copy.p20.title}</h2>
      <p class="lead" style="margin-bottom:26px;">${copy.p20.lead}</p>
      <div class="grid-2" style="gap:22px;">
        ${copy.p20.todo.map((t, i) => `
          <div class="box-outline" style="padding:24px 26px;">
            <div class="label-text" style="color:var(--tomato);">0${i + 1}</div>
            <p class="body-text" style="margin-top:8px;">${t}</p>
          </div>`).join('')}
      </div>`,
  });

  // Page 21: Credits & Licenses
  const bgNote = copy.lang === 'tr' ? 'arka plan kaldırıldı/kırpıldı' : 'background removed/cropped';
  const saNote = copy.lang === 'tr' ? ' (Aynı lisansla paylaşım)' : ' (ShareAlike)';
  const p21 = pageShell({
    num: 21, total, copy, tall: true,
    body: `
      <h2 style="margin-bottom:8px;">${copy.p21.title}</h2>
      <p class="label-text" style="font-size:20px; color:var(--ink-soft); margin-bottom:14px;">${copy.p21.aiNote}</p>
      <div class="credits-grid" style="margin-bottom:14px;">
        ${attributions.map((a) => {
          const sa = a.license.includes('BY-SA') ? saNote : '';
          return `
          <div class="credit-row">
            <strong>${a.productName}</strong> — ${a.author} ·
            <a href="${a.licenseUrl}">${a.license}${sa}</a> ·
            <a href="${a.sourceUrl}">Commons</a> · ${bgNote}
          </div>`;
        }).join('')}
      </div>
      <div class="box-flat" style="border:2px solid var(--ink); padding:12px 18px;">
        <div class="label-text"><strong>${copy.p21.stackTitle}:</strong> ${copy.p21.stackText}</div>
      </div>`,
  });

  // Page 22: Closing
  const p22 = `
  <section class="page bg-ink" data-page="22">
    <div class="page-top">
      <span class="mono-tag">${copy.meta.conceptTag}</span>
      <span class="label-text" style="color:var(--cream);">${copy.meta.pageWord} 22 / 22</span>
    </div>
    <div style="display:flex; flex-direction:column; gap:26px; align-items:flex-start; margin: 20px 0;">
      <div style="width: 320px; color: var(--cream);">${logoMono}</div>
      <h2 style="font-size:84px; color:var(--butter);">${copy.p22.title}</h2>
      <p class="lead" style="font-size:32px;">${copy.p22.lead}</p>
      <p class="body-text" style="color:var(--cream); opacity:0.88;">${copy.p22.note}</p>
      <div class="box-outline" style="background:var(--cocoa); border-color:var(--cream); color:var(--cream); padding:18px 26px;">
        <div class="label-text" style="color:var(--butter);">${copy.p22.contactLabel}</div>
        <div class="body-text" style="margin-top:4px;">${copy.meta.ownerContactPlaceholder}</div>
      </div>
    </div>
    <div class="page-footer">
      <span>${copy.meta.docTitle.toUpperCase()}</span>
      <span>22 / 22</span>
    </div>
  </section>`;

  const pages = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22].join('\n');

  return `<!doctype html>
<html lang="${copy.lang}">
  <head>
    <meta charset="UTF-8" />
    <title>${copy.meta.docTitle}</title>
    ${fontLinks()}
    <style>${stylesCss}</style>
  </head>
  <body>
    ${pages}
  </body>
</html>`;
}
