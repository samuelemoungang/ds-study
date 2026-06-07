/* app.js — Data Science Study Hub logic */
(function () {
  "use strict";

  // ---- i18n -----------------------------------------------------------------
  let LANG = localStorage.getItem("ds_lang") || "en";
  const T = {
    en: {
      tagline: "Study hub · HES-SO Valais · Technologies du Vivant",
      sub: "Theory quizzes & code completion drills built from your lecture slides.",
      modules: "Modules",
      all: "All modules",
      quiz: "Theory quiz",
      code: "Fill the code",
      start: "Start",
      check: "Check",
      next: "Next",
      retry: "Retry",
      back: "← Back",
      score: "Score",
      correct: "Correct!",
      wrong: "Not quite.",
      answer: "Answer",
      hint: "Hint",
      done: "Done!",
      youScored: "You scored",
      outOf: "out of",
      reveal: "Reveal solution",
      questionsLbl: "questions",
      drillsLbl: "code drills",
      pickMode: "Choose a study mode",
      progress: "Progress",
      empty: "Type your answers in the blanks, then press Check.",
      perfect: "Perfect run! 🎉",
      keepGoing: "Review the misses and try again.",
      mixHint: "Tip: blanks are case-sensitive for code."
    },
    fr: {
      tagline: "Plateforme de révision · HES-SO Valais · Technologies du Vivant",
      sub: "Quiz théoriques et exercices de complétion de code issus de vos diapositives.",
      modules: "Modules",
      all: "Tous les modules",
      quiz: "Quiz théorique",
      code: "Compléter le code",
      start: "Commencer",
      check: "Vérifier",
      next: "Suivant",
      retry: "Recommencer",
      back: "← Retour",
      score: "Score",
      correct: "Correct !",
      wrong: "Pas tout à fait.",
      answer: "Réponse",
      hint: "Indice",
      done: "Terminé !",
      youScored: "Votre score",
      outOf: "sur",
      reveal: "Voir la solution",
      questionsLbl: "questions",
      drillsLbl: "exercices de code",
      pickMode: "Choisissez un mode de révision",
      progress: "Progression",
      empty: "Remplissez les blancs puis cliquez sur Vérifier.",
      perfect: "Sans faute ! 🎉",
      keepGoing: "Revoyez les erreurs et réessayez.",
      mixHint: "Astuce : les réponses de code sont sensibles à la casse."
    }
  };
  const t = (k) => T[LANG][k];

  // ---- state ----------------------------------------------------------------
  const app = document.getElementById("app");
  let current = { module: null, mode: null };

  // ---- helpers --------------------------------------------------------------
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // ---- views ----------------------------------------------------------------
  function renderHome() {
    current = { module: null, mode: null };
    app.innerHTML = "";
    const grid = el("div", "grid");
    MODULES.forEach((m, i) => {
      const card = el("button", "card");
      card.style.setProperty("--d", i * 0.05 + "s");
      card.innerHTML = `
        <span class="card-ix">${String(i + 1).padStart(2, "0")}</span>
        <span class="card-icon">${m.icon}</span>
        <h3>${LANG === "fr" ? m.fr : m.title}</h3>
        <p>${m.blurb}</p>
        <span class="card-meta">${m.quiz.length} ${t("questionsLbl")} · ${m.code.length} ${t("drillsLbl")}</span>`;
      card.onclick = () => renderModule(m);
      grid.appendChild(card);
    });
    app.appendChild(grid);
  }

  function renderModule(m) {
    current = { module: m, mode: null };
    app.innerHTML = "";
    const head = el("div", "mod-head");
    head.innerHTML = `
      <button class="link-btn" id="backBtn">${t("back")}</button>
      <div class="mod-title"><span class="card-icon big">${m.icon}</span>
        <div><h2>${LANG === "fr" ? m.fr : m.title}</h2><p>${m.blurb}</p></div>
      </div>
      <p class="pickmode">${t("pickMode")}</p>`;
    app.appendChild(head);
    document.getElementById("backBtn").onclick = renderHome;

    const modes = el("div", "mode-row");
    const quizBtn = el("button", "mode-card quiz");
    quizBtn.innerHTML = `<span class="mode-em">✎</span><h3>${t("quiz")}</h3>
      <p>${m.quiz.length} ${t("questionsLbl")}</p><span class="go">${t("start")} →</span>`;
    quizBtn.onclick = () => runQuiz(m);

    const codeBtn = el("button", "mode-card code");
    codeBtn.innerHTML = `<span class="mode-em">{ }</span><h3>${t("code")}</h3>
      <p>${m.code.length} ${t("drillsLbl")}</p><span class="go">${t("start")} →</span>`;
    codeBtn.onclick = () => runCode(m);

    modes.appendChild(quizBtn);
    modes.appendChild(codeBtn);
    app.appendChild(modes);
  }

  // ---- QUIZ -----------------------------------------------------------------
  function runQuiz(m) {
    const questions = shuffle(m.quiz);
    let idx = 0, score = 0, locked = false;

    function draw() {
      locked = false;
      const q = questions[idx];
      app.innerHTML = "";
      app.appendChild(progressBar(idx, questions.length, score, m, "quiz"));

      const wrap = el("div", "panel");
      wrap.appendChild(el("div", "qnum", `${t("quiz")} · ${idx + 1}/${questions.length}`));
      wrap.appendChild(el("h2", "qtext", esc(LANG === "fr" ? q.fr : q.q)));

      const opts = el("div", "opts");
      // present options in a stable but per-question shuffled order
      const order = shuffle(q.options.map((o, i) => i));
      order.forEach((origIdx) => {
        const b = el("button", "opt", esc(q.options[origIdx]));
        b.onclick = () => {
          if (locked) return;
          locked = true;
          const right = origIdx === q.a;
          if (right) { b.classList.add("ok"); score++; }
          else {
            b.classList.add("bad");
            // highlight correct
            [...opts.children].forEach((c, k) => {
              if (order[k] === q.a) c.classList.add("ok");
            });
          }
          [...opts.children].forEach((c) => (c.disabled = true));
          feedback.className = "feedback show " + (right ? "good" : "err");
          feedback.textContent = right ? t("correct") : t("wrong");
          nextBtn.style.display = "inline-flex";
        };
        opts.appendChild(b);
      });
      wrap.appendChild(opts);

      const feedback = el("div", "feedback");
      wrap.appendChild(feedback);

      const nextBtn = el("button", "primary", idx === questions.length - 1 ? t("done") : t("next") + " →");
      nextBtn.style.display = "none";
      nextBtn.onclick = () => {
        idx++;
        if (idx >= questions.length) return quizResult(m, score, questions.length, () => runQuiz(m));
        draw();
      };
      wrap.appendChild(nextBtn);
      app.appendChild(wrap);
    }
    draw();
  }

  function quizResult(m, score, total, retryFn) {
    app.innerHTML = "";
    app.appendChild(progressBar(total, total, score, m, "quiz"));
    const pct = Math.round((score / total) * 100);
    const wrap = el("div", "panel center");
    wrap.innerHTML = `
      <div class="result-ring" style="--p:${pct}">
        <span>${pct}%</span>
      </div>
      <h2>${t("done")}</h2>
      <p class="big">${t("youScored")} <b>${score}</b> ${t("outOf")} <b>${total}</b></p>
      <p class="muted">${score === total ? t("perfect") : t("keepGoing")}</p>`;
    const row = el("div", "btn-row");
    const r = el("button", "primary", t("retry")); r.onclick = retryFn;
    const b = el("button", "ghost", t("back")); b.onclick = () => renderModule(m);
    row.appendChild(r); row.appendChild(b);
    wrap.appendChild(row);
    app.appendChild(wrap);
  }

  // ---- CODE -----------------------------------------------------------------
  function runCode(m) {
    const drills = m.code.slice();
    let idx = 0, solvedCount = 0;

    function draw() {
      const d = drills[idx];
      app.innerHTML = "";
      app.appendChild(progressBar(idx, drills.length, solvedCount, m, "code"));

      const wrap = el("div", "panel");
      wrap.appendChild(el("div", "qnum", `${t("code")} · ${idx + 1}/${drills.length}`));
      wrap.appendChild(el("h2", "qtext", esc(LANG === "fr" ? d.fr : d.title)));

      // build code block with inputs replacing ___
      const pre = el("div", "codeblock");
      let blankNo = 0;
      const inputs = [];
      const parts = d.template.split("___");
      parts.forEach((part, i) => {
        pre.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) {
          const inp = el("input", "blank");
          inp.type = "text";
          inp.spellcheck = false;
          inp.autocapitalize = "off";
          inp.dataset.expect = d.blanks[blankNo++];
          inp.size = Math.max(4, inp.dataset.expect.length);
          inp.oninput = () => { inp.size = Math.max(4, inp.value.length || 4); inp.classList.remove("ok", "bad"); };
          inp.onkeydown = (e) => { if (e.key === "Enter") checkBtn.click(); };
          inputs.push(inp);
          pre.appendChild(inp);
        }
      });
      wrap.appendChild(pre);

      const hint = el("div", "hintbox", "💡 " + esc(LANG === "fr" ? (d.hint) : d.hint));
      wrap.appendChild(hint);

      const feedback = el("div", "feedback");
      wrap.appendChild(feedback);

      const row = el("div", "btn-row");
      const checkBtn = el("button", "primary", t("check"));
      const revealBtn = el("button", "ghost", t("reveal"));
      const nextBtn = el("button", "primary", idx === drills.length - 1 ? t("done") : t("next") + " →");
      nextBtn.style.display = "none";

      let done = false;
      checkBtn.onclick = () => {
        let allRight = true;
        inputs.forEach((inp) => {
          const ok = inp.value.trim() === inp.dataset.expect;
          inp.classList.toggle("ok", ok);
          inp.classList.toggle("bad", !ok);
          if (!ok) allRight = false;
        });
        feedback.className = "feedback show " + (allRight ? "good" : "err");
        feedback.textContent = allRight ? t("correct") : t("wrong");
        if (allRight && !done) {
          done = true;
          solvedCount++;
          checkBtn.style.display = "none";
          revealBtn.style.display = "none";
          nextBtn.style.display = "inline-flex";
        }
      };
      revealBtn.onclick = () => {
        inputs.forEach((inp) => { inp.value = inp.dataset.expect; inp.size = Math.max(4, inp.value.length); inp.classList.add("ok"); });
        feedback.className = "feedback show err";
        feedback.textContent = `${t("answer")}: ${inputs.map((i) => i.dataset.expect).join(", ")}`;
        checkBtn.style.display = "none";
        revealBtn.style.display = "none";
        nextBtn.style.display = "inline-flex";
      };
      nextBtn.onclick = () => {
        idx++;
        if (idx >= drills.length) return codeResult(m, solvedCount, drills.length, () => runCode(m));
        draw();
      };

      row.appendChild(checkBtn);
      row.appendChild(revealBtn);
      row.appendChild(nextBtn);
      wrap.appendChild(row);
      app.appendChild(wrap);
      inputs[0] && inputs[0].focus();
    }
    draw();
  }

  function codeResult(m, solved, total, retryFn) {
    app.innerHTML = "";
    app.appendChild(progressBar(total, total, solved, m, "code"));
    const pct = Math.round((solved / total) * 100);
    const wrap = el("div", "panel center");
    wrap.innerHTML = `
      <div class="result-ring code" style="--p:${pct}"><span>${solved}/${total}</span></div>
      <h2>${t("done")}</h2>
      <p class="muted">${solved === total ? t("perfect") : t("keepGoing")}</p>
      <p class="muted small">${t("mixHint")}</p>`;
    const row = el("div", "btn-row");
    const r = el("button", "primary", t("retry")); r.onclick = retryFn;
    const b = el("button", "ghost", t("back")); b.onclick = () => renderModule(m);
    row.appendChild(r); row.appendChild(b);
    wrap.appendChild(row);
    app.appendChild(wrap);
  }

  // ---- progress bar ---------------------------------------------------------
  function progressBar(done, total, score, m, mode) {
    const bar = el("div", "topbar");
    const left = el("button", "link-btn", t("back"));
    left.onclick = () => renderModule(m);
    const mid = el("div", "tb-mid", `${LANG === "fr" ? m.fr : m.title} · ${mode === "quiz" ? t("quiz") : t("code")}`);
    const track = el("div", "track");
    const fill = el("div", "fill");
    fill.style.width = (total ? (done / total) * 100 : 0) + "%";
    track.appendChild(fill);
    const sc = el("div", "tb-score", `${t("score")} ${score}`);
    bar.appendChild(left); bar.appendChild(mid); bar.appendChild(track); bar.appendChild(sc);
    return bar;
  }

  // ---- language toggle ------------------------------------------------------
  function setupLang() {
    const enBtn = document.getElementById("langEn");
    const frBtn = document.getElementById("langFr");
    const apply = () => {
      enBtn.classList.toggle("active", LANG === "en");
      frBtn.classList.toggle("active", LANG === "fr");
      document.getElementById("tagline").textContent = t("tagline");
      document.getElementById("subline").textContent = t("sub");
      document.documentElement.lang = LANG;
      // re-render current view
      if (current.module) renderModule(current.module);
      else renderHome();
    };
    enBtn.onclick = () => { LANG = "en"; localStorage.setItem("ds_lang", "en"); apply(); };
    frBtn.onclick = () => { LANG = "fr"; localStorage.setItem("ds_lang", "fr"); apply(); };
    apply();
  }

  // ---- boot -----------------------------------------------------------------
  setupLang();
  renderHome();
})();
