const blogTranslations = {
  en: {
    skip: "Skip to content", personalHome: "Homepage", search: "Search", language: "Language", name: "ZERO", blog: "BLOG",
    siteTitle: "Zero - Blog", titleBrand: "Zero",
    blogDescription: "Game development, graphics programming and the notes behind the work.", category: "CATEGORY",
    categoryDescription: "Articles filed under this category.", tag: "TAG", tagDescription: "Articles connected by this tag.",
    categories: "CATEGORIES", tags: "TAGS", searchAll: "SEARCH ALL ARTICLES", pinned: "PINNED",
    onThisPage: "ON THIS PAGE", noSections: "No sections", allArticles: "All Articles", created: "CREATED", updated: "UPDATED",
    previousPost: "PREVIOUS POST", nextPost: "NEXT POST",
    readArticle: "READ ARTICLE", backPortfolio: "BACK TO PORTFOLIO", backTop: "BACK TO TOP",
    readingMode: "Reading mode", exitReadingMode: "Exit reading mode",
    searchArticles: "SEARCH ARTICLES", close: "CLOSE", clearSearch: "Clear", searchPlaceholder: "Unity, DirectX, rendering…", copyCode: "COPY", copied: "COPIED",
    searchHint: "Search titles and summaries. Prefix tags with #, e.g. #Unity.", recentArticles: "Recent articles", previous: "PREV", next: "NEXT", pageNumber: "PAGE", jump: "JUMP", found: (count) => `${count} article${count === 1 ? "" : "s"} found`
  },
  "zh-Hant": {
    skip: "跳至主要內容", personalHome: "個人主頁", search: "搜尋", language: "語言", name: "零", blog: "BLOG",
    siteTitle: "零 - Blog", titleBrand: "零",
    blogDescription: "遊戲開發、圖形程式設計，以及作品背後的技術筆記。", category: "分類", categoryDescription: "此分類下的文章。",
    tag: "標籤", tagDescription: "使用此標籤的文章。", categories: "分類", tags: "標籤",
    searchAll: "搜尋全部文章", pinned: "置頂", onThisPage: "本文目錄", noSections: "無章節", allArticles: "全部文章",
    created: "建立時間", updated: "更新時間", previousPost: "上一篇文章", nextPost: "下一篇文章",
    readArticle: "前往閱讀", backPortfolio: "返回首頁", backTop: "返回 TOP",
    readingMode: "閱讀模式", exitReadingMode: "關閉閱讀模式",
    searchArticles: "搜尋文章", close: "關閉", clearSearch: "清除", searchPlaceholder: "Unity、DirectX、渲染…", copyCode: "複製", copied: "已複製",
    searchHint: "搜尋標題與摘要；搜尋標籤請加上 #，例如 #Unity。", recentArticles: "最新文章", previous: "上一頁", next: "下一頁", pageNumber: "頁碼", jump: "跳轉", found: (count) => `找到 ${count} 篇文章`
  },
  "zh-Hans": {
    skip: "跳至主要内容", personalHome: "个人主页", search: "搜索", language: "语言", name: "零", blog: "BLOG",
    siteTitle: "零 - Blog", titleBrand: "零",
    blogDescription: "游戏开发、图形编程，以及作品背后的技术笔记。", category: "分类", categoryDescription: "此分类下的文章。",
    tag: "标签", tagDescription: "使用此标签的文章。", categories: "分类", tags: "标签",
    searchAll: "搜索全部文章", pinned: "置顶", onThisPage: "本文目录", noSections: "无章节", allArticles: "全部文章",
    created: "创建时间", updated: "更新时间", previousPost: "上一篇文章", nextPost: "下一篇文章",
    readArticle: "前往阅读", backPortfolio: "返回首页", backTop: "返回 TOP",
    readingMode: "阅读模式", exitReadingMode: "关闭阅读模式",
    searchArticles: "搜索文章", close: "关闭", clearSearch: "清除", searchPlaceholder: "Unity、DirectX、渲染…", copyCode: "复制", copied: "已复制",
    searchHint: "搜索标题与摘要；搜索标签请加上 #，例如 #Unity。", recentArticles: "最新文章", previous: "上一页", next: "下一页", pageNumber: "页码", jump: "跳转", found: (count) => `找到 ${count} 篇文章`
  },
  ja: {
    skip: "メインコンテンツへ", personalHome: "個人ホーム", search: "検索", language: "言語", name: "零", blog: "BLOG",
    siteTitle: "零 - Blog", titleBrand: "零",
    blogDescription: "ゲーム開発、グラフィックスプログラミング、作品の背景にある技術ノート。", category: "カテゴリー",
    categoryDescription: "このカテゴリーの記事です。", tag: "タグ", tagDescription: "このタグの記事です。", categories: "カテゴリー",
    tags: "タグ", searchAll: "すべての記事を検索", pinned: "固定", onThisPage: "目次",
    noSections: "セクションなし", allArticles: "すべての記事", created: "作成日", updated: "更新日",
    previousPost: "前の記事", nextPost: "次の記事",
    readArticle: "記事を読む", backPortfolio: "ホームへ戻る", backTop: "TOP へ戻る",
    readingMode: "読書モード", exitReadingMode: "読書モードを終了",
    searchArticles: "記事を検索", close: "閉じる", clearSearch: "クリア", copyCode: "コピー", copied: "コピー済み",
    searchPlaceholder: "Unity、DirectX、レンダリング…", searchHint: "タイトルと要約を検索。タグは # を付けて検索（例: #Unity）。",
    recentArticles: "最新記事", previous: "前へ", next: "次へ", pageNumber: "ページ", jump: "移動", found: (count) => `${count} 件の記事`
  }
};

