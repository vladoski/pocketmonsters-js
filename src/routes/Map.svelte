<script>
	import Mapbox from '../components/Mapbox.svelte';
	import Button from "smelte/src/components/Button";
  	import TextField from "smelte/src/components/TextField";
</script>

<style>
</style>

<Mapbox
	lat={35}
	lon={-84}
	zoom={3.5}>
</Mapbox>

<div class='absolute m-3 inset-x-0 bottom-0'>
	<Button color="alert" icon="change_history" />
</div>