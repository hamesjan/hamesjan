<script>
  export let data;
  const { movie } = data;

  function starList(rating) {
    return Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return 'full';
      if (rating >= i + 0.5) return 'half';
      return 'empty';
    });
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return `${months[m - 1]} ${d}, ${y}`;
  }
</script>

<svelte:head><title>{movie.title} — James Han</title></svelte:head>

<div class="container">
  <a href="/movies" class="back">← movies</a>

  <div class="movie">
    {#if movie.poster}
      <img src={movie.poster} alt={movie.title} class="poster" />
    {/if}

    <div class="body">
      <div class="header">
        <h1>{movie.title}</h1>
        <span class="year">{movie.year}</span>
      </div>

      <div class="meta-row">
        <div class="stars">
          {#each starList(movie.rating) as type}
            <span class="star star-{type}">★</span>
          {/each}
          <span class="rating-num">{movie.rating}</span>
        </div>
        {#if movie.dateWatched}
          <span class="watched">watched {formatDate(movie.dateWatched)}</span>
        {/if}
      </div>

      {#if movie.director}
        <div class="director">dir. {movie.director}</div>
      {/if}

      {#if movie.reviewTitle}
        <div class="review-title">{movie.reviewTitle}</div>
      {/if}

      {#if movie.review}
        <div class="review">{movie.review}</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 32px 80px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  .back {
    font-size: 12px;
    color: var(--text-muted);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 32px;
  }

  .back:hover { color: var(--text); }

  .movie {
    display: flex;
    gap: 28px;
    align-items: flex-start;
  }

  .poster {
    width: 140px;
    flex-shrink: 0;
    border-radius: 6px;
    object-fit: cover;
    display: block;
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    margin: 0;
  }

  .year {
    font-size: 12px;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 6px;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 2px;
    letter-spacing: 1px;
  }

  .star {
    font-size: 16px;
    color: var(--border);
    position: relative;
  }

  .star-full { color: #e5b84a; }

  .star-half::after {
    content: '★';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    overflow: hidden;
    color: #e5b84a;
    pointer-events: none;
  }

  .rating-num {
    font-size: 11px;
    color: var(--text-muted);
    margin-left: 4px;
  }

  .watched {
    font-size: 11px;
    color: var(--text-muted);
  }

  .director {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .review-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 10px;
  }

  .review {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.75;
    color: var(--text-muted);
    white-space: pre-wrap;
  }
</style>
