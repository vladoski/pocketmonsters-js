export async function register(url) {
    try {
        const res = await fetch(url + '/register.php');

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getProfile(url, session_id) {
    try {
        const res = await fetch(url + '/getprofile.php', {
            method: 'POST',
            body: JSON.stringify({ session_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function setProfile(url, session_id, username, img) {
    try {
        const res = await fetch(url + '/setprofile.php', {
            method: 'POST',
            body: JSON.stringify({ session_id, username, img})
        });

        return res.ok;
    } catch (e) {
        console.log(e);
    }
}

export async function getMap(url, session_id) {
    try {
        const res = await fetch(url + '/getmap.php', {
            method: 'POST',
            body: JSON.stringify({ session_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getImage(url, session_id, target_id) {
    try {
        const res = await fetch(url + '/getimage.php', {
            method: 'POST',
            body: JSON.stringify({ session_id, target_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getRanking(url, session_id) {
    try {
        const res = await fetch(url + '/ranking.php', {
            method: 'POST',
            body: JSON.stringify({ session_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getRankingWithId(url, session_id) {
    try {
        const res = await fetch(url + '/ranking2.php', {
            method: 'POST',
            body: JSON.stringify({ session_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getProfileById(url, session_id, id) {
    try {
        const res = await fetch(url + '/getprofilebyid.php', {
            method: 'POST',
            body: JSON.stringify({ session_id, id: '' + id})
        });

        return res.json();
    } catch (e) {
        console.log('ERROR' + e);
    }
}

export async function fightEat(url, session_id, target_id) {
    try {
        const res = await fetch(url + '/fighteat.php', {
            method: 'POST',
            body: JSON.stringify({ session_id, target_id })
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
}
