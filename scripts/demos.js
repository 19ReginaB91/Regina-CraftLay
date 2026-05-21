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

const page = document.querySelector(".page");
const vibeSwitcher = document.querySelector("[data-vibe-switcher]");

const themes = {
  violet: {
    label: "Violet",
    title: "Violet world",
    text: "Rebuilding the dreamy interface"
  },
  bold: {
    label: "Wild",
    title: "Wild world",
    text: "Building emerald noir atmosphere"
  },
  nude: {
    label: "Nude",
    title: "Nude world",
    text: "Soft editorial world is opening"
  }
};

let isThemeChanging = false;

function getThemeUrl(themeName) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const routes = {
    "index.html": {
      violet: "index.html",
      bold: "wild-index.html",
      nude: "nude-index.html"
    },
    "demos.html": {
      violet: "demos.html",
      bold: "wild-demos.html",
      nude: "nude-demos.html"
    },
    "journal.html": {
      violet: "journal.html",
      bold: "wild-journal.html",
      nude: "nude-journal.html"
    },
    "contact.html": {
      violet: "contact.html",
      bold: "wild-contact.html",
      nude: "nude-contact.html"
    },
    "wild-index.html": {
      violet: "index.html",
      bold: "wild-index.html",
      nude: "nude-index.html"
    },
    "wild-demos.html": {
      violet: "demos.html",
      bold: "wild-demos.html",
      nude: "nude-demos.html"
    },
    "wild-journal.html": {
      violet: "journal.html",
      bold: "wild-journal.html",
      nude: "nude-journal.html"
    },
    "wild-contact.html": {
      violet: "contact.html",
      bold: "wild-contact.html",
      nude: "nude-contact.html"
    },
    "nude-index.html": {
      violet: "index.html",
      bold: "wild-index.html",
      nude: "nude-index.html"
    },
    "nude-demos.html": {
      violet: "demos.html",
      bold: "wild-demos.html",
      nude: "nude-demos.html"
    },
    "nude-journal.html": {
      violet: "journal.html",
      bold: "wild-journal.html",
      nude: "nude-journal.html"
    },
    "nude-contact.html": {
      violet: "contact.html",
      bold: "wild-contact.html",
      nude: "nude-contact.html"
    }
  };

  return routes[currentPage]?.[themeName] || "index.html";
}

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
      startWorldRebuild(themeName);
    });

    vibeSwitcher.appendChild(button);
  });
}

function createWorldRebuild() {
  let transition = document.querySelector("[data-world-rebuild]");

  if (transition) return transition;

  transition = document.createElement("div");
  transition.className = "world-rebuild";
  transition.dataset.worldRebuild = "";

  transition.innerHTML = `
    <div class="world-rebuild__pieces" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="world-rebuild__panel" role="status" aria-live="polite">
      <p class="world-rebuild__kicker">World rebuild</p>
      <h2 class="world-rebuild__title" data-world-rebuild-title>
        Building <em>world</em>
      </h2>
      <div class="world-rebuild__line">
        <span></span>
      </div>
      <p class="world-rebuild__text" data-world-rebuild-text>
        Reconstructing interface
      </p>
    </div>
  `;

  document.body.appendChild(transition);

  return transition;
}

function startWorldRebuild(themeName) {
  if (isThemeChanging || !themes[themeName] || !page) return;

  const targetUrl = getThemeUrl(themeName);
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (targetUrl === currentPage) return;

  isThemeChanging = true;
  closeMenu();

  const theme = themes[themeName];
  const transition = createWorldRebuild();
  const title = transition.querySelector("[data-world-rebuild-title]");
  const text = transition.querySelector("[data-world-rebuild-text]");

  transition.classList.remove("to-violet", "to-bold", "to-nude", "is-active");
  transition.classList.add(`to-${themeName}`);

  if (title) {
    const words = theme.title.split(" ");
    title.innerHTML = `${words[0]} <em>${words.slice(1).join(" ")}</em>`;
  }

  if (text) {
    text.textContent = theme.text;
  }

  document.body.classList.add("world-rebuild-active");

  requestAnimationFrame(() => {
    transition.classList.add("is-active");
  });

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 3400);
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