const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");
const revealItems = document.querySelectorAll(".reveal");
const ambientLights = document.querySelectorAll(".ambient");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

/* MENU */

function closeMenu() {
  burgerMenu?.classList.remove("is-open");
  menuToggle?.classList.remove("is-active");
  header?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function openMenu() {
  burgerMenu?.classList.add("is-open");
  menuToggle?.classList.add("is-active");
  header?.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = burgerMenu?.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

burgerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* THEME SWITCHER */

const vibeSwitcher = document.querySelector("[data-vibe-switcher]");
const page = document.querySelector(".page");

const themes = {
  violet: {
    label: "Violet",
    url: "index.html"
  },
  bold: {
    label: "Wild",
    url: "wild-index.html"
  },
  nude: {
    label: "Nude",
    url: "nude-index.html"
  }
};

function renderThemeButtons(activeTheme) {
  if (!vibeSwitcher) return;

  vibeSwitcher.innerHTML = "";

  Object.entries(themes).forEach(([themeName, theme]) => {
    if (themeName === activeTheme) return;

    const button = document.createElement("button");
    button.className = `vibe-btn vibe-${themeName}`;
    button.type = "button";
    button.dataset.themeBtn = themeName;
    button.setAttribute("aria-label", `${theme.label} world`);
    button.innerHTML = `<span>${theme.label}</span>`;

    button.addEventListener("click", () => {
      window.location.href = theme.url;
    });

    vibeSwitcher.appendChild(button);
  });
}

renderThemeButtons(page?.dataset.theme || "violet");

/* FLOATING AMBIENT LIGHT */

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

/* PAGE REVEAL */

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
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
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}