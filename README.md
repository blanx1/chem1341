# CHEM 1341 Study Guide: Atoms & Periodic Trends

A study site for CHEM 1341 (General Chemistry I) at Texas State. It covers Chapters 6 and 7 of *Chemistry: The Central Science* (Brown et al., 12th ed.):

- **Chapter 6, Quantum Model of the Atom:** light, photons, the Bohr model, matter waves, quantum numbers, orbitals and electron configurations
- **Chapter 7, Periodic Trends:** Z_eff, atomic and ionic size, ionization energy, electron affinity, metals vs. nonmetals, and group trends

## Features
- 17 lessons with worked examples and interactive tools: Bohr transition explorer, electron configuration builder, periodic-trend heat maps, orbital shapes
- 96 practice questions in a Khan Academy style, with Check, Hint, Show answer, **Skip**, and an explanation for every question
- Numeric answers are graded with rounding tolerance and accept `4.74e14`, `4.74x10^14`, and similar formats
- **Review mode** (toggle in the top right) shows every question already answered, for studying without practicing
- Chapter quizzes with 10 random questions each
- Progress saved in your browser
- A one-page cheat sheet you can print
- **Topic search** in the header (press `/` to jump to it). Type a keyword like "Hund", "isoelectronic" or "IE" to see matching lessons, sections and worked examples; clicking one scrolls straight to that section and highlights it. It understands common abbreviations (IE, EA, Zeff, λ…), and new lessons are indexed automatically.

## Put it on GitHub Pages
1. Create a new repository on GitHub, for example `chem1341`.
2. Upload everything in this folder (`index.html`, `css/`, `js/`, `README.md`). Keep the folder structure.
3. In the repo, go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then click **Save**.
4. After a minute or so, the site is live at `https://<your-username>.github.io/chem1341/`.

You can also open `index.html` directly in a browser. There's no build step and no dependencies.

## Adding chapters or questions
All content lives in `js/content.js`. Each lesson has a `body` (HTML) and a list of `questions`. To add a question, copy an existing one:

```js
{ type:'mc', q:'Question text', choices:['A','B','C','D'], answer:1, hint:'...', explain:'...' }
{ type:'num', q:'Question text', answer:4.74e14, tol:0.02, unit:'s⁻¹', display:'4.74 × 10<sup>14</sup>', hint:'...', explain:'...' }
```

`answer` for multiple choice is the 0-based index of the correct choice. `tol` is the relative tolerance (0.02 = ±2%), and `0` means the answer must match exactly.

To add a new chapter, add another object to the `COURSE` array and a matching tab link in `index.html`.
