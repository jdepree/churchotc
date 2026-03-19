/* ============================================================
   CHURCH OF THE CROSS — Main JavaScript
   ============================================================ */

/* ----------------------------------------
   ANNOUNCEMENT BAR
   ---------------------------------------- */
(function () {
  var bar      = document.getElementById('announcement-bar');
  var closeBtn = document.getElementById('announcement-close');
  if (!bar) return;

  if (localStorage.getItem('announcement-easter-2026') === '1') {
    bar.classList.add('hidden');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      bar.classList.add('hidden');
      localStorage.setItem('announcement-easter-2026', '1');
    });
  }
}());

/* ----------------------------------------
   SCROLL-AWARE HEADER
   ---------------------------------------- */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled
}());

/* ----------------------------------------
   MOBILE MENU
   ---------------------------------------- */
(function () {
  var toggle = document.getElementById('mobile-menu-toggle');
  var nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  // Close on outside tap
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}());

/* ----------------------------------------
   FORM HANDLING (client-side feedback only)
   Note: wire up a backend / form service (e.g. Formspree, Netlify Forms)
   by setting action="" on the <form> element.
   ---------------------------------------- */
document.querySelectorAll('form[data-form]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var successEl  = form.querySelector('.form-success') ||
                     (form.nextElementSibling && form.nextElementSibling.classList.contains('form-success')
                       ? form.nextElementSibling
                       : null);
    var customMsg  = form.getAttribute('data-success');

    // Hide form, show success
    Array.from(form.elements).forEach(function (el) {
      if (el.tagName !== 'LABEL') el.disabled = true;
    });
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';

    if (successEl) {
      if (customMsg) successEl.textContent = customMsg;
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

/* ----------------------------------------
   ACTIVE NAV LINK HIGHLIGHTING
   ---------------------------------------- */
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-list .nav-link, .dropdown a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href === page) {
      var item = link.closest('.nav-item');
      if (item) item.classList.add('active');
    }
  });
}());
