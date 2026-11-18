export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const [textCell, imageCell] = cells;
  const title = textCell.querySelector('h1,h2,h3,h4,h5,h6');
  const link = textCell.querySelector('a');
  const paragraphs = [...textCell.querySelectorAll('p')].filter((p) => !p.querySelector('a'));

  const text = document.createElement('div');
  text.className = 'promo-banner-text';

  const heading = document.createElement('h2');
  heading.className = 'promo-banner-title';
  heading.textContent = title ? title.textContent : '';
  text.append(heading);

  const desc = document.createElement('p');
  desc.className = 'promo-banner-description';
  desc.textContent = paragraphs.map((p) => p.textContent.trim()).join(' ');
  text.append(desc);

  if (link) {
    const a = document.createElement('a');
    a.className = 'promo-banner-link';
    a.href = link.getAttribute('href') || '#';
    const label = document.createElement('span');
    label.textContent = link.textContent.trim();
    a.append(label);
    a.insertAdjacentHTML('beforeend', '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    text.append(a);
  }

  const media = document.createElement('div');
  media.className = 'promo-banner-media';
  const img = imageCell && imageCell.querySelector('img');
  if (img) media.append(img);

  block.textContent = '';
  const card = document.createElement('div');
  card.className = 'promo-banner-card';
  card.append(text, media);
  block.append(card);
}