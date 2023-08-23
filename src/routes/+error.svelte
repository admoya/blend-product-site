<script>
  import { page } from '$app/stores';
  console.log($page.status);
</script>

<div class="content">
  <h1>{$page.status}</h1>
  <p style="font-weight: bold;">{$page.error?.message}</p>
</div>
