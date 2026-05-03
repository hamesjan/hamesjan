<svelte:head>
  <title>James Han</title>
</svelte:head>

<main>
  <div class="terminal" class:expanded on:click={() => expanded = !expanded} role="button" tabindex="0" on:keydown={e => e.key === 'Enter' && (expanded = !expanded)}>
    <div class="term-line">
      <span class="ps-user">james</span><span class="ps-at">@hamesjan</span><span class="ps-path"> ~/interests</span><span class="ps-chevron"> ❯ </span>{#if expanded}<span class="ps-cmd">ls</span>{:else}<span class="down-arrow">▾</span>{/if}
    </div>
    {#if expanded}
      <div class="ls-grid">
        {#each sorted as tag}
          <span class="ls-item" class:green={greenTags.has(tag)}>{tag}</span>
        {/each}
      </div>
      <div class="term-line">
        <span class="ps-user">james</span><span class="ps-at">@hamesjan</span><span class="ps-path"> ~/interests</span><span class="ps-chevron"> ❯ </span><span class="cursor">▋</span>
      </div>
    {/if}
  </div>

  <section class="posts">
    <p class="section-label">recent</p>
    {#each recent as post}
      <article class="preview">
        <div class="preview-meta">
          <a href="/blog/{post.slug}" class="preview-title">{post.title}</a>
          <span class="preview-date">{post.date}</span>
        </div>
        <div class="preview-body">{post.content}</div>
        <a href="/blog/{post.slug}" class="read-more">[ ... ]</a>
      </article>
    {/each}
  </section>
</main>

<script>
  import { posts } from '$lib/posts.js';

  let expanded = false;
  const greenTags = new Set(['engineering', 'live music', 'create', 'nature']);

  const sorted = [
    'fun', 'ocean', 'engineering', 'software', 'hardware', 'finance',
    'create', 'journal', 'linux', 'firmware', 'pcbs', 'skateboarding',
    'surfing', 'snowboarding', 'fishing', 'nature', 'looking at fish', 'reading',
    'cooking', 'piano', 'guitar', 'live music', 'biology', 'drawing',
    'coffee', 'bagels', 'kbbq', 'urban exploration', 'history'
  ].sort();

  const recent = [...posts]
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .slice(0, 8);
</script>

<style>
  main {
    padding: 24px 32px 64px;
    max-width: 680px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
  }

  /* ── terminal ── */

  .terminal {
    display: inline-block;
    background: #1a1a1a;
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    line-height: 1.5;
    cursor: pointer;
    user-select: none;
    transition: border-color 0.15s;
  }

  .terminal:not(.expanded):hover { border-color: #2a7dad; }

  .terminal.expanded {
    display: block;
    cursor: default;
  }

  .term-line { white-space: nowrap; }

  .ps-user    { color: #77d183; }
  .ps-at      { color: #6a6a6a; }
  .ps-path    { color: #5dade2; }
  .ps-chevron { color: #a3a3a3; }
  .ps-cmd     { color: #f2f2f2; padding-left: 6px; }

  .down-arrow {
    color: #a3a3a3;
    animation: blink 1.1s step-end infinite;
  }

  .ls-grid {
    columns: 3;
    column-gap: 8px;
    padding: 10px 0 12px;
  }

  .ls-item {
    display: block;
    color: #2a7dad;
    padding: 1px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ls-item.green { color: #77d183; }

  .cursor {
    color: #f2f2f2;
    animation: blink 1.1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* ── blog previews ── */

  .posts {
    margin-top: 48px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 20px 0;
  }

  .preview {
    margin-bottom: 36px;
  }

  .preview-meta {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 8px;
  }

  .preview-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
  }

  .preview-title:hover { color: var(--link-hover); }

  .preview-date {
    font-size: 11px;
    color: var(--text-muted);
  }

  .preview-body {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .read-more {
    font-size: 12px;
    color: #2a7dad;
    text-decoration: none;
  }

  .read-more:hover { color: var(--link-hover); }
</style>
