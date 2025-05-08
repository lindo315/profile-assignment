/*
BIZII Single-Page Website - Main JavaScript
Author: BIZII
Description: Core functionality and initialization for the website
*/

$(document).ready(function () {
  // ------------------------------------------------------------------------
  // INITIALIZATION
  // ------------------------------------------------------------------------

  /**
   * Initial setup when page loads
   * - Set active section based on URL hash or default to home
   * - Initialize section visibility
   */
  function initialize() {
    console.log("Initializing website...");

    // Set initial active section based on URL hash or default to home
    const hash = window.location.hash || "#home";
    const section = hash.replace("#portfolio-", "#portfolio"); // Handle portfolio sub-sections

    // Remove active class from all sections and navigation links
    $(".section").removeClass("active");
    $(".nav-links a").removeClass("active");

    // Activate correct section and navigation link
    $(section).addClass("active");
    $(`.nav-links a[href="${section}"]`).addClass("active");

    // If we're in portfolio section, check for sub-section
    if (hash.startsWith("#portfolio-")) {
      // Initialize portfolio sub-section
      initializePortfolioSubsection(hash.replace("#portfolio-", ""));
    }

    // Initialize scroll to top
    window.scrollTo(0, 0);

    // Apply initial fade-in animation to the site
    $("body")
      .css("opacity", "0")
      .animate({ opacity: 1 }, 800, function () {
        console.log("Site initialization complete");
      });
  }

  // ------------------------------------------------------------------------
  // HELPERS & UTILITIES
  // ------------------------------------------------------------------------

  /**
   * Adds a CSS animation keyframe dynamically to the document
   * @param {string} name - The name of the animation
   * @param {string} rules - The keyframe rules
   */
  function addKeyframeAnimation(name, rules) {
    $("<style>")
      .prop("type", "text/css")
      .html(`@keyframes ${name} {${rules}}`)
      .appendTo("head");
  }

  /**
   * Checks if the device is mobile
   * @returns {boolean} - True if mobile device
   */
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // ------------------------------------------------------------------------
  // ANIMATIONS
  // ------------------------------------------------------------------------

  /**
   * Animates the background logo on the home page
   */
  function animateHomeLogo() {
    // Subtle floating animation for background logo
    $(".home-logo")
      .css({
        transform: "translate(-50%, -50%) scale(1.05)",
        opacity: 0.35,
      })
      .animate(
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0.3,
        },
        4000,
        function () {
          // Loop animation
          animateHomeLogo();
        }
      );
  }

  /**
   * Adds dynamic animations to the page
   */
  function setupAnimations() {
    // Add shake animation for form validation
    addKeyframeAnimation(
      "shake",
      `
      0%, 100% {transform: translateX(0);}
      10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
      20%, 40%, 60%, 80% {transform: translateX(5px);}
    `
    );

    // Start background logo animation
    animateHomeLogo();

    // Bounce animation for arrow in contact section
    setInterval(function () {
      $(".arrow-down")
        .animate({ marginTop: "10px" }, 800)
        .animate({ marginTop: "0" }, 800);
    }, 1600);
  }

  // ------------------------------------------------------------------------
  // EVENT HANDLERS
  // ------------------------------------------------------------------------

  /**
   * Handles window resize events
   */
  function handleResize() {
    // Adjust layout for different screen sizes
    console.log("Window resized");

    // Additional resize handling if needed
  }

  /**
   * Handles window scroll events
   */
  function handleScroll() {
    // Handle scroll events if needed
  }

  // ------------------------------------------------------------------------
  // INITIALIZATION CALLS
  // ------------------------------------------------------------------------

  // Initialize animations
  setupAnimations();

  // Initialize the site
  initialize();

  // Set up window event listeners
  $(window).on("resize", handleResize);
  $(window).on("scroll", handleScroll);

  // Log initialization complete
  console.log("Main JavaScript initialization complete");
});
