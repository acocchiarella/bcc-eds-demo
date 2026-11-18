const ICONS = {
  search: '<path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>',
  menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
  down: '<path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/>',
  right: '<path d="M8.6 7.4 13.2 12l-4.6 4.6L10 18l6-6-6-6z"/>',
};

function icon(name, size = 24) {
  return `<svg class="site-header__icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

export default function decorate(block) {
  const cells = [...block.children].map((r) => r.firstElementChild);
  const [brand, util, title, search, pop, hero, tabs, arts, more] = cells;
  const text = (n) => n.textContent.trim();

  const bar = el('header', 'site-header__bar');
  const inner = el('div', 'site-header__bar-inner');
  const left = el('div', 'site-header__left');
  const brandLink = el('a', 'site-header__brand');
  brandLink.href = brand.querySelector('a')?.getAttribute('href') || '#';
  brandLink.innerHTML = `<span class="site-header__cleat" aria-hidden="true"></span><svg class="site-header__crest" width="90" height="90" viewBox="0 0 90 90" aria-hidden="true" focusable="false"><rect width="90" height="90" fill="#0067b1"/><rect x="38" y="14" width="14" height="40" fill="#ffd200"/><rect x="18" y="54" width="54" height="14" fill="#ffd200"/></svg><span class="site-header__brand-text">${text(brand)}</span>`;
  const actions = el('div', 'site-header__actions');
  const nav = el('nav', 'site-header__utility');
  nav.setAttribute('aria-label', 'Utility');
  const items = [...util.querySelectorAll('li')].map((li) => ({ label: text(li), href: li.querySelector('a')?.getAttribute('href') || '#' }));
  const [menuItem, contactItem, signItem] = items;
  const menuBtn = el('button', 'site-header__btn site-header__btn--outline', `${icon('menu')}<span>${menuItem.label}</span>`);
  menuBtn.type = 'button';
  const searchBtn = el('button', 'site-header__btn site-header__btn--solid site-header__btn--square', icon('search'));
  searchBtn.type = 'button';
  searchBtn.setAttribute('aria-label', 'Search');
  actions.append(menuBtn, searchBtn);
  left.append(brandLink, actions);
  const contact = el('a', 'site-header__contact', contactItem.label);
  contact.href = contactItem.href;
  const sign = el('a', 'site-header__btn site-header__btn--outline', `<span>${signItem.label}</span>${icon('down')}`);
  sign.href = signItem.href;
  nav.append(contact, sign);
  inner.append(left, nav);
  bar.append(inner);

  const banner = el('div', 'site-header__banner');
  const copy = el('div', 'site-header__copy');
  const h1 = el('h1', 'site-header__title', text(title));
  const form = el('form', 'site-header__search');
  form.setAttribute('role', 'search');
  form.addEventListener('submit', (e) => e.preventDefault());
  const input = el('input');
  input.type = 'search';
  input.placeholder = text(search);
  input.setAttribute('aria-label', text(search));
  const go = el('button', 'site-header__go', icon('search', 32));
  go.type = 'submit';
  go.setAttribute('aria-label', 'Search');
  form.append(input, go);
  const popular = el('div', 'site-header__popular');
  const popTitle = el('h2', 'site-header__popular-title', text(pop.querySelector('p, h2, h3')));
  const pills = el('ul', 'site-header__pills');
  pop.querySelectorAll('li').forEach((li) => {
    const a = li.querySelector('a');
    const item = el('li');
    const link = el('a', '', text(li));
    link.href = a?.getAttribute('href') || '#';
    item.append(link);
    pills.append(item);
  });
  popular.append(popTitle, pills);
  copy.append(h1, form, popular);
  const media = el('div', 'site-header__media');
  const img = hero.querySelector('img');
  if (img) media.append(img);
  banner.append(copy, media);

  const panel = el('div', 'site-header__panel');
  const tablist = el('div', 'site-header__tabs');
  tablist.setAttribute('role', 'tablist');
  [...tabs.querySelectorAll('li')].forEach((li, i) => {
    const t = el('button', 'site-header__tab', text(li));
    t.type = 'button';
    t.setAttribute('role', 'tab');
    t.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    t.addEventListener('click', () => {
      tablist.querySelectorAll('[role="tab"]').forEach((o) => o.setAttribute('aria-selected', String(o === t)));
    });
    tablist.append(t);
  });
  const cards = el('ul', 'site-header__cards');
  arts.querySelectorAll('li').forEach((li) => {
    const card = el('li', 'site-header__card');
    const pic = li.querySelector('picture, img');
    const a = li.querySelector('a');
    const imgWrap = el('div', 'site-header__card-img');
    if (pic) imgWrap.append(pic);
    const body = el('div', 'site-header__card-body');
    const link = el('a', 'site-header__card-link', `<span>${text(a || li)}</span>${icon('right', 28)}`);
    link.href = a?.getAttribute('href') || '#';
    body.append(link);
    card.append(imgWrap, body);
    cards.append(card);
  });
  const moreA = more.querySelector('a');
  const moreLink = el('a', 'site-header__more', `<span>${text(more)}</span>${icon('right')}`);
  moreLink.href = moreA?.getAttribute('href') || '#';
  const body = el('div', 'site-header__panel-body');
  body.append(cards, moreLink);
  panel.append(tablist, body);

  block.replaceChildren(bar, banner, panel);
}