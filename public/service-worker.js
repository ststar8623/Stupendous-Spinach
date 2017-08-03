const shellCacheName = 'flashbackPWA-shell-v02';

const userDataCacheName = 'flashbackPWA-user-data-v02';

const photoCacheName = 'flashbackPWA-photos-v02';
const photoApiUrl = 'https://res.cloudinary.com/spinach-flashback/image/upload/';

var shellFilesToCache = [
  '/dist/bundle.js',
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
  'https://fonts.googleapis.com/css?family=Kaushan+Script',
  'https://static.xx.fbcdn.net/rsrc.php/v3iuD54/yV/l/en_US/K4wmpPJ62E5.js',
  'https://static.xx.fbcdn.net/rsrc.php/v3isCH4/yW/l/en_US/eEiSiDcVD_V.js',
  'https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/dLqYmV_pViI.js',
  'https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/6XKRaiDlas5.js',
  'https://static.xx.fbcdn.net/rsrc.php/v3/yu/l/0,cross/kaG2u3miLoi.css',
  'https://static.xx.fbcdn.net/rsrc.php/v3/yy/l/0,cross/IE8UuftA-Db.css'
];


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

  } else if (e.request.url.indexOf('/api/nearbyPhotos') > -1 /*&& e.request.method === 'GET'*/) {
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
