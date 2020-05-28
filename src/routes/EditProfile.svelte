<script>
    import { onMount, onDestroy } from 'svelte';
    import { profileDataStore } from '../store.js';
    import { setProfile } from '../utils/apihandler.js';

    import TextField from 'smelte/src/components/TextField';
    import Button from "smelte/src/components/Button";
    
    let username;

    let profileData;
    const unsubscribe = profileDataStore.subscribe(_profileData => {
        profileData = _profileData;
    });

    onDestroy(() => unsubscribe());
    
</script>

<style>

</style>


<div>
    <div class="flex justify-center">
        <TextField label="Username" bind:value={username}/>
    </div>
    <div class="flex content-end justify-center m-5">
        <Button>Upload new picture</Button>
    </div>
</div>
<div class="flex content-end justify-center m-5">
    <div class="flex content-end justify-center m-5">
        <Button>Edit profile</Button>
    </div>
</div>
