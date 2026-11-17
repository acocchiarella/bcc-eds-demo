export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const [media, content] = cells;
  const img = media && media.querySelector('img');
  const title = content && content.querySelector('h1, h2, h3, h4, h5, h6');
  const link = content && content.querySelector('a');
  const desc = content && [...content.querySelectorAll('p')].find((p) => !p.querySelector('a'));

  block.textContent = '';

  if (img) {
    const bg = document.createElement('div');
    bg.className = 'full-width-image-banner-media';
    img.alt = img.alt || '';
    bg.append(img);
    block.append(bg);
  }

  const card = document.createElement('div');
  card.className = 'full-width-image-banner-card';
  card.innerHTML = '<svg class="full-width-image-banner-icon" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M24 6c-6.6 0-12 5.2-12 11.7 0 8.6 12 23.3 12 23.3s12-14.700 12-23.300C36 11.200 30.600 6 24 6z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="18" r="4.500" fill="none" stroke="currentColor" stroke-width="3"/></svg>';

  const h = document.createElement('h2');
  h.textContent = title ? title.textContent : '';
  card.append(h);

  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent;
    card.append(p);
  }

  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href') || '#';
    a.className = 'full-width-image-banner-link';
    a.innerHTML = '<span></span><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    a.querySelector('span').textContent = link.textContent;
    card.append(a);
  }

  block.append(card);
}