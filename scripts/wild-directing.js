// Wild directing — one scene, one breath.
// Ported from Amarte Design Studio: no per-paragraph stagger.

(function initWildDirecting() {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("directing");

  if (reduced) {
    root.classList.add("directing-reduced", "directing-ready");
    return;
  }

  const SCENE_SELECTORS = [
    ".hero-copy",
    ".wild-system-copy",
    ".wild-fragments",
    ".featured-work",
    ".wild-footer"
  ].join(", ");

  function mark(el, preset, delay) {
    if (!el || el.hasAttribute("data-direct")) return;
    if (el.closest("[data-direct]")) return;
    el.setAttribute("data-direct", preset);
    el.style.setProperty("--direct-delay", delay + "ms");
  }

  Array.from(document.querySelectorAll(SCENE_SELECTORS)).forEach((el) => {
    const preset = el.classList.contains("hero-copy") ? "hero" : "scene";
    mark(el, preset, preset === "hero" ? 80 : 0);
  });

  root.classList.add("directing-ready");

  function reveal(el) {
    if (!el || el.classList.contains("is-in")) return;
    el.classList.add("is-in");

    const delay = parseFloat(el.style.getPropertyValue("--direct-delay")) || 0;
    window.setTimeout(() => {
      el.removeAttribute("data-direct");
      el.style.removeProperty("--direct-delay");
    }, delay + 950);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -12% 0px"
    }
  );

  document.querySelectorAll("[data-direct]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inFirstScreen = rect.top < window.innerHeight * 0.86 && rect.bottom > 40;
    const isHero = el.getAttribute("data-direct") === "hero";

    if (inFirstScreen && !isHero) {
      el.classList.add("is-in");
      el.removeAttribute("data-direct");
      el.style.removeProperty("--direct-delay");
      return;
    }

    if (inFirstScreen && isHero) {
      window.requestAnimationFrame(() => reveal(el));
      return;
    }

    observer.observe(el);
  });
})();
