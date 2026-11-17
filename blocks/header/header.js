const icon = (d, size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="${d}"/></svg>`;
const SEARCH = 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14';
const MENU = 'M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z';
const DOWN = 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z';
const RIGHT = 'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z';

export default function decorate(block) {
  const rows = [...block.children].map((r) => [...r.children]);
  const cell = (i) => rows[i] && rows[i][0];
  const text = (i) => (cell(i) ? cell(i).textContent.trim() : '');
  const [brandRow, contactRow, signRow, titleRow, placeholderRow, popularRow, imageRow, tabsRow] = [0, 1, 2, 3, 4, 5, 6, 7];

  const pills = cell(6) ? [...cell(6).querySelectorAll('li')].map((li) => li.textContent.trim()) : [];
  const cards = rows.filter((r) => r[0] && r[0].querySelector('img') && r.length > 1);
  const picture = cell(imageRow) && cell(imageRow).querySelector('img');
  const tabs = cell(tabsRow) ? [...cell(tabsRow).querySelectorAll('li')].map((li) => li.textContent.trim()) : [];
  const seeAll = rows.find((r) => r[0] && r[0].querySelector('a[data-see-all], a.see-all'));

  const bar = document.createElement('div');
  bar.className = 'header-bar';
  bar.innerHTML = `<div class="header-bar-inner">
    <div class="header-brand"><span class="header-cleat" aria-hidden="true"></span>
      <a class="header-logo" href="#" aria-label="${text(brandRow)}">
        <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true"><rect width="90" height="90" fill="#0067b1"/><rect x="40" y="12" width="10" height="30" fill="#ffd200"/><rect x="14" y="48" width="62" height="20" fill="#ffd200"/><rect x="0" y="78" width="90" height="12" fill="#002e53"/></svg>
        <span class="header-logo-text">Brisbane<br>City Council</span></a>
      <div class="header-tools">
        <button type="button" class="header-btn header-menu" aria-expanded="false">${icon(MENU)}<span>Menu</span></button>
        <button type="button" class="header-btn header-icon" aria-label="Search">${icon(SEARCH)}</button>
      </div></div>
    <div class="header-account"><a href="#" class="header-contact">${text(contactRow)}</a>
      <button type="button" class="header-btn header-signin"><span>${text(signRow)}</span>${icon(DOWN)}</button></div></div>`;

  const hero = document.createElement('div');
  hero.className = 'header-hero';
  const heroText = document.createElement('div');
  heroText.className = 'header-hero-text';
  heroText.innerHTML = `<h1>${text(titleRow)}</h1>
    <form class="header-search" role="search" action="#">
      <input type="search" name="q" placeholder="${text(placeholderRow)}" aria-label="${text(placeholderRow)}">
      <button type="submit" aria-label="${text(placeholderRow)}">${icon(SEARCH, 32)}</button></form>
    <h2>${text(popularRow)}</h2>
    <ul class="header-pills">${pills.map((p) => `<li><a href="#">${p}</a></li>`).join('')}</ul>`;
  const heroImg = document.createElement('div');
  heroImg.className = 'header-hero-image';
  if (picture) heroImg.append(picture);
  hero.append(heroText, heroImg);

  const focus = document.createElement('div');
  focus.className = 'header-focus';
  const tablist = document.createElement('div');
  tablist.className = 'header-tabs';
  tablist.setAttribute('role', 'tablist');
  tabs.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.textContent = t;
    tablist.append(b);
  });
  const panel = document.createElement('div');
  panel.className = 'header-panel';
  panel.setAttribute('role', 'tabpanel');
  const ul = document.createElement('ul');
  ul.className = 'header-cards';
  cards.forEach((r) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    const img = r[0].querySelector('img');
    a.append(img);
    const t = document.createElement('span');
    t.className = 'header-card-title';
    t.textContent = r[1].textContent.trim();
    const chev = document.createElement('span');
    chev.className = 'header-chevron';
    chev.innerHTML = icon(RIGHT, 28);
    a.append(t, chev);
    li.append(a);
    ul.append(li);
  });
  const more = document.createElement('a');
  more.className = 'header-more';
  more.href = '#';
  more.innerHTML = `<span>${seeAll ? seeAll[0].textContent.trim() : 'See all articles'}</span>${icon(RIGHT)}`;
  panel.append(ul, more);
  focus.append(tablist, panel);

  tablist.addEventListener('click', (e) => {
    const b = e.target.closest('[role=tab]');
    if (!b) return;
    tablist.querySelectorAll('[role=tab]').forEach((x) => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
  });
  bar.querySelector('.header-menu').addEventListener('click', (e) => {
    const t = e.currentTarget;
    t.setAttribute('aria-expanded', t.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });

  const wrap = document.createElement('div');
  wrap.className = 'header-hero-wrap';
  wrap.append(hero, focus);
  block.replaceChildren(bar, wrap);
}