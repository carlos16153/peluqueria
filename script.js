document.addEventListener('DOMContentLoaded', () => {
  const footerInfo = document.querySelector('.footer-info');

  if (footerInfo && !footerInfo.dataset.ready) {
    const year = document.createElement('p');
    year.textContent = `© ${new Date().getFullYear()} VibrA Studio`;
    footerInfo.appendChild(year);
    footerInfo.dataset.ready = 'true';
  }
});
