<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { apiKeyStore, apiUrlStore, profileDataStore } from '../store.js';
    import { getProfile } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    

    let profileData;
    let getProfilePromise = getProfile($apiUrlStore, $apiKeyStore)
        .then(json => {
            profileData = json;
            profileDataStore.set(profileData);
        });
    

</script>

<style>
    .stat-icon-size {
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
                class="rounded-full h-48 w-48 border"
                alt="Profile image"
                height={180}
                width={180}/>
        </div>
        <div class="text-gray-800">
            <div class="flex justify-center">
                <p class="h4">{profileData.username}</p>
            </div>
            <div class="flex justify-center">
                <i aria-hidden="true" class="material-icons icon stat-icon-size text-error-500">favorite</i> <p class="text-4xl"> {profileData.xp}</p>
            </div>
            <div class="flex justify-center">
                <i aria-hidden="true" class="material-icons icon stat-icon-size text-secondary-500">stars</i> <p class="text-4xl"> {profileData.xp}</p>
            </div>
        </div>
        <div class="flex content-end justify-center m-5">
            <Button on:click={() => push('/profile/edit') }>Edit profile</Button>
        </div>
    {:catch}
        <p>Error</p>
{/await}
