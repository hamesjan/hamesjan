<script>
  import '../app.css';
</script>

<header>
  <a href="/" class="site-title">James Han</a>
  <nav>
    <a href="/portfolio">Portfolio</a>
  </nav>
</header>

<slot />

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e8e8e8;
  }

  .site-title {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 15px;
    font-weight: 500;
    color: #111;
    text-decoration: none;
  }

  .site-title:hover {
    color: #111;
  }

  nav a {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }

  nav a:hover {
    color: #111;
  }
</style>
