document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const yearElement = document.querySelector("#year");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableItems = document.querySelectorAll("[data-i18n]");
const revealItems = document.querySelectorAll(".reveal");

const translations = {
  en: {
    navOffer: "Offer",
    navPrices: "Prices",
    navProjects: "Projects",
    navWorlds: "Worlds",
    navContact: "Contact",
    headerCta: "Start a project",

    heroEyebrow: "Creative Frontend Atelier",
    heroTitle: "Digital worlds,",
    heroTitleAccent: "tailored by hand.",
    heroText:
      "I design and code websites with structure, mood and edge — clear enough for business, emotional enough to be remembered.",
    heroButtonPrices: "See prices",
    heroButtonWorlds: "Walk through my worlds",
    heroCaptionOne: "Designed with feeling",
    heroCaptionTwo: "Coded by hand",
    heroSideText: "Structure / Mood / Frontend / Visual Direction",

    statementNumber: "01",
    statementTitle: "I don’t build pages.",
    statementTitleAccent: "I build atmospheres.",
    statementText:
      "Every project needs its own visual language — sometimes calm and minimal, sometimes deep and dramatic, sometimes clean and trustworthy. My work starts with mood, continues with structure and ends in clean code.",

    offerEyebrow: "What I create",
    offerTitle: "Design direction,",
    offerTitleAccent: "structure and code.",
    offerOneTitle: "Landing Pages",
    offerOneText:
      "Strong one-page websites for offers, campaigns and first business presence.",
    offerTwoTitle: "Business Websites",
    offerTwoText:
      "Multi-page websites for local businesses, services and personal brands.",
    offerThreeTitle: "Visual Concepts",
    offerThreeText:
      "Mood, colors, layout direction and the world your project should live in.",
    offerFourTitle: "Frontend Build",
    offerFourText:
      "Responsive HTML, CSS and JavaScript — clean, structured and handcrafted.",

    pricesEyebrow: "Starting prices",
    pricesTitle: "Clear packages,",
    pricesTitleAccent: "custom depth.",
    pricesText:
      "Every project is different. These prices are starting points — the final price depends on pages, content, design depth and special features.",
    priceOneName: "Landing Page",
    priceOneValue: "from 900 €",
    priceOneText: "One-page website / responsive layout / contact section",
    priceTwoName: "Business Website",
    priceTwoValue: "from 1.500 €",
    priceTwoText: "Several pages / services / mobile version / legal pages",
    priceThreeName: "Premium Website",
    priceThreeValue: "from 2.500 €",
    priceThreeText:
      "Custom visual world / stronger concept / animations / more depth",

    projectsEyebrow: "Selected works",
    projectsTitle: "Websites with",
    projectsTitleAccent: "their own character.",
    projectOneType: "Premium business website",
    projectOneTitle: "Rund um den Baum",
    projectOneText:
      "A multi-page tree service website with natural depth, clear service structure, legal pages, contact flow and responsive layout.",
    projectTwoType: "Local service website",
    projectTwoTitle: "Kristall Reinigung",
    projectTwoText:
      "A clean business website for a cleaning company with service structure, accordion content and trust-focused customer flow.",
    projectThreeType: "Creative studio website",
    projectThreeTitle: "Amarte Design Studio",
    projectThreeText:
      "A creative multi-page website with gallery filters, visual storytelling and strong editorial atmosphere.",
    projectFourType: "Campaign landing page",
    projectFourTitle: "Hannah Sport",
    projectFourText:
      "A campaign landing page with product cards, promotional sections and conversion-focused structure.",
    projectLink: "Visit website",

    worldsEyebrow: "Design worlds",
    worldsTitle: "Walk through",
    worldsTitleAccent: "my worlds.",
    worldsText:
      "First, see what we can build. Then, walk through the moods — from clean signal to wild editorial edge.",
    worldsNote:
      "These worlds are still growing and will be updated regularly — like a living portfolio.",

    worldPrimaryTitle: "Clean Signal",
    worldPrimaryText:
      "The clear starting point — bright, structured and direct, with sharp lime and a quiet blue undertone.",
    worldCurrent: "You are here",

    worldOneTitle: "Wild Noir",
    worldOneText:
      "Deep contrast, editorial drama, black-and-white strength and a hidden textile edge.",
    worldTwoTitle: "Violet Mood",
    worldTwoText:
      "Luminous accents, digital softness and a little bit of visual magic.",
    worldThreeTitle: "Soft Nude",
    worldThreeText:
      "Warm, calm and refined — for projects that need softness, trust and elegance.",
    worldVisit: "Enter world",

    contactEyebrow: "Start a project",
    contactTitle: "Have an idea?",
    contactTitleAccent: "Let’s give it a world.",
    contactText:
      "Tell me what you want to create — a landing page, a business website, a portfolio or a complete visual direction.",
    contactButton: "Write me",

    footerBack: "Back to top",
    footerEmail: "Email",
    footerGithub: "GitHub",
    footerImpressum: "Impressum",
    footerDatenschutz: "Privacy Policy",
    footerCookies: "Cookie settings"
  },

  de: {
    navOffer: "Angebot",
    navPrices: "Preise",
    navProjects: "Projekte",
    navWorlds: "Welten",
    navContact: "Kontakt",
    headerCta: "Projekt starten",

    heroEyebrow: "Kreatives Frontend-Atelier",
    heroTitle: "Digitale Welten,",
    heroTitleAccent: "von Hand gestaltet.",
    heroText:
      "Ich gestalte und entwickle Webseiten mit Struktur, Stimmung und Charakter — klar genug fürs Business und emotional genug, um in Erinnerung zu bleiben.",
    heroButtonPrices: "Preise ansehen",
    heroButtonWorlds: "Durch meine Welten gehen",
    heroCaptionOne: "Mit Gefühl gestaltet",
    heroCaptionTwo: "Von Hand programmiert",
    heroSideText: "Struktur / Stimmung / Frontend / Visuelle Richtung",

    statementNumber: "01",
    statementTitle: "Ich baue keine Seiten.",
    statementTitleAccent: "Ich baue Atmosphären.",
    statementText:
      "Jedes Projekt braucht seine eigene visuelle Sprache — manchmal ruhig und minimalistisch, manchmal tief und dramatisch, manchmal klar und vertrauensvoll. Meine Arbeit beginnt mit Stimmung, wächst durch Struktur und endet in sauberem Code.",

    offerEyebrow: "Was ich erstelle",
    offerTitle: "Designrichtung,",
    offerTitleAccent: "Struktur und Code.",
    offerOneTitle: "Landing Pages",
    offerOneText:
      "Starke Onepager für Angebote, Kampagnen oder den ersten professionellen Auftritt.",
    offerTwoTitle: "Business-Webseiten",
    offerTwoText:
      "Mehrseitige Webseiten für lokale Unternehmen, Dienstleister und persönliche Marken.",
    offerThreeTitle: "Visuelle Konzepte",
    offerThreeText:
      "Stimmung, Farben, Layout-Richtung und die Welt, in der Ihr Projekt leben soll.",
    offerFourTitle: "Frontend-Umsetzung",
    offerFourText:
      "Responsive HTML-, CSS- und JavaScript-Umsetzung — klar, strukturiert und handgemacht.",

    pricesEyebrow: "Startpreise",
    pricesTitle: "Klare Pakete,",
    pricesTitleAccent: "individuelle Tiefe.",
    pricesText:
      "Jedes Projekt ist anders. Diese Preise sind Startpunkte — der endgültige Preis hängt von Seitenumfang, Inhalten, Designtiefe und besonderen Funktionen ab.",
    priceOneName: "Landing Page",
    priceOneValue: "ab 900 €",
    priceOneText: "Onepager / responsive Layout / Kontaktbereich",
    priceTwoName: "Business-Webseite",
    priceTwoValue: "ab 1.500 €",
    priceTwoText: "Mehrere Seiten / Leistungen / mobile Version / Rechtliches",
    priceThreeName: "Premium-Webseite",
    priceThreeValue: "ab 2.500 €",
    priceThreeText:
      "Eigene visuelle Welt / stärkeres Konzept / Animationen / mehr Tiefe",

    projectsEyebrow: "Ausgewählte Arbeiten",
    projectsTitle: "Webseiten mit",
    projectsTitleAccent: "eigenem Charakter.",
    projectOneType: "Premium-Webseite für Dienstleister",
    projectOneTitle: "Rund um den Baum",
    projectOneText:
      "Eine mehrseitige Webseite für einen Baumpflegebetrieb mit natürlicher Tiefe, klarer Leistungsstruktur, rechtlichen Seiten, Kontaktführung und responsivem Layout.",
    projectTwoType: "Webseite für lokales Unternehmen",
    projectTwoTitle: "Kristall Reinigung",
    projectTwoText:
      "Eine klare Business-Webseite für eine Reinigungsfirma mit Leistungsstruktur, Akkordeon-Inhalten und vertrauensvollem Kundenweg.",
    projectThreeType: "Webseite für ein Kreativstudio",
    projectThreeTitle: "Amarte Design Studio",
    projectThreeText:
      "Eine kreative mehrseitige Webseite mit Galerie-Filtern, visuellem Storytelling und starker editorialer Atmosphäre.",
    projectFourType: "Kampagnen-Landingpage",
    projectFourTitle: "Hannah Sport",
    projectFourText:
      "Eine Kampagnen-Landingpage mit Produktkarten, Aktionsbereichen und klarer Conversion-Struktur.",
    projectLink: "Webseite ansehen",

    worldsEyebrow: "Designwelten",
    worldsTitle: "Spazieren Sie durch",
    worldsTitleAccent: "meine Welten.",
    worldsText:
      "Zuerst sehen Sie, was wir bauen können. Danach beginnt der Spaziergang durch die Stimmungen — von Clean Signal bis zu wildem Editorial Edge.",
    worldsNote:
      "Diese Welten sind noch im Aufbau und werden regelmäßig erweitert — wie ein lebendiges Portfolio.",

    worldPrimaryTitle: "Clean Signal",
    worldPrimaryText:
      "Der klare Ausgangspunkt — hell, strukturiert und direkt, mit scharfem Lime und einem ruhigen blauen Unterton.",
    worldCurrent: "Sie sind hier",

    worldOneTitle: "Wild Noir",
    worldOneText:
      "Starke Kontraste, editorialer Ausdruck, Schwarz-Weiß-Kraft und eine versteckte textile Ebene.",
    worldTwoTitle: "Violet Mood",
    worldTwoText:
      "Leuchtende Akzente, digitale Weichheit und ein kleiner Hauch visueller Magie.",
    worldThreeTitle: "Soft Nude",
    worldThreeText:
      "Warm, ruhig und fein — für Projekte, die Weichheit, Vertrauen und Eleganz brauchen.",
    worldVisit: "Welt betreten",

    contactEyebrow: "Projekt starten",
    contactTitle: "Sie haben eine Idee?",
    contactTitleAccent: "Wir geben ihr eine Welt.",
    contactText:
      "Erzählen Sie mir, was entstehen soll — eine Landing Page, eine Business-Webseite, ein Portfolio oder eine vollständige visuelle Richtung.",
    contactButton: "Schreiben Sie mir",

    footerBack: "Nach oben",
    footerEmail: "E-Mail",
    footerGithub: "GitHub",
    footerImpressum: "Impressum",
    footerDatenschutz: "Datenschutz",
    footerCookies: "Cookie-Einstellungen"
  }
};

function initYear() {
  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

function closeMobileMenu() {
  document.body.classList.remove("menu-open");

  if (!menuButton) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}

function initMobileMenu() {
  if (!menuButton) return;

  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

function setLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";
  const dictionary = translations[selectedLanguage];

  translatableItems.forEach((item) => {
    const key = item.dataset.i18n;

    if (!key || !dictionary[key]) return;

    item.textContent = dictionary[key];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === selectedLanguage;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.documentElement.lang = selectedLanguage;
  localStorage.setItem("regina-craftlay-language", selectedLanguage);
}

function initLanguageSwitcher() {
  if (!languageButtons.length || !translatableItems.length) return;

  const savedLanguage = localStorage.getItem("regina-craftlay-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  const initialLanguage = savedLanguage || browserLanguage;

  setLanguage(initialLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });
}

function initReveal() {
  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

function initHeaderShadow() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

initYear();
initMobileMenu();
initLanguageSwitcher();
initReveal();
initHeaderShadow();