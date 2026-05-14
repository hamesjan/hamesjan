<script>
  import { onMount, tick } from 'svelte';

  let status = 'loading'; // 'loading' | 'login' | 'authed'
  let activeTab = 'blog';

  let posts = [];
  let editingPost = null;
  let newPost = false;
  let postForm = emptyPost();

  let movies = [];
  let editingMovie = null;
  let newMovie = false;
  let movieForm = emptyMovie();

  let posterFile = null;
  let posterPreview = '';
  let uploadingPoster = false;

  let postImageFile = null;
  let postImagePreview = '';
  let pasteUploading = false;
  let previewMode = false;

  let saving = false;
  let error = '';
  let hoverRating = 0;
  $: effectiveRating = hoverRating || movieForm.rating;

  // login form
  let passwordInput = '';
  let passwordError = '';
  let submitting = false;

  function emptyPost() {
    return { title: '', date: '', isoDate: '', tags: '', content: '', image: '', published: true };
  }

  function emptyMovie() {
    return { title: '', year: '', director: '', rating: 3, reviewTitle: '', review: '', dateWatched: '', poster: '' };
  }

  onMount(async () => {
    const res = await fetch('/api/auth');
    const { authenticated } = await res.json();
    status = authenticated ? 'authed' : 'login';
    if (authenticated) await loadAll();
  });

  async function login() {
    if (submitting) return;
    submitting = true;
    passwordError = '';
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (data.ok) {
        status = 'authed';
        passwordInput = '';
        await loadAll();
      } else {
        passwordError = 'incorrect password';
      }
    } catch {
      passwordError = 'something went wrong';
    } finally {
      submitting = false;
    }
  }

  async function loadAll() {
    const [pr, mr] = await Promise.all([
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/movies').then(r => r.json())
    ]);
    posts = [...pr].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
    movies = [...mr].sort((a, b) => {
      if (!a.dateWatched) return 1;
      if (!b.dateWatched) return -1;
      return a.dateWatched > b.dateWatched ? -1 : a.dateWatched < b.dateWatched ? 1 : 0;
    });
  }

  // ── blog ──

  function startNewPost() { postForm = emptyPost(); postImageFile = null; postImagePreview = ''; previewMode = false; editingPost = null; newPost = true; error = ''; }

  function startEditPost(post) {
    postForm = { title: post.title, date: post.date, isoDate: post.isoDate, tags: post.tags.join(', '), content: post.content, image: post.image || '', published: post.published !== false };
    postImageFile = null;
    postImagePreview = post.image || '';
    previewMode = false;
    editingPost = post.slug;
    newPost = false;
    error = '';
  }

  function cancelPost() { newPost = false; editingPost = null; postImageFile = null; postImagePreview = ''; previewMode = false; error = ''; }

  function onPostImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    postImageFile = file;
    postImagePreview = URL.createObjectURL(file);
  }

  async function onContentPaste(e) {
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find(item => item.type.startsWith('image/'));
    if (!imageItem) return;
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (!file) return;
    pasteUploading = true;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const textarea = e.target;
      const start = textarea.selectionStart;
      const insert = `![image](${data.path})`;
      postForm.content = postForm.content.slice(0, start) + insert + postForm.content.slice(textarea.selectionEnd);
      await tick();
      textarea.selectionStart = textarea.selectionEnd = start + insert.length;
    } catch { error = 'image upload failed'; }
    finally { pasteUploading = false; }
  }

  async function savePost() {
    saving = true; error = '';
    try {
      let imagePath = postForm.image;
      if (postImageFile) {
        const fd = new FormData();
        fd.append('file', postImageFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        imagePath = data.path;
      }
      const payload = {
        ...postForm,
        image: imagePath,
        tags: postForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        slug: postForm.isoDate.replaceAll('-', '/').split('/').slice(0, 3).join('/')
      };
      await fetch(editingPost ? `/api/posts/${encodeURIComponent(editingPost)}` : '/api/posts', {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      cancelPost();
      await loadAll();
    } catch { error = 'save failed'; }
    finally { saving = false; }
  }

  // ── preview rendering ──

  function parseForPreview(content) {
    const segments = [];
    const parts = content.split('```');
    parts.forEach((part, i) => {
      if (i % 2 === 0) {
        part.split('\n\n').filter(p => p.trim()).forEach(p => {
          segments.push({ type: 'paragraph', text: p.trim() });
        });
      } else {
        const nl = part.indexOf('\n');
        const code = nl > 0 ? part.slice(nl + 1) : part;
        segments.push({ type: 'code', text: code.replace(/\n$/, '') });
      }
    });
    return segments;
  }

  function renderPreviewParagraph(text) {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:6px;display:block;margin:8px 0">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  async function deletePost(slug) {
    if (!confirm('delete this post?')) return;
    await fetch(`/api/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' });
    await loadAll();
  }

  // ── movies ──

  function startNewMovie() { movieForm = emptyMovie(); posterFile = null; posterPreview = ''; editingMovie = null; newMovie = true; error = ''; }

  function startEditMovie(movie) {
    movieForm = { title: movie.title, year: movie.year, director: movie.director || '', rating: movie.rating ?? 3, reviewTitle: movie.reviewTitle || '', review: movie.review || '', dateWatched: movie.dateWatched || '', poster: movie.poster || '' };
    posterFile = null;
    posterPreview = movie.poster || '';
    editingMovie = movie.id;
    newMovie = false;
    error = '';
  }

  function cancelMovie() { newMovie = false; editingMovie = null; posterFile = null; posterPreview = ''; error = ''; }

  function onPosterChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    posterFile = file;
    posterPreview = URL.createObjectURL(file);
  }

  async function saveMovie() {
    saving = true; error = '';
    try {
      let posterPath = movieForm.poster;
      if (posterFile) {
        uploadingPoster = true;
        const fd = new FormData();
        fd.append('file', posterFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        posterPath = data.path;
        uploadingPoster = false;
      }
      const payload = { ...movieForm, year: Number(movieForm.year), rating: Number(movieForm.rating), poster: posterPath };
      await fetch(editingMovie ? `/api/movies/${editingMovie}` : '/api/movies', {
        method: editingMovie ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      cancelMovie();
      await loadAll();
    } catch { error = 'save failed'; }
    finally { saving = false; uploadingPoster = false; }
  }

  async function deleteMovie(id) {
    if (!confirm('delete this movie?')) return;
    await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  function starLabel(rating) { return `${rating} ★`; }
</script>

<svelte:head>
  <title>admin — hamesjan</title>
</svelte:head>

{#if status === 'loading'}
  <div class="center-wrap"></div>

{:else if status === 'login'}
  <div class="login-wrap">
    <form on:submit|preventDefault={login}>
      <input
        type="password"
        bind:value={passwordInput}
        placeholder="password"
        class="pw-input"
        autofocus
        disabled={submitting}
      />
      {#if passwordError}
        <span class="pw-error">{passwordError}</span>
      {/if}
      <button type="submit" class="pw-submit" disabled={submitting}>
        {submitting ? '...' : 'enter'}
      </button>
    </form>
  </div>

{:else}
  <div class="admin">
    <div class="admin-header">
      <span class="admin-title">admin</span>
      <div class="tabs">
        <button class="tab" class:active={activeTab === 'blog'} on:click={() => activeTab = 'blog'}>blog</button>
        <button class="tab" class:active={activeTab === 'movies'} on:click={() => activeTab = 'movies'}>movies</button>
      </div>
    </div>

    {#if error}
      <div class="error-bar">{error}</div>
    {/if}

    <!-- ── blog tab ── -->
    {#if activeTab === 'blog'}
      {#if !newPost && !editingPost}
        <div class="section-top">
          <button class="btn-new" on:click={startNewPost}>+ new post</button>
        </div>
        <table class="list-table">
          <thead><tr><th>title</th><th>date</th><th>tags</th><th></th></tr></thead>
          <tbody>
            {#each posts as post}
              <tr>
                <td class="col-title">
                  {post.title}
                  {#if post.published === false}<span class="draft-badge">draft</span>{/if}
                </td>
                <td class="col-date">{post.date}</td>
                <td class="col-tags">{post.tags.join(', ')}</td>
                <td class="col-actions">
                  <button class="action-btn" on:click={() => startEditPost(post)}>edit</button>
                  <button class="action-btn danger" on:click={() => deletePost(post.slug)}>del</button>
                </td>
              </tr>
            {:else}
              <tr><td colspan="4" class="empty-row">no posts yet.</td></tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <div class="form-section">
          <h2 class="form-title">{editingPost ? 'edit post' : 'new post'}</h2>
          <div class="form-grid">
            <label class="field"><span>title</span><input bind:value={postForm.title} placeholder="post title" /></label>
            <label class="field"><span>date (display)</span><input bind:value={postForm.date} placeholder="may 4, 2026" /></label>
            <label class="field"><span>iso date</span><input bind:value={postForm.isoDate} placeholder="2026-05-04" /></label>
            <label class="field"><span>tags (comma-separated)</span><input bind:value={postForm.tags} placeholder="general, thoughts" /></label>
            <div class="field full">
              <span>cover image (optional)</span>
              <div class="poster-row">
                {#if postImagePreview}
                  <img src={postImagePreview} alt="cover preview" class="poster-preview cover-preview" />
                {/if}
                <label class="file-label">
                  {postImageFile ? postImageFile.name : 'choose image'}
                  <input type="file" accept="image/*" on:change={onPostImageChange} class="file-input" />
                </label>
                {#if postForm.image && !postImageFile}
                  <button type="button" class="action-btn danger" on:click={() => { postForm.image = ''; postImagePreview = ''; }}>remove</button>
                {/if}
              </div>
            </div>
            <div class="field full">
              <div class="field-header">
                <span>content {#if pasteUploading}<span class="upload-hint">uploading…</span>{/if}</span>
                <div class="view-toggle">
                  <button type="button" class="toggle-btn" class:active={!previewMode} on:click={() => previewMode = false}>write</button>
                  <button type="button" class="toggle-btn" class:active={previewMode} on:click={() => previewMode = true}>preview</button>
                </div>
              </div>
              {#if previewMode}
                <div class="preview-pane">
                  {#each parseForPreview(postForm.content) as seg}
                    {#if seg.type === 'code'}
                      <pre class="preview-code"><code>{seg.text}</code></pre>
                    {:else}
                      <p class="preview-p">{@html renderPreviewParagraph(seg.text)}</p>
                    {/if}
                  {/each}
                </div>
              {:else}
                <textarea bind:value={postForm.content} rows="18" placeholder="write your post here... (paste an image to upload it)" on:paste={onContentPaste}></textarea>
              {/if}
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" on:click={savePost} disabled={saving}>{saving ? 'saving...' : 'save'}</button>
            <button class="btn-cancel" on:click={cancelPost}>cancel</button>
            <label class="published-toggle">
              <input type="checkbox" bind:checked={postForm.published} />
              <span class="pub-label" class:is-draft={!postForm.published}>{postForm.published ? 'published' : 'draft'}</span>
            </label>
          </div>
        </div>
      {/if}
    {/if}

    <!-- ── movies tab ── -->
    {#if activeTab === 'movies'}
      {#if !newMovie && !editingMovie}
        <div class="section-top">
          <button class="btn-new" on:click={startNewMovie}>+ new movie</button>
        </div>
        <table class="list-table">
          <thead><tr><th>title</th><th>year</th><th>rating</th><th></th></tr></thead>
          <tbody>
            {#each movies as movie}
              <tr>
                <td class="col-title">{movie.title}</td>
                <td class="col-date">{movie.year}</td>
                <td class="col-date">{starLabel(movie.rating)}</td>
                <td class="col-actions">
                  <button class="action-btn" on:click={() => startEditMovie(movie)}>edit</button>
                  <button class="action-btn danger" on:click={() => deleteMovie(movie.id)}>del</button>
                </td>
              </tr>
            {:else}
              <tr><td colspan="4" class="empty-row">no movies yet.</td></tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <div class="form-section">
          <h2 class="form-title">{editingMovie ? 'edit movie' : 'new movie'}</h2>
          <div class="form-grid">
            <label class="field"><span>title</span><input bind:value={movieForm.title} placeholder="Dune: Part Two" /></label>
            <label class="field"><span>year</span><input bind:value={movieForm.year} placeholder="2024" type="number" /></label>
            <label class="field"><span>director</span><input bind:value={movieForm.director} placeholder="Denis Villeneuve" /></label>
            <label class="field"><span>date watched</span><input bind:value={movieForm.dateWatched} type="date" /></label>
            <label class="field full"><span>review title</span><input bind:value={movieForm.reviewTitle} placeholder="an optional title for your review" /></label>
            <div class="field full">
              <span>rating</span>
              <div class="star-row" on:mouseleave={() => hoverRating = 0}>
                {#each [1,2,3,4,5] as n}
                  <button
                    type="button"
                    class="star-btn"
                    class:filled={effectiveRating >= n}
                    class:half={effectiveRating >= n - 0.5 && effectiveRating < n}
                    on:mousemove={(e) => { const r = e.currentTarget.getBoundingClientRect(); hoverRating = (e.clientX - r.left) < r.width / 2 ? n - 0.5 : n; }}
                    on:click={(e) => { const r = e.currentTarget.getBoundingClientRect(); movieForm.rating = (e.clientX - r.left) < r.width / 2 ? n - 0.5 : n; }}
                  >★</button>
                {/each}
              </div>
            </div>
            <div class="field full">
              <span>poster</span>
              <div class="poster-row">
                {#if posterPreview}
                  <img src={posterPreview} alt="poster preview" class="poster-preview" />
                {/if}
                <label class="file-label">
                  {posterFile ? posterFile.name : 'choose image'}
                  <input type="file" accept="image/*" on:change={onPosterChange} class="file-input" />
                </label>
                {#if movieForm.poster && !posterFile}
                  <button type="button" class="action-btn danger" on:click={() => { movieForm.poster = ''; posterPreview = ''; }}>remove</button>
                {/if}
              </div>
            </div>
            <label class="field full"><span>review</span><textarea bind:value={movieForm.review} rows="8" placeholder="your thoughts..."></textarea></label>
          </div>
          <div class="form-actions">
            <button class="btn-save" on:click={saveMovie} disabled={saving}>{uploadingPoster ? 'uploading...' : saving ? 'saving...' : 'save'}</button>
            <button class="btn-cancel" on:click={cancelMovie}>cancel</button>
          </div>
        </div>
      {/if}
    {/if}
  </div>
{/if}

<style>
  .center-wrap {
    height: 40vh;
  }

  .login-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
  }

  .login-wrap form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 220px;
  }

  .pw-input {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 8px 10px;
    color: var(--text);
    outline: none;
    width: 100%;
  }

  .pw-input:focus { border-color: #2a7dad; }

  .pw-error {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    color: #e06c75;
  }

  .pw-submit {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
    padding: 6px 12px;
    cursor: pointer;
    align-self: flex-end;
  }

  .pw-submit:hover:not(:disabled) { color: var(--text); border-color: var(--text-muted); }
  .pw-submit:disabled { opacity: 0.5; cursor: default; }

  .admin {
    max-width: 760px;
    margin: 0 auto;
    padding: 32px 32px 80px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  .admin-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 28px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 16px;
  }

  .admin-title { font-size: 14px; font-weight: 500; color: #77d183; }

  .tabs { display: flex; gap: 4px; }

  .tab {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--text-muted);
    padding: 4px 10px;
    cursor: pointer;
  }

  .tab:hover { color: var(--text); }
  .tab.active { border-color: var(--border); color: var(--text); }

  .error-bar { font-size: 12px; color: #e06c75; margin-bottom: 16px; }

  .section-top { margin-bottom: 16px; }

  .btn-new {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
    padding: 5px 12px;
    cursor: pointer;
  }

  .btn-new:hover { color: var(--text); border-color: var(--text-muted); }

  .list-table { width: 100%; border-collapse: collapse; font-size: 12px; }

  .list-table th {
    text-align: left;
    color: var(--text-muted);
    font-weight: 400;
    padding: 6px 8px 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 11px;
  }

  .list-table td {
    padding: 10px 8px 10px 0;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }

  .col-title { color: var(--text); max-width: 280px; }
  .col-date { color: var(--text-muted); white-space: nowrap; }
  .col-tags { color: var(--text-muted); font-size: 11px; }
  .col-actions { white-space: nowrap; text-align: right; }

  .action-btn {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 2px 6px;
  }

  .action-btn:hover { color: var(--text); }
  .action-btn.danger:hover { color: #e06c75; }

  .empty-row { color: var(--text-muted); font-size: 12px; padding: 16px 0; }

  .form-section { max-width: 600px; }

  .form-title { font-size: 13px; font-weight: 500; color: var(--text); margin: 0 0 20px 0; }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }

  .field { display: flex; flex-direction: column; gap: 5px; font-size: 11px; color: var(--text-muted); }
  .field.full { grid-column: 1 / -1; }

  .field input,
  .field textarea {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 7px 9px;
    color: var(--text);
    outline: none;
    resize: vertical;
  }

  .field input:focus,
  .field textarea:focus { border-color: #2a7dad; }

  .star-row { display: flex; gap: 4px; margin-top: 2px; }

  .star-btn {
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--border);
    padding: 0;
    line-height: 1;
    position: relative;
  }

  .star-btn.filled { color: #e5b84a; }

  .star-btn.half::after {
    content: '★';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    overflow: hidden;
    color: #e5b84a;
    pointer-events: none;
  }

  .poster-row { display: flex; align-items: center; gap: 12px; margin-top: 2px; }

  .poster-preview { width: 60px; border-radius: 3px; object-fit: cover; display: block; }

  .file-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .file-label:hover { color: var(--text); border-color: var(--text-muted); }
  .file-input { display: none; }

  .draft-badge {
    font-size: 10px;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1px 5px;
    margin-left: 6px;
    vertical-align: middle;
  }

  .field-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .field-header > span { font-size: 11px; color: var(--text-muted); }

  .upload-hint { font-size: 10px; color: var(--text-muted); margin-left: 6px; }

  .view-toggle { display: flex; gap: 2px; }

  .toggle-btn {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--text-muted);
    padding: 2px 8px;
    cursor: pointer;
  }

  .toggle-btn:hover { color: var(--text); }
  .toggle-btn.active { border-color: var(--border); color: var(--text); }

  .preview-pane {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 14px 16px;
    min-height: 320px;
    overflow-y: auto;
    background: var(--bg);
  }

  .preview-p {
    font-family: 'Lato', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.75;
    color: var(--text);
    margin: 0 0 16px 0;
  }

  .preview-code {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 12px 14px;
    overflow-x: auto;
    margin: 0 0 16px 0;
    line-height: 1.6;
    color: var(--text);
    white-space: pre;
  }

  .cover-preview { width: 120px; height: 70px; object-fit: cover; }

  .published-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    margin-left: auto;
  }

  .published-toggle input { cursor: pointer; }

  .pub-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    color: var(--text-muted);
  }

  .pub-label.is-draft { color: #e5c04a; }

  .form-actions { display: flex; gap: 10px; align-items: center; }

  .btn-save {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: none;
    border: 1px solid #2a7dad;
    border-radius: 4px;
    color: #2a7dad;
    padding: 6px 14px;
    cursor: pointer;
  }

  .btn-save:hover:not(:disabled) { background: #2a7dad; color: #fff; }
  .btn-save:disabled { opacity: 0.5; cursor: default; }

  .btn-cancel {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
    padding: 6px 14px;
    cursor: pointer;
  }

  .btn-cancel:hover { color: var(--text); border-color: var(--text-muted); }
</style>
