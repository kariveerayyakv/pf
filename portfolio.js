function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

document.addEventListener('click', e => {
  const navbar = document.querySelector('.navbar');
  if (!navbar.contains(e.target)) {
    document.getElementById('nav-links').classList.remove('open');
  }
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left      = e.clientX + 'px';
  cursor.style.top       = e.clientY + 'px';
  cursorTrail.style.left = e.clientX + 'px';
  cursorTrail.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-pill, .about-card, .social-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-pill, .project-card, .contact-item, .social-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.06}s`;
  observer.observe(el);
});
