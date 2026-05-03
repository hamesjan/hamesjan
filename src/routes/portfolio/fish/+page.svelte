<svelte:head>
  <title>Fish - James Han</title>
</svelte:head>

<div class="container">
  <a href="/portfolio" class="back">← Back</a>

  <h1>Welcome to the Fish Page</h1>

  <div class="entry">
    <strong>April 13, 2025</strong>
    <p>Some fishermeisters</p>
    <div class="photos">
      <img src="/imgs/fish/fish9_1.jpeg" alt="April 13 fish" />
    </div>
  </div>

  <div class="entry">
    <strong>Mar 12, 2025</strong>
    <p>Beautiful spotty at Shelter.</p>
    <img src="/imgs/fish/fish8.jpeg" alt="Mar 12 fish" />
  </div>

  <div class="entry">
    <strong>Feb 16, 2025</strong>
    <p>Smelt and Sculpin. Shelter island.</p>
    <div class="photos">
      <img src="/imgs/fish/fish5.jpeg" alt="Feb 16 fish 1" />
      <img src="/imgs/fish/fish7.jpeg" alt="Feb 16 fish 2" />
    </div>
  </div>

  <div class="entry">
    <strong>Feb 9, 2025</strong>
    <p>Tiny Spotty at shelter island.</p>
    <img src="/imgs/fish/fish6.jpeg" alt="Feb 9 fish" />
  </div>

  <div class="entry">
    <strong>Feb 8, 2025</strong>
    <p>Little octopus at Shelter Island. Was super surprised by this one.</p>
    <img src="/imgs/fish/fish4.jpeg" alt="Feb 8 octopus" />
  </div>

  <div class="entry">
    <strong>Feb 2, 2025</strong>
    <p>Yellowfin Croaker at Scripps.</p>
    <img src="/imgs/fish/fish3.jpeg" alt="Feb 2 fish" />
  </div>

  <div class="entry">
    <strong>Jan 25, 2025</strong>
    <p>Rainbow Trout at Dixon lake. Delicious little thing.</p>
    <img src="/imgs/fish/fish2.jpeg" alt="Jan 25 fish" />
  </div>

  <div class="entry">
    <strong>Dec 23, 2024</strong>
    <p>My first ever fish. Spanish Mackerel at Redondo Pier. Used Sabiki with squid.</p>
    <img src="/imgs/fish/fish1.jpeg" alt="Dec 23 fish" />
  </div>
</div>

<style>
  .container {
    padding: 20px;
  }

  .back {
    display: inline-block;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 32px;
  }

  .entry {
    margin-bottom: 40px;
  }

  .entry img {
    width: 300px;
    max-height: 500px;
    object-fit: cover;
    display: block;
    margin-top: 8px;
  }

  .photos {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .photos img {
    width: 300px;
    max-height: 500px;
    object-fit: cover;
  }
</style>
