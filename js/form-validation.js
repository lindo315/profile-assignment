/*
BIZII Single-Page Website - Form Validation JavaScript
Author: BIZII
Description: Handles form validation and submission for the contact form
*/

$(document).ready(function () {
  // ------------------------------------------------------------------------
  // FORM VALIDATION
  // ------------------------------------------------------------------------

  /**
   * Validates an email address
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid
   */
  function isValidEmail(email) {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handles form validation errors
   * @param {jQuery} inputElement - Form input element with error
   * @param {string} errorMessage - Error message to display
   */
  function showFormError(inputElement, errorMessage) {
    // Add error class
    inputElement.addClass("error");

    // Add shake animation for invalid input
    inputElement.css("animation", "shake 0.5s");

    // Add border for visual feedback
    inputElement.css("border", "2px solid var(--primary-red)");

    // Remove animation after it completes
    setTimeout(function () {
      inputElement.css("animation", "");
    }, 500);

    // Add error message if not already present
    if (inputElement.next(".error-message").length === 0) {
      $(
        `<div class="error-message" style="color: var(--primary-red); font-size: 0.8rem; margin-top: 0.5rem;">${errorMessage}</div>`
      ).insertAfter(inputElement);
    } else {
      inputElement.next(".error-message").text(errorMessage);
    }
  }

  /**
   * Clears form validation errors
   * @param {jQuery} inputElement - Form input element to clear errors from
   */
  function clearFormError(inputElement) {
    // Remove error class
    inputElement.removeClass("error");

    // Remove error styling
    inputElement.css("border", "none");

    // Remove error message
    inputElement.next(".error-message").remove();
  }

  /**
   * Shows success message after form submission
   * @param {jQuery} formElement - Form element that was submitted
   * @param {string} successMessage - Success message to display
   */
  function showSuccessMessage(formElement, successMessage) {
    formElement.fadeOut(300, function () {
      formElement
        .html(`<p class="success-message">${successMessage}</p>`)
        .fadeIn(300);
    });
  }

  // ------------------------------------------------------------------------
  // FORM EVENT HANDLERS
  // ------------------------------------------------------------------------

  /**
   * Handles contact form submission
   * - Validates email input
   * - Shows error or success message
   * - Prevents default form submission
   */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    // Get email value
    const email = $("#email").val().trim();

    // Validate email
    if (email === "") {
      showFormError($("#email"), "Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      showFormError($("#email"), "Please enter a valid email address.");
      return;
    }

    // If we get here, the form is valid
    console.log("Form submitted successfully");

    // In a real implementation, this would send data to a server
    // For this demo, we'll just show a success message
    showSuccessMessage(
      $(this),
      "Thanks for getting in touch! I'll get back to you shortly."
    );
  });

  /**
   * Handles focus event on email input
   * - Clears any existing errors
   */
  $("#email").on("focus", function () {
    clearFormError($(this));
  });

  /**
   * Handles blur event on email input
   * - Validates input when user moves away from the field
   */
  $("#email").on("blur", function () {
    const email = $(this).val().trim();

    // If email is empty, don't show error yet
    if (email === "") {
      $(this).css("background-color", "rgba(255, 255, 255, 0.8)");
      return;
    }

    // If email is invalid, show error
    if (!isValidEmail(email)) {
      showFormError($(this), "Please enter a valid email address.");
    }
  });

  // Log initialization complete
  console.log("Form validation JavaScript initialization complete");
});
