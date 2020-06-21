<script>
    import { onMount } from 'svelte';
    import { push, replace } from 'svelte-spa-router';
    import { apiKeyStore, apiUrlStore, profileDataStore } from '../store.js';
    import { getProfile } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';
    import LoadingSpinner from '../components/LoadingSpinner.svelte';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    
    let isLandscape;
    let profileData;
    let getProfilePromise = getProfile($apiUrlStore, $apiKeyStore)
        .then(json => {
            profileData = json;
            profileDataStore.set(profileData);
        })
        .catch(error => replace('/error?err=' + error));
    
    $: {
        if (window.innerWidth > window.innerHeight) {
            isLandscape = true;
        } else {
            isLandscape = false;
        }
    }
    console.log($apiKeyStore);
    console.log($apiUrlStore);
</script>

<style>
    .stat-text {
        margin-left: -1rem;
    }

    .stat-icon-size {
        font-size: 5rem !important;
        line-height: 1.1 !important;
        margin-right: 1rem;
    }

    .center-content {
        justify-items: center;
    }
</style>

{#await getProfilePromise}
    <LoadingSpinner />
    {:then _}
        <Header 
            title="Profile"
            goto={'/'}/>

        {#if !isLandscape}
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
                    <i aria-hidden="true" class="material-icons icon stat-icon-size text-error-500">favorite</i> <p class="text-4xl"> {profileData.lp}</p>
                </div>
                <div class="flex justify-center">
                    <i aria-hidden="true" class="material-icons icon stat-icon-size text-secondary-500">stars</i> <p class="text-4xl"> {profileData.xp}</p>
                </div>
            </div>
        {:else}
            <div class="grid grid-cols-2 center-content text-center">
                <div class="w-1/2 justify-center">
                    <Image
                        src={'data:image/jpeg;charset=utf-8;base64,' + profileData.img}
                        class="rounded-full h-48 w-48 border"
                        alt="Profile image"
                        height={180}
                        width={180}/>
                    
                    <p class="h4">{profileData.username}</p>
                </div>
                <div class="w-1/2 justify-center">
                    <div>
                        <i aria-hidden="true" class="material-icons icon stat-icon-size text-error-500">favorite</i> <p class="text-4xl stat-text"> {profileData.xp}</p>
                        <i aria-hidden="true" class="material-icons icon stat-icon-size text-secondary-500">stars</i> <p class="text-4xl stat-text"> {profileData.xp}</p>
                    </div>
                </div>
            </div>
        {/if}
        <div class="flex content-end justify-center m-5">
            <Button on:click={() => push('/profile/edit') }>Edit profile</Button>
        </div>
    {:catch}
        <p>Error</p>
{/await}
