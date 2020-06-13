<script>
    import Button from "smelte/src/components/Button";
    import { push, querystring, location } from 'svelte-spa-router';

    export let goto;
    export let title;
</script>

<style>
    #title {
        margin-top: -3vh;
    }
</style>

<div class="inset-x-0 top-0">
        <div class='relative m-3 left-0 top-0 z-10'>
            <Button color="primary" icon="arrow_back" on:click={() => push(goto) }/>
            <h4 id="title" class="text-center">{title}</h4>
        </div>
</div>
