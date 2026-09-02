<script>
  // Each project renders as a "canvas". `media` is either a still (webp) or a
  // looping clip (mp4, converted from the original demo gifs).
  const projects = [
    {
      n: '01',
      accent: 'red',
      media: { type: 'img', src: '/imgs/dothink.webp', w: 800, h: 408 },
      title: 'dothink.ai',
      href: 'https://dothink.ai',
      tech: 'hehe',
      date: 'Sept 2025',
      body: 'I made an app to turn your thoughts into an interactive mindmap. Explore questions, answers, and insights like never before.'
    },
    {
      n: '02',
      accent: 'cobalt',
      media: { type: 'img', src: '/imgs/cloudart.webp', w: 800, h: 386 },
      title: 'Cloudart.io',
      href: 'https://cloudart.io',
      tech: 'Three.js, Firebase, HTML/JS/CSS',
      date: 'Aug 2025',
      body: "It's always fun looking at clouds and imagining shapes/art in the sky. I made cloudart.io as a little web app to allow players to draw shapes in the sky with smoke and view from below."
    },
    {
      n: '03',
      accent: 'yellow',
      media: { type: 'img', src: '/imgs/myes.webp', w: 142, h: 128 },
      title: 'MyEmbeddedSystems',
      href: 'https://myembeddedsystems.com',
      tech: 'WordPress, PHP, ChatGPT API',
      date: 'May 2025',
      body: 'I wanted to start an embedded system blog so I can test agentic content creation capabilities.'
    },
    {
      n: '04',
      accent: 'red',
      media: { type: 'img', src: '/imgs/surfvision.webp', w: 800, h: 1067 },
      title: 'Surfvision',
      tech: 'C, C++, OpenCV, RaspberryPi 5',
      date: 'Jan 2025 – Present',
      body: 'Based on surfen, I applied the computer vision algorithm for tracking a moving surfer to an embedded system with a 2 DOF tracking robot.'
    },
    {
      n: '05',
      accent: 'cobalt',
      media: { type: 'img', src: '/imgs/processorpaper.webp', w: 800, h: 297 },
      title: 'Optimized MIPS Processor',
      tech: 'System Verilog, C++, Verilator, gtkWave, Docker',
      date: 'Jan 2025 – Mar 2025',
      extra: {
        label: 'Academic Paper',
        href: 'https://docs.google.com/document/d/1jT_bwGmo-XIpRoUJqOx4tKO1KzYpKX8RqkCzjB_8o48/edit?usp=sharing'
      },
      body: 'Implemented four optimizations to the classical Hennessy & Patterson 5-Stage Processor. Reduced CPI for all benchmarks. Implemented instruction cache next-line prefetching, data cache stride prefetching with stream buffers, branch prediction with global pattern tracking and fetch-stage branch target buffer, and two-way superscalar processing.'
    },
    {
      n: '06',
      accent: 'yellow',
      media: { type: 'video', src: '/imgs/drone.mp4', w: 400, h: 224 },
      title: 'Drone',
      tech: 'ATMega128rfa, Autodesk Fusion, Arduino',
      date: 'Sept 2024 – Dec 2024',
      body: 'Created a drone from scratch, from PCB design to the air. Implemented PID tuning for motor actuation.'
    },
    {
      n: '07',
      accent: 'red',
      media: { type: 'video', src: '/imgs/tritondemo.mp4', w: 516, h: 514 },
      title: 'Tri-tone',
      href: 'https://hamesjan.github.io/tritone_website/',
      tech: 'ESP32-S3, Teensy3.6, Adafruit RGB Matrix, OnShape, C++, Python',
      date: 'Apr 2024 – June 2024',
      extra: { label: 'Demo video', href: 'https://www.youtube.com/embed/3uRzH58n3Qw' },
      body: 'Processes audio into 1024 bin FFT data and then sends to a pre-trained ML model for RGB inferencing and real-time color prediction based on current dominant frequency and musical context (10 previous dominant frequencies).'
    },
    {
      n: '08',
      accent: 'cobalt',
      media: { type: 'video', src: '/imgs/pokefy.mp4', w: 400, h: 222 },
      title: 'Pokefy',
      href: 'https://pokefy.web.app',
      tech: 'React.js, Firebase, ChatGPT API, Spotify API',
      date: 'Apr 2024 – June 2024',
      body: 'Uses LLM to generate 6 Pokémon based on Spotify Music taste. Pending approval to use Spotify API.'
    },
    {
      n: '09',
      accent: 'yellow',
      media: { type: 'video', src: '/imgs/out.mp4', w: 350, h: 350 },
      title: 'Surfen',
      href: 'https://surfen.web.app',
      tech: 'React.js, OpenCV, Numpy, Firebase, Flask, Tailwind, PythonAnywhere',
      date: 'May 2023 – August 2023',
      extra: { label: 'surfen.web.app', href: 'https://surfen.web.app' },
      body: 'Web application that acts as a video enhancer/converter that takes a far-away video input stream of surfers at a local beach and zooms in and enhances the surfer as they rip the wave.'
    },
    {
      n: '10',
      accent: 'red',
      media: { type: 'img', src: '/imgs/plots.webp', w: 800, h: 797 },
      title: 'plots — party with your homies (iOS)',
      href: 'https://apps.apple.com/us/app/plots-party-with-your-homies/id1579989678',
      tech: 'Flutter, Firebase, Dart, Node.js, GCP',
      date: 'August 2021 – February 2022',
      badge: 'Acquired for $10,000',
      body: 'App features: event discovery, guest monitoring, dynamic ticketing system, host-guest messaging, party group chats, security management, locational notification system, and announcements.'
    }
  ];
