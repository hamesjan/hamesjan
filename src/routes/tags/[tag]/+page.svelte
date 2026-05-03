<script>
  export let data;
  const { tag, posts } = data;
</script>

<svelte:head>
  <title>#{tag} — James Han</title>
</svelte:head>

<div class="container">
  <a href="/tags" class="back">← tags</a>
  <h1>#{tag}</h1>
  <ul>
    {#each posts as post}
      <li>
        <span class="date">{post.date}</span>
        <a href="/blog/{post.slug}">{post.title}</a>
      </li>
    {:else}
      <li class="empty">no posts yet.</li>
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

  .back {
    font-size: 12px;
    color: var(--text-muted);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 20px;
  }

  .back:hover { color: var(--text); }

  h1 {
    font-size: 15px;
    font-weight: 500;
    color: #77d183;
    margin: 0 0 24px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  li {
    display: flex;
    align-items: baseline;
    gap: 14px;
    font-size: 13px;
  }

  .date {
    color: var(--text-muted);
    font-size: 11px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  li a {
    color: var(--text);
    text-decoration: none;
  }

  li a:hover { color: var(--link-hover); }

  .empty {
    color: var(--text-muted);
    font-size: 13px;
  }
</style>
