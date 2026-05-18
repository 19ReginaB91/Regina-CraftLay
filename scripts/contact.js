const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const ambientLights = document.querySelectorAll(".ambient");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

/* Floating ambient light */

document.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  ambientLights.forEach((light, index) => {
    const speed = (index + 1) * 18;

    light.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });
});

/* Page reveal */

const observer = new IntersectionObserver(
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
  observer.observe(item);
});