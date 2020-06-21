<script>
    import qs from 'qs';
    import { replace, querystring } from 'svelte-spa-router';
    
    import Header from '../components/Header.svelte';

    import { Card, Button, Image } from 'smelte';
    
    const errorString = qs.parse($querystring).err;
    console.log(errorString);
</script>
<Header 
    title="Error" 
    goto="/" />
<div class="text-center mt">
    <Card.Card class="justify-content">
        <div slot="title">
            <Card.Title
                title="Oopsie, an error has occurred"
                subheader="{errorString ? errorString : ''}" />
        </div>
        <div slot="media">
            <Image
                class="w-full"
                src="img/kitten-error.jpg"
                alt="kitty" />
        </div>
        <div slot="text" class="p-5 pb-0 pt-3 text-gray-700 body-2">
            The three little kittens, they lost their mittens,<br>
            And they began to cry,<br>
            "Oh, mother dear, we sadly fear,<br>
            That we have lost our mittens."
        </div>
        <div slot="actions">
            <div class="p-2">
                <Button on:click={() => replace('/')}>Return to the map</Button>
            </div>
        </div>
    </Card.Card>
</div>