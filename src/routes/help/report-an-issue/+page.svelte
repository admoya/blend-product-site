<svelte:head>
  <title>Issue Report - Blend</title>
</svelte:head>

<div class="content">
  <h1>Report an Issue with the Blend App or Website</h1>
  <div class="form-details">
    <p>Fill out and submit the form below, and our support team will get back to you shortly.</p>
    <p>Please ensure to include as many details about your issue as possible to help us resolve it as quickly as possible.</p>
    <p>Thank you for your patience!</p>
    <form name="issue-report" action="/help/report-an-issue/success" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="issue-report" />
      <input type="hidden" name="subject" value="Issue Report from blendreading.com" />
      <p><label class="form-label">Email<input type="email" name="email" required /></label></p>
      <p><label class="form-label">Message<textarea name="message" required></textarea></label></p>
      <p><button class="btn" type="submit">Submit</button></p>
    </form>
  </div>
</div>

<style>
  @media (max-width: 480px) {
    form {
      width: 100% !important;
    }
  }

  p {
    margin: 0;
  }
  .form-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  .btn {
    margin: 0;
    font-size: 1.5rem;
  }
  form {
    margin: 1rem;
    width: 50%;
  }
  input[type='email'],
  textarea {
    display: block;
    margin-bottom: 1rem;
    background: none;
    padding: 10px 8px;
    border-radius: 8px;
    border: solid 1px white;
    font-family: 'Heebo';
    font-size: 1.2rem;
    width: 100%;
    resize: vertical;
  }
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    text-align: left;
  }
</style>
