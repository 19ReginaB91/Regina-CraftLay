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

/* THREE WORLDS TOGGLE */

const worldToggle = document.querySelector("[data-world-toggle]");
const worldAnswer = document.querySelector("[data-world-answer]");

worldToggle?.addEventListener("click", () => {
  worldToggle.classList.toggle("is-open");
  worldAnswer?.classList.toggle("is-open");
});

/* STORY MODAL */

const stories = {
  symbolism: {
    kicker: "Symbolism",
    title: "Crystals as structure, clarity and clean code.",
    image: "assets/media/crytals.png",
    text: `
      <p>Crystals inside my visual language are not just decorative objects or fantasy aesthetics. For me, they symbolize structure, precision and clarity.</p>
      <p>A real crystal is formed layer by layer under pressure until every edge becomes intentional and perfectly balanced. I see frontend architecture the same way.</p>
      <p>Behind every glowing surface there is structure. Behind every beautiful interface there is logic. And behind every visual emotion there is carefully crafted code.</p>
      <p>That is why crystals became one of the core symbols of CraftLay - they represent beauty born from structure.</p>
    `
  },

  metaphor: {
    kicker: "Metaphor",
    title: "The hand as a bridge between imagination and digital matter.",
    image: "assets/media/hand.png",
    text: `
      <p>The hand on the homepage represents the moment where imagination becomes something real.</p>
      <p>For me, frontend development is deeply human and tactile. It is a process of taking invisible ideas and turning them into something people can touch, see and feel through a screen.</p>
      <p>The portal symbolizes the boundary between imagination and digital reality. The hand crossing through it represents creation itself.</p>
      <p>This is why hand-crafted details are so important in my work. I want every interaction to feel intentional, emotional and alive.</p>
    `
  },

  atmosphere: {
    kicker: "Atmosphere",
    title: "Cosmos as the space where fantasy has no ceiling.",
    image: "assets/media/cosmos.png",
    text: `
      <p>Cosmos became part of my visual identity because it represents limitless creative freedom.</p>
      <p>I wanted to build worlds that feel larger than a screen. For me, space is a metaphor for infinite possibilities.</p>
      <p>Every glowing particle, hidden interaction or layered animation exists to create the feeling that the interface continues beyond its visible borders.</p>
      <p>I want digital experiences to feel immersive, emotional and cinematic - like stepping into another atmosphere.</p>
    `
  },

  aesthetic: {
    kicker: "Aesthetic",
    title: "Glass UI as transparency, depth and emotional softness.",
    image: "assets/media/glass.png",
    text: `
      <p>Glassmorphism inside CraftLay is not used as a trend. It exists as a feeling.</p>
      <p>I use translucent layers, soft reflections and glowing glass elements to create emotional depth and visual breathing space.</p>
      <p>Glass softens the boundary between technology and emotion. It allows interfaces to feel lighter, calmer and more human.</p>
      <p>I want people to feel comfortable inside the interface - surrounded by light, depth and softness instead of rigid digital walls.</p>
    `
  },

  philosophy: {
    kicker: "Philosophy",
    title: "Glowing flowers as a symbol of the living web.",
    image: "assets/media/flowers.png",
    text: `
      <p>The glowing flowers inside my worlds symbolize something very important to me: technology should still feel alive.</p>
      <p>By combining organic floral forms with glowing digital light, I try to create a balance between nature and technology - between code and emotion.</p>
      <p>The flowers represent warmth inside structure. Softness inside logic. Life inside algorithms.</p>
      <p>Even inside HTML, CSS and JavaScript, there is still room for poetry.</p>
    `
  },

  craftlay: {
    kicker: "Why CraftLay?",
    title: "Crafted layouts, handmade emotion and digital structure.",
    image: "assets/media/craft-lay.png",
    text: `
      <p>The name CraftLay comes from two ideas combined together: crafted layouts.</p>
      <p>But for me, it means much more than that. CraftLay represents the philosophy of building digital experiences by hand - carefully, emotionally and intentionally.</p>
      <p>I wanted to build layouts that feel crafted. Worlds that feel personal. Interfaces that leave emotional traces behind them.</p>
      <p>CraftLay is where digital structure meets handmade emotion.</p>
    `
  },

  worldWild: {
    kicker: "Wild / Emerald Noir",
    title: "A fearless world of contrast, instinct and visual freedom.",
    image: "assets/media/wild-m.png",
    text: `
      <p>WILD was born from my desire to break visual predictability.</p>
      <p>I wanted to create a world that was not afraid of personality, contrast and its own energy. Not sterile design made only for trends, but something emotionally alive and fearless.</p>
      <p>Every detail here was refined for days: deep shadows, emerald reflections, golden accents, violet light, textures and atmosphere. I was not simply combining colors - I was searching for the exact feeling they should create together.</p>
      <p>Even the leopard texture was never added for glamour. To me, it became a symbol of individuality and the refusal to become visually invisible among thousands of identical interfaces.</p>
      <p>WILD is freedom. Freedom to create without fear. Freedom to feel visually loud, emotional and unapologetically alive.</p>
    `
  },

  worldViolet: {
    kicker: "Violet / Dreamy Cosmic",
    title: "A digital dream where code, emotion and imagination merge.",
    image: "assets/media/violet-m.png",
    text: `
      <p>VIOLET became my digital dream world - a space where code, emotion and imagination merge together.</p>
      <p>I did not want to create just another beautiful sci-fi interface. I wanted the feeling of stepping into another atmosphere, another reality that feels alive on its own.</p>
      <p>Every particle, crystal, glow, portal and nebula was refined for hours and days. Sometimes everything already worked visually, but emotionally it still did not feel right - so I kept polishing every detail further.</p>
      <p>Even the code itself carries meaning. It travels through the hand, enters the portal as HTML - structure and foundation - and exits as JavaScript: movement, energy and life.</p>
      <p>Nothing inside this world exists randomly. Every detail is connected and carries its own emotional purpose.</p>
      <p>VIOLET is a part of my inner world translated into digital form.</p>
    `
  },

  worldNude: {
    kicker: "Nude / Soft Editorial",
    title: "A warm minimal world where quiet design still feels alive.",
    image: "assets/media/nude-m.png",
    text: `
      <p>NUDE was created as the opposite of the cold minimalism that feels visually identical everywhere today.</p>
      <p>I wanted to create a space where minimalism could still feel emotional, warm and deeply human. Not empty. Not sterile. But calm and alive.</p>
      <p>Every tone, soft light, glass reflection, texture and open space was carefully refined. I wanted the interface to feel not only beautiful, but physically calming and emotionally comfortable for the eyes.</p>
      <p>There is no aggression here. No need to scream visually. Yet the atmosphere still carries depth, emotion and something deeply personal.</p>
      <p>NUDE is quiet confidence. Softness without weakness. And beauty that does not need to be loud to leave a strong feeling behind.</p>
    `
  }
};

const storyModal = document.querySelector("[data-story-modal]");
const storyImage = document.querySelector("[data-story-image]");
const storyKicker = document.querySelector("[data-story-kicker]");
const storyTitle = document.querySelector("[data-story-title]");
const storyText = document.querySelector("[data-story-text]");
const storyButtons = document.querySelectorAll("[data-story]");
const closeButtons = document.querySelectorAll("[data-story-close]");

function closeStoryModal() {
  if (!storyModal) return;

  storyModal.classList.remove("is-open");
  storyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

storyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const story = stories[button.dataset.story];

    if (!story || !storyModal) return;

    if (storyImage) storyImage.src = story.image;
    if (storyKicker) storyKicker.textContent = story.kicker;
    if (storyTitle) storyTitle.textContent = story.title;
    if (storyText) storyText.innerHTML = story.text;

    storyModal.classList.add("is-open");
    storyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeStoryModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeStoryModal();
  }
});

/* REVEAL */

const revealElements = document.querySelectorAll(
  ".hero-content, .manifesto, .meaning-panel, .world-question, .world-answer, .world-card, .journal-footer"
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
      threshold: 0.16
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("reveal", "is-visible");
  });
}