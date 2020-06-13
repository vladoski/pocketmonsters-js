<script>
    import qs from 'qs';
    import { onMount } from 'svelte';
    import {push, querystring, location} from 'svelte-spa-router'
    import { mapElementsStore } from '../store.js';
    import { getImage, fightEat } from '../utils/apihandler.js';

    import Image from 'smelte/src/components/Image';
    import Button from "smelte/src/components/Button";
    

    const elementId = qs.parse($querystring).id;

    let element;
    let elementImage;

    if (Array.isArray($mapElementsStore) && $mapElementsStore.length > 0) {
        element = $mapElementsStore.find(el => el.id === elementId);
    }

    console.log(element);
    
    const getImagePromise = getImage('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK', elementId)
        .then(imgBase64 => {
            elementImage = imgBase64.img;
        });

    function fightEatNow() {
        let getFightEatPromise = fightEat('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK', elementId)
            .then(json => {
                const queryString = qs.stringify({...json, type: element.type});
                console.log(queryString);
                push('/?' + queryString);
            });
    }


</script>

<style>

</style>

{#await getImagePromise}
    <p>Awaiting....</p>
    {:then _}
        <div class="flex content-center justify-center m-5">
            <Image
                src={'data:image/jpeg;charset=utf-8;base64,' + elementImage} 
                alt="Profile image"
                height={180}
                width={180}/>
        </div>
        <div class="flex content-center justify-center">
            <p class="text-2xl">{element.name}</p>
        </div>
        <div class="flex content-center justify-center">
            <p class="text-lg">Size: {element.size}</p>
        </div>
        <div class="flex content-end justify-center">
            <div class="mr-5">
                <Button icon="check_circle" on:click={fightEatNow}>{element.type === 'CA' ? 'Eat' : 'Fight'}</Button>
            </div>
            <div class="ml-5">
                <Button icon="cancel" on:click={() => push('/')}>Cancel</Button>
            </div>
        </div>
    {:catch}
        <p>Error</p>
{/await}

