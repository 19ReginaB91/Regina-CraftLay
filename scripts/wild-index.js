const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const themeLinks = document.querySelectorAll("[data-theme-target]");

function closeMenu() {
  mobileMenu?.classList.remove("is-open");
  menuToggle?.classList.remove("is-active");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function openMenu() {
  mobileMenu?.classList.add("is-open");
  menuToggle?.classList.add("is-active");
  document.body.classList.add("menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* THEME SWITCHER */

const themes = {
  violet: {
    title: "Violet world",
    text: "Rebuilding the dreamy interface",
    url: "index.html"
  },
  bold: {
    title: "Wild world",
    text: "Building emerald noir atmosphere",
    url: "wild-index.html"
  },
  nude: {
    title: "Nude world",
    text: "Soft editorial world is opening",
    url: "nude-index.html"
  }
};

let isThemeChanging = false;

function createWorldRebuild() {
  let rebuild = document.querySelector("[data-world-rebuild]");

  if (rebuild) return rebuild;

  rebuild = document.createElement("div");
  rebuild.className = "world-rebuild";
  rebuild.dataset.worldRebuild = "";

  rebuild.innerHTML = `
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

  document.body.appendChild(rebuild);

  return rebuild;
}

function startWorldRebuild(themeName, targetUrl) {
  if (isThemeChanging || !themes[themeName]) return;

  const currentPage = window.location.pathname.split("/").pop() || "wild-index.html";

  if (targetUrl === currentPage) return;

  isThemeChanging = true;
  closeMenu();

  const theme = themes[themeName];
  const rebuild = createWorldRebuild();
  const title = rebuild.querySelector("[data-world-rebuild-title]");
  const text = rebuild.querySelector("[data-world-rebuild-text]");

  rebuild.classList.remove("to-violet", "to-bold", "to-nude", "is-active");
  rebuild.classList.add(`to-${themeName}`);

  if (title) {
    const words = theme.title.split(" ");
    title.innerHTML = `${words[0]} <em>${words.slice(1).join(" ")}</em>`;
  }

  if (text) {
    text.textContent = theme.text;
  }

  document.body.classList.add("world-rebuild-active");

  requestAnimationFrame(() => {
    rebuild.classList.add("is-active");
  });

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 3400);
}

themeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const themeName = link.dataset.themeTarget;
    const targetUrl = themes[themeName]?.url || link.getAttribute("href");

    if (!themeName || !targetUrl) return;

    event.preventDefault();
    startWorldRebuild(themeName, targetUrl);
  });
});

/* HERO DEPTH */

const hero = document.querySelector(".wild-hero");
const heroImage = document.querySelector(".wild-hero-image");

hero?.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  if (heroImage) {
    heroImage.style.transform = `scale(1.035) translate(${x * 10}px, ${y * 8}px)`;
  }
});

hero?.addEventListener("mouseleave", () => {
  if (heroImage) {
    heroImage.style.transform = "";
  }
});

/* SCROLL REVEAL */

const revealItems = document.querySelectorAll(`
  .hero-copy,
  .theme-switcher,
  .hero-note,
  .wild-hex-world,
  .hex-card,
  .featured-work,
  .work-card,
  .wild-about
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
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("reveal", "is-visible");
  });
}