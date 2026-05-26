const teaserPage = document.querySelector("[data-teaser-page]");

window.addEventListener("load", () => {
  teaserPage?.classList.add("is-ready");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  window.location.href = "index.html";
});