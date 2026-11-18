export default function decorate(block) {
  const rows = [...block.children];
  const pic = rows[0] && rows[0].querySelector('img');
  const cell = rows[1] && rows[1].firstElementChild;
  block.textContent = '';

  const media = document.createElement('div');
  media.className = 'near-me-banner-media';
  if (pic) media.append(pic);

  const card = document.createElement('div');
  card.className = 'near-me-banner-card';
  card.innerHTML = '<svg class="near-me-banner-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';

  if (cell) {
    const h = cell.querySelector('h1,h2,h3,h4,h5,h6');
    const heading = document.createElement('h2');
    heading.className = 'near-me-banner-title';
    heading.textContent = h ? h.textContent : '';
    card.append(heading);

    const p = [...cell.querySelectorAll('p')].find((el) => !el.querySelector('a') && !el.querySelector('img'));
    if (p) {
      const desc = document.createElement('p');
      desc.className = 'near-me-banner-text';
      desc.textContent = p.textContent;
      card.append(desc);
    }

    const a = cell.querySelector('a');
    if (a) {
      const link = document.createElement('a');
      link.className = 'near-me-banner-link';
      link.href = a.getAttribute('href') || '#';
      link.innerHTML = `<span>${a.textContent}</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"/></svg>`;
      card.append(link);
    }
  }

  block.append(media, card);
}