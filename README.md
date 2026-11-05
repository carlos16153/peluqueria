# VibrA Studio

Landing page de peluquería con una estética moderna, vibrante y muy legible. La página está pensada para destacar cortes, peinados y servicios de belleza con una identidad visual fuerte, sin depender de imágenes en la estructura principal.

## Características destacadas

- Estética moderna y llamativa: colores intensos, contrastes claros y un diseño visual impactante.
- Tipografía muy legible: títulos grandes y bien contrastados para una lectura rápida y elegante.
- Enfoque en peluquería: textos centrados en cortes, peinados, color y estilo personal.
- Selector de color de cabello: permite elegir un tono con una muestra visible y un efecto visual que refleja el color seleccionado.
- Color incluido en la reserva: el tono elegido se guarda en el formulario de contacto junto con la solicitud de cita.
- Galería de estilos separada: permite incluir imágenes en un apartado específico sin saturar la landing principal.
- Diseño responsive: se adapta a pantallas pequeñas y grandes.
- Aplicación instalable (PWA): manifest, iconos, instalación desde Chrome y soporte de pantalla de inicio en iOS.
- Experiencia offline básica: HTML, estilos, JavaScript y recursos esenciales precargados.
- Sección de servicios clara: presenta opciones de manera ordenada y atractiva.
- Llamada a la acción visible: botones de reserva y contacto bien ubicados.

## Estructura del proyecto

- `index.html`: estructura principal de la landing page.
- `assets/css/styles.css`: estilos visuales, colores, layout y responsividad.
- `assets/js/app.js`: interacciones dinámicas, incluido el selector de color y su sincronización con el formulario de reserva.
- `assets/js/service-worker.js`: estrategia de caché y soporte offline.
- `manifest.json`: metadatos de instalación de la PWA.
- `icons/`: iconos de 192 y 512 píxeles para la aplicación.
- `assets/images/`: imágenes de la galería y estilos del salón.
- `assets/videos/`: recursos multimedia principales del sitio.
- `components/`: componentes o fragmentos reutilizables del proyecto.

## Objetivo

Comunicar una identidad de marca de peluquería moderna, con personalidad, estilo visual fuerte y una experiencia clara para clientes que buscan cortes y peinados impactantes.

## Uso

Abre `index.html` para visualizar la página. Para probar la PWA, sírvela desde `localhost` o publícala mediante HTTPS; los service workers no funcionan al abrir el archivo directamente.

### Verificar e instalar la PWA

1. Inicia un servidor local desde la carpeta del proyecto (por ejemplo, con la extensión Live Server de VS Code o `python -m http.server 8000` si Python está instalado) y abre la URL local.
2. En Chrome DevTools, abre **Application > Manifest** y comprueba el nombre, el alcance y los iconos.
3. En **Application > Service Workers**, confirma que el worker esté activo. Recarga la página y prueba el modo offline desde DevTools.
4. Ejecuta **Lighthouse** en modo **Navigation** y categoría **Progressive Web App** para revisar los requisitos de instalación.
5. Cuando Chrome ofrezca la instalación, usa **Instalar app** en la página. En iOS, abre el menú **Compartir** de Safari y elige **Añadir a pantalla de inicio**.

La instalación y el service worker requieren HTTPS en producción; `localhost` se considera un contexto seguro para desarrollo. La información del clima depende de OpenWeather y necesita conexión a Internet.
