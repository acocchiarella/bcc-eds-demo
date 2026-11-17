const CAL = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2z"/></svg>';
const PIN = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zM7 9a5 5 0 0 1 10 0c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9zm5-2.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"/></svg>';
const CHEV = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';

export default function decorate(block) {
  const rows = [...block.children];
  const head = rows.shift();
  const header = document.createElement('div');
  header.className = 'events-header';
  const cells = head ? [...head.children] : [];
  const title = document.createElement('h2');
  title.className = 'events-title';
  title.textContent = cells[0] ? cells[0].textContent.trim() : '';
  header.append(title);
  const link = cells[1] && cells[1].querySelector('a');
  if (link) {
    link.className = 'events-more';
    link.innerHTML = `<span>${link.textContent.trim()}</span>${CHEV}`;
    header.append(link);
  }

  const list = document.createElement('ul');
  list.className = 'events-list';
  rows.forEach((row) => {
    const [img, badges, name, date, place] = [...row.children];
    const li = document.createElement('li');
    li.className = 'events-card';
    const media = document.createElement('div');
    media.className = 'events-media';
    const pic = img && img.querySelector('img');
    if (pic) {
      pic.loading = 'lazy';
      media.append(pic);
    }
    const bl = document.createElement('ul');
    bl.className = 'events-badges';
    const names = ['free', 'category', 'status'];
    if (badges) {
      badges.querySelectorAll('p').forEach((p, i) => {
        const b = document.createElement('li');
        b.className = `events-badge events-badge-${names[i] || 'category'}`;
        b.textContent = p.textContent.trim();
        bl.append(b);
      });
    }
    media.append(bl);
    const body = document.createElement('div');
    body.className = 'events-body';
    const h3 = document.createElement('h3');
    h3.className = 'events-name';
    h3.textContent = name ? name.textContent.trim() : '';
    const meta = document.createElement('div');
    meta.className = 'events-meta';
    [[CAL, date], [PIN, place]].forEach(([icon, cell]) => {
      const p = document.createElement('p');
      p.innerHTML = icon;
      const s = document.createElement('span');
      s.textContent = cell ? cell.textContent.trim() : '';
      p.append(s);
      meta.append(p);
    });
    body.append(h3, meta);
    li.append(media, body);
    list.append(li);
  });
  block.replaceChildren(header, list);
}