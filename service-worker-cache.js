var cacheName = 'wpak-app-2068-20190708-023322';
var filesToCache = ['/',
'/lang/theme-messages.js',
'/vendor/leaflet.js.map',
'/vendor/jquery.velocity.js',
'/vendor/backbone.js',
'/vendor/text.js',
'/vendor/underscore.js',
'/vendor/localstorage.js',
'/vendor/async.js',
'/vendor/require.js',
'/vendor/leaflet.js',
'/vendor/jquery.js',
'/debug.html',
'/index.html',
'/core/lib/parse-uri.js',
'/core/lib/hooks.js',
'/core/lib/encryption/jsencrypt_LICENCE.txt',
'/core/lib/encryption/sha256.js',
'/core/lib/encryption/jsencrypt.js',
'/core/lib/encryption/token.js',
'/core/app.js',
'/core/css/debug.css',
'/core/app-utils.js',
'/core/img/wpak-debug-close-off.svg',
'/core/img/wpak-lady-bug-light.svg',
'/core/img/wpak-lady-bug-dark.svg',
'/core/img/wpak-debug-close-on.svg',
'/core/addons-internal.js',
'/core/router.js',
'/core/phonegap/geolocation.js',
'/core/phonegap/utils.js',
'/core/modules/authentication.js',
'/core/modules/deep-link.js',
'/core/modules/persistent-storage.js',
'/core/modules/flags.js',
'/core/modules/storage.js',
'/core/modules/comments.js',
'/core/stats.js',
'/core/views/page.js',
'/core/views/menu.js',
'/core/views/head.js',
'/core/views/comments.js',
'/core/views/custom-component.js',
'/core/views/header.js',
'/core/views/custom-page.js',
'/core/views/backbone-template-view.js',
'/core/views/archive.js',
'/core/views/debug.js',
'/core/views/single.js',
'/core/views/layout.js',
'/core/addons.js',
'/core/messages.js',
'/core/region-manager.js',
'/core/models/globals.js',
'/core/models/options.js',
'/core/models/menu-items.js',
'/core/models/navigation.js',
'/core/models/comments.js',
'/core/models/components.js',
'/core/models/custom-page.js',
'/core/models/items.js',
'/core/launch.js',
'/core/theme-app.js',
'/core/app-dynamic-data.js',
'/core/theme-tpl-tags.js',
'/themes/q-android-feat-map-leaflet/head.html',
'/themes/q-android-feat-map-leaflet/css/post-list.css',
'/themes/q-android-feat-map-leaflet/css/common.css',
'/themes/q-android-feat-map-leaflet/css/post-detail.css',
'/themes/q-android-feat-map-leaflet/map.html',
'/themes/q-android-feat-map-leaflet/archive-favorites.html',
'/themes/q-android-feat-map-leaflet/img/img-icon.svg',
'/themes/q-android-feat-map-leaflet/img/camera-icon.svg',
'/themes/q-android-feat-map-leaflet/img/back-icon.svg',
'/themes/q-android-feat-map-leaflet/img/refresh-icon.svg',
'/themes/q-android-feat-map-leaflet/img/menu-icon.svg',
'/themes/q-android-feat-map-leaflet/leaflet/leaflet.js.map',
'/themes/q-android-feat-map-leaflet/leaflet/leaflet.js',
'/themes/q-android-feat-map-leaflet/leaflet/leaflet.css',
'/themes/q-android-feat-map-leaflet/leaflet/images/layers-2x.png',
'/themes/q-android-feat-map-leaflet/leaflet/images/marker-icon.png',
'/themes/q-android-feat-map-leaflet/leaflet/images/marker-icon-2x.png',
'/themes/q-android-feat-map-leaflet/leaflet/images/marker-shadow.png',
'/themes/q-android-feat-map-leaflet/leaflet/images/layers.png',
'/themes/q-android-feat-map-leaflet/layout.html',
'/themes/q-android-feat-map-leaflet/fonts/PT-Serif-Regular.ttf',
'/themes/q-android-feat-map-leaflet/readme.md',
'/themes/q-android-feat-map-leaflet/js/jquery.fitvids.js',
'/themes/q-android-feat-map-leaflet/js/velocity.min.js',
'/themes/q-android-feat-map-leaflet/js/map/map-model.js',
'/themes/q-android-feat-map-leaflet/js/map/map-engine-leaflet.js',
'/themes/q-android-feat-map-leaflet/js/map/map-run.js',
'/themes/q-android-feat-map-leaflet/js/moment.min.js',
'/themes/q-android-feat-map-leaflet/js/functions.js',
'/themes/q-android-feat-map-leaflet/single.html',
'/themes/q-android-feat-map-leaflet/icons/pwa-icon-144x144.png',
'/themes/q-android-feat-map-leaflet/icons/pwa-icon-48x48.png',
'/themes/q-android-feat-map-leaflet/icons/pwa-icon-192x192.png',
'/themes/q-android-feat-map-leaflet/icons/pwa-icon-512x512.png',
'/themes/q-android-feat-map-leaflet/icons/pwa-icon-96x96.png',
'/themes/q-android-feat-map-leaflet/launch-head.html',
'/themes/q-android-feat-map-leaflet/archive.html',
'/themes/q-android-feat-map-leaflet/page.html',
'/themes/q-android-feat-map-leaflet/screenshot.jpg',
'/themes/q-android-feat-map-leaflet/menu.html',
'/themes/q-android-feat-map-leaflet/launch-content.html',
'/config.js'];

filesToCache = filesToCache.map( function( item ) {
	var subdir = location.pathname.replace( '/service-worker-cache.js', '' );
	return subdir + item;
} );

self.addEventListener( 'install', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Install' );
	e.waitUntil(
		caches.open( cacheName ).then( function ( cache ) {
			console.log( '[WP-AppKit Service Worker] Caching app assets' );
			return cache.addAll( filesToCache );
		} )
	);
} );

self.addEventListener( 'activate', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Activate' );
	e.waitUntil(
		caches.keys().then( function ( keyList ) {
			return Promise.all( keyList.map( function ( key ) {
				if ( key !== cacheName ) {
					console.log( '[WP-AppKit Service Worker] Removing old cache', key );
					return caches.delete( key );
				}
			} ) );
		} )
	);
	return self.clients.claim();
} );

self.addEventListener( 'fetch', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Fetch', e.request.url );
	e.respondWith(
		caches.match( e.request ).then( function ( response ) {
			return response || fetch( e.request );
		} )
	);
} );


