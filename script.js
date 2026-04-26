const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const filterChips = document.querySelectorAll(".filter-chip");
const bikeCards = document.querySelectorAll(".bike-card");
const leadForm = document.querySelector("#lead-form");
const formStatus = document.querySelector("#form-status");
const yearSlot = document.querySelector("#year");
const revealTargets = document.querySelectorAll(".reveal");

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

// Navbar toggle
if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Filter bikes
filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const selected = chip.dataset.filter;

    filterChips.forEach((item) => {
      const isActive = item === chip;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    bikeCards.forEach((card) => {
      const shouldShow =
        selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// ✅ FORM → WHATSAPP INTEGRATION
if (leadForm && formStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = String(formData.get("name") || "User");
    const bikeType = String(formData.get("type") || "Bike");
    const message = String(formData.get("message") || "No message");

    // WhatsApp formatted message
    const text = `Name: ${name}%0ABike: ${bikeType}%0AMessage: ${message}`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=919322143610&text=${text}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // UI feedback
    formStatus.textContent = `${name}, redirecting you to WhatsApp...`;

    leadForm.reset();
  });
}

// Scroll reveal animation
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) =>
    element.classList.add("is-visible")
  );
}
