<script>
  export let data;
  const tags = data.tags;
</script>

<svelte:head>
  <title>tags — James Han</title>
</svelte:head>

<div class="container">
  <h1>tags</h1>
  <ul>
    {#each tags as { tag, count }}
      <li>
        <a href="/tags/{tag}" class="tag-link">#{tag}</a>
        <span class="count">{count}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 32px 80px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  h1 {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    margin: 0 0 28px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  }

  .tag-link {
    color: #2a7dad;
    text-decoration: none;
  }

  .tag-link:hover { color: var(--link-hover); }

  .count {
    color: var(--text-muted);
    font-size: 11px;
  }
</style>