const header = document.querySelector(".blog-header");
const localeSelect = document.querySelector("#blog-locale-select");
const themeToggle = document.querySelector("[data-theme-toggle]");
const readingToggle = document.querySelector("[data-reading-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const backToTop = document.querySelector(".back-to-top");
const footer = document.querySelector(".blog-footer");
const searchDialog = document.querySelector("[data-search-dialog]");
const searchInput = document.querySelector("[data-search-input]");
const searchClear = document.querySelector("[data-search-clear]");
const searchResults = document.querySelector("[data-search-results]");
const searchStatus = document.querySelector("[data-search-status]");
const searchData = JSON.parse(document.querySelector("#search-data")?.textContent || "[]");
let currentCopy = blogTranslations.en;
let suppressBackTop = false;

function applyTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  themeToggle?.setAttribute("aria-pressed", String(isLight));
  themeToggle?.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeColor?.setAttribute("content", isLight ? "#f3efe9" : "#171717");
  localStorage.setItem("zero-blog-theme", isLight ? "light" : "dark");
}

function applyReadingMode(enabled, { animate = false } = {}) {
  const on = Boolean(enabled);
  if (animate && readingToggle && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    readingToggle.classList.add("is-toggling");
    clearTimeout(readingToggle._toggleTimer);
    readingToggle._toggleTimer = setTimeout(() => readingToggle.classList.remove("is-toggling"), 180);
  }
  document.documentElement.dataset.reading = on ? "1" : "";
  readingToggle?.setAttribute("aria-pressed", String(on));
  readingToggle?.setAttribute("aria-label", on ? currentCopy.exitReadingMode : currentCopy.readingMode);
  localStorage.setItem("zero-blog-reading", on ? "1" : "0");
}

function detectLocale(languages = navigator.languages?.length ? navigator.languages : [navigator.language]) {
  for (const language of languages) {
    const value = language.toLowerCase();
    if (value.startsWith("zh")) return /(hant|tw|hk|mo)/.test(value) ? "zh-Hant" : "zh-Hans";
    if (value.startsWith("ja")) return "ja";
    if (value.startsWith("en")) return "en";
  }
  return "en";
}

function applyDocumentTitle(locale) {
  const raw = document.querySelector("#blog-doc-title")?.textContent;
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data.site) {
      document.title = currentCopy.siteTitle;
      return;
    }
    const label = data.titles?.[locale] || data.titles?.en || data.label || "";
    document.title = label ? `${label} - ${currentCopy.titleBrand}` : currentCopy.siteTitle;
  } catch {}
}

