if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(__dirname + '../service-worker.js')
      .then(() => {
        console.log('Service Worker Registered');
      });
  });
}