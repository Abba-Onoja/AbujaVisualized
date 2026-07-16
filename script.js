/* 
   ABBA ONOJA — PORTFOLIO — script.js */

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close nav on link click
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── PROJECT FILTER ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const tags = (card.dataset.tags || '').split(' ');
        card.classList.toggle('hidden', !tags.includes(filter));
      }
    });
  });
});

/* ── CLICKABLE PROJECT CARDS (open Streamlit app) ── */
document.querySelectorAll('.clickable-card').forEach(card => {
  card.addEventListener('click', e => {
    // Don't fire if clicking the GitHub link itself
    if (e.target.closest('.project-link-github')) return;
    const url = card.dataset.href;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  });
});


/* ── SCROLL FADE-IN ── */
const fadeEls = document.querySelectorAll(
  '.project-card, .hero-stats .stat, .about-grid, .section-title'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

fadeEls.forEach(el => observer.observe(el));

/* ── ACTIVE NAV LINK on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.main-nav a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);


// carousel
const words = ["the platform that makes Abuja understandable.", "the internet's best source on Abuja.", 'built by residents, for residents.', 'built for real life in the capital.'];
const el = document.getElementById('carouselWord');
const HOLD_MS = 2200; //seconds
const TRANSITION_MS = 600 //must match css
let index = 0;

function nextword(){
      el.classList.add('is-out');

      setTimeout(()=> {
        index = (index + 1)% words.length;
        el.textContent = words[index];

        el.classList.remove('is-out');
        el.classList.add('is-in');

        void el.offsetWidth;

        el.classList.remove('is-in');
      }, TRANSITION_MS);
}
setInterval(nextword, HOLD_MS + TRANSITION_MS);

sections.forEach(s => sectionObserver.observe(s));
