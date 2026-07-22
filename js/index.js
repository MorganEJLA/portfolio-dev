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

  /* ========== HERO TYPING EFFECT ========== */
  const skillsList = [
    "React",
    "WordPress",
    "PHP",
    "JavaScript",
    "Firebase",
    "AI",
  ];
  const typeEl = document.getElementById("type-text");
  if (typeEl) {
    let skillIndex = 0,
      charIndex = 0,
      deleting = false;
    function tick() {
      const word = skillsList[skillIndex];
      if (!deleting) {
        charIndex++;
        typeEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1100);
          return;
        }
      } else {
        charIndex--;
        typeEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          skillIndex = (skillIndex + 1) % skillsList.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
  }
})();
/* ========== COPYRIGHT YEAR ========== */
const yearEl = document.getElementById("copyrightYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();