function applyLocale(locale) {
  currentCopy = blogTranslations[locale] || blogTranslations.en;
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-blog-i18n]").forEach((element) => {
    const value = currentCopy[element.dataset.blogI18n];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-blog-i18n-placeholder]").forEach((element) => {
    element.placeholder = currentCopy[element.dataset.blogI18nPlaceholder];
  });
  document.querySelectorAll("[data-blog-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", currentCopy[element.dataset.blogI18nAriaLabel]);
  });
  applyDocumentTitle(locale);
  localeSelect.value = locale;
  activateLanguageTab(locale);
  if (readingToggle) {
    applyReadingMode(localStorage.getItem("zero-blog-reading") !== "0");
    requestAnimationFrame(() => document.querySelector(".post-layout")?.classList.add("is-ready"));
  }
  if (searchDialog.open) renderSearch(searchInput.value);
}

function updateHeader() {
  header?.classList.toggle("scrolled", scrollY > 12);
  if (scrollY <= 120) suppressBackTop = false;
  backToTop?.classList.toggle("is-visible", !suppressBackTop && scrollY > 120);
  const footerOffset = Math.max(0, innerHeight - footer.getBoundingClientRect().top + 8);
  document.documentElement.style.setProperty("--footer-offset", footerOffset + "px");
}

function normalize(value) {
  return value.toLocaleLowerCase().normalize("NFKC");
}

function createSearchResult(article) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  const preview = document.createElement("span");
  const media = document.createElement("img");
  const copy = document.createElement("span");
  const date = document.createElement("time");
  const title = document.createElement("strong");
  const excerpt = document.createElement("span");

  link.href = article.url;
  preview.className = "search-preview";
  media.src = article.preview || "/img/og-portfolio.png";
  media.alt = "";
  preview.append(media);
  date.textContent = article.date;
  title.textContent = article.titles?.[localeSelect.value] || article.title;
  excerpt.className = "search-excerpt";
  excerpt.textContent = article.summaries?.[localeSelect.value] || article.excerpt;
  copy.append(date, title, excerpt);
  link.append(preview, copy);
  item.append(link);
  return item;
}

function renderSearch(query = "") {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const matches = (terms.length
    ? searchData.filter((article) => {
      const text = normalize([
        article.title,
        article.excerpt,
        ...Object.values(article.titles || {}),
        ...Object.values(article.summaries || {}),
        ...article.tags.map((tag) => `#${tag}`),
        ...article.categories
      ].join(" "));
      return terms.every((term) => text.includes(term));
    })
    : searchData
  ).slice(0, 5);

  searchResults.replaceChildren(...matches.map(createSearchResult));
  searchStatus.textContent = terms.length ? currentCopy.found(matches.length) : currentCopy.recentArticles;
}

const savedLocale = localStorage.getItem("zero-blog-locale") || localStorage.getItem("zero-locale");
const initialLocale = blogTranslations[savedLocale] ? savedLocale : detectLocale();
localeSelect.value = initialLocale;
localeSelect.addEventListener("change", () => {
  localStorage.setItem("zero-blog-locale", localeSelect.value);
  applyLocale(localeSelect.value);
});
themeToggle?.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});
readingToggle?.addEventListener("click", () => {
  applyReadingMode(document.documentElement.dataset.reading !== "1", { animate: true });
});

document.querySelector("[data-page-jump]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const number = Number(form.querySelector("input").value);
  const total = Number(form.dataset.pageTotal);
  if (!Number.isInteger(number) || number < 1 || number > total) return;
  location.href = number === 1 ? form.dataset.pageBase : `${form.dataset.pageBase}${form.dataset.pageDir}/${number}/`;
});

