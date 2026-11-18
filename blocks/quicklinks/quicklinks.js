const ICONS = {
  'services-hub': '<path d="M14 8h28v8M14 8v40h22"/><circle cx="12" cy="14" r="7"/><path d="M9 14l2 2 4-4M20 22h18M20 29h18M20 36h12M44 34l8-8 4 4-8 8-5 1z"/>',
  'animals-and-pets': '<path d="M8 40c0-12 8-20 20-20 4 0 8 2 10 4l8-6 2 10c2 3 2 8-2 11-4 3-10 1-12-2-3 4-12 6-18 3-4-1-8-0-8 0z"/><circle cx="40" cy="28" r="1.5"/>',
  'bins-waste-and-recycling': '<path d="M16 8h24v40H16zM14 8h28M16 14h24"/><circle cx="38" cy="46" r="2.5"/>',
  'building-and-planning': '<path d="M10 12h40v32H10zM10 12c-3 0-3 4 0 4v28"/><path d="M26 34l9-8 9 8v8H26zM32 42v-6h6v6"/>',
  business: '<path d="M8 22h40v26H8zM20 22v-6h16v6M8 34h40"/><rect x="25" y="31" width="6" height="6"/>',
  'community-support-and-safety': '<path d="M28 48L10 30c-5-6-1-16 7-16 5 0 9 3 11 6 2-3 6-6 11-6 8 0 12 10 7 16z"/><path d="M20 28l8 8M26 24l10 10M32 24l8 8"/>'
};

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const chevron = '<svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" focusable="false"><path d="M11 7l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows.shift();
  const title = document.createElement('h2');
  title.className = 'quicklinks-title';
  title.textContent = heading.textContent.trim();

  const more = rows.pop();
  const moreLabel = more.textContent.trim();

  const list = document.createElement('ul');
  list.className = 'quicklinks-list';
  rows.forEach((row) => {
    const cells = [...row.children];
    const name = cells[0].textContent.trim();
    const desc = cells[1] ? cells[1].textContent.trim() : '';
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'quicklinks-card';
    const icon = ICONS[slug(name)] || '';
    a.innerHTML = `<svg class="quicklinks-icon" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
      <span class="quicklinks-label"><span class="quicklinks-name"></span>${chevron}</span>
      <span class="quicklinks-desc"></span>`;
    a.querySelector('.quicklinks-name').textContent = name;
    a.querySelector('.quicklinks-desc').textContent = desc;
    li.append(a);
    list.append(li);
  });

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'quicklinks-more';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  btn.firstChild.textContent = moreLabel;
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });

  const wrap = document.createElement('div');
  wrap.className = 'quicklinks-action';
  wrap.append(btn);

  block.replaceChildren(title, list, wrap);
}