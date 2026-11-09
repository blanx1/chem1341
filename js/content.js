/* =========================================================================
   COURSE CONTENT
   Each chapter has lessons; each lesson has an HTML "body" and "questions".
   Question types:
     mc  : { type:'mc',  q, choices:[...], answer:<index>, hint, explain }
     num : { type:'num', q, answer:<number>, tol:<relative tolerance, 0 = exact>,
             unit:'label shown next to input', display:'formatted answer', hint, explain }
   To add a question, copy one of these objects and edit it.
   ========================================================================= */

const COURSE = [
/* ======================================================================
   CHAPTER 6
   ====================================================================== */
{
  id: 'ch6',
  title: 'Chapter 6 · Electronic Structure of Atoms',
  short: 'Quantum Model of the Atom',
  blurb: 'Light, photons, the Bohr model, matter waves, quantum numbers, orbitals and electron configurations.',
  lessons: [

  /* ---------------------------------------------------------------- 6.1 */
  {
    id: '6-1',
    title: '6.1 The Wave Nature of Light',
    body: `
<p>Almost everything we know about where electrons are in atoms comes from studying how atoms interact with <strong>light</strong>. So we start with light itself.</p>

<h3>Light is an electromagnetic wave</h3>
<p>Visible light, radio waves, X-rays, and so on are all <strong>electromagnetic radiation</strong>. They are waves of electric and magnetic fields, and in a vacuum they all travel at the same speed, the <strong>speed of light</strong>, <em>c</em> = 3.00 × 10<sup>8</sup> m/s.</p>
<ul>
  <li><strong>Wavelength (λ, "lambda")</strong>: distance between two neighboring peaks. Units: m, nm (10<sup>−9</sup> m), etc.</li>
  <li><strong>Frequency (ν, "nu")</strong>: number of waves passing a point per second. Units: s<sup>−1</sup> = Hz.</li>
  <li><strong>Amplitude</strong>: height of the wave, related to the <em>intensity</em> (brightness).</li>
</ul>

<div class="equation">c = λν</div>
<p>Because <em>c</em> is constant, wavelength and frequency are <strong>inversely related</strong>: long wavelength → low frequency; short wavelength → high frequency.</p>

<h3>The electromagnetic spectrum</h3>
<div class="widget" data-widget="emSpectrum"></div>
<p>Memorize the order (long λ → short λ): <strong>radio → microwave → infrared → visible → ultraviolet → X-ray → gamma</strong>. Within visible light, red is about 700 nm and violet is about 400 nm (ROYGBIV goes from long to short).</p>

<div class="example">
  <div class="example-title">Worked example: frequency from wavelength</div>
  <p>A yellow sodium lamp emits light at 589 nm. What is its frequency?</p>
  <ol>
    <li>Convert to meters: 589 nm × (10<sup>−9</sup> m / 1 nm) = 5.89 × 10<sup>−7</sup> m</li>
    <li>Rearrange: ν = c / λ = (3.00 × 10<sup>8</sup> m/s) / (5.89 × 10<sup>−7</sup> m)</li>
    <li>ν = <strong>5.09 × 10<sup>14</sup> s<sup>−1</sup></strong></li>
  </ol>
</div>

<div class="tip"><strong>Common mistake:</strong> forgetting to convert nm to m before using c = 3.00 × 10<sup>8</sup> m/s. Units must match!</div>
`,
    questions: [
      { type:'mc', q:'Which type of electromagnetic radiation has the <strong>longest</strong> wavelength?',
        choices:['X-rays','Ultraviolet','Visible light','Radio waves'], answer:3,
        hint:'Order: radio → microwave → IR → visible → UV → X-ray → gamma, from long to short λ.',
        explain:'Radio waves have the longest wavelengths (meters to kilometers). X-rays and gamma rays have the shortest.' },
      { type:'num', q:'A red laser pointer emits light with λ = 633 nm. What is the frequency of this light (in s<sup>−1</sup>)?',
        answer:4.74e14, tol:0.02, unit:'s⁻¹', display:'4.74 × 10<sup>14</sup> s<sup>−1</sup>',
        hint:'ν = c/λ. Convert 633 nm to meters first (× 10⁻⁹).',
        explain:'ν = (3.00 × 10<sup>8</sup> m/s) / (633 × 10<sup>−9</sup> m) = 4.74 × 10<sup>14</sup> s<sup>−1</sup>.' },
      { type:'num', q:'An FM radio station broadcasts at 101.1 MHz (1 MHz = 10<sup>6</sup> s<sup>−1</sup>). What is the wavelength in <strong>meters</strong>?',
        answer:2.967, tol:0.02, unit:'m', display:'2.97 m',
        hint:'λ = c/ν, with ν = 101.1 × 10⁶ s⁻¹.',
        explain:'λ = (3.00 × 10<sup>8</sup> m/s) / (1.011 × 10<sup>8</sup> s<sup>−1</sup>) = 2.97 m.' },
      { type:'mc', q:'If the wavelength of light is <strong>doubled</strong>, its frequency is…',
        choices:['doubled','unchanged','halved','quadrupled'], answer:2,
        hint:'c = λν and c is constant.',
        explain:'Since λν = constant, doubling λ means ν must be cut in half.' },
      { type:'mc', q:'Which list is in order of <strong>increasing frequency</strong>?',
        choices:['X-ray < visible < microwave','microwave < visible < X-ray','visible < microwave < X-ray','microwave < X-ray < visible'], answer:1,
        hint:'Higher frequency = shorter wavelength.',
        explain:'Microwaves have long λ (low ν), visible is in the middle, X-rays have very short λ (high ν).' }
    ]
  },

  /* ---------------------------------------------------------------- 6.2 */
  {
    id: '6-2',
    title: '6.2 Quantized Energy and Photons',
    body: `
<p>The wave model of light could not explain some experiments. The fix was the idea that energy comes in <strong>packets</strong>.</p>

<h3>Planck: energy is quantized</h3>
<p>Max Planck proposed that an object can only gain or lose energy in whole-number multiples of a smallest amount, a <strong>quantum</strong>:</p>
<div class="equation">E = hν</div>
<p><em>h</em> = <strong>Planck's constant</strong> = 6.626 × 10<sup>−34</sup> J·s. "Quantized" means only certain energy values are allowed, like steps on a staircase rather than a ramp.</p>

<h3>Einstein: light comes in photons</h3>
<p>In the <strong>photoelectric effect</strong>, light shining on a metal knocks electrons out, but only if the light's frequency is above a <strong>threshold frequency</strong>. Bright red light might eject nothing, while dim violet light ejects electrons immediately.</p>
<p>Einstein explained this by treating light as a stream of particles called <strong>photons</strong>, each carrying energy E = hν. One photon hits one electron.</p>
<ul>
  <li>If one photon doesn't have enough energy, it doesn't matter how many photons you send (brightness/intensity). <strong>No electrons come out.</strong></li>
  <li>Above the threshold, a brighter light (more photons) ejects <em>more</em> electrons; a higher frequency gives each electron more kinetic energy.</li>
</ul>

<p>Combining with c = λν gives a very useful form:</p>
<div class="equation">E = hc / λ</div>
<p>So <strong>shorter wavelength = more energetic photon</strong>. A UV photon has more energy than a visible photon, which is why UV gives you sunburn.</p>

<div class="example">
  <div class="example-title">Worked example: photon energy from wavelength</div>
  <p>What is the energy of one photon of 500. nm light? Of one <em>mole</em> of them?</p>
  <ol>
    <li>λ = 500. × 10<sup>−9</sup> m = 5.00 × 10<sup>−7</sup> m</li>
    <li>E = hc/λ = (6.626 × 10<sup>−34</sup> J·s)(3.00 × 10<sup>8</sup> m/s) / (5.00 × 10<sup>−7</sup> m) = <strong>3.98 × 10<sup>−19</sup> J</strong> per photon</li>
    <li>Per mole: (3.98 × 10<sup>−19</sup> J)(6.022 × 10<sup>23</sup> mol<sup>−1</sup>) = 2.39 × 10<sup>5</sup> J/mol = <strong>239 kJ/mol</strong></li>
  </ol>
</div>

<div class="tip"><strong>Light has a dual nature:</strong> it behaves as a wave (c = λν) <em>and</em> as particles (E = hν). Both equations use the same ν.</div>
`,
    questions: [
      { type:'num', q:'What is the energy (in J) of a single photon with frequency 5.00 × 10<sup>14</sup> s<sup>−1</sup>?',
        answer:3.313e-19, tol:0.02, unit:'J', display:'3.31 × 10<sup>−19</sup> J',
        hint:'E = hν, with h = 6.626 × 10⁻³⁴ J·s.',
        explain:'E = (6.626 × 10<sup>−34</sup> J·s)(5.00 × 10<sup>14</sup> s<sup>−1</sup>) = 3.31 × 10<sup>−19</sup> J.' },
      { type:'num', q:'What is the energy (in J) of one photon of blue light with λ = 450 nm?',
        answer:4.417e-19, tol:0.02, unit:'J', display:'4.42 × 10<sup>−19</sup> J',
        hint:'E = hc/λ. Convert nm to m.',
        explain:'E = (6.626 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>) / (450 × 10<sup>−9</sup>) = 4.42 × 10<sup>−19</sup> J.' },
      { type:'num', q:'What is the energy of one <strong>mole</strong> of 450 nm photons, in <strong>kJ/mol</strong>?',
        answer:266, tol:0.02, unit:'kJ/mol', display:'266 kJ/mol',
        hint:'Find energy of one photon (hc/λ), multiply by Avogadro\'s number (6.022 × 10²³), then divide by 1000.',
        explain:'One photon: 4.42 × 10<sup>−19</sup> J. × 6.022 × 10<sup>23</sup> = 2.66 × 10<sup>5</sup> J/mol = 266 kJ/mol.' },
      { type:'mc', q:'Light below a metal\'s threshold frequency shines on it and no electrons are ejected. What happens if you make the light <strong>much brighter</strong> (same frequency)?',
        choices:['Electrons are now ejected','Still no electrons are ejected','Electrons are ejected but more slowly','The threshold frequency decreases'], answer:1,
        hint:'Brightness = number of photons. What matters is the energy of each photon.',
        explain:'Each photon still has energy hν, which is below what\'s needed. More photons don\'t help, because one photon interacts with one electron.' },
      { type:'mc', q:'Which photon carries the <strong>most</strong> energy?',
        choices:['Red, 700 nm','Green, 530 nm','Infrared, 1200 nm','Ultraviolet, 250 nm'], answer:3,
        hint:'E = hc/λ: smaller λ → bigger E.',
        explain:'The shortest wavelength (250 nm UV) has the highest photon energy.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.3 */
  {
    id: '6-3',
    title: '6.3 Line Spectra and the Bohr Model',
    body: `
<h3>Continuous vs. line spectra</h3>
<p>White light passed through a prism gives a <strong>continuous spectrum</strong>, containing every color. But a tube of hydrogen gas excited by electricity gives off only a few specific wavelengths, a <strong>line spectrum</strong>. Every element has its own unique line spectrum, like a fingerprint.</p>

<h3>The Bohr model of hydrogen</h3>
<p>Niels Bohr explained hydrogen's lines with three ideas:</p>
<ol>
  <li>The electron can only be in certain circular orbits with specific allowed energies, labeled by the <strong>principal quantum number</strong> <em>n</em> = 1, 2, 3, …</li>
  <li>An electron in an allowed orbit doesn't radiate energy.</li>
  <li>Energy is emitted or absorbed only when the electron <strong>jumps</strong> between allowed levels, as a photon with energy E = hν equal to the difference in energy.</li>
</ol>

<div class="equation">E<sub>n</sub> = −(2.18 × 10<sup>−18</sup> J)(1/n<sup>2</sup>)</div>
<ul>
  <li>Energies are <strong>negative</strong>: zero energy is defined as the electron completely removed (n = ∞). A bound electron is lower in energy than a free one.</li>
  <li><strong>n = 1</strong> is the lowest energy: the <strong>ground state</strong>. Higher n are <strong>excited states</strong>.</li>
  <li>Levels get closer together as n increases.</li>
</ul>

<div class="equation">ΔE = E<sub>f</sub> − E<sub>i</sub> = −(2.18 × 10<sup>−18</sup> J)(1/n<sub>f</sub><sup>2</sup> − 1/n<sub>i</sub><sup>2</sup>)</div>
<ul>
  <li><strong>Emission</strong> (electron drops, n<sub>f</sub> &lt; n<sub>i</sub>): ΔE is negative, and a photon is given off.</li>
  <li><strong>Absorption</strong> (electron jumps up, n<sub>f</sub> &gt; n<sub>i</sub>): ΔE is positive, and a photon is absorbed.</li>
  <li>The photon's energy is |ΔE|, and its wavelength is λ = hc/|ΔE|.</li>
</ul>
<p>Transitions ending at n = 1 are in the UV (the <em>Lyman series</em>); transitions ending at n = 2 give the <strong>visible</strong> lines (the <em>Balmer series</em>); transitions ending at n = 3 are in the IR. The Rydberg equation, 1/λ = R<sub>H</sub>(1/n<sub>1</sub><sup>2</sup> − 1/n<sub>2</sub><sup>2</sup>), is the experimental equation that Bohr's model explained.</p>

<div class="widget" data-widget="bohr"></div>

<div class="example">
  <div class="example-title">Worked example: an emission line</div>
  <p>Find the wavelength of light emitted when a hydrogen electron drops from n = 4 to n = 2.</p>
  <ol>
    <li>ΔE = −(2.18 × 10<sup>−18</sup> J)(1/2<sup>2</sup> − 1/4<sup>2</sup>) = −(2.18 × 10<sup>−18</sup>)(0.1875) = −4.09 × 10<sup>−19</sup> J</li>
    <li>Negative, so energy is emitted. Photon energy = 4.09 × 10<sup>−19</sup> J.</li>
    <li>λ = hc/E = (6.626 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>) / (4.09 × 10<sup>−19</sup>) = 4.86 × 10<sup>−7</sup> m = <strong>486 nm</strong> (blue-green, visible)</li>
  </ol>
</div>

<div class="tip"><strong>Limits of the Bohr model:</strong> it works only for hydrogen (and one-electron ions like He<sup>+</sup>). It fails for many-electron atoms and wrongly pictures electrons in fixed circular paths. It survives because of two correct ideas: quantized energy levels, and photons emitted/absorbed when electrons change levels.</div>
`,
    questions: [
      { type:'mc', q:'When a hydrogen electron moves from n = 4 to n = 2, energy is…',
        choices:['absorbed','emitted as a photon','neither absorbed nor emitted','emitted only if n = 1 is empty'], answer:1,
        hint:'Going to a lower n means going to lower energy.',
        explain:'The electron moves to a lower-energy level, so the extra energy is released as a photon (emission).' },
      { type:'num', q:'What is the wavelength (in <strong>nm</strong>) of the photon emitted when a hydrogen electron falls from n = 3 to n = 2?',
        answer:656, tol:0.02, unit:'nm', display:'656 nm (red)',
        hint:'ΔE = 2.18 × 10⁻¹⁸ J × (1/2² − 1/3²). Then λ = hc/ΔE, and convert m → nm.',
        explain:'|ΔE| = (2.18 × 10<sup>−18</sup>)(1/4 − 1/9) = 3.03 × 10<sup>−19</sup> J. λ = (6.626 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)/(3.03 × 10<sup>−19</sup>) = 6.56 × 10<sup>−7</sup> m = 656 nm, the red line in hydrogen\'s spectrum.' },
      { type:'num', q:'How much energy (in J) is needed to completely remove the electron from a hydrogen atom in its ground state (n = 1 → n = ∞)?',
        answer:2.18e-18, tol:0.02, unit:'J', display:'2.18 × 10<sup>−18</sup> J',
        hint:'At n = ∞, E = 0. At n = 1, E = −2.18 × 10⁻¹⁸ J.',
        explain:'ΔE = 0 − (−2.18 × 10<sup>−18</sup> J) = +2.18 × 10<sup>−18</sup> J. This is the ionization energy of one H atom.' },
      { type:'mc', q:'Which hydrogen transition emits the photon with the <strong>highest energy</strong>?',
        choices:['n = 2 → n = 1','n = 3 → n = 2','n = 4 → n = 3','n = 5 → n = 4'], answer:0,
        hint:'Levels get closer together as n increases, so the biggest gap is at the bottom.',
        explain:'The gap between n = 1 and n = 2 is far larger than any of the others listed, so 2 → 1 releases the most energy (it\'s in the UV).' },
      { type:'mc', q:'The main failure of the Bohr model is that it…',
        choices:['cannot explain hydrogen\'s line spectrum','does not work for atoms with more than one electron','predicts energies are continuous','ignores the nucleus'], answer:1,
        hint:'It explains hydrogen very well. What about helium, lithium…?',
        explain:'Bohr\'s model correctly predicts hydrogen\'s spectrum but breaks down for many-electron atoms. Quantum mechanics replaced it.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.4 */
  {
    id: '6-4',
    title: '6.4 The Wave Behavior of Matter',
    body: `
<h3>de Broglie: matter has a wavelength</h3>
<p>If light (a wave) can act like particles, Louis de Broglie asked: can particles act like waves? He proposed that any moving object has a wavelength:</p>
<div class="equation">λ = h / mv</div>
<p>m = mass in <strong>kg</strong>, v = speed in <strong>m/s</strong>, and <em>mv</em> is the <strong>momentum</strong>. Because h is so tiny, only extremely light objects like electrons have wavelengths big enough to matter.</p>
<p>This was confirmed by <strong>electron diffraction</strong>: a beam of electrons passing through a crystal creates an interference pattern, exactly like a wave. (Electron microscopes use this.)</p>

<div class="example">
  <div class="example-title">Worked example: electron wavelength</div>
  <p>An electron (m = 9.11 × 10<sup>−31</sup> kg) moves at 2.00 × 10<sup>6</sup> m/s. What is its wavelength?</p>
  <ol>
    <li>λ = h/mv = (6.626 × 10<sup>−34</sup> J·s) / [(9.11 × 10<sup>−31</sup> kg)(2.00 × 10<sup>6</sup> m/s)]</li>
    <li>λ = 3.64 × 10<sup>−10</sup> m = <strong>0.364 nm</strong>, about the size of an atom. That's why wave behavior matters for electrons in atoms.</li>
  </ol>
  <p class="small">Unit check: 1 J = 1 kg·m<sup>2</sup>/s<sup>2</sup>, so J·s / (kg·m/s) = m. ✓</p>
</div>

<h3>Heisenberg's uncertainty principle</h3>
<p>For something as small as an electron, we <strong>cannot know both its exact position and exact momentum at the same time</strong>. The more precisely you pin down one, the less precisely you know the other:</p>
<div class="equation">Δx · Δ(mv) ≥ h / 4π</div>
<p>To "see" an electron you have to hit it with light, and that light changes its momentum. This is why we can't describe electrons as following exact paths (orbits) around the nucleus. Instead, we talk about the <strong>probability</strong> of finding the electron in a region of space. That is the quantum mechanical model in the next section.</p>

<div class="tip"><strong>Common mistake:</strong> using grams instead of kilograms in λ = h/mv. Joules contain kg, so mass must be in kg.</div>
`,
    questions: [
      { type:'num', q:'What is the de Broglie wavelength (in <strong>nm</strong>) of an electron (m = 9.11 × 10<sup>−31</sup> kg) moving at 5.97 × 10<sup>6</sup> m/s?',
        answer:0.1218, tol:0.02, unit:'nm', display:'0.122 nm',
        hint:'λ = h/(mv), then convert m → nm (× 10⁹).',
        explain:'λ = 6.626 × 10<sup>−34</sup> / (9.11 × 10<sup>−31</sup> × 5.97 × 10<sup>6</sup>) = 1.22 × 10<sup>−10</sup> m = 0.122 nm.' },
      { type:'num', q:'What is the de Broglie wavelength (in <strong>m</strong>) of a 0.145 kg baseball thrown at 40.0 m/s?',
        answer:1.142e-34, tol:0.02, unit:'m', display:'1.14 × 10<sup>−34</sup> m',
        hint:'λ = h/(mv) = 6.626 × 10⁻³⁴ / (0.145 × 40.0).',
        explain:'λ = 6.626 × 10<sup>−34</sup> / 5.80 = 1.14 × 10<sup>−34</sup> m, far too small to ever detect.' },
      { type:'mc', q:'Why don\'t we observe wave behavior for everyday objects like baseballs?',
        choices:['They are not moving fast enough to have a wavelength','Their wavelengths are far too small to detect','Only charged particles have wavelengths','Their wavelengths are too long to detect'], answer:1,
        hint:'Look at your answer to the baseball question.',
        explain:'Because m is huge compared to an electron, λ = h/mv is unimaginably small (~10<sup>−34</sup> m).' },
      { type:'mc', q:'Which experiment confirmed that electrons have wave properties?',
        choices:['The photoelectric effect','Electron diffraction','The hydrogen line spectrum','Rutherford\'s gold foil experiment'], answer:1,
        hint:'Diffraction/interference is a signature behavior of waves.',
        explain:'Electrons passed through a crystal produce a diffraction pattern, which only waves do.' },
      { type:'mc', q:'The Heisenberg uncertainty principle says that…',
        choices:['electrons move in circular orbits of known radius','we cannot know both an electron\'s exact position and exact momentum at the same time','an electron\'s energy can never be known','no two electrons can have the same quantum numbers'], answer:1,
        hint:'Position and momentum…',
        explain:'Δx·Δ(mv) ≥ h/4π: the product of the uncertainties has a minimum, so both can\'t be exactly known. (The last choice is the Pauli exclusion principle.)' }
    ]
  },

  /* ---------------------------------------------------------------- 6.5 */
  {
    id: '6-5',
    title: '6.5 Quantum Mechanics and Atomic Orbitals',
    body: `
<h3>Wave functions and orbitals</h3>
<p>Erwin Schrödinger wrote an equation that treats the electron as a wave. Its solutions are <strong>wave functions</strong>, written ψ (psi).</p>
<ul>
  <li>Each wave function has a precisely known <strong>energy</strong>.</li>
  <li>ψ<sup>2</sup> gives the <strong>probability density</strong>: how likely the electron is to be found at a point in space. A map of ψ<sup>2</sup> is called the <strong>electron density</strong>.</li>
  <li>An allowed wave function for the electron is called an <strong>orbital</strong>. (An orbital is NOT a Bohr orbit/path. It's a 3-D region of probability.)</li>
</ul>

<h3>The quantum numbers</h3>
<p>Each orbital is described by three quantum numbers:</p>
<table class="data">
  <tr><th>Quantum number</th><th>Symbol</th><th>Allowed values</th><th>What it tells you</th></tr>
  <tr><td>Principal</td><td>n</td><td>1, 2, 3, …</td><td><strong>Size and energy</strong>. Larger n = bigger orbital, higher energy</td></tr>
  <tr><td>Angular momentum</td><td>l</td><td>0 to (n − 1)</td><td><strong>Shape</strong> of the orbital</td></tr>
  <tr><td>Magnetic</td><td>m<sub>l</sub></td><td>−l to +l, including 0</td><td><strong>Orientation</strong> in space</td></tr>
</table>
<p>The value of l is given a letter:</p>
<table class="data compact">
  <tr><th>l</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
  <tr><th>Letter</th><td>s</td><td>p</td><td>d</td><td>f</td></tr>
  <tr><th># of orbitals (2l + 1)</th><td>1</td><td>3</td><td>5</td><td>7</td></tr>
</table>

<h3>Shells and subshells</h3>
<ul>
  <li><strong>Shell</strong>: all orbitals with the same n. The n = 3 shell contains the 3s, 3p, and 3d subshells.</li>
  <li><strong>Subshell</strong>: all orbitals with the same n <em>and</em> l, written like "3p" (n = 3, l = 1).</li>
  <li>Shell n has <strong>n subshells</strong> and <strong>n<sup>2</sup> orbitals</strong> in total.</li>
</ul>

<table class="data">
  <tr><th>n</th><th>Possible l</th><th>Subshells</th><th>Orbitals</th></tr>
  <tr><td>1</td><td>0</td><td>1s</td><td>1</td></tr>
  <tr><td>2</td><td>0, 1</td><td>2s, 2p</td><td>1 + 3 = 4</td></tr>
  <tr><td>3</td><td>0, 1, 2</td><td>3s, 3p, 3d</td><td>1 + 3 + 5 = 9</td></tr>
  <tr><td>4</td><td>0, 1, 2, 3</td><td>4s, 4p, 4d, 4f</td><td>1 + 3 + 5 + 7 = 16</td></tr>
</table>

<div class="example">
  <div class="example-title">Worked example: listing orbitals</div>
  <p>List the m<sub>l</sub> values for a 4d subshell. How many orbitals is that?</p>
  <ol>
    <li>"d" means l = 2.</li>
    <li>m<sub>l</sub> runs from −2 to +2: <strong>−2, −1, 0, +1, +2</strong></li>
    <li>Five values → <strong>5 orbitals</strong> in the 4d subshell.</li>
  </ol>
</div>

<div class="tip"><strong>Quick checks for "is this set allowed?"</strong> l must be less than n (so "2d" and "1p" don't exist), and |m<sub>l</sub>| must be ≤ l.</div>
`,
    questions: [
      { type:'mc', q:'What are the allowed values of l when n = 3?',
        choices:['1, 2, 3','0, 1, 2','0, 1, 2, 3','−2, −1, 0, 1, 2'], answer:1,
        hint:'l goes from 0 up to n − 1.',
        explain:'For n = 3, l = 0, 1, 2 (the 3s, 3p and 3d subshells).' },
      { type:'num', q:'How many orbitals are in the n = 4 shell?',
        answer:16, tol:0, unit:'orbitals', display:'16',
        hint:'Total orbitals in a shell = n².',
        explain:'4s (1) + 4p (3) + 4d (5) + 4f (7) = 16 = 4<sup>2</sup>.' },
      { type:'mc', q:'Which set of quantum numbers (n, l, m<sub>l</sub>) is <strong>NOT</strong> allowed?',
        choices:['(3, 2, −2)','(2, 1, 0)','(2, 2, 1)','(4, 0, 0)'], answer:2,
        hint:'Check that l ≤ n − 1 and |m<sub>l</sub>| ≤ l.',
        explain:'For n = 2, l can only be 0 or 1. l = 2 would be a "2d" orbital, which doesn\'t exist.' },
      { type:'mc', q:'What is the designation of the subshell with n = 4 and l = 2?',
        choices:['4s','4p','4d','4f'], answer:2,
        hint:'l = 0, 1, 2, 3 ↔ s, p, d, f.',
        explain:'l = 2 corresponds to d, so this is the 4d subshell.' },
      { type:'num', q:'How many orbitals are in a 5f subshell?',
        answer:7, tol:0, unit:'orbitals', display:'7',
        hint:'f means l = 3. Number of orbitals = 2l + 1.',
        explain:'l = 3, m<sub>l</sub> = −3, −2, −1, 0, 1, 2, 3 → 7 orbitals. (Every f subshell has 7, regardless of n.)' },
      { type:'mc', q:'Which quantum number mainly determines the <strong>shape</strong> of an orbital?',
        choices:['n','l','m<sub>l</sub>','m<sub>s</sub>'], answer:1,
        hint:'s = sphere, p = dumbbell…',
        explain:'l (angular momentum quantum number) determines shape. n sets size/energy; m<sub>l</sub> sets orientation.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.6 */
  {
    id: '6-6',
    title: '6.6 Representations of Orbitals',
    body: `
<p>We draw orbitals as <strong>contour (boundary-surface) diagrams</strong>: shapes that enclose the region where the electron spends about 90% of its time.</p>

<div class="widget" data-widget="orbitals"></div>

<h3>s orbitals</h3>
<ul>
  <li><strong>Spherical</strong>. One s orbital per shell.</li>
  <li>Get <strong>bigger as n increases</strong> (3s > 2s > 1s).</li>
  <li>The <strong>radial probability function</strong> shows the probability of finding the electron at a certain distance from the nucleus. For ns orbitals, it has <strong>n − 1 nodes</strong> (places where the probability is zero). 1s has 0, 2s has 1, 3s has 2.</li>
</ul>

<h3>p orbitals</h3>
<ul>
  <li><strong>Two lobes</strong> (dumbbell) on opposite sides of the nucleus.</li>
  <li>Three per subshell, pointing along the x, y and z axes: p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>.</li>
  <li>There is a <strong>node at the nucleus</strong>: zero chance of finding a p electron exactly there.</li>
</ul>

<h3>d and f orbitals</h3>
<ul>
  <li>Five d orbitals. <strong>Four</strong> are cloverleaf shapes with 4 lobes (d<sub>xy</sub>, d<sub>xz</sub>, d<sub>yz</sub>, d<sub>x²−y²</sub>). The fifth, <strong>d<sub>z²</sub></strong>, looks like two lobes along z with a <strong>"doughnut"</strong> around the middle.</li>
  <li>Seven f orbitals with even more complex shapes. You won't need to draw these.</li>
</ul>

<h3>Nodes</h3>
<p>A <strong>node</strong> is a region where ψ = 0, so the probability of finding the electron is zero. More nodes go with higher energy. A handy general rule: an orbital has <strong>n − 1 total nodes</strong>; l of them are angular (planes/cones) and n − l − 1 are radial (spheres).</p>

<div class="tip"><strong>Probability density vs. radial probability:</strong> ψ<sup>2</sup> for a 1s orbital is highest right at the nucleus, but the <em>radial</em> probability (summed over a whole spherical shell at distance r) peaks a little way out, at 0.529 Å for hydrogen, which is exactly Bohr's radius for n = 1.</div>
`,
    questions: [
      { type:'mc', q:'What is the shape of an s orbital?',
        choices:['Dumbbell','Sphere','Cloverleaf','Doughnut'], answer:1,
        hint:'s for sphere.',
        explain:'All s orbitals are spherical; they grow larger as n increases.' },
      { type:'num', q:'How many nodes does the radial probability function of a <strong>3s</strong> orbital have?',
        answer:2, tol:0, unit:'nodes', display:'2',
        hint:'An ns orbital has n − 1 nodes.',
        explain:'3s: n − 1 = 2 radial nodes (and no angular nodes since l = 0).' },
      { type:'mc', q:'Which orbital looks like two lobes along the z axis with a doughnut around the middle?',
        choices:['p<sub>z</sub>','d<sub>xy</sub>','d<sub>z²</sub>','d<sub>x²−y²</sub>'], answer:2,
        hint:'It\'s the one d orbital that doesn\'t look like a four-leaf clover.',
        explain:'The d<sub>z²</sub> orbital has two lobes along z plus a ring (doughnut) in the xy plane.' },
      { type:'mc', q:'What is the probability of finding a 2p electron exactly at the nucleus?',
        choices:['Highest of anywhere','About 50%','Zero','Same as for a 2s electron'], answer:2,
        hint:'Where do the two lobes of a p orbital meet?',
        explain:'p orbitals have a nodal plane passing through the nucleus, so the probability there is zero.' },
      { type:'mc', q:'How many p orbitals are there in a p subshell, and how are they oriented?',
        choices:['1, spherical','3, along the x, y, z axes','5, in the xy plane','3, all along z'], answer:1,
        hint:'l = 1 → m<sub>l</sub> = −1, 0, +1.',
        explain:'Three p orbitals (p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>), each pointing along one axis.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.7 */
  {
    id: '6-7',
    title: '6.7 Many-Electron Atoms',
    body: `
<h3>Subshell energies split</h3>
<p>In hydrogen (one electron), all orbitals in a shell have the same energy. In atoms with <strong>more than one electron</strong>, electrons repel each other and <strong>shield</strong> one another from the nucleus, so subshells in the same shell have different energies:</p>
<div class="equation">ns &lt; np &lt; nd &lt; nf</div>
<p>Why? An s electron <strong>penetrates</strong> closer to the nucleus than a p electron, so it feels more of the nuclear charge (less shielding) and is lower in energy.</p>
<p>Orbitals in the <em>same</em> subshell (e.g., the three 2p orbitals) still have the same energy. Orbitals with equal energy are called <strong>degenerate</strong>.</p>

<div class="widget" data-widget="energyLevels"></div>

<h3>Electron spin: the fourth quantum number</h3>
<p>Experiments (beams of atoms split by a magnetic field) show that electrons behave like tiny spinning magnets with two possible orientations. This is the <strong>spin magnetic quantum number</strong>:</p>
<div class="equation">m<sub>s</sub> = +½ or −½</div>
<p>Drawn as ↑ and ↓ in orbital diagrams.</p>

<h3>Pauli exclusion principle</h3>
<p><strong>No two electrons in an atom can have the same set of all four quantum numbers (n, l, m<sub>l</sub>, m<sub>s</sub>).</strong></p>
<p>Consequence: an orbital (fixed n, l, m<sub>l</sub>) can hold <strong>at most 2 electrons</strong>, and they must have <strong>opposite spins</strong> (↑↓).</p>
<table class="data compact">
  <tr><th>Subshell</th><td>s</td><td>p</td><td>d</td><td>f</td></tr>
  <tr><th>Orbitals</th><td>1</td><td>3</td><td>5</td><td>7</td></tr>
  <tr><th>Max electrons</th><td>2</td><td>6</td><td>10</td><td>14</td></tr>
</table>
<p>Max electrons in shell n = <strong>2n<sup>2</sup></strong> (2, 8, 18, 32…).</p>

<div class="example">
  <div class="example-title">Worked example: valid sets of four quantum numbers</div>
  <p>Is (n, l, m<sub>l</sub>, m<sub>s</sub>) = (3, 1, −1, −½) a valid set?</p>
  <ol>
    <li>n = 3 ✓. l = 1 is ≤ n − 1 = 2 ✓.</li>
    <li>m<sub>l</sub> = −1 is between −1 and +1 ✓. m<sub>s</sub> = −½ ✓.</li>
    <li><strong>Valid.</strong> It describes an electron in a 3p orbital.</li>
  </ol>
</div>
`,
    questions: [
      { type:'mc', q:'In a many-electron atom, which subshell has the <strong>highest</strong> energy?',
        choices:['3s','3p','3d','They are all equal'], answer:2,
        hint:'For a given n: s < p < d < f.',
        explain:'In many-electron atoms, energy increases with l in a shell: 3s < 3p < 3d. (Only in hydrogen are they all equal.)' },
      { type:'mc', q:'What is the maximum number of electrons that can occupy a single orbital?',
        choices:['1','2','6','8'], answer:1,
        hint:'Pauli exclusion principle.',
        explain:'Two electrons, which must have opposite spins (m<sub>s</sub> = +½ and −½).' },
      { type:'mc', q:'Which set of quantum numbers (n, l, m<sub>l</sub>, m<sub>s</sub>) is <strong>NOT</strong> allowed?',
        choices:['(2, 1, −1, +½)','(3, 0, 0, −½)','(2, 0, 0, +1)','(4, 3, −3, +½)'], answer:2,
        hint:'Check m<sub>s</sub> carefully.',
        explain:'m<sub>s</sub> can only be +½ or −½. A value of +1 is impossible.' },
      { type:'num', q:'What is the maximum number of electrons in the <strong>n = 3</strong> shell?',
        answer:18, tol:0, unit:'electrons', display:'18',
        hint:'2n², or add up 3s + 3p + 3d.',
        explain:'3s (2) + 3p (6) + 3d (10) = 18 = 2(3)<sup>2</sup>.' },
      { type:'mc', q:'"Degenerate" orbitals are orbitals that…',
        choices:['are empty','have the same energy','have the same shape but different n','contain unpaired electrons'], answer:1,
        hint:'It\'s about energy.',
        explain:'Degenerate = same energy, e.g., the three 2p orbitals.' },
      { type:'mc', q:'Why is the 2s subshell lower in energy than 2p in a many-electron atom?',
        choices:['2s electrons spend more time far from the nucleus','2s electrons penetrate closer to the nucleus and are less shielded','2s has more orbitals than 2p','2p electrons have higher spin'], answer:1,
        hint:'Think about which electron feels more of the nucleus\' pull.',
        explain:'The 2s electron density has a small bump close to the nucleus (penetration), so it feels a larger effective nuclear charge and is lower in energy.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.8 */
  {
    id: '6-8',
    title: '6.8 Electron Configurations',
    body: `
<p>An <strong>electron configuration</strong> describes how an atom's electrons are distributed among its orbitals. For the <strong>ground state</strong> (lowest energy), follow three rules:</p>
<ol>
  <li><strong>Aufbau ("building up")</strong>: fill orbitals from lowest energy to highest.</li>
  <li><strong>Pauli</strong>: max 2 electrons per orbital, opposite spins.</li>
  <li><strong>Hund's rule</strong>: when filling degenerate orbitals (like the three 2p), put <strong>one electron in each orbital, with parallel spins, before pairing any up</strong>. This maximizes unpaired electrons.</li>
</ol>

<h3>Filling order</h3>
<div class="equation">1s 2s 2p 3s 3p <span class="hl">4s 3d</span> 4p <span class="hl">5s 4d</span> 5p 6s 4f 5d 6p 7s 5f 6d 7p</div>
<p>Notice <strong>4s fills before 3d</strong>. Use the diagonal rule or (easier) just read across the periodic table (next lesson).</p>

<h3>Two ways to write it</h3>
<ul>
  <li><strong>Configuration notation</strong>: carbon is 1s<sup>2</sup>2s<sup>2</sup>2p<sup>2</sup>. The superscripts add up to the number of electrons.</li>
  <li><strong>Orbital diagram</strong>: one box per orbital, arrows for electrons:</li>
</ul>
<div class="orbital-row">
  <div class="orb-group"><div class="orb">↑↓</div><span>1s</span></div>
  <div class="orb-group"><div class="orb">↑↓</div><span>2s</span></div>
  <div class="orb-group"><div class="orb">↑</div><div class="orb">↑</div><div class="orb"></div><span>2p</span></div>
  <span class="orb-label">Carbon: the two 2p electrons are unpaired, in separate orbitals, with the same spin (Hund's rule).</span>
</div>

<div class="widget" data-widget="configBuilder"></div>

<div class="example">
  <div class="example-title">Worked example: oxygen (Z = 8)</div>
  <ol>
    <li>8 electrons: 1s<sup>2</sup> (2), 2s<sup>2</sup> (4), 2p<sup>4</sup> (8). Configuration: <strong>1s<sup>2</sup>2s<sup>2</sup>2p<sup>4</sup></strong></li>
    <li>2p orbital diagram: place 3 electrons singly ↑ ↑ ↑, then pair the 4th: ↑↓ ↑ ↑</li>
    <li>Unpaired electrons: <strong>2</strong></li>
  </ol>
</div>

<div class="tip"><strong>Paramagnetic vs. diamagnetic:</strong> atoms with unpaired electrons are attracted to a magnet (paramagnetic); atoms with all electrons paired are weakly repelled (diamagnetic).</div>
`,
    questions: [
      { type:'mc', q:'What is the ground-state electron configuration of oxygen (Z = 8)?',
        choices:['1s<sup>2</sup>2s<sup>2</sup>2p<sup>4</sup>','1s<sup>2</sup>2s<sup>4</sup>2p<sup>2</sup>','1s<sup>2</sup>2p<sup>6</sup>','1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>'], answer:0,
        hint:'Fill 1s (2), then 2s (2), then the remaining electrons go into 2p.',
        explain:'8 electrons: 1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>4</sup>. An s subshell can hold only 2, so "2s<sup>4</sup>" is impossible.' },
      { type:'num', q:'How many <strong>unpaired</strong> electrons does a ground-state nitrogen atom (Z = 7) have?',
        answer:3, tol:0, unit:'unpaired e⁻', display:'3',
        hint:'N is 1s²2s²2p³. Use Hund\'s rule on the three 2p orbitals.',
        explain:'2p<sup>3</sup>: ↑ ↑ ↑, one electron in each of the three 2p orbitals, so 3 unpaired.' },
      { type:'mc', q:'Hund\'s rule says that, for degenerate orbitals, electrons…',
        choices:['pair up before entering a new orbital','occupy orbitals singly with parallel spins before pairing','must all have opposite spins','fill the highest-energy orbital first'], answer:1,
        hint:'Think about how 2p<sup>3</sup> is drawn.',
        explain:'Electrons spread out one per orbital (same spin) first, minimizing repulsion and maximizing unpaired spins.' },
      { type:'mc', q:'Which 2p orbital diagram for <strong>carbon</strong> is correct for the ground state?',
        choices:['[↑↓] [  ] [  ]','[↑] [↓] [  ]','[↑] [↑] [  ]','[↑] [  ] [  ] plus one in 3s'], answer:2,
        hint:'Hund\'s rule: separate orbitals, parallel spins.',
        explain:'Ground-state carbon has its two 2p electrons in separate orbitals with the same spin: [↑][↑][ ].' },
      { type:'num', q:'How many unpaired electrons does a ground-state <strong>oxygen</strong> atom have?',
        answer:2, tol:0, unit:'unpaired e⁻', display:'2',
        hint:'2p⁴: put three in singly, then pair the fourth.',
        explain:'2p<sup>4</sup> → [↑↓][↑][↑]: 2 unpaired electrons, so O is paramagnetic.' },
      { type:'mc', q:'Which subshell is filled immediately <strong>after 4s</strong>?',
        choices:['4p','3d','4d','5s'], answer:1,
        hint:'Look at period 4 of the periodic table: K, Ca, then Sc…',
        explain:'The filling order is …3p, 4s, 3d, 4p… The transition metals Sc–Zn fill 3d.' }
    ]
  },

  /* ---------------------------------------------------------------- 6.9 */
  {
    id: '6-9',
    title: '6.9 Electron Configurations and the Periodic Table',
    body: `
<p>The periodic table <em>is</em> a map of electron configurations. Each row is a shell being filled, and each block tells you which kind of subshell is being filled.</p>

<div class="widget" data-widget="blocks"></div>

<ul>
  <li><strong>s block</strong> (groups 1A–2A, plus He): filling ns</li>
  <li><strong>p block</strong> (groups 3A–8A): filling np</li>
  <li><strong>d block</strong> (transition metals): filling (n−1)d. Period 4 metals fill 3d.</li>
  <li><strong>f block</strong> (lanthanides and actinides): filling (n−2)f. Lanthanides fill 4f.</li>
</ul>

<h3>Condensed (noble-gas) configurations</h3>
<p>Replace the inner electrons with the symbol of the previous noble gas in brackets:</p>
<ul>
  <li>Na: 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>1</sup> = <strong>[Ne]3s<sup>1</sup></strong></li>
  <li>Fe: <strong>[Ar]4s<sup>2</sup>3d<sup>6</sup></strong></li>
  <li>Br: <strong>[Ar]4s<sup>2</sup>3d<sup>10</sup>4p<sup>5</sup></strong></li>
</ul>
<p>The electrons in the noble-gas core are <strong>core electrons</strong>. The <strong>outer-shell</strong> electrons are the ones written after the brackets. <strong>Valence electrons</strong> are the outer electrons involved in bonding; for main-group elements, that's the s and p electrons in the highest shell (group number = number of valence electrons: Cl in 7A has 7).</p>

<h3>Elements in a group have similar outer configurations</h3>
<p>That's why they behave alike: all halogens end in ns<sup>2</sup>np<sup>5</sup>, all alkali metals end in ns<sup>1</sup>.</p>

<h3>The exceptions you need to know</h3>
<table class="data">
  <tr><th>Element</th><th>Expected</th><th>Actual</th></tr>
  <tr><td>Cr (24)</td><td>[Ar]4s<sup>2</sup>3d<sup>4</sup></td><td><strong>[Ar]4s<sup>1</sup>3d<sup>5</sup></strong></td></tr>
  <tr><td>Cu (29)</td><td>[Ar]4s<sup>2</sup>3d<sup>9</sup></td><td><strong>[Ar]4s<sup>1</sup>3d<sup>10</sup></strong></td></tr>
</table>
<p>A half-filled (d<sup>5</sup>) or completely filled (d<sup>10</sup>) d subshell is extra stable, so one 4s electron moves into 3d. The same thing happens below them (Mo, Ag, Au).</p>

<div class="example">
  <div class="example-title">Worked example: reading a configuration off the table</div>
  <p>Write the condensed configuration of selenium (Se, Z = 34).</p>
  <ol>
    <li>Previous noble gas: Ar (18). Core = [Ar].</li>
    <li>Walk across period 4: K, Ca → 4s<sup>2</sup>; Sc through Zn → 3d<sup>10</sup>; Ga, Ge, As, Se → 4p<sup>4</sup>.</li>
    <li><strong>[Ar]4s<sup>2</sup>3d<sup>10</sup>4p<sup>4</sup></strong></li>
  </ol>
</div>
`,
    questions: [
      { type:'mc', q:'What is the condensed electron configuration of iron (Fe, Z = 26)?',
        choices:['[Ar]3d<sup>8</sup>','[Ar]4s<sup>2</sup>3d<sup>6</sup>','[Ar]4s<sup>1</sup>3d<sup>7</sup>','[Kr]4s<sup>2</sup>3d<sup>6</sup>'], answer:1,
        hint:'After [Ar], fill 4s first, then 3d. Fe is the 6th element in the 3d row.',
        explain:'Fe = [Ar]4s<sup>2</sup>3d<sup>6</sup> (18 + 2 + 6 = 26).' },
      { type:'mc', q:'What is the actual ground-state configuration of chromium (Cr, Z = 24)?',
        choices:['[Ar]4s<sup>2</sup>3d<sup>4</sup>','[Ar]4s<sup>1</sup>3d<sup>5</sup>','[Ar]3d<sup>6</sup>','[Ar]4s<sup>2</sup>4p<sup>4</sup>'], answer:1,
        hint:'Cr is one of the two famous exceptions.',
        explain:'A half-filled 3d<sup>5</sup> subshell is especially stable, so Cr is [Ar]4s<sup>1</sup>3d<sup>5</sup>.' },
      { type:'mc', q:'What is the actual ground-state configuration of copper (Cu, Z = 29)?',
        choices:['[Ar]4s<sup>2</sup>3d<sup>9</sup>','[Ar]4s<sup>1</sup>3d<sup>10</sup>','[Ar]3d<sup>11</sup>','[Ar]4s<sup>2</sup>3d<sup>10</sup>'], answer:1,
        hint:'Filled d subshells are extra stable.',
        explain:'Cu moves one 4s electron to make a completely filled 3d<sup>10</sup>: [Ar]4s<sup>1</sup>3d<sup>10</sup>.' },
      { type:'num', q:'How many <strong>valence electrons</strong> does a phosphorus atom (P) have?',
        answer:5, tol:0, unit:'valence e⁻', display:'5',
        hint:'P is in group 5A. Its configuration is [Ne]3s²3p³.',
        explain:'3s<sup>2</sup>3p<sup>3</sup> → 5 valence electrons, matching group 5A.' },
      { type:'mc', q:'Which element has the configuration [Kr]5s<sup>2</sup>4d<sup>10</sup>5p<sup>3</sup>?',
        choices:['As','Sn','Sb','Bi'], answer:2,
        hint:'Period 5, third element in the p block (5p³).',
        explain:'Period 5, group 5A → antimony (Sb, Z = 51). Check: 36 + 2 + 10 + 3 = 51.' },
      { type:'num', q:'How many unpaired electrons are in a ground-state manganese atom (Mn, [Ar]4s<sup>2</sup>3d<sup>5</sup>)?',
        answer:5, tol:0, unit:'unpaired e⁻', display:'5',
        hint:'4s² is paired. Spread the five 3d electrons over five 3d orbitals.',
        explain:'3d<sup>5</sup> = one electron in each of the five d orbitals → 5 unpaired.' },
      { type:'mc', q:'Titanium (Ti) is in which block of the periodic table?',
        choices:['s block','p block','d block','f block'], answer:2,
        hint:'Ti = [Ar]4s²3d². What subshell is being filled?',
        explain:'Ti is a transition metal; its last electrons go into 3d, so it\'s in the d block.' }
    ]
  }
  ]
},

/* ======================================================================
   CHAPTER 7
   ====================================================================== */
{
  id: 'ch7',
  title: 'Chapter 7 · Periodic Properties of the Elements',
  short: 'Periodic Trends',
  blurb: 'Effective nuclear charge, atomic and ionic size, ionization energy, electron affinity, metallic character and group trends.',
  lessons: [

  /* ---------------------------------------------------------------- 7.1 */
  {
    id: '7-1',
    title: '7.1 Development of the Periodic Table',
    body: `
<ul>
  <li><strong>Dmitri Mendeleev</strong> (and Lothar Meyer, independently, 1869) arranged elements by increasing <strong>atomic mass</strong> and grouped elements with similar properties in columns.</li>
  <li>Mendeleev's big move: he left <strong>gaps</strong> for undiscovered elements and <strong>predicted their properties</strong>. When "eka-silicon" (germanium) was found, its properties matched his predictions closely.</li>
  <li>A few elements were out of order by mass (e.g., Ar and K). <strong>Henry Moseley</strong> (1913) used X-ray experiments to show each element has a unique <strong>atomic number</strong> (number of protons). Ordering by atomic number fixed the problem.</li>
</ul>
<h3>Why the table works</h3>
<p>Elements in the same <strong>group (column)</strong> have the same number of electrons in their valence orbitals (the same outer configuration, e.g., ns<sup>2</sup>np<sup>5</sup> for halogens), so they have similar chemistry. The differences within a group come from the valence electrons being in different shells (different n).</p>
<div class="tip">This is the "why" behind the whole chapter: <strong>periodic properties come from periodic electron configurations</strong>.</div>
`,
    questions: [
      { type:'mc', q:'Mendeleev originally arranged the elements in order of increasing…',
        choices:['atomic number','atomic mass','number of valence electrons','ionization energy'], answer:1,
        hint:'Protons hadn\'t been counted yet in 1869.',
        explain:'Mendeleev used atomic mass. The modern table uses atomic number (Moseley).' },
      { type:'mc', q:'Who established that elements should be ordered by atomic number?',
        choices:['Mendeleev','Bohr','Moseley','Planck'], answer:2,
        hint:'X-ray experiments, 1913.',
        explain:'Henry Moseley showed each element has a characteristic atomic number from its X-ray frequencies.' },
      { type:'mc', q:'Why do elements in the same group have similar chemical properties?',
        choices:['They have the same atomic mass','They have the same number of electrons in their valence orbitals','They have the same number of neutrons','They are all metals'], answer:1,
        hint:'Think electron configurations.',
        explain:'Same group = same outer-shell electron arrangement (e.g., all alkali metals are ns<sup>1</sup>).' }
    ]
  },

  /* ---------------------------------------------------------------- 7.2 */
  {
    id: '7-2',
    title: '7.2 Effective Nuclear Charge',
    body: `
<p>A valence electron is attracted to the nucleus but repelled by all the other electrons. The other electrons <strong>shield (screen)</strong> it from the full nuclear charge. The net positive charge it actually "feels" is the <strong>effective nuclear charge</strong>, Z<sub>eff</sub>:</p>
<div class="equation">Z<sub>eff</sub> = Z − S</div>
<p>Z = atomic number (number of protons); S = <strong>screening constant</strong>, roughly the number of electrons between the nucleus and the electron of interest.</p>

<h3>Who shields well?</h3>
<ul>
  <li><strong>Core electrons</strong> shield valence electrons very effectively (count ≈ 1 each).</li>
  <li>Electrons in the <strong>same shell</strong> shield each other poorly.</li>
</ul>
<p>Simple estimate: <strong>S ≈ number of core electrons</strong>.</p>

<div class="example">
  <div class="example-title">Worked example: Na vs. Cl</div>
  <ol>
    <li>Na: Z = 11, [Ne]3s<sup>1</sup> has 10 core electrons → Z<sub>eff</sub> ≈ 11 − 10 = <strong>1</strong></li>
    <li>Cl: Z = 17, [Ne]3s<sup>2</sup>3p<sup>5</sup> has 10 core electrons → Z<sub>eff</sub> ≈ 17 − 10 = <strong>7</strong></li>
    <li>The valence electrons of Cl feel a much stronger pull. That one fact explains why Cl is smaller, harder to ionize, and more eager to gain electrons than Na.</li>
  </ol>
  <p class="small">(More careful calculations give Z<sub>eff</sub> ≈ 2.5 for Na and 6.1 for Cl, since core shielding isn't perfect and same-shell electrons shield a little. The trend is the same.)</p>
</div>

<h3>Trends</h3>
<ul>
  <li><strong>Across a period (left → right): Z<sub>eff</sub> increases.</strong> You add a proton each step, but the new electron goes into the same shell and barely shields.</li>
  <li><strong>Down a group:</strong> Z<sub>eff</sub> on valence electrons stays about the same or increases slightly. The bigger effect going down is that valence electrons are in a higher shell (larger n), farther from the nucleus.</li>
</ul>
<div class="tip">Z<sub>eff</sub> (pull) plus n (distance) explain nearly every trend in this chapter. When in doubt on an exam, reason from these two.</div>
`,
    questions: [
      { type:'num', q:'Using the simple estimate S = number of core electrons, what is Z<sub>eff</sub> for a valence electron of sodium (Z = 11)?',
        answer:1, tol:0, unit:'', display:'1',
        hint:'Na = [Ne]3s¹. How many core electrons does [Ne] contain?',
        explain:'Z<sub>eff</sub> = 11 − 10 = 1.' },
      { type:'num', q:'Using the same simple estimate, what is Z<sub>eff</sub> for a valence electron of chlorine (Z = 17)?',
        answer:7, tol:0, unit:'', display:'7',
        hint:'Cl = [Ne]3s²3p⁵.',
        explain:'Z<sub>eff</sub> = 17 − 10 = 7.' },
      { type:'mc', q:'How does Z<sub>eff</sub> for valence electrons change from left to right across a period?',
        choices:['Increases','Decreases','Stays exactly the same','Increases then decreases'], answer:0,
        hint:'Each step adds a proton, but the new electron is in the same shell.',
        explain:'Nuclear charge rises by 1 each step while shielding by same-shell electrons is weak, so Z<sub>eff</sub> increases.' },
      { type:'mc', q:'Which electrons are the <strong>most</strong> effective at shielding a valence electron?',
        choices:['Other valence electrons in the same shell','Core electrons','Electrons in higher shells','All electrons shield equally'], answer:1,
        hint:'Who\'s sitting between the nucleus and the valence electron?',
        explain:'Core electrons are located between the nucleus and the valence shell, so they screen very effectively.' },
      { type:'mc', q:'Which experiences a greater Z<sub>eff</sub>: a 2p electron in fluorine or a 2p electron in boron?',
        choices:['Fluorine','Boron','They are equal','Cannot be determined'], answer:0,
        hint:'Same shell, same core ([He]), but F has more protons.',
        explain:'Both have a [He] core, but F has Z = 9 vs. B\'s Z = 5, so F\'s valence electrons feel a much larger Z<sub>eff</sub>.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.3 */
  {
    id: '7-3',
    title: '7.3 Sizes of Atoms and Ions',
    body: `
<p>Atoms don't have sharp edges, so we measure size using <strong>bonding atomic radius</strong>: half the distance between two identical bonded atoms (e.g., half the Cl–Cl distance in Cl<sub>2</sub>). Radii are usually given in Å (1 Å = 10<sup>−10</sup> m) or pm.</p>
<p>Handy use: <strong>bond length ≈ sum of the two atomic radii</strong>.</p>

<h3>Atomic radius trends</h3>
<div class="trend-grid">
  <div class="trend-card"><div class="trend-arrow">↓</div><strong>Down a group: increases</strong><p>Valence electrons are in a higher shell (larger n), farther from the nucleus.</p></div>
  <div class="trend-card"><div class="trend-arrow">←</div><strong>Across a period (left → right): decreases</strong><p>Z<sub>eff</sub> increases, pulling the electrons in closer.</p></div>
</div>
<p><strong>Largest atoms:</strong> bottom-left (Cs, Fr). <strong>Smallest:</strong> top-right (He, F, Ne).</p>

<div class="widget" data-widget="trendTable" data-prop="radius"></div>

<h3>Ionic radius</h3>
<ul>
  <li><strong>Cations are smaller than their parent atoms.</strong> Removing electrons cuts electron–electron repulsion, and often removes the whole outer shell (Na → Na<sup>+</sup> loses the 3s shell entirely).</li>
  <li><strong>Anions are larger than their parent atoms.</strong> Adding electrons increases repulsion, so the cloud spreads out (Cl<sup>−</sup> > Cl).</li>
  <li>For ions with the same charge, size increases down a group (Li<sup>+</sup> &lt; Na<sup>+</sup> &lt; K<sup>+</sup>).</li>
</ul>

<h3>Isoelectronic series</h3>
<p>Ions with the <strong>same number of electrons</strong> are isoelectronic. Example (10 electrons each): O<sup>2−</sup>, F<sup>−</sup>, Na<sup>+</sup>, Mg<sup>2+</sup>, Al<sup>3+</sup>.</p>
<p>Same electrons, but more protons pull them in tighter. So <strong>size decreases as nuclear charge increases</strong>:</p>
<div class="equation">O<sup>2−</sup> &gt; F<sup>−</sup> &gt; Na<sup>+</sup> &gt; Mg<sup>2+</sup> &gt; Al<sup>3+</sup></div>

<div class="example">
  <div class="example-title">Worked example: estimating a bond length</div>
  <p>Given radii C = 0.76 Å and Cl = 1.02 Å, estimate the C–Cl bond length in CCl<sub>4</sub>.</p>
  <ol><li>C–Cl ≈ 0.76 + 1.02 = <strong>1.78 Å</strong> (measured value: 1.77 Å).</li></ol>
</div>
`,
    questions: [
      { type:'mc', q:'Which atom is the <strong>largest</strong>?',
        choices:['K','Ca','Rb','Sr'], answer:2,
        hint:'Bigger going down, and bigger going left.',
        explain:'Rb is lowest (period 5) and farthest left (group 1A) of the choices.' },
      { type:'mc', q:'Which list is in order of <strong>increasing</strong> atomic radius?',
        choices:['S < O < F','F < O < S','O < F < S','F < S < O'], answer:1,
        hint:'F and O are in period 2 (F is further right). S is below O.',
        explain:'F is smaller than O (further right, higher Z<sub>eff</sub>); S is larger than O (one shell lower). So F < O < S.' },
      { type:'mc', q:'How does the radius of Na<sup>+</sup> compare to that of a Na atom?',
        choices:['Na<sup>+</sup> is larger','Na<sup>+</sup> is smaller','They are the same','Depends on temperature'], answer:1,
        hint:'Na → Na⁺ removes the only electron in the n = 3 shell.',
        explain:'Cations are smaller than their parent atoms. Na<sup>+</sup> has lost its entire 3s shell.' },
      { type:'mc', q:'Which ion in this isoelectronic series is the <strong>largest</strong>: O<sup>2−</sup>, F<sup>−</sup>, Na<sup>+</sup>, Mg<sup>2+</sup>?',
        choices:['O<sup>2−</sup>','F<sup>−</sup>','Na<sup>+</sup>','Mg<sup>2+</sup>'], answer:0,
        hint:'All have 10 electrons. Which has the fewest protons pulling on them?',
        explain:'O<sup>2−</sup> has only 8 protons holding 10 electrons, so it\'s the biggest.' },
      { type:'num', q:'Using atomic radii C = 0.76 Å and Cl = 1.02 Å, estimate the C–Cl bond length (in Å).',
        answer:1.78, tol:0.01, unit:'Å', display:'1.78 Å',
        hint:'Bond length ≈ sum of the two radii.',
        explain:'0.76 + 1.02 = 1.78 Å.' },
      { type:'mc', q:'Which is larger, a Cl atom or a Cl<sup>−</sup> ion?',
        choices:['Cl atom','Cl<sup>−</sup> ion','Same size','Can\'t compare atoms and ions'], answer:1,
        hint:'Anions vs. parent atoms…',
        explain:'Adding an electron increases repulsion and spreads the electron cloud, so anions are larger than their parent atoms.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.4 */
  {
    id: '7-4',
    title: '7.4 Ionization Energy',
    body: `
<p>The <strong>ionization energy (IE)</strong> is the minimum energy needed to remove an electron from a <strong>gaseous</strong> atom or ion:</p>
<div class="equation">Na(g) → Na<sup>+</sup>(g) + e<sup>−</sup> &nbsp;&nbsp; I<sub>1</sub> = 496 kJ/mol</div>
<p>I<sub>1</sub> = first ionization energy, I<sub>2</sub> = removing a second electron, and so on. IE is always <strong>positive</strong> (it always takes energy). <strong>Larger IE = harder to remove the electron.</strong></p>

<h3>Successive ionization energies</h3>
<p>I<sub>1</sub> &lt; I<sub>2</sub> &lt; I<sub>3</sub> … (it's harder to pull an electron from something that's already positive). There's a <strong>huge jump</strong> once you start removing <strong>core electrons</strong>.</p>
<table class="data">
  <tr><th>Element</th><th>I<sub>1</sub></th><th>I<sub>2</sub></th><th>I<sub>3</sub></th><th>I<sub>4</sub></th></tr>
  <tr><td>Na</td><td>496</td><td class="jump">4562</td><td>6912</td><td>9543</td></tr>
  <tr><td>Mg</td><td>738</td><td>1451</td><td class="jump">7733</td><td>10,540</td></tr>
  <tr><td>Al</td><td>578</td><td>1817</td><td>2745</td><td class="jump">11,577</td></tr>
</table>
<p class="small">Values in kJ/mol. Highlighted = first core electron. The jump tells you the number of valence electrons: Na 1, Mg 2, Al 3.</p>

<h3>Periodic trend in I<sub>1</sub>: opposite of atomic radius</h3>
<div class="trend-grid">
  <div class="trend-card"><div class="trend-arrow">↑</div><strong>Up a group: increases</strong><p>Electron is closer to the nucleus (smaller n), so it's held more tightly.</p></div>
  <div class="trend-card"><div class="trend-arrow">→</div><strong>Across a period: increases</strong><p>Z<sub>eff</sub> increases, so the electron is held more tightly.</p></div>
</div>
<p><strong>Highest I<sub>1</sub>:</strong> He, then Ne (top-right). <strong>Lowest:</strong> Cs, Fr (bottom-left).</p>

<div class="widget" data-widget="trendTable" data-prop="ie"></div>

<h3>The two "dips" across a period (know these!)</h3>
<ul>
  <li><strong>Group 2A → 3A (Be > B, Mg > Al):</strong> the electron removed from B is a 2p electron, which is higher in energy and better shielded than a 2s electron.</li>
  <li><strong>Group 5A → 6A (N > O, P > S):</strong> in O (2p<sup>4</sup>), the electron removed is the one that's <strong>paired</strong>. Electron–electron repulsion in that orbital makes it easier to remove.</li>
</ul>

<h3>Electron configurations of ions</h3>
<ul>
  <li><strong>Cations:</strong> remove electrons from the orbital with the <strong>highest n first</strong>. For transition metals, <strong>4s electrons leave before 3d</strong>, even though 4s filled first. If two subshells share the same n (like 4s and 4p), remove from higher l (4p) first.</li>
  <li><strong>Anions:</strong> add electrons to the next empty or partly filled orbital.</li>
</ul>
<div class="example">
  <div class="example-title">Worked example: Fe<sup>2+</sup> and Fe<sup>3+</sup></div>
  <ol>
    <li>Fe = [Ar]4s<sup>2</sup>3d<sup>6</sup></li>
    <li>Fe<sup>2+</sup>: remove both 4s electrons → <strong>[Ar]3d<sup>6</sup></strong> (NOT [Ar]4s<sup>2</sup>3d<sup>4</sup>)</li>
    <li>Fe<sup>3+</sup>: remove one more, from 3d → <strong>[Ar]3d<sup>5</sup></strong></li>
  </ol>
</div>
`,
    questions: [
      { type:'mc', q:'Which atom has the <strong>highest</strong> first ionization energy?',
        choices:['Na','Ar','F','Ne'], answer:3,
        hint:'Highest IE: top-right of the table.',
        explain:'Ne is a period-2 noble gas: small, with high Z<sub>eff</sub>. Its I<sub>1</sub> (2081 kJ/mol) beats F (1681) and Ar (1521).' },
      { type:'mc', q:'An element has I<sub>1</sub> = 738, I<sub>2</sub> = 1451, I<sub>3</sub> = 7733 kJ/mol. Which element is it most likely to be?',
        choices:['Na','Mg','Al','Si'], answer:1,
        hint:'Where is the big jump? That tells you how many valence electrons it has.',
        explain:'The jump comes after the 2nd electron, so it has 2 valence electrons: a group 2A element, Mg.' },
      { type:'mc', q:'Why is the first ionization energy of oxygen <strong>lower</strong> than that of nitrogen?',
        choices:['O has a smaller Z<sub>eff</sub> than N','In O, the electron removed is paired, and repulsion makes it easier to remove','O\'s electron is removed from 2s','O is larger than N'], answer:1,
        hint:'Draw the 2p orbital diagrams: N is ↑ ↑ ↑, O is ↑↓ ↑ ↑.',
        explain:'O\'s fourth 2p electron shares an orbital with another electron. That extra repulsion makes it easier to remove than any of N\'s unpaired 2p electrons.' },
      { type:'mc', q:'Why is the first ionization energy of boron <strong>lower</strong> than that of beryllium?',
        choices:['B\'s removed electron is in 2p, which is higher in energy and more shielded than 2s','B has fewer protons','B has a paired electron in 2p','Be is a metal'], answer:0,
        hint:'Be: 2s². B: 2s²2p¹. Which subshell does the removed electron come from?',
        explain:'The 2p electron in B is higher in energy (less penetrating, more shielded) than the 2s electrons in Be, so it\'s easier to remove.' },
      { type:'mc', q:'What is the electron configuration of Fe<sup>3+</sup>?',
        choices:['[Ar]4s<sup>2</sup>3d<sup>3</sup>','[Ar]3d<sup>5</sup>','[Ar]4s<sup>1</sup>3d<sup>4</sup>','[Ar]3d<sup>6</sup>'], answer:1,
        hint:'Fe = [Ar]4s²3d⁶. Remove 4s electrons first, then 3d.',
        explain:'Remove 2 from 4s and 1 from 3d: [Ar]3d<sup>5</sup>.' },
      { type:'mc', q:'What is the electron configuration of Sn<sup>2+</sup>? (Sn = [Kr]5s<sup>2</sup>4d<sup>10</sup>5p<sup>2</sup>)',
        choices:['[Kr]4d<sup>10</sup>5p<sup>2</sup>','[Kr]5s<sup>2</sup>4d<sup>10</sup>','[Kr]5s<sup>2</sup>4d<sup>8</sup>5p<sup>2</sup>','[Kr]4d<sup>10</sup>5s<sup>1</sup>5p<sup>1</sup>'], answer:1,
        hint:'5s and 5p have the same n. Which goes first: higher l.',
        explain:'Remove from 5p before 5s (same n, higher l first): Sn<sup>2+</sup> = [Kr]5s<sup>2</sup>4d<sup>10</sup>.' },
      { type:'num', q:'How many unpaired electrons does Co<sup>2+</sup> have? (Co = [Ar]4s<sup>2</sup>3d<sup>7</sup>)',
        answer:3, tol:0, unit:'unpaired e⁻', display:'3',
        hint:'Co²⁺ = [Ar]3d⁷. Fill five d orbitals singly first, then pair.',
        explain:'3d<sup>7</sup>: [↑↓][↑↓][↑][↑][↑] → 3 unpaired electrons.' },
      { type:'mc', q:'Which list is in order of <strong>increasing</strong> first ionization energy?',
        choices:['Na < K < Cs','Cs < K < Na','K < Cs < Na','Na < Cs < K'], answer:1,
        hint:'IE decreases going down a group.',
        explain:'Cs (bottom) is easiest to ionize and Na (top of these) is hardest: Cs < K < Na.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.5 */
  {
    id: '7-5',
    title: '7.5 Electron Affinity',
    body: `
<p><strong>Electron affinity (EA)</strong> is the energy change when an electron is <strong>added</strong> to a gaseous atom:</p>
<div class="equation">Cl(g) + e<sup>−</sup> → Cl<sup>−</sup>(g) &nbsp;&nbsp; ΔE = −349 kJ/mol</div>

<h3>Reading the sign</h3>
<ul>
  <li><strong>Negative EA</strong>: energy is <strong>released</strong>; the anion is stable. <strong>More negative = greater attraction for the electron.</strong></li>
  <li><strong>Positive EA</strong>: energy must be added; the anion is not stable (e.g., noble gases, Be, Mg, N).</li>
</ul>
<div class="tip"><strong>Don't mix these up:</strong> IE is about <em>removing</em> an electron from an atom (always positive). EA is about <em>adding</em> one (can be either sign).</div>

<h3>Trends</h3>
<ul>
  <li><strong>Generally becomes more negative left → right</strong> across a period, as Z<sub>eff</sub> increases.</li>
  <li><strong>Halogens (7A) have the most negative EAs.</strong> Adding one electron completes their p subshell (ns<sup>2</sup>np<sup>6</sup>).</li>
  <li>Down a group, EA changes only a little (much weaker trend than IE or radius).</li>
</ul>

<div class="widget" data-widget="trendTable" data-prop="ea"></div>

<h3>The irregularities, explained by configurations</h3>
<ul>
  <li><strong>Noble gases (8A): positive.</strong> The added electron would have to go into a new, higher shell.</li>
  <li><strong>Group 2A (Be, Mg): positive or near zero.</strong> ns<sup>2</sup> is filled, so the added electron goes into the higher-energy np subshell.</li>
  <li><strong>Group 5A (N): positive; P, As less negative than neighbors.</strong> The half-filled np<sup>3</sup> is relatively stable, and the added electron must pair up.</li>
</ul>
<p class="small">Fun fact: Cl (−349) is slightly more negative than F (−328). F is so small that the added electron feels strong repulsion from F's other electrons.</p>
`,
    questions: [
      { type:'mc', q:'Which element has the <strong>most negative</strong> electron affinity?',
        choices:['F','Cl','Br','O'], answer:1,
        hint:'Halogens have the most negative EAs, but F is a famous exception.',
        explain:'Cl (−349 kJ/mol) is slightly more negative than F (−328), because F\'s small size causes extra electron–electron repulsion.' },
      { type:'mc', q:'Why do the noble gases have <strong>positive</strong> electron affinities?',
        choices:['They have very low Z<sub>eff</sub>','An added electron would have to enter a new, higher-energy shell','They are gases','They already have negative charges'], answer:1,
        hint:'Their s and p subshells are full.',
        explain:'With ns<sup>2</sup>np<sup>6</sup> complete, the added electron would have to go into the next shell, far from the nucleus and well shielded, so the anion is unstable.' },
      { type:'mc', q:'A negative electron affinity means…',
        choices:['energy is absorbed and the anion is unstable','energy is released and the anion is stable','the atom loses an electron','the atom is a metal'], answer:1,
        hint:'Negative ΔE = exothermic.',
        explain:'Negative EA: adding the electron releases energy, so the anion is lower in energy (stable) than the atom + free electron.' },
      { type:'mc', q:'Why does nitrogen have a positive EA while carbon\'s is negative (−122 kJ/mol)?',
        choices:['N\'s half-filled 2p<sup>3</sup> is stable, and an added electron must pair up','N has a lower Z<sub>eff</sub> than C','C is a metal','N is larger than C'], answer:0,
        hint:'Compare orbital diagrams: C is 2p² (one empty orbital), N is 2p³.',
        explain:'C can place the new electron in its empty 2p orbital. N\'s 2p orbitals each already hold one electron, so the new one must pair, which costs repulsion energy.' },
      { type:'mc', q:'Which group generally has electron affinities that are positive or close to zero because the added electron must go into a p subshell?',
        choices:['1A','2A','6A','7A'], answer:1,
        hint:'Which group has a filled ns² subshell and an empty np?',
        explain:'Group 2A (ns<sup>2</sup>): the added electron must enter the higher-energy np subshell.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.6 */
  {
    id: '7-6',
    title: '7.6 Metals, Nonmetals, and Metalloids',
    body: `
<div class="widget" data-widget="metalMap"></div>

<h3>Metallic character</h3>
<p>Metallic character (how much an element behaves like a metal) <strong>increases going down a group</strong> and <strong>decreases going left → right</strong>. It follows the same direction as atomic radius and the opposite direction of ionization energy: metals have low IEs, so they lose electrons easily.</p>

<table class="data">
  <tr><th></th><th>Metals</th><th>Nonmetals</th></tr>
  <tr><td>Location</td><td>Left and middle (most elements)</td><td>Upper right (+ H)</td></tr>
  <tr><td>Look</td><td>Shiny (luster), malleable, ductile</td><td>Dull, brittle if solid; many are gases</td></tr>
  <tr><td>Conductivity</td><td>Good conductors of heat and electricity</td><td>Poor conductors (insulators)</td></tr>
  <tr><td>Ions formed</td><td>Lose e<sup>−</sup> → <strong>cations</strong> (get oxidized)</td><td>Gain e<sup>−</sup> → <strong>anions</strong> (when reacting with metals)</td></tr>
  <tr><td>Compounds</td><td>With nonmetals: <strong>ionic</strong></td><td>With other nonmetals: <strong>molecular</strong></td></tr>
  <tr><td>Oxides</td><td><strong>Basic</strong>: react with acids</td><td><strong>Acidic</strong>: react with bases</td></tr>
</table>
<p><strong>Metalloids</strong> (B, Si, Ge, As, Sb, Te) lie along the staircase line and have in-between properties. Si, for example, looks metallic but is a semiconductor.</p>

<h3>Oxide reactions you should be able to write</h3>
<p><strong>Metal oxide + water → metal hydroxide</strong> (basic):</p>
<div class="equation">Na<sub>2</sub>O(s) + H<sub>2</sub>O(l) → 2 NaOH(aq)</div>
<p><strong>Metal oxide + acid → salt + water:</strong></p>
<div class="equation">NiO(s) + 2 HNO<sub>3</sub>(aq) → Ni(NO<sub>3</sub>)<sub>2</sub>(aq) + H<sub>2</sub>O(l)</div>
<p><strong>Nonmetal oxide + water → acid</strong> (acidic):</p>
<div class="equation">CO<sub>2</sub>(g) + H<sub>2</sub>O(l) → H<sub>2</sub>CO<sub>3</sub>(aq) &nbsp;&nbsp;&nbsp; SO<sub>3</sub>(g) + H<sub>2</sub>O(l) → H<sub>2</sub>SO<sub>4</sub>(aq)</div>
<p><strong>Nonmetal oxide + base → salt + water:</strong></p>
<div class="equation">CO<sub>2</sub>(g) + 2 NaOH(aq) → Na<sub>2</sub>CO<sub>3</sub>(aq) + H<sub>2</sub>O(l)</div>
<div class="tip">Metals have low ionization energies, which is why they are oxidized (lose electrons) in reactions. Most transition metals form more than one cation (e.g., Fe<sup>2+</sup>, Fe<sup>3+</sup>).</div>
`,
    questions: [
      { type:'mc', q:'Which element has the greatest <strong>metallic character</strong>?',
        choices:['Al','Si','Cs','Ba'], answer:2,
        hint:'Metallic character increases down and to the left.',
        explain:'Cs is the farthest down and to the left of the choices.' },
      { type:'mc', q:'Which is the correctly balanced reaction of magnesium oxide with hydrochloric acid?',
        choices:['MgO + HCl → MgCl + H<sub>2</sub>O','MgO + 2 HCl → MgCl<sub>2</sub> + H<sub>2</sub>O','MgO + 2 HCl → MgCl<sub>2</sub> + H<sub>2</sub>','MgO + H<sub>2</sub>O → MgCl<sub>2</sub>'], answer:1,
        hint:'Metal oxide + acid → salt + water. Mg forms Mg²⁺.',
        explain:'MgO is a basic oxide: MgO + 2 HCl → MgCl<sub>2</sub> + H<sub>2</sub>O.' },
      { type:'mc', q:'When SO<sub>3</sub> dissolves in water, the solution is…',
        choices:['basic, forming a hydroxide','acidic, forming H<sub>2</sub>SO<sub>4</sub>','neutral','basic, forming SO<sub>3</sub><sup>2−</sup>'], answer:1,
        hint:'S is a nonmetal. Nonmetal oxides are…',
        explain:'Nonmetal oxides are acidic: SO<sub>3</sub> + H<sub>2</sub>O → H<sub>2</sub>SO<sub>4</sub>.' },
      { type:'mc', q:'Which element is a <strong>metalloid</strong>?',
        choices:['Al','Si','P','C'], answer:1,
        hint:'Metalloids sit along the staircase: B, Si, Ge, As, Sb, Te.',
        explain:'Silicon is a metalloid (a semiconductor). Al is a metal; P and C are nonmetals.' },
      { type:'mc', q:'Which correctly describes metals in reactions with nonmetals?',
        choices:['They gain electrons and form anions','They lose electrons, are oxidized, and form cations','They share electrons to form molecules','They do not react'], answer:1,
        hint:'Metals have low ionization energies.',
        explain:'Metals lose electrons easily (low IE), so they are oxidized to cations, typically forming ionic compounds.' },
      { type:'mc', q:'Which is the correctly balanced reaction of CO<sub>2</sub> with aqueous NaOH?',
        choices:['CO<sub>2</sub> + NaOH → NaCO<sub>2</sub> + OH','CO<sub>2</sub> + 2 NaOH → Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O','CO<sub>2</sub> + 2 NaOH → 2 NaCO + H<sub>2</sub>O<sub>2</sub>','CO<sub>2</sub> + NaOH → Na + H<sub>2</sub>CO<sub>3</sub>'], answer:1,
        hint:'Acidic oxide + base → salt + water. Carbonate is CO₃²⁻.',
        explain:'CO<sub>2</sub> + 2 NaOH → Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.7 */
  {
    id: '7-7',
    title: '7.7 Trends for Group 1A and Group 2A Metals',
    body: `
<h3>Group 1A: alkali metals (Li, Na, K, Rb, Cs)</h3>
<ul>
  <li>Soft, low density, low melting points, shiny when freshly cut.</li>
  <li>Configuration <strong>ns<sup>1</sup></strong> gives the <strong>lowest ionization energies</strong> of any group, so they're <strong>extremely reactive</strong>. They lose 1 electron to form <strong>1+ ions</strong>.</li>
  <li><strong>Reactivity increases going down</strong> (lower IE). Cs is more reactive than Na.</li>
  <li>Never found free in nature; stored under oil.</li>
</ul>
<p><strong>Key reactions (M = alkali metal):</strong></p>
<div class="equation">2 M(s) + 2 H<sub>2</sub>O(l) → 2 MOH(aq) + H<sub>2</sub>(g)</div>
<p class="small">Very exothermic. K and heavier can ignite the H<sub>2</sub>. The solution is basic (MOH).</p>
<div class="equation">2 M(s) + H<sub>2</sub>(g) → 2 MH(s) &nbsp;&nbsp;&nbsp;(metal hydride: contains H<sup>−</sup>)</div>
<div class="equation">2 M(s) + Cl<sub>2</sub>(g) → 2 MCl(s)</div>
<p><strong>With oxygen</strong>, the products differ:</p>
<table class="data compact">
  <tr><th>Li</th><td>4 Li + O<sub>2</sub> → 2 Li<sub>2</sub>O</td><td>oxide, O<sup>2−</sup></td></tr>
  <tr><th>Na</th><td>2 Na + O<sub>2</sub> → Na<sub>2</sub>O<sub>2</sub></td><td>peroxide, O<sub>2</sub><sup>2−</sup></td></tr>
  <tr><th>K, Rb, Cs</th><td>K + O<sub>2</sub> → KO<sub>2</sub></td><td>superoxide, O<sub>2</sub><sup>−</sup></td></tr>
</table>
<p><strong>Flame colors:</strong> Li = crimson red, Na = yellow, K = lilac/violet.</p>

<h3>Group 2A: alkaline earth metals (Be, Mg, Ca, Sr, Ba)</h3>
<ul>
  <li>Harder, denser, and higher melting than alkali metals.</li>
  <li>Configuration <strong>ns<sup>2</sup></strong>: they lose 2 electrons to form <strong>2+ ions</strong>.</li>
  <li><strong>Less reactive than group 1A</strong> (higher IEs), but reactivity still <strong>increases going down</strong>. Be doesn't react with water; Mg reacts only with steam; Ca and below react with cold water:</li>
</ul>
<div class="equation">Ca(s) + 2 H<sub>2</sub>O(l) → Ca(OH)<sub>2</sub>(aq) + H<sub>2</sub>(g)</div>
<div class="equation">Mg(s) + Cl<sub>2</sub>(g) → MgCl<sub>2</sub>(s) &nbsp;&nbsp;&nbsp; 2 Mg(s) + O<sub>2</sub>(g) → 2 MgO(s)</div>
<div class="tip">Ca<sup>2+</sup> and Mg<sup>2+</sup> are essential in living things (bones, teeth, chlorophyll), and Na<sup>+</sup>/K<sup>+</sup> carry nerve signals.</div>
`,
    questions: [
      { type:'mc', q:'What are the products when potassium reacts with water?',
        choices:['K<sub>2</sub>O and H<sub>2</sub>','KOH and H<sub>2</sub>','KOH and O<sub>2</sub>','KH and O<sub>2</sub>'], answer:1,
        hint:'Alkali metal + water → metal hydroxide + hydrogen gas.',
        explain:'2 K + 2 H<sub>2</sub>O → 2 KOH + H<sub>2</sub>.' },
      { type:'mc', q:'Potassium burns in oxygen to form mainly…',
        choices:['K<sub>2</sub>O (oxide)','K<sub>2</sub>O<sub>2</sub> (peroxide)','KO<sub>2</sub> (superoxide)','KOH'], answer:2,
        hint:'Li → oxide, Na → peroxide, K/Rb/Cs → ?',
        explain:'K, Rb, and Cs form superoxides (O<sub>2</sub><sup>−</sup>): K + O<sub>2</sub> → KO<sub>2</sub>.' },
      { type:'mc', q:'Why are alkali metals more reactive than alkaline earth metals?',
        choices:['They have higher ionization energies','They have lower ionization energies, losing their single ns electron easily','They are denser','They have more valence electrons'], answer:1,
        hint:'Reactivity of metals ↔ how easily they lose electrons.',
        explain:'Group 1A metals have the lowest IEs of all elements; group 2A must lose 2 electrons and has higher IEs.' },
      { type:'mc', q:'Which is the balanced equation for calcium reacting with water?',
        choices:['Ca + H<sub>2</sub>O → CaO + H<sub>2</sub>','Ca + 2 H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub>','2 Ca + H<sub>2</sub>O → Ca<sub>2</sub>O + H<sub>2</sub>','Ca + H<sub>2</sub>O → CaOH + H'], answer:1,
        hint:'Ca forms Ca²⁺, so it needs two OH⁻.',
        explain:'Ca + 2 H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub>.' },
      { type:'mc', q:'Which alkali metal is the <strong>most</strong> reactive?',
        choices:['Li','Na','K','Cs'], answer:3,
        hint:'Reactivity tracks low ionization energy.',
        explain:'IE decreases down the group, so Cs is the most reactive of these.' },
      { type:'mc', q:'Sodium reacts with hydrogen gas to form NaH. What ion does hydrogen form in this compound?',
        choices:['H<sup>+</sup>','H<sup>−</sup> (hydride)','H<sub>2</sub><sup>+</sup>','No ion; it\'s molecular'], answer:1,
        hint:'Na is a metal, so it becomes Na⁺.',
        explain:'NaH is ionic: Na<sup>+</sup> and the hydride ion H<sup>−</sup>.' }
    ]
  },

  /* ---------------------------------------------------------------- 7.8 */
  {
    id: '7-8',
    title: '7.8 Trends for Selected Nonmetals',
    body: `
<h3>Hydrogen</h3>
<ul>
  <li>Configuration 1s<sup>1</sup>, so it sits above group 1A, but it is a <strong>nonmetal</strong> and doesn't really belong to any group.</li>
  <li>Very high IE compared to alkali metals (1312 kJ/mol). It forms <strong>molecular compounds with nonmetals</strong> (H<sub>2</sub>O, HCl), and can be H<sup>+</sup> (in acids) or H<sup>−</sup> (hydride, with active metals).</li>
  <li>2 H<sub>2</sub>(g) + O<sub>2</sub>(g) → 2 H<sub>2</sub>O(l), a very exothermic reaction.</li>
</ul>

<h3>Group 6A: oxygen and sulfur</h3>
<ul>
  <li>Oxygen has two <strong>allotropes</strong> (forms of the same element): <strong>O<sub>2</sub></strong> and <strong>ozone, O<sub>3</sub></strong>. Ozone is less stable and more reactive.</li>
  <li>Oxygen strongly pulls electrons from other elements (oxidizes them). In compounds with metals it's usually the <strong>oxide ion O<sup>2−</sup></strong>, but also <strong>peroxide O<sub>2</sub><sup>2−</sup></strong> (H<sub>2</sub>O<sub>2</sub>, Na<sub>2</sub>O<sub>2</sub>) and <strong>superoxide O<sub>2</sub><sup>−</sup></strong> (KO<sub>2</sub>).</li>
  <li>Sulfur is a yellow solid, most commonly as ring-shaped <strong>S<sub>8</sub></strong> molecules. With metals it forms the <strong>sulfide ion S<sup>2−</sup></strong>.</li>
  <li>Metallic character increases down the group: O and S are nonmetals, Se and Te less so, Te is a metalloid, Po is a metal.</li>
</ul>

<h3>Group 7A: halogens (F, Cl, Br, I)</h3>
<ul>
  <li>Exist as <strong>diatomic molecules</strong>: F<sub>2</sub>, Cl<sub>2</sub> (gases), Br<sub>2</sub> (liquid), I<sub>2</sub> (solid). Melting/boiling points increase down the group.</li>
  <li><strong>Most negative electron affinities</strong> → they readily gain an electron to form <strong>1− ions</strong> (halides), especially with metals: 2 Na + Cl<sub>2</sub> → 2 NaCl.</li>
  <li><strong>Reactivity decreases going down</strong>: F<sub>2</sub> is the most reactive element of all, and a very strong oxidizing agent.</li>
  <li>Chlorine in water: Cl<sub>2</sub> + H<sub>2</sub>O ⇌ HCl + HOCl (hypochlorous acid, a disinfectant).</li>
</ul>

<h3>Group 8A: noble gases (He, Ne, Ar, Kr, Xe, Rn)</h3>
<ul>
  <li>Monatomic gases with completely filled s and p subshells, giving very high IEs and positive EAs. So they're <strong>very unreactive</strong>.</li>
  <li>Only the heaviest (Kr, Xe) form compounds, and only with very reactive nonmetals like F and O: <strong>XeF<sub>2</sub>, XeF<sub>4</sub>, XeF<sub>6</sub></strong>, KrF<sub>2</sub>. (First noble-gas compound: 1962.)</li>
</ul>

<table class="data">
  <tr><th>Group</th><th>Trend down the group</th><th>Typical ion</th></tr>
  <tr><td>1A</td><td>More reactive</td><td>1+</td></tr>
  <tr><td>2A</td><td>More reactive</td><td>2+</td></tr>
  <tr><td>6A</td><td>More metallic</td><td>2− (O<sup>2−</sup>, S<sup>2−</sup>)</td></tr>
  <tr><td>7A</td><td><strong>Less</strong> reactive</td><td>1−</td></tr>
  <tr><td>8A</td><td>Very unreactive; heaviest form a few compounds</td><td>—</td></tr>
</table>
`,
    questions: [
      { type:'mc', q:'Which statement about hydrogen is correct?',
        choices:['It is an alkali metal because it is 1s<sup>1</sup>','It is a nonmetal that forms molecular compounds with other nonmetals','It has a lower IE than Na','It always forms H<sup>+</sup>'], answer:1,
        hint:'It\'s placed above Li, but does it behave like Li?',
        explain:'Hydrogen is a nonmetal with a high IE. It forms molecular compounds (H<sub>2</sub>O, HCl) and can be H<sup>+</sup> or H<sup>−</sup>.' },
      { type:'mc', q:'O<sub>2</sub> and O<sub>3</sub> are examples of…',
        choices:['isotopes','allotropes','isoelectronic species','ions'], answer:1,
        hint:'Same element, different molecular forms.',
        explain:'Allotropes are different forms of the same element in the same state. Ozone (O<sub>3</sub>) is an allotrope of oxygen.' },
      { type:'mc', q:'Which halogen is the <strong>most reactive</strong>?',
        choices:['F<sub>2</sub>','Cl<sub>2</sub>','Br<sub>2</sub>','I<sub>2</sub>'], answer:0,
        hint:'For halogens, reactivity goes the opposite way from alkali metals.',
        explain:'Halogen reactivity decreases down the group. F<sub>2</sub> is the most reactive of all elements.' },
      { type:'mc', q:'What is the most common molecular form of elemental sulfur?',
        choices:['S<sub>2</sub>','S<sub>4</sub>','S<sub>6</sub>','S<sub>8</sub>'], answer:3,
        hint:'It\'s a crown-shaped ring.',
        explain:'Sulfur is most commonly found as S<sub>8</sub> rings.' },
      { type:'mc', q:'Which noble gas compound actually exists?',
        choices:['NeF<sub>2</sub>','HeCl<sub>2</sub>','XeF<sub>4</sub>','ArO<sub>3</sub>'], answer:2,
        hint:'Only the heaviest noble gases react, and only with very reactive nonmetals like F.',
        explain:'XeF<sub>4</sub> (and XeF<sub>2</sub>, XeF<sub>6</sub>) are known. He, Ne and Ar form no stable compounds like these.' },
      { type:'mc', q:'In sodium peroxide, Na<sub>2</sub>O<sub>2</sub>, oxygen is present as…',
        choices:['O<sup>2−</sup> (oxide)','O<sub>2</sub><sup>2−</sup> (peroxide)','O<sub>2</sub><sup>−</sup> (superoxide)','O<sub>3</sub> (ozone)'], answer:1,
        hint:'Two Na⁺ balance one ion with what charge?',
        explain:'Two Na<sup>+</sup> balance one peroxide ion, O<sub>2</sub><sup>2−</sup>.' },
      { type:'mc', q:'At room temperature, bromine is a…',
        choices:['monatomic gas','diatomic gas','diatomic liquid','diatomic solid'], answer:2,
        hint:'F₂ and Cl₂ are gases, I₂ is a solid…',
        explain:'Br<sub>2</sub> is one of only two elements that is a liquid at room temperature (the other is Hg).' }
    ]
  }
  ]
}
];
