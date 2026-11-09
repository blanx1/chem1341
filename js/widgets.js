/* =========================================================================
   INTERACTIVE WIDGETS
   A lesson body can contain <div class="widget" data-widget="name"></div>.
   After the lesson renders, WIDGETS[name](element) is called to fill it in.
   ========================================================================= */

const SYMBOLS = ['', 'H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
  'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
  'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
  'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
  'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
  'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'];

const NAMES_1_36 = ['', 'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
  'Sodium','Magnesium','Aluminum','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
  'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
  'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton'];

/* Row/column of an element in an 18-column table. f-block rows are rows 9 and 10. */
function tablePos(Z) {
  if (Z === 1) return [1, 1];
  if (Z === 2) return [1, 18];
  if (Z <= 4) return [2, Z - 2];
  if (Z <= 10) return [2, Z + 8];
  if (Z <= 12) return [3, Z - 10];
  if (Z <= 18) return [3, Z];
  if (Z <= 36) return [4, Z - 18];
  if (Z <= 54) return [5, Z - 36];
  if (Z <= 56) return [6, Z - 54];
  if (Z === 57) return [6, 3];
  if (Z <= 71) return [9, Z - 58 + 4];
  if (Z <= 86) return [6, Z - 68];
  if (Z <= 88) return [7, Z - 86];
  if (Z === 89) return [7, 3];
  if (Z <= 103) return [10, Z - 90 + 4];
  return [7, Z - 100];
}
function blockOf(Z) {
  const [r, c] = tablePos(Z);
  if (r >= 9) return 'f';
  if (c <= 2 || Z === 2) return 's';
  if (c >= 13) return 'p';
  return 'd';
}

/* Build a full 118-element grid. cellFn(Z) returns {cls, title, extra}. */
function fullTable(cellFn) {
  let html = '<div class="ptable">';
  for (let Z = 1; Z <= 118; Z++) {
    const [r, c] = tablePos(Z);
    const info = cellFn(Z);
    const rowCss = r >= 9 ? r + 0 : r;   // rows 9-10 after a spacer row 8
    html += `<div class="pt-cell ${info.cls}" style="grid-row:${rowCss};grid-column:${c}" title="${info.title || ''}">
      <span class="pt-z">${Z}</span><span class="pt-sym">${SYMBOLS[Z]}</span></div>`;
  }
  html += '<div class="pt-spacer" style="grid-row:8;grid-column:1/19"></div></div>';
  return html;
}

