(() => {
  const body = document.body;
  const intro = document.getElementById('intro');
  const enterButton = document.getElementById('enterPortfolio');
  const skipButton = document.getElementById('skipIntro');
  const voiceButton = document.getElementById('voiceWelcome');
  const quickCards = [...document.querySelectorAll('.quick-card')];
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const year = document.getElementById('year');
  const commandOverlay = document.getElementById('commandOverlay');
  const commandInput = document.getElementById('commandInput');
  const commandResults = document.getElementById('commandResults');
  const commandHint = document.getElementById('commandHint');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  body.classList.add('intro-open');
  year.textContent = new Date().getFullYear();

  function closeIntro(target = '#hero') {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    voiceButton?.setAttribute('aria-pressed', 'false');
    intro.classList.add('is-hidden');
    body.classList.remove('intro-open');
    window.setTimeout(() => {
      intro.setAttribute('aria-hidden', 'true');
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, reduceMotion ? 0 : 260);
  }

  enterButton?.addEventListener('click', () => closeIntro('#hero'));
  skipButton?.addEventListener('click', () => closeIntro('#hero'));
  quickCards.forEach(card => card.addEventListener('click', () => closeIntro(card.dataset.target)));

  voiceButton?.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    const active = voiceButton.getAttribute('aria-pressed') === 'true';
    window.speechSynthesis.cancel();
    if (active) {
      voiceButton.setAttribute('aria-pressed', 'false');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to Gokulnathan S's portfolio. Explore his Computer Science background, Java and Python skills, HCL project internship, secure cloud storage project, machine learning work, education and certifications."
    );
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => voiceButton.setAttribute('aria-pressed', 'false');
    utterance.onerror = () => voiceButton.setAttribute('aria-pressed', 'false');
    voiceButton.setAttribute('aria-pressed', 'true');
    window.speechSynthesis.speak(utterance);
  });

  navToggle?.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  primaryNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const revealItems = [...document.querySelectorAll('.reveal')];
  revealItems.forEach(el => { if (el.dataset.delay) el.style.setProperty('--delay', `${el.dataset.delay}ms`); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach(el => revealObserver.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('mousemove', event => {
        const r = button.getBoundingClientRect();
        const x = (event.clientX - r.left - r.width / 2) * .12;
        const y = (event.clientY - r.top - r.height / 2) * .12;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener('mouseleave', () => { button.style.transform = ''; });
    });

    document.addEventListener('mousemove', event => {
      const nx = (event.clientX / window.innerWidth - .5) * 2;
      const ny = (event.clientY / window.innerHeight - .5) * 2;
      document.querySelectorAll('[data-parallax]').forEach(el => {
        const power = Number(el.dataset.parallax || .02);
        const x = nx * 120 * power;
        const y = ny * 120 * power;
        const baseRotate = el.classList.contains('code-window') ? -2 : 4;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${baseRotate}deg)`;
      });
    }, { passive: true });
  }

  const commands = [
    { icon: '01', label: 'About', detail: 'Profile & focus', action: () => go('#about') },
    { icon: '02', label: 'Projects', detail: 'Secure cloud + machine learning', action: () => go('#projects') },
    { icon: '03', label: 'Skills', detail: 'Programming, frontend, backend & data', action: () => go('#skills') },
    { icon: '04', label: 'Experience', detail: 'HCL project internship', action: () => go('#experience') },
    { icon: '05', label: 'Education', detail: 'B.E. CSE + school scores', action: () => go('#education') },
    { icon: '06', label: 'Certifications', detail: 'Oracle + IBM', action: () => go('#certifications') },
    { icon: '↗', label: 'View Resume', detail: 'Browser / print version', action: () => { window.location.href = 'resume.html'; } },
    { icon: '↓', label: 'Download Resume PDF', detail: 'Original uploaded resume', action: () => { window.location.href = 'assets/resume.pdf'; } },
    { icon: 'GH', label: 'GitHub', detail: 'GOKULNATHAN14', action: () => window.open('https://github.com/GOKULNATHAN14','_blank','noopener') },
    { icon: '@', label: 'Email Gokulnathan', detail: 'nathangokul17@gmail.com', action: () => { window.location.href = 'mailto:nathangokul17@gmail.com'; } }
  ];
  let filtered = [...commands];
  let selectedIndex = 0;

  function go(target) {
    closeCommand();
    document.querySelector(target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function renderCommands(query = '') {
    const q = query.trim().toLowerCase();
    filtered = commands.filter(item => `${item.label} ${item.detail}`.toLowerCase().includes(q));
    selectedIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));
    commandResults.innerHTML = '';
    filtered.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `command-item${index === selectedIndex ? ' is-selected' : ''}`;
      button.innerHTML = `<span>${item.icon}</span><span><strong>${item.label}</strong><small>${item.detail}</small></span><b>↵</b>`;
      button.addEventListener('click', item.action);
      commandResults.appendChild(button);
    });
  }
  function openCommand() {
    commandOverlay.hidden = false;
    renderCommands('');
    requestAnimationFrame(() => commandInput.focus());
  }
  function closeCommand() {
    commandOverlay.hidden = true;
    commandInput.value = '';
  }
  commandHint?.addEventListener('click', openCommand);
  commandOverlay?.addEventListener('click', e => { if (e.target === commandOverlay) closeCommand(); });
  commandInput?.addEventListener('input', e => { selectedIndex = 0; renderCommands(e.target.value); });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); commandOverlay.hidden ? openCommand() : closeCommand();
    }
    if (!commandOverlay.hidden) {
      if (event.key === 'Escape') closeCommand();
      if (event.key === 'ArrowDown') { event.preventDefault(); selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1); renderCommands(commandInput.value); }
      if (event.key === 'ArrowUp') { event.preventDefault(); selectedIndex = Math.max(selectedIndex - 1, 0); renderCommands(commandInput.value); }
      if (event.key === 'Enter' && filtered[selectedIndex]) { event.preventDefault(); filtered[selectedIndex].action(); }
    }
  });

  // Keep the intro intentionally user-controlled. It never auto-dismisses.
})();
