/* ============================================================
   DECK FORGE — presenter.js
   Modo apresentador de verdade, em duas telas.

   Tecla N abre uma segunda janela com: slide atual, próximo slide,
   notas (data-notes), cronômetro e contador. As setas funcionam nas
   duas janelas e o deck principal acompanha — deixe a janela do deck
   no projetor e a do apresentador no seu notebook.

   Depende de motion.js (usa deckForge.goto).
   ============================================================ */
(() => {
  let win = null;
  let started = null;
  let timerId = null;

  const slides = () => [...document.querySelectorAll('.slide')];
  const titleOf = (s) => {
    const el = s.querySelector('.display, .h1, .h2, .quote');
    return el ? el.innerText.trim().replace(/\s+/g, ' ') : '(sem título)';
  };
  const notesOf = (s) => (s.dataset.notes || '').trim();
  const current = () => (window.deckForge ? window.deckForge.index() : 0);

  const SHELL = `
<!doctype html><meta charset="utf-8"><title>Apresentador</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; background:#0B0F1A; color:#F4F6FB; font:16px/1.5 system-ui,sans-serif;
         display:grid; grid-template-rows:auto 1fr auto; height:100vh; }
  header { display:flex; justify-content:space-between; align-items:baseline;
           padding:18px 24px; border-bottom:1px solid rgba(255,255,255,.12); }
  #clock { font-size:44px; font-weight:700; font-variant-numeric:tabular-nums; letter-spacing:-.02em; }
  #count { color:#93A0BC; letter-spacing:.14em; text-transform:uppercase; font-size:13px; }
  main { padding:24px; overflow:auto; display:grid; gap:20px; align-content:start; }
  h1 { font-size:30px; line-height:1.2; margin:0; }
  .lbl { color:#9B8CFF; font-size:12px; letter-spacing:.16em; text-transform:uppercase; margin-bottom:6px; }
  #notes { font-size:20px; white-space:pre-wrap; background:#141A2A; border-radius:14px; padding:20px; min-height:120px; }
  #next { color:#93A0BC; font-size:19px; background:#141A2A; border-radius:14px; padding:16px 20px; }
  footer { display:flex; gap:10px; padding:16px 24px; border-top:1px solid rgba(255,255,255,.12); }
  button { flex:1; padding:14px; font-size:15px; border-radius:10px; border:1px solid rgba(255,255,255,.16);
           background:#141A2A; color:#F4F6FB; cursor:pointer; }
  button:hover { background:#1D2438; }
  #warn { color:#93A0BC; font-size:12px; padding:0 24px 12px; }
</style>
<header><div id="clock">00:00</div><div id="count"></div></header>
<main>
  <div><div class="lbl">Slide atual</div><h1 id="title"></h1></div>
  <div><div class="lbl">Notas</div><div id="notes"></div></div>
  <div><div class="lbl">A seguir</div><div id="next"></div></div>
</main>
<div id="warn">Setas ← → navegam nas duas janelas. R zera o cronômetro.</div>
<footer>
  <button id="prev">← Anterior</button>
  <button id="reset">Zerar tempo</button>
  <button id="nxt">Próximo →</button>
</footer>`;

  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function render() {
    if (!win || win.closed) return;
    const all = slides();
    const i = current();
    const d = win.document;
    d.getElementById('title').textContent = titleOf(all[i]);
    d.getElementById('notes').textContent = notesOf(all[i]) || '—';
    d.getElementById('next').textContent = i + 1 < all.length ? titleOf(all[i + 1]) : 'fim do deck';
    d.getElementById('count').textContent = `slide ${i + 1} de ${all.length}`;
  }

  function open() {
    if (win && !win.closed) { win.focus(); return; }
    win = window.open('', 'deckforge-presenter', 'width=980,height=680');
    if (!win) { alert('O navegador bloqueou a janela do apresentador. Libere pop-ups para este arquivo.'); return; }
    win.document.open();
    win.document.write(SHELL);
    win.document.close();

    const go = (n) => { window.deckForge.goto(n); render(); };
    win.document.getElementById('prev').onclick = () => go(current() - 1);
    win.document.getElementById('nxt').onclick = () => go(current() + 1);
    win.document.getElementById('reset').onclick = () => { started = Date.now(); };
    win.document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(current() + 1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(current() - 1);
      if (e.key.toLowerCase() === 'r') started = Date.now();
    });

    started = Date.now();
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!win || win.closed) { clearInterval(timerId); return; }
      win.document.getElementById('clock').textContent = fmt(Date.now() - started);
    }, 500);

    render();
    document.documentElement.classList.add('presenting');
    document.documentElement.requestFullscreen?.();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'n') { e.preventDefault(); open(); }
    if (['ArrowRight', 'ArrowLeft', 'PageUp', 'PageDown'].includes(e.key)) setTimeout(render, 60);
  });

  window.deckPresenter = { open, render };
})();
