<script lang="ts">
import { user, willAttemptLogin } from "$lib/firebase";
$: {
    if (!$user && !willAttemptLogin()) 
        window.location.replace('/login?successRedirect=account');
    else if ($user)
        window.location.replace(`/account/${$user.uid}`);
}
</script>