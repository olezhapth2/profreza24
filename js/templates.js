/* ═══════════════════════════════════════
   ProFreza24 — Shared Template Engine
   Auto-detects directory depth for paths
   ═══════════════════════════════════════ */

function getBase() {
  const path = window.location.pathname;
  const depth = path.split('/').filter(Boolean).length - 1;
  if (depth === 0) return '';
  return '../'.repeat(depth);
}

function p(href) {
  return getBase() + href;
}

function renderHeader(activePage) {
  const pages = [
    { href: 'index.html', label: 'Главная', icon: 'home' },
    { href: 'uslugi/index.html', label: 'Услуги', icon: 'precision_manufacturing' },
    { href: 'portfolio/index.html', label: 'Портфолио', icon: 'photo_library' },
    { href: 'price/index.html', label: 'Прайс', icon: 'receipt_long' },
    { href: 'kontakty/index.html', label: 'Контакты', icon: 'mail' }
  ];

  const navLinks = pages.map(pg =>
    `<a href="${p(pg.href)}" class="nav-link${pg.href === activePage ? ' active' : ''}">${pg.label}</a>`
  ).join('');

  const mobileLinks = pages.map(pg =>
    `<a href="${p(pg.href)}" class="mobile-menu__link${pg.href === activePage ? ' active' : ''}"><span class="material-icons">${pg.icon}</span> ${pg.label}</a>`
  ).join('');

  return `
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="${p('index.html')}" class="header__logo">
        <span class="material-icons">settings</span> ProFreza24
      </a>
      <nav class="header__nav">${navLinks}</nav>
      <div class="header__actions">
        <a href="tel:+74951234567" class="header__phone">
          <span class="material-icons icon-sm">call</span> +7 (495) 123-45-67
        </a>
        <a href="${p('kontakty/index.html')}" class="btn btn--primary btn--md btn--round">
          <span class="material-icons icon-sm">file_upload</span> Загрузить файл
        </a>
        <button class="header__burger" id="burgerBtn" aria-label="Меню">
          <span class="material-icons">menu</span>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
      <a href="tel:+74951234567" class="mobile-menu__phone">
        <span class="material-icons">call</span> +7 (495) 123-45-67
      </a>
      <div class="mobile-menu__cta">
        <a href="${p('kontakty/index.html')}" class="btn btn--primary btn--lg btn--full btn--round">
          <span class="material-icons icon-sm">calculate</span> Рассчитать стоимость
        </a>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <a href="${p('index.html')}" class="footer__logo">
            <span class="material-icons">settings</span> ProFreza24
          </a>
          <p class="footer__desc">Фрезеровка на ЧПУ, лазерная резка и УФ-печать листовых материалов. Производство в Москве с 2013 года.</p>
          <div class="footer__socials">
            <a href="#" class="footer__social" aria-label="Telegram"><span class="material-icons icon-sm">chat</span></a>
            <a href="#" class="footer__social" aria-label="WhatsApp"><span class="material-icons icon-sm">phone</span></a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Услуги</h4>
          <a href="${p('uslugi/frezerovka-na-chpu/index.html')}" class="footer__link"><span class="material-icons">settings</span> Фрезеровка</a>
          <a href="${p('lazernaya-rezka/index.html')}" class="footer__link"><span class="material-icons">bolt</span> Лазерная резка</a>
          <a href="${p('uslugi/uf-pechat/index.html')}" class="footer__link"><span class="material-icons">print</span> УФ-печать</a>
          <a href="${p('uslugi/index.html')}#3d" class="footer__link"><span class="material-icons">3d_rotation</span> 3D-фрезеровка</a>
        </div>
        <div>
          <h4 class="footer__heading">Контакты</h4>
          <a href="tel:+74951234567" class="footer__link footer__link--phone"><span class="material-icons">call</span> +7 (495) 123-45-67</a>
          <a href="mailto:info@profreza24.ru" class="footer__link"><span class="material-icons">mail</span> info@profreza24.ru</a>
          <p class="footer__link"><span class="material-icons">location_on</span> г. Москва, ул. Промышленная, д. 5</p>
          <p class="footer__link"><span class="material-icons">schedule</span> Пн–Пт: 9:00–22:00</p>
        </div>
        <div>
          <h4 class="footer__heading">Инфо</h4>
          <a href="${p('portfolio/index.html')}" class="footer__link"><span class="material-icons">photo_library</span> Портфолио</a>
          <a href="${p('price/index.html')}" class="footer__link"><span class="material-icons">receipt</span> Прайс</a>
          <a href="${p('blog/index.html')}" class="footer__link"><span class="material-icons">article</span> Блог</a>
          <a href="${p('kontakty/index.html')}" class="footer__link"><span class="material-icons">mail</span> Контакты</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2025 ProFreza24. Все права защищены.</span>
        <a href="${p('privacy/index.html')}">Политика конфиденциальности</a>
        <a href="${p('soglasie-na-obrabotku-personalnykh-dannykh/index.html')}">Согласие на обработку ПД</a>
      </div>
    </div>
  </footer>
  <div class="mobile-bar">
    <a href="${p('kontakty/index.html')}" class="mobile-bar__btn mobile-bar__btn--primary">
      <span class="material-icons icon-sm">calculate</span> Рассчитать
    </a>
    <a href="tel:+74951234567" class="mobile-bar__btn mobile-bar__btn--secondary">
      <span class="material-icons icon-sm">call</span> Позвонить
    </a>
  </div>`;
}

function renderBreadcrumbs(items) {
  const crumbs = items.map((item, i) => {
    if (i === items.length - 1) return `<span>${item.label}</span>`;
    return `<a href="${p(item.href)}">${item.label}</a><span class="material-icons">chevron_right</span>`;
  }).join('');
  return `<div class="breadcrumbs">${crumbs}</div>`;
}

function initApp(activePage) {
  const hdr = document.getElementById('app-header');
  const ftr = document.getElementById('app-footer');
  if (hdr) hdr.innerHTML = renderHeader(activePage);
  if (ftr) ftr.innerHTML = renderFooter();

  // Re-init burger menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burgerBtn.innerHTML = isOpen
        ? '<span class="material-icons">close</span>'
        : '<span class="material-icons">menu</span>';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burgerBtn.innerHTML = '<span class="material-icons">menu</span>';
        document.body.style.overflow = '';
      });
    });
  }

  // Re-init fade-up observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Re-init price tabs
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

  // Re-init portfolio filter
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

  // Header scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 80 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
    });
  }
}
