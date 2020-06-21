import Mapbox from './routes/Map.svelte';
import Profile from './routes/Profile.svelte';
import EditProfile from './routes/EditProfile.svelte';
import Ranking from './routes/Ranking.svelte';
import FightEat from './routes/FightEat.svelte';
import ErrorPage from './routes/Error.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Mapbox,
    '/profile': Profile,
    '/profile/edit': EditProfile,
    '/ranking': Ranking,
    '/fighteat': FightEat,
    '/error': ErrorPage,
    '*': NotFound
}

export default routes;