const articleContent = document.querySelector(".post-content");
if (articleContent) {
  articleContent.querySelectorAll("figure.highlight, pre:not(figure.highlight pre)").forEach((block) => {
    if (block.closest(".code-block")) return;
    const code = block.querySelector(".code")?.innerText || block.querySelector("code")?.innerText || block.innerText;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.dataset.blogI18nAriaLabel = "copyCode";
    button.setAttribute("aria-label", "COPY");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code);
        button.classList.add("is-copied");
        button.setAttribute("aria-label", currentCopy.copied);
        setTimeout(() => {
          button.classList.remove("is-copied");
          button.setAttribute("aria-label", currentCopy.copyCode);
        }, 1200);
      } catch {
        button.setAttribute("aria-label", currentCopy.copyCode);
      }
    });
    // ponytail: shell stays put; only inner block scrolls, so copy doesn't drift
    const shell = document.createElement("div");
    shell.className = "code-block";
    block.replaceWith(shell);
    shell.append(block, button);
  });

  const walker = document.createTreeWalker(articleContent, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.parentElement.closest("code, pre, kbd, samp, script, style, .katex") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    node.nodeValue = node.nodeValue
      .replace(/([\p{Script=Han}])([A-Za-z0-9])/gu, "$1 $2")
      .replace(/([A-Za-z0-9])([\p{Script=Han}])/gu, "$1 $2");
  });
}

document.querySelectorAll("[data-search-open]").forEach((button) => {
  button.addEventListener("click", () => {
    renderSearch(searchInput.value);
    syncSearchClear();
    searchDialog.showModal();
    searchInput.focus();
  });
});

document.querySelector("[data-search-close]")?.addEventListener("click", () => searchDialog.close());
searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) searchDialog.close();
});
function syncSearchClear() {
  if (searchClear) searchClear.hidden = !searchInput?.value;
}
searchInput?.addEventListener("input", () => {
  syncSearchClear();
  renderSearch(searchInput.value);
});
searchClear?.addEventListener("click", () => {
  searchInput.value = "";
  syncSearchClear();
  renderSearch("");
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
  if (event.key === "/" && !typing && !searchDialog.open) {
    event.preventDefault();
    renderSearch();
    syncSearchClear();
    searchDialog.showModal();
    searchInput.focus();
  }
});

function activateTab(button) {
  const tabs = button.closest(".tabs");
  const target = tabs?.querySelector(button.dataset.href);
  if (!target) return;
  tabs.querySelectorAll(".tab, .tab-item-content").forEach((item) => item.classList.remove("active"));
  button.closest(".tab").classList.add("active");
  target.classList.add("active");
  rebuildToc();
}

function activateLanguageTab(locale) {
  const labels = { "zh-Hant": "繁體中文", "zh-Hans": "简体中文", en: "English", ja: "日本語" };
  [...document.querySelectorAll(".tabs .nav-tabs button")]
    .filter((item) => item.textContent.trim() === labels[locale])
    .forEach(activateTab);
}

document.querySelectorAll(".tabs").forEach((tabs) => {
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".nav-tabs button");
    if (button) activateTab(button);
  });
});

function improveHighlight() {
  if (!articleContent) return;
  articleContent.querySelectorAll("figure.highlight, pre").forEach((block) => {
    block.setAttribute("lang", "zh-Hant");
  });
  articleContent.querySelectorAll("figure.highlight .code .line").forEach((line) => {
    if (line.dataset.highlightReady) return;
    line.dataset.highlightReady = "1";
    line.querySelectorAll(".built_in").forEach((token) => {
      const prev = token.previousSibling;
      if (prev?.nodeType === Node.TEXT_NODE && /\.\s*$/.test(prev.textContent)) {
        token.classList.remove("built_in");
        token.classList.add("function");
      }
    });
    [...line.childNodes].forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE || !/[A-Z]/.test(node.textContent)) return;
      const text = node.textContent;
      const frag = document.createDocumentFragment();
      const pattern = /[A-Z][A-Za-z0-9_]*/g;
      let cursor = 0;
      let match;
      while ((match = pattern.exec(text))) {
        const name = match[0];
        const start = match.index;
        const before = text.slice(0, start);
        const after = text.slice(start + name.length);
        if (start > cursor) frag.append(document.createTextNode(text.slice(cursor, start)));
        if (!/\.\s*$/.test(before) && /^\s+[A-Za-z_]/.test(after)) {
          const span = document.createElement("span");
          span.className = "type";
          span.textContent = name;
          frag.append(span);
        } else {
          frag.append(document.createTextNode(name));
        }
        cursor = start + name.length;
      }
      if (cursor === 0) return;
      if (cursor < text.length) frag.append(document.createTextNode(text.slice(cursor)));
      node.replaceWith(frag);
    });
  });
}

