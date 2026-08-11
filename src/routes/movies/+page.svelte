<script>
  export let data;
  const { movies } = data;

  let cards = [];
  let pushes = [];

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return `${months[m - 1]} ${d}, ${y}`;
  }

  function enter(i) {
    const pivot = cards[i]?.getBoundingClientRect();
    if (!pivot) return;
    const px = pivot.left + pivot.width / 2;
    const py = pivot.top + pivot.height / 2;

    pushes = cards.map((el, j) => {
      if (!el) return '';
      if (j === i) return 'scale(1.04)';
      const r = el.getBoundingClientRect();
      const dx = (r.left + r.width / 2) - px;
      const dy = (r.top + r.height / 2) - py;
      const d = Math.hypot(dx, dy) || 1;
      const amt = 22;
      return `translate(${(dx / d) * amt}px, ${(dy / d) * amt}px)`;
    });
  }

  function leave() {
    pushes = [];
  }
</script>

<svelte:head><title>movies — James Han</title></svelte:head>

<div class="container">
  <h1>movies</h1>
  {#if !movies.length}
    <p class="empty">no reviews yet.</p>
  {:else}
    <div class="bento">
      {#each movies as movie, i}
        <a
          href="/movies/{movie.id}"
          class="card"
          bind:this={cards[i]}
          on:mouseenter={() => enter(i)}
          on:mouseleave={leave}
          style:transform={pushes[i] || ''}
          style:z-index={pushes[i]?.startsWith('scale') ? 2 : ''}
        >
          {#if movie.poster}
            <img src={movie.poster} alt={movie.title} class="poster" />
          {:else}
            <div class="no-poster">{movie.title[0]}</div>
          {/if}
          <div class="info">
            {#if movie.dateWatched}
              <span class="date">{formatDate(movie.dateWatched)}</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 860px;
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

  .empty {
    font-size: 13px;
    color: var(--text-muted);
  }

  .bento {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  .card {
    position: relative;
    display: block;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    overflow: hidden;
    background: #1e1e1e;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .card:has(.poster):hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .no-poster {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: var(--text-muted);
  }

  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 14px 12px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .date {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.75);
  }
</style>
