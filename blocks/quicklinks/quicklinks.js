const ICONS = [
  '<path d="M8 6h24v36H8zM14 16h12M14 22h12M14 28h8"/><circle cx="14" cy="10" r="6"/>',
  '<path d="M6 36c0-12 8-20 20-20 8 0 14 6 14 14v6H6z"/><circle cx="30" cy="26" r="1.5"/>',
  '<path d="M16 6h24v40H16z"/><path d="M16 12h24"/><circle cx="38" cy="44" r="3"/>',
  '<path d="M6 10h44v34H6z"/><path d="M22 18h22v22H22z"/><path d="M28 40V30h10v10"/>',
  '<path d="M6 20h44v26H6z"/><path d="M20 20v-6h16v6M6 32h44"/>',
  '<path d="M28 48L8 28a12 12 0 0 1 20-14 12 12 0 0 1 20 14z"/><path d="M20 28l8 8M26 24l10 10"/>',
];

export default function decorate(block) {
  const rows = [...block.children];
  const titleRow = rows.shift();
  const title = document.createElement('h2');
  title.className = 'quicklinks-title';
  title.textContent = titleRow.textContent.trim();

  const list = document.createElement('ul');
  list.className = 'quicklinks-grid';
  rows.forEach((row, i) => {
    const cells = [...row.children];
    const link = cells[0].querySelector('a');
    const heading = (link ? link.textContent : cells[0].textContent).trim();
    const desc = cells[1] ? cells[1].textContent.trim() : '';
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'quicklinks-tile';
    a.href = link ? link.getAttribute('href') : '#';
    a.innerHTML = `<svg class="quicklinks-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[i % ICONS.length]}</svg>
      <span class="quicklinks-label"><span class="quicklinks-name"></span><svg class="quicklinks-chevron" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6l8 8-8 8"/></svg></span>
      <span class="quicklinks-desc"></span>`;
    a.querySelector('.quicklinks-name').textContent = heading;
    a.querySelector('.quicklinks-desc').textContent = desc;
    li.append(a);
    list.append(li);
  });

  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'quicklinks-more';
  more.setAttribute('aria-expanded', 'false');
  more.innerHTML = '<span>Show more</span><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  more.addEventListener('click', () => {
    const open = more.getAttribute('aria-expanded') === 'true';
    more.setAttribute('aria-expanded', String(!open));
  });

  const wrap = document.createElement('div');
  wrap.className = 'quicklinks-more-wrap';
  wrap.append(more);
  block.replaceChildren(title, list, wrap);
}