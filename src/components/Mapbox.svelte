<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';

	export let lat;
	export let lon;
	export let zoom;

	let container;
	let map;

	onMount(async () => {

        // Default Mapbox API key from the docs
        mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZG9za2kiLCJhIjoiY2szNzFrbnBqMDc0aDNjbnMxZ3R1cDlobCJ9.hrd1syWrQqTE-4Ucn0UW_w';

		map = new mapboxgl.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [lon, lat],
			zoom
		});

		return () => {
			map.remove();
		};
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<svelte:head>
	<link rel="stylesheet" href="mapbox-gl.css">
</svelte:head>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>