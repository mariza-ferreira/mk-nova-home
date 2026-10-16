(() => {
  const section = document.querySelector('.platform-section');
  if (!section) return;

  const container = section.querySelector('.parallax-container');
  const objects = [...section.querySelectorAll('.parallax-item[data-speed]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let sectionVisible = false;
  let ticking = false;

  const updateParallax = () => {
    ticking = false;

    if (reducedMotion.matches) {
      objects.forEach((object) => { object.style.transform = 'translate3d(0, 0, 0)'; });
      return;
    }

    if (!sectionVisible) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.max(0, Math.min(1, rawProgress));
    const scrollRange = Math.max(180, Math.min(280, rect.height * .16));
    const scrolled = (progress - .5) * scrollRange;
    const parallaxStrength = .18;
    const maxTravel = window.innerWidth <= 600 ? 82 : 140;

    objects.forEach((object) => {
      const speed = Number.parseFloat(object.dataset.speed || '0');
      const rawY = scrolled * speed * parallaxStrength;
      const yPos = Math.max(-maxTravel, Math.min(maxTravel, rawY));
      object.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  reducedMotion.addEventListener?.('change', requestUpdate);

  const observer = new IntersectionObserver((entries) => {
    sectionVisible = entries.some((entry) => entry.isIntersecting);
    if (sectionVisible) requestUpdate();
  }, { rootMargin: '20% 0px', threshold: 0 });

  observer.observe(section);
})();
