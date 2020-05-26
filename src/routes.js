import Mapbox from './routes/Map.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Mapbox,
    '*': NotFound
}

export default routes;