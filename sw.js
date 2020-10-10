const staticCache = 'static-v2.1';
const dynamicCache = 'dynamic-v2.2';
const assets = [
	'/',
	'/index.html',
	'/js/app.js',
	'/js/materialize.min.js',
	'/js/script.js',
	'/img/profile.png',
	'/css/about.css',
	'/css/addtask.css',
	'/css/home.css',
	'/css/profile.css',
	'/css/materialize.min.css',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
	'https://fonts.gstatic.com/s/dmserifdisplay/v4/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2',
];

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(staticCache).then((cache) => {
			console.log('mencache assets');
			cache.addAll(assets);
		})
	);
	console.log('instalasi berhasil');
});

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCache && key !== dynamicCache)
					.map((key) => caches.delete(key))
			);
		})
	);
	console.log('activate berhasil');
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches
			.match(e.request)
			.then((cacheRes) => {
				return (
					cacheRes ||
					fetch(e.request).then((fetchRes) => {
						return caches.open(dynamicCache).then((cache) => {
							cache.put(e.request.url, fetchRes.clone());
							return fetchRes;
						});
					})
				);
			})
			.catch(() => {
				if (e.request.url.indexOf('.html') > -1) {
					return caches.match('/pages/fallback.html');
				}
			})
	);
	console.log('fetch berhasil');
});
