const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");
const aboutToggle = document.querySelector("[data-about-toggle]");
const aboutLayer = document.querySelector("[data-about-layer]");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
});

function closeMenu() {
  burgerMenu?.classList.remove("is-open");
  menuToggle?.classList.remove("is-active");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = burgerMenu?.classList.toggle("is-open");

  menuToggle.classList.toggle("is-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

burgerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

aboutToggle?.addEventListener("click", () => {
  const isOpen = aboutLayer?.classList.toggle("is-open");

  aboutToggle.classList.toggle("is-active", isOpen);
  aboutToggle.querySelector("span").textContent = isOpen ? "-" : "+";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealItems = document.querySelectorAll(`
  .nude-hero__copy,
  .nude-hero__visual,
  .nude-intro-card,
  .nude-about__media,
  .nude-about__copy,
  .nude-work-card,
  .nude-statement,
  .nude-footer
`);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("nude-reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("nude-reveal", "is-visible");
  });
}