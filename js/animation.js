/*
BIZII Single-Page Website - Animations JavaScript
Author: BIZII
Description: Handles dynamic animations and scroll-triggered effects
*/

$(document).ready(function () {
  // ------------------------------------------------------------------------
  // ANIMATIONS INITIALIZATION
  // ------------------------------------------------------------------------

  /**
   * Initialize all animations when the document is ready
   */
  function initializeAnimations() {
    console.log("Initializing animations...");

    // Set up scroll-triggered animations
    setupScrollAnimations();

    // Set up hover animations
    setupHoverAnimations();

    // Set up home logo animation
    animateHomeLogo();

    // Set up contact arrow animation
    animateContactArrow();
  }

  // ------------------------------------------------------------------------
  // SCROLL-TRIGGERED ANIMATIONS
  // ------------------------------------------------------------------------

  /**
   * Set up animations that trigger on scroll
   */
  function setupScrollAnimations() {
    // For about section elements
    $("#about").on("scroll", function () {
      const scrollTop = $(this).scrollTop();

      // Animate elements in the about section
      animateOnScroll($(this).find(".about-image"), scrollTop, 100);
      animateOnScroll($(this).find(".about-text p"), scrollTop, 200);
      animateOnScroll($(this).find(".skills-section"), scrollTop, 300);
    });

    // For portfolio section elements
    $("#portfolio").on("scroll", function () {
      const scrollTop = $(this).scrollTop();

      // Animate portfolio cards
      $(this)
        .find(".portfolio-card")
        .each(function (index) {
          animateOnScroll($(this), scrollTop, 100 + index * 100);
        });
    });

    // For project view animations
    $(".project-view").each(function () {
      // Add animation classes to project elements
      $(this).find(".project-header").addClass("fade-in-up");
      $(this).find(".project-description p").addClass("fade-in-up delay-1");
      $(this).find(".project-showcase").addClass("fade-in-up delay-2");
    });
  }

  /**
   * Animate an element when it is scrolled into view
   * @param {jQuery} element - Element to animate
   * @param {number} scrollTop - Current scroll position
   * @param {number} offset - Offset to trigger animation
   */
  function animateOnScroll(element, scrollTop, offset) {
    const elementTop = element.offset().top;
    const windowHeight = $(window).height();

    // If element is visible in viewport
    if (scrollTop + windowHeight > elementTop + offset) {
      if (!element.hasClass("animated")) {
        element.addClass("animated fade-in-up");
      }
    }
  }

  // ------------------------------------------------------------------------
  // HOVER ANIMATIONS
  // ------------------------------------------------------------------------

  /**
   * Set up animations that trigger on hover
   */
  function setupHoverAnimations() {
    // Service item hover animations
    $(".service-item").hover(
      function () {
        $(this).find(".service-icon").css("transform", "translateY(-5px)");
      },
      function () {
        $(this).find(".service-icon").css("transform", "translateY(0)");
      }
    );

    // Portfolio card hover animations
    $(".portfolio-card").hover(
      function () {
        $(this).css("transform", "translateY(-10px)");
        $(this).css("box-shadow", "0 15px 30px rgba(0, 0, 0, 0.2)");
      },
      function () {
        $(this).css("transform", "translateY(0)");
        $(this).css("box-shadow", "none");
      }
    );

    // About section skill icons hover animations
    $(".skill-icon").hover(
      function () {
        $(this).css("transform", "translateY(-5px)");
        $(this).css("box-shadow", "0 8px 15px rgba(0, 0, 0, 0.1)");
      },
      function () {
        $(this).css("transform", "translateY(0)");
        $(this).css("box-shadow", "none");
      }
    );

    // Social icon hover animations
    $(".social-icon").hover(
      function () {
        $(this).css("transform", "translateY(-3px)");
        $(this).css("opacity", "1");
      },
      function () {
        $(this).css("transform", "translateY(0)");
        $(this).css("opacity", "0.9");
      }
    );

    // Navigation link hover effect
    $(".nav-links a").hover(
      function () {
        if (!$(this).hasClass("active")) {
          $(this).css("color", "var(--primary-red-light)");
        }
      },
      function () {
        if (!$(this).hasClass("active")) {
          $(this).css("color", "");
        }
      }
    );
  }

  // ------------------------------------------------------------------------
  // CONTINUOUS ANIMATIONS
  // ------------------------------------------------------------------------

  /**
   * Animate the home background logo
   */
  function animateHomeLogo() {
    // Subtle pulsing animation for background logo
    setInterval(function () {
      $(".home-logo").animate(
        {
          opacity: 0.4,
        },
        3000,
        function () {
          $(this).animate(
            {
              opacity: 0.2,
            },
            3000
          );
        }
      );
    }, 6000);
  }

  /**
   * Animate the contact arrow
   */
  function animateContactArrow() {
    // Bounce animation for contact arrow
    setInterval(function () {
      $(".arrow-down").animate(
        {
          marginTop: "10px",
        },
        800,
        function () {
          $(this).animate(
            {
              marginTop: "0",
            },
            800
          );
        }
      );
    }, 1600);
  }

  // ------------------------------------------------------------------------
  // INITIALIZATION
  // ------------------------------------------------------------------------

  // Initialize animations
  initializeAnimations();

  // Re-initialize animations when window is resized
  $(window).on("resize", function () {
    // Clear existing animations
    $(".animated").removeClass("animated");

    // Re-initialize animations
    initializeAnimations();
  });

  // Log initialization complete
  console.log("Animations JavaScript initialization complete");
});
