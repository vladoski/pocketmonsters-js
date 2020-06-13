<script>
    import { onMount, onDestroy } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { profileDataStore } from '../store.js';
    import { getRanking } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';
    import MaterialList from '../components/MaterialList.svelte';

    let rankingData;
    let rankingList;

    const rankingPromise = getRanking('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK');
    rankingPromise.then(res => {
            rankingData = res.ranking;

            rankingList = rankingData.map(ranking => {
                const listItem = {};

                listItem.text = ranking.username;

                if (ranking.img === undefined || ranking.img === null) { // TODO: check if the img is a proper valid image
                    listItem.image = 'img/user_icon.png';
                } else {
                    listItem.image = 'data:image/jpeg;charset=utf-8;base64,' + ranking.img;
                }

                listItem.subheading = `XP: ${ranking.xp} - LP: ${ranking.lp}`;

                return listItem;
            });
        })
        .catch(error => {
            console.log(error);
        });

</script>

<style>

</style>

<div>
    {#await rankingPromise}
        <p>Awaiting...</p>
        {:then _}
            <Header 
                title="Ranking"
                goto={'/'} />
            <MaterialList items={rankingList} />
        {:catch}
        <p>Error</p>
    {/await}
</div>
