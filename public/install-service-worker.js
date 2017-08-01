// console.log('Service Worker available in navigator?: ', 'serviceWorker' in navigator);

if ('serviceWorker' in navigator) {
  // console.log('navigator: ', navigator);
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(() => {
      // console.log('Service Worker Registered');
    });
  });
}