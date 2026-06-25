/* =========================================================
   1. MENÚ MÓVIL (abrir/cerrar el sidebar en pantallas chicas)
   ========================================================= */
const menuToggle = document.getElementById("menuToggle");
const editorBody = document.getElementById("editorBody");

menuToggle.addEventListener("click", () => {
  const isOpen = editorBody.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Si el usuario toca un link del menú en mobile, lo cerramos
document.querySelectorAll(".file-link").forEach((link) => {
  link.addEventListener("click", () => {
    editorBody.classList.remove("menu-open");
  });
});

// Cerrar el menú si se hace click afuera (en el overlay oscuro)
editorBody.addEventListener("click", (e) => {
  if (e.target === editorBody && editorBody.classList.contains("menu-open")) {
    editorBody.classList.remove("menu-open");
  }
});

/* =========================================================
   2. LIGHTBOX: ampliar la foto de perfil al hacer click
   ========================================================= */
const avatarTrigger = document.getElementById("avatarTrigger");
const avatarImg = document.querySelector(".profile__avatar-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox() {
  // Si la foto no cargó (se está mostrando el fallback de iniciales), no hay nada que agrandar
  if (avatarImg.style.display === "none") return;

  lightboxImg.src = avatarImg.src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden"; // evita que se scrollee el fondo
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  avatarTrigger.focus();
}

avatarTrigger.addEventListener("click", openLightbox);

// Accesibilidad: que también funcione con Enter o espacio, no solo con el mouse
avatarTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

// Cerrar al hacer click en el fondo oscuro (pero no si se clickea la imagen)
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* =========================================================
   3. NAVEGACIÓN POR PESTAÑAS (tabs arriba del contenido)
   Al hacer click en una pestaña, hacemos scroll a esa sección.
   ========================================================= */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.getElementById(tab.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* =========================================================
   4. SCROLL SPY
   Detecta qué sección está visible y marca la pestaña/link
   correspondiente como activa. Usa IntersectionObserver,
   que es mucho más eficiente que calcular scroll a mano.
   ========================================================= */
const sections = document.querySelectorAll(".panel");
const tabs = document.querySelectorAll(".tab");
const fileLinks = document.querySelectorAll(".file-link");

const setActive = (id) => {
  tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.target === id));
  fileLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.target === id));
};

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" } // se activa cuando la sección cruza el centro de la pantalla
);

sections.forEach((section) => spyObserver.observe(section));

/* =========================================================
   5. ANIMACIÓN DE ENTRADA (fade-in al hacer scroll)
   ========================================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => revealObserver.observe(section));

/* =========================================================
   6. EFECTO DE TIPEO en el saludo principal
   ========================================================= */
const typedTextEl = document.getElementById("typedText");
// ✏️ EDITAR: cambiá este texto por tu propia frase de presentación
const phrase = "Buenas soy MARIO 👋";
let charIndex = 0;

function typeWriter() {
  if (charIndex <= phrase.length) {
    typedTextEl.textContent = phrase.slice(0, charIndex);
    charIndex++;
    setTimeout(typeWriter, 55);
  }
}
typeWriter();

/* =========================================================
   7. RELOJ EN VIVO (barra de estado, abajo)
   ========================================================= */
const clockEl = document.getElementById("clock");

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  clockEl.textContent = `🕒 ${hh}:${mm}`;
}
updateClock();
setInterval(updateClock, 1000 * 30); // se actualiza cada 30 segundos, no hace falta cada segundo

/* =========================================================
   8. AÑO ACTUAL en el copyright (para no tener que editarlo cada año)
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   9. FORMULARIO DE CONTACTO
   Usamos Formspree (https://formspree.io) para recibir los
   mensajes por email sin necesidad de programar un backend.

   ✏️ EDITAR: reemplazá "TU_ID_AQUI" por el endpoint que te da
   Formspree al crear tu cuenta gratuita (paso explicado en el README).
   ========================================================= */
const FORM_ENDPOINT = "https://formspree.io/f/xwvdlpep";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".btn-submit");
  submitBtn.disabled = true;
  formStatus.textContent = "Enviando...";
  formStatus.className = "form-status";

  // Si todavía no configuraste Formspree, avisamos en vez de fallar en silencio
  if (FORM_ENDPOINT.includes("TU_ID_AQUI")) {
    formStatus.textContent =
      "⚠️ Falta conectar el formulario a Formspree (ver README). Mientras tanto, escribime por email.";
    formStatus.className = "form-status is-error";
    submitBtn.disabled = false;
    return;
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(contactForm),
    });

    if (response.ok) {
      formStatus.textContent = "✅ ¡Mensaje enviado! Te voy a responder a la brevedad.";
      formStatus.className = "form-status is-success";
      contactForm.reset();
    } else {
      throw new Error("Respuesta no exitosa del servidor");
    }
  } catch (error) {
    formStatus.textContent = "❌ Hubo un error al enviar. Probá de nuevo o escribime por email.";
    formStatus.className = "form-status is-error";
  } finally {
    submitBtn.disabled = false;
  }
});