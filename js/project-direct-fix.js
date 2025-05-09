// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Array of automotive images with their captions
  // I'm storing all the data here to make it easier to manage
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

  // Get all the elements we need
  // I'm using getElementById because it's faster than jQuery selectors
  const carouselImage = document.getElementById("automotive-carousel-image");
  const carouselCaption = document.getElementById("automotive-caption");
  const prevButton = document.getElementById("automotive-prev");
  const nextButton = document.getElementById("automotive-next");

  // If the elements don't exist, exit early
  // This prevents errors if the DOM structure changes
  if (!carouselImage || !carouselCaption || !prevButton || !nextButton) {
    // Log an error to the console for debugging
    console.error("Carousel elements not found!");
    return;
  }

  // Keep track of which image we're showing
  let currentIndex = 0;

  // Function to show an image by index
  function showImage(index) {
    // Make sure the index is valid
    // If it's out of bounds, loop around to the other end
    if (index < 0) index = automotiveImages.length - 1;
    if (index >= automotiveImages.length) index = 0;

    // Update the current index
    currentIndex = index;

    // Add a fade effect by changing opacity
    // This looks much nicer than just swapping the image
    carouselImage.style.opacity = "0";

    // Wait for the fade out, then update the image and fade in
    // I'm using setTimeout to create a simple animation
    setTimeout(() => {
      // Update the image source
      carouselImage.src = automotiveImages[index].src;
      // Update the caption text
      carouselCaption.innerHTML = automotiveImages[index].caption;
      // Fade the image back in
      carouselImage.style.opacity = "1";
    }, 200); // 200ms wait to match the CSS transition
  }

  // Add click handlers for the navigation buttons
  prevButton.addEventListener("click", function () {
    // Show the previous image (go back one)
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    // Show the next image (go forward one)
    showImage(currentIndex + 1);
  });

  // Add keyboard navigation (arrow keys)
  // This makes it easier to use for desktop users
  document.addEventListener("keydown", function (e) {
    // Only handle keys if the automotive project is visible
    if (document.querySelector("#project-automotive.active")) {
      // Left arrow key - previous image
      if (e.key === "ArrowLeft") {
        showImage(currentIndex - 1);
      }
      // Right arrow key - next image
      else if (e.key === "ArrowRight") {
        showImage(currentIndex + 1);
      }
    }
  });

  // Initialize the carousel with the first image
  showImage(0);

  // Add a fade transition to the carousel image
  // This makes the image changes look smoother
  carouselImage.style.transition = "opacity 0.2s ease-in-out";

  // Log that the carousel is ready
  console.log("Automotive carousel initialized successfully!");
});
