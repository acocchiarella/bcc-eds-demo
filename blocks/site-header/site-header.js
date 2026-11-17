const ICONS = {
  menu: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>',
  down: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/></svg>',
  right: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M8.6 7.4 13.2 12l-4.6 4.6L10 18l6-6-6-6z"/></svg>',
  logo: '<svg viewBox="0 0 90 90" width="90" height="90" aria-hidden="true"><rect width="90" height="90" fill="#0067b1"/><rect x="40" y="14" width="10" height="34" fill="#ffd200"/><rect x="18" y="52" width="54" height="22" fill="#ffd200"/></svg>',
};

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

const txt = (cell) => (cell ? cell.textContent.trim() : '');

export default function decorate(block) {
  const rows = [...block.children].map((r) => [...r.children]);
  const [logoRow, navRow, heroRow, imgRow, tabRow, ...rest] = rows;
  const moreRow = rest.pop();

  const header = el('header', 'site-header-bar');
  const inner = el('div', 'site-header-inner');
  const logo = el('a', 'site-header-logo', ICONS.logo);
  logo.href = '#';
  logo.append(el('span', 'site-header-logo-text', txt(logoRow[0])));
  const tools = el('div', 'site-header-tools');
  const menu = el('button', 'site-header-menu', `${ICONS.menu}<span>${txt(navRow[0])}</span>`);
  menu.type = 'button';
  const searchBtn = el('button', 'site-header-icon-btn', ICONS.search);
  searchBtn.type = 'button';
  searchBtn.setAttribute('aria-label', 'Search');
  tools.append(menu, searchBtn);
  const account = el('div', 'site-header-account');
  const contact = el('a', 'site-header-contact', txt(navRow[1]));
  contact.href = '#';
  const sign = el('button', 'site-header-signin', `<span>${txt(navRow[2])}</span>${ICONS.down}`);
  sign.type = 'button';
  account.append(contact, sign);
  inner.append(logo, tools, account);
  header.append(inner);

  const hero = el('section', 'site-header-hero');
  const text = el('div', 'site-header-hero-text');
  text.append(el('h1', '', txt(heroRow[0])));
  const form = el('form', 'site-header-search');
  form.setAttribute('role', 'search');
  form.addEventListener('submit', (e) => e.preventDefault());
  const input = el('input');
  input.type = 'search';
  input.placeholder = txt(heroRow[1]);
  input.setAttribute('aria-label', txt(heroRow[1]));
  const go = el('button', '', ICONS.search);
  go.type = 'submit';
  go.setAttribute('aria-label', 'Search');
  form.append(input, go);
  text.append(form, el('h2', '', txt(heroRow[2])));
  const pills = el('ul', 'site-header-pills');
  [...heroRow[3].querySelectorAll('li')].forEach((li) => {
    const item = el('li');
    const a = el('a', '', li.textContent.trim());
    a.href = '#';
    item.append(a);
    pills.append(item);
  });
  text.append(pills);
  const media = el('div', 'site-header-hero-media');
  const heroImg = imgRow[0].querySelector('img');
  if (heroImg) media.append(heroImg);
  hero.append(text, media);

  const focus = el('section', 'site-header-focus');
  const tabs = el('nav', 'site-header-tabs');
  tabs.setAttribute('aria-label', 'In focus');
  tabRow.forEach((cell, i) => {
    const a = el('a', '', txt(cell));
    a.href = '#';
    if (i === 0) a.setAttribute('aria-current', 'page');
    a.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.querySelectorAll('a').forEach((t) => t.removeAttribute('aria-current'));
      a.setAttribute('aria-current', 'page');
    });
    tabs.append(a);
  });
  const cards = el('div', 'site-header-cards');
  rest.forEach((r) => {
    const card = el('a', 'site-header-card');
    card.href = '#';
    const img = r[0].querySelector('img');
    if (img) card.append(img);
    card.append(el('span', 'site-header-card-title', txt(r[1])));
    card.insertAdjacentHTML('beforeend', ICONS.right);
    cards.append(card);
  });
  const more = el('a', 'site-header-more', `<span>${txt(moreRow[0])}</span>${ICONS.right}`);
  more.href = '#';
  const body = el('div', 'site-header-focus-body');
  body.append(cards, more);
  focus.append(tabs, body);

  block.replaceChildren(header, hero, focus);
}