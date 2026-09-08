/* ============================================================
   DECK FORGE — motion.js
   Movimento sem dependência externa (Web Animations + CSS).
   Roda offline: nada de CDN na hora de renderizar.

   Marcação:
     <h2 data-anim="rise" data-delay="200">        reveal simples
     <div data-anim="rise" data-stagger="120">     filhos entram em cascata
     <h1 class="kinetic" data-anim="fade">         palavra a palavra
     <span data-count="1240" data-suffix="%">      número contando
     <path class="draw">                           traço desenhando

   API:
     deckForge.play(i)   toca a animação do slide i
     deckForge.goto(i)   pula para o slide i (modo apresentação)
     deckForge.reset()   volta tudo ao estado inicial
   Teclas: seta direita/esquerda, "p" alterna o modo apresentação.
   ============================================================ */
(() => {
  const html = document.documentElement;
  const isExport = () => html.classList.contains('export');
  const slides = () => [...document.querySelectorAll('.slide')];


  /* --- marca automática ---
     <body data-logo="img/marca.svg" data-logo-pos="br" data-logo-hero="1,13">
     Injeta .logo-zone em todo slide que ainda não tem uma. Evita repetir o
     mesmo bloco 13 vezes e garante que a marca fique sempre no mesmo canto. */
  function injectLogo() {
    const src = document.body.dataset.logo;
    if (!src) return;
    const pos = document.body.dataset.logoPos || 'br';
    const lockup = document.body.dataset.logoLockup || '';
    const hero = new Set((document.body.dataset.logoHero || '').split(',').map((n) => parseInt(n, 10)));
    slides().forEach((slide, i) => {
      if (slide.querySelector('.logo-zone')) return;
      const onMedia = !!slide.querySelector('.media--bleed');
      const div = document.createElement('div');
      div.className = 'logo-zone'
        + (pos !== 'br' ? ` logo-zone--${pos}` : '')
        + (hero.has(i + 1) ? ' logo-zone--hero' : '')
        + (onMedia && !hero.has(i + 1) ? ' logo-zone--onmedia' : '');
      div.innerHTML = `<img src="${src}" alt="Marca do projeto">`
        + (lockup && hero.has(i + 1) ? `<span class="logo-lockup">${lockup}</span>` : '');
      slide.appendChild(div);
    });
  }

  /* --- numeração automática: <body data-paginate="1"> --- */
  function paginate() {
    if (!document.body.dataset.paginate) return;
    const all = slides();
    all.forEach((slide, i) => {
      if (i === 0 || slide.querySelector('.slide-num')) return;
      const n = document.createElement('span');
      n.className = 'slide-num';
      n.textContent = String(i + 1).padStart(2, '0');
      slide.appendChild(n);
    });
  }

  /* --- tipografia cinética: quebra em palavras --- */
  function splitWords() {
    document.querySelectorAll('.kinetic').forEach((el) => {
      if (el.dataset.split) return;
      const html_ = el.innerHTML.split(/(<br\s*\/?>)/i).map((chunk) => {
        if (/<br/i.test(chunk)) return chunk;
        return chunk.split(/\s+/).filter(Boolean)
          .map((w) => `<span class="w">${w}</span>`).join(' ');
      }).join('');
      el.innerHTML = html_;
      el.dataset.split = '1';
      [...el.querySelectorAll('.w')].forEach((w, i) => {
        w.style.animationDelay = `${i * 70}ms`;
      });
    });
  }

  /* --- comprimento real de cada traço, para o desenho ficar certo --- */
  function measureStrokes() {
    document.querySelectorAll('.draw').forEach((p) => {
      if (typeof p.getTotalLength === 'function') {
        p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
      }
    });
  }

  /* --- contador numérico --- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const dur = parseInt(el.dataset.countDur || '1200', 10);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (isExport()) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* --- toca a animação de um slide --- */
  function play(slide) {
    if (!slide || isExport()) return;
    const items = [...slide.querySelectorAll('[data-anim], .kinetic, .draw')];
    items.forEach((el, i) => {
      const explicit = parseInt(el.dataset.delay || '', 10);
      const parentStagger = parseInt(el.parentElement?.dataset.stagger || '', 10);
      const delay = !isNaN(explicit) ? explicit
                  : !isNaN(parentStagger) ? i * parentStagger
                  : i * 90;
      setTimeout(() => el.classList.add('is-in'), delay);
    });
    slide.querySelectorAll('[data-count]').forEach((el) => {
      const d = parseInt(el.dataset.delay || '300', 10);
      setTimeout(() => countUp(el), d);
    });
    slide.dataset.played = '1';
  }

  function reset(slide) {
    (slide ? [slide] : slides()).forEach((s) => {
      s.querySelectorAll('.is-in').forEach((el) => el.classList.remove('is-in'));
      delete s.dataset.played;
    });
  }

  /* --- dispara quando o slide entra na tela --- */
  function observe() {
    if (isExport() || !('IntersectionObserver' in window)) {
      slides().forEach((s) => s.querySelectorAll('[data-anim], .kinetic, .draw')
        .forEach((el) => el.classList.add('is-in')));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !e.target.dataset.played) play(e.target);
      });
    }, { threshold: 0.35 });
    slides().forEach((s) => io.observe(s));
  }

  /* --- modo apresentação: navegação lateral slide a slide com transição suave --- */
  let current = 0;

  function updateControls() {
    const counterEl = document.getElementById('deck-counter');
    if (counterEl) {
      const all = slides();
      counterEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(all.length).padStart(2, '0')}`;
    }
  }

  function goto(i) {
    const all = slides();
    if (!all.length) return;
    current = Math.max(0, Math.min(all.length - 1, i));

    all.forEach((s, idx) => {
      s.classList.remove('active', 'prev');
      if (idx === current) {
        s.classList.add('active');
      } else if (idx < current) {
        s.classList.add('prev');
      }
    });

    const s = all[current];
    reset(s);
    setTimeout(() => play(s), 200);
    updateControls();
  }

  function togglePresent() {
    html.classList.toggle('presenting');
    if (html.classList.contains('presenting')) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  /* --- Controles flutuantes de tela --- */
  function injectControls() {
    if (document.getElementById('deck-controls')) return;
    const div = document.createElement('div');
    div.id = 'deck-controls';
    div.className = 'deck-controls';
    div.innerHTML = `
      <button id="btn-prev" aria-label="Slide anterior">←</button>
      <span id="deck-counter" class="deck-counter-badge">01 / ${String(slides().length).padStart(2, '0')}</span>
      <button id="btn-next" aria-label="Próximo slide">→</button>
    `;
    document.body.appendChild(div);

    document.getElementById('btn-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      goto(current - 1);
    });

    document.getElementById('btn-next').addEventListener('click', (e) => {
      e.stopPropagation();
      goto(current + 1);
    });
  }

  /* --- Eventos de teclado e touch swipe lateral --- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goto(current + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goto(current - 1);
    }
    if (e.key.toLowerCase() === 'p') togglePresent();
  });

  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) goto(current + 1);
      else goto(current - 1);
    }
  }, { passive: true });

  function init() {
    injectLogo();
    paginate();
    splitWords();
    measureStrokes();
    injectControls();
    goto(0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.deckForge = {
    play: (i) => play(slides()[i]),
    goto,
    reset: () => reset(),
    index: () => current,
    count: () => slides().length,
  };
})();

