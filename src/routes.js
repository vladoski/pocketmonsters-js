import Mapbox from './routes/Map.svelte';
import Profile from './routes/Profile.svelte';
import EditProfile from './routes/EditProfile.svelte';
import Ranking from './routes/Ranking.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Mapbox,
    '/profile': Profile,
    '/profile/edit': EditProfile,
    '/ranking': Ranking,
    '*': NotFound
}

export default routes;