/*
BIZII Single-Page Website JavaScript
Author: BIZII
Description: Custom JS for BIZII single-page website with section transitions
*/

$(document).ready(function () {
  // Initial setup - show home section
  $(".section").removeClass("active");
  $("#home").addClass("active");

  // Navigation click handling with smooth transitions
  $(".nav-links a").on("click", function (e) {
    e.preventDefault();

    const targetSection = $(this).attr("href");

    // Update active navigation link
    $(".nav-links a").removeClass("active");
    $(this).addClass("active");

    // Fade out current section
    $(".section.active").fadeOut(300, function () {
      $(this).removeClass("active");

      // Fade in target section
      $(targetSection).fadeIn(300, function () {
        $(this).addClass("active");
      });
    });

    // Update URL without page reload
    history.pushState(null, null, targetSection);
  });

  // Handle browser back/forward buttons
  $(window).on("popstate", function () {
    const currentSection = window.location.hash || "#home";

    // Update active navigation link
    $(".nav-links a").removeClass("active");
    $(`.nav-links a[href="${currentSection}"]`).addClass("active");

    // Update active section
    $(".section.active").removeClass("active");
    $(currentSection).addClass("active");
  });

  // Email form validation
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      $("#email").addClass("error");
      return;
    }

    // Form is valid - would normally send data to server here
    // For demo purposes, show success message
    $(this).html(
      '<p class="success-message">Thanks for getting in touch! I\'ll get back to you shortly.</p>'
    );
  });

  // Remove error class on input focus
  $("#email").on("focus", function () {
    $(this).removeClass("error");
  });

  // Simple hover effects for projects
  $(".project-card")
    .on("mouseenter", function () {
      $(this).addClass("hover");
    })
    .on("mouseleave", function () {
      $(this).removeClass("hover");
    });

  // Handle direct URL access with hash
  if (window.location.hash) {
    const currentSection = window.location.hash;

    // Update active navigation link
    $(".nav-links a").removeClass("active");
    $(`.nav-links a[href="${currentSection}"]`).addClass("active");

    // Update active section
    $(".section.active").removeClass("active");
    $(currentSection).addClass("active");
  }

  // Ensure correct section is shown when page is loaded
  $(window).on("load", function () {
    // Scroll to top when page is loaded
    window.scrollTo(0, 0);
  });

  // Add scroll animation for arrow in contact section
  setInterval(function () {
    $(".arrow-down")
      .animate(
        {
          marginTop: "10px",
        },
        800
      )
      .animate(
        {
          marginTop: "0",
        },
        800
      );
  }, 1600);
});
