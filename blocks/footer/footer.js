const ICONS = {
  email: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M9 6l6 6-6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M6 9l6 6 6-6"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M14 8V6.5c0-.7.3-1 1-1h2V2h-3a4 4 0 0 0-4 4v2H7v3.5h3V22h4v-10.5h3L17.500 8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.500" cy="6.500" r="1.200" fill="currentColor"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.800" d="M4 4l16 16M20 4L4 20"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M4 9h4v11H4zM6 3.500a2.200 2.200 0 1 1 0 4.400 2.200 2.200 0 0 1 0-4.400zM10 9h3.800v1.600c.6-1 1.900-1.900 3.700-1.900 3.600 0 4.500 2.300 4.500 5.400V20h-4v-5.200c0-1.300-.1-2.700-1.800-2.700s-2.200 1.200-2.200 2.600V20h-4z"/></svg>'
};

const CREST = '<svg viewBox="0 0 88 88" width="88" height="88" role="img" aria-label="Brisbane City"><rect width="88" height="88" fill="#0067b1"/><rect x="38" y="14" width="12" height="36" fill="#ffd200"/><rect x="14" y="52" width="60" height="14" fill="#ffd200"/><text x="44" y="80" font-size="8" font-weight="700" text-anchor="middle" fill="#fff">BRISBANE CITY</text></svg>';
const LOCKUP = '<svg viewBox="0 0 282 84" width="282" height="84" role="img" aria-label="Brisbane 2032 Olympic and Paralympic Games Host, Queensland"><g fill="none" stroke-width="3"><circle cx="14" cy="42" r="10" stroke="#0067b1"/><circle cx="30" cy="42" r="10" stroke="#000"/><circle cx="46" cy="42" r="10" stroke="#c4162a"/></g><text x="152" y="22" font-size="14" text-anchor="middle" fill="#333">Host City</text><text x="152" y="44" font-size="14" font-weight="700" text-anchor="middle" fill="#002e53">Brisbane 2032</text><path d="M240 50q20-14 36 0" fill="none" stroke="#0067b1" stroke-width="3"/></svg>';

function list(rows) {
  const ul = document.createElement('ul');
  rows.forEach((r) => {
    const li = document.createElement('li');
    while (r.firstChild) li.append(r.firstChild);
    ul.append(li);
  });
  return ul;
}

export default function decorate(block) {
  const rows = [...block.children].map((r) => r.firstElementChild);
  const [subscribe, brand, menu, seeAlso, contact, social, legal, copy] = rows;

  const sub = document.createElement('div');
  sub.className = 'footer-subscribe';
  const subLink = subscribe.querySelector('a');
  const subText = document.createElement('p');
  subText.textContent = subscribe.querySelector('p')?.textContent || '';
  sub.append(subText);
  if (subLink) {
    subLink.className = 'footer-subscribe-link';
    subLink.innerHTML = `${ICONS.email}<span>${subLink.textContent}</span>`;
    sub.append(subLink);
  }

  const nav = (cell, label) => {
    const h = cell.querySelector('h2,h3,h4');
    const col = document.createElement('nav');
    col.className = 'footer-col';
    col.setAttribute('aria-label', label || h.textContent);
    const hd = document.createElement('h2');
    hd.textContent = h.textContent;
    col.append(hd, list([...cell.querySelectorAll('li')]));
    return col;
  };

  const brandCol = document.createElement('div');
  brandCol.className = 'footer-brand';
  const ack = brand.querySelector('p');
  const tag = brand.querySelector('em, strong');
  const logos = document.createElement('div');
  logos.className = 'footer-logos';
  logos.innerHTML = `<div class="footer-crest">${CREST}<span class="footer-tagline">${tag ? tag.textContent : ''}</span></div><div class="footer-lockup">${LOCKUP}</div>`;
  const translate = document.createElement('div');
  translate.className = 'footer-translate';
  const lbl = brand.querySelector('h2,h3,h4');
  const opt = [...brand.querySelectorAll('p')].pop().textContent;
  translate.innerHTML = `<label for="footer-lang">${lbl.textContent}</label><div class="footer-select"><select id="footer-lang"><option>${opt}</option></select>${ICONS.down}</div>`;
  brandCol.append(logos, ack, translate);

  const contactCol = document.createElement('div');
  contactCol.className = 'footer-col footer-contact';
  const ch = document.createElement('h2');
  ch.textContent = contact.querySelector('h2,h3,h4').textContent;
  const btn = contact.querySelector('a');
  btn.className = 'footer-button';
  btn.innerHTML = `<span>${btn.textContent}</span>${ICONS.chevron}`;
  const dl = document.createElement('dl');
  [...contact.querySelectorAll('p')].forEach((p) => {
    const a = p.querySelector('a');
    const dt = document.createElement('dt');
    dt.textContent = p.firstChild.textContent.trim();
    const dd = document.createElement('dd');
    dd.append(a);
    dl.append(dt, dd);
  });
  const soc = document.createElement('ul');
  soc.className = 'footer-social';
  [...social.querySelectorAll('a')].forEach((a) => {
    const key = a.textContent.trim().toLowerCase();
    const li = document.createElement('li');
    a.setAttribute('aria-label', a.textContent.trim());
    a.innerHTML = ICONS[key] || '';
    li.append(a);
    soc.append(li);
  });
  contactCol.append(ch, btn, dl, soc);

  const main = document.createElement('div');
  main.className = 'footer-main';
  const cols = document.createElement('div');
  cols.className = 'footer-columns';
  cols.append(brandCol, nav(menu), nav(seeAlso), contactCol);
  main.append(cols);

  const leg = document.createElement('div');
  leg.className = 'footer-legal';
  const lnav = document.createElement('nav');
  lnav.setAttribute('aria-label', 'Legal');
  lnav.append(list([...legal.querySelectorAll('li')]));
  const cp = document.createElement('p');
  cp.textContent = copy.textContent;
  leg.append(lnav, cp);

  block.textContent = '';
  block.append(sub, main, leg);
}