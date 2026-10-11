'use strict';
// Bump when changing an existing asset; versioned asset filenames should remain immutable.
const CACHE='hearthvale-assets-'+encodeURIComponent(self.registration.scope)+'-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{const prefix='hearthvale-assets-'+encodeURIComponent(self.registration.scope)+'-';for(const name of await caches.keys())if(name.startsWith(prefix)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url),base=new URL(self.registration.scope);if(event.request.method!=='GET'||url.origin!==base.origin||!url.pathname.startsWith(base.pathname+'assets/')||!(/\.webp$/.test(url.pathname)||url.pathname.endsWith('/phaser.min.js')))return;event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(event.request);if(cached)return cached;const response=await fetch(event.request);if(response.ok){try{await cache.put(event.request,response.clone());}catch(error){/* Storage pressure must not prevent loading the game. */}}return response;})());});
