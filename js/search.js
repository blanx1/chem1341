/* =========================================================================
   SEARCH
   Builds an index of every lesson and every sub-topic (each <h3> section)
   from COURSE, then powers the header search bar and the #/search page.
   ========================================================================= */
const SiteSearch = (function () {
  'use strict';

  // Abbreviations and alternate words students might type
  const SYNONYMS = {
    'ie': ['ionization energy'], 'ionization': ['ionization energy', 'ionize'],
    'ea': ['electron affinity'], 'zeff': ['effective nuclear charge', 'zeff'],
    'shielding': ['screen', 'shield'], 'screening': ['screen', 'shield'],
    'lambda': ['λ', 'wavelength'], 'nu': ['ν', 'frequency'], 'psi': ['ψ', 'wave function'],
    'aufbau': ['aufbau', 'filling order'], 'hund': ['hund'], 'pauli': ['pauli', 'exclusion'],
    'heisenberg': ['uncertainty'], 'uncertainty': ['heisenberg', 'uncertainty'],
    'debroglie': ['de broglie'], 'broglie': ['de broglie'], 'planck': ['planck', 'quantum'],
    'photoelectric': ['photoelectric', 'threshold'], 'rydberg': ['rydberg', 'bohr'],
    'size': ['radius', 'radii', 'size'], 'radius': ['radius', 'radii'], 'radii': ['radius', 'radii'],
    'config': ['configuration'], 'configs': ['configuration'], 'configuration': ['configuration'],
    'orbital': ['orbital'], 'spin': ['spin', 'ms'], 'quantum numbers': ['quantum number'],
    'alkali': ['alkali', 'group 1a'], 'alkaline': ['alkaline earth', 'group 2a'],
    'halogen': ['halogen', 'group 7a'], 'halogens': ['halogen', 'group 7a'],
    'noble': ['noble gas', 'group 8a'], 'transition': ['transition', 'd block', 'd-block'],
    'exceptions': ['exception', 'cr', 'cu'], 'exception': ['exception', 'chromium', 'copper'],
    'oxide': ['oxide'], 'oxides': ['oxide'], 'acidic': ['acidic', 'nonmetal oxide'], 'basic': ['basic', 'metal oxide'],
    'paramagnetic': ['paramagnetic', 'unpaired'], 'diamagnetic': ['diamagnetic', 'paired'],
    'em': ['electromagnetic'], 'spectrum': ['spectrum', 'spectra'], 'spectra': ['spectrum', 'spectra'],
    'light': ['light', 'electromagnetic', 'photon'], 'energy levels': ['energy level'],
    'isoelectronic': ['isoelectronic'], 'ions': ['ion', 'cation', 'anion'], 'ion': ['ion', 'cation', 'anion']
  };

  const norm = s => s.toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[₀-₉]/g, d => String.fromCharCode(d.charCodeAt(0) - 8272))
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d))
    .replace(/[−–—]/g, '-').replace(/\s+/g, ' ').trim();

  /* ---------- build index */
  const entries = [];
  const parser = new DOMParser();
  COURSE.forEach(ch => {
    ch.lessons.forEach(lesson => {
      const spaced = lesson.body.replace(/(<\/(?:div|p|li|h3|td|th|tr|ol|ul|strong)>)/g, '$1 ');
      const doc = parser.parseFromString(`<div>${spaced}</div>`, 'text/html');
      const root = doc.body.firstChild;
      root.querySelectorAll('.widget').forEach(w => w.remove());
      // whole lesson
      const qText = lesson.questions.map(q => strip(q.q) + ' ' + (q.choices ? q.choices.map(strip).join(' ') : '')).join(' ');
      entries.push({
        kind: 'lesson', ch, lesson, section: null,
        title: lesson.title, heading: '',
        text: root.textContent.replace(/\s+/g, ' ').trim(),
        extra: qText
      });
      // each <h3> section
      const kids = Array.from(root.childNodes);
      let cur = null, secIdx = -1;
      kids.forEach(node => {
        if (node.nodeType === 1 && node.tagName === 'H3') {
          secIdx++;
          cur = { kind: 'section', ch, lesson, section: secIdx, title: node.textContent.trim(), heading: lesson.title, text: '' };
          entries.push(cur);
        } else if (cur) {
          cur.text += ' ' + (node.textContent || '');
        }
      });
      entries.forEach(e => { if (e.lesson === lesson && e.kind === 'section') e.text = e.text.replace(/\s+/g, ' ').trim(); });
      // worked examples get their own entry so they're easy to find
      root.querySelectorAll('.example').forEach(ex => {
        const t = ex.querySelector('.example-title');
        // find the section this example lives in
        let sec = -1, n = ex;
        while (n.previousSibling) { n = n.previousSibling; if (n.nodeType === 1 && n.tagName === 'H3') { sec = root.querySelectorAll('h3').length ? Array.from(root.querySelectorAll('h3')).indexOf(n) : -1; break; } }
        entries.push({ kind: 'example', ch, lesson, section: sec >= 0 ? sec : null, example: true,
          title: t ? t.textContent.replace(/^Worked example:\s*/i, '') : 'Worked example', heading: lesson.title,
          text: ex.textContent.replace(/\s+/g, ' ').trim(), exampleIdx: Array.from(root.querySelectorAll('.example')).indexOf(ex) });
      });
    });
  });
  entries.forEach(e => { e._title = norm(e.title); e._heading = norm(e.heading); e._text = norm(e.text); e._extra = norm(e.extra || ''); });

  function strip(html) { const d = parser.parseFromString(html, 'text/html'); return d.body.textContent || ''; }

  /* ---------- query */
  function termsOf(q) {
    const nq = norm(q);
    if (!nq) return [];
    // keep multi-word synonyms like "quantum numbers" together
    const terms = [];
    let rest = nq;
    Object.keys(SYNONYMS).filter(k => k.includes(' ')).forEach(k => {
      if (rest.includes(k)) { terms.push(k); rest = rest.replace(k, ' '); }
    });
    rest.split(/[\s,]+/).filter(t => t.length > 0).forEach(t => terms.push(t));
    return terms.filter(t => !['the', 'a', 'an', 'of', 'and', 'in', 'to', 'what', 'is', 'how', 'for'].includes(t) || terms.length === 1);
  }
  function variants(t) {
    const v = new Set([t]);
    (SYNONYMS[t] || []).forEach(s => v.add(norm(s)));
    if (t.length > 3 && t.endsWith('s')) v.add(t.slice(0, -1));          // plurals
    if (t.length > 4 && t.endsWith('es')) v.add(t.slice(0, -2));
    return Array.from(v);
  }
  function count(hay, needle) {
    if (!needle) return 0;
    let c = 0, i = hay.indexOf(needle);
    while (i !== -1 && c < 20) { c++; i = hay.indexOf(needle, i + needle.length); }
    return c;
  }
  function wordStart(hay, needle) {
    const i = hay.indexOf(needle);
    return i === 0 || (i > 0 && /[^a-z0-9]/.test(hay[i - 1]));
  }

  function query(q, limit) {
    const terms = termsOf(q);
    if (!terms.length) return [];
    const results = [];
    entries.forEach(e => {
      let score = 0, all = true;
      for (const t of terms) {
        let best = 0;
        for (const v of variants(t)) {
          let s = 0;
          if (e._title.includes(v)) s += wordStart(e._title, v) ? 14 : 8;
          if (e._heading.includes(v)) s += 3;
          const c = count(e._text, v);
          if (c) s += 2 + Math.min(c, 8) * 0.6;
          if (e._extra && e._extra.includes(v)) s += 0.5;
          if (v.length <= 2 && !wordStart(e._title, v) && !new RegExp(`(^|[^a-z0-9])${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(e._text)) s = 0; // short terms must be whole words
          best = Math.max(best, s);
        }
        if (!best) { all = false; break; }
        score += best;
      }
      if (!all) return;
      if (e.kind === 'section') score *= 1.15;     // prefer precise sub-topics
      if (e.kind === 'example') score *= 0.9;
      results.push({ e, score });
    });
    results.sort((a, b) => b.score - a.score);
    // de-duplicate: if a lesson's sections already rank well, drop weaker whole-lesson duplicates
    return (limit ? results.slice(0, limit) : results).map(r => ({ ...r.e, score: r.score, terms }));
  }

  function hrefOf(r) {
    if (r.kind === 'example') return `#/${r.ch.id}/${r.lesson.id}/ex${r.exampleIdx}`;
    return `#/${r.ch.id}/${r.lesson.id}` + (r.section !== null ? `/${r.section}` : '');
  }

  function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function highlight(text, terms) {
    let out = esc(text);
    const vs = terms.flatMap(variants).filter(v => v.length > 1).sort((a, b) => b.length - a.length);
    if (!vs.length) return out;
    const re = new RegExp('(' + vs.map(v => esc(v).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
    return out.replace(re, '<mark>$1</mark>');
  }
  function snippet(r, len = 120) {
    const text = r.text;
    const low = norm(text);
    let pos = -1;
    for (const t of r.terms) for (const v of variants(t)) { const i = low.indexOf(v); if (i !== -1 && (pos === -1 || i < pos)) pos = i; }
    if (pos === -1) pos = 0;
    let start = Math.max(0, pos - 40);
    if (start > 0) { const sp = text.indexOf(' ', start); if (sp !== -1 && sp < pos) start = sp + 1; }
    let s = text.slice(start, start + len);
    if (start + len < text.length) s = s.replace(/\s\S*$/, '') + '…';
    return (start > 0 ? '…' : '') + highlight(s, r.terms);
  }
  function resultHTML(r, i, active) {
    const icon = r.kind === 'example' ? '✏️' : r.kind === 'section' ? '§' : '📘';
    const crumb = r.kind === 'lesson' ? r.ch.short : `${r.ch.id === 'ch6' ? 'Ch 6' : 'Ch 7'} › ${r.lesson.title}`;
    const label = r.kind === 'example' ? 'Worked example: ' + r.title : r.title;
    return `<a class="sr-item ${active ? 'on' : ''}" href="${hrefOf(r)}" data-i="${i}" role="option">
      <span class="sr-icon">${icon}</span>
      <span class="sr-main"><span class="sr-title">${highlight(label, r.terms)}</span>
      <span class="sr-crumb">${esc(crumb)}</span>
      <span class="sr-snip">${snippet(r)}</span></span></a>`;
  }

  /* ---------- header search box */
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  let current = [], sel = -1;

  function renderBox() {
    const q = input.value;
    if (!q.trim()) { box.hidden = true; return; }
    const all = query(q);
    current = all.slice(0, 7);
    if (!current.length) {
      box.innerHTML = `<div class="sr-empty">No topics match “${esc(q)}”. Try a simpler word, like <em>radius</em>, <em>photon</em> or <em>Hund</em>.</div>`;
    } else {
      box.innerHTML = current.map((r, i) => resultHTML(r, i, i === sel)).join('') +
        (all.length > current.length ? `<a class="sr-all" href="#/search/${encodeURIComponent(q)}">See all ${all.length} results →</a>` : '');
    }
    box.hidden = false;
  }
  function close() { box.hidden = true; sel = -1; }

  if (input) {
    input.addEventListener('input', () => { sel = -1; renderBox(); });
    input.addEventListener('focus', () => { if (input.value.trim()) renderBox(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, current.length - 1); renderBox(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, -1); renderBox(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (!input.value.trim()) return;
        if (sel >= 0 && current[sel]) location.hash = hrefOf(current[sel]).slice(1);
        else location.hash = '/search/' + encodeURIComponent(input.value.trim());
        close(); input.blur();
      } else if (e.key === 'Escape') { close(); input.blur(); }
    });
    box.addEventListener('mousedown', e => e.preventDefault()); // keep focus while clicking
    box.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      close(); input.blur();
      if (a.getAttribute('href') === location.hash) { e.preventDefault(); window.dispatchEvent(new HashChangeEvent('hashchange')); }
    });
    document.addEventListener('click', e => { if (!e.target.closest('.search')) close(); });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); input.select(); }
    });
  }

  return { query, hrefOf, resultHTML, esc, entries };
})();
