<script>
	import { onMount } from 'svelte';
	import { push, querystring } from 'svelte-spa-router';
	import qs from 'qs';
	import { register, getProfile, setProfile, getMap, getRanking, fightEat } from '../utils/apihandler.js';
	import { apiKeyStore, apiUrlStore, mapElementsStore } from '../store.js'

	import Mapbox from '../components/Mapbox.svelte';

	import Chip from 'smelte/src/components/Chip';
	import Button from "smelte/src/components/Button";
	import Snackbar from "smelte/src/components/Snackbar";
  	import TextField from "smelte/src/components/TextField";
	
	let apiKey;
	let mapElements;
	let profileData;
	let snackbarTitle = '';
	let showSnackbar = false;
	let showMapElementTooFarSnackbar = false;

	// TODO: set this in the store. Refactor this.
	const getProfilePromise = getProfile('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK');
	getProfilePromise.then(json => {
		profileData = json;
		console.log(profileData);
	});

	let getMapPromise;
	let queryString;
	onMount(() => {
		getMapFromApi();

		// Refresh the map every 60 seconds
		setInterval(getMapFromApi, 60000);

		queryString = qs.parse($querystring);
		console.log(queryString);

		if (queryString.type === 'CA') {
			snackbarTitle = 'Gnam! What a delicious candy!';

			showSnackbar = true;
		} else if (queryString.type === 'MO' && queryString.died === 'true') {
			snackbarTitle = 'You have been slain!';	

			showSnackbar = true;
		} else if (queryString.type === 'MO' && queryString.died === 'false') {
			snackbarTitle = 'You have killed the monster!';	

			showSnackbar = true;
		}
	});
	
	function getMapFromApi() {
		getMapPromise = getMap('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK');

		getMapPromise.then(res => {
			mapElements = res.mapobjects;

			mapElementsStore.set(mapElements);
		});
	}

	const unsubscribe = apiKeyStore.subscribe(key => {
			apiKey = key;
	});
	
</script>

<style>
</style>
{#await getMapPromise}
	<p>Fetching</p>
	{:then _}
		<Mapbox
			lat={45.4642}
			lon={9.1896}
			zoom={8.5}
			bind:mapElements={mapElements}
			on:mapElementTooFar={() => {showMapElementTooFarSnackbar = true}}>
		</Mapbox>

		<Snackbar bind:value={showSnackbar}>
			<div>{snackbarTitle} - XP:{queryString.xp} LP:{queryString.lp}</div>
		</Snackbar>

		<Snackbar bind:value={showMapElementTooFarSnackbar}>
			<div>Oops, this is out of your range!</div>
		</Snackbar>
	{:catch}
		<p>Error</p>
{/await}

<div class='absolute m-3 left-0 bottom-0 z-10'>
	<Button color="primary" icon="account_circle" on:click={() => push('/profile') }/>
</div>

{#await getProfilePromise}
	<p>Awaiting...</p>
	{:then _}
		<div class='flex absolute m-5 inset-x-0 bottom-0 justify-center t'>
			<Chip
				icon="favorite"
				outlined
				selectable={false}
				>LP: {profileData.lp}</Chip>
			<Chip
				icon="stars"
				outlined
				selectable={false}
				>XP: {profileData.xp}</Chip>
		</div>
	{:catch}
		<p>Error</p>
{/await}

<div class='absolute m-3 right-0 bottom-0'>
	<Button color="primary" icon="view_list" on:click={() => push('/ranking') }/>
</div>