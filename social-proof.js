/* Filtro local: não requer bibliotecas, servidor ou requisições. */
(() => {
  const section = document.querySelector('.nps-section');
  if (!section) return;
  const buttons = [...section.querySelectorAll('[data-filter]')];
  const logos = [...section.querySelectorAll('.brand-logo[data-category]')];
  const panel = section.querySelector('.nps-panel');
  const status = section.querySelector('#nps-status');
  function applyFilter(category) {
    let count = 0;
    buttons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    logos.forEach(logo => {
      const categories = logo.dataset.category.split(/\s+/);
      const visible = category === 'all' || categories.includes(category);
      logo.classList.toggle('hidden', !visible);
      logo.hidden = !visible;
      if (visible) count++;
    });
    panel.dataset.activeFilter = category;
    status.textContent = `${count} marcas exibidas.`;
  }
  buttons.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });
  applyFilter('all');
})();
