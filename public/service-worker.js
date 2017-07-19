

const shellCacheName = 'flashbackPWA-shell-v01';
var shellFilesToCache = [
  // '/dist/bundle.js',
  '/assets/fb-logo.png',
  '/assets/google-logo.png',
  '/assets/twitter-logo.png',
  '/manifest.json'

/* potential
  'https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css',
  'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css'
  '/profile',
  '/profile#_=_',
  '/',
  '/login',
  '/nearby',
  '/camera',
  '/likes',
*/
];


// Install SW and cache shell files
self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  // console.log('this: ----------------- : ', this);
  e.waitUntil( //SW is still "installing" until resolved
    caches.open(shellCacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(shellFilesToCache);
    })
  );
});


self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key !== shellCacheName) {
        console.log('[ServiceWorker] Removing old cache: ', key);
        return caches.delete(key);
      }
    }));
  }));
  return self.clients.claim();
});

// Need to know API call for data caching
self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch: ', e.request.url);
  // var dataUrl = 'TBD';
  // if (e.request.url.indexOf(dataUrl) > -1) {
  //   e.respondWith(
  //     caches.open(dataCacheName).then((cache) => {
  //       return fetch(e.request);
  //     }).then((response) => {
  //       cache.put(e.request.url, response.clone());
  //       return response; 
  //     })
  //   );
  // } else {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});