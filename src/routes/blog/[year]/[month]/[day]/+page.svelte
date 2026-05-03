<script>
  export let data;
  const { post } = data;
  const paragraphs = post.content.split('\n\n');
</script>

<svelte:head>
  <title>{post.title} — James Han</title>
</svelte:head>

<article>
  <header>
    <a href="/blog" class="back">← blog</a>
    <h1>{post.title}</h1>
    <div class="meta">
      <span class="date">{post.date}</span>
      <span class="tags">
        {#each post.tags as tag}
          <a href="/tags/{tag}" class="tag">{tag}</a>
        {/each}
      </span>
    </div>
  </header>

  <div class="content">
    {#each paragraphs as p}
      <p>{p}</p>
    {/each}
  </div>
</article>

<style>
  article {
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 32px 80px;
  }

  header {
    margin-bottom: 32px;
  }

  .back {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--text-muted);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 20px;
  }

  .back:hover {
    color: var(--text);
  }

  h1 {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 18px;
    font-weight: 500;
    color: var(--text);
    margin: 0 0 10px 0;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
  }

  .date {
    color: var(--text-muted);
  }

  .tags {
    display: flex;
    gap: 6px;
  }

  .tag {
    color: #2a7dad;
    text-decoration: none;
  }

  .tag:hover {
    color: var(--link-hover);
  }

  .content p {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: var(--text);
    margin: 0 0 20px 0;
  }
</style>
