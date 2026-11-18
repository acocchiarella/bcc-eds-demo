export default function decorate(block) {
  const rows = [...block.children];
  const heading = document.createElement('h2');
  heading.className = 'helpful-links-heading';
  heading.textContent = rows.shift().textContent.trim();

  const chevron = '<svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" focusable="false"><path d="M11 8l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const large = document.createElement('ul');
  large.className = 'helpful-links-large';
  const compact = document.createElement('ul');
  compact.className = 'helpful-links-compact';

  rows.forEach((row) => {
    const cells = [...row.children];
    const img = row.querySelector('img');
    const title = cells[1]?.textContent.trim() || '';
    const desc = cells[2]?.textContent.trim();
    const isLarge = !!desc;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = row.querySelector('a')?.getAttribute('href') || '#';
    a.className = 'helpful-links-card';

    const media = document.createElement('div');
    media.className = 'helpful-links-media';
    if (img) media.append(img);

    const body = document.createElement('div');
    body.className = 'helpful-links-body';
    const head = document.createElement('div');
    head.className = 'helpful-links-title';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const icon = document.createElement('span');
    icon.className = 'helpful-links-icon';
    icon.innerHTML = chevron;
    head.append(h3, icon);
    body.append(head);
    if (isLarge) {
      const p = document.createElement('p');
      p.textContent = desc;
      body.append(p);
    }
    a.append(media, body);
    li.append(a);
    (isLarge ? large : compact).append(li);
  });

  block.replaceChildren(heading, large, compact);
}