function addImageCaptions() {
  if (!articleContent) return;
  articleContent.querySelectorAll("img[alt]").forEach((img) => {
    if (img.closest("table, .img-alt")) return;
    const alt = img.getAttribute("alt")?.trim();
    if (!alt) return;
    const wrap = img.parentElement?.tagName === "P" && img.parentElement.childElementCount === 1
      ? img.parentElement
      : img;
    if (wrap.nextElementSibling?.classList.contains("img-alt")) return;
    const caption = document.createElement("div");
    caption.className = "img-alt is-center";
    caption.textContent = alt;
    wrap.after(caption);
  });
}

const imageLightbox = document.createElement("dialog");
imageLightbox.className = "image-lightbox";
imageLightbox.innerHTML = "<img alt=\"\"><div class=\"image-lightbox-caption\" hidden></div>";
document.body.append(imageLightbox);
const lightboxImage = imageLightbox.querySelector("img");
const lightboxCaption = imageLightbox.querySelector(".image-lightbox-caption");

articleContent?.addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img || !articleContent.contains(img)) return;
  const caption = img.getAttribute("alt")?.trim() || "";
  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightboxCaption.hidden = !caption;
  imageLightbox.showModal();
});

imageLightbox.addEventListener("click", (event) => {
  if (event.target === imageLightbox || event.target === lightboxImage) imageLightbox.close();
});

function rebuildToc() {
  if (!articleContent) return;
  const headings = [...articleContent.querySelectorAll("h1, h2, h3, h4")]
    .filter((heading) => !heading.closest(".tab-item-content") || heading.closest(".tab-item-content").classList.contains("active"));
  const list = document.createElement("ol");
  list.className = "toc";
  const listStack = [list];
  let currentList = list;
  let lastItem;
  let lastLevel = Number(headings[0]?.tagName.slice(1) || 1);
  headings.forEach((heading, index) => {
    const level = Number(heading.tagName.slice(1));
    if (level > lastLevel && lastItem) {
      const child = document.createElement("ol");
      child.className = "toc-child";
      lastItem.append(child);
      listStack.push(child);
      currentList = child;
    } else if (level < lastLevel) {
      for (let depth = level; depth < lastLevel && listStack.length > 1; depth += 1) listStack.pop();
      currentList = listStack.at(-1);
    }

    heading.id = "article-section-" + index;
    const item = document.createElement("li");
    item.className = "toc-item toc-level-" + level;
    const link = document.createElement("a");
    link.className = "toc-link";
    link.href = "#" + heading.id;
    link.textContent = heading.textContent;
    item.append(link);
    currentList.append(item);
    lastItem = item;
    lastLevel = level;
  });
  const tocContent = headings.length ? list : document.createElement("p");
  if (!headings.length) {
    tocContent.dataset.blogI18n = "noSections";
    tocContent.textContent = currentCopy.noSections;
  }
  const desktop = document.querySelector(".toc-rail > div");
  desktop?.querySelectorAll(".toc, :scope > p").forEach((item) => item.remove());
  if (desktop) desktop.append(tocContent);
  const mobile = document.querySelector(".mobile-toc");
  mobile?.querySelectorAll(".toc, :scope > p").forEach((item) => item.remove());
  if (mobile) mobile.append(tocContent.cloneNode(true));
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a.toc-link");
  const id = link?.getAttribute("href")?.slice(1);
  const heading = id ? document.getElementById(id) : null;
  if (!link || !heading || !articleContent?.contains(heading)) return;
  event.preventDefault();
  heading.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", "#" + id);
});

backToTop?.addEventListener("click", () => {
  suppressBackTop = true;
  backToTop.classList.remove("is-visible");
});

addEventListener("scroll", updateHeader, { passive: true });
addEventListener("resize", updateHeader);
applyLocale(initialLocale);
applyTheme(document.documentElement.dataset.theme);
addImageCaptions();
improveHighlight();
rebuildToc();
updateHeader();
