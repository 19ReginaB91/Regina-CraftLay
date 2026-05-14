/* ===============================
   HEADER
================================ */

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobilePanel.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobilePanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* ===============================
   CREATIVE THEME SWITCHER
================================ */

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
  if (isThemeChanging || !themes[themeName]) return;

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


/* ===============================
   PROJECT SLIDER
================================ */

const projectStrip = document.querySelector("[data-project-strip]");
const prevBtn = document.querySelector("[data-slider-prev]");
const nextBtn = document.querySelector("[data-slider-next]");

function slideProjects(direction) {
  if (!projectStrip) return;

  const card = projectStrip.querySelector(".project-card");
  const amount = card ? card.offsetWidth + 28 : 360;

  projectStrip.scrollBy({
    left: amount * direction,
    behavior: "smooth"
  });
}

prevBtn?.addEventListener("click", () => slideProjects(-1));
nextBtn?.addEventListener("click", () => slideProjects(1));


/* ===============================
   SOFT HERO CANVAS
   no code lines, no bubbles
================================ */

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

const heroStars = Array.from({ length: 58 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.1 + 0.25,
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
      0.2 +
      0.45 *
        Math.pow(
          (Math.sin(time * 0.001 * star.speed + star.phase) + 1) / 2,
          2
        );

    glowPoint(
      heroCtx,
      star.x * heroW,
      star.y * heroH,
      star.r * 4.2,
      "255,230,255",
      twinkle * 0.24
    );
  });

  const portalX = heroW * 0.57;
  const portalY = heroH * 0.5;
  const pulse = 0.5 + 0.5 * Math.sin(time * 0.001);

  glowPoint(
    heroCtx,
    portalX,
    portalY,
    76 + pulse * 30,
    "155,230,255",
    0.09 + pulse * 0.07
  );

  glowPoint(
    heroCtx,
    portalX,
    portalY,
    48 + pulse * 20,
    "232,140,255",
    0.07 + pulse * 0.06
  );

  requestAnimationFrame(animateHero);
}


/* ===============================
   FOOTER CANVAS
================================ */

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

const footerParticles = Array.from({ length: 55 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.6 + 0.4,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.35 + 0.08
}));

function animateFooter(time) {
  if (!footerCanvas || !footerCtx) return;

  footerCtx.clearRect(0, 0, footerW, footerH);

  footerParticles.forEach((p) => {
    const x = p.x * footerW + Math.sin(time * 0.00018 + p.phase) * 14;
    const y = p.y * footerH + Math.cos(time * 0.00016 + p.phase) * 10;

    const alpha =
      0.14 +
      0.34 *
        ((Math.sin(time * 0.001 * p.speed + p.phase) + 1) / 2);

    glowPoint(footerCtx, x, y, p.r * 7, "190,220,255", alpha);
  });

  requestAnimationFrame(animateFooter);
}


/* ===============================
   INIT
================================ */

window.addEventListener("resize", () => {
  resizeHeroCanvas();
  resizeFooterCanvas();
});

resizeHeroCanvas();
resizeFooterCanvas();

requestAnimationFrame(animateHero);
requestAnimationFrame(animateFooter);