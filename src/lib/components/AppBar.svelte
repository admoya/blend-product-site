<div>
  <nav class="app-bar">
    <a class="branding" href="/">
      <h1>BLEND</h1>
    </a>
    <ul class="nav-links">
      <li>
        <a id="app" href="https://app.blendreading.com">app</a>
      </li>
      <li>
        <a id="pricing" href="/pricing">pricing</a>
      </li>
      <li>
        <a id="login" href="/login">login</a>
      </li>
    </ul>
  </nav>
</div>

<style>
  .app-bar {
    height: 66px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .branding {
    color: black;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 2%;
    text-align: center;
    max-width: 75vw;
  }

  .nav-links {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 2%;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0em;
    list-style-type: none;
    gap: 1rem;
  }

  .nav-links a {
    color: black;
    text-decoration: none;
  }

  a#app:hover {
    color: #f1b4fb;
  }

  a#pricing:hover {
    color: #84e3de;
  }

  a#login:hover {
    color: #ffc076;
  }

</style>