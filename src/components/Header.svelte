<script>
    import Button from "smelte/src/components/Button";
    import { push, querystring, location } from 'svelte-spa-router';

    export let goto;
    export let title;
</script>

<style>
    #title {
        margin-top: -4vh;
    }
</style>

<div class="inset-x-0 top-0 mb-4">
        <div class='relative m-3 left-0 top-0 z-10'>
            <Button color="primary" icon="arrow_back" on:click={() => push(goto) }/>
            <h3 id="title" class="text-center text-primary-500">{title}</h3>
        </div>
</div>
