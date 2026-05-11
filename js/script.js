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
const projects = [
  {emoji:'🏥',title:'MediCare Uganda',cat:'Healthcare System',desc:'A full hospital management system covering patient records, appointments, billing, pharmacy, and lab modules.',tech:['React','Node.js','PostgreSQL','Docker'],filter:'software'},
  {emoji:'🛍️',title:'ShopUg Marketplace',cat:'E-commerce',desc:'A multi-vendor e-commerce platform with MTN Mobile Money integration, supporting hundreds of sellers.',tech:['Next.js','Stripe','Mobile Money','Redis'],filter:'ecommerce'},
  {emoji:'🎓',title:'EduTrack School System',cat:'Education Software',desc:'Comprehensive school management used by 30+ schools — admissions, results, fees, timetabling and parent portals.',tech:['React','Django','MySQL','SMS API'],filter:'software'},
  {emoji:'📱',title:'RideSafe Uganda App',cat:'Mobile Application',desc:'A boda boda ride-hailing app connecting riders across 5 Ugandan cities with real-time GPS tracking.',tech:['React Native','Firebase','Google Maps','Node.js'],filter:'mobile'},
  {emoji:'🏦',title:'FinanceHub Portal',cat:'Fintech',desc:'Secure online banking and loan management for a Uganda-based SACCO with end-to-end encryption.',tech:['React','Express','MongoDB','JWT'],filter:'web'},
  {emoji:'🌾',title:'AgriConnect Platform',cat:'Web Application',desc:'A digital marketplace connecting Ugandan farmers directly to buyers with produce listings and logistics.',tech:['Vue.js','Laravel','PostgreSQL','Weather API'],filter:'web'},
  {emoji:'🔐',title:'SecureNet Audit Tool',cat:'Cybersecurity',desc:'An enterprise security audit and monitoring platform deployed for a Ugandan bank — detecting vulnerabilities in real-time.',tech:['Python','React','Elasticsearch','Docker'],filter:'security'},
  {emoji:'☁️',title:'CloudOps Migration',cat:'Cloud Computing',desc:'Migrated a regional NGO to AWS — reducing costs by 40% and improving uptime to 99.9%.',tech:['AWS','Terraform','Kubernetes','CI/CD'],filter:'cloud'},
  {emoji:'🎨',title:'BrandUp Design System',cat:'UI/UX Design',desc:'Complete brand identity and Figma component library for a Kampala-based fintech startup.',tech:['Figma','Design Tokens','Storybook'],filter:'design'},
];

const filters = ['all','web','mobile','software','ecommerce','security','cloud','design'];
let activeFilter = 'all';

function renderPortfolio() {
  // Filters
  const fEl = document.getElementById('portfolio-filters');
  fEl.innerHTML = filters.map(f=>`<button class="filter-btn ${f===activeFilter?'active':''}" onclick="setFilter('${f}')">${f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('');
  // Grid
  const filtered = activeFilter==='all' ? projects : projects.filter(p=>p.filter===activeFilter);
  document.getElementById('portfolio-grid').innerHTML = filtered.map(p=>`
    <div class="card project-card">
      <div class="project-preview">
        <span class="project-emoji">${p.emoji}</span>
        <div class="project-overlay"><span class="project-view">View Project →</span></div>
      </div>
      <div class="project-body">
        <span class="project-cat">${p.cat}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tech.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');
}

function setFilter(f) {
  activeFilter = f;
  renderPortfolio();
}

// ── CONTACT FORM ─────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.innerHTML = '<span class="spinner"></span> Sending…';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('form-area').innerHTML = `
      <div class="form-success">
        <div class="form-success-icon">✅</div>
        <h4>Message Sent!</h4>
        <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button class="btn btn-outline" onclick="location.reload()">Send Another</button>
      </div>`;
  }, 1800);
}

// ── INIT ─────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
renderPortfolio();
