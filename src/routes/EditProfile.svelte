<script>
    import { onMount, onDestroy } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { apiKeyStore, apiUrlStore, profileDataStore } from '../store.js';
    import { setProfile } from '../utils/apihandler.js';

    import Header from '../components/Header.svelte';

    import TextField from 'smelte/src/components/TextField';
    import Button from "smelte/src/components/Button";
    
    let username;
    let profileImage;
    let isImageValid = false;

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
            isImageValid = false;
        } else {
            profileImage = imageData;
            isImageValid = true;
        }
    }

    function cameraError(imageData) {
        console.log("ERROR: Could not retreive image.") // TODO: implement error visualisation
    }

    async function editProfile() {
        const isResOk = await setProfile($apiUrlStore, $apiKeyStore, username, profileImage);
        
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
    .ok-icon {
        margin-left: 0.2rem !important;
        font-size: 2rem !important;
        line-height: 1.1;
    }
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

        {#if isImageValid}
            <i aria-hidden="true" class="material-icons text-secondary-500 ok-icon">check_circle</i>
        {/if}
    </div>
</div>
<div class="flex content-end justify-center m-5">
    <div class="flex content-end justify-center m-5">
        <Button on:click={editProfile}>Edit profile</Button>
    </div>
</div>
