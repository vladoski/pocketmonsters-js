<script>
    import { onMount, onDestroy } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { apiKeyStore, apiUrlStore, profileDataStore } from '../store.js';
    import { getRankingWithId } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';
    import MaterialList from '../components/MaterialList.svelte';
    import LoadingSpinner from '../components/LoadingSpinner.svelte';

    let rankingData;
    let rankingList;

    const rankingPromise = getRankingWithId($apiUrlStore, $apiKeyStore);
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

                listItem.subheading = `XP: ${ranking.xp}`;
                listItem.playerId = ranking.id;

                return listItem;
            });
        })
        .catch(error => replace('/error?err=' + error));

</script>

<div>
    {#await rankingPromise}
        <LoadingSpinner />
        {:then _}
            <Header 
                title="Ranking"
                goto={'/'} />
            <MaterialList
                class="-mt-4"
                items={rankingList} />
        {:catch}
        <p>Error</p>
    {/await}
</div>
