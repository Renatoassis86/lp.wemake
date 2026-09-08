/* ============================================================
   DECK FORGE — icons.js
   Biblioteca de ícones em traço, injetada no DOM (nada de fetch,
   nada de CDN: funciona em file:// e no render offline).

   Uso:  <svg class="icon"><use href="#i-target"/></svg>
         <svg class="icon icon--lg accent"><use href="#i-users"/></svg>

   Estilo: traço de 1.75, cantos arredondados, grade 24.
   Herdam a cor do texto — nunca coloque cor fixa no ícone.
   ============================================================ */
(() => {
  const P = {
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3z"/><path d="M12 10v4M12 17.4v.1"/>',
    star: '<path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.5z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1-3.8 4-5.6 7.5-5.6s6.5 1.8 7.5 5.6"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c.9-3.4 3.4-5 6.5-5s5.6 1.6 6.5 5"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1M18 15c2.1.5 3.2 2 3.5 5"/>',
    book: '<path d="M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2v-15z"/><path d="M4 18.5A2 2 0 0 1 6 16.5h13"/>',
    graduation: '<path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4z"/><path d="M6.5 10.8V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2.2"/>',
    'map-pin': '<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r=".6"/>',
    lightbulb: '<path d="M9.2 17.5a6 6 0 1 1 5.6 0v2.2H9.2v-2.2z"/><path d="M10 21.5h4"/>',
    'chart-bar': '<path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/>',
    'trending-up': '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M15.5 7.5H21v5.5"/>',
    'pie': '<path d="M12 3.5v8.5h8.5A8.5 8.5 0 0 0 12 3.5z"/><path d="M20.2 15A8.5 8.5 0 1 1 9 3.8"/>',
    coins: '<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5"/><path d="M4.5 11.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5"/>',
    gift: '<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5v8h14v-8M12 8.5v12"/><path d="M12 8.5C10.5 5 8.8 3.5 7.4 4.2 6 4.9 6.6 7.3 12 8.5zM12 8.5c1.5-3.5 3.2-5 4.6-4.3 1.4.7.8 3.1-4.6 4.3z"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20H4v-9.5z"/><path d="M9.5 20v-6h5v6"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m3.8 7 8.2 6 8.2-6"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    layers: '<path d="m12 3 8.5 4.7L12 12.4 3.5 7.7 12 3z"/><path d="m4 12 8 4.5 8-4.5"/><path d="m4 16.4 8 4.5 8-4.5"/>',
    flag: '<path d="M5.5 21V4M5.5 5h11l-2 3.5 2 3.5h-11"/>',
    play: '<path d="M8 5.5 18.5 12 8 18.5v-13z"/>',
    download: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/>',
    shield: '<path d="M12 3.5 20 6v6c0 4.6-3.4 7.4-8 8.5-4.6-1.1-8-3.9-8-8.5V6l8-2.5z"/><path d="m8.8 12 2.3 2.3 4.1-4.6"/>',
    church: '<path d="M12 2.5v5M10 4.5h4"/><path d="M12 7.5 5 12v9h14v-9l-7-4.5z"/><path d="M10 21v-4.5h4V21"/>',
  };

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    Object.entries(P).map(([k, d]) =>
      `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${d}</symbol>`
    ).join('') + '</svg>';

  const mount = () => document.body.insertAdjacentHTML('afterbegin', svg);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  window.deckIcons = Object.keys(P);
})();
