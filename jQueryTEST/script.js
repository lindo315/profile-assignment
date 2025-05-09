// jQuery Test - Magnific Popup Plugin
// I've separated this script out so it's easier to understand
$(document).ready(function () {
  // I'm checking if the plugin is loaded before trying to use it
  if ($.magnificPopup) {
    console.log("Magnific Popup plugin loaded successfully!");

    // AUTOMOTIVE GALLERY SETUP
    // First I'm initializing the automotive gallery with custom options
    $("#automotive-gallery").magnificPopup({
      // This tells the plugin which elements should trigger the popup
      delegate: "a",

      // We're showing images
      type: "image",

      // Gallery mode settings - this makes the arrows and navigation work
      gallery: {
        enabled: true, // turns on gallery mode
        preload: [0, 2], // preloads the next 2 images for smoother transitions
        navigateByImgClick: true, // allows clicking image to go to next

        // These are just text labels for the controls
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
      },

      // Customize appearance with zoom effect - this took me ages to figure out!
      mainClass: "mfp-with-zoom",
      zoom: {
        enabled: true, // enable zoom effect
        duration: 300, // animation duration in ms
        easing: "ease-in-out", // CSS transition type

        // This function helps the plugin know which element to zoom from
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },

      // Custom title formatting for the images
      image: {
        titleSrc: function (item) {
          return item.el.find("img").attr("alt");
        },
      },

      // Add some custom callbacks for different events
      callbacks: {
        // This runs before the popup opens
        beforeOpen: function () {
          console.log("Opening automotive gallery popup");
        },

        // This runs after the popup opens
        open: function () {
          console.log("Automotive gallery popup opened");
        },

        // This runs when changing images
        change: function () {
          console.log("Changed to image #" + this.currItem.index);
        },
      },
    });

    // BRAND IDENTITY GALLERY SETUP
    // Setting up the brand gallery with similar options
    $("#brand-gallery").magnificPopup({
      delegate: "a",
      type: "image",

      gallery: {
        enabled: true,
        preload: [0, 2],
        navigateByImgClick: true,
      },

      mainClass: "mfp-with-zoom",
      zoom: {
        enabled: true,
        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },

      image: {
        titleSrc: function (item) {
          return item.el.find("img").attr("alt");
        },
      },

      callbacks: {
        beforeOpen: function () {
          console.log("Opening brand gallery popup");
        },
      },
    });

    // EXTRA FEATURES & CUSTOMIZATIONS
    // I added some keyboard shortcuts for even better UX
    $(document).keydown(function (e) {
      // ESC key - global close popup
      if (e.keyCode === 27) {
        $.magnificPopup.close();
      }
    });

    // This adds a custom animation class to the popup
    // I was trying to match my site's animation style
    $(".gallery-item").hover(
      function () {
        $(this).css("transform", "translateY(-5px)");
        $(this).css("box-shadow", "0 10px 20px rgba(0, 0, 0, 0.3)");
      },
      function () {
        $(this).css("transform", "translateY(0)");
        $(this).css("box-shadow", "none");
      }
    );
  } else {
    // Error handling if plugin isn't loaded
    console.error(
      "Magnific Popup plugin not found! Make sure it's loaded properly."
    );
    alert("Gallery plugin not loaded! Please check your internet connection.");
  }

  // Just a message to show everything's loaded
  console.log("jQuery script for Magnific Popup test initialized!");
});
