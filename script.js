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
  const galleryMenuToggle = document.querySelector('.gallery-menu-toggle');
  const galleryMenu = document.getElementById('galleryMenu');
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const storageKey = 'vibraStudioNames';
  const weatherWidget = document.getElementById('weatherWidget');
  const weatherIcon = document.getElementById('weatherIcon');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherCondition = document.getElementById('weatherCondition');
  const weatherApiKey = '309792feedb32cc954c62df370f8a045';
  const defaultCity = 'Bogota';

  if (weatherWidget && weatherIcon && weatherTemp && weatherCondition) {
    const setWeatherLoadingState = () => {
      weatherTemp.textContent = '--';
      weatherCondition.textContent = 'Cargando clima...';
    };

    const renderWeather = (weatherData) => {
      const temp = Math.round(weatherData.main.temp);
      const condition = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      weatherTemp.textContent = String(temp);
      weatherCondition.textContent = condition;
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.alt = condition;
    };

    const fetchWeatherByCoords = async (lat, lon) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${weatherApiKey}`;
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error('No se pudo obtener el clima.');
      }

      const data = await response.json();
      renderWeather(data);
    };

    const fetchWeatherByCity = async (cityName) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=es&appid=${weatherApiKey}`;
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error('Ciudad no encontrada.');
      }

      const data = await response.json();
      renderWeather(data);
    };
    const loadWeather = async () => {
      setWeatherLoadingState();

      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 600000,
            });
          });

          await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          return;
        }

        await fetchWeatherByCity(defaultCity);
      } catch (error) {
        await fetchWeatherByCity(defaultCity);
      }
    };

    loadWeather();
  }

  if (galleryMenuToggle && galleryMenu) {
    galleryMenuToggle.addEventListener('click', () => {
      const isOpen = galleryMenu.classList.toggle('is-open');
      galleryMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (galleryFilters.length && galleryCards.length) {
    const setGalleryFilter = (filter) => {
      galleryFilters.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === filter);
      });

      galleryCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? 'flex' : 'none';
      });
    };

    galleryFilters.forEach((button) => {
      button.addEventListener('click', () => {
        setGalleryFilter(button.dataset.filter);
      });
    });

    setGalleryFilter('all');
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
