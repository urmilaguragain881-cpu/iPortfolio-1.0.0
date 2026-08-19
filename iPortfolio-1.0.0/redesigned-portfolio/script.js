const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
const sections = document.querySelectorAll('main section[id]');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
const form = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mobileNav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selectedCategory = filter.dataset.filter;
    projects.forEach((project) => {
      const isVisible = selectedCategory === 'all' || project.dataset.category === selectedCategory;
      project.classList.toggle('hidden', !isVisible);
    });
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get('message').slice(0, 48) || 'Portfolio enquiry');
  const body = encodeURIComponent(`Hi Urmila,\n\nMy name is ${data.get('name')}.\n\n${data.get('message')}\n\nYou can reach me at ${data.get('email')}.`);
  window.location.href = `mailto:urmilagurgain881@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = 'Your email app is opening now.';
});
