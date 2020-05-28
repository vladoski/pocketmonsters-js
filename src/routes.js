import Mapbox from './routes/Map.svelte';
import Profile from './routes/Profile.svelte';
import EditProfile from './routes/EditProfile.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Mapbox,
    '/profile': Profile,
    '/profile/edit': EditProfile,
    '*': NotFound
}

export default routes;