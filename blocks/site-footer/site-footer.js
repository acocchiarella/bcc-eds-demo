const icons = {
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  linkedin: '<path d="M6 9v10M6 5.5v.01M10 19V9M10 13a4 4 0 0 1 8 0v6"/>',
};
const svg = (inner, size = 24) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

const el = (tag, cls, ...kids) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  e.append(...kids);
  return e;
};
const nodes = (cell) => [...cell.childNodes];

export default function decorate(block) {
  const [sub, brand, tr, menu, see, contact, social, legal, copy] = [...block.children].map((r) => [...r.children]);

  const mail = sub[1].querySelector('a');
  mail.insertAdjacentHTML('afterbegin', svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'));
  const subscribe = el('div', 'site-footer-subscribe', el('div', 'site-footer-inner', ...nodes(sub[0]), mail));

  const label = tr[0].textContent.trim();
  const select = el('select');
  select.id = 'site-footer-lang';
  select.append(new Option('Select Language', ''));
  const lab = el('label');
  lab.htmlFor = select.id;
  lab.textContent = label;
  const wrap = el('div', 'site-footer-select');
  wrap.append(select);
  wrap.insertAdjacentHTML('beforeend', svg('<path d="M6 9l6 6 6-6"/>'));
  const brandCol = el('div', 'site-footer-brand', el('div', 'site-footer-logos', ...nodes(brand[0])), el('div', 'site-footer-translate', lab, wrap));

  const navCol = (cell, name) => {
    const col = el('nav', `site-footer-col site-footer-${name}`, ...nodes(cell[0]));
    col.setAttribute('aria-label', col.querySelector('h2').textContent);
    return col;
  };

  const cc = contact[0];
  const btn = cc.querySelector('a[href]:not(p a)') || cc.querySelector('p:first-of-type a');
  if (btn && btn.parentElement.children.length === 1 && btn.parentElement.textContent.trim() === btn.textContent.trim()) {
    btn.classList.add('site-footer-button');
    btn.insertAdjacentHTML('beforeend', svg('<path d="M9 6l6 6-6 6"/>'));
  }
  const soc = social[0].querySelector('ul') || el('ul');
  soc.className = 'site-footer-social';
  soc.querySelectorAll('a').forEach((a) => {
    const name = a.textContent.trim();
    const key = name.toLowerCase().replace(/[^a-z]/g, '');
    a.setAttribute('aria-label', name);
    a.innerHTML = svg(icons[key] || '');
  });
  const contactCol = el('section', 'site-footer-col site-footer-contact', ...nodes(cc), soc);
  contactCol.setAttribute('aria-label', 'Contact');

  const columns = el('div', 'site-footer-columns', brandCol, navCol(menu, 'menu'), navCol(see, 'see-also'), contactCol);
  const body = el('div', 'site-footer-body', el('div', 'site-footer-inner', columns));

  const legalNav = el('nav', 'site-footer-legal-links', ...nodes(legal[0]));
  legalNav.setAttribute('aria-label', 'Legal');
  const legalBar = el('div', 'site-footer-legal', el('div', 'site-footer-inner', legalNav, el('div', 'site-footer-copy', ...nodes(copy[0]))));

  block.replaceChildren(subscribe, body, legalBar);
}