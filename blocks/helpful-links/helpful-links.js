export default function decorate(block) {
  const rows = [...block.children];
  const headingRow = rows.shift();
  const h2 = document.createElement('h2');
  h2.className = 'helpful-links-heading';
  h2.textContent = headingRow.textContent.trim();

  const large = document.createElement('ul');
  large.className = 'helpful-links-large';
  const compact = document.createElement('ul');
  compact.className = 'helpful-links-compact';

  const chevron = '<svg class="helpful-links-chevron" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" focusable="false"><path d="M11 7l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  rows.forEach((row) => {
    const cells = [...row.children];
    const img = row.querySelector('img');
    const link = row.querySelector('a');
    const title = cells[1] ? cells[1].textContent.trim() : '';
    const desc = cells[2] ? cells[2].textContent.trim() : '';
    const li = document.createElement('li');
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
    head.insertAdjacentHTML('beforeend', chevron);
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
  block.append(h2, large, compact);
}