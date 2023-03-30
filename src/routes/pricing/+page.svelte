<script lang="ts">
    const check = '\u2713';
</script>

<svelte:head>
    <title>Blend Pricing</title>
</svelte:head>

<div class="content">
    <h1>Blend Pricing</h1>
    <table class="pricing-table">
        <caption>Get <u>one month free</u> when you subscribe to Blend PRO!</caption>
        <colgroup>
            <col class="feature-names" />
            <col span="2" class="check-marks" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col" class="column-header">Features</th>
                <th scope="col" class="column-header">Basic<h6>free</h6></th>
                <th scope="col" class="column-header">PRO<h6>$3/month</h6></th
                >
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
                <th scope="row">Unlimited Custom Decks</th>
                <td class="empty"></td>
                <td>{check}</td>
            </tr>
            <tr>
                <th scope="row">Additional Features (Coming Soon!)</th>
                <td class="empty"></td>
                <td>{check}</td>
            </tr>
        </tbody>
    </table>
    <a class="btn" href="/login"><h2>sign up</h2></a>

    <h1>
        Subscribe to our newsletter for updates on new Blend PRO features!
    </h1>
    <a class="btn" href="/subscribe"><h2>subscribe</h2></a>
</div>

<style>
    h1 {
        margin: 1rem;
    }
    .content {
        max-width: 90rem;
        padding-bottom: 5%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .pricing-table {
        margin: auto;
        border-spacing: 1.5rem;
        table-layout: fixed;
        width: 70%;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
    }

    .column-header {
        font-family: "Contrail One";
        font-size: 2rem;
    }

    caption {
        font-size: 1.5rem;
        font-weight: bold;
    }

    thead th:nth-child(1) {
        width: 50%;
    }

    thead th {
        vertical-align: top;
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

</style>
