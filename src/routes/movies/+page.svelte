<script>
  export let data;
  const { movies } = data;

  function starList(rating) {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) result.push('full');
      else if (rating >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return `${months[m-1]} ${d}, ${y}`;
  }
</script>

<svelte:head>
  <title>movies — James Han</title>
</svelte:head>

<div class="container">
  <h1>movies</h1>
  {#if movies.length === 0}
    <p class="empty">no reviews yet.</p>
  {:else}
    <ul>
      {#each movies as movie}
        <li class="movie">
          <div class="movie-inner">
            {#if movie.poster}
              <img src={movie.poster} alt={movie.title} class="poster" />
            {/if}
            <div class="movie-body">
              <div class="movie-header">
                <span class="movie-title">{movie.title}</span>
                <span class="movie-year">{movie.year}</span>
                <span class="movie-stars">
                  {#each starList(movie.rating) as type}
                    <span class="star star-{type}">★</span>
                  {/each}
                  <span class="rating-num">{movie.rating}</span>
                </span>
              </div>
              {#if movie.director}
                <div class="movie-director">dir. {movie.director}</div>
              {/if}
              {#if movie.reviewTitle}
                <div class="review-title">{movie.reviewTitle}</div>
              {/if}
              {#if movie.review}
                <div class="movie-review">{movie.review}</div>
              {/if}
              {#if movie.dateWatched}
                <div class="movie-date">watched {formatDate(movie.dateWatched)}</div>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 32px 80px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  h1 {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    margin: 0 0 32px 0;
  }

  .empty {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .movie {
    border-bottom: 1px solid var(--border);
    padding-bottom: 36px;
  }

  .movie:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .movie-inner {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .poster {
    width: 100px;
    flex-shrink: 0;
    border-radius: 4px;
    object-fit: cover;
    display: block;
  }

  .movie-body {
    flex: 1;
    min-width: 0;
  }

  .movie-header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 4px;
    flex-wrap: wrap;
  }

  .movie-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  .movie-year {
    font-size: 11px;
    color: var(--text-muted);
  }

  .movie-stars {
    letter-spacing: 1px;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .star {
    display: inline-block;
    position: relative;
    font-size: 18px;
    color: var(--border);
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
    margin-left: 6px;
  }

  .movie-director {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .review-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 8px;
  }

  .movie-review {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .movie-date {
    font-size: 11px;
    color: var(--text-muted);
    opacity: 0.7;
  }
</style>
