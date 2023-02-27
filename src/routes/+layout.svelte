<script lang="ts">
    import "../app.css";
    import { auth } from '$lib/firebase';
    import { browser } from "$app/environment";

    let isLoggedIn = auth && auth.currentUser;
</script>


<slot />