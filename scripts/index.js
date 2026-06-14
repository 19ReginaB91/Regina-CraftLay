const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");

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

/* THEME SWITCHER */

const page = document.querySelector(".page");
const vibeSwitchers = document.querySelectorAll("[data-vibe-switcher]");

const themes = {
  violet: {
    label: "Violet",
    url: "index.html"
  },
  bold: {
    label: "Wild",
    url: "wild-index.html",
    preview: true
  },
  nude: {
    label: "Nude",
    url: "nude-coming-soon.html"
  }
};

let isThemeChanging = false;

function createWildPreview() {
  let preview = document.querySelector("[data-wild-preview]");

  if (preview) return preview;

  preview = document.createElement("div");
  preview.className = "wild-preview";
  preview.dataset.wildPreview = "";

  preview.innerHTML = `
    <div class="wild-preview__glow" aria-hidden="true"></div>

    <div class="wild-preview__panel" role="status" aria-live="polite">
      <p class="wild-preview__kicker">Wild Preview</p>

      <h2>
        This world is already alive,
        <em>but still evolving.</em>
      </h2>

      <p>
        Step inside and feel the direction before the final version arrives.
      </p>
    </div>
  `;

  document.body.appendChild(preview);

  return preview;
}

function startThemeTransition(themeName) {
  if (isThemeChanging || !themes[themeName]) return;

  const theme = themes[themeName];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (theme.url === currentPage) return;

  isThemeChanging = true;

  burgerMenu?.classList.remove("is-open");
  menuToggle?.classList.remove("is-active");
  header?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");

  if (theme.preview) {
    const preview = createWildPreview();

    document.body.classList.add("wild-preview-active");

    requestAnimationFrame(() => {
      preview.classList.add("is-active");
    });

    setTimeout(() => {
      window.location.href = theme.url;
    }, 3600);

    return;
  }

  window.location.href = theme.url;
}

function renderThemeButtons(activeTheme) {
  if (!vibeSwitchers.length) return;

  vibeSwitchers.forEach((vibeSwitcher) => {
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
        startThemeTransition(themeName);
      });

      vibeSwitcher.appendChild(button);
    });
  });
}

renderThemeButtons(page?.dataset.theme || "violet");

/* DEMOS DOT SLIDER */

const projectStrip = document.querySelector("[data-project-strip]");
const dots = document.querySelectorAll("[data-dot]");

function getProjectStep() {
  if (!projectStrip) return 0;

  const card = projectStrip.querySelector(".project-card");
  const gap = 28;

  return card ? card.offsetWidth + gap : 360;
}

function goToProject(index) {
  if (!projectStrip) return;

  const amount = getProjectStep();

  projectStrip.scrollTo({
    left: amount * index,
    behavior: "smooth"
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index]?.classList.add("active");
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToProject(Number(dot.dataset.dot));
  });
});

projectStrip?.addEventListener("scroll", () => {
  const amount = getProjectStep();
  if (!amount) return;

  const index = Math.round(projectStrip.scrollLeft / amount);

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index]?.classList.add("active");
});

/* HERO CANVAS */

const heroCanvas = document.getElementById("heroCanvas");
const heroCtx = heroCanvas?.getContext("2d");

let heroW = 0;
let heroH = 0;
let heroDpr = 1;

function resizeHeroCanvas() {
  if (!heroCanvas || !heroCtx) return;

  heroDpr = Math.min(window.devicePixelRatio || 1, 2);
  heroW = heroCanvas.clientWidth;
  heroH = heroCanvas.clientHeight;

  heroCanvas.width = heroW * heroDpr;
  heroCanvas.height = heroH * heroDpr;

  heroCtx.setTransform(heroDpr, 0, 0, heroDpr, 0, 0);
}

const heroStars = Array.from({ length: 48 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.05 + 0.25,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.45 + 0.16
}));

function glowPoint(ctx, x, y, radius, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
  gradient.addColorStop(0.35, `rgba(${color}, ${alpha * 0.35})`);
  gradient.addColorStop(1, `rgba(${color}, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function animateHero(time) {
  if (!heroCanvas || !heroCtx) return;

  heroCtx.clearRect(0, 0, heroW, heroH);

  heroStars.forEach((star) => {
    const twinkle =
      0.18 +
      0.42 *
        Math.pow(
          (Math.sin(time * 0.001 * star.speed + star.phase) + 1) / 2,
          2
        );

    glowPoint(
      heroCtx,
      star.x * heroW,
      star.y * heroH,
      star.r * 4,
      "255,230,255",
      twinkle * 0.22
    );
  });

  const portalX = heroW * 0.558;
  const portalY = heroH * 0.495;
  const pulse = 0.5 + 0.5 * Math.sin(time * 0.001);

  glowPoint(
    heroCtx,
    portalX,
    portalY,
    78 + pulse * 32,
    "155,230,255",
    0.08 + pulse * 0.07
  );

  glowPoint(
    heroCtx,
    portalX,
    portalY,
    50 + pulse * 22,
    "232,140,255",
    0.06 + pulse * 0.06
  );

  requestAnimationFrame(animateHero);
}

/* FOOTER CANVAS */

const footerCanvas = document.getElementById("footerCanvas");
const footerCtx = footerCanvas?.getContext("2d");

let footerW = 0;
let footerH = 0;
let footerDpr = 1;

function resizeFooterCanvas() {
  if (!footerCanvas || !footerCtx) return;

  footerDpr = Math.min(window.devicePixelRatio || 1, 2);
  footerW = footerCanvas.clientWidth;
  footerH = footerCanvas.clientHeight;

  footerCanvas.width = footerW * footerDpr;
  footerCanvas.height = footerH * footerDpr;

  footerCtx.setTransform(footerDpr, 0, 0, footerDpr, 0, 0);
}

const footerParticles = Array.from({ length: 75 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.8 + 0.45,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.35 + 0.08,
  drift: Math.random() * 22 + 8
}));

function animateFooter(time) {
  if (!footerCanvas || !footerCtx) return;

  footerCtx.clearRect(0, 0, footerW, footerH);

  footerParticles.forEach((p) => {
    const x = p.x * footerW + Math.sin(time * 0.00018 + p.phase) * p.drift;
    const y = p.y * footerH + Math.cos(time * 0.00016 + p.phase) * (p.drift * 0.7);

    const alpha =
      0.12 +
      0.36 *
        ((Math.sin(time * 0.001 * p.speed + p.phase) + 1) / 2);

    glowPoint(footerCtx, x, y, p.r * 7, "190,220,255", alpha);
  });

  requestAnimationFrame(animateFooter);
}

/* INIT */

window.addEventListener("resize", () => {
  resizeHeroCanvas();
  resizeFooterCanvas();
});

resizeHeroCanvas();
resizeFooterCanvas();

requestAnimationFrame(animateHero);
requestAnimationFrame(animateFooter);

/* SCROLL REVEAL */

const revealItems = document.querySelectorAll(`
  .hero-copy,
  .hero-scene,
  .project-card,
  .about-copy,
  .portrait-card,
  .skills,
  .journal,
  .footer-code,
  .footer-cta,
  .social-links
`);

const scrollRevealObserver = new IntersectionObserver(
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

  if (item.classList.contains("hero-copy")) {
    item.classList.add("reveal-left");
  } else if (
    item.classList.contains("hero-scene") ||
    item.classList.contains("journal")
  ) {
    item.classList.add("reveal-right");
  } else if (item.classList.contains("portrait-card")) {
    item.classList.add("reveal-scale");
  } else {
    item.classList.add("reveal-up");
  }

  scrollRevealObserver.observe(item);
});