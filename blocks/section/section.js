export default function decorate(block) {
  const rows = [...block.children];
  const cells = rows.flatMap((r) => [...r.children]);
  const textCell = cells[0];
  const picCell = cells.find((c) => c.querySelector('img'));
  const title = textCell.querySelector('h1,h2,h3,h4,h5,h6') || textCell.querySelector('strong');
  const paragraphs = [...textCell.querySelectorAll('p')].filter((p) => !p.querySelector('a') && !p.contains(title));
  const link = textCell.querySelector('a');

  const content = document.createElement('div');
  content.className = 'section-content';
  if (title) {
    const h = document.createElement('h2');
    h.className = 'section-title';
    h.textContent = title.textContent;
    content.append(h);
  }
  paragraphs.forEach((p) => {
    p.className = 'section-text';
    content.append(p);
  });
  if (link) {
    link.className = 'section-link';
    link.insertAdjacentHTML('beforeend', '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    content.append(link);
  }

  const media = document.createElement('div');
  media.className = 'section-media';
  const img = picCell && picCell.querySelector('img');
  if (img) media.append(img);

  block.textContent = '';
  block.append(content, media);
}