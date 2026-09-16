//Animation #1
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-right-card");

  // On cache les cartes avant l'animation pour éviter un "flash" au chargement
  cards.forEach((card) => {
    card.style.opacity = "0";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const card = entry.target;

          card.animate(
            [
              { opacity: 0, transform: "translateX(-40px)" },
              { opacity: 1, transform: "translateX(0)" },
            ],
            {
              duration: 600,
              delay: index * 150, // effet "cascade" entre les 4 cartes
              easing: "ease-out",
              fill: "forwards",
            }
          );

          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
});