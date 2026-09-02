<script>
  const entries = [
    {
      date: 'April 13, 2025',
      note: 'Some fishermeisters',
      photos: [
        { src: '/imgs/fish/fish9_1.webp', w: 1200, h: 900 },
        { src: '/imgs/fish/fish9_2.webp', w: 1200, h: 900 },
        { src: '/imgs/fish/fish9_3.webp', w: 1200, h: 900 }
      ]
    },
    {
      date: 'Mar 12, 2025',
      note: 'Beautiful spotty at Shelter.',
      photos: [{ src: '/imgs/fish/fish8.webp', w: 1200, h: 900 }]
    },
    {
      date: 'Feb 16, 2025',
      note: 'Smelt and Sculpin. Shelter island.',
      photos: [
        { src: '/imgs/fish/fish5.webp', w: 1200, h: 900 },
        { src: '/imgs/fish/fish7.webp', w: 1200, h: 900 }
      ]
    },
    {
      date: 'Feb 9, 2025',
      note: 'Tiny Spotty at shelter island.',
      photos: [{ src: '/imgs/fish/fish6.webp', w: 1200, h: 1600 }]
    },
    {
      date: 'Feb 8, 2025',
      note: 'Little octopus at Shelter Island. Was super surprised by this one.',
      photos: [{ src: '/imgs/fish/fish4.webp', w: 1200, h: 675 }]
    },
    {
      date: 'Feb 2, 2025',
      note: 'Yellowfin Croaker at Scripps.',
      photos: [{ src: '/imgs/fish/fish3.webp', w: 1170, h: 2048 }]
    },
    {
      date: 'Jan 25, 2025',
      note: 'Rainbow Trout at Dixon lake. Delicious little thing.',
      photos: [{ src: '/imgs/fish/fish2.webp', w: 1200, h: 900 }]
    },
    {
      date: 'Dec 23, 2024',
      note: 'My first ever fish. Spanish Mackerel at Redondo Pier. Used Sabiki with squid.',
      photos: [{ src: '/imgs/fish/fish1.webp', w: 1200, h: 900 }]
    }
  ];
</script>

<svelte:head>
  <title>Fish — James Han</title>
</svelte:head>

<main>
  <a href="/portfolio" class="back">← back</a>

  <p class="section-label">fish</p>
  <p class="body intro">A running log of everything I've pulled out of the water.</p>

  {#each entries as e (e.date)}
    <article class="entry">
      <div class="meta">
        <span class="date">{e.date}</span>
      </div>
      <p class="body">{e.note}</p>
      <div class="photos">
        {#each e.photos as ph (ph.src)}
          <a href={ph.src} target="_blank" rel="noopener noreferrer">
            <img
              src={ph.src}
              alt="{e.date} — {e.note}"
              width={ph.w}
              height={ph.h}
              loading="lazy"
              decoding="async"
            />
          </a>
        {/each}
      </div>
    </article>
  {/each}
</main>

<style>
  main {
    padding: 24px 32px 64px;
    max-width: 680px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
  }

  .back {
    display: inline-block;
    font-size: 12px;
    color: #2a7dad;
    text-decoration: none;
    margin-bottom: 28px;
  }

  .back:hover { color: var(--link-hover); }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 12px 0;
  }

  .intro { margin: 0 0 36px; }

  .entry { margin-bottom: 36px; }

  .meta { margin-bottom: 4px; }

  .date {
    font-size: 11px;
    color: var(--text-muted);
  }

  /* shared body copy — matches the blog previews on the homepage */
  .body {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0 0 10px;
  }

  .photos {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .photos img {
    display: block;
    width: 150px;
    height: 190px;
    object-fit: cover;
    border-radius: 2px;
  }

  @media (max-width: 560px) {
    main { padding: 20px 20px 56px; }
  }
</style>
