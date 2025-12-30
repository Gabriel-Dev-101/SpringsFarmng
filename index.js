document.addEventListener("DOMContentLoaded", function () {

  /* =====================
     AUTH BUTTON VISIBILITY
  ===================== */
  const authButtons = document.getElementById("auth-buttons");
  if (authButtons) {
    authButtons.style.display =
      localStorage.getItem("isLoggedIn") === "true" ? "none" : "flex";
  }

  /* =====================
     CONTACT FORM (ONLY ONE)
  ===================== */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const spinner = document.getElementById("loading-spinner");
      const submitBtn = this.querySelector("button");

      spinner.style.display = "flex";
      submitBtn.disabled = true;

      emailjs.sendForm("service_uuk7zqi", "template_w1i4k1x", this)
        .then(() => {
          spinner.style.display = "none";
          submitBtn.disabled = false;
          alert("Message sent successfully!");
          this.reset();
        })
        .catch(error => {
          spinner.style.display = "none";
          submitBtn.disabled = false;
          alert("Failed to send message");
          console.error(error);
        });
    });
  }

  /* =====================
     SCROLL ANIMATIONS
  ===================== */
  const scrollGroups = [
    ".cf-scroll",
    ".tm-scroll",
    ".vm-scroll-animate"
  ];

  function revealOnScroll() {
    scrollGroups.forEach(selector => {
      document.querySelectorAll(selector).forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight - 100) {
          item.classList.add("show");
        }
      });
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* =====================
     SLIDESHOW
  ===================== */
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    slideIndex = index;
  }

  function changeSlide(n) {
    showSlide((slideIndex + n + slides.length) % slides.length);
  }

  setInterval(() => changeSlide(1), 4000);

  /* =====================
     MOBILE NAV
  ===================== */
  window.openNav = () =>
    document.getElementById("mobileMenu").style.width = "260px";

  window.closeNav = () =>
    document.getElementById("mobileMenu").style.width = "0";

  /* =====================
     AI CHAT
  ===================== */
  window.toggleAI = () => {
    const chat = document.getElementById("aiChat");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  };

  window.sendAI = () => {
    const input = document.getElementById("aiInput");
    const messages = document.getElementById("aiMessages");
    if (!input.value.trim()) return;

    messages.innerHTML += `<div class="ai-msg user">${input.value}</div>`;
    setTimeout(() => {
      messages.innerHTML += `<div class="ai-msg ai">I'm here to help!</div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 600);

    input.value = "";
  };

  /* =====================
     STICKY HEADER SHADOW
  ===================== */
  window.addEventListener("scroll", () => {
    document
      .getElementById("main-header")
      ?.classList.toggle("scrolled", window.scrollY > 10);
  });

});
document.addEventListener("DOMContentLoaded", () => {

  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (dots[i]) dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    slideIndex = index;
  }

  function changeSlide(n) {
    let newIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(newIndex);
    restartAutoSlide();
  }

  function goToSlide(n) {
    showSlide(n);
    restartAutoSlide();
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      changeSlide(1);
    }, 4000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // expose functions to HTML buttons
  window.changeSlide = changeSlide;
  window.goToSlide = goToSlide;

  showSlide(0);
  startAutoSlide();
});
const authModal = document.getElementById("authModal");

function showAuth() {
  authModal.style.display = "flex";
}

function closeAuth() {
  authModal.style.display = "none";
}

function login() {
  localStorage.setItem("loggedIn", "true");
  closeAuth();
}

function signup() {
  localStorage.setItem("loggedIn", "true");
  closeAuth();
}

/* Auto show auth if not logged in */
window.addEventListener("load", () => {
  if (!localStorage.getItem("loggedIn")) {
    setTimeout(showAuth, 1000);
  }
});
const authPopup = document.getElementById("authPopup");

function handleInvestmentClick() {
  if (!localStorage.getItem("isLoggedIn")) {
    authPopup.style.display = "flex";
  } else {
    window.location.href = "admin-dashboard.html";
  }
}

function closeAuth() {
  authPopup.style.display = "none";
}

function loginUser() {
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "admin-dashboard.html";
}
localStorage.setItem("isLoggedIn", "true");
localStorage.removeItem("authRequired");
const words = [
  "Palm Oil",
  "Agriculture",
  "Farming",
  "Agro-Processing",
  "Farm-to-Market Supply",
  "Green Wealth Creation"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 70;
const delayBetweenWords = 1500;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), delayBetweenWords);
    }
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(
    typeEffect,
    isDeleting ? deletingSpeed : typingSpeed
  );
}

typeEffect();
const newsCards = document.querySelectorAll(".news-card");

function revealNews() {
  newsCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

newsCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealNews);
revealNews();
