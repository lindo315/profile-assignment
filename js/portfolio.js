// Wait until the document is loaded
$(document).ready(function () {
  // PORTFOLIO VARIABLES - Data for the image galleries

  /**
   * This stores all the image data for each project gallery
   * I structured it as an object to keep everything organized
   */
  const projectGalleries = {
    // Automotive project images
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
    // Communication project images
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
    // Brand identity project images
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
   * Keep track of which image we're showing in each project gallery
   * Starting with the first image (index 0)
   */
  const currentImageIndex = {
    automotive: 0,
    communication: 0,
    brand: 0,
  };

  // PORTFOLIO NAVIGATION - Switching between main grid and project views

  /**
   * This handles clicks on portfolio project cards
   * to open the detailed project view
   */
  $(".portfolio-card").on("click", function () {
    // Get which project was clicked (automotive, communication, or brand)
    const projectType = $(this).data("project");
    console.log(`Opening project: ${projectType}`);

    // Show that project's detailed view
    showPortfolioProject(projectType);
  });

  /**
   * This handles clicks on "Back to Portfolio" buttons
   * to return to the main portfolio grid
   */
  $(".back-to-portfolio").on("click", function () {
    console.log("Returning to main portfolio view");

    // Go back to the main portfolio grid
    showPortfolioMain();
  });

  /**
   * This shows the main portfolio grid view
   * It hides all project views and shows the grid
   */
  function showPortfolioMain() {
    // Remove the white background class
    $("#portfolio").removeClass("project-active");

    // Hide all project views
    $(".project-view").removeClass("active");

    // Show main portfolio grid
    $("#portfolio-main").addClass("active");

    // Update the URL hash
    history.pushState(null, null, "#portfolio");

    // Update the logo to match the background color
    updateLogoForBackground(false);
  }

  /**
   * This shows a specific project's detailed view
   */
  function showPortfolioProject(projectType) {
    // Make sure it's a valid project type
    if (!["automotive", "communication", "brand"].includes(projectType)) {
      console.error(`Invalid project type: ${projectType}`);
      return;
    }

    // Add class to change background to white
    $("#portfolio").addClass("project-active");

    // Hide the main portfolio grid
    $("#portfolio-main").removeClass("active");

    // Show the selected project view
    $(`#project-${projectType}`).addClass("active");

    // Reset to first image in gallery
    updateProjectImage(projectType, 0);

    // Update the URL hash
    history.pushState(null, null, `#portfolio-${projectType}`);

    // Update the logo to match the background color
    updateLogoForBackground(true);
  }

  /**
   * This updates the logo image based on the background color
   * Red background = white logo, White background = red logo
   */
  function updateLogoForBackground(isProjectView) {
    // Get the logo image element
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
   * This sets up the project header structure
   * by wrapping them in a banner for better styling
   */
  function setupProjectHeaders() {
    // For each project view section
    $(".project-view").each(function () {
      const header = $(this).find(".project-header");

      // Only wrap it if not already wrapped
      if (!header.parent().hasClass("project-header-banner")) {
        header.wrap('<div class="project-header-banner"></div>');
      }
    });
  }

  // PROJECT GALLERY NAVIGATION - Next/Previous buttons in project galleries

  /**
   * This handles clicks on the next arrow in galleries
   */
  $(".next-arrow").on("click", function () {
    // Get the project type from the parent container ID
    const projectId = $(this).closest(".portfolio-view").attr("id");
    const projectType = projectId.replace("project-", "");

    // Get the gallery for this project type
    const gallery = projectGalleries[projectType];
    if (!gallery || gallery.length <= 1) return;

    // Update to the next image (loop back to start if at the end)
    currentImageIndex[projectType] =
      (currentImageIndex[projectType] + 1) % gallery.length;

    // Update the image and caption
    updateProjectImage(projectType, currentImageIndex[projectType]);
  });

  /**
   * This handles clicks on the previous arrow in galleries
   */
  $(".prev-arrow").on("click", function () {
    // Get the project type from the parent container ID
    const projectId = $(this).closest(".portfolio-view").attr("id");
    const projectType = projectId.replace("project-", "");

    // Get the gallery for this project type
    const gallery = projectGalleries[projectType];
    if (!gallery || gallery.length <= 1) return;

    // Update to the previous image (loop to end if at the start)
    currentImageIndex[projectType] =
      (currentImageIndex[projectType] - 1 + gallery.length) % gallery.length;

    // Update the image and caption
    updateProjectImage(projectType, currentImageIndex[projectType]);
  });

  /**
   * This updates the project image and caption based on the index
   */
  function updateProjectImage(projectType, index) {
    // Get the gallery for this project
    const gallery = projectGalleries[projectType];
    if (!gallery || index >= gallery.length) {
      console.error(`Invalid gallery or index: ${projectType}, ${index}`);
      return;
    }

    console.log(`Updating ${projectType} gallery to image ${index}`);

    // Get the image container for this project
    const imageContainer = $(`#project-${projectType} .project-image`);

    // Fade out the current image
    imageContainer.fadeOut(200, function () {
      // Update the image source
      imageContainer.find("img").attr("src", gallery[index].image);

      // Update the caption
      if (gallery[index].caption) {
        if (imageContainer.find(".image-caption").length === 0) {
          // Create caption if it doesn't exist
          imageContainer.append(
            `<div class="image-caption">${gallery[index].caption}</div>`
          );
        } else {
          // Update existing caption
          imageContainer.find(".image-caption").html(gallery[index].caption);
        }
      }

      // Fade in the updated image
      imageContainer.fadeIn(200);
    });

    // Update the current index
    currentImageIndex[projectType] = index;
  }

  // PORTFOLIO INITIALIZATION - Setting up the portfolio when page loads

  /**
   * This initializes the portfolio section structure and styles
   */
  function initializePortfolio() {
    // Setup project headers
    setupProjectHeaders();

    // Check if we need to start in a project view
    // (useful for direct links to specific projects)
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
   * This initializes a portfolio subsection if accessed directly via URL
   */
  function initializePortfolioSubsection(projectType) {
    if (["automotive", "communication", "brand"].includes(projectType)) {
      console.log(`Initializing portfolio subsection: ${projectType}`);
      showPortfolioProject(projectType);
    }
  }

  // Call the initialization function
  initializePortfolio();

  // Make some functions available globally so other scripts can use them
  window.initializePortfolioSubsection = initializePortfolioSubsection;
  window.showPortfolioProject = showPortfolioProject;
  window.showPortfolioMain = showPortfolioMain;

  // Just a log to confirm the script loaded
  console.log("Portfolio JavaScript loaded");
});
