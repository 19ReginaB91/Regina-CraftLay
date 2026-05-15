/**
 * REGINA CRAFTLAY - GLOBAL SCRIPT 2026
 * Handles Navigation, Theme Switching (with Redirection), 
 * Project Slider, and Interactive Canvas Effects.
 */

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const burgerMenu = document.querySelector("[data-burger-menu]");

// --- 1. NAVIGATION & SCROLL LOGIC ---

// Toggle header style on scroll
window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

// Mobile menu toggle logic
menuToggle?.addEventListener("click", () => {
  const isOpen = burgerMenu?.classList.toggle("is-open");
  
  menuToggle.classList.toggle("is-active", isOpen);
  header?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a navigation link is clicked
burgerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-open");
    menuToggle?.classList.remove("is-active");
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// --- 2. MULTI-VIBE THEME SYSTEM ---

const themeLink = document.getElementById("theme-link");
const themeOverlay = document.getElementById("theme-overlay");
const page = document.querySelector(".page");
const themeButtons = document.querySelectorAll("[data-theme-btn], [data-vibe]");

// Configuration for different visual themes
const themes = {
  violet: {
    file: "styles/style-violet.css",
    color: "#b9a2ff",
    glow: "rgba(185,162,255,0.65)",
    page: "index.html" // Target layout for this theme
  },
  bold: {
    file: "styles/style-bold.css",
    color: "#00ffa3", // Emerald Green
    glow: "rgba(0,255,163,0.55)",
    page: "bold.html" // Requires a Sidebar layout
  },
  emerald: { // Alias for the Bold/Emerald theme
    file: "styles/style-bold.css",
    color: "#00ffa3",
    glow: "rgba(0,255,163,0.55)",
    page: "bold.html"
  },
  nude: {
    file: "styles/style-nude.css",
    color: "#f1dfd3",
    glow: "rgba(255,220,190,0.75)",
    page: "index.html"
  }
};

let isThemeChanging = false;

/**
 * Handles the theme transition, including potential page redirection
 * if the selected theme requires a different HTML structure.
 */
function changeTheme(themeName) {
  if (isThemeChanging || !themes[themeName]) return;
  
  const currentPath = window.location.pathname;
  const targetPage = themes[themeName].page;

  // REDIRECTION CHECK: If the target theme uses a different HTML file
  if (!currentPath.includes(targetPage) && !(currentPath === "/" && targetPage === "index.html")) {
    window.location.href = targetPage;
    return;
  }

  // If on the correct page, proceed with the visual transition
  isThemeChanging = true;
  const theme = themes[themeName];

  page?.classList.add("is-changing-theme");
  
  if (themeOverlay) {
    themeOverlay.style.background = `radial-gradient(circle, ${theme.glow} 0%, ${theme.color} 42%, transparent 72%)`;
    themeOverlay.classList.add("is-animating");
  }

  // Update CSS link and data attributes after a short delay
  setTimeout(() => {
    if (themeLink) themeLink.href = theme.file;
    if (page) page.dataset.theme = themeName;
  }, 600);

  // Clean up transition classes
  setTimeout(() => {
    page?.classList.remove("is-changing-theme");
    themeOverlay?.classList.remove("is-animating");
    isThemeChanging = false;
  }, 1500);
}

// Attach event listeners to all theme switching elements
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Supports both original and new attribute names
    const name = btn.dataset.themeBtn || btn.dataset.vibe;
    changeTheme(name);
  });
});

// --- 3. PROJECT SLIDER (Main Page) ---

const projectStrip = document.querySelector("[data-project-strip]");
const prevBtn = document.querySelector("[data-slider-prev]");
const nextBtn = document.querySelector("[data-slider-next]");

/**
 * Smoothly scrolls the project strip in the specified direction
 */
function slideProjects(direction) {
  if (!projectStrip) return;
  const card = projectStrip.querySelector(".project-card");
  const gap = 28;
  const amount = card ? card.offsetWidth + gap : 360;

  projectStrip.scrollBy({
    left: amount * direction,
    behavior: "smooth"
  });
}

prevBtn?.addEventListener("click", () => slideProjects(-1));
nextBtn?.addEventListener("click", () => slideProjects(1));

// --- 4. CANVAS VISUAL EFFECTS ---

/**
 * Helper to draw a glowing radial point on canvas
 */
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

// HERO CANVAS INITIALIZATION
const heroCanvas = document.getElementById("heroCanvas");
const heroCtx = heroCanvas?.getContext("2d");
let heroW, heroH, heroDpr;

function resizeHero() {
  if (!heroCanvas) return;
  heroDpr = Math.min(window.devicePixelRatio || 1, 2);
  heroW = heroCanvas.clientWidth;
  heroH = heroCanvas.clientHeight;
  
  heroCanvas.width = heroW * heroDpr;
  heroCanvas.height = heroH * heroDpr;
  
  heroCtx?.setTransform(heroDpr, 0, 0, heroDpr, 0, 0);
}

// Generate star coordinates for background
const stars = Array.from({ length: 48 }, () => ({
  x: Math.random(), 
  y: Math.random(), 
  r: Math.random() * 1.1, 
  phase: Math.random() * Math.PI * 2, 
  speed: Math.random() * 0.4
}));

/**
 * Animation loop for the Hero background (Stars and Portal pulse)
 */
function animateHero(time) {
  if (!heroCtx) return;
  heroCtx.clearRect(0, 0, heroW, heroH);
  
  // Draw twinkling stars
  stars.forEach(s => {
    const twinkle = 0.2 + 0.5 * Math.pow((Math.sin(time * 0.001 * s.speed + s.phase) + 1) / 2, 2);
    glowPoint(heroCtx, s.x * heroW, s.y * heroH, s.r * 4, "255,230,255", twinkle * 0.25);
  });

  // Portal pulse effect (centered)
  const pulse = Math.sin(time * 0.001);
  glowPoint(heroCtx, heroW * 0.55, heroH * 0.5, 80 + pulse * 20, "155,230,255", 0.1);

  requestAnimationFrame(animateHero);
}

// Initialize Resize & Animation
window.addEventListener("resize", resizeHero);
resizeHero();

if (heroCtx) {
    requestAnimationFrame(animateHero);
}