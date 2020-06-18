<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { profileDataStore } from '../store.js';
    import { getProfile } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    

    let profileData;
    let getProfilePromise = getProfile('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK')
        .then(json => {
            profileData = json;
            profileDataStore.set(profileData);
        });
    

</script>

<style>
    .statIconSize {
        font-size: 5rem !important;
        line-height: 1.1 !important;
        margin-right: 1rem;
    }
</style>

{#await getProfilePromise}
    <p>Awaiting....</p>
    {:then _}
        <Header 
            title="Profile"
            goto={'/'}/>
        <div class="flex content-center justify-center m-5">
            <Image
                src={'data:image/jpeg;charset=utf-8;base64,' + profileData.img}
                class="rounded-full"
                alt="Profile image"
                height={180}
                width={180}/>
        </div>
        <div>
            <div class="flex justify-center">
                <p class="h4">{profileData.username}</p>
            </div>
            <div class="flex justify-center">
                <i aria-hidden="true" class="material-icons icon statIconSize text-error-500">favorite</i> <p class="text-4xl"> {profileData.xp}</p>
            </div>
            <div class="flex justify-center">
                <i aria-hidden="true" class="material-icons icon statIconSize text-secondary-500">stars</i> <p class="text-4xl"> {profileData.xp}</p>
            </div>
        </div>
        <div class="flex content-end justify-center m-5">
            <Button on:click={() => push('/profile/edit') }>Edit profile</Button>
        </div>
    {:catch}
        <p>Error</p>
{/await}
