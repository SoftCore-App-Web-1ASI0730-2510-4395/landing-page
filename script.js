// JavaScript for the landing page
document.addEventListener("DOMContentLoaded", function () {
  // Navigation menu functionality
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      navItems.forEach((navItem) => {
        navItem.classList.remove("nav-active");
      });

      // Add active class to clicked item
      this.classList.add("nav-active");

      // Smooth scroll to section
      const targetSection = this.textContent.toLowerCase().trim();
      let sectionId;

      switch (targetSection) {
        case "nosotros":
          sectionId = "nosotros";
          break;
        case "habitaciones":
          sectionId = "habitaciones";
          break;
        case "testimonios":
          sectionId = "testimonios";
          break;
        case "preguntas":
          sectionId = "preguntas";
          break;
        default:
          sectionId = "";
      }

      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Testimonials slider functionality
  const testimonialSlides = document.querySelectorAll(".testimonials-slide");
  const controlDots = document.querySelectorAll(".control-dot");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    controlDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected slide
    testimonialSlides[index].classList.add("active");
    controlDots[index].classList.add("active");

    currentSlide = index;
  }

  // Add click event to control dots
  controlDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlideTimer();
    });
  });

  // Add click events to arrow buttons
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      let prevSlide =
        (currentSlide - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      showSlide(prevSlide);
      resetAutoSlideTimer();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      let nextSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(nextSlide);
      resetAutoSlideTimer();
    });
  }

  // Auto slide functionality
  function autoSlide() {
    let nextSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(nextSlide);
  }

  // Set interval for auto sliding
  let slideInterval = setInterval(autoSlide, 5000);

  // Reset auto slide timer
  function resetAutoSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
  }

  // Pause auto sliding when hovering over the slider container
  const testimonialsContainer = document.querySelector(
    ".testimonials-container",
  );

  if (testimonialsContainer) {
    testimonialsContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    testimonialsContainer.addEventListener("mouseleave", () => {
      slideInterval = setInterval(autoSlide, 5000);
    });
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((faqItem) => {
        if (faqItem !== item) {
          faqItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Smooth scroll for the CTA button
  const ctaButton = document.querySelector(".cta-button");

  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Animation effect
      ctaButton.style.transform = "scale(0.95)";
      setTimeout(() => {
        ctaButton.style.transform = "scale(1)";
      }, 200);

      // Scroll to rooms section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Room info buttons
  const roomButtons = document.querySelectorAll(".room-button");

  roomButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // No preventDefault here to allow the link to work
      // Just add a small animation effect
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Scroll to top button functionality
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      // Create scroll to top button if it doesn't exist
      if (!document.querySelector(".scroll-top")) {
        const scrollTopBtn = document.createElement("button");
        scrollTopBtn.classList.add("scroll-top");
        scrollTopBtn.innerHTML = "↑";
        document.body.appendChild(scrollTopBtn);

        // Add click event
        scrollTopBtn.addEventListener("click", function () {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }

      document.querySelector(".scroll-top").style.display = "block";
    } else {
      if (document.querySelector(".scroll-top")) {
        document.querySelector(".scroll-top").style.display = "none";
      }
    }
  });

  // Add animation to elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".section-title, .room-card, .testimonial-card, .faq-item",
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate");
      }
    });
  };

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Run once on page load
  animateOnScroll();
});
