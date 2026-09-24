const localeSelect = document.querySelector("#locale-select");
const searchParams = new URLSearchParams(location.search);
const key = searchParams.get("id");
const sourceSection = searchParams.get("from");
const project = window.projectDetails[key];
const validSections = ["business", "works", "rendering"];
const popupMode = searchParams.get("popup") === "1";
const requestedLocale = searchParams.get("lang");

function localized(value, locale) {
  return typeof value === "object" ? value[locale] || value.en || value["zh-Hant"] : value;
}

function fillProjectTitle(element, name) {
  element.replaceChildren(document.createTextNode(name));
}

function formatTeam(value, locale) {
  if (!/^\d+$/.test(value)) return value;
  return locale === "en" ? `${value} people` : locale === "ja" ? `${value}人` : `${value} 人`;
}

function createResponsibilityItem(responsibility) {
  const element = document.createElement("li");
  const label = document.createElement("span");
  if (typeof responsibility === "string") {
    label.textContent = responsibility;
    element.append(label);
    return element;
  }
  label.textContent = responsibility.label;
  element.append(label);
  if (responsibility.items?.length) {
    const nested = document.createElement("ul");
    nested.replaceChildren(...responsibility.items.map(createResponsibilityItem));
    element.append(nested);
  }
  return element;
}

function isGalleryVideo(item) {
  return item.type === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(item.src);
}

function createGalleryItem(item, index) {
  const button = document.createElement("button");
  const video = isGalleryVideo(item);
  button.type = "button";
  button.className = "project-gallery-item";
  button.dataset.index = String(index);
  button.dataset.type = video ? "video" : "image";
  button.setAttribute("aria-label", video ? "Play video" : "View image");
  if (video) {
    const media = document.createElement("img");
    media.src = item.thumb || item.src;
    media.alt = "";
    media.loading = "lazy";
    button.append(media);
  } else {
    const media = document.createElement("img");
    media.src = item.thumb || item.src;
    media.alt = "";
    media.loading = "lazy";
    button.append(media);
  }
  return button;
}

function createMeta(label, value) {
  const item = document.createElement("div");
  const title = document.createElement("span");
  const content = document.createElement("strong");
  title.textContent = label;
  content.textContent = value;
  item.append(title, content);
  return item;
}

function createPlatformMeta(label, value) {
  const item = createMeta(label, "");
  const content = item.querySelector("strong");
  const platforms = [
    ["windows", /Windows|PC/i, "Windows"],
    ["linux", /Linux/i, "Linux"],
    ["apple", /Mac/i, "Mac"],
    ["apple", /iOS/i, "iOS"],
    ["android", /Android/i, "Android"]
  ].filter(([, pattern]) => pattern.test(value));

  content.className = "project-platforms";
  content.setAttribute("aria-label", value);
  if (platforms.length === 0) {
    content.textContent = value;
    return item;
  }

  const icons = platforms.map(([platform, , name]) => {
    const item = document.createElement("span");
    item.className = "project-platform";
    const icon = document.createElement("i");
    icon.className = "platform-icon";
    icon.dataset.source = platform;
    icon.title = name;
    icon.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.textContent = name;
    item.append(icon, text);
    return item;
  });
  icons.forEach((icon, index) => content.append(index ? " | " : "", icon));
  return item;
}

