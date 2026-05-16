const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = burgerMenu?.classList.toggle("is-open");

  menuToggle.classList.toggle("is-active", isOpen);
  header?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

burgerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-open");
    menuToggle?.classList.remove("is-active");
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* THEME SWITCHER */

const themeLink = document.getElementById("theme-link");
const themeOverlay = document.getElementById("theme-overlay");
const page = document.querySelector(".page");
const themeButtons = document.querySelectorAll("[data-theme-btn]");

const themes = {
  violet: {
    file: "styles/style-violet.css",
    color: "#b9a2ff",
    glow: "rgba(185,162,255,0.65)"
  },
  bold: {
    file: "styles/style-bold.css",
    color: "#061a12",
    glow: "rgba(20,255,185,0.55)"
  },
  nude: {
    file: "styles/style-nude.css",
    color: "#f1dfd3",
    glow: "rgba(255,220,190,0.75)"
  }
};

let isThemeChanging = false;

function createThemeParticles(color) {
  const container = document.createElement("div");
  container.className = "theme-particles";
  document.body.appendChild(container);

  for (let i = 0; i < 42; i++) {
    const particle = document.createElement("span");

    const size = Math.random() * 8 + 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const moveX = (Math.random() - 0.5) * 320;
    const moveY = (Math.random() - 0.5) * 320;
    const delay = Math.random() * 0.35;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 24px ${color}`;
    particle.style.setProperty("--move-x", `${moveX}px`);
    particle.style.setProperty("--move-y", `${moveY}px`);
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }

  setTimeout(() => {
    container.remove();
  }, 1800);
}

function changeTheme(themeName) {
  if (isThemeChanging || !themes[themeName] || !themeLink || !themeOverlay || !page) return;

  isThemeChanging = true;

  const theme = themes[themeName];

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.themeBtn === themeName);
  });

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

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeTheme(btn.dataset.themeBtn);
  });
});

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