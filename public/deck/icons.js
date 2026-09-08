/* ============================================================
   DECK FORGE — icons.js
   Biblioteca de ícones em traço, injetada no DOM (nada de fetch,
   nada de CDN: funciona em file:// e no render offline).

   Uso:  <svg class="icon"><use href="#i-target"/></svg>
         <i data-lucide="network"></i> (convertido automaticamente)

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
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    graduation: '<path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4z"/><path d="M6.5 10.8V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.2"/>',
    'graduation-cap': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 8v4"/>',
    layers: '<path d="m12 3 8.5 4.7L12 12.4 3.5 7.7 12 3z"/><path d="m4 12 8 4.5 8-4.5"/><path d="m4 16.4 8 4.5 8-4.5"/>',
    school: '<path d="m4 6 8-4 8 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path d="M12 22V12"/><path d="m12 7 3 1.5M12 7 9 8.5"/>',
    'building-2': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2.2"/>',
    'map-pin': '<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r=".6"/>',
    lightbulb: '<path d="M9.2 17.5a6 6 0 1 1 5.6 0v2.2H9.2v-2.2z"/><path d="M10 21.5h4"/>',
    'chart-bar': '<path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/>',
    'trending-up': '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M15.5 7.5H21v5.5"/>',
    pie: '<path d="M12 3.5v8.5h8.5A8.5 8.5 0 0 0 12 3.5z"/><path d="M20.2 15A8.5 8.5 0 1 1 9 3.8"/>',
    coins: '<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5"/><path d="M4.5 11.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5"/>',
    gift: '<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5v8h14v-8M12 8.5v12"/><path d="M12 8.5C10.5 5 8.8 3.5 7.4 4.2 6 4.9 6.6 7.3 12 8.5zM12 8.5c1.5-3.5 3.2-5 4.6-4.3 1.4.7.8 3.1-4.6 4.3z"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20H4v-9.5z"/><path d="M9.5 20v-6h5v6"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m3.8 7 8.2 6 8.2-6"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    flag: '<path d="M5.5 21V4M5.5 5h11l-2 3.5 2 3.5h-11"/>',
    play: '<path d="M8 5.5 18.5 12 8 18.5v-13z"/>',
    download: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/>',
    shield: '<path d="M12 3.5 20 6v6c0 4.6-3.4 7.4-8 8.5-4.6-1.1-8-3.9-8-8.5V6l8-2.5z"/><path d="m8.8 12 2.3 2.3 4.1-4.6"/>',
    church: '<path d="M12 2.5v5M10 4.5h4"/><path d="M12 7.5 5 12v9h14v-9l-7-4.5z"/><path d="M10 21v-4.5h4V21"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
    'file-text': '<path d="M6 2.5h9l3.5 3.5V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z"/><path d="M9 12h6M9 16h6M9 8h2"/>',
    rocket: '<path d="M14.5 3.5c3 0 6 3 6 6-3.5 1-6 3.5-8.5 8.5L7 13c5-2.5 7.5-5 7.5-9.5z"/><path d="M9.5 14.5 5 16l2-4.5"/><circle cx="15" cy="9" r="1.6"/>',
    briefcase: '<rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 13h19"/>',
    'user-check': '<circle cx="9" cy="8" r="3.6"/><path d="M2.5 20c1-3.8 3.5-5.6 6.5-5.6M15 12.5l2 2 4-4.5"/>',
    'dollar-sign': '<path d="M12 2.5v19M17 7c0-2-2.2-3-5-3s-5 1.3-5 3.3c0 4 10 2 10 6.2 0 2-2.2 3.3-5 3.3s-5-1-5-3"/>',
    wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19a1 1 0 0 1 1 1v2M3 7.5V18a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/><rect x="14" y="11" width="7" height="5" rx="1"/><circle cx="16.5" cy="13.5" r=".6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z"/>',
    'shield-alert': '<path d="M12 3.5 20 6v6c0 4.6-3.4 7.4-8 8.5-4.6-1.1-8-3.9-8-8.5V6l8-2.5z"/><path d="M12 8v4.5M12 15.5v.1"/>',
    monitor: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/><path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    video: '<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="m15.5 10 6-3.5v11l-6-3.5"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3.5" rx="1"/><path d="M9 12h6M9 16h6"/>',
    'message-square': '<path d="M4 4.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/>',
    'refresh-cw': '<path d="M3.5 12a8.5 8.5 0 0 1 14.6-6M20.5 12a8.5 8.5 0 0 1-14.6 6"/><path d="M18 2.5v3.5h-3.5M6 21.5V18h3.5"/>',
    repeat: '<path d="M3.5 12a8.5 8.5 0 0 1 14.6-6M20.5 12a8.5 8.5 0 0 1-14.6 6"/><path d="M18 2.5v3.5h-3.5M6 21.5V18h3.5"/>',
    crown: '<path d="M3 8.5 7.5 12 12 5l4.5 7 4.5-3.5V18H3V8.5z"/><path d="M3 18h18v2.5H3z"/>',
    megaphone: '<path d="M3 10.5v3l4 1V9.5l-4 1z"/><path d="M7 9.5 18 5v14L7 14.5"/><path d="M8 14.5v4.5a1.5 1.5 0 0 0 3 0V15.8"/>',
    truck: '<rect x="1.5" y="7" width="13" height="10" rx="1"/><path d="M14.5 10.5H18l3.5 3.5V17h-7z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    presentation: '<rect x="2.5" y="3.5" width="19" height="12" rx="1.5"/><path d="M8 21l4-5.5L16 21M12 15.5V21"/>',
    'check-square': '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="m8 12 3 3 5-6"/>',
    tag: '<path d="M12.5 2.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-9 9a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4l9-9a1 1 0 0 1 .7-.3z"/><circle cx="16.5" cy="7.5" r="1.4"/>',
    'shopping-bag': '<path d="M6 8h12l1 12.5a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 20.5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    percent: '<path d="M5 19 19 5"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    'arrow-down-right': '<path d="M7 7l10 10M17 8v9h-9"/>',
    'bar-chart-2': '<path d="M6 20V13M12 20V4M18 20v-8"/>',
    'alert-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v6M12 16.5v.1"/>',
    code: '<path d="m8 6-5.5 6L8 18M16 6l5.5 6L16 18"/>',
  };

  const svg =
    '<svg id="deck-icons-svg" xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    Object.entries(P).map(([k, d]) =>
      `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${d}</symbol>`
    ).join('') + '</svg>';

  const mount = () => {
    if (!document.getElementById('deck-icons-svg')) {
      document.body.insertAdjacentHTML('afterbegin', svg);
    }
    // Converte <i data-lucide="..."> em SVG
    document.querySelectorAll('i[data-lucide]').forEach((el) => {
      const name = el.getAttribute('data-lucide');
      if (!name) return;
      const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('class', 'icon');
      svgEl.setAttribute('viewBox', '0 0 24 24');
      svgEl.style.width = '32px';
      svgEl.style.height = '32px';
      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      useEl.setAttribute('href', `#i-${name}`);
      svgEl.appendChild(useEl);
      el.parentNode.replaceChild(svgEl, el);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  window.deckIcons = Object.keys(P);
})();