function renderProject(locale) {
  const translations = window.siteTranslations[locale] || window.siteTranslations.en;
  const copy = project.copy[locale] || project.copy.en;
  const name = localized(project.name, locale);
  const commercial = Boolean(project.company);
  const backSection = validSections.includes(sourceSection) ? sourceSection : commercial ? "business" : "works";
  const media = document.querySelector("[data-project-media]");
  const image = media.querySelector("img");
  const video = media.querySelector("video");

  document.documentElement.lang = locale;
  document.title = `${name} — Zero`;
  document.querySelector("[data-detail-name]").textContent = translations.name;
  const backLink = document.querySelector("[data-detail-back]").closest("a");
  backLink.href = `/#${backSection}`;
  backLink.setAttribute("aria-label", translations.backProjects);
  document.querySelector("[data-detail-back]").textContent = translations.backProjects;
  document.querySelectorAll("[data-project-name]").forEach((element) => {
    fillProjectTitle(element, name);
  });
  const yearElem = document.querySelector("[data-project-year]");
  if (yearElem) {
    yearElem.hidden = true;
    yearElem.textContent = "";
  }
  document.querySelector("[data-detail-overview]").textContent = translations.projectOverview;
  document.querySelector("[data-detail-intro]").textContent = translations.projectIntro;
  document.querySelector("[data-detail-role]").textContent = translations.projectRole;
  document.querySelector("[data-detail-gallery]").textContent = translations.projectGallery;
  document.querySelector("[data-detail-achievements]").textContent = translations.projectAchievements;
  document.querySelector("[data-detail-external-links]").textContent = translations.projectExternalLinks;
  document.querySelector("[data-project-intro]").textContent = copy.intro || "";
  const storySection = document.querySelector(".project-detail-story");
  if (storySection) storySection.hidden = !copy.intro;
  media.dataset.project = key;
  media.dataset.title = name;
  media.classList.toggle("is-work-preview", !commercial);
  // ponytail: no media → same card placeholders; CSS swaps dark/light via data-theme
  const placeholderDark = "/img/projects/project-placeholder-v2.png";
  const placeholderLight = "/img/projects/project-placeholder-light.png";
  const usingPlaceholder = !project.media;
  media.classList.toggle("work-placeholder", usingPlaceholder);
  let lightImg = media.querySelector("img.work-preview--light");
  if (usingPlaceholder) {
    if (!lightImg) {
      lightImg = document.createElement("img");
      lightImg.className = "work-preview work-preview--light";
      lightImg.alt = "";
      image.after(lightImg);
    }
    image.className = "work-preview work-preview--dark";
    image.hidden = false;
    image.src = placeholderDark;
    image.alt = "";
    lightImg.hidden = false;
    lightImg.src = placeholderLight;
  } else {
    image.className = "";
    image.hidden = false;
    image.src = project.media;
    image.alt = `${name} preview`;
    if (lightImg) {
      lightImg.hidden = true;
      lightImg.removeAttribute("src");
    }
  }
  // 個游 Popup 不播頂部 Video Preview；商業專案才啟用
  const heroVideo = project.company ? project.video : "";
  video.hidden = !heroVideo;
  video.src = heroVideo || "";
  video.loop = !(Number.isFinite(project.previewStart) && Number.isFinite(project.previewEnd));
  if (heroVideo && Number.isFinite(project.previewStart)) video.dataset.previewStart = String(project.previewStart);
  else delete video.dataset.previewStart;
  if (heroVideo && Number.isFinite(project.previewEnd)) video.dataset.previewEnd = String(project.previewEnd);
  else delete video.dataset.previewEnd;

  const meta = [
    [translations.commercialCompany, localized(project.company, locale)],
    [translations.projectEngine, project.engine],
    [translations.commercialRole, localized(project.position, locale)],
    [translations.projectTeam, formatTeam(localized(project.team, locale), locale)],
    [translations.projectDuration, localized(project.duration, locale)],
    [translations.projectPlatform, project.platform]
  ].filter(([, value]) => value);
  document.querySelector("[data-project-meta]").replaceChildren(...meta.map(([label, value]) =>
    label === translations.projectPlatform ? createPlatformMeta(label, value) : createMeta(label, value)));

  const genreText = (project.genres || []).map((genre) => translations[genre] || genre).join(" · ");
  document.querySelectorAll("[data-project-genres]").forEach((element) => {
    if (element.closest(".project-detail-hero-overlay")) {
      element.hidden = true;
      element.textContent = "";
      return;
    }
    element.textContent = genreText;
  });

  document.querySelector("[data-project-role]").replaceChildren(
    ...(copy.responsibilities || [copy.role]).filter(Boolean).map(createResponsibilityItem)
  );
  const roleSection = document.querySelector(".project-detail-responsibility");
  if (roleSection) roleSection.hidden = !document.querySelector("[data-project-role]").children.length;

  const gallery = (project.gallery || []).filter((item) => item?.src);
  const gallerySection = document.querySelector("[data-project-gallery-section]");
  gallerySection.hidden = gallery.length === 0;
  document.querySelector("[data-project-gallery]").replaceChildren(
    ...gallery.map((item, index) => createGalleryItem(item, index))
  );

  const achievements = copy.achievements || [];
  const achievementSection = document.querySelector("[data-project-achievements-section]");
  achievementSection.hidden = achievements.length === 0;
  document.querySelector("[data-project-achievements]").replaceChildren(...achievements.map((achievement) => {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    title.textContent = achievement.title;
    description.textContent = achievement.description;
    card.append(title, description);
    return card;
  }));

  const links = document.querySelector("[data-project-links]");
  links.replaceChildren(...(project.links || []).map((link) => {
    const element = document.createElement("a");
    element.href = link.url;
    element.target = "_blank";
    element.rel = "noreferrer";
    element.className = "commercial-meta-link";
    element.title = link.label;
    element.setAttribute("aria-label", link.label);
    const icon = document.createElement("i");
    icon.className = "platform-icon";
    icon.dataset.source = link.source;
    icon.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = link.label;
    const jump = document.createElement("i");
    jump.className = "nav-jump-icon";
    jump.setAttribute("aria-hidden", "true");
    element.append(icon, label, jump);
    return element;
  }));
  document.querySelector("[data-project-links-section]").hidden = !(project.links || []).length;

  const groupKeys = Object.keys(window.projectDetails)
    .filter((projectKey) => Boolean(window.projectDetails[projectKey].company) === commercial);
  const currentIndex = groupKeys.indexOf(key);
  const hasSiblings = groupKeys.length > 1;
  const previousKey = currentIndex > 0 ? groupKeys[currentIndex - 1] : null;
  const nextKey = currentIndex >= 0 && currentIndex < groupKeys.length - 1 ? groupKeys[currentIndex + 1] : null;
  const navigation = document.querySelector("[data-project-navigation]");
  navigation.hidden = !hasSiblings;

  const configureLink = (selector, nameSelector, targetKey) => {
    const link = document.querySelector(selector);
    const hidden = !targetKey;
    link.classList.toggle("is-hidden", hidden);
    link.setAttribute("aria-hidden", String(hidden));
    if (hidden) {
      link.removeAttribute("href");
      document.querySelector(nameSelector).textContent = "";
      return;
    }
    link.href = `/projects/?id=${encodeURIComponent(targetKey)}&from=${commercial ? "business" : "works"}${popupMode ? "&popup=1" : ""}&lang=${encodeURIComponent(locale)}`;
    document.querySelector(nameSelector).textContent = localized(window.projectDetails[targetKey].name, locale);
  };

  if (hasSiblings) {
    configureLink("[data-project-previous]", "[data-project-previous-name]", previousKey);
    configureLink("[data-project-next]", "[data-project-next-name]", nextKey);
  }
  document.querySelector("[data-detail-previous]").textContent = translations.previousProject;
  document.querySelector("[data-detail-next]").textContent = translations.nextProject;
}

