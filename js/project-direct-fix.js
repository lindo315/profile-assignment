/**
 * Simple direct JavaScript for the automotive carousel
 * This doesn't rely on any external plugins or complex interactions
 */
document.addEventListener("DOMContentLoaded", function () {
  // Array of automotive images with captions
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

  // Variables for carousel elements
  const carouselImage = document.getElementById("automotive-carousel-image");
  const carouselCaption = document.getElementById("automotive-caption");
  const prevButton = document.getElementById("automotive-prev");
  const nextButton = document.getElementById("automotive-next");

  // If elements don't exist, exit early
  if (!carouselImage || !carouselCaption || !prevButton || !nextButton) {
    return;
  }

  // Current image index
  let currentIndex = 0;

  // Function to show an image by index
  function showImage(index) {
    // Ensure index is within bounds
    if (index < 0) index = automotiveImages.length - 1;
    if (index >= automotiveImages.length) index = 0;

    // Update current index
    currentIndex = index;

    // Fade out current image
    carouselImage.style.opacity = "0";

    // Wait for fade out, then update image and fade in
    setTimeout(() => {
      carouselImage.src = automotiveImages[index].src;
      carouselCaption.innerHTML = automotiveImages[index].caption;
      carouselImage.style.opacity = "1";
    }, 200);
  }

  // Event handlers for buttons
  prevButton.addEventListener("click", function () {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    showImage(currentIndex + 1);
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (document.querySelector("#project-automotive.active")) {
      if (e.key === "ArrowLeft") {
        showImage(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        showImage(currentIndex + 1);
      }
    }
  });

  // Initialize the carousel with the first image
  showImage(0);

  // Optional: Add fade transition to the carousel image
  carouselImage.style.transition = "opacity 0.2s ease-in-out";
});
