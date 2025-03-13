export function register() {
  console.log("Registrando service worker", navigator)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker.register(swUrl)
        .then((registration) => {
          console.log('Service worker registrado exitosamente!', registration);
        })
        .catch((error) => {
          console.error('Error durante el registro service worker:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Error durante la baja service worker:', error);
      });
  }
}
