<script>
  // media is either a still (webp) or a looping clip (mp4, converted from the
  // original demo gifs)
  const projects = [
    {
      media: { type: 'img', src: '/imgs/triproutemap.webp', w: 800, h: 630 },
      title: 'triproutemap.com',
      href: 'https://triproutemap.com',
      tech: 'SvelteKit',
      body: 'This tool helps you plan the most efficient route for a trip and gives you a rough estimate of the cost. Use it for your solo traveling dreams.'
    },
    {
      media: { type: 'img', src: '/imgs/dothink.webp', w: 800, h: 408 },
      title: 'dothink.ai',
      href: 'https://dothink.ai',
      tech: 'React.js + JS + EC2',
      date: 'Sept 2025',
      body: 'I made an app to turn your thoughts into an interactive mindmap. Explore questions, answers, and insights like never before.'
    },
    {
      media: { type: 'img', src: '/imgs/cloudart.webp', w: 800, h: 386 },
      title: 'Cloudart.io',
      href: 'https://cloudart.io',
      tech: 'Three.js, Firebase, HTML/JS/CSS',
      date: 'Aug 2025',
      body: "It's always fun looking at clouds and imagining shapes/art in the sky. I made cloudart.io as a little web app to allow players to draw shapes in the sky with smoke and view from below."
    },
    {
      media: { type: 'img', src: '/imgs/myes.webp', w: 142, h: 128 },
      title: 'MyEmbeddedSystems',
      href: 'https://myembeddedsystems.com',
      tech: 'WordPress, PHP, ChatGPT API',
      date: 'May 2025',
      body: 'I wanted to start an embedded system blog so I can test agentic content creation capabilities.'
    },
    {
      media: { type: 'img', src: '/imgs/surfvision.webp', w: 800, h: 1067 },
      title: 'Surfvision',
      tech: 'C, C++, OpenCV, RaspberryPi 5',
      date: 'Jan 2025 – Present',
      body: 'Based on surfen, I applied the computer vision algorithm for tracking a moving surfer to an embedded system with a 2 DOF tracking robot.'
    },
    {
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
      media: { type: 'video', src: '/imgs/drone.mp4', w: 400, h: 224 },
      title: 'Drone',
      tech: 'ATMega128rfa, Autodesk Fusion, Arduino',
      date: 'Sept 2024 – Dec 2024',
      body: 'Created a drone from scratch, from PCB design to the air. Implemented PID tuning for motor actuation.'
    },
    {
      media: { type: 'video', src: '/imgs/tritondemo.mp4', w: 516, h: 514 },
      title: 'Tri-tone',
      href: 'https://hamesjan.github.io/tritone_website/',
      tech: 'ESP32-S3, Teensy3.6, Adafruit RGB Matrix, OnShape, C++, Python',
      date: 'Apr 2024 – June 2024',
      extra: { label: 'Demo video', href: 'https://www.youtube.com/embed/3uRzH58n3Qw' },
      body: 'Processes audio into 1024 bin FFT data and then sends to a pre-trained ML model for RGB inferencing and real-time color prediction based on current dominant frequency and musical context (10 previous dominant frequencies).'
    },
    {
      media: { type: 'video', src: '/imgs/pokefy.mp4', w: 400, h: 222 },
      title: 'Pokefy',
      href: 'https://pokefy.web.app',
      tech: 'React.js, Firebase, ChatGPT API, Spotify API',
      date: 'Apr 2024 – June 2024',
      body: 'Uses LLM to generate 6 Pokémon based on Spotify Music taste. Pending approval to use Spotify API.'
    },
    {
      media: { type: 'video', src: '/imgs/out.mp4', w: 350, h: 350 },
      title: 'Surfen',
      href: 'https://surfen.web.app',
      tech: 'React.js, OpenCV, Numpy, Firebase, Flask, Tailwind, PythonAnywhere',
      date: 'May 2023 – August 2023',
      extra: { label: 'surfen.web.app', href: 'https://surfen.web.app' },
      body: 'Web application that acts as a video enhancer/converter that takes a far-away video input stream of surfers at a local beach and zooms in and enhances the surfer as they rip the wave.'
    },
    {
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
</svelte:head>

<main>
  <section class="bio">
    <div class="bio-text">
      <h1>James Han</h1>
      <p class="links">
        <a href="mailto:james1023417@gmail.com">Email</a> /
        <a href="/JamesHanResume.pdf">Resume</a> /
        <a href="/bio.txt">Bio</a> /
        <a href="https://github.com/hamesjan/">Github</a> /
        <a href="/portfolio/fish">Fish</a>
      </p>
    </div>
  </section>

  <section class="projects">
    <p class="section-label">projects</p>

    <p class="body intro">
      I'm passionate about computer architecture, embedded systems for global applications, and
      system design. I enjoy developing for local businesses and collaborating with small teams to
      bring ideas to market. I also bring significant experience as a full-stack web and mobile
      developer. My goal is to be able to think of any idea, physical or digital, and have the
      technical and organizational ability to create it from start to finish.
    </p>

    <p class="notice">
      Currently, most of the projects below have their deployments paused because I want to save
      money. Expect things to be broken :)
    </p>

    {#each projects as p (p.title)}
      <article class="project">
        {#if p.media}
        <div class="media" style="max-width: {p.media.w}px">
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
        {/if}

        <div class="text">
          <div class="meta">
            {#if p.href}
              <a href={p.href} class="title" target="_blank" rel="noopener noreferrer">{p.title}</a>
            {:else}
              <span class="title">{p.title}</span>
            {/if}
            {#if p.date}<span class="date">{p.date}</span>{/if}
          </div>
          <p class="tech">{p.tech}</p>
          <p class="body">{p.body}</p>
          {#if p.badge}<p class="badge">{p.badge}</p>{/if}
          {#if p.extra}
            <a class="more" href={p.extra.href} target="_blank" rel="noopener noreferrer">
              [ {p.extra.label} ]
            </a>
          {/if}
        </div>
      </article>
    {/each}
  </section>
</main>

<style>
  main {
    padding: 24px 32px 64px;
    max-width: 680px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
  }

  /* ── bio ── */

  .bio {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  h1 {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    margin: 0 0 10px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
  }

  .links {
    font-size: 12px;
    color: var(--text-muted);
    margin: 10px 0 0;
  }

  .links a {
    font-size: 12px;
    color: #2a7dad;
  }

  .links a:hover { color: var(--link-hover); }

  /* ── projects ── */

  .projects { margin-top: 48px; }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 20px 0;
  }

  .intro { margin: 0 0 16px; }

  .notice {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #d1493a;
    margin: 0 0 36px;
  }

  .project {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 36px;
  }

  .media {
    flex: 0 0 auto;
    width: 150px;
  }

  .media img,
  .media video {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 120px;
    border-radius: 2px;
  }

  .text {
    min-width: 0;
    flex: 1 1 auto;
  }

  .meta {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }

  .title {
    /* app.css styles bare <a>, so a linked title would diverge from a plain
       <span> one — pin both, matching .preview-title on the homepage */
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
  }

  a.title:hover { color: var(--link-hover); }

  .date {
    font-size: 11px;
    color: var(--text-muted);
  }

  .tech {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 11px;
    color: var(--text-muted);
    margin: 0 0 8px;
  }

  /* shared body copy — matches the blog previews on the homepage */
  .body {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0;
  }

  .badge {
    font-size: 11px;
    color: var(--text);
    margin: 8px 0 0;
  }

  .more {
    display: inline-block;
    font-size: 12px;
    color: #2a7dad;
    text-decoration: none;
    margin-top: 6px;
  }

  .more:hover { color: var(--link-hover); }

  @media (max-width: 560px) {
    main { padding: 20px 20px 56px; }
    .bio, .project {
      flex-direction: column;
      gap: 14px;
    }
    .media { width: 100%; max-width: 280px; }
  }
</style>
