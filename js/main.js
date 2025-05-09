// Wait until the document is fully loaded before running any code
$(document).ready(function () {
  // INITIALIZATION - This sets up the website when it first loads

  /**
   * This function does the initial setup when the page loads
   * It figures out which section to show based on the URL hash
   */
  function initialize() {
    console.log("Starting website initialization...");

    // Get the current URL hash or default to home if there isn't one
    const hash = window.location.hash || "#home";

    // Handle portfolio sub-sections specially
    const section = hash.replace("#portfolio-", "#portfolio");

    // Remove active class from all sections and navigation links
    $(".section").removeClass("active");
    $(".nav-links a").removeClass("active");

    // Activate the correct section and navigation link
    $(section).addClass("active");
    $(`.nav-links a[href="${section}"]`).addClass("active");

    // If we're in the portfolio section, check for a specific project
    if (hash.startsWith("#portfolio-")) {
      // Initialize the specific portfolio sub-section
      initializePortfolioSubsection(hash.replace("#portfolio-", ""));
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Add a fade-in animation to the site when it loads
    // I think this looks more professional than just appearing instantly
    $("body")
      .css("opacity", "0")
      .animate({ opacity: 1 }, 800, function () {
        console.log("Site initialization complete");
      });
  }

  // HELPER FUNCTIONS - These are utility functions I use in multiple places

  /**
   * This function adds CSS keyframe animations dynamically
   * I learned this technique from a tutorial - it's super useful!
   */
  function addKeyframeAnimation(name, rules) {
    $("<style>")
      .prop("type", "text/css")
      .html(`@keyframes ${name} {${rules}}`)
      .appendTo("head");
  }

  /**
   * This checks if the site is being viewed on a mobile device
   * so I can adjust certain behaviors for smaller screens
   */
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // ANIMATIONS - These handle various animations throughout the site

  /**
   * This animates the background logo on the home page
   * It creates a subtle floating effect to make the page less static
   */
  function animateHomeLogo() {
    // Apply a subtle animation to the background logo
    // I'm using CSS transforms for better performance
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
          // Loop the animation by calling the function again
          animateHomeLogo();
        }
      );
  }

  /**
   * This sets up all the animations used throughout the site
   */
  function setupAnimations() {
    // Add the shake animation for form validation
    // This was tricky to get right - had to experiment with the values
    addKeyframeAnimation(
      "shake",
      `
      0%, 100% {transform: translateX(0);}
      10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
      20%, 40%, 60%, 80% {transform: translateX(5px);}
    `
    );

    // Start the background logo animation
    animateHomeLogo();

    // Add a bounce animation for the arrow in the contact section
    // This helps draw attention to it
    setInterval(function () {
      $(".arrow-down")
        .animate({ marginTop: "10px" }, 800)
        .animate({ marginTop: "0" }, 800);
    }, 1600);
  }

  // EVENT HANDLERS - These respond to user interactions

  /**
   * This handles window resize events to make sure everything
   * still looks good when the window size changes
   */
  function handleResize() {
    // I'll add more specific handling here if needed
    console.log("Window resized");
  }

  /**
   * This handles window scroll events
   * I might use this later for scroll animations
   */
  function handleScroll() {
    // placeholder for scroll event handling
  }

  // INITIALIZATION CALLS - These actually run the functions defined above

  // Set up animations
  setupAnimations();

  // Initialize the site
  initialize();

  // Set up window event listeners
  $(window).on("resize", handleResize);
  $(window).on("scroll", handleScroll);

  // Just a log to show the script loaded properly
  console.log("Main JavaScript loaded");
});
