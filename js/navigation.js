// Wait until the document is loaded
$(document).ready(function () {
  // SECTION NAVIGATION - Handling clicks on navigation links

  /**
   * This handles clicks on the main navigation links
   * It creates smooth transitions between sections instead of abrupt changes
   */
  $(".nav-links a").on("click", function (e) {
    // Prevent the default link behavior (stops page from jumping)
    e.preventDefault();

    // Get the target section ID from the href attribute
    const targetSection = $(this).attr("href");

    // Only do the transition if we're not already on this section
    if (!$(targetSection).hasClass("active")) {
      console.log(`Navigating to section: ${targetSection}`);

      // Update the active navigation link
      $(".nav-links a").removeClass("active");
      $(this).addClass("active");

      // Fade out the current section with a nice animation
      $(".section.active").fadeOut(400, function () {
        // Remove active class from current section
        $(this).removeClass("active");

        // Fade in the target section
        $(targetSection)
          .css("display", "block") // Need to set display before fading in
          .hide() // Hide it first so we can fade it in
          .fadeIn(400, function () {
            // Add active class to new section
            $(this).addClass("active");

            // Reset scroll position to top
            window.scrollTo(0, 0);

            console.log(`Transition to ${targetSection} complete`);
          });
      });

      // Update URL without reloading the page
      // This is cool because it lets users bookmark specific sections
      history.pushState(null, null, targetSection);
    }
  });

  /**
   * This handles the browser back/forward buttons
   * so navigation still works when users use browser history
   */
  $(window).on("popstate", function () {
    // Get current section from URL hash or default to home
    const currentSection = window.location.hash || "#home";
    console.log(`Browser history navigation to: ${currentSection}`);

    // Handle portfolio sub-sections specially
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
   * This makes sure the correct section shows when someone
   * visits the site with a hash in the URL (like index.html#about)
   */
  function handleDirectURLAccess() {
    if (window.location.hash) {
      const currentSection = window.location.hash;
      console.log(`Direct URL access to: ${currentSection}`);

      // Handle portfolio sub-sections specially
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

  // SCROLL NAVIGATION - Adding scroll-to-top functionality

  /**
   * This adds a button to scroll back to top within long sections
   * It only appears after scrolling down a bit
   */
  function setupScrollToTop() {
    // Add a scroll-to-top button to sections that might need it
    // I'm only adding it to About and Portfolio since they might be long
    $("#about, #portfolio").append(`
          <button class="scroll-top-btn" style="display: none;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L10 18M10 2L3 9M10 2L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        `);

    // Show/hide the button based on scroll position
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

  // KEYBOARD NAVIGATION - Adding keyboard shortcuts

  /**
   * This adds keyboard navigation functionality
   * so users can navigate with arrow keys and escape
   */
  function setupKeyboardNavigation() {
    $(document).keydown(function (e) {
      // Only handle keyboard in portfolio section
      if ($("#portfolio").hasClass("active")) {
        // Check if viewing a project
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

  // TOUCH NAVIGATION - Adding swipe functionality for mobile

  /**
   * This adds touch navigation for mobile devices
   * so users can swipe to navigate galleries
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

      // Calculate how far they swiped
      const swipeDistanceX = touchStartX - touchEndX;
      const swipeDistanceY = touchStartY - touchEndY;

      // If horizontal swipe is more significant than vertical
      // and the swipe was big enough to count
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

  // INITIALIZATION - Running the setup functions

  // Handle direct URL access
  handleDirectURLAccess();

  // Setup scroll to top functionality
  setupScrollToTop();

  // Setup keyboard navigation
  setupKeyboardNavigation();

  // Setup touch navigation for mobile
  setupTouchNavigation();

  // Just a log to confirm everything loaded
  console.log("Navigation JavaScript loaded");
});