const WIDGETS = {

  /* -------------------------------------------------------------- EM spectrum */
  emSpectrum(el) {
    el.innerHTML = `
      <div class="widget-title">The electromagnetic spectrum</div>
      <div class="em-bar">
        <div style="flex:1.3">Radio</div><div style="flex:1">Microwave</div><div style="flex:1">Infrared</div>
        <div class="em-visible" style="flex:1.1">Visible</div>
        <div style="flex:1">UV</div><div style="flex:1">X-ray</div><div style="flex:1">Gamma</div>
      </div>
      <div class="em-axis"><span>← longer λ, lower ν, lower energy</span><span>shorter λ, higher ν, higher energy →</span></div>
      <div class="em-visible-zoom"><span>700 nm (red)</span><span>400 nm (violet)</span></div>`;
  },

  /* -------------------------------------------------------------- Bohr transitions */
  bohr(el) {
    const opts = n => [1,2,3,4,5,6].map(i => `<option value="${i}" ${i===n?'selected':''}>${i}</option>`).join('');
    el.innerHTML = `
      <div class="widget-title">Try it: hydrogen electron transitions</div>
      <div class="bohr-wrap">
        <svg viewBox="0 0 260 300" class="bohr-svg" aria-label="Energy level diagram"></svg>
        <div class="bohr-controls">
          <label>Starting level n<sub>i</sub> <select class="ni">${opts(3)}</select></label>
          <label>Final level n<sub>f</sub> <select class="nf">${opts(2)}</select></label>
          <div class="bohr-out"></div>
        </div>
      </div>`;
    const svg = el.querySelector('svg'), out = el.querySelector('.bohr-out');
    // y position drawn to true energy scale: n=∞ at top (y=20), n=1 at bottom (y=270)
    const yy = n => 20 + 250 * (1 / (n * n));
    const draw = () => {
      const ni = +el.querySelector('.ni').value, nf = +el.querySelector('.nf').value;
      let s = '';
      for (let n = 1; n <= 6; n++) {
        const yv = yy(n);
        s += `<line x1="40" x2="200" y1="${yv}" y2="${yv}" class="lvl"/>`;
        if (n <= 4) s += `<text x="206" y="${yv + 4}" class="lvl-t">n = ${n}</text>`;
      }
      s += `<text x="236" y="${yy(5.5) + 2}" class="lvl-t" style="font-size:9px">5,6</text>`;
      s += `<line x1="40" x2="200" y1="20" y2="20" class="lvl dash"/><text x="206" y="24" class="lvl-t">n = ∞</text>`;
      s += `<text x="4" y="16" class="lvl-t">E = 0</text>`;
      if (ni !== nf) {
        const up = nf > ni;
        s += `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="arrowhead"/></marker></defs>`;
        s += `<line x1="120" x2="120" y1="${yy(ni)}" y2="${yy(nf) + (up ? 6 : -6)}" class="jump ${up ? 'up' : 'down'}" marker-end="url(#ah)"/>`;
        s += `<circle cx="120" cy="${yy(ni)}" r="5" class="electron"/>`;
      } else {
        s += `<circle cx="120" cy="${yy(ni)}" r="5" class="electron"/>`;
      }
      svg.innerHTML = s;
      if (ni === nf) { out.innerHTML = '<p>Pick two different levels.</p>'; return; }
      const dE = -2.18e-18 * (1 / (nf * nf) - 1 / (ni * ni));
      const lam = 6.626e-34 * 3.00e8 / Math.abs(dE) * 1e9;
      let region, color = null;
      if (lam < 10) region = 'X-ray';
      else if (lam < 400) region = 'ultraviolet';
      else if (lam <= 700) { region = 'visible'; color = wavelengthColor(lam); }
      else region = 'infrared';
      const series = ['', 'Lyman (UV)', 'Balmer (visible)', 'Paschen (IR)', 'Brackett (IR)', 'Pfund (IR)'][Math.min(ni, nf)];
      out.innerHTML = `
        <p><strong>${dE < 0 ? 'Emission' : 'Absorption'}</strong>: photon ${dE < 0 ? 'released' : 'absorbed'}</p>
        <p>ΔE = ${sci(dE)} J</p>
        <p>λ = ${lam.toFixed(0)} nm ${color ? `<span class="swatch" style="background:${color}"></span>` : ''}</p>
        <p>Region: <strong>${region}</strong></p>
        <p class="small">Series: ${series}</p>`;
    };
    el.querySelectorAll('select').forEach(s => s.addEventListener('change', draw));
    draw();
  },

  /* -------------------------------------------------------------- Orbital shapes */
  orbitals(el) {
    const axes = `<line x1="10" y1="60" x2="110" y2="60" class="ax"/><line x1="60" y1="10" x2="60" y2="110" class="ax"/>`;
    const card = (title, inner) => `<figure class="orb-fig"><svg viewBox="0 0 120 120">${axes}${inner}</svg><figcaption>${title}</figcaption></figure>`;
    el.innerHTML = `
      <div class="widget-title">Orbital shapes (boundary surfaces)</div>
      <div class="orb-gallery">
        ${card('s (sphere)', `<circle cx="60" cy="60" r="34" class="lobe a"/>`)}
        ${card('p<sub>x</sub>', `<ellipse cx="35" cy="60" rx="24" ry="14" class="lobe a"/><ellipse cx="85" cy="60" rx="24" ry="14" class="lobe b"/>`)}
        ${card('p<sub>z</sub>', `<ellipse cx="60" cy="35" rx="14" ry="24" class="lobe a"/><ellipse cx="60" cy="85" rx="14" ry="24" class="lobe b"/>`)}
        ${card('d<sub>xy</sub> (cloverleaf)', `
          <ellipse cx="60" cy="60" rx="10" ry="22" transform="rotate(45 60 60) translate(0 -24)" class="lobe a"/>
          <ellipse cx="60" cy="60" rx="10" ry="22" transform="rotate(45 60 60) translate(0 24)" class="lobe a"/>
          <ellipse cx="60" cy="60" rx="10" ry="22" transform="rotate(-45 60 60) translate(0 -24)" class="lobe b"/>
          <ellipse cx="60" cy="60" rx="10" ry="22" transform="rotate(-45 60 60) translate(0 24)" class="lobe b"/>`)}
        ${card('d<sub>z²</sub> (lobes + doughnut)', `
          <ellipse cx="60" cy="33" rx="12" ry="24" class="lobe a"/><ellipse cx="60" cy="87" rx="12" ry="24" class="lobe a"/>
          <ellipse cx="60" cy="60" rx="34" ry="9" class="lobe b ring"/>`)}
      </div>
      <p class="small center">Colors show the two phases (signs) of the wave function. The axes cross at the nucleus.</p>`;
  },

  /* -------------------------------------------------------------- Energy level diagram */
  energyLevels(el) {
    const levels = [
      ['1s', 1, 280], ['2s', 1, 225], ['2p', 3, 205], ['3s', 1, 160], ['3p', 3, 140],
      ['4s', 1, 105], ['3d', 5, 92], ['4p', 3, 70], ['5s', 1, 45], ['4d', 5, 35], ['5p', 3, 20]
    ];
    let s = '';
    const xFor = { s: 40, p: 110, d: 230 };
    levels.forEach(([lab, k, yv]) => {
      const x0 = xFor[lab[1]];
      for (let i = 0; i < k; i++) s += `<rect x="${x0 + i * 22}" y="${yv - 8}" width="18" height="12" class="elbox"/>`;
      s += `<text x="${x0 - 30}" y="${yv + 2}" class="lvl-t">${lab}</text>`;
    });
    s += `<line x1="8" y1="290" x2="8" y2="10" class="ax" marker-end="url(#ah2)"/><defs><marker id="ah2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="arrowhead"/></marker></defs>`;
    s += `<text x="14" y="16" class="lvl-t">Energy</text>`;
    el.innerHTML = `<div class="widget-title">Orbital energies in a many-electron atom</div>
      <svg viewBox="0 0 360 300" class="el-svg">${s}</svg>
      <p class="small center">Each box is one orbital. Notice 4s sits below 3d, and 5s sits below 4d.</p>`;
  },

  /* -------------------------------------------------------------- Configuration builder */
  configBuilder(el) {
    el.innerHTML = `
      <div class="widget-title">Try it: electron configuration builder (Z = 1–36)</div>
      <div class="cb-controls">
        <button class="btn small cb-prev" aria-label="Previous element">−</button>
        <input type="range" min="1" max="36" value="8" class="cb-range" aria-label="Atomic number">
        <button class="btn small cb-next" aria-label="Next element">+</button>
        <span class="cb-name"></span>
      </div>
      <div class="cb-out"></div>`;
    const range = el.querySelector('.cb-range');
    const render = () => {
      const Z = +range.value;
      const cfg = electronConfig(Z);
      el.querySelector('.cb-name').innerHTML = `<strong>${SYMBOLS[Z]}</strong> · ${NAMES_1_36[Z]} · Z = ${Z}`;
      let diag = '<div class="orbital-row">';
      let unpaired = 0;
      cfg.forEach(({ sub, e }) => {
        const k = { s: 1, p: 3, d: 5 }[sub[1]];
        const boxes = Array(k).fill(0);
        for (let i = 0; i < e; i++) boxes[i % k]++;
        diag += `<div class="orb-group">${boxes.map(b => `<div class="orb">${b === 2 ? '↑↓' : b === 1 ? '↑' : ''}</div>`).join('')}<span>${sub}</span></div>`;
        unpaired += boxes.filter(b => b === 1).length;
      });
      diag += '</div>';
      const full = cfg.map(({ sub, e }) => `${sub}<sup>${e}</sup>`).join(' ');
      const exc = (Z === 24 || Z === 29) ? `<p class="exception">⚠ Exception! ${Z === 24 ? 'A half-filled 3d<sup>5</sup>' : 'A completely filled 3d<sup>10</sup>'} is extra stable, so only one electron is in 4s.</p>` : '';
      el.querySelector('.cb-out').innerHTML = `
        <p><strong>Full:</strong> ${full}</p>
        <p><strong>Condensed:</strong> ${condensed(Z, cfg)}</p>
        ${diag}
        <p><strong>Unpaired electrons:</strong> ${unpaired} ${unpaired ? '(paramagnetic)' : '(diamagnetic)'} &nbsp; · &nbsp; <strong>Block:</strong> ${blockOf(Z)}</p>
        ${exc}`;
    };
    range.addEventListener('input', render);
    el.querySelector('.cb-prev').addEventListener('click', () => { range.value = Math.max(1, +range.value - 1); render(); });
    el.querySelector('.cb-next').addEventListener('click', () => { range.value = Math.min(36, +range.value + 1); render(); });
    render();
  },

  /* -------------------------------------------------------------- s/p/d/f blocks */
  blocks(el) {
    el.innerHTML = `<div class="widget-title">Blocks of the periodic table</div>
      ${fullTable(Z => ({ cls: 'blk-' + blockOf(Z), title: SYMBOLS[Z] + ': ' + blockOf(Z) + ' block' }))}
      <div class="legend"><span class="lg blk-s"></span>s block <span class="lg blk-p"></span>p block <span class="lg blk-d"></span>d block <span class="lg blk-f"></span>f block</div>`;
  },

  /* -------------------------------------------------------------- Metals map */
  metalMap(el) {
    const metalloids = [5, 14, 32, 33, 51, 52];
    const nonmetals = [1, 2, 6, 7, 8, 9, 10, 15, 16, 17, 18, 34, 35, 36, 53, 54, 85, 86];
    el.innerHTML = `<div class="widget-title">Metals, nonmetals and metalloids</div>
      ${fullTable(Z => {
        const t = Z > 112 ? 'unk' : metalloids.includes(Z) ? 'metalloid' : nonmetals.includes(Z) ? 'nonmetal' : 'metal';
        return { cls: 'mm-' + t, title: SYMBOLS[Z] + ': ' + (t === 'unk' ? 'properties not well known' : t) };
      })}
      <div class="legend"><span class="lg mm-metal"></span>Metal <span class="lg mm-metalloid"></span>Metalloid <span class="lg mm-nonmetal"></span>Nonmetal</div>`;
  },

  /* -------------------------------------------------------------- Trend heat map */
  trendTable(el) {
    const prop = el.dataset.prop || 'radius';
    el.innerHTML = `
      <div class="widget-title">Explore the trend (main-group elements)</div>
      <div class="seg">
        <button data-p="radius">Atomic radius</button>
        <button data-p="ie">1st ionization energy</button>
        <button data-p="ea">Electron affinity</button>
      </div>
      <div class="tt-grid"></div>
      <div class="tt-info small"></div>`;
    const grid = el.querySelector('.tt-grid'), info = el.querySelector('.tt-info');
    const draw = p => {
      el.querySelectorAll('.seg button').forEach(b => b.classList.toggle('on', b.dataset.p === p));
      const meta = TREND_META[p];
      const vals = TREND_DATA.flat().filter(Boolean).map(d => d[p]).filter(v => typeof v === 'number');
      const mn = Math.min(...vals), mx = Math.max(...vals);
      let h = '<div class="tt-head"></div>' + ['1A','2A','','3A','4A','5A','6A','7A','8A'].map(g => `<div class="tt-head">${g}</div>`).join('');
      TREND_DATA.forEach((row, r) => {
        h += `<div class="tt-head">${r + 1}</div>`;
        row.forEach((d, c) => {
          if (c === 2) { h += `<div class="tt-gap">${r >= 3 ? 'd' : ''}</div>`; }
          if (!d) { h += '<div></div>'; return; }
          const v = d[p];
          let bg = '#e6e2dc', txt = '—', fg = '#333';
          if (typeof v === 'number') {
            let t = (v - mn) / (mx - mn);
            if (meta.invert) t = 1 - t;
            bg = heat(t); fg = t > 0.55 ? '#fff' : '#222';
            txt = v;
          } else if (v === 'pos') { txt = '> 0'; bg = '#d9d4cc'; }
          h += `<div class="tt-cell" style="background:${bg};color:${fg}" title="${d.name}: ${typeof v === 'number' ? v + ' ' + meta.unit : v === 'pos' ? 'positive (anion unstable)' : 'not well known'}">
            <span class="tt-sym">${d.s}</span><span class="tt-val">${txt}</span></div>`;
        });
      });
      grid.innerHTML = h;
      info.innerHTML = meta.note;
    };
    el.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => draw(b.dataset.p)));
    draw(prop);
  }
};

