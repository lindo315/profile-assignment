// Wait for the document to load
$(document).ready(function () {
  // AUTOMOTIVE PHOTOGRAPHY CAROUSEL

  // Store all the automotive images and captions in an array
  // This makes it easier to loop through them in the carousel
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

  // Keep track of which image we're showing
  let currentImageIndex = 0;

  // Set up the automotive carousel
  function initAutomotiveCarousel() {
    console.log("Setting up automotive carousel...");

    // Create the HTML for the carousel
    // I find it easier to just create the whole HTML structure at once
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

    // Set up the event handlers for the previous and next buttons
    $("#project-automotive .prev-arrow").on("click", showPreviousImage);
    $("#project-automotive .next-arrow").on("click", showNextImage);

    // Set up the event handlers for the indicator dots
    $("#project-automotive .carousel-indicator").on("click", function () {
      const index = $(this).data("index");
      showImage(index);
    });

    // Add keyboard navigation (arrow keys)
    // This was a cool feature I found online and wanted to add
    $(document).on("keydown", function (e) {
      // Only handle keys if we're viewing the automotive project
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

    // Add swipe support for mobile devices
    // I had to look up how to do this, but it's pretty cool!
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

  // Show the previous image in the carousel
  function showPreviousImage() {
    // Loop back to the last image if we're at the first one
    currentImageIndex =
      (currentImageIndex - 1 + automotiveImages.length) %
      automotiveImages.length;
    showImage(currentImageIndex);
  }

  // Show the next image in the carousel
  function showNextImage() {
    // Loop back to the first image if we're at the last one
    currentImageIndex = (currentImageIndex + 1) % automotiveImages.length;
    showImage(currentImageIndex);
  }

  // Show a specific image by index
  function showImage(index) {
    // Make sure the index is valid
    if (index < 0 || index >= automotiveImages.length) return;

    // Update the current index
    currentImageIndex = index;

    // Use a fade effect to transition between images
    // This looks nicer than just swapping them instantly
    const imageContainer = $("#project-automotive .carousel-image-container");
    imageContainer.fadeOut(200, function () {
      // Update the image source
      imageContainer.find("img").attr("src", automotiveImages[index].src);
      // Update the caption text
      imageContainer
        .find(".image-caption")
        .html(automotiveImages[index].caption);
      // Update the indicator dots
      $("#project-automotive .carousel-indicator").removeClass("active");
      $(
        "#project-automotive .carousel-indicator[data-index='" + index + "']"
      ).addClass("active");
      // Fade back in
      imageContainer.fadeIn(200);
    });
  }

  // COMMUNICATION DESIGN STATIC GALLERY

  // Set up the communication design gallery
  function initCommunicationGallery() {
    console.log("Setting up communication design gallery...");

    // Create HTML for a static gallery
    // This one doesn't need a carousel since there's just one main image
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

    // Add click events to thumbnails
    // When clicked, they replace the main image
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

  // BRAND IDENTITY DESIGN STATIC GALLERY

  // Set up the brand identity gallery (similar to communication gallery)
  function initBrandGallery() {
    console.log("Setting up brand identity gallery...");

    // Create HTML for a static gallery
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

    // Add click events to thumbnails
    // Same functionality as the communication gallery
    $("#project-brand .gallery-thumbnail").on("click", function () {
      const imgSrc = $(this).find("img").attr("src");
      $("#project-brand .gallery-main-image img").fadeOut(200, function () {
        $(this).attr("src", imgSrc).fadeIn(200);
      });
    });
  }

  // PROJECT NAVIGATION

  // Handle clicks on the "Back to Portfolio" button
  $(".back-to-portfolio").on("click", function () {
    console.log("Going back to portfolio grid");

    // Hide the active project view
    $(".project-view.active").removeClass("active");

    // Show the main portfolio grid
    $("#portfolio-main").addClass("active");

    // Change background back to red
    $("#portfolio").removeClass("project-active");

    // Update URL hash
    history.pushState(null, null, "#portfolio");

    // Update logo if needed
    updateLogoForBackground(false);
  });

  // Handle clicks on portfolio cards to open projects
  $(".portfolio-card").on("click", function () {
    const projectType = $(this).data("project");
    console.log(`Opening ${projectType} project`);

    // Change background to white for project view
    $("#portfolio").addClass("project-active");

    // Hide the main portfolio grid
    $("#portfolio-main").removeClass("active");

    // Show the selected project
    $(`#project-${projectType}`).addClass("active");

    // Reset to first image if it's automotive
    if (projectType === "automotive") {
      currentImageIndex = 0;
      showImage(0);
    }

    // Update URL hash
    history.pushState(null, null, `#portfolio-${projectType}`);

    // Update logo for white background
    updateLogoForBackground(true);
  });

  /**
   * This updates the logo image based on which background color we're using
   */
  function updateLogoForBackground(isProjectView) {
    // Get the logo
    const logoImg = $("#portfolio .logo img");

    if (isProjectView) {
      // On white background (project view) - use red logo
      logoImg.attr("src", "images/icons/BIZII-logo-red.png");
    } else {
      // On red background (main portfolio) - use white logo
      logoImg.attr("src", "images/icons/BIZII-logo.png");
    }
  }

  // INITIALIZATION

  // Initialize all project views
  function initializeProjectViews() {
    // Set up all three project galleries
    initAutomotiveCarousel();
    initCommunicationGallery();
    initBrandGallery();

    // Check if we should start in a specific project view
    // This is for direct links to projects
    const hash = window.location.hash;
    if (hash.startsWith("#portfolio-")) {
      const projectType = hash.replace("#portfolio-", "");
      if (["automotive", "communication", "brand"].includes(projectType)) {
        // Trigger a click on the corresponding portfolio card
        $(`.portfolio-card[data-project="${projectType}"]`).click();
      }
    }
  }

  // Run the initialization
  initializeProjectViews();

  // Make these functions available to other scripts
  // Not sure if this is the best way but it works
  window.showImage = showImage;
  window.showPreviousImage = showPreviousImage;
  window.showNextImage = showNextImage;

  // Just a log to confirm the script loaded
  console.log("Project View JavaScript loaded");
});
