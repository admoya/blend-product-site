<script lang="ts">
  import ProBadgeWrapper from './ProBadgeWrapper.svelte';

  const check = '\u2713';
</script>

<section class="pricing" id="pricing">
  <div class="content">
    <h1>Pricing</h1>
    <ProBadgeWrapper>
      <div class="banner">
        <div>Get your first month free when you subscribe to Blend Pro!</div>
      </div>
    </ProBadgeWrapper>
    <div class="side-by-side">
      <table class="pricing-table">
        <colgroup>
          <col class="feature-names" />
          <col span="2" class="check-marks" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" class="column-header">Features</th>
            <th scope="col" class="column-header"
              >Basic
              <h6>free</h6></th>
            <th scope="col" class="column-header"
              >Pro
              <h6>$3/month</h6></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Virtual Blending Board</th>
            <td>{check}</td>
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Preloaded Standard Decks</th>
            <td>{check}</td>
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Sync Across Devices</th>
            <td>{check}</td>
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">One Custom Deck</th>
            <td>{check}</td>
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Word History</th>
            <td>{check}</td>
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Unlimited Custom Decks</th>
            <td class="empty" />
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Deck Library</th>
            <td class="empty" />
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Deck Playlists</th>
            <td class="empty" />
            <td>{check}</td>
          </tr>
          <tr>
            <th scope="row">Remote Deck Sharing</th>
            <td class="empty" />
            <td>{check}</td>
          </tr>
        </tbody>
      </table>
      <div class="site-licensing">
        <div class="column-header">Group Licensing</div>
        <a href="mailto:support@blendreading.com"><h6>Contact for Pricing</h6></a>
        <div class="feature">All Blend Pro Features</div>
        <div class="feature">Easy Organization Management</div>
        <div class="feature">Organization-Wide Shared Decks & Playlists</div>
        <div class="feature">Dedicated Support</div>
        <p>Want to learn more about these features? <br /> <a href="https://drive.google.com/file/d/1y5GQ-mdf9fGhjr2EWVDlxlAxTvSPvbbT/view?usp=share_link" target="_blank" rel="noopener noreferrer">Click here</a> for more information.</p>
        <p>
          Save money by purchasing a group license! We'll work with you on a plan that makes sense for
          your organization.
        </p>
        <h4>
          Email us at <a id="email" href="mailto:support@blendreading.com">support@blendreading.com</a> to get started.
        </h4>
      </div>
    </div>
    <a class="btn" href="/login">sign up</a>
  </div>
</section>

<style>
  .pricing {
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .side-by-side {
    justify-content: center;
  }

  .btn {
    margin: 1.8rem;
    font-size: 2rem;
    width: 20%;
    padding: 0.2rem;
  }
  h1 {
    margin: 1.2rem;
  }

  .pricing-table {
    margin: 1rem 0;
    border-spacing: 1.5rem;
    table-layout: fixed;
    width: 60%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }

  .site-licensing {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-spacing: 1.5rem;
    width: 30%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    padding: 1.8rem;
  }

  a#email {
    text-decoration: underline;
  }

  a:hover {
    color: white;
  }

  .feature {
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2.8rem;
    margin: 0.8rem;
    font-weight: 700;
  }

  .column-header {
    font-family: 'Contrail One';
    font-size: 1.8rem;
  }

  .banner {
    color: white;
    padding: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border: solid 2px white;
    border-radius: 10px;
  }

  thead th:nth-child(1) {
    width: 50%;
  }

  th {
    color: black;
  }

  thead th {
    vertical-align: top;
    color: white;
  }

  tbody th {
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  td {
    border: 2px solid white;
    color: white;
    border-radius: 8px;
    font-size: 2rem;
    font-weight: 900;
  }

  .empty {
    border: none;
  }
  @media (max-width: 480px) {
    .pricing-table {
      font-size: 80%;
      width: 100%;
    }
    td {
      font-size: 1.5rem;
    }
    .site-licensing {
      font-size: 90%;
      width: 90%;
    }

    .btn {
      font-size: 1rem;
      width: 50%;
    }
    .column-header {
      font-size: 1.3rem;
    }
    .column-header h6 {
      font-size: 70%;
    }
    .banner {
      font-size: 90%;
    }
  }
</style>
