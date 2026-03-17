/* ==========================================================
   BlueSquare Chess Academy — script.js
   ========================================================== */

/* ---- Sticky Navbar Shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Mobile Hamburger Toggle ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- Scroll Fade-In Animations ---- */
const fadeEls = document.querySelectorAll(
  '.program-card, .coach-card, .tournament-card, .about-feature, ' +
  '.ai-lab-card, .hero-feature, .achievements-banner, .section-title, ' +
  '.section-sub, .section-tag, .enroll-form-wrap, .contact-box, ' +
  '.training-philosophy'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ---- Staggered Grid Animation ---- */
document.querySelectorAll('.programs-grid, .coaches-grid, .tournaments-grid').forEach(grid => {
  grid.querySelectorAll('.program-card, .coach-card, .tournament-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.09}s`;
  });
});

/* ---- Enroll Form Submission ---- */
const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
  enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = enrollForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Submitted! We\'ll contact you soon.';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enroll Now';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      enrollForm.reset();
    }, 4000);
  });
}

/* ---- Active Nav Link Highlight on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) a.style.color = 'var(--blue-accent)';
  });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});