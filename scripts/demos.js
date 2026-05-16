const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".demo-card");

/* HEADER SCROLL */

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

/* FILTER */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    cards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all") {
        card.style.display = "block";

        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

        return;
      }

      if (category.includes(filter)) {
        card.style.display = "block";

        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
          card.style.display = "none";
        }, 250);
      }
    });
  });
});

/* REVEAL ANIMATION */

const revealItems = document.querySelectorAll(".demo-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});

/* SMOOTH HOVER GLOW */

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.18),
        transparent 32%
      ),
      linear-gradient(
        135deg,
        rgba(255,255,255,0.68),
        rgba(255,255,255,0.22)
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.68),
        rgba(255,255,255,0.22)
      )
    `;
  });
});