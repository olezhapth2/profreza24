/* ═══════════════════════════════════════
   ProFreza24 — Main JS
   ═══════════════════════════════════════ */

// ── Burger Menu ──
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.innerHTML = isOpen
      ? '<span class="material-icons">close</span>'
      : '<span class="material-icons">menu</span>';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    if (burgerBtn) burgerBtn.innerHTML = '<span class="material-icons">menu</span>';
    document.body.style.overflow = '';
  });
});

// ── FAQ Toggle ──
function toggleFaq(btn) {
  const item = btn.closest('.faq__item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// ── Calculator ──
const calcService = document.getElementById('calcService');
const calcMaterial = document.getElementById('calcMaterial');
const calcThickness = document.getElementById('calcThickness');
const calcArea = document.getElementById('calcArea');
const calcPrice = document.getElementById('calcPrice');

const prices = {
  frezerovka: { derevo: 850, plastik: 950, orgsteklo: 1100, metal: 1300 },
  lazer: { derevo: 600, plastik: 500, orgsteklo: 700, metal: 900 },
  uv: { derevo: 1200, plastik: 1100, orgsteklo: 1400, metal: 1600 }
};

function updateCalc() {
  if (!calcService || !calcPrice) return;
  const service = calcService.value;
  const material = calcMaterial.value;
  const thickness = parseFloat(calcThickness.value) || 1;
  const area = parseFloat(calcArea.value) || 0;

  if (area === 0) { calcPrice.textContent = '—'; return; }

  const basePrice = prices[service]?.[material] || 850;
  const thickMultiplier = thickness > 10 ? 1 + (thickness - 10) * 0.03 : 1;
  const total = Math.round(basePrice * area * thickMultiplier);
  calcPrice.textContent = total.toLocaleString('ru-RU') + ' ₽';
}

[calcService, calcMaterial].forEach(el => el?.addEventListener('change', updateCalc));
[calcThickness, calcArea].forEach(el => el?.addEventListener('input', updateCalc));

// ── File Upload ──
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');

if (fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = 'Файл не выбран';
    }
  });
}

// ── Form Submit ──
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '<span class="material-icons icon-sm">hourglass_empty</span> Отправка...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span class="material-icons icon-sm">check_circle</span> Отправлено!';
    btn.style.background = 'var(--success)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
      if (fileName) fileName.textContent = 'Файл не выбран';
    }, 2500);
  }, 1200);
}

// ── Header Scroll ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 80 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
});

// ── Intersection Observer (fade-up) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Price Tabs ──
document.querySelectorAll('.price-tab[data-target]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.price-tab[data-target]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.target;
    document.querySelectorAll('.price-table-wrapper').forEach(w => {
      w.style.display = w.id === target ? 'block' : 'none';
    });
  });
});

// ── Portfolio Filter ──
document.querySelectorAll('#portfolioFilters .price-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#portfolioFilters .price-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#portfolioGrid .portfolio-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});
