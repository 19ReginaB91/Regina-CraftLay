const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const themeLinks = document.querySelectorAll("[data-theme-target]");
const driftCards = document.querySelectorAll("[data-drift-card]");
const dragTooltip = document.querySelector("[data-drag-tooltip]");
const engineeringOpen = document.querySelector("[data-engineering-open]");
const engineeringModal = document.querySelector("[data-engineering-modal]");
const engineeringCloseButtons = document.querySelectorAll("[data-engineering-close]");

/* MENU */

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

/* THEME SWITCHER */

const themes = {
  violet: {
    title: "Violet world",
    text: "Rebuilding the dreamy interface",
    url: "index.html"
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

/* ENGINEERING MODAL */

function openEngineeringModal() {
  if (!engineeringModal) return;

  engineeringModal.classList.add("is-open");
  engineeringModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeEngineeringModal() {
  if (!engineeringModal) return;

  engineeringModal.classList.remove("is-open");
  engineeringModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

engineeringOpen?.addEventListener("click", openEngineeringModal);

engineeringCloseButtons.forEach((button) => {
  button.addEventListener("click", closeEngineeringModal);
});

/* DRAGGABLE WILD FRAGMENTS */

const dragState = {
  card: null,
  pointerId: null,
  startX: 0,
  startY: 0,
  baseX: 0,
  baseY: 0
};

function isDesktopPointer() {
  return window.matchMedia("(min-width: 761px)").matches;
}

function moveTooltip(event, text = "Move this fragment") {
  if (!dragTooltip || !isDesktopPointer()) return;

  dragTooltip.textContent = text;
  dragTooltip.style.transform = `translate3d(${event.clientX + 18}px, ${
    event.clientY + 18
  }px, 0)`;
}

function showTooltip(event, text = "Move this fragment") {
  if (!dragTooltip || !isDesktopPointer()) return;

  moveTooltip(event, text);
  dragTooltip.classList.add("is-visible");
}

function hideTooltip() {
  dragTooltip?.classList.remove("is-visible");
}

function getCardOffset(card) {
  return {
    x: Number(card.dataset.x || 0),
    y: Number(card.dataset.y || 0)
  };
}

function setCardOffset(card, x, y) {
  card.dataset.x = String(x);
  card.dataset.y = String(y);
  card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function limitCardInsideSection(card, nextX, nextY) {
  const section = card.closest(".wild-fragments");

  if (!section) {
    return {
      x: nextX,
      y: nextY
    };
  }

  const sectionRect = section.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const currentOffset = getCardOffset(card);

  const deltaX = nextX - currentOffset.x;
  const deltaY = nextY - currentOffset.y;

  const nextLeft = cardRect.left + deltaX;
  const nextRight = cardRect.right + deltaX;
  const nextTop = cardRect.top + deltaY;
  const nextBottom = cardRect.bottom + deltaY;

  let limitedX = nextX;
  let limitedY = nextY;

  if (nextLeft < sectionRect.left) {
    limitedX += sectionRect.left - nextLeft;
  }

  if (nextRight > sectionRect.right) {
    limitedX -= nextRight - sectionRect.right;
  }

  if (nextTop < sectionRect.top) {
    limitedY += sectionRect.top - nextTop;
  }

  if (nextBottom > sectionRect.bottom) {
    limitedY -= nextBottom - sectionRect.bottom;
  }

  return {
    x: limitedX,
    y: limitedY
  };
}

driftCards.forEach((card) => {
  card.addEventListener("mouseenter", (event) => {
    showTooltip(event, "Move this fragment");
  });

  card.addEventListener("mousemove", (event) => {
    if (!dragState.card) {
      moveTooltip(event, "Move this fragment");
    }
  });

  card.addEventListener("mouseleave", () => {
    if (!dragState.card) {
      hideTooltip();
    }
  });

  card.addEventListener("pointerdown", (event) => {
    if (!isDesktopPointer()) return;

    event.preventDefault();

    const offset = getCardOffset(card);

    dragState.card = card;
    dragState.pointerId = event.pointerId;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.baseX = offset.x;
    dragState.baseY = offset.y;

    card.classList.add("is-dragging");
    card.setPointerCapture(event.pointerId);

    showTooltip(event, "Place it here");
  });
});

document.addEventListener("pointermove", (event) => {
  const card = dragState.card;

  if (!card || dragState.pointerId !== event.pointerId) return;

  event.preventDefault();

  const nextX = dragState.baseX + event.clientX - dragState.startX;
  const nextY = dragState.baseY + event.clientY - dragState.startY;
  const limited = limitCardInsideSection(card, nextX, nextY);

  setCardOffset(card, limited.x, limited.y);
  moveTooltip(event, "Place it here");
});

document.addEventListener("pointerup", (event) => {
  const card = dragState.card;

  if (!card || dragState.pointerId !== event.pointerId) return;

  card.releasePointerCapture(event.pointerId);
  card.classList.remove("is-dragging");
  hideTooltip();

  dragState.card = null;
  dragState.pointerId = null;
});

document.addEventListener("pointercancel", () => {
  const card = dragState.card;

  if (!card) return;

  card.classList.remove("is-dragging");
  hideTooltip();

  dragState.card = null;
  dragState.pointerId = null;
});

/* ESCAPE */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeEngineeringModal();
  }
});

/* SCROLL REVEAL */

const revealItems = document.querySelectorAll(`
  .hero-copy,
  .theme-switcher,
  .hero-note,
  .wild-system-copy,
  .wild-system-divider,
  .hex-card,
  .featured-work,
  .work-card,
  .wild-footer
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