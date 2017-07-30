// const idbKeyVal = require('idb-keyval');

// ********Uncomment this for local*********
// const urlEnv = 'localhost:3000';

// ********Comment this out for local*******
const urlEnv = 'https://ss-flashback-staging.herokuapp.com';

const shellCacheName = 'flashbackPWA-shell-v01';

const userDataCacheName = 'flashbackPWA-user-data-v01';
const userDataUrl = urlEnv + '/api/nearbyPhotos';

const photoCacheName = 'flashbackPWA-photos-v01';
const photoApiUrl = 'https://res.cloudinary.com/spinach-flashback/image/upload/';

var shellFilesToCache = [
  // '/dist/bundle.js', // ******* Comment this out for local, uncomment the one in urlsToIgnore below
  '/assets/fb-logo.png',
  '/assets/google-logo.png',
  '/assets/twitter-logo.png',
  '/assets/activity.png',
  '/assets/camera.png',
  '/assets/dislike.png',
  '/assets/nearby.png',
  '/assets/sf.png',
  '/assets/google-logo.png',
  'https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css',
  'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css',
  'https://netdna.bootstrapcdn.com/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.woff',
  'https://fonts.gstatic.com/s/kaushanscript/v5/qx1LSqts-NtiKcLw4N03IJsM3FTMmj2kTPH3yX99Yaw.woff2',
  'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.woff?v=4.0.3',
  'https://fonts.googleapis.com/css?family=Plaster',
  'https://fonts.googleapis.com/css?family=Kaushan+Script'
  // 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg'

/* potential
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/common.js',
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/util.js',
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/stats.js',
  Other styling
  urlEnv + '/profile',
  urlEnv + '/profile#_=_',
  urlEnv + '/',
  urlEnv + '/login',
  urlEnv + '/nearby',
  urlEnv + '/camera',
  urlEnv + '/likes', */
];

var urlsToIgnore = shellFilesToCache.concat([
  '/dist/bundle.js', // Uncomment this for local
  '/auth/facebook',
  '/Authentication',
  'Authenticate',
  urlEnv + '/login',
  'https://maps.google.com/maps-api-v3/api/js/29/13/common.js',
  'https://maps.google.com/maps-api-v3/api/js/29/13/util.js',
  'https://maps.google.com/maps-api-v3/api/js/29/13/stats.js',
  'https://maps.google.com/maps/api',
  'https://csi.gstatic.com/',
  'https://scontent.xx.fbcdn.net',
  urlEnv + '/api/mapPhotos/',
  urlEnv + '/nearby'
]);


// Install SW and cache shell files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(shellCacheName).then((cache) => {
      return cache.addAll(shellFilesToCache);
    })
  );
});


self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activated');
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key !== shellCacheName && key !== userDataCacheName && key !== photoCacheName) {
        console.log('[ServiceWorker] Removing old cache: ', key);
        return caches.delete(key);
      }
    }));
  }));
  return self.clients.claim();
});


self.addEventListener('fetch', (e) => {
  // console.log('[ServiceWorker] Fetch request', e.request.url);
  
  if (e.request.url.indexOf(photoApiUrl) > -1) {
    e.respondWith(cloudinaryImageResponse(e.request));

  } else if (e.request.url.indexOf(`${urlEnv}/api/nearbyPhotos`) > -1 /*&& e.request.method === 'GET'*/) {
    // console.log('[ServiceWorker] entering flashback API', '\n', e.request.url, e.request);
    e.respondWith(flashbackApiResponse(e.request));
  
  } else if (shellFilesToCache.some(urlBit => (e.request.url.indexOf(urlBit) > -1))) {
    e.respondWith(cachedShellResponse(e.request));
  
  } else {
    // console.log('[ServiceWorker] not in caching system', '\n', e.request.url, e.request);
  }

});

const cloudinaryImageResponse = function(request) {
  return caches.match(request).then(function(response) {
    if (response) {
      // console.log('[ServiceWorker] photo response from cache: ', response.url, response);
      return response;
    }
    return fetch(request).then(function(response) {
      if (response) {
        let cacheResponse = response.clone();
        caches.open(photoCacheName).then(function(cache) {
          cache.put(request, cacheResponse);
        });
        // console.log('response in caching attempt: ', response.url, response);
        return response;
      } else {
        console.log('[ServiceWorker] Cloudinary no response and no cache response', '\n', request.url, request);
      }
    });
  }).catch(function(error) {
    console.log('[ServiceWorker] ERROR Cloudinary response: ', error, '\n', request.url, request);
  });
};

const flashbackApiResponse = function(request) {
  // console.log('[ServiceWorker] flashback API request:', request.url, request);
  return fetch(request).then(function(response) {
    if (response) {
      // console.log('[ServiceWorker] flashback API response:', response.url, response);
      let cacheResponse = response.clone();
      caches.open(userDataCacheName).then(function(cache) {
        // console.log('response in caching attempt: ', cacheResponse.url, cacheResponse);
        cache.put(request, cacheResponse);
      });
      return response;
    }
    return caches.match(request).then(function(response) {
      if (response) {
        return response;
      } else {
        console.log('[ServiceWorker] Flashback API no response and no cache response', '\n', request.url, request);
      }
    });
  }).catch(function(error) {
    console.log('[ServiceWorker] ERROR API response', error, '\n', request.url, request);
  });
};

const cachedShellResponse = function(request) {
  return caches.match(request).then(function(response) {
    if (response) {
      // console.log('[ServiceWorker] response from shell cache: ', response.url, response);
      return response;
    } else {
      return fetch(request).then(function(response) {
        if (response) {
          let cacheResponse = response.clone();
          caches.open(shellCacheName).then(function(cache) {
            cache.put(request, cacheResponse);
          });
          // console.log('response in caching attempt: ', response.url, response);
          return response;
        } else {
          console.log('[ServiceWorker] Shell no response and no cache response', '\n', request.url, request);
        }
      });
    }
  }).catch(function(error) {
    console.error('[ServiceWorker] ERROR shell response', error, '\n', request.url, request);
  });
};

// navigator.storageQuota.queryInfo('temporary').then(function(info) {
//   console.log(info.quota); // Result: <quota in bytes>
//   console.log(info.usage); // Result: <used data in bytes>
// });

// if (urlsToIgnore.every(urlBit => (e.request.url.indexOf(urlBit) === -1))) {

// } else if (!e.request.headers.has('Authorization')) {

// else {
//   // console.log('[Service Worker] ignored URL: ', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// }