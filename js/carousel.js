// js/carousel.js
(() => {
  const track = document.getElementById("carouselTrack");
  const outer = document.getElementById("carouselOuter");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsEl = document.getElementById("carouselDots");
  const countEl = document.getElementById("carouselCount");

  if (!track || !outer) return; // bail if section not present

  const cards = track.querySelectorAll(".project-card");
  const total = cards.length;
  const GAP = 24; // matches 1.5rem gap at 16px base
  let current = 0;

  function visibleCount() {
    const w = outer.offsetWidth;
    if (w >= 960) return 3;
    if (w >= 580) return 2;
    return 1;
  }

  function cardWidth() {
    const vc = visibleCount();
    if (vc === 1) return outer.offsetWidth;
    return (outer.offsetWidth - (vc - 1) * GAP) / vc;
  }

  function maxIndex() {
    return Math.max(0, total - visibleCount());
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    const n = maxIndex() + 1;
    for (let i = 0; i < n; i++) {
      const btn = document.createElement("button");
      btn.className = "carousel-dot" + (i === current ? " active" : "");
      btn.setAttribute("aria-label", "Slide " + (i + 1));
      btn.addEventListener("click", () => go(i));
      dotsEl.appendChild(btn);
    }
  }

  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const gap = visibleCount() === 1 ? 0 : GAP;
    const offset = current * (cardWidth() + gap);
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
    countEl.textContent = `${current + 1} / ${maxIndex() + 1}`;
    dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  prevBtn.addEventListener("click", () => go(current - 1));
  nextBtn.addEventListener("click", () => go(current + 1));

  function init() {
    const cw = cardWidth();
    cards.forEach((c) => {
      c.style.width = cw + "px";
    });
    if (current > maxIndex()) current = maxIndex();
    go(current);
    buildDots();
  }

  window.addEventListener("resize", init);
  init();
})();
