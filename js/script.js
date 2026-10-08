/* =========================================================================
   Local Tourism Guide - Shared JavaScript
   -------------------------------------------------------------------------
   This one file is loaded on every page. Each feature first checks that
   the elements it needs exist, so it is safe to run on every page.

   Contents
   1. Mark JavaScript as available
   2. Mobile navigation menu
   3. Smooth scrolling for internal links
   4. Attraction category filter   (attractions.html)
   5. Before You Travel checklist  (travel-tips.html)
   6. Contact form validation      (contact.html)
   7. Footer year
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Tell the CSS that JavaScript is running (used for the no-JS menu fallback)
  document.documentElement.classList.remove("no-js");

  setupMobileMenu();
  setupSmoothScrolling();
  setupAttractionFilter();
  setupChecklist();
  setupContactForm();
  setFooterYear();
});


/* =========================================================================
   2. Mobile navigation menu
   ========================================================================= */
function setupMobileMenu() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-navigation");

  if (!toggle || !nav) {
    return;
  }

  // Desktop layout starts at this width (matches the CSS media query)
  var desktopQuery = window.matchMedia("(min-width: 960px)");

  function openMenu() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  // Give the button a clear accessible name from the start
  closeMenu();

  // Open or close when the button is pressed
  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
      // Move focus to the first link so keyboard users can carry on
      var firstLink = nav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  // Close with the Escape key and return focus to the button
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close when a menu link is chosen
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a") && !desktopQuery.matches) {
      closeMenu();
    }
  });

  // Close when clicking anywhere outside the header
  document.addEventListener("click", function (event) {
    if (nav.classList.contains("is-open") && !event.target.closest(".site-header")) {
      closeMenu();
    }
  });

  // Close when keyboard focus leaves the open menu on small screens
  nav.addEventListener("focusout", function (event) {
    var next = event.relatedTarget;
    if (!desktopQuery.matches && next && !nav.contains(next) && next !== toggle) {
      closeMenu();
    }
  });

  // Reset the menu when the screen becomes desktop size
  function handleScreenChange() {
    if (desktopQuery.matches) {
      closeMenu();
    }
  }

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleScreenChange);
  } else {
    desktopQuery.addListener(handleScreenChange); // older Safari
  }
}


/* =========================================================================
   3. Smooth scrolling for internal links (for example href="#checklist")
   CSS "scroll-behavior: smooth" does most of the work. This function also
   moves keyboard focus to the target so screen readers follow along.
   ========================================================================= */
function setupSmoothScrolling() {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href").slice(1);
      if (!id) {
        return;
      }

      var target = document.getElementById(id);
      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      // Make the target focusable if it is not already, then focus it
      if (!target.hasAttribute("tabindex") && !isFocusable(target)) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });

      // Update the address bar without jumping
      if (history.pushState) {
        history.pushState(null, "", "#" + id);
      }
    });
  });
}

function isFocusable(element) {
  return element.matches("a[href], button, input, select, textarea, [tabindex]");
}


/* =========================================================================
   4. Attraction category filter
   Buttons use data-filter="nature" etc. Cards use data-category="nature".
   ========================================================================= */
function setupAttractionFilter() {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".attraction-grid .attraction-card");
  var status = document.getElementById("filter-status");

  if (buttons.length === 0 || cards.length === 0) {
    return;
  }

  function applyFilter(category, label) {
    var visibleCount = 0;

    // Show or hide each card
    cards.forEach(function (card) {
      var matches = category === "all" || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) {
        visibleCount++;
      }
    });

    // Update the button states (visual style + aria-pressed for screen readers)
    buttons.forEach(function (button) {
      var isSelected = button.dataset.filter === category;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    // Announce the result
    if (status) {
      var noun = visibleCount === 1 ? "attraction" : "attractions";
      if (category === "all") {
        status.textContent = "Showing all " + visibleCount + " " + noun + ".";
      } else {
        status.textContent = "Showing " + visibleCount + " " + label + " " + noun + ".";
      }
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.dataset.filter, button.textContent.trim().toLowerCase());
    });
  });

  // Start with every attraction showing
  applyFilter("all", "all");
}


/* =========================================================================
   5. Before You Travel checklist
   Adds a style to ticked items. Nothing is saved or sent.
   ========================================================================= */
function setupChecklist() {
  var boxes = document.querySelectorAll(".checklist input[type='checkbox']");

  boxes.forEach(function (box) {
    box.addEventListener("change", function () {
      box.closest("li").classList.toggle("is-checked", box.checked);
    });
  });
}


/* =========================================================================
   6. Contact form validation
   The form is NOT sent anywhere because GitHub Pages hosts static files only.
   ========================================================================= */
function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  var successBox = document.getElementById("form-success");

  // Each field with the message shown when it is empty
  var fields = [
    { input: document.getElementById("full-name"), name: "your full name" },
    { input: document.getElementById("email"), name: "your email address" },
    { input: document.getElementById("subject"), name: "a subject" },
    { input: document.getElementById("message"), name: "your message" }
  ];

  // Simple, reliable email pattern: something@something.something
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Pre-fill the subject when arriving from an accommodation "Make an Enquiry" button
  var params = new URLSearchParams(window.location.search);
  var enquiry = params.get("enquiry");
  var subjectInput = document.getElementById("subject");
  if (enquiry && subjectInput) {
    subjectInput.value = "Accommodation enquiry: " + enquiry.slice(0, 60);
  }

  function showError(input, message) {
    var group = input.closest(".form-group");
    var errorBox = document.getElementById(input.id + "-error");
    group.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    errorBox.textContent = message;
  }

  function clearError(input) {
    var group = input.closest(".form-group");
    var errorBox = document.getElementById(input.id + "-error");
    group.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    errorBox.textContent = "";
  }

  // Check one field and return true if it is valid
  function validateField(field) {
    var value = field.input.value.trim();

    if (value === "") {
      showError(field.input, "Please enter " + field.name + ".");
      return false;
    }

    if (field.input.type === "email" && !emailPattern.test(value)) {
      showError(field.input, "Please enter a valid email address, for example name@example.com.");
      return false;
    }

    clearError(field.input);
    return true;
  }

  // Re-check a field as the visitor fixes it (only after an error was shown)
  fields.forEach(function (field) {
    field.input.addEventListener("input", function () {
      if (field.input.closest(".form-group").classList.contains("has-error")) {
        validateField(field);
      }
    });

    field.input.addEventListener("blur", function () {
      if (form.dataset.submitted === "true") {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    // Stop the browser from sending the form anywhere
    event.preventDefault();
    form.dataset.submitted = "true";
    successBox.hidden = true;

    var firstInvalid = null;

    fields.forEach(function (field) {
      var isValid = validateField(field);
      if (!isValid && !firstInvalid) {
        firstInvalid = field.input;
      }
    });

    if (firstInvalid) {
      // Take the visitor to the first problem
      firstInvalid.focus();
      return;
    }

    // Everything is valid: show the success message and clear the form
    successBox.hidden = false;
    successBox.focus();
    form.reset();
    form.dataset.submitted = "false";
  });
}


/* =========================================================================
   7. Footer year: keeps the copyright year up to date automatically
   ========================================================================= */
function setFooterYear() {
  var yearSpans = document.querySelectorAll(".js-year");
  var year = new Date().getFullYear();

  yearSpans.forEach(function (span) {
    span.textContent = year;
  });
}
