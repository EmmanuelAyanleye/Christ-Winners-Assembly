// CHRIST WINNERS ASSEMBLY - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initLightbox();
  initCurrentPage();
  initSmoothScroll();
});

// Header scroll effect
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}

// Mobile navigation
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.nav-overlay');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    overlay?.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  overlay?.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  function closeMobileNav() {
    toggle.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// Lightbox
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }
}

// Active page in nav
function initCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });
}

// Animate numbers (counter)
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Intersection observer for counters
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

if (document.querySelector('[data-counter]')) {
  initCounters();
}
