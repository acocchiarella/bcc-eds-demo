export default function decorate(block) {
  const rows = [...block.children];
  const headingRow = rows.shift();
  const heading = document.createElement('h2');
  heading.className = 'helpful-links-heading';
  heading.textContent = headingRow.textContent.trim();

  const large = document.createElement('ul');
  large.className = 'helpful-links-large';
  const compact = document.createElement('ul');
  compact.className = 'helpful-links-compact';

  rows.forEach((row) => {
    const cells = [...row.children];
    const img = cells[0].querySelector('img');
    const title = cells[1].textContent.trim();
    const desc = cells[2] ? cells[2].textContent.trim() : '';
    const link = cells[1].querySelector('a');
    const li = document.createElement('li');
    li.className = desc ? 'helpful-links-card' : 'helpful-links-card is-compact';

    const a = document.createElement('a');
    a.href = link ? link.getAttribute('href') : '#';

    const media = document.createElement('div');
    media.className = 'helpful-links-media';
    if (img) media.append(img);

    const body = document.createElement('div');
    body.className = 'helpful-links-body';
    const head = document.createElement('div');
    head.className = 'helpful-links-title';
    const span = document.createElement('span');
    span.textContent = title;
    head.append(span);
    head.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path d="M9.5 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    body.append(head);
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      body.append(p);
    }

    a.append(media, body);
    li.append(a);
    (desc ? large : compact).append(li);
  });

  block.textContent = '';
  block.append(heading, large, compact);
}