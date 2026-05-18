const header = document.querySelector(".journal-header");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

/* REVEAL */

const revealElements = document.querySelectorAll(
  ".hero-content, .manifesto, .meaning-panel, .world-card, .journal-footer"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

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
      <p>That is why crystals became one of the core symbols of CraftLay — they represent beauty born from structure.</p>
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
      <p>I want digital experiences to feel immersive, emotional and cinematic — like stepping into another atmosphere.</p>
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
      <p>I want people to feel comfortable inside the interface — surrounded by light, depth and softness instead of rigid digital walls.</p>
    `
  },

  philosophy: {
    kicker: "Philosophy",
    title: "Glowing flowers as a symbol of the living web.",
    image: "assets/media/flowers.png",
    text: `
      <p>The glowing flowers inside my worlds symbolize something very important to me: technology should still feel alive.</p>
      <p>By combining organic floral forms with glowing digital light, I try to create a balance between nature and technology — between code and emotion.</p>
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
      <p>But for me, it means much more than that. CraftLay represents the philosophy of building digital experiences by hand — carefully, emotionally and intentionally.</p>
      <p>I wanted to build layouts that feel crafted. Worlds that feel personal. Interfaces that leave emotional traces behind them.</p>
      <p>CraftLay is where digital structure meets handmade emotion.</p>
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

storyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const story = stories[button.dataset.story];
    if (!story) return;

    storyImage.src = story.image;
    storyKicker.textContent = story.kicker;
    storyTitle.textContent = story.title;
    storyText.innerHTML = story.text;

    storyModal.classList.add("is-open");
    storyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeStoryModal);
});

function closeStoryModal() {
  storyModal.classList.remove("is-open");
  storyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeStoryModal();
  }
});