/*
BIZII Single-Page Website - Project View JavaScript
Author: BIZII
Description: Handles project views including automotive carousel and static galleries
*/

$(document).ready(function () {
  // -------------------------------------------------------------------------
  // AUTOMOTIVE PHOTOGRAPHY CAROUSEL
  // -------------------------------------------------------------------------

  // Store the automotive images in an array for the carousel
  const automotiveImages = [
    {
      src: "images/auto/1.jpg",
      caption: "THE BMW M5.<br>AN UNCOMPROMISED DECISION.",
    },
    {
      src: "images/auto/2.jpg",
      caption: "PRECISION ENGINEERING.<br>CAPTURED IN MOTION.",
    },
    {
      src: "images/auto/3.jpg",
      caption: "PERFORMANCE REDEFINED.<br>THE BMW M SERIES.",
    },
    {
      src: "images/auto/4.jpg",
      caption: "THE BMW M5.<br>UNLEASHING THE BEAST.",
    },
    {
      src: "images/auto/5.jpg",
      caption: "RAW POWER MEETS ELEGANCE.<br>BMW M SERIES.",
    },
  ];

  let currentImageIndex = 0;

  // Initialize automotive carousel
  function initAutomotiveCarousel() {
    console.log("Initializing automotive carousel...");

    // Create carousel markup
    const carouselHTML = `
        <div class="carousel-container">
          <button class="carousel-arrow prev-arrow">&lt;</button>
          <div class="carousel-image-container">
            <img src="${
              automotiveImages[0].src
            }" alt="BMW Photography" class="carousel-image">
            <div class="image-caption">${automotiveImages[0].caption}</div>
          </div>
          <button class="carousel-arrow next-arrow">&gt;</button>
          <div class="carousel-indicators">
            ${automotiveImages
              .map(
                (_, index) =>
                  `<button class="carousel-indicator ${
                    index === 0 ? "active" : ""
                  }" data-index="${index}"></button>`
              )
              .join("")}
          </div>
        </div>
      `;

    // Replace the existing project showcase with our new carousel
    $("#project-automotive .project-showcase").html(carouselHTML);

    // Set up event handlers
    $("#project-automotive .prev-arrow").on("click", showPreviousImage);
    $("#project-automotive .next-arrow").on("click", showNextImage);
    $("#project-automotive .carousel-indicator").on("click", function () {
      const index = $(this).data("index");
      showImage(index);
    });

    // Add keyboard navigation
    $(document).on("keydown", function (e) {
      if ($("#project-automotive").hasClass("active")) {
        // Left arrow key
        if (e.keyCode === 37) {
          showPreviousImage();
        }
        // Right arrow key
        else if (e.keyCode === 39) {
          showNextImage();
        }
      }
    });

    // Add swipe support for mobile
    const carouselEl = $("#project-automotive .carousel-container")[0];
    if (carouselEl) {
      let touchStartX = 0;

      carouselEl.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
      });

      carouselEl.addEventListener("touchend", function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        // Swipe left (next)
        if (diff > 50) {
          showNextImage();
        }
        // Swipe right (previous)
        else if (diff < -50) {
          showPreviousImage();
        }
      });
    }
  }

  // Show previous image in carousel
  function showPreviousImage() {
    currentImageIndex =
      (currentImageIndex - 1 + automotiveImages.length) %
      automotiveImages.length;
    showImage(currentImageIndex);
  }

  // Show next image in carousel
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % automotiveImages.length;
    showImage(currentImageIndex);
  }

  // Show specific image by index
  function showImage(index) {
    if (index < 0 || index >= automotiveImages.length) return;

    currentImageIndex = index;

    // Update image and caption with fade effect
    const imageContainer = $("#project-automotive .carousel-image-container");
    imageContainer.fadeOut(200, function () {
      // Update image source
      imageContainer.find("img").attr("src", automotiveImages[index].src);
      // Update caption text
      imageContainer
        .find(".image-caption")
        .html(automotiveImages[index].caption);
      // Update indicators
      $("#project-automotive .carousel-indicator").removeClass("active");
      $(
        "#project-automotive .carousel-indicator[data-index='" + index + "']"
      ).addClass("active");
      // Fade back in
      imageContainer.fadeIn(200);
    });
  }

  // -------------------------------------------------------------------------
  // COMMUNICATION DESIGN STATIC GALLERY
  // -------------------------------------------------------------------------

  function initCommunicationGallery() {
    console.log("Initializing communication design gallery...");

    const communicationHTML = `
        <div class="project-gallery">
          <div class="gallery-main-image">
            <img src="images/UIUberEats.png" alt="Old Mutual SMEGo Design">
          </div>
          <div class="gallery-thumbnails">
            <div class="gallery-thumbnail">
              <img src="images/communication/2.jpg" alt="TAP2PAY">
            </div>
            <div class="gallery-thumbnail">
              <img src="images/communication/3.jpg" alt="International Women's Day">
            </div>
          </div>
        </div>
      `;

    // Replace project showcase with static gallery
    $("#project-communication .project-showcase").html(communicationHTML);

    // Add click event to thumbnails
    $("#project-communication .gallery-thumbnail").on("click", function () {
      const imgSrc = $(this).find("img").attr("src");
      $("#project-communication .gallery-main-image img").fadeOut(
        200,
        function () {
          $(this).attr("src", imgSrc).fadeIn(200);
        }
      );
    });
  }

  // -------------------------------------------------------------------------
  // BRAND IDENTITY DESIGN STATIC GALLERY
  // -------------------------------------------------------------------------

  function initBrandGallery() {
    console.log("Initializing brand identity gallery...");

    const brandHTML = `
        <div class="project-gallery">
          <div class="gallery-main-image">
            <img src="images/Black.png" alt="Giant Step Brand Identity">
          </div>
          <div class="gallery-thumbnails">
            <div class="gallery-thumbnail">
              <img src="images/brand/2.jpg" alt="Brand Identity System">
            </div>
            <div class="gallery-thumbnail">
              <img src="images/brand/3.jpg" alt="Giant Step">
            </div>
          </div>
        </div>
      `;

    // Replace project showcase with static gallery
    $("#project-brand .project-showcase").html(brandHTML);

    // Add click event to thumbnails
    $("#project-brand .gallery-thumbnail").on("click", function () {
      const imgSrc = $(this).find("img").attr("src");
      $("#project-brand .gallery-main-image img").fadeOut(200, function () {
        $(this).attr("src", imgSrc).fadeIn(200);
      });
    });
  }

  // -------------------------------------------------------------------------
  // PROJECT NAVIGATION
  // -------------------------------------------------------------------------

  // Handle back to portfolio button clicks
  $(".back-to-portfolio").on("click", function () {
    console.log("Back to portfolio clicked");

    // Hide the active project view
    $(".project-view.active").removeClass("active");

    // Show main portfolio view
    $("#portfolio-main").addClass("active");

    // Remove project-active class for white background
    $("#portfolio").removeClass("project-active");

    // Update URL hash
    history.pushState(null, null, "#portfolio");

    // Update logo if needed
    updateLogoForBackground(false);
  });

  // Open a specific project
  $(".portfolio-card").on("click", function () {
    const projectType = $(this).data("project");
    console.log(`Opening project: ${projectType}`);

    // Add project active class for white background
    $("#portfolio").addClass("project-active");

    // Hide main portfolio view
    $("#portfolio-main").removeClass("active");

    // Show selected project view
    $(`#project-${projectType}`).addClass("active");

    // Reset to first image in carousel if automotive
    if (projectType === "automotive") {
      currentImageIndex = 0;
      showImage(0);
    }

    // Update URL hash
    history.pushState(null, null, `#portfolio-${projectType}`);

    // Update logo if needed
    updateLogoForBackground(true);
  });

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

  // -------------------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------------------

  // Initialize all project views
  function initializeProjectViews() {
    initAutomotiveCarousel();
    initCommunicationGallery();
    initBrandGallery();

    // Check URL hash to see if we should start in a specific view
    const hash = window.location.hash;
    if (hash.startsWith("#portfolio-")) {
      const projectType = hash.replace("#portfolio-", "");
      if (["automotive", "communication", "brand"].includes(projectType)) {
        // Trigger click on the corresponding portfolio card
        $(`.portfolio-card[data-project="${projectType}"]`).click();
      }
    }
  }

  // Run initialization
  initializeProjectViews();

  // Log initialization complete
  console.log("Project View JavaScript initialization complete");

  // Make functions accessible to other scripts if needed
  window.showImage = showImage;
  window.showPreviousImage = showPreviousImage;
  window.showNextImage = showNextImage;
});
