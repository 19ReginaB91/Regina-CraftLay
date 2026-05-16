const header = document.querySelector(".journal-header");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

const revealElements = document.querySelectorAll(
  ".hero-content, .manifesto, .meaning-panel, .world-card, .journal-footer"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const worldToggle = document.querySelector("[data-world-toggle]");
const worldAnswer = document.querySelector("[data-world-answer]");

worldToggle?.addEventListener("click", () => {
  worldToggle.classList.toggle("is-open");
  worldAnswer?.classList.toggle("is-open");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});