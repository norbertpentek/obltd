// Ez a függvény kapcsolja a 'show' osztályt, ami befolyásolja a menü megjelenítését
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Ha a felhasználó az oldal egy másik részére kattint, rejtse el a legördülő menüt
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
try {
  var _dropImg = document.querySelector(".dropbtn img");
  if (_dropImg) {
    _dropImg.addEventListener("click", function (event) {
      toggleDropdown();
      event.stopPropagation(); // Megakadályozza, hogy az esemény továbbterjedjen
    });
  }
} catch (e) {}

window.onload = function () {
  // Smooth scroll és egyéb kódok...

  // Késleltetés és animáció beállítása a képek beúsztatásához
  const slideInDelay = 100; // 1 milliszekundum késleltetés
  const leftImage = document.querySelector(".images-container img:first-child");
  const rightImage = document.querySelector(".images-container img:last-child");
  if (leftImage && rightImage) {
    leftImage.style.animation = `slideInFromLeft 2s ease-out ${slideInDelay}ms forwards`;
    rightImage.style.animation = `slideInFromRight 2s ease-out ${slideInDelay}ms forwards`;
  }
};

// ===== Menü pozíció váltó (felül ↔ alul) =====
(function () {
  function applyNavPosition(pos) {
    const body = document.body;
    const html = document.documentElement;
    if (!body || !html) return;
    // 1) Állapot osztályok következetesen HTML-en és BODY-n is
    if (pos === "bottom") {
      body.classList.add("nav-bottom");
      body.classList.remove("nav-top");
      html.classList.add("nav-bottom");
      html.classList.remove("nav-top");
    } else {
      body.classList.add("nav-top");
      body.classList.remove("nav-bottom");
      html.classList.add("nav-top");
      html.classList.remove("nav-bottom");
    }
    // 2) Következő frame-ben mérünk magasságot és állítjuk a padding változókat
    requestAnimationFrame(function () {
      const nav = document.querySelector("#nav1, body > nav");
      if (nav) {
        const h = Math.ceil(nav.getBoundingClientRect().height || 50);
        if (pos === "bottom") {
          html.style.setProperty("--nav-safe-bottom", `${h}px`);
          html.style.setProperty("--nav-safe-top", `0px`);
        } else {
          html.style.setProperty("--nav-safe-top", `${h}px`);
          html.style.setProperty("--nav-safe-bottom", `0px`);
        }
      }
    });
  }

  function ensureToggleButton() {
    // Csak a főoldalon (ahol #nav1 van) jelenjen meg a látható ⇵ kapcsoló
    const nav = document.querySelector("#nav1");
    if (!nav) return;
    const ul = nav.querySelector("ul");
    if (!ul) return;
    if (ul.querySelector("#menuPosToggle")) return; // már létezik

    // Keresd meg a Contact Us elemet, és utána szúrj be egy gombot
    const items = Array.from(ul.querySelectorAll("li"));
    let insertAfter = items.find((li) =>
      (li.textContent || "").toLowerCase().includes("contact us")
    );
    // ha nem található, a végére tesszük
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.id = "menuPosToggle";
    btn.className = "nav-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle menu position");
    btn.title = "Toggle menu position";
    btn.textContent = "⇵"; // felfelé-lefelé nyíl
    li.appendChild(btn);

    if (insertAfter && insertAfter.parentNode === ul) {
      insertAfter.insertAdjacentElement("afterend", li);
    } else {
      ul.appendChild(li);
    }

    btn.addEventListener("click", () => {
      const current = localStorage.getItem("navPosition") || "top";
      const next = current === "top" ? "bottom" : "top";
      localStorage.setItem("navPosition", next);
      applyNavPosition(next);
    });
  }

  function initNavPositioning() {
    try {
      const saved = localStorage.getItem("navPosition") || "top";
      applyNavPosition(saved);
      ensureToggleButton();
      // Re-apply on resize (pl. nav height változik)
      window.addEventListener("resize", () => applyNavPosition(localStorage.getItem("navPosition") || "top"));
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavPositioning);
  } else {
    initNavPositioning();
  }
})();

