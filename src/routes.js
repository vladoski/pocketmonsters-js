import Mapbox from './routes/Map.svelte';
import Profile from './routes/Profile.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Mapbox,
    '/profile': Profile, 
    '*': NotFound
}

export default routes;