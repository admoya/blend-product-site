<svelte:head>
  <title>Subscribe to Blend</title>
</svelte:head>

<form method="post" action="https://communications.blendreading.com/subscription/form" class="listmonk-form">
    <div>
        <h2>Join our mailing list to be notified of updates and Blend News! &#127881;</h2>
        <input type="hidden" name="nonce" />
        <p><input type="email" name="email" required placeholder="E-mail" /></p>
        <p><input type="text" name="name" placeholder="Name (optional)" /></p>
      
        <p>
          <input id="8c1c5" type="hidden" name="l" value="8c1c54b6-ed85-4eb0-bdb5-5a3c385c8560" />
        </p>
        <p><input type="submit" value="Subscribe" class="btn" /></p>
    </div>
</form>

<style>
    .listmonk-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10%;
    }
    input[type="text"], input[type="email"]{
        width: 50%;
        padding: 10px 8px;
        border-radius: 8px;
        border-color: transparent;
        font-size: 1.5em;
    }
    .btn {
        width: 40%;
        font-family: "Heebo";
        font-weight: bold;
        font-size: 1.5em;
        margin: 0;
    }
    p {
        text-align: center;
        display: flex;
        justify-content: center;
    }
    h2 {
        font-family: "Contrail One";
        text-align: center;
        font-size: 2rem;
        margin: 0px;
    }
</style>