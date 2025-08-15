// Enhanced Service Worker for Native Mobile App Experience
const CACHE_NAME = 'smartcalc-mobile-v2.0.0';
const STATIC_CACHE = 'smartcalc-static-v2.0.0';
const DYNAMIC_CACHE = 'smartcalc-dynamic-v2.0.0';

// Core resources for immediate caching
const CORE_RESOURCES = [
  '/',
  '/index.html',
  '/offline.html',
  '/offline',
  '/manifest.json',
  '/icons/smartcalc-logo-512.png',
  '/icons/smartcalc-logo-1024.png',
  // Cache key routes for offline access
  '/calculs/L1',
  '/drives',
  '/videos',
  '/contact'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v2.0.0');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching core resources');
        return cache.addAll(CORE_RESOURCES);
      })
      .then(() => {
        console.log('[SW] Core resources cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Failed to cache core resources:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (![CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle same-origin requests
  if (url.origin === location.origin) {
    if (request.destination === 'document') {
      event.respondWith(handleDocumentRequest(request));
    } else {
      event.respondWith(handleAssetRequest(request));
    }
  } else {
    event.respondWith(handleExternalRequest(request));
  }
});

async function handleDocumentRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, serving cached document');
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Fallback to offline page
    const offlineResponse = await cache.match('/offline.html');
    return offlineResponse || new Response(
      '<!DOCTYPE html><html><head><title>Offline - SmartCalc+</title></head><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

async function handleAssetRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    // Update in background
    updateAssetInBackground(request, cache);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Asset request failed:', request.url);
    return new Response('Asset not available offline', { status: 503 });
  }
}

async function handleExternalRequest(request) {
  try {
    const response = await fetch(request, { mode: 'cors' });
    
    if (response.ok && shouldCacheExternal(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    return cached || new Response('External resource unavailable', { status: 503 });
  }
}

function shouldCacheExternal(url) {
  return url.includes('fonts.googleapis') || 
         url.includes('fonts.gstatic') ||
         url.includes('cdnjs.cloudflare.com');
}

async function updateAssetInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response);
    }
  } catch (error) {
    // Silent fail
    console.log('[SW] Background update failed for:', request.url);
  }
}

console.log('[SW] Service Worker v2.0.0 loaded successfully');
