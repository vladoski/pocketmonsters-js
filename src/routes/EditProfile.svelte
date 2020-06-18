<script>
    import { onMount, onDestroy } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { profileDataStore } from '../store.js';
    import { setProfile } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';

    import TextField from 'smelte/src/components/TextField';
    import Button from "smelte/src/components/Button";
    
    let username;
    let profileImage;

    let profileData;
    const unsubscribe = profileDataStore.subscribe(_profileData => {
        profileData = _profileData;
        username = _profileData.username;
        profileImage = _profileData.img;
    });

    function changeProfilePic() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(cameraCallback, cameraError, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true,
            mediaType: Camera.MediaType.PICTURE, 
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
    }

    function cameraCallback(imageData) {
        if(imageData.length >= 137000){
            alert("The image you picked is too big! Please select an image smaller than 100kb.");
        } else {
            profileImage = imageData;
        }
    }

    function cameraError(imageData) {
        console.log("ERROR: Could not retreive image.") // TODO: implement error visualisation
    }

    async function editProfile() {
        const isResOk = await setProfile('https://ewserver.di.unimi.it/mobicomp/mostri', 'v6LxCAWaIJGHoLxK', username, profileImage);
        
        if (isResOk) {
            profileDataStore.update(data => {
                data.username = username;
                data.img = profileImage;

                return data;
            });

            push('/profile');
        }
        
    }

    onDestroy(() => unsubscribe());
    
</script>

<style>

</style>


<div class="mt-5">
    <Header 
        title="Edit profile"
        goto={'/profile'} />
    <div class="flex justify-center">
        <TextField label="Username" bind:value={username} outlined/>
    </div>
    <div class="flex content-end justify-center m-5">
        <Button on:click={changeProfilePic}>Upload new picture</Button>
    </div>
</div>
<div class="flex content-end justify-center m-5">
    <div class="flex content-end justify-center m-5">
        <Button on:click={editProfile}>Edit profile</Button>
    </div>
</div>
