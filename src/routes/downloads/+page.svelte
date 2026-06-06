<script>
  export let data;
  const { releases } = data;
</script>

<svelte:head><title>downloads — James Han</title></svelte:head>

<div class="container">
  <h1>downloads</h1>
  <p class="description">
    Source releases of this site. Each tarball contains everything needed to
    redeploy — source code, data, Caddy config, and systemd service file.
  </p>

  {#if !releases.length}
    <p class="empty">no releases yet.</p>
  {:else}
    <ul>
      {#each releases as release}
        <li class="release">
          <div class="release-info">
            <span class="version">{release.version}</span>
            <span class="date">{release.date}</span>
            <span class="size">{release.size}</span>
          </div>
          <a href="/releases/{release.file}" download class="download-btn">
            download
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 32px 80px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  h1 {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    margin: 0 0 12px 0;
  }

  .description {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0 0 32px 0;
  }

  .empty {
    font-size: 13px;
    color: var(--text-muted);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .release {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    gap: 16px;
  }

  .release:first-child {
    border-top: 1px solid var(--border);
  }

  .release-info {
    display: flex;
    align-items: baseline;
    gap: 14px;
  }

  .version {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
  }

  .date {
    font-size: 11px;
    color: var(--text-muted);
  }

  .size {
    font-size: 11px;
    color: var(--text-muted);
  }

  .download-btn {
    font-size: 12px;
    color: #2a7dad;
    text-decoration: none;
    flex-shrink: 0;
  }

  .download-btn:hover { color: var(--link-hover); }
</style>
