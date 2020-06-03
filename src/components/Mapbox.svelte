<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { push } from 'svelte-spa-router';

	export let lat;
	export let lon;
	export let zoom;
	export let mapElements;

	let container;
	let map;
	let markers = [];

	onMount(async () => {

        // Default Mapbox API key from the docs
        mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZG9za2kiLCJhIjoiY2szNzFrbnBqMDc0aDNjbnMxZ3R1cDlobCJ9.hrd1syWrQqTE-4Ucn0UW_w';

		map = new mapboxgl.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [lon, lat],
			zoom,
			attributionControl: false, // Deletes the attribution control
			logoPosition: 'top-left' // Moves the logo position up on the top left corner
		});

		map.addControl(new mapboxgl.NavigationControl({
			showCompass: true,
			showZoom: false
		}));

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: true,
			showUserLocation: true
		});

		// Moves the attribution up in the left corner
		map.on('load', function() {
			map.addControl(new mapboxgl.AttributionControl(), 'top-right');
			geolocate.trigger();

			if (mapElements !== undefined) {

				mapElements.forEach(element => {
					let icon = document.createElement('div');
					icon.className = 'marker';
					icon.id = element.id;
					icon.style.width = '3rem';
					icon.style.height = '3rem';
					icon.style.backgroundSize = 'contain';

					// TODO: refactor this
					if (element.type == "CA") {
						if (element.size == "M") {
							icon.style.backgroundImage = 'url(img/candy_m.png)';
						}
						if (element.size == "L") {
							icon.style.backgroundImage = 'url(img/candy_l.png)';
						}
						if (element.size == "S") {
							icon.style.backgroundImage = 'url(img/candy_s.png)';
						}
					}
					if (element.type == "MO") {
						if (element.size == "M") {
							icon.style.backgroundImage = 'url(img/monster_m.png)';
						}
						if (element.size == "L") {
							icon.style.backgroundImage = 'url(img/monster_l.png)';
						}
						if (element.size == "S") {
							icon.style.backgroundImage = 'url(img/monster_s.png)';
						}
					}

					// Goes to the fighteat passing the element id in the querystring
					icon.addEventListener('click', () => {
						push(`/fighteat?id=${icon.id}`);
					});

					let newMarker = new mapboxgl.Marker(icon)
						.setLngLat([parseFloat(element.lon), parseFloat(element.lat)])
						.addTo(map);

					markers = [newMarker, ...markers];
				});
			}
		});

		// Could be useful for memory leaks
		return () => {
			map.remove();
		};
	});

</script>

<style>
	#mapbox {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}
</style>

<svelte:head>
	<link rel="stylesheet" href="mapbox-gl.css">
</svelte:head>

<div id="mapbox" bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>