export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const [textCell, imgCell] = cells;
  const card = document.createElement('div');
  card.className = 'promo-banner-card';

  const body = document.createElement('div');
  body.className = 'promo-banner-body';
  const h = textCell.querySelector('h1,h2,h3,h4,h5,h6');
  const title = document.createElement('h2');
  title.className = 'promo-banner-title';
  title.textContent = h ? h.textContent : '';
  const ps = [...textCell.querySelectorAll('p')].filter((p) => !p.querySelector('a'));
  const desc = document.createElement('p');
  desc.className = 'promo-banner-desc';
  desc.textContent = ps[0] ? ps[0].textContent.trim() : '';
  body.append(title, desc);

  const src = textCell.querySelector('a');
  if (src) {
    const a = document.createElement('a');
    a.className = 'promo-banner-link';
    a.href = src.getAttribute('href') || '#';
    const span = document.createElement('span');
    span.textContent = src.textContent;
    a.append(span);
    a.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    body.append(a);
  }

  const media = document.createElement('div');
  media.className = 'promo-banner-media';
  const img = imgCell && imgCell.querySelector('img');
  if (img) media.append(img);

  card.append(body, media);
  block.replaceChildren(card);
}