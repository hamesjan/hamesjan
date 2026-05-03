<script>
  import { onMount } from 'svelte';
  import '../app.css';

  let darkMode = true;
  let settingsOpen = false;

  onMount(() => {
    const saved = localStorage.getItem('darkMode');
    darkMode = saved !== null ? saved === 'true' : true;
  });

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', String(darkMode));
  }

  function toggleDark() {
    darkMode = !darkMode;
    applyTheme();
  }

  function handleWindowClick(e) {
    if (!e.target.closest('.settings-menu')) {
      settingsOpen = false;
    }
  }
</script>

<svelte:window on:click={handleWindowClick} />

<header>
  <div class="header-left">
    <a href="/" class="site-title">hamesjan.com</a>
    <span class="header-bio">hi! I'm a developer from California.</span>
  </div>
  <nav>
    <a href="/blog" class="nav-link">blog</a>
    <a href="/tags" class="nav-link">tags</a>
    <a href="/portfolio" class="nav-link">portfolio</a>
    <div class="settings-menu">
      <button class="settings-btn" on:click|stopPropagation={() => (settingsOpen = !settingsOpen)}>
        settings {settingsOpen ? '▴' : '▾'}
      </button>
      {#if settingsOpen}
        <div class="dropdown">
          <label class="toggle-row" on:click|stopPropagation>
            <span>night mode</span>
            <span class="toggle-switch">
              <input type="checkbox" checked={darkMode} on:change={toggleDark} />
              <span class="track"></span>
            </span>
          </label>
        </div>
      {/if}
    </div>
  </nav>
</header>

<slot />

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .header-bio {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--text-muted);
  }

  .site-title {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
  }

  .site-title:hover {
    color: var(--text);
    opacity: 0.7;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-link {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
  }

  .nav-link:hover {
    color: var(--text);
  }

  .settings-menu {
    position: relative;
  }

  .settings-btn {
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 13px;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .settings-btn:hover {
    color: var(--text);
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 14px;
    min-width: 160px;
    z-index: 100;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    font-family: 'JetBrains Mono', 'Fira Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--text);
    cursor: pointer;
    user-select: none;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
    flex-shrink: 0;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .track {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--border);
    border-radius: 17px;
    transition: background 0.2s;
    cursor: pointer;
  }

  .track::after {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 12px;
    height: 12px;
    background: var(--text-muted);
    border-radius: 50%;
    transition: transform 0.2s, background 0.2s;
  }

  input:checked + .track {
    background: #4a86c8;
  }

  input:checked + .track::after {
    transform: translateX(13px);
    background: #ffffff;
  }
</style>
