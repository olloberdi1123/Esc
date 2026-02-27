const CACHE_NAME = 'keeng-saas-cache-v14'; // HAR SAFAR KOD O'ZGARSA, SHU RAQAMNI OSHIRING!

const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://telegram.org/js/telegram-web-app.js',
    'https://unpkg.com/html5-qrcode',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// O'rnatish: Yangi xotirani darhol ishga tushirish (Kutib o'tirmaslik)
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(caches.open(CACHE_NAME).then(cache => { 
        return cache.addAll(urlsToCache); 
    }));
});

// Aktivlashtirish: Eski xotiralarni (v7, v6...) shafqatsiz o'chirib tashlash
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                if (cacheName !== CACHE_NAME) {
                    console.log('Eski xotira o\'chirildi:', cacheName);
                    return caches.delete(cacheName);
                }
            }));
        }).then(() => self.clients.claim()) // Barcha ochiq oynalarni darhol yangi kodga o'tkazish
    );
});

// Internet yo'q bo'lsa xotiradan berish, internet bo'lsa tarmoqdan olish
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
