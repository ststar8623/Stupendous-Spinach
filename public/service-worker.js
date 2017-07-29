// const idbKeyVal = require('idb-keyval');

const urlEnv = 'localhost:3000';
// const urlEnv = 'https://ss-flashback-staging.herokuapp.com'

const shellCacheName = 'flashbackPWA-shell-v01';

const userDataCacheName = 'flashbackPWA-user-data-v01';
const userDataUrl = urlEnv;

const photoCacheName = 'flashbackPWA-photos-v01';
const photoApiUrl = 'https://res.cloudinary.com/spinach-flashback/image/upload/';


var shellFilesToCache = [

  '/assets/fb-logo.png',
  '/assets/google-logo.png',
  '/assets/twitter-logo.png',
  '/assets/activity.png',
  '/assets/camera.png',
  '/assets/dislike.png',
  '/assets/nearby.png',
  '/manifest.json',
  '/install-service-worker.js',
  'https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css',
  'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css',
  'https://netdna.bootstrapcdn.com/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.woff',
  'https://fonts.gstatic.com/s/kaushanscript/v5/qx1LSqts-NtiKcLw4N03IJsM3FTMmj2kTPH3yX99Yaw.woff2',
  'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.woff?v=4.0.3',
  'https://fonts.googleapis.com/css?family=Plaster',
  'https://fonts.googleapis.com/css?family=Kaushan+Script',
  'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg'

/* potential
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/common.js',
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/util.js',
  // 'https://maps.google.com/maps-api-v3/api/js/29/13/stats.js',
  Other styling
  '/profile',
  '/profile#_=_',
  '/',
  '/login',
  '/nearby',
  '/camera',
  '/likes', */
];

var urlsToIgnore = shellFilesToCache.concat([
  '/auth/facebook',
  '/Authentication',
  'Authenticate',
  '/login',
  'https://maps.google.com/maps-api-v3/api/js/29/13/common.js',
  'https://maps.google.com/maps-api-v3/api/js/29/13/util.js',
  'https://maps.google.com/maps-api-v3/api/js/29/13/stats.js',
  'https://maps.google.com/maps/api',
  'https://csi.gstatic.com/',
  'https://scontent.xx.fbcdn.net'
]);


// Install SW and cache shell files
self.addEventListener('install', (e) => {
  // console.log('Fetch URL localhost or cloudinary: ', e.request.url.indexOf(userDataUrl) > -1 || e.request.url.indexOf(photoUrl) > -1);
  // console.log('[ServiceWorker] Install');
  e.waitUntil( //SW is still "installing" until resolved
    caches.open(shellCacheName).then((cache) => {
      // console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(shellFilesToCache);
    })
  );
});


self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
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

// Need to know API call for data caching

self.addEventListener('fetch', (e) => {
  // console.log('[ServiceWorker] Fetch URL: ', e.request.url);
  if (!e.request.headers.has('Authorization')) {

    if (urlsToIgnore.every(urlBit => (e.request.url.indexOf(urlBit) === -1))) {
      let openCache;

      if (e.request.url.indexOf(userDataUrl) > -1) {
        e.respondWith(
          caches.open(userDataCacheName).then((cache) => {
            // console.log('[ServiceWorker] User Data caching pre-fetch\nurl: ', e.request.url);
            openCache = cache;
            return fetch(e.request); // {credentials include} arg needed?
          }).then((response) => {
            // console.log('[ServiceWorker] User Data caching post-fetch\nurl: ', e.request.url);
            openCache.put(e.request.url, response.clone());
            return response;
          }).catch((error) => {
            console.log('[ServiceWorker] ERROR serverApi: ', error, '\nurl: ', e.request.url);
          })
        );

      } else if (e.request.url.indexOf(photoApiUrl) > -1) {
        caches.open(photoCacheName).then((cache) => {
          // console.log('[ServiceWorker] Photo caching pre-fetch\nurl: ', e.request.url);
          openCache = cache;
          return fetch(e.request); // {credentials include} arg needed?
        }).then((response) => {
          // console.log('[ServiceWorker]\nrequest URL: ', e.request.url, '\nresponse.clone(): ', response.clone(), '\nresponse.clone() type: ', typeof response.clone());
          openCache.put(e.request.url, response.clone());
          return response; 
        }).catch((error) => {
          console.log('[ServiceWorker] ERROR photoApi: ', error, '\nurl: ', e.request.url);
        });

      } else {
        // console.log('[ServiceWorker] no match to caches for: ', e.request.url);
        e.respondWith(
          caches.match(e.request).then((response) => {
            return response || fetch(e.request);
          })
        );
      }

    } else {
      // console.log('[Service Worker] ignored URL: ', e.request.url);
      e.respondWith(
        caches.match(e.request).then((response) => {
          return response || fetch(e.request);
        })
      );
    }

  }
});

// navigator.storageQuota.queryInfo('temporary').then(function(info) {
//   console.log(info.quota); // Result: <quota in bytes>
//   console.log(info.usage); // Result: <used data in bytes>
// });

// function cloudinaryAPIResponse(request) {
//   if ()
// }

/* SW-Cache example

'use strict';

if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function() {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function() {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                console.log('New or updated content is available.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}
*/


// e.respondWith(() => {
  
//   caches.match(e.request.url).then((response) => {
//     return new Promise((res, rej) => {
//       if 
//       console.log()
//     })
//   })
// }


//   fetch(e.request).then((response) => {
//     idbKeyVal.set(e.request.url, response);


//   })
