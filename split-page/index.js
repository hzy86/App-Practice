(function() {
    "use strict";

    window.addEventListener("load", initialize);

    function initialize() {
      let buttons = qsa("button");
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", hideOverlay);
      }
      let container = qs(".container");
      qs(".split.left").addEventListener("mouseenter", function() {
        container.classList.toggle("hover-left", true);
      });
      qs(".split.left").addEventListener("mouseleave", function() {
        container.classList.toggle("hover-left", false);
      });
      qs(".split.right").addEventListener("mouseenter", function() {
        container.classList.toggle("hover-right", true);
      });
      qs(".split.right").addEventListener("mouseleave", function() {
        container.classList.toggle("hover-right", false);
      });
    }

    function hideOverlay() {
      if (this.classList.contains("left")) {
        $("left-overlay").classList.toggle("hidden");
      }else {
        $("right-overlay").classList.toggle("hidden");
      }
    }

    function qs(query) {
      return document.querySelector(query);
    }

    function qsa(query) {
      return document.querySelectorAll(query);
    }

    function $(id) {
      return document.getElementById(id);
    }
}
)();
