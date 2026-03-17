function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("open");
}

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  const nav = document.getElementById('nav-links');
  const navbar = document.querySelector('.navbar');
  if (!navbar.contains(e.target)) {
    nav.classList.remove('open');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-pill, .project-card, .contact-item, .social-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});