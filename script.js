/* =========================
   ATHENIX TECHNOLOGIES
   Script.js — Interactions
   ========================= */

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────
// 1. PAGE LOAD SETUP
// ─────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initShowcaseSection();
  initStatCounters();
  initContactForm();
  initProcessStepHighlight();
});

// ─────────────────────────
// 3. STICKY HEADER
// ─────────────────────────

function initStickyHeader() {
  const header = document.querySelector(".site-header");

  ScrollTrigger.create({
    trigger: document.body,
    start: "80px top",
    onUpdate: (self) => {
      if (self.getVelocity() > 0) {
        // Scrolling down
        header.classList.remove("is-sticky");
      } else {
        // Scrolling up or at top
        if (window.scrollY > 80) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }
      }
    },
  });

  // Also add/remove on regular scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  });
}

// ─────────────────────────
// 4. MOBILE MENU
// ─────────────────────────

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!menuToggle) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    siteNav.classList.toggle("is-active");
  });

  // Close menu on link click
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-active");
      siteNav.classList.remove("is-active");
    });
  });
}

// ─────────────────────────
// 5. SMOOTH SCROLL
// ─────────────────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ─────────────────────────
// 6. REVEAL ANIMATIONS
// ─────────────────────────

function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        el.classList.add("in-view");
      },
    });
  });
}

// ─────────────────────────
// 7. SHOWCASE SECTION
// ─────────────────────────

function initShowcaseSection() {
  const showcaseSteps = document.querySelectorAll(".showcase-step");
  const deviceScreens = document.querySelectorAll(".device-screen");

  if (showcaseSteps.length === 0) return;

  showcaseSteps.forEach((step) => {
    step.addEventListener("click", () => {
      const screenIndex = step.getAttribute("data-screen");

      // Update active state
      showcaseSteps.forEach((s) => s.classList.remove("is-active"));
      deviceScreens.forEach((s) => s.classList.remove("is-active"));

      step.classList.add("is-active");
      const activeScreen = document.querySelector(
        `.device-screen[data-screen="${screenIndex}"]`
      );
      if (activeScreen) {
        activeScreen.classList.add("is-active");
      }
    });
  });

  // Auto-rotate showcase on scroll
  ScrollTrigger.create({
    trigger: ".showcase",
    start: "center center",
    onUpdate: (self) => {
      // Optional: add parallax or scroll-triggered rotation
    },
  });
}

// ─────────────────────────
// 8. STAT COUNTERS
// ─────────────────────────

function initStatCounters() {
  const statValues = document.querySelectorAll(".stat-value");

  statValues.forEach((stat) => {
    const target = parseFloat(stat.getAttribute("data-target")) || 0;
    const decimals = parseInt(stat.getAttribute("data-decimals")) || 0;
    const suffix = stat.getAttribute("data-suffix") || "";
    const prefix = stat.getAttribute("data-prefix") || "";

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        gsap.to(
          { value: 0 },
          {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const displayValue =
                this.targets()[0].value.toFixed(decimals);
              stat.textContent = `${prefix}${displayValue}${suffix}`;
            },
          }
        );
      },
      once: true,
    });
  });
}

// ─────────────────────────
// 9. CONTACT FORM
// ─────────────────────────

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate
    if (!data.name || !data.email || !data.needs) {
      alert("Please fill in all required fields.");
      return;
    }

    // Log submission (replace with actual API call)
    console.log("Form submission:", data);

    // Show success message
    const successMsg = document.getElementById("form-success");
    successMsg.textContent =
      "Thank you! We'll be in touch within 24 hours.";
    successMsg.classList.add("show");

    // Reset form
    form.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      successMsg.classList.remove("show");
      successMsg.textContent = "";
    }, 5000);
  });
}

// ─────────────────────────
// 10. PROCESS STEP HIGHLIGHT
// ─────────────────────────

function initProcessStepHighlight() {
  const processSteps = document.querySelectorAll(".process-step");

  if (processSteps.length === 0) return;

  processSteps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: "center 60%",
      end: "center 40%",
      onEnter: () => {
        // Clear active state from all
        processSteps.forEach((s) => s.classList.remove("is-active"));
        step.classList.add("is-active");
      },
      onEnterBack: () => {
        step.classList.add("is-active");
        if (index > 0) {
          processSteps[index - 1].classList.remove("is-active");
        }
      },
    });
  });

  // Set first step as active initially
  if (processSteps.length > 0) {
    processSteps[0].classList.add("is-active");
  }
}
