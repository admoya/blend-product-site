<script lang="ts">
    const check = '\u2713';
</script>

<svelte:head>
    <title>Blend Pricing</title>
</svelte:head>

<div class="content">
    <h1>Blend Pricing</h1>
    <table class="pricing-table">
        <caption>Get your <u>first month free</u> when you subscribe to Blend PRO!</caption>
        <colgroup>
            <col class="feature-names" />
            <col span="2" class="check-marks" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col" class="column-header">Features</th>
                <th scope="col" class="column-header">Basic<h6>free</h6></th>
                <th scope="col" class="column-header">PRO<h6>$3/month</h6></th>
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
    <a class="btn" href="/login">sign up</a>
    <div class="epilogue">
        <h1>
            Subscribe to our newsletter for updates on new Blend PRO features!
        </h1>
        <a class="btn" href="/subscribe">subscribe</a>
    </div>
</div>

<style>
    @media (max-width: 480px) {
        .pricing-table {
            font-size: 80%;
            width: 90% !important;
        }

        .btn {
            font-size: 1rem;
            width: 50% !important;
        }
        .column-header {
            font-size: 1.5rem !important;
        }
    }

    .btn {
        margin: 1.8rem;
        font-size: 2rem;
        width: 20%;
        padding: 0.2rem;
    }

    .epilogue {
        margin: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        margin: 1.2rem;
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
        color: #595d69;
        padding: 0.5rem;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        background: linear-gradient(52.71deg, #FFFAA0 -7.68%, #F4BA9E 41.11%, #EEA7FA 91.67%);
        border: solid 2px white;
        border-radius: 10px;
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