</script>

<svelte:head>
  <title>James Han — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Permanent+Marker&display=swap"
  />
</svelte:head>

<!-- Monet: two slow-drifting washes of broken colour, sitting under everything -->
<div class="wash" aria-hidden="true"></div>
<div class="brush" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<div class="page">
  <header class="hero">
    <div class="hero-text">
      <!-- Basquiat's crown -->
      <svg class="crown" viewBox="0 0 120 46" aria-hidden="true">
        <path
          d="M5 41 C 9 27, 12 14, 16 6 C 25 18, 32 27, 38 30 C 44 22, 52 10, 60 3 C 68 11, 76 23, 82 30 C 88 26, 95 17, 104 5 C 108 15, 112 28, 116 41 C 80 36, 40 36, 5 41 Z"
        />
      </svg>

      <h1 class="name">James Han</h1>
      <div class="rule" aria-hidden="true">
        <svg viewBox="0 0 420 16" preserveAspectRatio="none">
          <path d="M3 10 C 70 3, 140 14, 208 7 C 276 1, 350 13, 417 6" />
        </svg>
      </div>

      <p>
        I grew up in the sunny streets of Torrance, California. I love the ocean, my dog,
        and eating yummy foods. For work, I have interned at
        <a href="https://www.mobis.com/en/index.do">Hyundai Mobis</a> in Seoul, South Korea
        and I help with the <a href="https://www.raytechx.com/">family business</a> from time
        to time. I just finished up an internship working on firmware platforms for
        <a href="https://www.tesla.com">Tesla</a>. I'm going back in Jan 2027!
      </p>

      <nav class="links">
        <a href="mailto:james1023417@gmail.com">Email</a>
        <a href="/JamesHanResume.pdf">Resume</a>
        <a href="/bio.txt">Bio</a>
        <a href="https://github.com/hamesjan/">Github</a>
        <a href="https://www.instagram.com/hamesjan/">Insta</a>
        <a href="/portfolio/fish" class="fish">Fish</a>
      </nav>
    </div>

    <div class="hero-portrait">
      <span class="portrait-ring" aria-hidden="true"></span>
      <img
        src="/imgs/mugshot.webp"
        alt="James Han"
        width="900"
        height="1117"
        fetchpriority="high"
        decoding="async"
      />
      <span class="portrait-note" aria-hidden="true">Torrance, CA</span>
    </div>
  </header>

  <h2 class="section">
    Projects
    <span class="section-rule" aria-hidden="true">
      <svg viewBox="0 0 300 14" preserveAspectRatio="none">
        <path d="M2 8 C 55 2, 105 12, 158 6 C 210 1, 252 11, 298 5" />
      </svg>
    </span>
  </h2>

  <p class="section-blurb">
    I'm passionate about computer architecture, embedded systems for global applications, and
    system design. I enjoy developing for local businesses and collaborating with small teams to
    bring ideas to market. I also bring significant experience as a full-stack web and mobile
    developer. My goal is to be able to think of any idea, physical or digital, and have the
    technical and organizational ability to create it from start to finish.
  </p>

  <div class="works">
    {#each projects as p (p.n)}
      <article class="work accent-{p.accent}">
        <span class="work-n" aria-hidden="true">{p.n}</span>

        <!-- cap at the asset's natural width so small logos aren't upscaled -->
        <div class="work-media" style="max-width: {p.media.w}px">
          {#if p.media.type === 'video'}
            <video
              src={p.media.src}
              width={p.media.w}
              height={p.media.h}
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
              aria-label="{p.title} demo"
            ></video>
          {:else}
            <img
              src={p.media.src}
              alt={p.title}
              width={p.media.w}
              height={p.media.h}
              loading="lazy"
              decoding="async"
            />
          {/if}
        </div>

        <div class="work-body">
          <h3>
            {#if p.href}
              <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}</a>
            {:else}
              {p.title}
            {/if}
          </h3>

          {#if p.tech}<p class="tech">{p.tech}</p>{/if}
          <p class="date">{p.date}</p>

          {#if p.badge}<p class="badge">{p.badge}</p>{/if}

          <p class="desc">{p.body}</p>

          {#if p.extra}
            <a class="extra" href={p.extra.href} target="_blank" rel="noopener noreferrer">
              {p.extra.label} <span aria-hidden="true">↗</span>
            </a>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  /* ── palette ──────────────────────────────────────────────────────────
     Light: Monet's Giverny — paper, lily blue, lavender, pond sage, rose.
     Dark:  the same pond after sunset. Basquiat's marks sit on top of both. */
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
    --card: rgba(255, 253, 247, 0.5);
    --card-edge: rgba(23, 20, 15, 0.82);

    --red: #cf3a22;
    --cobalt: #2049c4;
    --yellow: #e8b32c;
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
    --card: rgba(255, 255, 255, 0.045);
    --card-edge: rgba(243, 236, 224, 0.42);

    --red: #f2593a;
    --cobalt: #6b93ff;
    --yellow: #f5c451;
    --grain-opacity: 0.2;
    --grain-blend: overlay;
    --brush-opacity: 0.3;
  }

  /* ── the painted ground ───────────────────────────────────────────── */
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
    /* a second, slower layer so the light never quite repeats. In dark mode it
       screens over the first, so overlaps read as light on water, not mud. */
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

  @keyframes drift {
    from { transform: translate3d(-1.5%, -1%, 0) scale(1.04); }
    to   { transform: translate3d(2%, 1.5%, 0) scale(1.1); }
  }
  @keyframes drift-b {
    from { transform: translate3d(2%, 1%, 0) scale(1.08) rotate(-1.5deg); }
    to   { transform: translate3d(-2%, -1.5%, 0) scale(1.02) rotate(1.5deg); }
  }

  /* canvas tooth */

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

  @media (prefers-reduced-motion: reduce) {
    .wash,
    .wash::after { animation: none; }
  }

  /* ── page frame ───────────────────────────────────────────────────── */
  .page {
    position: relative;
    max-width: 940px;
    margin: 0 auto;
    padding: 56px 28px 120px;
    color: var(--ink);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    line-height: 1.62;
  }

  /* app.css sets `p, a { font-family: Lato; font-size: 14px }` on the bare
     elements, which beats inheritance from .page — restate it here. Every
     rule below is qualified with .page so it outranks this reset. */
  .page p,
  .page a,
  .page h1,
  .page h2,
  .page h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
  }

  .page :global(a) {
    color: inherit;
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 100%;
    padding-bottom: 1px;
    transition: color 0.18s, background-size 0.18s;
  }
  .page :global(a:hover) {
    color: var(--red);
  }

  /* ── hero ─────────────────────────────────────────────────────────── */
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 260px;
    gap: 48px;
    align-items: start;
    margin-bottom: 96px;
  }

  .page .crown {
    width: 86px;
    height: 34px;
    display: block;
    margin-bottom: 6px;
    fill: var(--yellow);
    stroke: var(--ink-line);
    stroke-width: 2.4;
    stroke-linejoin: round;
    transform: rotate(-3deg);
  }

  .page .name {
    font-family: 'Permanent Marker', 'Cormorant Garamond', cursive;
    font-size: clamp(46px, 8vw, 78px);
    line-height: 0.96;
    letter-spacing: -0.01em;
    margin: 0 0 10px;
    color: var(--ink);
  }

  .page .tagline {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin: 0 0 18px;
  }

  /* "I cross out words so you will see them more" */
  .page .struck {
    position: relative;
    color: var(--ink-soft);
  }
  .page .struck::after {
    content: '';
    position: absolute;
    left: -3px;
    right: -3px;
    top: 52%;
    height: 2px;
    background: var(--red);
    transform: rotate(-2.4deg);
  }

  .page .rule {
    margin: 0 0 22px;
    max-width: 420px;
  }
  .page .rule svg,
  .page .section-rule svg {
    display: block;
    width: 100%;
    height: 14px;
    fill: none;
    stroke: var(--ink-line);
    stroke-width: 3.5;
    stroke-linecap: round;
  }

  .page .hero-text p {
    margin: 0 0 16px;
    max-width: 60ch;
  }

  .page .links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 10px;
    margin-top: 26px;
  }
  .page .links :global(a) {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 12px;
    background-image: none;
    border: 1.5px solid var(--card-edge);
    border-radius: 2px;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }
  .page .links :global(a:hover) {
    background: var(--ink);
    color: var(--paper);
    transform: translateY(-2px) rotate(-1deg);
  }
  .page .links :global(a.fish) {
    border-color: var(--cobalt);
    color: var(--cobalt);
  }
  .page .links :global(a.fish:hover) {
    background: var(--cobalt);
    color: var(--paper);
  }

  /* portrait — an organic, painted edge rather than a perfect circle */
  .hero-portrait {
    position: relative;
    padding-top: 12px;
  }
  .hero-portrait img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 49% 51% 44% 56% / 53% 46% 54% 47%;
    filter: saturate(1.06) contrast(1.03);
    position: relative;
    z-index: 1;
  }
  .portrait-ring {
    position: absolute;
    inset: 4px -8px -8px 4px;
    border: 2.5px solid var(--ink-line);
    border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
    transform: rotate(2deg);
  }
  .page .portrait-note {
    display: block;
    margin-top: 14px;
    text-align: center;
    font-family: 'Permanent Marker', cursive;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    transform: rotate(-1.5deg);
  }

  /* ── section heading ──────────────────────────────────────────────── */
  .page .section {
    font-family: 'Permanent Marker', cursive;
    font-size: 30px;
    margin: 0 0 4px;
    display: inline-block;
    position: relative;
  }
  .page .section-rule {
    display: block;
    width: 100%;
    margin-top: 2px;
  }

  .page .section-blurb {
    max-width: 62ch;
    margin: 14px 0 44px;
    font-style: italic;
    color: var(--ink-soft);
  }

  /* ── works ────────────────────────────────────────────────────────── */
  .works {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  .work {
    --accent: var(--red);
    position: relative;
    display: grid;
    grid-template-columns: 216px minmax(0, 1fr);
    gap: 28px;
    align-items: center;
    padding: 22px 24px 22px 26px;
    background: var(--card);
    border: 1.5px solid var(--card-edge);
    border-radius: 3px;
    backdrop-filter: blur(6px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .work::before {
    /* the accent bar — a stripe of raw pigment down the left edge */
    content: '';
    position: absolute;
    left: -1.5px;
    top: 16px;
    bottom: 16px;
    width: 5px;
    background: var(--accent);
    border-radius: 2px;
  }
  .work:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16);
  }

  .accent-red { --accent: var(--red); }
  .accent-cobalt { --accent: var(--cobalt); }
  .accent-yellow { --accent: var(--yellow); }

  .page .work-n {
    position: absolute;
    top: 10px;
    right: 14px;
    font-family: 'Permanent Marker', cursive;
    font-size: 15px;
    color: var(--accent);
    opacity: 0.75;
  }

  .work-media {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  }
  .work-media img,
  .work-media video {
    display: block;
    width: 100%;
    height: auto;
    max-height: 230px;
    object-fit: contain;
    border-radius: 2px;
  }

  .page .work-body h3 {
    margin: 0 0 6px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 25px;
    font-weight: 600;
    line-height: 1.2;
  }

  /* the font reset above also hits an <a> nested in the heading, which would
     shrink linked titles to 18px — keep them at the heading's size */
  .page .work-body h3 :global(a) {
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }

  .page .tech {
    margin: 0 0 3px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.05em;
    color: var(--ink-soft);
  }
  .page .date {
    margin: 0 0 10px;
    font-style: italic;
    font-size: 15px;
    color: var(--ink-soft);
  }
  .page .desc {
    margin: 0;
    max-width: 58ch;
  }
  .page .badge {
    display: inline-block;
    margin: 0 0 10px;
    padding: 3px 9px;
    font-family: 'Permanent Marker', cursive;
    font-size: 12px;
    color: var(--paper);
    background: var(--accent);
    transform: rotate(-1.2deg);
  }
  .page .extra {
    display: inline-block;
    margin-top: 10px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--accent) !important;
  }

  /* ── responsive ───────────────────────────────────────────────────── */
  @media (max-width: 780px) {
    .page { padding: 36px 20px 90px; }
    .hero {
      grid-template-columns: 1fr;
      gap: 34px;
      margin-bottom: 64px;
    }
    .hero-portrait {
      order: -1;
      max-width: 210px;
    }
    .work {
      grid-template-columns: 1fr;
      gap: 18px;
    }
    .work-media img,
    .work-media video { max-height: 260px; }
    .work-n { top: 8px; right: 12px; }
  }
</style>
