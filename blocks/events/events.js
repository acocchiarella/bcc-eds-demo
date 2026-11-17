const ICONS = {
  calendar: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14zm0-12H5V5h14z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 2a5 5 0 0 1 5 5c0 2.38-2.12 5.75-5 9.2C9.12 14.75 7 11.38 7 9a5 5 0 0 1 5-5m0 2.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6"/></svg>',
};

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

export default function decorate(block) {
  const [head, ...rows] = [...block.children];
  const section = el('section', 'events-inner');
  section.setAttribute('aria-labelledby', 'events-title');

  const header = el('div', 'events-header');
  const cells = head ? [...head.firstElementChild.children] : [];
  const title = el('h2', 'events-title', cells[0] ? cells[0].textContent.trim() : '');
  title.id = 'events-title';
  header.append(title);
  const src = cells[1] && cells[1].querySelector('a');
  if (src) {
    const more = el('a', 'events-more');
    more.href = src.getAttribute('href') || '#';
    more.append(el('span', '', src.textContent.trim()));
    more.insertAdjacentHTML('beforeend', ICONS.chevron);
    header.append(more);
  }

  const list = el('ul', 'events-list');
  rows.forEach((row) => {
    const [img, badges, name, date, place] = [...row.firstElementChild.children];
    const li = el('li', 'events-card');
    const media = el('div', 'events-media');
    const pic = img && img.querySelector('img');
    if (pic) media.append(pic);
    const badgeList = el('ul', 'events-badges');
    [...(badges ? badges.querySelectorAll('li, p') : [])].forEach((b, i) => {
      const item = el('li', `events-badge events-badge-${['free', 'category', 'status'][i] || 'extra'}`);
      item.textContent = b.textContent.trim();
      badgeList.append(item);
    });
    media.append(badgeList);
    const body = el('div', 'events-body');
    body.append(el('h3', 'events-name', name ? name.textContent.trim() : ''));
    const meta = el('ul', 'events-meta');
    meta.append(
      el('li', '', `${ICONS.calendar}<span>${date ? date.textContent.trim() : ''}</span>`),
      el('li', '', `${ICONS.pin}<span>${place ? place.textContent.trim() : ''}</span>`),
    );
    body.append(meta);
    li.append(media, body);
    list.append(li);
  });

  section.append(header, list);
  block.replaceChildren(section);
}