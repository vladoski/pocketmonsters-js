<script>
	import Router from 'svelte-spa-router';
	import { replace, location } from 'svelte-spa-router';
	import routes from './routes.js';

	import "smelte/src/tailwind.css";

	// Unlock orientation on mobile devices
	window.screen.orientation.unlock()

	function noPermissionGranted() {
		alert('This app requires your location to be used');
		navigator.app.exitApp();
	}

	// Add location marker on the map and geolocation functionality
	// Checks if the user gave location permissions, if not then the app can't be used (only on Android)
	// This needs to be executed on deviceready, so the plugins are available to use
	document.addEventListener('deviceready', e => {
		cordova.plugins.permissions.checkPermission(cordova.plugins.permissions.ACCESS_FINE_LOCATION, checkStatus => {
			if (!checkStatus.hasPermission) {
				cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.ACCESS_FINE_LOCATION, requestStatus => {
					console.log('hasPermission: ' + requestStatus.hasPermission);
					if (!requestStatus.hasPermission) {
						noPermissionGranted();
					} else {
						replace('/');
					}
				}, (error) => {
					noPermissionGranted();
				});
			}
		});
	});

	// Overwrites and handles Android's system back button behaviour ()
	document.addEventListener('backbutton', e => {
		e.preventDefault();

		switch ($location) {
			case '/fighteat':
			case '/ranking':
			case '/profile':
				replace('/');
				break;

			case '/profile/edit':
				replace('/profile');
				break;
			case '/error':
				replace('/');
				break;
			default:
				replace('/');
				break;
		}
	}, false);
</script>

<body>
    <Router {routes}/>
</body>
