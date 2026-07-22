// Work section carousel controls — pages through N visible cards at a time
(function () {
  const outer = document.getElementById("carouselOuter");
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsWrap = document.getElementById("carouselDots");
  const countEl = document.getElementById("carouselCount");

  if (!outer || !track || !prevBtn || !nextBtn || !dotsWrap || !countEl) return;

  const cards = Array.from(track.children);
  let cardsPerPage = 1;
  let pageCount = 1;
  let pageIndex = 0; // source of truth for which page we're on
  let isSettling = false; // true while a programmatic scroll is in flight

  function getCardStep() {
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;
    return cardWidth + gap;
  }

  function computeLayout() {
    const step = getCardStep();
    const visibleWidth = outer.getBoundingClientRect().width;
    cardsPerPage = Math.max(1, Math.floor(visibleWidth / step));
    pageCount = Math.max(1, Math.ceil(cards.length / cardsPerPage));
    pageIndex = Math.min(pageIndex, pageCount - 1);
    buildDots();
    render();
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let p = 0; p < pageCount; p++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to page ${p + 1}`);
      dot.addEventListener("click", () => goToPage(p));
      dotsWrap.appendChild(dot);
    }
  }

  // pageIndex is the single source of truth — buttons/dots/count all read from it directly,
  // never re-derived from scrollLeft. That avoids drift from rounding or the card rotation transform.
  function render() {
    const dots = Array.from(dotsWrap.children);
    dots.forEach((d, idx) => d.classList.toggle("active", idx === pageIndex));
    countEl.textContent = `${pageIndex + 1} / ${pageCount}`;
    prevBtn.disabled = pageIndex === 0;
    nextBtn.disabled = pageIndex === pageCount - 1;
  }

  function goToPage(p) {
    pageIndex = Math.max(0, Math.min(pageCount - 1, p));
    const targetIndex = Math.min(cards.length - 1, pageIndex * cardsPerPage);
    const cardRect = cards[targetIndex].getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const delta = cardRect.left - trackRect.left;

    isSettling = true;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
    render(); // update immediately — don't wait on the scroll event to enable/disable buttons
    window.clearTimeout(goToPage._t);
    goToPage._t = window.setTimeout(() => {
      isSettling = false;
    }, 500);
  }

  // Only used to keep dots roughly in sync if the user manually swipes/drags the track.
  // Debounced, and skipped while a programmatic scroll (goToPage) is settling.
  let scrollTimer;
  track.addEventListener("scroll", () => {
    if (isSettling) return;
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const step = getCardStep();
      const cardIndex = Math.round(track.scrollLeft / step);
      pageIndex = Math.min(
        pageCount - 1,
        Math.max(0, Math.floor(cardIndex / cardsPerPage)),
      );
      render();
    }, 120);
  });

  prevBtn.addEventListener("click", () => goToPage(pageIndex - 1));
  nextBtn.addEventListener("click", () => goToPage(pageIndex + 1));
  window.addEventListener("resize", () =>
    window.requestAnimationFrame(computeLayout),
  );

  computeLayout();
})();
