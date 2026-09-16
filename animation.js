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
// Animation #2
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("benefits-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 4000);
});