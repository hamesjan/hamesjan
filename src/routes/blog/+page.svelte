<script>
  export let data;
  const sorted = [...data.posts].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
</script>

<svelte:head>
  <title>blog — James Han</title>
</svelte:head>

<div class="container">
  <h1>blog</h1>
  <ul>
    {#each sorted as post}
      <li>
        <span class="date">{post.date}</span>
        <a href="/blog/{post.slug}">{post.title}</a>
        <span class="tags">
          {#each post.tags as tag}
            <a href="/tags/{tag}" class="tag">{tag}</a>
          {/each}
        </span>
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

  li a:hover {
    color: var(--link-hover);
  }

  .tags {
    display: flex;
    gap: 6px;
    margin-left: auto;
  }

  .tag {
    font-size: 11px;
    color: #2a7dad !important;
  }
</style>
