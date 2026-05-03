<svelte:head>
  <title>James Han</title>
</svelte:head>

<main>
  <p class="bio">hi! I'm a developer from California.</p>

  <section class="interests">
    <p class="section-label">interests</p>
    <div class="tags">
      {#each tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  </section>
</main>

<script>
  const tags = [
    'fun', 'ocean', 'engineering', 'software', 'hardware', 'finance',
    'create', 'journal', 'linux', 'firmware', 'pcbs', 'skateboarding',
    'surfing', 'snowboarding', 'fishing', 'looking at fish', 'reading',
    'cooking', 'piano', 'guitar', 'live music', 'biology', 'drawing',
    'coffee', 'bagels', 'kbbq', 'urban exploration', 'history'
  ];
</script>

<style>
  main {
    padding: 48px 32px;
    max-width: 680px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
  }

  .bio {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 15px;
    color: var(--text);
    margin: 0 0 40px 0;
  }

  .interests {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .section-label {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    text-transform: lowercase;
    margin: 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--text-muted);
    background: var(--tag-bg);
    border: 1px solid var(--tag-border);
    border-radius: 99px;
    padding: 3px 10px;
    white-space: nowrap;
  }
</style>
