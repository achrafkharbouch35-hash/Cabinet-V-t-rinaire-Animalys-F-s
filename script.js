/* ================================
   CABINET VÉTÉRINAIRE — script.js
   ================================ */

const CONFIG = {
  whatsapp: "212535732732",
  whatsappMessage: "Bonjour, je souhaite prendre rendez-vous au cabinet vétérinaire.",
  phone: "+212535732732",
  email: "contact@cabinet.ma",
  instagramUrl: "https://www.instagram.com/animalys_fes_/",
  address: "Atlas, N3 résidence Salma, Rue El Abed El Fassi, Fès 30000",

  hours: {
    lunVen: "Lundi – Vendredi : 09:00 – 19:00",
    sam: "Samedi : 09:00 – 13:00",
    dim: "Dimanche : Fermé"
  },

  mapUrl: "https://www.google.com/maps?q=Atlas,+N3+residence+Salma,+Rue+El+Abed+El+Fassi,+Fes+30000&output=embed"
};

document.addEventListener("DOMContentLoaded", () => {

  /* ===== Année automatique ===== */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  /* ===== WhatsApp ===== */
  if (CONFIG.whatsapp && !CONFIG.whatsapp.includes("X")) {
    const whatsappUrl =
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

    const whatsappLinks = [
      document.getElementById("hero-whatsapp"),
      document.getElementById("floating-whatsapp"),
      document.getElementById("contact-whatsapp")
    ];

    whatsappLinks.forEach(link => {
      if (link) {
        link.href = whatsappUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }

  /* ===== Téléphone ===== */
  const phoneLink = document.getElementById("contact-phone");
  if (phoneLink) {
    phoneLink.href = `tel:${CONFIG.phone.replace(/\s+/g, "")}`;
    phoneLink.textContent = CONFIG.phone;
  }

  /* ===== Email ===== */
  const emailLink = document.getElementById("contact-email");
  if (emailLink) {
    emailLink.href = `mailto:${CONFIG.email}`;
    emailLink.textContent = CONFIG.email;
  }

  /* ===== Instagram ===== */
  const instagramLink = document.getElementById("contact-instagram");
  if (instagramLink && CONFIG.instagramUrl) {
    instagramLink.href = CONFIG.instagramUrl;
    instagramLink.target = "_blank";
    instagramLink.rel = "noopener noreferrer";

    const match = CONFIG.instagramUrl.match(/instagram\.com\/([^/?#]+)/i);
    if (match) {
      instagramLink.textContent = "@" + match[1];
    }
  }

  /* ===== Adresse ===== */
  const address = document.getElementById("contact-address");
  if (address) address.textContent = CONFIG.address;

  /* ===== Horaires ===== */
  const hoursLun = document.getElementById("contact-hours-lun");
  const hoursSam = document.getElementById("contact-hours-sam");
  const hoursDim = document.getElementById("contact-hours-dim");

  if (hoursLun) hoursLun.textContent = CONFIG.hours.lunVen;
  if (hoursSam) hoursSam.textContent = CONFIG.hours.sam;
  if (hoursDim) hoursDim.textContent = CONFIG.hours.dim;

  /* ===== Google Maps ===== */
  const map = document.getElementById("contact-map-frame");
  if (map && CONFIG.mapUrl) map.src = CONFIG.mapUrl;

  /* ===== Menu mobile ===== */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const ouvert = nav.classList.toggle("open");
      hamburger.classList.toggle("active", ouvert);
      hamburger.setAttribute("aria-expanded", String(ouvert));
      hamburger.setAttribute(
        "aria-label",
        ouvert ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }

  /* ===== Navigation fluide ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* ===== Animations au scroll ===== */
  const revealElements = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("is-visible"));
  }

  /* ===== Conseils : ouverture/fermeture si des boutons existent ===== */
  document.querySelectorAll("[data-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-toggle");
      const target = document.getElementById(targetId);

      if (!target) return;

      const ouvert = target.classList.toggle("open");
      button.setAttribute("aria-expanded", String(ouvert));
    });
  });

});
