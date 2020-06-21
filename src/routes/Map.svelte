<script>
	import { onMount } from 'svelte';
	import { push, querystring, location } from 'svelte-spa-router';
	import qs from 'qs';
	import { register, getProfile, setProfile, getMap, getRanking, fightEat } from '../utils/apihandler.js';
	import { apiKeyStore, apiUrlStore, mapElementsStore } from '../store.js'

	import Mapbox from '../components/Mapbox.svelte';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';

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

	let isFirstTimeFetched = true; // if true getMapFromApi has never been fetched

	const unsubscribe = apiKeyStore.subscribe(key => {
			apiKey = key;
	});

	// Check if apiKey is present in localStorage, if not register to the game API
	if (localStorage.getItem('apiKey')) {
		apiKeyStore.set(localStorage.getItem('apiKey'));
	} else {
		register($apiUrlStore)
			.then(res => {
				localStorage.setItem('apiKey', res.session_id);
				apiKeyStore.set(res.session_id);
			})
			.catch(error => replace('/error?err=' + error));
	}
	
	// TODO: set this in the store. Refactor this.
	// TODO: [bug] this runs before the localstorage key retrieval, important bug to fix
	const getProfilePromise = getProfile($apiUrlStore, apiKey);
	getProfilePromise.then(json => {
		profileData = json;
	})
	.catch(error => replace('/error?err=' + error));;

	let getMapPromise;
	let queryString;
	onMount(() => {
		getMapFromApi();

		// Refresh the map every 15 seconds
		setInterval(getMapFromApi, 15000);

		// Handles the Snackbar notification after fighting or eating an element
		queryString = qs.parse($querystring);

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
	
	// TODO: refactor this, find another way to implement this. Garbage code
	function getMapFromApi() {
		if (isFirstTimeFetched) {
			isFirstTimeFetched = false;

			getMapPromise = getMap($apiUrlStore, apiKey);
			getMapPromise.then(res => {
				mapElements = res.mapobjects;
				mapElementsStore.set(mapElements);
			})
			.catch(error => replace('/error?err=' + error));
		} else {
			getMap($apiUrlStore, apiKey)
				.then(res => {
					mapElements = res.mapobjects;
					mapElementsStore.set(mapElements);
				})
				.catch(error => replace('/error?err=' + error));
		}
	}
</script>

{#await getMapPromise}
	<LoadingSpinner />
	{:then _}
		<Mapbox
			lat={45.4642}
			lon={9.1896}
			zoom={8.5}
			bind:mapElements={mapElements}
			on:mapElementTooFar={() => {showMapElementTooFarSnackbar = true}}>
		</Mapbox>

		<Snackbar bind:value={showSnackbar}>
			<div>{snackbarTitle} - LP: {queryString.lp}, XP: {queryString.xp}</div>
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
	<LoadingSpinner />
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