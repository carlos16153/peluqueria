document.addEventListener('DOMContentLoaded', () => {
  const footerInfo = document.querySelector('.footer-info');
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const welcomeForm = document.getElementById('welcomeForm');
  const userNameInput = document.getElementById('userNameInput');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeText = document.getElementById('welcomeText');
  const bookingForm = document.querySelector('.booking-form');
  const bookingMessage = document.getElementById('bookingMessage');
  const hairColorPicker = document.getElementById('hairColor');
  const desiredColorInput = document.getElementById('colorDeseado');
  const colorPanel = document.querySelector('.art-main');
  const backgroundVideo = document.getElementById('backgroundVideo');
  const playBackgroundVideoButton = document.getElementById('playBackgroundVideo');
  const storageKey = 'vibraStudioNames';

  if (backgroundVideo && playBackgroundVideoButton) {
    let isPlaying = false;

    const setVideoState = () => {
      const backgroundVideoWrapper = document.querySelector('.video-bg');
      if (backgroundVideoWrapper) {
        backgroundVideoWrapper.classList.toggle('is-visible', isPlaying);
      }

      if (isPlaying) {
        backgroundVideo.play();
      } else {
        backgroundVideo.pause();
        backgroundVideo.currentTime = 0;
      }

      playBackgroundVideoButton.textContent = isPlaying ? 'Pausar fondo' : 'Reproducir fondo';
    };

    playBackgroundVideoButton.addEventListener('click', () => {
      isPlaying = !isPlaying;
      setVideoState();
    });

    backgroundVideo.muted = true;
    setVideoState();
  }

  if (hairColorPicker && desiredColorInput && colorPanel) {
    const updateHairColor = () => {
      colorPanel.style.setProperty('--hair-choice', hairColorPicker.value);
      desiredColorInput.value = hairColorPicker.value;
    };

    hairColorPicker.addEventListener('input', updateHairColor);
    updateHairColor();
  }

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

  if (bookingForm && bookingMessage) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('nombre').value.trim();
      const color = desiredColorInput?.value;

      bookingMessage.textContent = `¡Gracias, ${name}, por completar tu solicitud de cita! Color elegido: ${color}.`;
      bookingMessage.hidden = false;
    });
  }
});
