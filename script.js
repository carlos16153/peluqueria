document.addEventListener('DOMContentLoaded', () => {
  const footerInfo = document.querySelector('.footer-info');
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const welcomeForm = document.getElementById('welcomeForm');
  const userNameInput = document.getElementById('userNameInput');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeText = document.getElementById('welcomeText');
  const storageKey = 'vibraStudioNames';

  if (footerInfo && !footerInfo.dataset.ready) {
    const year = document.createElement('p');
    year.textContent = `© ${new Date().getFullYear()} VibrA Studio`;
    footerInfo.appendChild(year);
    footerInfo.dataset.ready = 'true';
  }

  if (welcomeOverlay && welcomeForm && userNameInput && welcomeTitle && welcomeText) {
    const savedNames = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const lastName = savedNames.at(-1);

    if (lastName) {
      welcomeTitle.textContent = `¡Qué gusto verte otra vez, ${lastName}!`;
      welcomeText.textContent = 'Volver a recibirte en VibrA Studio es un placer. Estamos listos para cuidarte y darte el look perfecto.';
      userNameInput.value = lastName;
    }

    welcomeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = userNameInput.value.trim();

      if (!name) {
        userNameInput.focus();
        return;
      }

      const names = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!names.includes(name)) {
        names.push(name);
        localStorage.setItem(storageKey, JSON.stringify(names));
      }

      welcomeTitle.textContent = `¡Bienvenido/a, ${name}!`;
      welcomeText.textContent = 'Estamos listos para que te sientas increíble en tu próxima visita.';
      welcomeOverlay.classList.add('hidden');
    });

    setTimeout(() => {
      welcomeOverlay.classList.add('visible');
    }, 150);
  }
});
