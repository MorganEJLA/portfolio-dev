(() => {
  /* ========== NAV TOGGLE ========== */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav__link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  if (navLinks.length) {
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
      }),
    );
  }

  /* ========== BACK TO TOP BUTTON ========== */
  const topButton = document.getElementById("topBtn");
  const SHOW_AT = 400;

  if (topButton) {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      topButton.style.display = y > SHOW_AT ? "block" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    window.topFunction = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ========== LINE ANIMATION ========== */
  function buildPageLine() {
    const pathEl = document.getElementById("pageLinePath");
    const dotEl = document.getElementById("pageLineDot");
    const svgEl = document.getElementById("pageLineArt");
    if (!pathEl || !svgEl) return;

    const title = document.querySelector(".neon-title");
    const footer = document.querySelector(".footer");
    const sections = [
      document.getElementById("story"),
      document.getElementById("skills"),
      document.getElementById("about"),
    ].filter(Boolean);

    const pad = 64;
    const leftEdge = 48;
    const rightEdge = window.innerWidth - 48;
    const centerX = window.innerWidth / 2;

    const titleRect = title ? title.getBoundingClientRect() : null;
    const titleBottom = titleRect ? titleRect.bottom + window.scrollY : 200;
    const titleLeft = titleRect ? titleRect.left : centerX - 100;
    const titleRight = titleRect ? titleRect.right : centerX + 100;

    let d = `M ${titleLeft} ${titleBottom}`;
    d += ` L ${titleRight} ${titleBottom}`;
    d += ` L ${rightEdge} ${titleBottom}`;

    let currentX = rightEdge;
    const transitionPoints = [];

    sections.forEach((section) => {
      const top = section.offsetTop - pad;
      const bottom = section.offsetTop + section.offsetHeight + pad;
      const otherX = currentX === rightEdge ? leftEdge : rightEdge;

      transitionPoints.push({ x: currentX, y: top });

      d += ` L ${currentX} ${top}`;
      d += ` L ${otherX} ${top}`;
      d += ` L ${otherX} ${bottom}`;

      currentX = otherX;
    });

    if (footer) {
      const footerBottom = footer.offsetTop + footer.offsetHeight + 16;
      const otherX = currentX === rightEdge ? leftEdge : rightEdge;
      d += ` L ${currentX} ${footerBottom}`;
      d += ` L ${otherX} ${footerBottom}`;
    }

    pathEl.setAttribute("d", d);
    svgEl.setAttribute("height", document.body.scrollHeight);

    const length = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = length;
    pathEl.style.strokeDashoffset = length;
    dotEl.style.opacity = 0;

    const sectionDots = document.querySelectorAll(".section-dot");
    sectionDots.forEach((dot, i) => {
      if (transitionPoints[i]) {
        dot.setAttribute("cx", transitionPoints[i].x);
        dot.setAttribute("cy", transitionPoints[i].y);
      }
    });

    let started = false;
    setTimeout(() => {
      started = true;
    }, 400);

    window.addEventListener(
      "scroll",
      () => {
        if (!started) return;
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        pathEl.style.transition = "none";
        pathEl.style.strokeDashoffset = length - length * progress;

        sectionDots.forEach((dot, i) => {
          if (!transitionPoints[i]) return;
          const dotProgress =
            transitionPoints[i].y / document.body.scrollHeight;
          if (progress >= dotProgress) {
            dot.style.transition = "opacity 0.3s ease";
            dot.style.opacity = 1;
          } else {
            dot.style.opacity = 0;
          }
        });

        if (progress >= 0.98) {
          dotEl.style.transition = "opacity 0.3s ease";
          dotEl.style.opacity = 1;
          const pt = pathEl.getPointAtLength(length);
          dotEl.setAttribute("cx", pt.x);
          dotEl.setAttribute("cy", pt.y);
        } else {
          dotEl.style.opacity = 0;
        }
      },
      { passive: true },
    );
  }

  window.addEventListener("load", () => {
    setTimeout(buildPageLine, 300);
  });
})();
