document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('#mobile-nav');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    document.querySelector('[data-menu-label]').textContent = menu.dataset.openLabel;
    nav.hidden = true;
  };
  // Without JS all navigation links remain visible. No content depends on initialization.
  document.documentElement.classList.add('enhanced');
  closeMenu();
  menu.addEventListener('click', () => {
    const opening = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(opening));
    document.querySelector('[data-menu-label]').textContent = opening ? menu.dataset.closeLabel : menu.dataset.openLabel;
    nav.hidden = !opening;
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });

  // Convert the existing, visible legal text into native dialogs. No copy is generated here.
  if (typeof HTMLDialogElement !== 'undefined' && HTMLDialogElement.prototype.showModal) {
    document.querySelectorAll('[data-dialog]').forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      const dialog = document.createElement('dialog');
      dialog.id = link.dataset.dialog;
      dialog.className = 'info-dialog';
      const close = document.querySelector('#dialog-close-template').content.firstElementChild.cloneNode(true);
      close.addEventListener('click', () => dialog.close());
      const heading = section.querySelector('h2');
      heading.id = `${dialog.id}-heading`;
      dialog.setAttribute('aria-labelledby', heading.id);
      dialog.append(close, section);
      document.body.append(dialog);
      link.addEventListener('click', event => { event.preventDefault(); dialog.showModal(); });
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    });
  }
});
