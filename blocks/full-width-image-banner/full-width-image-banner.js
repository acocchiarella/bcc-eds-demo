export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  const img = block.querySelector('img');
  const title = block.querySelector('h1, h2, h3, h4, h5, h6');
  const link = block.querySelector('a');
  const paras = [...block.querySelectorAll('p')].filter((p) => !p.querySelector('img, a') && p.textContent.trim());

  const media = document.createElement('div');
  media.className = 'full-width-image-banner-media';
  if (img) {
    img.loading = 'lazy';
    media.append(img);
  }

  const panel = document.createElement('section');
  panel.className = 'full-width-image-banner-panel';
  if (title) panel.setAttribute('aria-labelledby', 'fwib-title');

  const icon = document.createElement('span');
  icon.className = 'full-width-image-banner-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 43s13-12.5 13-23a13 13 0 0 0-26 0c0 10.500 13 23 13 23z"/><circle cx="24" cy="20" r="4.500"/></svg>';
  panel.append(icon);

  if (title) {
    const h = document.createElement('h2');
    h.id = 'fwib-title';
    h.textContent = title.textContent;
    panel.append(h);
  }
  paras.forEach((p) => {
    const d = document.createElement('p');
    d.textContent = p.textContent;
    panel.append(d);
  });
  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href') || '#';
    a.className = 'full-width-image-banner-link';
    a.innerHTML = '<span></span><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
    a.querySelector('span').textContent = link.textContent;
    panel.append(a);
  }

  block.textContent = '';
  if (cell === null && !img) return;
  block.append(media, panel);
}