const lightbox = document.querySelector("[data-project-lightbox]");
const lightboxImage = lightbox.querySelector("img");
const lightboxVideo = lightbox.querySelector("video");
const lightboxCounter = lightbox.querySelector("[data-lightbox-counter]");
let lightboxIndex = 0;

function galleryItems() {
  return (project?.gallery || []).filter((item) => item?.src);
}

function showLightbox(index) {
  const items = galleryItems();
  if (!items.length) return;
  lightboxIndex = (index + items.length) % items.length;
  const item = items[lightboxIndex];
  const video = isGalleryVideo(item);
  if (video) {
    lightboxImage.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxVideo.hidden = false;
    lightboxVideo.src = item.src;
    lightboxVideo.volume = 0.5;
    lightboxVideo.load();
    lightboxVideo.play().catch(() => {});
  } else {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
    lightboxVideo.hidden = true;
    lightboxImage.hidden = false;
    lightboxImage.src = item.src;
    lightboxImage.alt = "";
  }
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${items.length}`;
  lightbox.querySelector("[data-lightbox-prev]").hidden = items.length < 2;
  lightbox.querySelector("[data-lightbox-next]").hidden = items.length < 2;
  if (!lightbox.open) lightbox.showModal();
}

function closeLightbox() {
  lightboxVideo.pause();
  lightbox.close();
}

if (!project) {
  location.replace("/#works");
} else {
  document.documentElement.classList.toggle("project-popup-root", popupMode);
  document.body.classList.toggle("project-popup-page", popupMode);
  const savedLocale = localStorage.getItem("zero-portfolio-locale") || localStorage.getItem("zero-locale");
  localeSelect.value = window.siteTranslations[requestedLocale] ? requestedLocale : window.siteTranslations[savedLocale] ? savedLocale : window.detectLocale();
  localeSelect.addEventListener("change", () => {
    localStorage.setItem("zero-portfolio-locale", localeSelect.value);
    renderProject(localeSelect.value);
  });
  renderProject(localeSelect.value);
  const media = document.querySelector("[data-project-media]");
  const video = media.querySelector("video");
  let previewTimer;
  const previewStart = () => {
    const start = Number(video.dataset.previewStart);
    return Number.isFinite(start) ? start : 0;
  };
  const previewEnd = () => {
    const end = Number(video.dataset.previewEnd);
    return Number.isFinite(end) ? end : null;
  };
  const loopSegment = () => {
    const end = previewEnd();
    if (end != null && video.currentTime >= end) video.currentTime = previewStart();
  };
  media.addEventListener("pointerenter", () => {
    if (!video.src || video.hidden) return;
    previewTimer = setTimeout(() => {
      video.currentTime = previewStart();
      video.play()
        .then(() => media.classList.add("is-playing"))
        .catch(() => {});
    }, 1000);
  });
  media.addEventListener("pointerleave", () => {
    clearTimeout(previewTimer);
    media.classList.remove("is-playing");
    video.pause();
    video.currentTime = previewStart();
  });
  video.addEventListener("timeupdate", loopSegment);
  document.querySelector("[data-project-gallery]").addEventListener("click", (event) => {
    const item = event.target.closest("[data-index]");
    if (!item) return;
    showLightbox(Number(item.dataset.index));
  });
  lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => showLightbox(lightboxIndex - 1));
  lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => showLightbox(lightboxIndex + 1));
  lightbox.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
  });
  lightbox.addEventListener("close", () => {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
  });
  addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") showLightbox(lightboxIndex - 1);
    if (event.key === "ArrowRight") showLightbox(lightboxIndex + 1);
  });
  if (popupMode) {
    const scrollbar = document.querySelector(".project-popup-scrollbar");
    const thumb = scrollbar.querySelector("i");
    const updateScrollbar = () => {
      const height = document.documentElement.scrollHeight;
      thumb.style.height = `${innerHeight / height * 100}%`;
      thumb.style.top = `${scrollY / height * 100}%`;
    };
    addEventListener("scroll", updateScrollbar, { passive: true });
    addEventListener("resize", updateScrollbar);
    updateScrollbar();
  }
  document.querySelector(".project-back").addEventListener("click", (event) => {
    if (popupMode && parent !== window) {
      event.preventDefault();
      parent.postMessage("close-project-popup", location.origin);
      return;
    }
    if (!document.referrer) return;
    const referrer = new URL(document.referrer);
    if (referrer.origin !== location.origin || referrer.pathname !== "/") return;
    event.preventDefault();
    history.back();
  });
}
