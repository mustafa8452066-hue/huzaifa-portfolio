/* =====================================================
   ✏️  EDIT ONLY THIS BLOCK  — put Huzaifa's real details
   Leave "" (empty) to hide that link automatically.
   ===================================================== */
const CONFIG = {
  email:     "huzaifaabbasi342@gmail.com",
  whatsapp:  "919082585072",
  instagram: "",   // full link, e.g. "https://instagram.com/yourid"
  youtube:   "",   // full link
  twitter:   "",   // full link (X)
  linkedin:  ""    // full link
};
/* ===================================================== */

const $ = s => document.querySelector(s);

/* ---------- Mobile menu ---------- */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

/* ---------- Active nav link on scroll ---------- */
const links = [...menu.querySelectorAll('a')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
secs.forEach(s => s && io.observe(s));

/* ---------- Reveal on scroll ---------- */
const ro = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); ro.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('section:not(.hero) > *, .card').forEach(el => { el.classList.add('reveal'); ro.observe(el); });

/* ---------- Skill bars fill when visible ---------- */
const bo = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.style.width = e.target.dataset.level + '%'; bo.unobserve(e.target); }
}), { threshold: .4 });
document.querySelectorAll('.bar i').forEach(b => bo.observe(b));

/* ---------- Hero image 3D tilt ---------- */
const hi = document.querySelector('.hero-img img');
if (hi && matchMedia('(hover:hover)').matches) {
  hi.addEventListener('mousemove', e => {
    const r = hi.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    hi.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.05)`;
  });
  hi.addEventListener('mouseleave', () => hi.style.transform = '');
}

/* ---------- Typing effect ---------- */
const typed = $('#typed');
const words = ['A Cricket Loving Student', 'A Future Cricketer', 'A Computer Science Student', 'A Big Dreamer'];
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let w = 0, c = words[0].length, del = true;
  (function tick() {
    let d;
    if (del) { c--; d = 45; if (c <= 0) { c = 0; del = false; w = (w + 1) % words.length; d = 300; } }
    else { c++; d = 85; if (c >= words[w].length) { del = true; d = 1800; } }
    typed.textContent = words[w].slice(0, c);
    setTimeout(tick, d);
  })();
}

/* ---------- Scroll progress, back-to-top ---------- */
const prog = $('#progress'), totop = $('#totop');
function onScroll() {
  const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
  prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  totop.classList.toggle('show', h.scrollTop > 500);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Loader ---------- */
const loader = $('#loader');
const hideLoader = () => loader.classList.add('hide');
addEventListener('load', () => setTimeout(hideLoader, 400));
setTimeout(hideLoader, 3000);

/* ---------- Footer year ---------- */
$('#year').textContent = new Date().getFullYear();

/* ---------- Social + contact links from CONFIG ---------- */
const icons = { youtube: ['▶', 'YouTube'], instagram: ['◎', 'Instagram'], twitter: ['𝕏', 'X'], linkedin: ['in', 'LinkedIn'] };
const social = $('#social');
Object.entries(icons).forEach(([k, [ico, label]]) => {
  if (!CONFIG[k]) return;
  const a = document.createElement('a');
  a.href = CONFIG[k]; a.target = '_blank'; a.rel = 'noopener'; a.textContent = ico; a.setAttribute('aria-label', label);
  social.appendChild(a);
});
if (!social.children.length) social.style.display = 'none';

const cl = $('#contactLinks');
const cards = [];
if (CONFIG.email) cards.push(['✉️', 'Email', CONFIG.email, 'mailto:' + CONFIG.email]);
if (CONFIG.whatsapp) cards.push(['💬', 'WhatsApp', '+' + CONFIG.whatsapp, 'https://wa.me/' + CONFIG.whatsapp]);
cards.forEach(([i, t, s, h]) => {
  const a = document.createElement('a');
  a.className = 'clink'; a.href = h; a.target = '_blank'; a.rel = 'noopener';
  a.innerHTML = `<span>${i}</span><div><b></b><small></small></div>`;
  a.querySelector('b').textContent = t; a.querySelector('small').textContent = s;
  cl.appendChild(a);
});
if (!cards.length) cl.innerHTML = '<p class="hint">Contact details coming soon 🏏</p>';

/* ---------- Contact form -> WhatsApp / Email ---------- */
const fb = $('#formBtns'), note = $('#formNote');
function addBtn(label, cls, fn) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'btn ' + cls; b.textContent = label; b.addEventListener('click', fn); fb.appendChild(b);
}
function getForm() {
  const n = $('#cName').value.trim(), m = $('#cMsg').value.trim();
  if (!n || !m) { note.textContent = 'Please fill in your name and message.'; return null; }
  note.textContent = ''; return { n, m };
}
if (CONFIG.whatsapp) addBtn('Send on WhatsApp', 'primary', () => {
  const f = getForm(); if (!f) return;
  open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(`Hi Huzaifa, I'm ${f.n}.\n${f.m}`), '_blank');
});
if (CONFIG.email) addBtn('Send by Email', CONFIG.whatsapp ? '' : 'primary', () => {
  const f = getForm(); if (!f) return;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Message from ' + f.n)}&body=${encodeURIComponent(f.m)}`;
});
if (!fb.children.length) { fb.style.display = 'none'; note.textContent = 'Messaging will be available soon.'; }

/* ---------- Lightbox for cricket frames ---------- */
const figs = [...document.querySelectorAll('.frames figure')];
const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
let cur = 0;
function show(i) {
  cur = (i + figs.length) % figs.length;
  const img = figs[cur].querySelector('img');
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = figs[cur].querySelector('figcaption').textContent;
}
function openLb(i) { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
figs.forEach((f, i) => f.addEventListener('click', () => openLb(i)));
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', () => show(cur - 1));
$('#lbNext').addEventListener('click', () => show(cur + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') show(cur - 1);
  if (e.key === 'ArrowRight') show(cur + 1);
});
