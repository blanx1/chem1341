/* =========================================================================
   APP: routing, rendering, practice engine, progress storage
   ========================================================================= */
(function () {
  'use strict';

  const app = document.getElementById('app');
  const reviewToggle = document.getElementById('reviewToggle');

  /* ------------------------------------------------------------ storage */
  const STORE_KEY = 'chem1341-progress-v1';
  const RANK = { skipped: 1, revealed: 2, correct: 3, mastered: 4 };
  let state = { progress: {}, review: false };
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s) state = Object.assign(state, s); } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} };

  function record(qid, status) {
    const prev = state.progress[qid];
    if (!prev || RANK[status] > RANK[prev]) { state.progress[qid] = status; save(); }
  }
  const qidOf = (lesson, i) => lesson.id + '#' + i;

  function lessonStats(lesson) {
    const total = lesson.questions.length;
    let done = 0, mastered = 0, touched = 0;
    lesson.questions.forEach((_, i) => {
      const s = state.progress[qidOf(lesson, i)];
      if (s) touched++;
      if (s && RANK[s] >= 3) done++;
      if (s === 'mastered') mastered++;
    });
    return { total, done, mastered, touched };
  }
  function chapterStats(ch) {
    let total = 0, done = 0;
    ch.lessons.forEach(l => { const s = lessonStats(l); total += s.total; done += s.done; });
    return { total, done, pct: total ? Math.round(100 * done / total) : 0 };
  }

  /* ------------------------------------------------------------ review mode */
  reviewToggle.checked = !!state.review;
  document.body.classList.toggle('review', !!state.review);
  reviewToggle.addEventListener('change', () => {
    state.review = reviewToggle.checked; save();
    document.body.classList.toggle('review', state.review);
    route();
  });

  /* ------------------------------------------------------------ router */
  window.addEventListener('hashchange', route);
  route();

  function route() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    const [a, b] = parts;
    let tab = 'home';
    if (!a) renderHome();
    else if (a === 'cheatsheet') { tab = 'cheatsheet'; renderCheatSheet(); }
    else if (a === 'katelyn') { tab = 'katelyn'; renderKatelyn(); }
    else {
      const ch = COURSE.find(c => c.id === a);
      if (!ch) { renderHome(); }
      else {
        tab = ch.id;
        if (!b) renderChapter(ch);
        else if (b === 'quiz') renderQuiz(ch);
        else {
          const lesson = ch.lessons.find(l => l.id === b);
          lesson ? renderLesson(ch, lesson) : renderChapter(ch);
        }
      }
    }
    document.querySelectorAll('#tabs a').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.body.dataset.page = tab;
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------ pages */
  function renderHome() {
    const cards = COURSE.map(ch => {
      const s = chapterStats(ch);
      return `
      <a class="ch-card" href="#/${ch.id}">
        <div class="ch-card-top"><span class="ch-num">${ch.id === 'ch6' ? '6' : '7'}</span>
          <div><h3>${ch.short}</h3><p>${ch.blurb}</p></div></div>
        <div class="bar"><div class="bar-fill" style="width:${s.pct}%"></div></div>
        <div class="small">${s.done} of ${s.total} practice questions complete · ${ch.lessons.length} lessons</div>
      </a>`;
    }).join('');
    app.innerHTML = `
      <section class="hero">
        <h1>Atoms &amp; Periodic Trends</h1>
        <p>Lessons and practice questions for <strong>CHEM 1341: General Chemistry I</strong>, following
        <em>Chemistry: The Central Science</em> Chapters 6 and 7.</p>
      </section>
      <section class="how">
        <div class="how-step"><span>1</span><strong>Learn</strong><p>Read a short lesson with worked examples and interactive tools.</p></div>
        <div class="how-step"><span>2</span><strong>Practice</strong><p>Answer questions one at a time. Get hints, check your answer, see the explanation.</p></div>
        <div class="how-step"><span>3</span><strong>Skip anytime</strong><p>Just reviewing? Skip questions, or switch on <strong>Review mode</strong> (top right) to see every answer.</p></div>
      </section>
      <section class="ch-cards">${cards}</section>
      <section class="home-extra">
        <a class="btn" href="#/cheatsheet">📄 Open the cheat sheet</a>
        <button class="btn ghost" id="resetBtn">Reset my progress</button>
      </section>`;
    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirmReset()) { state.progress = {}; save(); renderHome(); }
    });
  }
  function confirmReset() {
    const btn = document.getElementById('resetBtn');
    if (btn.dataset.armed) return true;
    btn.dataset.armed = '1'; btn.textContent = 'Click again to confirm reset';
    setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = 'Reset my progress'; } }, 4000);
    return false;
  }

  function renderChapter(ch) {
    const s = chapterStats(ch);
    const rows = ch.lessons.map(l => {
      const ls = lessonStats(l);
      return `<a class="lesson-row" href="#/${ch.id}/${l.id}">
        ${statusIcon(ls)}
        <span class="lesson-row-title">${l.title}</span>
        <span class="lesson-row-meta">${ls.done}/${ls.total}</span></a>`;
    }).join('');
    app.innerHTML = `
      <section class="page-head">
        <div class="crumbs"><a href="#/">Home</a> › ${ch.short}</div>
        <h1>${ch.title}</h1>
        <p>${ch.blurb}</p>
        <div class="bar big"><div class="bar-fill" style="width:${s.pct}%"></div></div>
        <div class="small">${s.pct}% of practice complete</div>
      </section>
      <section class="lesson-list">${rows}</section>
      <section class="ch-actions">
        <a class="btn" href="#/${ch.id}/${ch.lessons[0].id}">Start from the beginning →</a>
        <a class="btn gold" href="#/${ch.id}/quiz">🎯 Take a chapter quiz (10 questions)</a>
      </section>`;
  }

  function statusIcon(ls) {
    if (ls.done === ls.total) return `<span class="st st-done" title="Complete">✓</span>`;
    if (ls.touched) return `<span class="st st-part" title="In progress" style="--p:${Math.round(100 * ls.done / ls.total)}%"></span>`;
    return `<span class="st st-none" title="Not started"></span>`;
  }

  function sidebar(ch, active) {
    return `<aside class="sidebar">
      <div class="side-title"><a href="#/${ch.id}">${ch.short}</a></div>
      ${ch.lessons.map(l => `<a class="side-item ${l.id === active ? 'on' : ''}" href="#/${ch.id}/${l.id}">${statusIcon(lessonStats(l))}<span>${l.title}</span></a>`).join('')}
      <a class="side-item quiz ${active === 'quiz' ? 'on' : ''}" href="#/${ch.id}/quiz"><span class="st st-quiz">🎯</span><span>Chapter quiz</span></a>
    </aside>`;
  }

  function renderLesson(ch, lesson) {
    const idx = ch.lessons.indexOf(lesson);
    const prev = ch.lessons[idx - 1], next = ch.lessons[idx + 1];
    const nextHref = next ? `#/${ch.id}/${next.id}` : (ch.id === 'ch6' ? '#/ch7' : `#/${ch.id}/quiz`);
    const nextLabel = next ? next.title : (ch.id === 'ch6' ? 'Chapter 7' : 'Chapter quiz');
    app.innerHTML = `
      <div class="layout">
        ${sidebar(ch, lesson.id)}
        <article class="lesson">
          <div class="crumbs"><a href="#/">Home</a> › <a href="#/${ch.id}">${ch.short}</a></div>
          <h1>${lesson.title}</h1>
          <div class="lesson-body">${lesson.body}</div>
          <section class="practice" id="practice"></section>
          <nav class="pager">
            ${prev ? `<a class="btn ghost" href="#/${ch.id}/${prev.id}">← ${prev.title}</a>` : '<span></span>'}
            <a class="btn" href="${nextHref}">${nextLabel} →</a>
          </nav>
        </article>
      </div>`;
    initWidgets(app);
    const pEl = document.getElementById('practice');
    if (state.review) renderReviewList(pEl, lesson.questions.map((q, i) => ({ q, qid: qidOf(lesson, i) })), 'Practice questions (Review mode: answers shown)');
    else new Practice(pEl, lesson.questions.map((q, i) => ({ q, qid: qidOf(lesson, i) })), {
      title: 'Practice',
      nextHref, nextLabel,
      onChange: () => { const sb = document.querySelector('.sidebar'); if (sb) sb.outerHTML = sidebar(ch, lesson.id); }
    });
  }

  function renderQuiz(ch) {
    const pool = [];
    ch.lessons.forEach(l => l.questions.forEach((q, i) => pool.push({ q, qid: qidOf(l, i), from: l.title })));
    const picks = shuffle(pool).slice(0, 10);
    app.innerHTML = `
      <div class="layout">
        ${sidebar(ch, 'quiz')}
        <article class="lesson">
          <div class="crumbs"><a href="#/">Home</a> › <a href="#/${ch.id}">${ch.short}</a></div>
          <h1>🎯 ${ch.short}: Chapter Quiz</h1>
          <p>Ten random questions from every lesson in this chapter. Reload or click "New quiz" for a fresh set.</p>
          <section class="practice" id="practice"></section>
        </article>
      </div>`;
    const pEl = document.getElementById('practice');
    if (state.review) {
      pEl.innerHTML = `<div class="notice">Review mode is on, so every answer is shown below. Turn it off (top right) to take the quiz for real.</div>`;
      const div = document.createElement('div'); pEl.appendChild(div);
      renderReviewList(div, pool, 'All chapter questions');
    } else {
      new Practice(pEl, picks, { title: 'Chapter quiz', quiz: true, onRestart: () => renderQuiz(ch),
        onChange: () => { const sb = document.querySelector('.sidebar'); if (sb) sb.outerHTML = sidebar(ch, 'quiz'); } });
    }
  }

  function renderCheatSheet() {
    app.innerHTML = `
      <section class="page-head"><div class="crumbs"><a href="#/">Home</a> › Cheat Sheet</div>
        <h1>📄 Cheat Sheet: Chapters 6 &amp; 7</h1>
        <p>Everything on one page. <button class="btn small ghost" onclick="window.print()">Print it</button></p></section>
      <div class="cheat">
        <div class="cheat-card"><h3>Constants</h3>
          <table class="data compact">
            <tr><td>Speed of light</td><td>c = 3.00 × 10<sup>8</sup> m/s</td></tr>
            <tr><td>Planck's constant</td><td>h = 6.626 × 10<sup>−34</sup> J·s</td></tr>
            <tr><td>Bohr constant</td><td>hcR<sub>H</sub> = 2.18 × 10<sup>−18</sup> J</td></tr>
            <tr><td>Electron mass</td><td>9.11 × 10<sup>−31</sup> kg</td></tr>
            <tr><td>Avogadro's number</td><td>6.022 × 10<sup>23</sup> mol<sup>−1</sup></td></tr>
            <tr><td>Conversions</td><td>1 nm = 10<sup>−9</sup> m · 1 Å = 10<sup>−10</sup> m · 1 pm = 10<sup>−12</sup> m</td></tr>
          </table></div>
        <div class="cheat-card"><h3>Equations</h3>
          <table class="data compact">
            <tr><td>Light as a wave</td><td>c = λν</td></tr>
            <tr><td>Photon energy</td><td>E = hν = hc/λ</td></tr>
            <tr><td>Bohr energy levels (H)</td><td>E<sub>n</sub> = −2.18 × 10<sup>−18</sup> J (1/n<sup>2</sup>)</td></tr>
            <tr><td>Transition</td><td>ΔE = −2.18 × 10<sup>−18</sup> J (1/n<sub>f</sub><sup>2</sup> − 1/n<sub>i</sub><sup>2</sup>)</td></tr>
            <tr><td>de Broglie</td><td>λ = h/mv</td></tr>
            <tr><td>Uncertainty</td><td>Δx·Δ(mv) ≥ h/4π</td></tr>
            <tr><td>Effective nuclear charge</td><td>Z<sub>eff</sub> = Z − S</td></tr>
          </table></div>
        <div class="cheat-card"><h3>Quantum numbers</h3>
          <table class="data compact">
            <tr><th>n</th><td>1, 2, 3, … (size, energy)</td></tr>
            <tr><th>l</th><td>0 … n−1 (shape: s p d f)</td></tr>
            <tr><th>m<sub>l</sub></th><td>−l … +l (orientation)</td></tr>
            <tr><th>m<sub>s</sub></th><td>+½ or −½ (spin)</td></tr>
          </table>
          <p class="small">Orbitals per subshell: s 1, p 3, d 5, f 7 · Orbitals per shell: n<sup>2</sup> · Electrons per shell: 2n<sup>2</sup></p></div>
        <div class="cheat-card"><h3>Filling rules</h3>
          <ul><li><strong>Aufbau:</strong> 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p</li>
          <li><strong>Pauli:</strong> ≤ 2 e<sup>−</sup> per orbital, opposite spins</li>
          <li><strong>Hund:</strong> fill degenerate orbitals singly (parallel spins) before pairing</li>
          <li><strong>Exceptions:</strong> Cr [Ar]4s<sup>1</sup>3d<sup>5</sup>, Cu [Ar]4s<sup>1</sup>3d<sup>10</sup></li>
          <li><strong>Ions:</strong> remove from highest n first (4s before 3d)</li></ul></div>
        <div class="cheat-card wide"><h3>Periodic trends</h3>
          <table class="data">
            <tr><th>Property</th><th>Across a period →</th><th>Down a group ↓</th><th>Why</th></tr>
            <tr><td>Z<sub>eff</sub></td><td>Increases</td><td>~Same / slight increase</td><td>Same-shell electrons shield poorly</td></tr>
            <tr><td>Atomic radius</td><td>Decreases</td><td>Increases</td><td>Z<sub>eff</sub> ↑ pulls in; higher n is farther out</td></tr>
            <tr><td>1st ionization energy</td><td>Increases*</td><td>Decreases</td><td>Smaller atom, higher Z<sub>eff</sub> = tighter hold</td></tr>
            <tr><td>Electron affinity</td><td>More negative*</td><td>Small change</td><td>Higher Z<sub>eff</sub> attracts added electron</td></tr>
            <tr><td>Metallic character</td><td>Decreases</td><td>Increases</td><td>Follows low IE</td></tr>
          </table>
          <p class="small">* Exceptions: IE dips at 2A→3A (p electron easier to remove) and 5A→6A (paired electron repulsion). EA is positive for 2A, 5A (N) and 8A.</p>
          <p class="small"><strong>Ions:</strong> cations &lt; parent atom &lt; anion. Isoelectronic series: more protons = smaller (O<sup>2−</sup> &gt; F<sup>−</sup> &gt; Na<sup>+</sup> &gt; Mg<sup>2+</sup> &gt; Al<sup>3+</sup>).</p></div>
        <div class="cheat-card wide"><h3>Group chemistry</h3>
          <table class="data compact">
            <tr><td>Alkali metal + water</td><td>2 M + 2 H<sub>2</sub>O → 2 MOH + H<sub>2</sub></td></tr>
            <tr><td>Alkaline earth + water</td><td>M + 2 H<sub>2</sub>O → M(OH)<sub>2</sub> + H<sub>2</sub> (Ca and below)</td></tr>
            <tr><td>Alkali + O<sub>2</sub></td><td>Li → Li<sub>2</sub>O (oxide) · Na → Na<sub>2</sub>O<sub>2</sub> (peroxide) · K, Rb, Cs → MO<sub>2</sub> (superoxide)</td></tr>
            <tr><td>Metal + H<sub>2</sub></td><td>2 M + H<sub>2</sub> → 2 MH (hydride, H<sup>−</sup>)</td></tr>
            <tr><td>Metal oxide</td><td>Basic: + acid → salt + water; + water → hydroxide</td></tr>
            <tr><td>Nonmetal oxide</td><td>Acidic: + base → salt + water; + water → acid (CO<sub>2</sub> → H<sub>2</sub>CO<sub>3</sub>)</td></tr>
            <tr><td>Halogens</td><td>Diatomic; form X<sup>−</sup>; reactivity F<sub>2</sub> &gt; Cl<sub>2</sub> &gt; Br<sub>2</sub> &gt; I<sub>2</sub></td></tr>
            <tr><td>Noble gases</td><td>Unreactive; only Kr, Xe form compounds (XeF<sub>2</sub>, XeF<sub>4</sub>, XeF<sub>6</sub>)</td></tr>
          </table></div>
      </div>`;
  }

  function renderKatelyn() {
    app.innerHTML = `
      <section class="katelyn">
        <div class="hearts" aria-hidden="true">${Array.from({ length: 14 }, (_, i) =>
          `<span style="left:${(i * 7.3) % 100}%;animation-delay:${(i * 0.7) % 6}s;font-size:${14 + (i * 5) % 22}px">♥</span>`).join('')}</div>
        <div class="katelyn-card">
          <div class="big-heart">♥</div>
          <p class="katelyn-msg">I love you gorgeous :)</p>
        </div>
      </section>`;
  }

  /* ------------------------------------------------------------ review list */
  function renderReviewList(el, items, heading) {
    el.innerHTML = `<h2 class="practice-title">${heading}</h2>` + items.map(({ q }, i) => `
      <div class="review-q">
        <div class="q-num">Q${i + 1}</div>
        <div class="q-text">${q.q}</div>
        ${q.type === 'mc'
          ? `<ul class="review-choices">${q.choices.map((c, j) => `<li class="${j === q.answer ? 'right' : ''}">${j === q.answer ? '✓ ' : ''}${c}</li>`).join('')}</ul>`
          : `<div class="review-ans">Answer: <strong>${q.display}</strong></div>`}
        <div class="explain">${q.explain}</div>
      </div>`).join('');
  }

  /* ------------------------------------------------------------ practice engine */
  class Practice {
    constructor(el, items, opts) {
      this.el = el; this.items = items; this.opts = opts;
      this.i = 0;
      this.results = items.map(() => null); // 'mastered'|'correct'|'revealed'|'skipped'
      this.render();
    }
    render() {
      if (this.i >= this.items.length) return this.renderSummary();
      const { q, qid } = this.items[this.i];
      this.attempts = 0; this.usedHint = false; this.finished = false;
      const dots = this.items.map((_, k) => {
        const r = this.results[k];
        return `<span class="dot ${r || ''} ${k === this.i ? 'cur' : ''}" title="Question ${k + 1}"></span>`;
      }).join('');
      const prior = state.progress[qid];
      this.el.innerHTML = `
        <div class="practice-head">
          <h2 class="practice-title">${this.opts.title}</h2>
          <div class="dots">${dots}</div>
          <div class="small">Question ${this.i + 1} of ${this.items.length}${prior && RANK[prior] >= 3 ? ' · <span class="prior">✓ answered before</span>' : ''}</div>
        </div>
        <div class="q-card">
          <div class="q-text">${q.q}</div>
          <div class="q-input">${this.inputHTML(q)}</div>
          <div class="hint-box" hidden></div>
          <div class="feedback" hidden></div>
          <div class="q-actions">
            <button class="btn check" disabled>Check</button>
            <button class="btn ghost hint-btn">💡 Hint</button>
            <button class="btn ghost reveal-btn">Show answer</button>
            <button class="btn ghost skip-btn">Skip →</button>
            <button class="btn next-btn" hidden>Next question →</button>
          </div>
        </div>`;
      this.bind(q, qid);
    }
    inputHTML(q) {
      if (q.type === 'mc') {
        return `<div class="choices">${q.choices.map((c, j) => `
          <label class="choice"><input type="radio" name="mc" value="${j}"><span class="letter">${String.fromCharCode(65 + j)}</span><span>${c}</span></label>`).join('')}</div>`;
      }
      return `<div class="num-wrap"><input type="text" class="num-in" inputmode="decimal" autocomplete="off" placeholder="e.g. 4.74e14 or 4.74x10^14">
        ${q.unit ? `<span class="unit">${q.unit}</span>` : ''}</div>
        <div class="small muted">Scientific notation: type 6.6e-34 or 6.6x10^-34.</div>`;
    }
    bind(q, qid) {
      const $ = s => this.el.querySelector(s);
      const check = $('.check');
      const getVal = () => {
        if (q.type === 'mc') { const r = this.el.querySelector('input[name=mc]:checked'); return r ? +r.value : null; }
        const v = $('.num-in').value.trim(); return v === '' ? null : v;
      };
      const updateEnabled = () => { check.disabled = getVal() === null || this.finished; };
      this.el.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', () => { updateEnabled(); this.clearWrong(); });
        inp.addEventListener('change', () => { updateEnabled(); this.clearWrong(); });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !check.disabled) check.click(); });
      });
      check.addEventListener('click', () => this.check(q, qid, getVal()));
      $('.hint-btn').addEventListener('click', () => {
        this.usedHint = true;
        const h = $('.hint-box'); h.hidden = false; h.innerHTML = `<strong>Hint:</strong> ${q.hint}`;
        $('.hint-btn').disabled = true;
      });
      $('.reveal-btn').addEventListener('click', () => this.reveal(q, qid));
      $('.skip-btn').addEventListener('click', () => {
        if (!this.finished) { this.results[this.i] = 'skipped'; record(qid, 'skipped'); this.changed(); }
        this.i++; this.render();
      });
      $('.next-btn').addEventListener('click', () => { this.i++; this.render(); });
      if (q.type === 'num') setTimeout(() => { const n = $('.num-in'); if (n && document.activeElement === document.body) n.focus({ preventScroll: true }); }, 0);
    }
    clearWrong() {
      const fb = this.el.querySelector('.feedback');
      if (!this.finished && fb.classList.contains('wrong')) { fb.hidden = true; fb.className = 'feedback'; }
      this.el.querySelectorAll('.choice.wrong').forEach(c => c.classList.remove('wrong'));
    }
    check(q, qid, val) {
      if (this.finished || val === null) return;
      let ok = false, note = '';
      if (q.type === 'mc') ok = val === q.answer;
      else {
        const x = parseNumber(val);
        if (x === null) { this.showFeedback('wrong', 'I couldn\'t read that as a number. Try something like <code>3.31e-19</code>.'); return; }
        ok = numMatch(x, q.answer, q.tol);
        if (!ok && q.answer !== 0 && x !== 0) {
          const ratio = Math.log10(Math.abs(x / q.answer));
          if (Math.abs(ratio - Math.round(ratio)) < 0.01 && Math.round(ratio) !== 0) note = ' Your digits look right, but you\'re off by a power of ten. Check your unit conversions.';
          else if (Math.sign(x) !== Math.sign(q.answer) && numMatch(-x, q.answer, q.tol)) note = ' Check your sign.';
        }
      }
      this.attempts++;
      if (ok) {
        this.finished = true;
        const status = (this.attempts === 1 && !this.usedHint) ? 'mastered' : 'correct';
        this.results[this.i] = status; record(qid, status);
        if (q.type === 'mc') this.el.querySelectorAll('.choice')[q.answer].classList.add('right');
        this.showFeedback('right', `<strong>${pick(['Correct!', 'Nice!', 'You got it!', 'Exactly right!'])}</strong> ${q.explain}`);
        this.done();
      } else {
        if (q.type === 'mc') this.el.querySelectorAll('.choice')[val].classList.add('wrong');
        const more = this.attempts >= 2 ? ' Stuck? Try the hint, or click <em>Show answer</em>.' : '';
        this.showFeedback('wrong', `<strong>Not quite. Try again.</strong>${note}${more}`);
      }
    }
    reveal(q, qid) {
      if (this.finished) return;
      this.finished = true;
      this.results[this.i] = 'revealed'; record(qid, 'revealed');
      if (q.type === 'mc') this.el.querySelectorAll('.choice')[q.answer].classList.add('right');
      this.showFeedback('reveal', `<strong>Answer: ${q.type === 'mc' ? String.fromCharCode(65 + q.answer) + '. ' + q.choices[q.answer] : q.display}</strong><br>${q.explain}`);
      this.done();
    }
    done() {
      const $ = s => this.el.querySelector(s);
      ['.check', '.hint-btn', '.reveal-btn'].forEach(s => $(s).hidden = true);
      $('.skip-btn').hidden = true;
      const nb = $('.next-btn'); nb.hidden = false;
      if (this.i === this.items.length - 1) nb.textContent = 'See results →';
      this.el.querySelectorAll('input').forEach(i => i.disabled = true);
      this.changed();
      nb.focus({ preventScroll: true });
    }
    showFeedback(kind, html) {
      const fb = this.el.querySelector('.feedback');
      fb.hidden = false; fb.className = 'feedback ' + kind; fb.innerHTML = html;
    }
    changed() { if (this.opts.onChange) this.opts.onChange(); }
    renderSummary() {
      const n = this.items.length;
      const c = k => this.results.filter(r => r === k).length;
      const first = c('mastered'), later = c('correct'), shown = c('revealed'), skipped = c('skipped');
      const pct = Math.round(100 * first / n);
      const msg = pct === 100 ? 'Perfect! 🎉' : pct >= 80 ? 'Great work!' : pct >= 50 ? 'Good progress. Review the ones you missed.' : 'Keep at it. Reread the lesson and try again.';
      const missed = this.items.map((it, k) => ({ it, r: this.results[k] })).filter(x => x.r !== 'mastered');
      this.el.innerHTML = `
        <div class="summary">
          <h2 class="practice-title">${this.opts.quiz ? 'Quiz results' : 'Practice complete'}</h2>
          <div class="score-ring" style="--p:${pct}%"><span>${first}/${n}</span></div>
          <p class="summary-msg">${msg}</p>
          <ul class="summary-stats">
            <li><span class="dot mastered"></span>${first} right on the first try</li>
            <li><span class="dot correct"></span>${later} right after retries/hints</li>
            <li><span class="dot revealed"></span>${shown} answers shown</li>
            <li><span class="dot skipped"></span>${skipped} skipped</li>
          </ul>
          ${missed.length ? `<details class="missed"><summary>Review the ${missed.length} question${missed.length > 1 ? 's' : ''} you didn't get on the first try</summary><div class="missed-list"></div></details>` : ''}
          <div class="q-actions center">
            <button class="btn ghost again">${this.opts.quiz ? 'New quiz' : 'Practice again'}</button>
            ${this.opts.nextHref ? `<a class="btn" href="${this.opts.nextHref}">${this.opts.nextLabel} →</a>` : ''}
          </div>
        </div>`;
      if (missed.length) renderReviewList(this.el.querySelector('.missed-list'), missed.map(x => x.it), '');
      this.el.querySelector('.again').addEventListener('click', () => {
        if (this.opts.onRestart) return this.opts.onRestart();
        this.i = 0; this.results = this.items.map(() => null); this.render();
      });
    }
  }

  /* ------------------------------------------------------------ utils */
  function initWidgets(root) {
    root.querySelectorAll('[data-widget]').forEach(el => {
      const fn = WIDGETS[el.dataset.widget];
      if (fn) { try { fn(el); } catch (e) { console.error('Widget failed:', el.dataset.widget, e); } }
    });
  }
  function parseNumber(raw) {
    const sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
    let s = String(raw).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, ch => sup[ch]).replace(/[−–—]/g, '-').replace(/,/g, '').replace(/\s+/g, '');
    s = s.replace(/(×|x|X|\*|·)10\^?\(?([-+]?\d+)\)?/, 'e$2');
    s = s.replace(/^10\^?([-+]?\d+)/, '1e$1');
    const m = s.match(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i);
    if (!m) return null;
    const v = parseFloat(m[0]);
    return isFinite(v) ? v : null;
  }
  function numMatch(x, ans, tol) {
    if (!tol) return Math.abs(x - ans) < 1e-9;
    return Math.abs(x - ans) <= tol * Math.abs(ans);
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
})();
