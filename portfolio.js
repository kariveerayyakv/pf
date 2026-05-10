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

const FLOATERS = [
  { symbol: '</>',  label: 'html'    },
  { symbol: '{ }',  label: 'css'     },
  { symbol: 'Py',   label: 'python'  },
  { symbol: 'JS',   label: 'js'      },
  { symbol: '♞',   label: 'chess'   },
  { symbol: '♟',   label: 'chess2'  },
  { symbol: '✦',   label: 'star'    },
  { symbol: '⌨',   label: 'code'    },
  { symbol: '✒',   label: 'pen'     },
  { symbol: '⚡',  label: 'bolt'    },
  { symbol: '🥊',  label: 'box'     },
  { symbol: '⚽',  label: 'ball'    },
  { symbol: '♜',   label: 'rook'    },
  
  
];

function spawnFloaters() {
  const container = document.getElementById('floaters');
  if (!container) return;

  FLOATERS.forEach((item, i) => {
    const el = document.createElement('span');
    el.classList.add('floater');
    el.textContent = item.symbol;

    const x    = 2 + Math.random() * 96;
    const dur  = 14 + Math.random() * 14;
    const del  = -(Math.random() * dur);
    const rot0 = (Math.random() - 0.5) * 40;
    const rot1 = rot0 + (Math.random() - 0.5) * 30;
    const size = 0.8 + Math.random() * 1.4;

    el.style.cssText = `
      left: ${x}%;
      --dur: ${dur}s;
      --delay: ${del}s;
      --rot0: ${rot0}deg;
      --rot1: ${rot1}deg;
      font-size: ${size}rem;
    `;

    container.appendChild(el);
  });
}

spawnFloaters();
