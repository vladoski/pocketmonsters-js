<script>
	import Router from 'svelte-spa-router'
	import routes from './routes.js';

	import "smelte/src/tailwind.css";
</script>

<style>
</style>

<body>
    <Router {routes}/>
</body>
