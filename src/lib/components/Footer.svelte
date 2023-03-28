<script lang="ts">
  import logo from '$lib/assets/logo.svg';
</script>

<footer>
  <div class="footer-content">
    <div class="footer-logo">
      <img src={logo} alt="Blend Logo"/>
    </div>
    <div class="footer-section">
      <h2>BLEND READING</h2>
      <p>Blend Reading was created by CSMA Technology in partnership with Sage Literacy.</p>
      <p>__</p>
      <h2>USEFUL LINKS</h2>
      <ul>
        <li><a href="/account">Your Account</a></li>
        <li><a href="mailto:blend-support@csma.technology">Contact Support</a></li>
      </ul>
    </div>
    <div class="footer=section">
      
    </div>
    <div class="footer-section">
      <h2>REACH OUT TO US</h2>
      <ul>
        <p>Stay in touch with us on social media</p>
        <li><a href="https://www.facebook.com/blendreading">Blend on Facebook</a></li>
        <li><a href="https://www.instagram.com/blendreading/">Blend on Instagram</a></li>
        <li>__</li>
        <p>Learn about our creators</p>
        <li><a href="https://csma.technology">CSMA Technology</a></li>
        <li><a href="https://sageliteracy.org">Sage Literacy</a></li>
      </ul>
    </div>
  </div>
</footer>

<style>
  footer {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
  }

  .footer-logo {
    flex-basis: 5rem;
  }

  .footer-section {
    flex-basis: 25rem;
    display: flex;
    flex-direction: column;
  }

  .footer-section h2 {
    margin: 0px;
  }

  .footer-content {
    padding: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  ul {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }
</style>