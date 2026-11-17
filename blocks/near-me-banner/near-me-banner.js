export default function decorate(block) {
  const img = block.querySelector('img');
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const link = block.querySelector('a');
  const paragraphs = [...block.querySelectorAll('p')].filter((p) => !p.querySelector('img') && !p.querySelector('a'));

  const bg = document.createElement('div');
  bg.className = 'near-me-banner-bg';
  if (img) bg.append(img);

  const panel = document.createElement('div');
  panel.className = 'near-me-banner-panel';

  const icon = document.createElement('span');
  icon.className = 'near-me-banner-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 43C24 43 12 30.5 12 20a12 12 0 0 1 24 0c0 10.500-12 23-12 23z"/><circle cx="24" cy="20" r="4.500"/></svg>';

  panel.append(icon);
  if (heading) {
    heading.classList.add('near-me-banner-title');
    panel.append(heading);
  }
  paragraphs.forEach((p) => {
    p.classList.add('near-me-banner-text');
    panel.append(p);
  });
  if (link) {
    link.classList.add('near-me-banner-link');
    link.removeAttribute('class');
    link.className = 'near-me-banner-link';
    link.insertAdjacentHTML('beforeend', '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>');
    panel.append(link);
  }

  block.textContent = '';
  block.append(bg, panel);
}