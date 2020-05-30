<script>
	import { onMount } from 'svelte';
	import { push } from 'svelte-spa-router';
	import { register, getProfile, setProfile, getMap, getRanking, fightEat } from '../utils/apihandler.js';
	import { apiKeyStore, apiUrlStore } from '../store.js'

	import Mapbox from '../components/Mapbox.svelte';
	import Button from "smelte/src/components/Button";
  	import TextField from "smelte/src/components/TextField";
	
	let apiKey;
	let mapElements;

	let getMapPromise;
	onMount(() => {
		getMapPromise = getMap('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK');

		getMapPromise.then(res => {
			mapElements = res.mapobjects;
		});

	});
	
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
			{mapElements}>
		</Mapbox>
	{:catch}
		<p>Error</p>
{/await}
<div class='absolute m-3 inset-x-0 bottom-0'>
	<Button color="primary" icon="account_circle" on:click={() => push('/profile') }/>
</div>

<div class='absolute m-3 left-0 bottom-0'>
	<Button color="primary" icon="account_circle" on:click={() => push('/profile') }/>
</div>

<div class='absolute m-3 right-0 bottom-0'>
	<Button color="primary" icon="view_list" on:click={() => push('/ranking') }/>
</div>