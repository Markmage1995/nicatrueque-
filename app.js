// Toggle del menú móvil
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.style.display === 'flex';
    mobileNav.style.display = open ? 'none' : 'flex';
  });
}

// Año dinámico en footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Animaciones al entrar en pantalla
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach((el) => observer.observe(el));
}

initScrollAnimations();

// Carrusel reutilizable (swipe + flechas + puntos)
function initCarousel(carouselId, itemLabel) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const viewport = carousel.querySelector('.carousel-viewport');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  const dotsWrap = carousel.querySelector('.carousel-dots');

  let index = 0;
  let scrollTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `${itemLabel} ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll('.carousel-dot')];

  function getIndex() {
    const w = viewport.offsetWidth || 1;
    return Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / w)));
  }

  function updateUI() {
    index = getIndex();
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  function goTo(i) {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    const w = viewport.offsetWidth;
    viewport.scrollTo({ left: target * w, behavior: 'smooth' });
    index = target;
    updateUI();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateUI, 80);
  }, { passive: true });

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });

  window.addEventListener('resize', updateUI);
  updateUI();
}

initCarousel('testimonialsCarousel', 'Testimonio');
initCarousel('featuresCarousel', 'Característica');
