const ICONS = {
  facebook: '<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8z"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.8" cy="7.2" r="1.2"/>',
  x: '<path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  linkedin: '<path d="M5 9h3v10H5zM6.5 4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h3v1.5c.6-1 1.7-1.7 3.2-1.7 2.7 0 3.3 1.8 3.3 4.1V19h-3v-5.2c0-1.2-.1-2.3-1.6-2.3S13 12.6 13 13.8V19h-3z"/>',
};
const svg = (inner, cls) => `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false">${inner}</svg>`;

export default function decorate(block) {
  const [sub, brand, menu, also, contact, legal, copy] = [...block.children].map((r) => [...r.children]);
  const el = (tag, cls) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  };
  const navFrom = (cell, cls, label) => {
    const nav = el('nav', cls);
    nav.append(...cell.childNodes);
    nav.setAttribute('aria-label', label || nav.querySelector('h2')?.textContent || 'Footer');
    return nav;
  };

  const footer = el('footer');

  const bar = el('div', 'site-footer-subscribe');
  const inner = el('div', 'site-footer-inner');
  const msg = el('p');
  msg.append(...sub[0].childNodes);
  inner.append(msg);
  const cta = sub[1].querySelector('a');
  if (cta) {
    cta.classList.add('site-footer-loop');
    cta.insertAdjacentHTML('afterbegin', svg('<path d="M4 6h16v12H4z M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>', 'site-footer-icon'));
    inner.append(cta);
  }
  bar.append(inner);

  const body = el('div', 'site-footer-body');
  const cols = el('div', 'site-footer-columns');

  const brandCol = el('div', 'site-footer-brand');
  brandCol.append(...brand[0].childNodes);
  const ps = brandCol.querySelectorAll('p');
  const labelP = ps[ps.length - 1];
  const wrap = el('div', 'site-footer-translate');
  const label = el('label');
  label.htmlFor = 'site-footer-lang';
  label.textContent = labelP.textContent;
  const select = el('select');
  select.id = 'site-footer-lang';
  select.innerHTML = '<option selected>Select Language</option>';
  wrap.append(label, select);
  labelP.replaceWith(wrap);

  const contactCol = el('div', 'site-footer-contact');
  contactCol.append(...contact[0].childNodes);
  const btn = contactCol.querySelector('p a');
  if (btn) {
    btn.classList.add('site-footer-button');
    btn.insertAdjacentHTML('beforeend', svg('<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/>', 'site-footer-icon'));
    btn.parentElement.classList.add('site-footer-button-wrap');
  }
  contactCol.querySelectorAll('ul a').forEach((a) => {
    const name = a.textContent.trim();
    a.setAttribute('aria-label', name);
    a.innerHTML = svg(ICONS[name.toLowerCase()] || '', 'site-footer-social-icon');
  });
  contactCol.querySelector('ul')?.classList.add('site-footer-social');

  cols.append(brandCol, navFrom(menu[0], 'site-footer-links'), navFrom(also[0], 'site-footer-links'), contactCol);
  body.append(cols);

  const bottom = el('div', 'site-footer-legal');
  const bottomInner = el('div', 'site-footer-inner');
  bottomInner.append(navFrom(legal[0], 'site-footer-legal-links', 'Legal'));
  const c = el('p', 'site-footer-copy');
  c.append(...copy[0].childNodes);
  bottomInner.append(c);
  bottom.append(bottomInner);

  footer.append(bar, body, bottom);
  block.replaceChildren(footer);
}