// ===== Videos oldal: play ikon eltüntetése lejátszás közben =====
(function(){
  function isVideosPage(){ try { return /Videos\.html$/i.test(location.pathname); } catch(e){ return false; } }
  if (!isVideosPage()) return;
  function wire(){
    document.querySelectorAll('#gallery a.video-tile > video').forEach(function(v){
      var a = v.parentElement;
      var set = function(){ if (v.paused) a.classList.remove('playing'); else a.classList.add('playing'); };
      v.addEventListener('play', set);
      v.addEventListener('pause', set);
      v.addEventListener('ended', set);
      set();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
})();

// ===== Projects Gallery: láthatatlan 6. csempe → "Videos" 5 percre =====
(function () {
  const FIVE_MIN = 5 * 60 * 1000;
  function isProjectsGalleryPage() {
    return /Projects Gallery\.html$/i.test(location.pathname) || document.getElementById("gallery");
  }
  function revealVideosTile() {
    const tile = document.getElementById("videosTile");
    const hit = document.getElementById("videosRevealHit");
    if (tile) {
      tile.classList.add("show");
      tile.style.pointerEvents = "auto";
    }
    if (hit) { hit.classList.add("hidden"); hit.style.pointerEvents = "none"; }
    try { localStorage.setItem("videosRevealTs", String(Date.now())); } catch (e) {}
  }
  function maybeShowVideosTile() {
    try {
      const ts = Number(localStorage.getItem("videosRevealTs") || 0);
      if (ts && Date.now() - ts < FIVE_MIN) {
        revealVideosTile();
      }
    } catch (e) {}
  }
  function attachRevealHandlers() {
    const hit = document.getElementById("videosRevealHit");
    if (!hit) return;
    let lastClick = 0;
    function tryDouble(now) {
      if (now - lastClick < 400) {
        revealVideosTile();
        lastClick = 0;
      } else {
        lastClick = now;
      }
    }
    hit.addEventListener("click", (e) => {
      e.preventDefault();
      tryDouble(performance.now());
    });
    hit.addEventListener("touchend", (e) => {
      tryDouble(performance.now());
    }, { passive: true });
    hit.addEventListener("dblclick", (e) => { e.preventDefault(); revealVideosTile(); });
  }
  if (isProjectsGalleryPage()) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        maybeShowVideosTile();
        attachRevealHandlers();
      });
    } else {
      maybeShowVideosTile();
      attachRevealHandlers();
    }
  }
})();

