const ICONS = [
  '<path d="M14 8h26v40H14z"/><path d="M20 20h14M20 27h14M20 34h10"/><circle cx="14" cy="14" r="8" fill="#fff"/><path d="m10 14 3 3 5-6"/>',
  '<path d="M8 40c0-12 8-20 20-20 6 0 10 4 14 4l6-6v14c0 8-6 14-16 14H14c-4 0-6-3-6-6z"/><circle cx="38" cy="28" r="1.5"/>',
  '<path d="M16 6h24v44H16z"/><path d="M14 10h28"/><circle cx="40" cy="48" r="3" fill="#fff"/>',
  '<path d="M8 12h40v32H8z"/><path d="M20 12v32"/><path d="M28 36V26l8-6 8 6v10z"/>',
  '<path d="M6 20h44v28H6z"/><path d="M20 20v-6h16v6"/><path d="M6 32h44"/><rect x="25" y="29" width="6" height="6" fill="#fff"/>',
  '<path d="M28 50 8 30C2 22 8 10 18 10c5 0 8 3 10 6 2-3 5-6 10-6 10 0 16 12 10 20z"/><path d="m20 28 8 8 10-10"/>',
];

const svg = (inner, size, sw) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size === 56 ? 56 : 24} ${size === 56 ? 56 : 24}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows.shift();
  const title = heading.textContent.trim();
  const h2 = document.createElement('h2');
  h2.className = 'quicklinks-title';
  h2.textContent = title;

  const list = document.createElement('ul');
  list.className = 'quicklinks-list';
  const more = rows.length && rows[rows.length - 1].children.length === 1 && rows[rows.length - 1].querySelector('a, strong, em') && rows.length > 6 ? rows.pop() : null;

  let moreLabel = 'Show more';
  rows.forEach((row, i) => {
    const cells = [...row.children];
    const name = cells[0]?.textContent.trim();
    const link = cells[0]?.querySelector('a');
    const desc = cells[1]?.textContent.trim();
    if (!name) return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link ? link.getAttribute('href') : '#';
    a.className = 'quicklinks-card';
    const icon = document.createElement('span');
    icon.className = 'quicklinks-icon';
    icon.innerHTML = svg(ICONS[i % ICONS.length], 56, 2.5);
    const label = document.createElement('span');
    label.className = 'quicklinks-label';
    const t = document.createElement('span');
    t.className = 'quicklinks-card-title';
    t.textContent = name;
    const chev = document.createElement('span');
    chev.className = 'quicklinks-chevron';
    chev.innerHTML = svg('<path d="m10 6 6 6-6 6"/>', 28, 2).replace('viewBox="0 0 24 24"', 'viewBox="0 0 28 28"').replace('<path d="m10 6 6 6-6 6"/>', '<path d="m11 7 7 7-7 7"/>');
    label.append(t, chev);
    const p = document.createElement('span');
    p.className = 'quicklinks-desc';
    p.textContent = desc || '';
    a.append(icon, label, p);
    li.append(a);
    list.append(li);
  });

  const btnWrap = document.createElement('div');
  btnWrap.className = 'quicklinks-more';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `<span>${moreLabel}</span>${svg('<path d="m6 9 6 6 6-6"/>', 24, 2)}`;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
  });
  btnWrap.append(btn);

  block.textContent = '';
  block.append(h2, list, btnWrap);
}