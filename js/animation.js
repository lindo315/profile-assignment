$(document).ready(function () {
  // ANIMATIONS INITIALIZATION

  /**
   * Sets up all animations when the page loads
   * I split this into multiple functions to keep it organized
   */
  function initializeAnimations() {
    console.log("Starting animation setup...");

    // Set up animations that happen when you scroll
    setupScrollAnimations();

    // Sets up animations that happen on hover
    setupHoverAnimations();

    // Floating logo on the home page
    animateHomeLogo();

    // Set up the bouncing arrow in the contact section
    animateContactArrow();

    console.log("All animations initialized!");
  }

  // SCROLL-TRIGGERED ANIMATIONS

  /**
   * Sets up animations that trigger when the user scrolls
   * This makes elements fade in as they scroll into view
   */
  function setupScrollAnimations() {
    // For elements in the about section
    $("#about").on("scroll", function () {
      const scrollTop = $(this).scrollTop();

      // Animate different elements as they come into view
      // I'm giving them different offsets so they animate one after another
      animateOnScroll($(this).find(".about-image"), scrollTop, 100);
      animateOnScroll($(this).find(".about-text p"), scrollTop, 200);
      animateOnScroll($(this).find(".skills-section"), scrollTop, 300);
    });

    // For elements in the portfolio section
    $("#portfolio").on("scroll", function () {
      const scrollTop = $(this).scrollTop();

      // Animate each portfolio card with a staggered delay
      // This looks cooler than having them all animate at once
      $(this)
        .find(".portfolio-card")
        .each(function (index) {
          animateOnScroll($(this), scrollTop, 100 + index * 100);
        });
    });

    // For project view animations
    // These animate when you click on a portfolio card
    $(".project-view").each(function () {
      // Add animation classes to different parts of the project view
      $(this).find(".project-header").addClass("fade-in-up");
      $(this).find(".project-description p").addClass("fade-in-up delay-1");
      $(this).find(".project-showcase").addClass("fade-in-up delay-2");
    });
  }

  /**
   * Makes an element animate when it scrolls into view
   * @param {jQuery} element - The element to animate
   * @param {number} scrollTop - How far down the page is scrolled
   * @param {number} offset - Trigger animation earlier or later
   */
  function animateOnScroll(element, scrollTop, offset) {
    // Calculate where the element is on the page
    const elementTop = element.offset().top;
    const windowHeight = $(window).height();

    // If the element is visible in the viewport
    if (scrollTop + windowHeight > elementTop + offset) {
      // Only animate it if it hasn't been animated yet
      if (!element.hasClass("animated")) {
        element.addClass("animated fade-in-up");
      }
    }
  }

  // HOVER ANIMATIONS

  /**
   * Sets up animations that trigger when the user hovers
   * These make the site feel more interactive
   */
  function setupHoverAnimations() {
    // Service item hover animations
    $(".service-item").hover(
      function () {
        // When mouse enters
        $(this).find(".service-icon").css("transform", "translateY(-5px)");
      },
      function () {
        // When mouse leaves
        $(this).find(".service-icon").css("transform", "translateY(0)");
      }
    );

    // Portfolio card hover animations
    $(".portfolio-card").hover(
      function () {
        // Lift the card and add shadow on hover
        $(this).css("transform", "translateY(-10px)");
        $(this).css("box-shadow", "0 15px 30px rgba(0, 0, 0, 0.2)");
      },
      function () {
        // Return to normal when not hovering
        $(this).css("transform", "translateY(0)");
        $(this).css("box-shadow", "none");
      }
    );

    // About section skill icons hover animations
    $(".skill-icon").hover(
      function () {
        // Lift the icon and add shadow on hover
        $(this).css("transform", "translateY(-5px)");
        $(this).css("box-shadow", "0 8px 15px rgba(0, 0, 0, 0.1)");
      },
      function () {
        // Return to normal when not hovering
        $(this).css("transform", "translateY(0)");
        $(this).css("box-shadow", "none");
      }
    );

    // Social icon hover animations
    $(".social-icon").hover(
      function () {
        // Lift the icon and increase opacity on hover
        $(this).css("transform", "translateY(-3px)");
        $(this).css("opacity", "1");
      },
      function () {
        // Return to normal when not hovering
        $(this).css("transform", "translateY(0)");
        $(this).css("opacity", "0.9");
      }
    );

    // Navigation link hover effect
    $(".nav-links a").hover(
      function () {
        // Only change color if it's not the active link
        if (!$(this).hasClass("active")) {
          $(this).css("color", "var(--primary-red-light)");
        }
      },
      function () {
        // Return to normal when not hovering
        if (!$(this).hasClass("active")) {
          $(this).css("color", "");
        }
      }
    );
  }

  // CONTINUOUS ANIMATIONS

  /**
   * Animates the background logo on the home page
   * This creates a subtle floating/pulsing effect
   */
  function animateHomeLogo() {
    // Create a pulsing animation by changing opacity
    // This repeats indefinitely for as long as the page is open
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
    }, 6000); // Total cycle is 6 seconds
  }

  /**
   * Animates the arrow in the contact section
   * This creates a bouncing effect to draw attention
   */
  function animateContactArrow() {
    // Create a bouncing animation by changing margin
    // This repeats indefinitely to grab attention
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
    }, 1600); // Total cycle is 1.6 seconds
  }

  // INITIALIZATION

  // Initialize all animations
  initializeAnimations();

  // Re-initialize animations when window is resized
  // This ensures everything still looks good if the screen size changes
  $(window).on("resize", function () {
    // Clear existing animations
    $(".animated").removeClass("animated");

    // Re-initialize animations
    initializeAnimations();
  });

  // Just a log to confirm everything loaded
  console.log("Animations JavaScript loaded");
});