// ===== Kategória gyorsváltó + swipe navigáció a galéria aloldalakon =====
(function () {
  const categories = [
    { name: "Interior", file: "Completed Interior Projects.html" },
    { name: "WIP", file: "Interior Work in Progress.html" },
    { name: "Industrial", file: "Industrial and Large-Scale Projects.html" },
    { name: "Exterior", file: "Exterior Works and Landscaping.html" },
    { name: "Roofing", file: "Roofing Projects.html" },
  ];
  function currentPath() {
    try { return decodeURIComponent(location.pathname.replace(/^.*\//, '')); } catch (e) { return location.pathname.replace(/^.*\//, ''); }
  }
  function isCategoryPage() {
    const path = currentPath();
    return categories.some((c) => path === c.file);
  }
  function injectSubnav() {
    const nav = document.querySelector("#nav1, body > nav");
    if (!nav) return;
    if (document.querySelector(".subnav-cats")) return;
    const wrap = document.createElement("div");
    wrap.className = "subnav-cats";
    const ul = document.createElement("ul");
    const path = currentPath();
    const cur = categories.findIndex((c) => path === c.file);
    categories.forEach((c, i) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = c.name;
      a.href = c.file;
      if (i === cur) li.classList.add("active");
      li.appendChild(a);
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    nav.insertAdjacentElement("afterend", wrap);
  }
  // Lightbox állapot figyelése (Fancybox nyitva?)
  let inLightbox = false;
  function setupLightboxGuards() {
    try {
      if (window.jQuery && jQuery(document) && jQuery(document).on) {
        jQuery(document)
          .on("onInit.fb beforeShow.fb", function () {
            inLightbox = true;
          })
          .on("afterClose.fb", function () {
            inLightbox = false;
          });
      }
    } catch (e) {}
  }
  function lightboxActive() {
    return inLightbox || !!document.querySelector(".fancybox-container");
  }
  function attachSwipeNav() {
    const cur = categories.findIndex((c) => currentPath() === c.file);
    if (cur < 0) return;
    let startX = 0, startY = 0, dx = 0, dy = 0, touching = false;
    let width = 0;
    // Slider overlay elemek
    let slider = null, track = null, slidePrev = null, slideCur = null, slideNext = null;
    function buildSlider() {
      const gallery = document.getElementById('gallery');
      if (!gallery) return false;
      // ha már létezik, töröljük
      const old = document.querySelector('.cat-slider'); if (old) old.remove();
      slider = document.createElement('div'); slider.className = 'cat-slider';
      track = document.createElement('div'); track.className = 'cat-slider-track';
      slidePrev = document.createElement('div'); slidePrev.className = 'cat-slide';
      slideCur = document.createElement('div'); slideCur.className = 'cat-slide';
      slideNext = document.createElement('div'); slideNext.className = 'cat-slide';
      [slidePrev, slideCur, slideNext].forEach(s=>{ const inner=document.createElement('div'); inner.className='cat-slide-inner'; s.appendChild(inner); });
      track.appendChild(slidePrev); track.appendChild(slideCur); track.appendChild(slideNext);
      slider.appendChild(track);
      gallery.appendChild(slider);
      // aktuális galéria klónozása vizuális rétegbe
      const innerCur = slideCur.firstElementChild;
      innerCur.innerHTML = `<div class="gallery-grid">${gallery.innerHTML}</div>`; // csak vizuális
      width = gallery.getBoundingClientRect().width || window.innerWidth;
      return true;
    }
    function setTrack(x) {
      track.style.transform = `translate3d(calc(-100% + ${x}px),0,0)`;
    }
    function setTrackPct(pct) {
      track.style.transform = `translate3d(calc(${pct}% - 100%),0,0)`; // -100% a közép
    }
    function enableTransition(withDelay) {
      // Finom késleltetett érkezés
      const delay = withDelay ? ' .10s' : '';
      track.style.transition = `transform .28s cubic-bezier(0.15, 0.9, 0.1, 1.0)${delay}`;
    }
    function disableTransition() { track.style.transition = 'none'; }
    // Szomszéd kategóriák előtöltése
    function fetchGallery(file) {
      return fetch(file, { credentials: 'same-origin' })
        .then(r => r.text())
        .then(html => { const d=document.createElement('div'); d.innerHTML = html; const g=d.querySelector('#gallery'); return g ? g.innerHTML : ''; })
        .catch(() => '');
    }
    function prefillNeighbors() {
      const prevIdx = cur - 1, nextIdx = cur + 1;
      const innerPrev = slidePrev.firstElementChild; const innerNext = slideNext.firstElementChild;
      if (categories[prevIdx]) fetchGallery(categories[prevIdx].file).then(h => { innerPrev.innerHTML = `<div class="gallery-grid">${h}</div>`; });
      if (categories[nextIdx]) fetchGallery(categories[nextIdx].file).then(h => { innerNext.innerHTML = `<div class="gallery-grid">${h}</div>`; });
    }
    const onStart = (e) => {
      if (lightboxActive()) { touching = false; return; }
      const t = e.touches ? e.touches[0] : e;
      if (!buildSlider()) { touching = false; return; }
      // Vegyük át ideiglenesen az eseményeket, hogy ne nyíljon meg a lightbox
      slider.style.pointerEvents = 'auto';
      prefillNeighbors();
      disableTransition();
      startX = t.clientX; startY = t.clientY; dx = 0; dy = 0; touching = true;
    };
    const onMove = (e) => {
      if (!touching || lightboxActive()) return;
      const t = e.touches ? e.touches[0] : e;
      dx = t.clientX - startX; dy = t.clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) return; // vertikális mozgást ne kövessük
      // Kövesse az ujjat
      setTrack(dx);
    };
    const onEnd = () => {
      if (!touching || lightboxActive()) return; touching = false;
      const threshold = (width || window.innerWidth) * 0.25;
      if (Math.abs(dx) > threshold && Math.abs(dy) < 40) {
        const nextIdx = dx < 0 ? cur + 1 : cur - 1;
        if (nextIdx >= 0 && nextIdx < categories.length) {
          enableTransition(true); // kis késleltetett érkezés
          // Animáció befejezése
          const targetPct = dx < 0 ? -200 : 0; // balra húzás → -200%, jobbra → 0%
          setTrackPct(targetPct);
          // Navigáció animáció végén
          const handler = () => { track.removeEventListener('transitionend', handler); slider.style.pointerEvents = 'none'; const href = categories[nextIdx].file; location.href = href; };
          track.addEventListener('transitionend', handler);
          return;
        }
      }
      // visszapattanás
      enableTransition(false);
      setTrackPct(-100);
      const handler2 = () => { track.removeEventListener('transitionend', handler2); slider && (slider.style.pointerEvents = 'none'); slider && slider.remove(); };
      track.addEventListener('transitionend', handler2);
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
  }
  function init() {
    if (!isCategoryPage()) return;
    injectSubnav();
    setupLightboxGuards();
    attachSwipeNav();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ===== Láthatatlan váltó a Projects Gallery index nav sávban (Contact Us mellett) =====
(function () {
  const FIVE_MIN = 5 * 60 * 1000;
  function pageName() { try { return decodeURIComponent(location.pathname.replace(/^.*\//, '')); } catch (e) { return location.pathname.replace(/^.*\//, ''); } }
  function isProjectsGalleryIndex() { return pageName() === 'Projects Gallery.html'; }
  function showVideos() {
    const tile = document.getElementById("videosTile");
    if (tile) {
      tile.style.display = 'block';
      // kis késleltetés, hogy az opacity tranzíció érvényesüljön
      requestAnimationFrame(() => { tile.classList.add("show"); tile.style.pointerEvents = "auto"; });
    }
    try { localStorage.setItem("videosEnabled", "true"); localStorage.setItem("videosRevealTs", String(Date.now())); } catch(e) {}
    scheduleAutoHide();
  }
  function hideVideos() {
    const tile = document.getElementById("videosTile");
    if (tile) {
      tile.classList.remove("show");
      tile.style.pointerEvents = "none";
      // Várjunk a 3s-es áttűnés végéig, csak utána rejtsük el teljesen
      setTimeout(function(){ if (!tile.classList.contains('show')) tile.style.display = 'none'; }, 3000);
    }
    try { localStorage.setItem("videosEnabled", "false"); localStorage.removeItem("videosRevealTs"); } catch(e) {}
  }
  let hideTimer = null;
  function scheduleAutoHide() {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    try {
      const ts = Number(localStorage.getItem("videosRevealTs") || 0);
      if (ts) {
        const remain = FIVE_MIN - (Date.now() - ts);
        if (remain > 0) hideTimer = setTimeout(hideVideos, remain);
        else hideVideos();
      }
    } catch (e) {}
  }
  function applyInitial() {
    try {
      const enabled = localStorage.getItem("videosEnabled") === "true";
      const ts = Number(localStorage.getItem("videosRevealTs") || 0);
      if (enabled && ts && Date.now() - ts < FIVE_MIN) { showVideos(); }
      else { hideVideos(); }
    } catch (e) { hideVideos(); }
  }
  function ensureVideosSwitch() {
    if (!isProjectsGalleryIndex()) return;
    const nav = document.querySelector("body > nav");
    if (!nav) return;
    const ul = nav.querySelector("ul");
    if (!ul) return;
    if (ul.querySelector("#videosSwitch")) return;
    const items = Array.from(ul.querySelectorAll("li"));
    const after = items.find((li) => (li.textContent || "").toLowerCase().includes("contact us"));
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.id = "videosSwitch";
    btn.className = "stealth-toggle"; // látható kapcsoló a nav sávban
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle videos tile");
    btn.textContent = "Videos";
    li.appendChild(btn);
    if (after && after.parentNode === ul) after.insertAdjacentElement("afterend", li); else ul.appendChild(li);
    btn.addEventListener("click", () => {
      const enabled = localStorage.getItem("videosEnabled") === "true";
      if (enabled) { hideVideos(); } else { showVideos(); }
    });
  }
  if (isProjectsGalleryIndex()) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => { applyInitial(); ensureVideosSwitch(); });
    } else {
      applyInitial(); ensureVideosSwitch();
    }
  }
})();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        console.log("Service worker registration successful!", reg);
      })
      .catch((err) => {
        console.error("Service Worker registration failed: ", err);
      });
  });
}
