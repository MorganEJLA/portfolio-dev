// js/index.js  (no <script> tags here!)
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
      })
    );
  }

  /* ========== BACK TO TOP BUTTON ========== */
  const topButton = document.getElementById("topBtn");
  const SHOW_AT = 400; // show button after 400px scroll

  if (topButton) {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      topButton.style.display = y > SHOW_AT ? "block" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load

    // expose smooth scroll function (used by onclick on the button)
    window.topFunction = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ========== TYPEWRITER ========== */
  const typedText = document.getElementById("typed-text");
  if (typedText) {
    const words = [
      "Wordpress",
      "React",
      "Vue.js",
      "Django",
      "Python",
      "AI Integration",
    ];
    const typingSpeed = 120; // ms per letter
    const eraseSpeed = 60; // ms per letter
    const holdTime = 1000; // pause at full word

    let i = 0; // word index
    let j = 0; // char index
    let deleting = false;

    function type() {
      const word = words[i];
      typedText.textContent = word.slice(0, j);

      if (!deleting && j < word.length) {
        j++;
        setTimeout(type, typingSpeed);
      } else if (!deleting && j === word.length) {
        deleting = true;
        setTimeout(type, holdTime);
      } else if (deleting && j > 0) {
        j--;
        setTimeout(type, eraseSpeed);
      } else {
        // finished deleting -> advance to next word
        deleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 300);
        return; // prevents immediate re-entry on same cycle
      }
    }

    type();
  }
})();
