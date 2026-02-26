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
  initHeroAnimation();
  initRevealAnimations();
  initShowcaseSection();
  initStatCounters();
  initProcessStepHighlight();
  initParallax();
  initScrollDepth();
});

// ─────────────────────────
// 2. HERO ANIMATION
// ─────────────────────────

function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  tl.from('.hero h1', { y: 40, opacity: 0, duration: 1, delay: 0.2 })
    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-visual', { y: 60, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.out' }, '-=0.3');

  // Mouse-follow 3D tilt on hero card
  const heroCard = document.querySelector('.hero-ui-card');
  if (!heroCard) return;

  const heroVisual = document.querySelector('.hero-visual');
  
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(heroCard, {
      rotateX: -y * 8,
      rotateY: x * 8,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
  
  heroVisual.addEventListener('mouseleave', () => {
    gsap.to(heroCard, {
      rotateX: 2,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  });
}

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
    if (el.closest('.hero')) return; // Skip hero elements, handled by GSAP
    
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
  // Handle both showcase sections
  const showcaseSections = document.querySelectorAll('.showcase');
  
  showcaseSections.forEach(section => {
    const steps = section.querySelectorAll('.showcase-step');
    const screens = section.querySelectorAll('.device-screen');
    
    if (steps.length === 0) return;
    
    // Add progress bar to each step
    steps.forEach(step => {
      const progressBar = document.createElement('div');
      progressBar.className = 'step-progress';
      step.appendChild(progressBar);
    });
    
    let currentIndex = 0;
    let intervalId = null;
    let isPaused = false;
    
    function setActive(index) {
      steps.forEach(s => s.classList.remove('is-active'));
      screens.forEach(s => s.classList.remove('is-active'));
      
      steps[index].classList.add('is-active');
      const screenId = steps[index].getAttribute('data-screen');
      const activeScreen = section.querySelector(`.device-screen[data-screen="${screenId}"]`);
      if (activeScreen) activeScreen.classList.add('is-active');
      
      currentIndex = index;
    }
    
    function nextStep() {
      if (isPaused) return;
      const next = (currentIndex + 1) % steps.length;
      setActive(next);
    }
    
    function startCycle() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(nextStep, 5000);
    }
    
    // Click to select
    steps.forEach((step, i) => {
      step.addEventListener('click', () => {
        setActive(i);
        // Reset timer on click
        startCycle();
      });
    });
    
    // Pause on hover
    section.addEventListener('mouseenter', () => { isPaused = true; });
    section.addEventListener('mouseleave', () => { 
      isPaused = false;
      startCycle();
    });
    
    // Start cycling when section is visible
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => startCycle(),
    });
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

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Contact form submission:', data);
  
  // Show success message
  form.innerHTML = '<div class="form-success">✓ Message sent! We\'ll get back to you within 24 hours.</div>';
}

// Make it global for the inline onsubmit
window.handleContactSubmit = handleContactSubmit;

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

// ─────────────────────────
// 11. PARALLAX ANIMATIONS
// ─────────────────────────

function initParallax() {
  // Service cards: stagger from bottom with scale
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1,
      },
      y: 40 + (i * 15),
      scale: 0.92,
      opacity: 0,
      rotateX: 5,
    });
  });
  
  // Process steps: slide in from right with rotation
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      x: 40,
      opacity: 0,
      rotateY: -5,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });
  
  // Stats: count up + scale pop
  gsap.utils.toArray('.stat-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      scale: 0.8,
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'back.out(1.5)',
    });
  });
  
  // Showcase device mockups: subtle float on scroll
  gsap.utils.toArray('.device-stage').forEach((stage) => {
    gsap.to(stage, {
      scrollTrigger: {
        trigger: stage,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 2,
      },
      y: -20,
      ease: 'none',
    });
  });

  // Value cards: stagger from bottom
  gsap.utils.toArray('.value-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.12,
    });
  });

  // Testimonial: fade + scale
  const testimonial = document.querySelector('.testimonial-card');
  if (testimonial) {
    gsap.from(testimonial, {
      scrollTrigger: {
        trigger: testimonial,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      scale: 0.9,
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });
  }
}

// ─────────────────────────
// 12. SCROLL DEPTH EFFECTS
// ─────────────────────────

function initScrollDepth() {
  // Parallax background movement for section glow orbs
  gsap.to('.hero::after', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 100,
    ease: 'none',
  });

  // Section headings: split reveal
  gsap.utils.toArray('.section-head h2').forEach((h2) => {
    gsap.from(h2, {
      scrollTrigger: {
        trigger: h2,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      y: 20,
      opacity: 0,
      scale: 0.96,
      duration: 0.8,
      ease: 'power3.out',
    });
  });
  
  // Eyebrows: slide in
  gsap.utils.toArray('.eyebrow').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}