/* ---------- trend data: [symbol, radius pm (bonding/covalent), IE1 kJ/mol, EA kJ/mol] */
const TREND_META = {
  radius: { unit: 'pm', note: 'Bonding (covalent) atomic radius in picometers (100 pm = 1 Å). Darker = larger. <strong>Increases down a group, decreases across a period.</strong>' },
  ie: { unit: 'kJ/mol', note: 'First ionization energy in kJ/mol. Darker = harder to remove an electron. <strong>Increases across a period, decreases down a group</strong>, with dips at 2A→3A and 5A→6A.' },
  ea: { unit: 'kJ/mol', invert: true, note: 'Electron affinity in kJ/mol. Darker = more negative (more energy released). "&gt; 0" means the anion is unstable. Halogens are the most negative.' }
};
const _e = (s, name, radius, ie, ea) => ({ s, name, radius, ie, ea });
const TREND_DATA = [
  [_e('H','Hydrogen',31,1312,-73), null, null, null, null, null, null, _e('He','Helium',28,2372,'pos')],
  [_e('Li','Lithium',128,520,-60), _e('Be','Beryllium',96,899,'pos'), _e('B','Boron',84,801,-27), _e('C','Carbon',76,1086,-122), _e('N','Nitrogen',71,1402,'pos'), _e('O','Oxygen',66,1314,-141), _e('F','Fluorine',57,1681,-328), _e('Ne','Neon',58,2081,'pos')],
  [_e('Na','Sodium',166,496,-53), _e('Mg','Magnesium',141,738,'pos'), _e('Al','Aluminum',121,578,-43), _e('Si','Silicon',111,787,-134), _e('P','Phosphorus',107,1012,-72), _e('S','Sulfur',105,1000,-200), _e('Cl','Chlorine',102,1251,-349), _e('Ar','Argon',106,1521,'pos')],
  [_e('K','Potassium',203,419,-48), _e('Ca','Calcium',176,590,-2), _e('Ga','Gallium',122,579,-30), _e('Ge','Germanium',120,762,-119), _e('As','Arsenic',119,947,-78), _e('Se','Selenium',120,941,-195), _e('Br','Bromine',120,1140,-325), _e('Kr','Krypton',116,1351,'pos')],
  [_e('Rb','Rubidium',220,403,-47), _e('Sr','Strontium',195,549,-5), _e('In','Indium',142,558,-30), _e('Sn','Tin',139,709,-107), _e('Sb','Antimony',139,834,-103), _e('Te','Tellurium',138,869,-190), _e('I','Iodine',139,1008,-295), _e('Xe','Xenon',140,1170,'pos')],
  [_e('Cs','Cesium',244,376,-46), _e('Ba','Barium',215,503,-14), _e('Tl','Thallium',145,589,-20), _e('Pb','Lead',146,716,-35), _e('Bi','Bismuth',148,703,-91), _e('Po','Polonium',140,812,null), _e('At','Astatine',150,899,null), _e('Rn','Radon',150,1037,'pos')]
];

