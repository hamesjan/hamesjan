<script>
  export let data;
  const { post } = data;

  function parseContent(content) {
    const segments = [];
    const parts = content.split('```');
    parts.forEach((part, i) => {
      if (i % 2 === 0) {
        part.split('\n\n').filter(p => p.trim()).forEach(p => {
          segments.push({ type: 'paragraph', text: p.trim() });
        });
      } else {
        const nl = part.indexOf('\n');
        const lang = nl > 0 ? part.slice(0, nl).trim() : '';
        const code = nl > 0 ? part.slice(nl + 1) : part;
        segments.push({ type: 'code', lang, text: code.replace(/\n$/, '') });
      }
    });
    return segments;
  }

  const segments = parseContent(post.content);

  function renderParagraph(text) {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="post-img">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }
</script>

<svelte:head>
  <title>{post.title} — James Han</title>
</svelte:head>

<article>
  <header>
    <a href="/blog" class="back">← blog</a>
    {#if post.image}
      <img src={post.image} alt="" class="cover-img" />
    {/if}
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
    {#each segments as seg}
      {#if seg.type === 'code'}
        <pre class="code-block"><code>{seg.text}</code></pre>
      {:else}
        <p>{@html renderParagraph(seg.text)}</p>
      {/if}
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

  .code-block {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 16px 18px;
    overflow-x: auto;
    margin: 0 0 20px 0;
    line-height: 1.65;
    color: var(--text);
    white-space: pre;
  }

  .code-block code {
    font-family: inherit;
    font-size: inherit;
  }

  .cover-img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 24px;
    display: block;
  }

  .content :global(.post-img) {
    max-width: 100%;
    border-radius: 6px;
    display: block;
    margin: 8px 0 12px;
  }
</style>
