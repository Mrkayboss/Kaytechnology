// ── ROUTING ──────────────────────────────────
const pages = ['home','about','services','portfolio','contact'];
let currentPage = 'home';

function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.nav-link,.mobile-link').forEach(l => l.classList.remove('active'));
  const nl = document.getElementById('nav-'+page);
  const ml = document.getElementById('mnav-'+page);
  if(nl) nl.classList.add('active');
  if(ml) ml.classList.add('active');
  currentPage = page;
  window.scrollTo(0,0);
  if(page==='portfolio') renderPortfolio();
}

// ── NAVBAR SCROLL ───────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ─────────────────────────────
function toggleMenu() {
  document.getElementById('burger').classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

// ── ROTATING WORDS ──────────────────────────
const words = ['Technology','Innovation','Digital Future','Excellence'];
let wi = 0;
setInterval(() => {
  wi = (wi+1)%words.length;
  const el = document.getElementById('rotating-word');
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.textContent = words[wi];
  el.style.animation = '';
}, 2800);

// ── PORTFOLIO DATA & RENDER ──────────────────
// Portfolio items are now stored in a standalone HTML file: assets/portfolio-items.html
let portfolioItemsHtml = null;
function loadPortfolioItems() {
  if (portfolioItemsHtml) return Promise.resolve(portfolioItemsHtml);
  return fetch('assets/portfolio-items.html')
    .then(r => r.text())
    .then(html => { portfolioItemsHtml = html; return html; })
    .catch(err => { console.error('Failed to load portfolio items', err); return ''; });
}

const filters = ['all','web','mobile','software','ecommerce','security','cloud','design'];
let activeFilter = 'all';

function renderPortfolio() {
  // Filters
  const fEl = document.getElementById('portfolio-filters');
  fEl.innerHTML = filters.map(f=>`<button class="filter-btn ${f===activeFilter?'active':''}" onclick="setFilter('${f}')">${f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('');
  // Grid
  const grid = document.getElementById('portfolio-grid');
  loadPortfolioItems().then(html => {
    grid.innerHTML = html;
    const cards = grid.querySelectorAll('.project-card');
    cards.forEach(card => {
      const f = card.getAttribute('data-filter') || '';
      card.style.display = (activeFilter === 'all' || f === activeFilter) ? '' : 'none';
    });
  });
}

let projectModalZoom = 1;

function openProjectModal(imageSrc, title) {
  const modal = document.getElementById('project-modal');
  const modalImg = modal.querySelector('.project-modal-img');
  const modalTitle = modal.querySelector('.project-modal-title');
  modalImg.src = imageSrc;
  modalImg.alt = title;
  modalTitle.textContent = title;
  projectModalZoom = 1;
  updateProjectModalZoom();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function changeProjectModalZoom(delta) {
  projectModalZoom = Math.min(3, Math.max(1, projectModalZoom + delta));
  updateProjectModalZoom();
}

function resetProjectModalZoom() {
  projectModalZoom = 1;
  updateProjectModalZoom();
}

function updateProjectModalZoom() {
  const modalImg = document.querySelector('#project-modal .project-modal-img');
  if (modalImg) modalImg.style.transform = `scale(${projectModalZoom})`;
}

function setFilter(f) {
  activeFilter = f;
  renderPortfolio();
}

// ── CONTACT FORM ─────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const service = document.getElementById('contact-service').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const subject = encodeURIComponent(`New KayTechnologies Message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || 'N/A'}\n` +
    `Service: ${service || 'Not specified'}\n\n` +
    `Message:\n${message}`
  );

  const mailto = `mailto:okellopaulnicholas95@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  const btn = document.getElementById('submit-btn');
  btn.innerHTML = '<span class="spinner"></span> Opening Email…';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('form-area').innerHTML = `
      <div class="form-success">
        <div class="form-success-icon">✅</div>
        <h4>Email Draft Opened</h4>
        <p>Please send the message from your email client to complete contact.</p>
        <button class="btn btn-outline" onclick="location.reload()">Send Another</button>
      </div>`;
  }, 1500);
}

// ── INIT ─────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
renderPortfolio();

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProjectModal();
});