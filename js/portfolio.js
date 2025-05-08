/*
BIZII Single-Page Website - Portfolio JavaScript
Author: BIZII
Description: Handles portfolio section navigation, project viewing, and gallery navigation
*/

$(document).ready(function () {
  // ------------------------------------------------------------------------
  // PORTFOLIO VARIABLES
  // ------------------------------------------------------------------------

  /**
   * Project gallery image data
   * - Stores image src and caption for each project type
   * - Used for navigation between images in project galleries
   */
  const projectGalleries = {
    automotive: [
      {
        image: "images/auto/2.jpg",
        caption: "PRECISION ENGINEERING.<br>CAPTURED IN MOTION.",
      },
      {
        image: "images/auto/3.jpg",
        caption: "PERFORMANCE REDEFINED.<br>THE BMW M SERIES.",
      },
      {
        image: "images/auto/4.jpg",
        caption: "THE BMW M5.<br>UNLEASHING THE BEAST.",
      },
      {
        image: "images/auto/5.jpg",
        caption: "THE BMW M5.<br>UNLEASHING THE BEAST.",
      },
    ],
    communication: [
      {
        image: "images/UIUberEats.png",
        caption: "OLD MUTUAL SMEGO.<br>ONE PLATFORM. ALL YOUR BUSINESS NEEDS.",
      },
      {
        image: "images/communication/2.jpg",
        caption: "TAP2PAY.<br>PAYMENTS JUST GOT EASIER!",
      },
      {
        image: "images/communication/3.jpg",
        caption: "INTERNATIONAL WOMEN'S DAY.<br>ACCELERATE ACTION.",
      },
    ],
    brand: [
      {
        image: "images/Black.png",
        caption: "GIANT STEP.<br>SOME SEE BUILDINGS. WE SEE OPPORTUNITIES.",
      },
      {
        image: "images/brand/2.jpg",
        caption: "BRAND IDENTITY SYSTEM.<br>COMPREHENSIVE VISUAL LANGUAGE.",
      },
      {
        image: "images/brand/3.jpg",
        caption: "GIANT STEP.<br>ENGINEERING FACILITIES MANAGEMENT.",
      },
    ],
  };

  /**
   * Track current image index for each project
   */
  const currentImageIndex = {
    automotive: 0,
    communication: 0,
    brand: 0,
  };

  // ------------------------------------------------------------------------
  // PORTFOLIO NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Handles portfolio card clicks
   * - Transitions from main portfolio view to project detail view
   * - Updates URL hash
   * - Changes background color and styling
   */
  $(".portfolio-card").on("click", function () {
    const projectType = $(this).data("project");
    console.log(`Opening project: ${projectType}`);

    showPortfolioProject(projectType);
  });

  /**
   * Handles back to portfolio button clicks
   * - Returns from project detail view to main portfolio grid
   * - Updates URL hash
   * - Restores original background color and styling
   */
  $(".back-to-portfolio").on("click", function () {
    console.log("Returning to main portfolio view");

    showPortfolioMain();
  });

  /**
   * Shows the main portfolio grid view
   * - Hides all project views
   * - Shows the main portfolio view
   * - Updates URL hash
   * - Restores original background color and styling
   */
  function showPortfolioMain() {
    // Remove project active class to revert background color
    $("#portfolio").removeClass("project-active");

    // Hide all project views
    $(".project-view").removeClass("active");

    // Show main portfolio view
    $("#portfolio-main").addClass("active");

    // Update URL hash
    history.pushState(null, null, "#portfolio");

    // Update logo color (if you have different logos for different backgrounds)
    updateLogoForBackground(false);
  }

  /**
   * Shows a specific portfolio project
   * @param {string} projectType - Type of project to show (automotive, communication, brand)
   */
  function showPortfolioProject(projectType) {
    // Validate project type
    if (!["automotive", "communication", "brand"].includes(projectType)) {
      console.error(`Invalid project type: ${projectType}`);
      return;
    }

    // Add project active class to change background color
    $("#portfolio").addClass("project-active");

    // Hide main portfolio view
    $("#portfolio-main").removeClass("active");

    // Show selected project view
    $(`#project-${projectType}`).addClass("active");

    // Reset to first image in gallery
    updateProjectImage(projectType, 0);

    // Update URL hash
    history.pushState(null, null, `#portfolio-${projectType}`);

    // Update logo color (if you have different logos for different backgrounds)
    updateLogoForBackground(true);
  }

  /**
   * Updates the logo image based on background
   * @param {boolean} isProjectView - Whether we're in a project view
   */
  function updateLogoForBackground(isProjectView) {
    // Replace with your white and dark logo images as needed
    const logoImg = $("#portfolio .logo img");

    if (isProjectView) {
      // On white background (project view)
      logoImg.attr("src", "images/icons/BIZII-logo-red.png");
    } else {
      // On red background (main portfolio view)
      logoImg.attr("src", "images/icons/BIZII-logo.png");
    }
  }

  /**
   * Updates the project header structure
   * - Moves the project header to a banner for project views
   */
  function setupProjectHeaders() {
    // Wrap each project header in a banner div for styling
    $(".project-view").each(function () {
      const header = $(this).find(".project-header");

      // Only apply if not already wrapped
      if (!header.parent().hasClass("project-header-banner")) {
        header.wrap('<div class="project-header-banner"></div>');
      }
    });
  }

  // ------------------------------------------------------------------------
  // PROJECT GALLERY NAVIGATION
  // ------------------------------------------------------------------------

  /**
   * Handles next arrow clicks in project galleries
   * - Shows the next image in the project gallery
   */
  $(".next-arrow").on("click", function () {
    // Get the project type from the parent container ID
    const projectId = $(this).closest(".portfolio-view").attr("id");
    const projectType = projectId.replace("project-", "");

    // Get the gallery for this project type
    const gallery = projectGalleries[projectType];
    if (!gallery || gallery.length <= 1) return;

    // Update current index
    currentImageIndex[projectType] =
      (currentImageIndex[projectType] + 1) % gallery.length;

    // Update image and caption
    updateProjectImage(projectType, currentImageIndex[projectType]);
  });

  /**
   * Handles previous arrow clicks in project galleries
   * - Shows the previous image in the project gallery
   */
  $(".prev-arrow").on("click", function () {
    // Get the project type from the parent container ID
    const projectId = $(this).closest(".portfolio-view").attr("id");
    const projectType = projectId.replace("project-", "");

    // Get the gallery for this project type
    const gallery = projectGalleries[projectType];
    if (!gallery || gallery.length <= 1) return;

    // Update current index
    currentImageIndex[projectType] =
      (currentImageIndex[projectType] - 1 + gallery.length) % gallery.length;

    // Update image and caption
    updateProjectImage(projectType, currentImageIndex[projectType]);
  });

  /**
   * Updates the project image and caption
   * @param {string} projectType - Type of project (automotive, communication, brand)
   * @param {number} index - Index of the image to show
   */
  function updateProjectImage(projectType, index) {
    const gallery = projectGalleries[projectType];
    if (!gallery || index >= gallery.length) {
      console.error(`Invalid gallery or index: ${projectType}, ${index}`);
      return;
    }

    console.log(`Updating ${projectType} gallery to image ${index}`);

    const imageContainer = $(`#project-${projectType} .project-image`);

    // Fade out current image
    imageContainer.fadeOut(200, function () {
      // Update image
      imageContainer.find("img").attr("src", gallery[index].image);

      // Update caption
      if (gallery[index].caption) {
        if (imageContainer.find(".image-caption").length === 0) {
          imageContainer.append(
            `<div class="image-caption">${gallery[index].caption}</div>`
          );
        } else {
          imageContainer.find(".image-caption").html(gallery[index].caption);
        }
      }

      // Fade in updated image
      imageContainer.fadeIn(200);
    });

    // Update current index
    currentImageIndex[projectType] = index;
  }

  // ------------------------------------------------------------------------
  // PORTFOLIO INITIALIZATION
  // ------------------------------------------------------------------------

  /**
   * Initializes portfolio section structure and styles
   */
  function initializePortfolio() {
    // Setup project headers
    setupProjectHeaders();

    // Check if we need to start in a project view
    const hash = window.location.hash;
    if (hash.startsWith("#portfolio-")) {
      const projectType = hash.replace("#portfolio-", "");
      if (["automotive", "communication", "brand"].includes(projectType)) {
        // Show the project directly
        showPortfolioProject(projectType);
      }
    }
  }

  /**
   * Initializes a portfolio subsection if accessed directly via URL
   * @param {string} projectType - Type of project to initialize
   */
  function initializePortfolioSubsection(projectType) {
    if (["automotive", "communication", "brand"].includes(projectType)) {
      console.log(`Initializing portfolio subsection: ${projectType}`);
      showPortfolioProject(projectType);
    }
  }

  // Call initialization
  initializePortfolio();

  // Make initializePortfolioSubsection accessible to navigation.js
  window.initializePortfolioSubsection = initializePortfolioSubsection;

  // Make showPortfolioProject accessible to navigation.js
  window.showPortfolioProject = showPortfolioProject;

  // Make showPortfolioMain accessible to navigation.js
  window.showPortfolioMain = showPortfolioMain;

  // Log initialization complete
  console.log("Portfolio JavaScript initialization complete");
});
