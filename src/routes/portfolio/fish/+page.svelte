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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Permanent+Marker&display=swap"
  />
</svelte:head>

<div class="wash" aria-hidden="true"></div>
<div class="brush" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<div class="page">
  <a href="/portfolio" class="back">← Back</a>

  <h1>
    Fish
    <span class="rule" aria-hidden="true">
      <svg viewBox="0 0 180 14" preserveAspectRatio="none">
        <path d="M2 8 C 38 2, 70 12, 104 6 C 136 1, 156 11, 178 5" />
      </svg>
    </span>
  </h1>
  <p class="blurb">A running log of everything I've pulled out of the water.</p>

  {#each entries as e (e.date)}
    <section class="entry">
      <h2>{e.date}</h2>
      <p class="note">{e.note}</p>
      <div class="photos">
        {#each e.photos as ph (ph.src)}
          <a href={ph.src} class="shot" target="_blank" rel="noopener noreferrer">
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
    </section>
  {/each}
</div>

<style>
  .page,
  .wash {
    --paper: #f2eee4;
    --w1: rgba(112, 163, 212, 0.66);
    --w2: rgba(172, 150, 206, 0.6);
    --w3: rgba(140, 180, 142, 0.56);
    --w4: rgba(233, 176, 170, 0.58);
    --w5: rgba(230, 194, 128, 0.46);
    --ink: #17140f;
    --ink-soft: rgba(23, 20, 15, 0.62);
    --ink-line: rgba(23, 20, 15, 0.9);
    --edge: rgba(23, 20, 15, 0.82);
    --cobalt: #2049c4;
    --grain-opacity: 0.18;
    --grain-blend: multiply;
    --brush-opacity: 0.22;
    --wash-blend: normal;
    --wash-saturate: 126%;
  }

  :global([data-theme='dark']) .page,
  :global([data-theme='dark']) .wash {
    --paper: #11131a;
    --w1: rgba(46, 118, 178, 0.72);
    --w2: rgba(102, 71, 158, 0.66);
    --w3: rgba(38, 116, 100, 0.6);
    --w4: rgba(168, 71, 88, 0.52);
    --w5: rgba(178, 132, 52, 0.44);
    --wash-blend: screen;
    --wash-saturate: 138%;
    --ink: #f3ece0;
    --ink-soft: rgba(243, 236, 224, 0.62);
    --ink-line: rgba(243, 236, 224, 0.85);
    --edge: rgba(243, 236, 224, 0.42);
    --cobalt: #6b93ff;
    --grain-opacity: 0.2;
    --grain-blend: overlay;
    --brush-opacity: 0.3;
  }

  .wash {
    position: fixed;
    inset: -20%;
    z-index: -1;
    background-color: var(--paper);
    background-image:
      radial-gradient(ellipse 46% 38% at 14% 18%, var(--w1), transparent 64%),
      radial-gradient(ellipse 40% 34% at 86% 10%, var(--w2), transparent 62%),
      radial-gradient(ellipse 48% 40% at 78% 68%, var(--w3), transparent 64%),
      radial-gradient(ellipse 42% 36% at 20% 84%, var(--w4), transparent 62%),
      radial-gradient(ellipse 36% 30% at 52% 46%, var(--w5), transparent 66%);
    filter: blur(10px) saturate(var(--wash-saturate));
    animation: drift 48s ease-in-out infinite alternate;
  }

  .wash::after {
    content: '';
    position: absolute;
    inset: 0;
    mix-blend-mode: var(--wash-blend);
    background-image:
      radial-gradient(ellipse 38% 32% at 68% 26%, var(--w2), transparent 66%),
      radial-gradient(ellipse 44% 34% at 30% 58%, var(--w1), transparent 64%),
      radial-gradient(ellipse 30% 26% at 46% 84%, var(--w3), transparent 66%),
      radial-gradient(ellipse 34% 28% at 90% 88%, var(--w5), transparent 66%);
    animation: drift-b 71s ease-in-out infinite alternate;
  }

  @keyframes drift-b {
    from { transform: translate3d(2%, 1%, 0) scale(1.08) rotate(-1.5deg); }
    to   { transform: translate3d(-2%, -1.5%, 0) scale(1.02) rotate(1.5deg); }
  }

  @keyframes drift {
    from { transform: translate3d(-1.5%, -1%, 0) scale(1.04); }
    to   { transform: translate3d(2%, 1.5%, 0) scale(1.1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .wash,
    .wash::after { animation: none; }
  }


  /* coarse mottling: Monet's broken colour, so the wash reads as brushwork
     rather than a smooth airbrush gradient */
  .brush {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: var(--brush-opacity);
    mix-blend-mode: soft-light;
    background-size: 760px 760px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='760' height='760'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.011' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='760' height='760' filter='url(%23b)'/%3E%3C/svg%3E");
  }

  .grain {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: var(--grain-opacity);
    mix-blend-mode: var(--grain-blend);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  }

  .page {
    position: relative;
    max-width: 940px;
    margin: 0 auto;
    padding: 48px 28px 110px;
    color: var(--ink);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    line-height: 1.6;
  }

  /* app.css sets `p, a { font-family: Lato; font-size: 14px }` on the bare
     elements, which beats inheritance from .page — restate it here. Every
     rule below is qualified with .page so it outranks this reset. */
  .page p,
  .page a,
  .page h1,
  .page h2 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
  }

  .page .back {
    display: inline-block;
    margin-bottom: 30px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
    text-decoration: none;
    padding: 6px 12px;
    border: 1.5px solid var(--edge);
    border-radius: 2px;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }
  .page .back:hover {
    background: var(--ink);
    color: var(--paper);
    transform: translateY(-2px) rotate(-1deg);
  }

  .page h1 {
    font-family: 'Permanent Marker', cursive;
    font-size: 40px;
    margin: 0 0 6px;
    display: inline-block;
    color: var(--ink);
  }
  .page .rule {
    display: block;
    width: 100%;
    margin-top: 2px;
  }
  .page .rule svg {
    display: block;
    width: 100%;
    height: 13px;
    fill: none;
    stroke: var(--ink-line);
    stroke-width: 3.5;
    stroke-linecap: round;
  }

  .page .blurb {
    margin: 12px 0 48px;
    font-style: italic;
    color: var(--ink-soft);
  }

  .page .entry {
    margin-bottom: 52px;
  }

  .page .entry h2 {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cobalt);
    margin: 0 0 4px;
  }

  .page .note {
    margin: 0 0 14px;
    font-size: 19px;
  }

  .page .photos {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .page .shot {
    display: block;
    line-height: 0;
    border: 1.5px solid var(--edge);
    border-radius: 2px;
    padding: 6px;
    background: rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .page .shot:hover {
    transform: translateY(-3px) rotate(-0.6deg);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2);
  }

  .page .shot img {
    display: block;
    width: 300px;
    height: 380px;
    object-fit: cover;
    border-radius: 1px;
  }

  @media (max-width: 780px) {
    .page { padding: 32px 20px 80px; }
    .page h1 { font-size: 32px; }
    .page .photos { gap: 12px; }
    .page .shot img {
      width: min(100%, 300px);
      height: auto;
      aspect-ratio: 3 / 4;
    }
  }
</style>
