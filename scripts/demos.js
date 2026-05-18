const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const demoCards = document.querySelectorAll(".demo-card");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

/* FILTER */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    demoCards.forEach((card) => {
      const categories = card.dataset.category
        ? card.dataset.category.split(" ")
        : [];

      const shouldShow =
        filter === "all" || categories.includes(filter);

      if (shouldShow) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});

/* REVEAL */

const revealItems = document.querySelectorAll(
  ".demos-hero, .filter-bar, .demo-card, .demos-footer"
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
    threshold: 0.12,
  }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});