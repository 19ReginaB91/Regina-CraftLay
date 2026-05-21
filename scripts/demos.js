const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");
const filterButtons = document.querySelectorAll("[data-filter]");
const demoCards = document.querySelectorAll(".demo-card");

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

const themeLink = document.getElementById("theme-link");
const themeOverlay = document.getElementById("theme-overlay");
const page = document.querySelector(".page");
const vibeSwitcher = document.querySelector("[data-vibe-switcher]");

const themes = {
  violet: {
    label: "Violet",
    file: "styles/style-violet.css",
    color: "#b9a2ff",
    glow: "rgba(185,162,255,0.65)"
  },
  bold: {
    label: "Wild",
    file: "styles/style-bold.css",
    color: "#061a12",
    glow: "rgba(20,255,185,0.55)"
  },
  nude: {
    label: "Nude",
    file: "styles/style-nude.css",
    color: "#f1dfd3",
    glow: "rgba(255,220,190,0.75)"
  }
};

let isThemeChanging = false;

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
      changeTheme(themeName);
    });

    vibeSwitcher.appendChild(button);
  });
}

function createThemeParticles(color) {
  const container = document.createElement("div");
  container.className = "theme-particles";
  document.body.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("span");

    const size = Math.random() * 8 + 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const moveX = (Math.random() - 0.5) * 260;
    const moveY = (Math.random() - 0.5) * 260;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 24px ${color}`;
    particle.style.setProperty("--move-x", `${moveX}px`);
    particle.style.setProperty("--move-y", `${moveY}px`);

    container.appendChild(particle);
  }

  setTimeout(() => {
    container.remove();
  }, 1600);
}

function changeTheme(themeName) {
  if (
    isThemeChanging ||
    !themes[themeName] ||
    !themeLink ||
    !themeOverlay ||
    !page
  ) {
    return;
  }

  isThemeChanging = true;

  const theme = themes[themeName];

  renderThemeButtons(themeName);

  page.classList.add("is-changing-theme");

  themeOverlay.style.background = `
    radial-gradient(circle, ${theme.glow} 0%, ${theme.color} 42%, transparent 72%)
  `;

  themeOverlay.classList.add("is-animating");
  createThemeParticles(theme.color);

  setTimeout(() => {
    themeLink.href = theme.file;
    page.dataset.theme = themeName;
  }, 620);

  setTimeout(() => {
    page.classList.remove("is-changing-theme");
    themeOverlay.classList.remove("is-animating");
    isThemeChanging = false;
  }, 1550);
}

renderThemeButtons(page?.dataset.theme || "violet");

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

      const shouldShow = filter === "all" || categories.includes(filter);

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

/* REVEAL */

const revealItems = document.querySelectorAll(
  ".demos-hero, .filter-bar, .demo-card, .demos-footer"
);

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
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("reveal", "is-visible");
  });
}