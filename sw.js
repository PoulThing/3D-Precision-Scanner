const CACHE='precision-scanner-v0.3.1';
const FILES=['./','./index.html','./matching.js','./orb.js','./pose.js','./storage.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('precision-scanner-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return; e.respondWith(caches.open(CACHE).then(async c=>{if(e.request.mode==='navigate'){try{return await fetch(e.request)}catch{return await c.match('./index.html')}}return (await c.match(e.request))||fetch(e.request)}))});
