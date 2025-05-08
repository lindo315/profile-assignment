/*
BIZII Single-Page Website - Navigation JavaScript
Author: BIZII
Description: Handles navigation between sections with smooth transitions
*/

$(document).ready(function () {
  // ------------------------------------------------------------------------
  // SECTION NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Handles clicks on main navigation links
   * - Prevents default link behavior
   * - Transitions smoothly between sections
   * - Updates URL hash
   */
  $(".nav-links a").on("click", function (e) {
    e.preventDefault();

    // Get target section ID from href attribute
    const targetSection = $(this).attr("href");

    // Only proceed if this is not the current active section
    if (!$(targetSection).hasClass("active")) {
      console.log(`Navigating to section: ${targetSection}`);

      // Update active navigation link
      $(".nav-links a").removeClass("active");
      $(this).addClass("active");

      // Fade out current section
      $(".section.active").fadeOut(400, function () {
        // Remove active class from current section
        $(this).removeClass("active");

        // Fade in target section
        $(targetSection)
          .css("display", "block")
          .hide()
          .fadeIn(400, function () {
            // Add active class to new section
            $(this).addClass("active");

            // Reset scroll position
            window.scrollTo(0, 0);

            console.log(`Section transition to ${targetSection} complete`);
          });
      });

      // Update URL without page reload
      history.pushState(null, null, targetSection);
    }
  });

  /**
   * Handles browser back/forward buttons
   * - Responds to changes in URL hash
   * - Updates active section and navigation
   */
  $(window).on("popstate", function () {
    // Get current section from URL hash or default to home
    const currentSection = window.location.hash || "#home";
    console.log(`Browser history navigation to: ${currentSection}`);

    // Handle portfolio sub-sections
    const mainSection = currentSection.startsWith("#portfolio-")
      ? "#portfolio"
      : currentSection;

    // Update active navigation link
    $(".nav-links a").removeClass("active");
    $(`.nav-links a[href="${mainSection}"]`).addClass("active");

    // Update active section with animation
    $(".section.active").fadeOut(400, function () {
      $(this).removeClass("active");
      $(mainSection).fadeIn(400).addClass("active");

      // If navigating to a portfolio sub-section
      if (currentSection.startsWith("#portfolio-")) {
        const projectType = currentSection.replace("#portfolio-", "");
        showPortfolioProject(projectType);
      } else if (mainSection === "#portfolio") {
        showPortfolioMain();
      }
    });
  });

  /**
   * Handles direct URL access with hash
   * - Ensures correct section is shown on page load/refresh
   */
  function handleDirectURLAccess() {
    if (window.location.hash) {
      const currentSection = window.location.hash;
      console.log(`Direct URL access to: ${currentSection}`);

      // Handle portfolio sub-sections
      const mainSection = currentSection.startsWith("#portfolio-")
        ? "#portfolio"
        : currentSection;

      // Update active navigation link
      $(".nav-links a").removeClass("active");
      $(`.nav-links a[href="${mainSection}"]`).addClass("active");

      // Update active section without animation for initial load
      $(".section.active").removeClass("active");
      $(mainSection).addClass("active");

      // If accessing a portfolio sub-section
      if (currentSection.startsWith("#portfolio-")) {
        const projectType = currentSection.replace("#portfolio-", "");
        showPortfolioProject(projectType);
      }
    }
  }

  // ------------------------------------------------------------------------
  // SCROLL NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Adds a button to scroll back to top within sections
   * - Only shown in longer sections
   * - Appears after scrolling down
   */
  function setupScrollToTop() {
    // Add scroll-to-top button to sections that might need it
    $("#about, #portfolio").append(`
        <button class="scroll-top-btn" style="display: none;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L10 18M10 2L3 9M10 2L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `);

    // Show/hide button based on scroll position
    $(".section").on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $(this).find(".scroll-top-btn").fadeIn();
      } else {
        $(this).find(".scroll-top-btn").fadeOut();
      }
    });

    // Scroll to top when button is clicked
    $(".scroll-top-btn").on("click", function () {
      $(this).closest(".section").animate(
        {
          scrollTop: 0,
        },
        600
      );
    });
  }

  // ------------------------------------------------------------------------
  // KEYBOARD NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Sets up keyboard navigation
   * - Escape: Back to portfolio main view from project
   * - Arrow keys: Navigate galleries in portfolio projects
   */
  function setupKeyboardNavigation() {
    $(document).keydown(function (e) {
      // Handle keyboard navigation in portfolio section
      if ($("#portfolio").hasClass("active")) {
        // Check if we're viewing a project
        const activeProject = $(".project-view.active");

        if (activeProject.length > 0) {
          // Left arrow key - previous image
          if (e.keyCode === 37) {
            activeProject.find(".prev-arrow").click();
          }
          // Right arrow key - next image
          else if (e.keyCode === 39) {
            activeProject.find(".next-arrow").click();
          }
          // Escape key - back to portfolio
          else if (e.keyCode === 27) {
            activeProject.find(".back-to-portfolio").click();
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // TOUCH NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Sets up touch navigation for mobile devices
   * - Swipe left/right to navigate galleries
   * - Swipe up/down to scroll sections
   */
  function setupTouchNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;

    // Add touch event listeners to project images for gallery navigation
    $(".project-image").on("touchstart", function (e) {
      touchStartX = e.originalEvent.touches[0].clientX;
      touchStartY = e.originalEvent.touches[0].clientY;
    });

    $(".project-image").on("touchend", function (e) {
      const touchEndX = e.originalEvent.changedTouches[0].clientX;
      const touchEndY = e.originalEvent.changedTouches[0].clientY;
      const projectView = $(this).closest(".project-view");

      // Calculate swipe distance
      const swipeDistanceX = touchStartX - touchEndX;
      const swipeDistanceY = touchStartY - touchEndY;

      // If horizontal swipe is more significant than vertical
      if (
        Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) &&
        Math.abs(swipeDistanceX) > 50
      ) {
        // Swipe left (going right)
        if (swipeDistanceX > 0) {
          projectView.find(".next-arrow").click();
        }
        // Swipe right (going left)
        else {
          projectView.find(".prev-arrow").click();
        }

        // Prevent default page scroll
        e.preventDefault();
      }
    });
  }

  // ------------------------------------------------------------------------
  // INITIALIZATION CALLS
  // ------------------------------------------------------------------------

  // Handle direct URL access
  handleDirectURLAccess();

  // Setup scroll to top functionality
  setupScrollToTop();

  // Setup keyboard navigation
  setupKeyboardNavigation();

  // Setup touch navigation for mobile
  setupTouchNavigation();

  // Log initialization complete
  console.log("Navigation JavaScript initialization complete");
});
