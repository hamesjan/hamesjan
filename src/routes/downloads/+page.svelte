<script>
  export let data;
  const { releases } = data;
</script>

<svelte:head><title>downloads — James Han</title></svelte:head>

<div class="container">
  <p class="description">Source releases of this site.</p>

  {#if !releases.length}
    <p>no releases yet.</p>
  {:else}
    <ul>
      {#each releases as release}
        <li>
          <a href="/releases/{release.file}" download>{release.file}</a>
          — {release.date} — {release.size}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .container {
    padding: 32px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: var(--text);
  }

  .description {
    margin: 0 0 20px 0;
    color: var(--text-muted);
  }

  ul {
    padding: 0 0 0 18px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  a {
    color: #2a7dad;
  }
</style>
