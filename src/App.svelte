<script>
	import Router from 'svelte-spa-router';
	import { replace, location } from 'svelte-spa-router';
	import routes from './routes.js';

	import "smelte/src/tailwind.css";

	// Overwrites and handles Android's system back button behaviour ()
	document.addEventListener('backbutton', e => {
		e.preventDefault();
		//alert($location)

		switch ($location) {
			case '/fighteat':
			case '/ranking':
			case '/profile':
				replace('/');
				break;

			case '/profile/edit':
				replace('/profile');
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
