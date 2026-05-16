// CONTACT PAGE — LIQUID CRYSTAL INTERACTION

const crystalCards = document.querySelectorAll(".crystal-card");

crystalCards.forEach((card) => {

  const reflection =
    card.querySelector(".glass-reflection");

  const innerLight =
    card.querySelector(".glass-inner-light");

  card.addEventListener("mousemove", (event) => {

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateY =
      ((x - centerX) / centerX) * 10;

    const rotateX =
      ((y - centerY) / centerY) * -8;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.02)
    `;

    const glowX =
      (x / rect.width) * 100;

    const glowY =
      (y / rect.height) * 100;

    if (innerLight) {

      innerLight.style.background = `
        radial-gradient(
          circle at ${glowX}% ${glowY}%,
          rgba(255,255,255,0.78),
          transparent 18%
        ),

        radial-gradient(
          circle at ${glowX}% ${glowY}%,
          rgba(120,235,255,0.22),
          transparent 34%
        ),

        radial-gradient(
          circle at 70% 50%,
          rgba(255,170,240,0.14),
          transparent 60%
        )
      `;
    }

    if (reflection) {

      reflection.style.opacity = "0.75";
    }
  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
      scale(1)
    `;

    if (reflection) {

      reflection.style.opacity = "0.42";
    }

    if (innerLight) {

      innerLight.style.background = `
        radial-gradient(
          circle at 20% 20%,
          rgba(255,255,255,0.7),
          transparent 18%
        ),

        radial-gradient(
          circle at 85% 75%,
          rgba(120,235,255,0.24),
          transparent 24%
        ),

        radial-gradient(
          circle at 60% 45%,
          rgba(255,170,240,0.16),
          transparent 54%
        )
      `;
    }
  });

  // CLICK CRYSTAL ACTIVATION

  card.addEventListener("click", () => {

    card.classList.add("active-crystal");

    createCrystalBurst(card);

    setTimeout(() => {

      card.classList.remove("active-crystal");

    }, 900);
  });
});

/* =========================
   CRYSTAL BURST
========================= */

function createCrystalBurst(card) {

  for (let i = 0; i < 16; i++) {

    const particle =
      document.createElement("span");

    particle.classList.add(
      "crystal-particle"
    );

    const size =
      Math.random() * 10 + 4;

    const posX =
      Math.random() * 100;

    const posY =
      Math.random() * 100;

    const moveX =
      (Math.random() - 0.5) * 220;

    const moveY =
      (Math.random() - 0.5) * 220;

    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;

    particle.style.left =
      `${posX}%`;

    particle.style.top =
      `${posY}%`;

    particle.style.setProperty(
      "--moveX",
      `${moveX}px`
    );

    particle.style.setProperty(
      "--moveY",
      `${moveY}px`
    );

    card.appendChild(particle);

    setTimeout(() => {

      particle.remove();

    }, 1400);
  }
}

/* =========================
   FLOATING AMBIENT LIGHT
========================= */

const ambientLights =
  document.querySelectorAll(".ambient");

document.addEventListener("mousemove", (e) => {

  const x =
    e.clientX / window.innerWidth;

  const y =
    e.clientY / window.innerHeight;

  ambientLights.forEach((light, index) => {

    const speed =
      (index + 1) * 18;

    light.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });
});

/* =========================
   SMOOTH PAGE REVEAL
========================= */

const revealElements =
  document.querySelectorAll(
    ".contact-copy, .contact-cards"
  );

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0px)";
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

revealElements.forEach((element) => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(60px)";

  element.style.transition =
    "1.2s ease";

  observer.observe(element);
});