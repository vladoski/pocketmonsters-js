<script>
    import qs from 'qs';
    import { onMount } from 'svelte';
    import {push, querystring, location} from 'svelte-spa-router'
    import { apiKeyStore, apiUrlStore, mapElementsStore } from '../store.js';
    import { getImage, fightEat } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';
    import LoadingSpinner from '../components/LoadingSpinner.svelte';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    

    const elementId = qs.parse($querystring).id;

    let element;
    let elementImage;

    if (Array.isArray($mapElementsStore) && $mapElementsStore.length > 0) {
        element = $mapElementsStore.find(el => el.id === elementId);
    }

    const getImagePromise = getImage($apiUrlStore, $apiKeyStore, elementId)
        .then(imgBase64 => {
            elementImage = imgBase64.img;
        });

    function fightEatNow() {
        let getFightEatPromise = fightEat($apiUrlStore, $apiKeyStore, elementId)
            .then(json => {
                const queryString = qs.stringify({...json, type: element.type});
                push('/?' + queryString);
            });
    }
</script>

{#await getImagePromise}
    <LoadingSpinner />
    {:then _}
        <Header 
            title={element.type === 'MO' ? 'Fight' : 'Eat'}
            goto={'/'}/>
        <div class="flex content-center justify-center m-5">
            <Image
                src={'data:image/jpeg;charset=utf-8;base64,' + elementImage} 
                alt="Profile image"
                class="rounded-full border"
                height={180}
                width={180}/>
        </div>
        <div class="flex content-center justify-center">
            <p class="text-2xl text-gray-800 text-center">{element.name}</p>
        </div>
        <div class="flex content-center justify-center">
            <p class="text-lg text-gray-800">Size: {element.size}</p>
        </div>
        <div class="flex content-end justify-center mt-8">
            <div class="mr-5">
                <Button icon="check_circle" on:click={fightEatNow}>{element.type === 'CA' ? '\xa0 Eat' : '\xa0 Fight'}</Button>
            </div>
            <div class="ml-5">
                <Button icon="cancel" on:click={() => push('/')}>&nbsp; Cancel</Button>
            </div>
        </div>
    {:catch}
        <p>Error</p>
{/await}

