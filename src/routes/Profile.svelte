<script>
    import { onMount } from 'svelte';
    import { getProfile } from '../utils/apihandler.js';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    
    let getProfilePromise = getProfile('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK');

</script>

<style>

</style>

{#await getProfilePromise}
    <p>Awaiting....</p>
    {:then profileData}
        <div class="flex content-center justify-center m-5">
            <Image
                src={'data:image/jpeg;charset=utf-8;base64,' + profileData.img} 
                alt="Profile image"
                height={180}
                width={180}/>
        </div>
        <div>
            <div class="flex justify-center">
                <p class="body-1">Life points: {profileData.xp}</p>
            </div>
            <div class="flex justify-center">
                <p class="body-1">Experience points: {profileData.lp}</p>
            </div>
        </div>
        <div class="flex content-end justify-center m-5">
            <Button>Edit profile</Button>
        </div>
    {:catch}
        <p>Error</p>
{/await}