/* ---------- helpers */
function heat(t) {
  // light gold → Texas State maroon
  const a = [247, 236, 210], b = [80, 18, 20];
  const m = (i) => Math.round(a[i] + (b[i] - a[i]) * t);
  return `rgb(${m(0)},${m(1)},${m(2)})`;
}
function sci(x) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / Math.pow(10, e);
  return `${m.toFixed(2)} × 10<sup>${e}</sup>`.replace('-', '−');
}
function wavelengthColor(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = (440 - nm) / 40; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = (510 - nm) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = (645 - nm) / 65; }
  else { r = 1; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}
function electronConfig(Z) {
  const order = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10], ['4p', 6]];
  let left = Z; const cfg = [];
  for (const [sub, cap] of order) {
    if (left <= 0) break;
    const e = Math.min(cap, left); cfg.push({ sub, e }); left -= e;
  }
  if (Z === 24 || Z === 29) {
    cfg.find(o => o.sub === '4s').e = 1;
    cfg.find(o => o.sub === '3d').e += 1;
  }
  return cfg;
}
function condensed(Z, cfg) {
  const gases = [[18, 'Ar', 5], [10, 'Ne', 3], [2, 'He', 1]];
  for (const [nz, sym, nsub] of gases) {
    if (Z > nz) return `[${sym}] ` + cfg.slice(nsub).map(({ sub, e }) => `${sub}<sup>${e}</sup>`).join(' ');
  }
  return cfg.map(({ sub, e }) => `${sub}<sup>${e}</sup>`).join(' ');
}
