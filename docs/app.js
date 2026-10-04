/* 網站的運作程式。平常更新內容不需要改這個檔案，請改 content.js */
(function () {
  'use strict';
  if (typeof SITE === 'undefined') return; // content.js 有錯，畫面會顯示錯誤訊息

  const app = document.getElementById('app');
  const footer = document.getElementById('footer');

  /* ---------- 中英對照（新的職位或片種沒有在這裡，只會顯示中文） ---------- */
  const ROLE_EN = {
    '編導': 'Director', '編劇': 'Screenwriter', '導演': 'Director', '腳本': 'Script',
    '攝影': 'DOP', '攝影助理': '2nd AC', '攝影二助': '2nd AC', '燈光': 'Gaffer',
    '剪輯': 'Editor', '剪接': 'Editor', '聯合剪輯': 'Co-editor', '剪輯協力': 'Assistant Editor',
    '調光': 'Colorist', '合成': 'Compositing', '視效合成': 'VFX Compositing', '特效': 'VFX',
    '動畫': 'Animation', '2D動畫': '2D Animation', '3D動畫': '3D Animation',
    '錄音助理': 'Sound Assistant', '製作人': 'Producer', 'DIT': 'DIT',
  };
  const TYPE_EN = {
    '劇情短片': 'Narrative short', '概念片': 'Concept film', '紀錄片': 'Documentary',
    '幕後花絮': 'Behind the scenes', '募資影片': 'Crowdfunding video', '旅拍': 'Cinematic vlog',
    '音樂影像': 'Music video', 'MV': 'Music video', '形象廣告': 'Brand film', '產品廣告': 'Product ad',
    '廣告': 'Commercial', '節目製作': 'Program production', '影展前導片': 'Promotional video',
    '動畫片': 'Animation', '短影音': 'Short-form video', '直播': 'Live stream',
  };

  /* ---------- 小工具 ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enc = encodeURIComponent;
  const works = (SITE.works || []).filter((w) => w && w.title);
  const cats = SITE.categories || [];
  const albums = SITE.albums || [];
  const workId = (w) => String(w.id || w.title);
  const hasPage = (w) => !!ytId(w.youtube);
  const pageWorks = works.filter(hasPage);

  function ytId(v) {
    if (!v) return '';
    const s = String(v).trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : '';
  }

  // Framer 的圖可以指定尺寸，載入比較快；自己的圖片原樣使用
  function img(src, w) {
    if (!src) return '';
    if (/framerusercontent\.com/.test(src)) return src.split('?')[0] + '?scale-down-to=' + (w || 1024);
    return src;
  }
  function coverOf(w, size) {
    if (w.cover) return img(w.cover, size);
    const id = ytId(w.youtube);
    return id ? 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg' : '';
  }

  // 「編導／剪輯（與薛瑋宜）／調光」→ [{role:'編導'}, {role:'剪輯', with:'薛瑋宜'}, …]
  function parseRoles(str) {
    const parts = [];
    let buf = '', depth = 0;
    for (const ch of String(str || '')) {
      if (ch === '（' || ch === '(') depth++;
      if (ch === '）' || ch === ')') depth = Math.max(0, depth - 1);
      if (depth === 0 && /[／/、,，]/.test(ch)) { parts.push(buf); buf = ''; } else buf += ch;
    }
    parts.push(buf);
    return parts.map((p) => p.trim()).filter(Boolean).map((p) => {
      const m = p.match(/^(.*?)[（(]\s*與?\s*(.*?)[)）]$/);
      return m ? { role: m[1].trim(), with: m[2].trim() } : { role: p };
    });
  }
  const rolesText = (w) => parseRoles(w.roles).map((r) => r.role).join('／');
  // 片名加上書名號（本來就有《》的不重複加）
  const bk = (t) => /《/.test(t) ? esc(t) : '《' + esc(t) + '》';
  const typeEn = (w) => w.typeEn || TYPE_EN[w.type] || '';

  const catById = (id) => cats.find((c) => c.id === id);
  const worksIn = (catId) => catId === 'all' ? pageWorks : pageWorks.filter((w) => (w.categories || []).includes(catId));

  function picture(src, alt, cls, eager) {
    if (!src) return '<div class="ph ' + (cls || '') + '"></div>';
    return '<img class="' + (cls || '') + '" src="' + esc(src) + '" alt="' + esc(alt || '') + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }

  const arrow = '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const playIcon = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

  // 服務項目的線條圖示（依分類 id）
  const ICONS = {
    '編導': '<rect x="4" y="10" width="24" height="16" rx="1.5"/><path d="M4 10l22-6 1 4"/><path d="M10 8.4l2.5 3.6M16 6.8l2.5 3.6M22 5.2l2.5 3.6"/><path d="M4 15h24"/>',
    '動態攝影': '<rect x="3" y="9" width="18" height="14" rx="2"/><path d="M21 14l8-4v12l-8-4"/><circle cx="9" cy="6" r="2.5"/><circle cx="16" cy="6" r="2.5"/>',
    '剪輯調光': '<circle cx="16" cy="16" r="12"/><circle cx="12.5" cy="13" r="5"/><circle cx="19.5" cy="13" r="5"/><circle cx="16" cy="19" r="5"/>',
    '動畫特效': '<path d="M16 4l12 6.5-12 6.5L4 10.5z"/><path d="M4 16l12 6.5L28 16"/><path d="M4 21.5L16 28l12-6.5"/>',
    '人像攝影': '<rect x="3" y="9" width="26" height="18" rx="2"/><circle cx="16" cy="18" r="5.5"/><path d="M11 9l2-4h6l2 4"/><circle cx="24.5" cy="13" r=".8"/>',
  };
  const icon = (id) => '<svg class="svc-icon" viewBox="0 0 32 32" aria-hidden="true">' +
    (ICONS[id] || '<circle cx="16" cy="16" r="11"/><path d="M13 11l8 5-8 5z"/>') + '</svg>';

  /* ---------- 共用元件 ---------- */
  const secTitle = (en, zh) => '<h2 class="sec-title">' + esc(en) + (zh ? '<small>' + esc(zh) + '</small>' : '') + '</h2>';
  const btn = (href, label, ext) => '<a class="btn" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(label) + '</a>';

  function workCard(w) {
    const award = (w.awards || []).length ? '<span class="tag tag-award">得獎</span>' : '';
    return '<a class="card" href="#/work/' + enc(workId(w)) + '">' +
      '<div class="card-media">' + picture(coverOf(w, 1024), w.title) +
      '<div class="tags">' + (w.type ? '<span class="tag">' + esc(w.type) + (typeEn(w) ? ' ' + esc(typeEn(w)) : '') + '</span>' : '') + award + '</div></div>' +
      '<div class="card-body"><h3>' + bk(w.title) + '</h3>' +
      '<p>' + esc(rolesText(w)) + (w.year ? '<span class="dot">·</span>' + esc(w.year) : '') + '</p></div></a>';
  }

  function albumCard(a) {
    return '<a class="card card-album" href="#/album/' + enc(a.id) + '">' +
      '<div class="card-media">' + picture(img(a.cover || (a.photos || [])[0], 1024), a.title) +
      '<div class="tags"><span class="tag">' + (a.photos || []).length + ' 張</span></div></div>' +
      '<div class="card-body"><h3>' + esc(a.title) + '</h3><p>模特：' + esc(a.model || '') + '</p></div></a>';
  }

  function player(id, poster, title) {
    if (!id) return '';
    const p = poster || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
    return '<div class="player" data-yt="' + esc(id) + '" data-title="' + esc(title || '') + '">' +
      '<img src="' + esc(p) + '" alt="" loading="lazy">' +
      '<button class="play" type="button" aria-label="播放影片：' + esc(title || '') + '">' + playIcon + '</button></div>' +
      // 直接雙擊 index.html 打開時，YouTube 不允許在頁面內播放
      (location.protocol === 'file:' ? '<p class="local-note">目前是直接打開檔案，YouTube 不允許在頁面內播放。請雙擊資料夾裡的「預覽網站.command」，或等網站上線後觀看。</p>' : '');
  }

  // 每一頁最上面的模糊背景大圖
  function pageHero(bg, label, title, sub, extra, center) {
    return '<section class="page-hero' + (center ? ' is-center' : '') + '"' + (bg ? ' style="--hero:url(\'' + esc(bg) + '\')"' : '') + '>' +
      '<div class="page-hero-inner">' +
        (label ? '<p class="label">' + label + '</p>' : '') +
        '<h1>' + title + '</h1>' +
        (sub ? '<p class="sub">' + sub + '</p>' : '') + (extra || '') +
      '</div></section>';
  }

  function catChips(active) {
    const items = [{ id: 'all', zh: '全部' }].concat(cats);
    return '<nav class="chips" aria-label="作品分類">' + items.map((c) =>
      '<a class="chip' + (c.id === active ? ' is-active' : '') + '" href="#/c/' + enc(c.id) + '"' +
      (c.id === active ? ' aria-current="page"' : '') + '>' + esc(c.zh) + '</a>').join('') + '</nav>';
  }

  /* ---------- 首頁 ---------- */
  function renderHome() {
    const c = SITE.contact || {};
    const latest = pageWorks.slice(0, 4);
    const reel = ytId(SITE.showreel);
    return '' +
      '<section class="hero" style="--hero:url(\'' + esc(img(SITE.heroImage || (SITE.introPhotos || [])[0], 2048)) + '\')">' +
        '<div class="hero-inner">' +
          '<p class="hero-kicker">' + esc(SITE.name) + ' · Filmmaking</p>' +
          '<h1 class="hero-title">' + esc(SITE.tagline) + '</h1>' +
          '<p class="hero-roles">' + cats.map((k) => '<a href="#/c/' + enc(k.id) + '">' + esc(k.en) + '</a>').join('<span>·</span>') + '</p>' +
        '</div>' +
        '<button class="scroll-down" type="button" data-scroll="intro" aria-label="往下看">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '</section>' +

      '<section class="section intro" id="intro">' +
        '<div class="intro-grid">' +
          '<div class="intro-photos">' + (SITE.introPhotos || []).map((p) => picture(img(p, 2048), '')).join('') + '</div>' +
          '<div class="intro-text">' +
            '<p class="label">About</p>' +
            '<h2>' + esc(SITE.nameZh) + ' <span>' + esc(SITE.name) + '</span></h2>' +
            '<p class="quote">「' + esc(SITE.tagline) + '」</p>' +
            '<p class="lead">' + esc(SITE.intro) + '</p>' +
            btn('#/about', 'Learn More') +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section services">' +
        secTitle('Services') +
        '<ul class="service-list">' + cats.map((k) =>
          '<li><a href="#/c/' + enc(k.id) + '">' + icon(k.id) + '<span class="en">' + esc(k.en) + '</span><span class="zh">' + esc(k.zh) + '</span></a></li>').join('') +
        '</ul>' +
        '<div class="center">' + btn('#/c/all', 'View All Works') + '</div>' +
      '</section>' +

      (reel ? '<section class="band reel-band" style="--hero:url(\'https://i.ytimg.com/vi/' + reel + '/hqdefault.jpg\')">' +
        '<div class="band-inner">' + secTitle('Showreel') + player(reel, 'https://i.ytimg.com/vi/' + reel + '/maxresdefault.jpg', 'Showreel') + '</div></section>' : '') +

      '<section class="section" id="works">' +
        secTitle('Works', '作品分類') +
        '<div class="grid">' + cats.map((k) => {
          const n = k.albums ? albums.length + ' 組相簿' : worksIn(k.id).length + ' 部作品';
          return '<a class="card" href="#/c/' + enc(k.id) + '">' +
            '<div class="card-media">' + picture(img(k.cover, 1024), k.en) + '<div class="tags"><span class="tag">' + n + '</span></div></div>' +
            '<div class="card-body"><h3>' + esc(k.en) + '<span class="h3-zh">' + esc(k.zh) + '</span></h3>' +
            (k.desc ? '<p>' + esc(k.desc) + '</p>' : '') + '</div></a>';
        }).join('') + '</div>' +
      '</section>' +

      (latest.length ? '<section class="red-band">' +
        '<div class="band-inner">' + secTitle('Latest Projects', '最新作品') +
        '<div class="grid grid-4">' + latest.map(workCard).join('') + '</div>' +
        '<div class="center">' + btn('#/c/all', 'View All') + '</div></div></section>' : '') +

      '<section class="section contact">' +
        secTitle('Contact', '聯絡我') +
        '<dl class="contact-grid">' +
          (c.phone ? '<div><dt>Phone</dt><dd><a href="tel:' + esc(c.phone) + '">' + esc(c.phone) + '</a></dd></div>' : '') +
          (c.email ? '<div><dt>Email</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></dd></div>' : '') +
          (c.instagram ? '<div><dt>Instagram</dt><dd><a href="https://www.instagram.com/' + esc(c.instagram) + '/" target="_blank" rel="noopener">@' + esc(c.instagram) + '</a></dd></div>' : '') +
        '</dl>' +
        (SITE.requestForm ? '<div class="center">' + btn(SITE.requestForm, '填寫影片需求調查單', true) + '</div>' : '') +
      '</section>';
  }

  /* ---------- 分類頁 ---------- */
  function renderCategory(id) {
    const isAll = id === 'all';
    const cat = isAll ? { id: 'all', en: 'All Works', zh: '全部作品', desc: '' } : catById(id);
    if (!cat) return null;
    const list = cat.albums ? albums : worksIn(cat.id);
    const idx = cats.indexOf(cat);
    const next = isAll ? cats[0] : cats[(idx + 1) % cats.length];
    const reel = ytId(cat.showreel);
    if (!cat.albums) lastCat = cat.id;
    document.title = cat.en + ' ' + cat.zh + ' — ' + SITE.name;

    return pageHero(cat.banner ? img(cat.banner, 1024) : img(SITE.heroImage, 1024), 'Category',
        esc(cat.zh) + '<span class="h1-en">' + esc(cat.en) + '</span>', esc(cat.desc || '')) +
      '<div class="wrap page-body">' +
        catChips(cat.id) +
        (reel ? '<div class="reel">' + secTitle('Showreel') + player(reel, '', 'Showreel') + '</div>' : '') +
        (list.length
          ? '<div class="grid">' + list.map(cat.albums ? albumCard : workCard).join('') + '</div>'
          : '<p class="empty">這個分類還沒有作品。</p>') +
        (next ? '<a class="next-block" href="#/c/' + enc(next.id) + '"><span class="label">Next Category</span><span class="next-title">' + esc(next.zh) + ' ' + esc(next.en) + ' ' + arrow + '</span></a>' : '') +
      '</div>';
  }

  /* ---------- 單一作品頁 ---------- */
  function renderWork(id) {
    const w = pageWorks.find((x) => workId(x) === id);
    if (!w) return null;
    // 從哪個分類點進來，「BACK」和上一部／下一部就在那個分類裡切換
    const from = lastCat === 'all' || (w.categories || []).includes(lastCat) ? lastCat : ((w.categories || [])[0] || 'all');
    const list = worksIn(from);
    const i = list.indexOf(w);
    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];
    const roles = parseRoles(w.roles);
    const fromCat = from === 'all' ? { zh: '全部作品' } : catById(from);
    document.title = w.title + ' — ' + SITE.name;

    const tag = w.type ? '<span class="tag">' + esc(w.type) + (typeEn(w) ? ' ' + esc(typeEn(w)) : '') + '</span>' : '';
    const awards = (w.awards || []).length ? '<ul class="awards">' + w.awards.map((a) => '<li>' + esc(a) + '</li>').join('') + '</ul>' : '';

    return pageHero(coverOf(w, 1024), tag, bk(w.title), w.year ? esc(w.year) : '', awards, true) +
      '<div class="wrap work-body">' +
        '<a class="back" href="#/c/' + enc(from) + '">' + arrow + ' ' + esc(fromCat ? fromCat.zh : '作品') + '</a>' +
        player(ytId(w.youtube), w.cover ? img(w.cover, 2048) : '', w.title) +
        '<div class="work-info">' +
          '<section class="credits">' +
            '<h2>' + bk(w.title) + '</h2>' +
            (w.note ? '<p class="note">' + esc(w.note) + '</p>' : '') +
            '<ul>' + roles.map((r) =>
              '<li><span class="r-role">' + esc(r.role) + (ROLE_EN[r.role] ? ' ' + esc(ROLE_EN[r.role]) : '') + '</span>' +
              '<span class="r-name">' + esc(SITE.name) + (r.with ? '、' + esc(r.with) : '') + '</span></li>').join('') +
            '</ul>' +
          '</section>' +
          ((w.categories || []).length ? '<aside class="work-side"><p class="label">Category</p><div class="chip-row">' + w.categories.map((c) => {
            const k = catById(c); return k ? '<a class="chip" href="#/c/' + enc(k.id) + '">' + esc(k.zh) + '</a>' : '';
          }).join('') + '</div></aside>' : '') +
        '</div>' +
        '<nav class="pager">' +
          '<a href="#/work/' + enc(workId(prev)) + '"><span class="label">Prev</span><span>' + bk(prev.title) + '</span></a>' +
          '<a href="#/work/' + enc(workId(next)) + '" class="pager-next"><span class="label">Next</span><span>' + bk(next.title) + '</span></a>' +
        '</nav>' +
      '</div>';
  }

  /* ---------- 相簿頁 ---------- */
  function renderAlbum(id) {
    const a = albums.find((x) => String(x.id) === id);
    if (!a) return null;
    const i = albums.indexOf(a);
    const next = albums[(i + 1) % albums.length];
    const portrait = cats.find((c) => c.albums);
    document.title = a.title + '｜' + (a.model || '') + ' — ' + SITE.name;
    return pageHero(img(a.cover || (a.photos || [])[0], 1024), 'Portrait Photoshoot', esc(a.title), a.model ? '模特：' + esc(a.model) : '', '', true) +
      '<div class="wrap page-body">' +
        '<a class="back" href="#/c/' + enc(portrait ? portrait.id : 'all') + '">' + arrow + ' 人像攝影</a>' +
        '<div class="masonry">' + (a.photos || []).map((p, k) =>
          '<button class="shot" type="button" data-lightbox="' + k + '" aria-label="放大第 ' + (k + 1) + ' 張">' +
          picture(img(p, 1024), a.title + ' ' + (k + 1)) + '</button>').join('') + '</div>' +
        (albums.length > 1 ? '<a class="next-block" href="#/album/' + enc(next.id) + '"><span class="label">Next Album</span><span class="next-title">' + esc(next.title) + '｜' + esc(next.model || '') + ' ' + arrow + '</span></a>' : '') +
      '</div>';
  }

  /* ---------- 經歷・獎項 ---------- */
  function renderExperience() {
    document.title = '經歷・獎項 — ' + SITE.name;
    const years = [...new Set(works.filter((w) => w.year).map((w) => Number(w.year)))].sort((a, b) => b - a);
    const awarded = works.filter((w) => (w.awards || []).length);
    const title = (w) => hasPage(w)
      ? '<a href="#/work/' + enc(workId(w)) + '">' + bk(w.title) + '</a>'
      : '<span>' + bk(w.title) + '</span>';
    const bg = (SITE.experiencePhotos || [])[1] || SITE.heroImage;

    return pageHero(img(bg, 1024), 'Experience', '個人工作簡歷<span class="h1-en">Work Experience</span>', '') +
      '<div class="wrap page-body">' +
        '<div class="timeline">' + years.map((y) =>
          '<section class="year-block"><h2 class="year">' + y + '</h2><ul>' +
          works.filter((w) => Number(w.year) === y).map((w) =>
            '<li class="' + (hasPage(w) ? 'has-page' : '') + '">' + title(w) +
            '<span class="t-type">' + esc([w.type, w.note].filter(Boolean).join('・')) + '</span>' +
            '<span class="t-roles">' + esc(rolesText(w)) + '</span></li>').join('') +
          '</ul></section>').join('') +
        '</div>' +
        ((SITE.experiencePhotos || []).length ? '<div class="strip" aria-label="工作照">' +
          SITE.experiencePhotos.map((p) => picture(img(p, 1024), '工作照')).join('') + '</div>' : '') +

        '<div class="awards-sec" id="awards">' + secTitle('Awards', '獎項') +
        '<ul class="award-list">' + awarded.map((w) => w.awards.map((a) =>
          '<li><span class="a-name">' + esc(a) + '</span>' + title(w) + '</li>').join('')).join('') + '</ul>' +
        ((SITE.awardPhotos || []).length ? '<div class="photo-grid">' +
          SITE.awardPhotos.map((p, k) => '<button class="shot" type="button" data-lightbox="' + k + '" data-set="awards" aria-label="放大照片">' +
            picture(img(p, 1024), '獎項照片') + '</button>').join('') + '</div>' : '') +
        '</div>' +
      '</div>';
  }

  /* ---------- 關於我 ---------- */
  function renderAbout() {
    const a = SITE.about || {};
    document.title = '關於我 — ' + SITE.name;
    return pageHero(img(a.photo, 2048), 'About', esc(SITE.nameZh) + '<span class="h1-en">' + esc(SITE.name) + '</span>', esc(a.school || ''), '', true) +
      '<div class="wrap page-body about">' +
        '<div class="about-grid">' +
          '<div class="about-card">' +
            (a.position ? '<p class="label">Position</p><p>' + esc(a.position) + '</p>' : '') +
            (a.skills ? '<p class="label">Skills</p><p>' + esc(a.skills) + '</p>' : '') +
            (SITE.requestForm ? btn(SITE.requestForm, '影片需求調查單', true) : '') +
          '</div>' +
          '<div class="bio"><p class="label">自我介紹</p>' + (a.bio || []).map((b) =>
            typeof b === 'object' && b ? '<blockquote>「' + esc(b.quote) + '」</blockquote>' : '<p>' + esc(b) + '</p>').join('') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- 頁尾 ---------- */
  function renderFooter() {
    const c = SITE.contact || {};
    const links = [];
    if (c.instagram) links.push(['Instagram', 'https://www.instagram.com/' + c.instagram + '/']);
    if (c.youtube) links.push(['YouTube', c.youtube]);
    if (SITE.requestForm) links.push(['影片需求調查單', SITE.requestForm]);
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-col">' +
          '<p class="label">About Me</p>' +
          '<p class="footer-text">' + esc(SITE.intro) + '</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<a class="brand footer-brand" href="#/"><b>' + esc(SITE.name) + '</b> Filmmaking</a>' +
          '<ul class="footer-contact">' +
            (c.phone ? '<li>Tel：<a href="tel:' + esc(c.phone) + '">' + esc(c.phone) + '</a></li>' : '') +
            (c.email ? '<li>Email：<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></li>' : '') +
          '</ul>' +
          '<div class="socials">' + links.map((l) => '<a class="btn btn-sm" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>').join('') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(SITE.name) + ' Filmmaking. All rights reserved.</span>' +
      '<span>Taipei <time id="clock"></time></span></div>';
    const clock = document.getElementById('clock');
    const fmt = new Intl.DateTimeFormat('zh-TW', { timeZone: 'Asia/Taipei', hour: 'numeric', minute: '2-digit', second: '2-digit' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- 路由（網址 #/… 對應到哪一頁） ---------- */
  const routes = [
    [/^\/?$/, renderHome],
    [/^\/c\/(.+)$/, renderCategory],
    [/^\/work\/(.+)$/, renderWork],
    [/^\/album\/(.+)$/, renderAlbum],
    [/^\/experience$/, renderExperience],
    [/^\/about$/, renderAbout],
  ];
  let lastCat = 'all';
  const scrollMemory = {};
  let freshNav = false;
  let currentKey = '';

  function currentPath() {
    let h = location.hash.replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) {}
    return h || '/';
  }

  function render() {
    const path = currentPath();
    let html = null;
    document.title = SITE.name + ' — Filmmaking Portfolio';
    for (const [re, fn] of routes) {
      const m = path.match(re);
      if (m) { html = fn(m[1]); break; }
    }
    if (html == null) { html = renderHome(); }
    app.innerHTML = html;
    app.classList.remove('fade'); void app.offsetWidth; app.classList.add('fade');

    const section = path.split('/')[1] || '';
    document.querySelectorAll('[data-nav]').forEach((a) => {
      a.classList.toggle('is-active', a.dataset.nav === section);
    });

    const key = location.hash || '#/';
    const y = !freshNav && scrollMemory[key] != null ? scrollMemory[key] : 0;
    window.scrollTo(0, y);
    freshNav = false;
    currentKey = key;
    if (typeof onScroll === 'function') onScroll();
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('scroll', () => { if (currentKey) scrollMemory[currentKey] = window.scrollY; }, { passive: true });

  /* ---------- 點擊事件：影片播放、相片放大、往下捲 ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link) { freshNav = true; return; }

    const yt = e.target.closest('[data-yt]');
    if (yt && !yt.querySelector('iframe')) {
      yt.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + yt.dataset.yt +
        '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + yt.dataset.title +
        '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>';
      return;
    }

    const shot = e.target.closest('[data-lightbox]');
    if (shot) {
      const group = shot.dataset.set === 'awards'
        ? SITE.awardPhotos
        : ((albums.find((a) => '/album/' + a.id === currentPath()) || {}).photos || []);
      openLightbox(group, Number(shot.dataset.lightbox));
      return;
    }

    const sc = e.target.closest('[data-scroll]');
    if (sc) {
      const el = document.getElementById(sc.dataset.scroll);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* ---------- 相片檢視 ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCount = lb.querySelector('.lb-count');
  let lbList = [], lbIndex = 0, lbReturn = null;

  function showLb() {
    // 先顯示已載入的小圖，大圖載好再換上
    const src = lbList[lbIndex];
    lbImg.src = img(src, 1024);
    const hi = new Image();
    hi.onload = () => { if (lbList[lbIndex] === src && !lb.hidden) lbImg.src = hi.src; };
    hi.src = img(src, 2048);
    lbCount.textContent = (lbIndex + 1) + ' / ' + lbList.length;
  }
  function openLightbox(list, i) {
    if (!list.length) return;
    lbReturn = document.activeElement;
    lbList = list; lbIndex = i; showLb();
    lb.hidden = false; document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.style.overflow = ''; lbImg.removeAttribute('src');
    if (lbReturn) lbReturn.focus();
  }
  const step = (d) => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); };
  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ---------- 頁首：捲動後變成實心、手機選單 ---------- */
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-toggle');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  menuBtn.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelector('.nav').addEventListener('click', () => {
    header.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false');
  });

  /* ---------- 啟動 ---------- */
  const form = document.getElementById('form-link');
  if (SITE.requestForm) form.href = SITE.requestForm; else form.remove();

  // 檢查分類名稱有沒有打錯（只會在瀏覽器的開發者工具顯示）
  works.forEach((w) => (w.categories || []).forEach((c) => {
    if (!catById(c)) console.warn('content.js：作品「' + w.title + '」的分類「' + c + '」不存在，請檢查是否打錯字');
  }));

  renderFooter();
  render();
})();
