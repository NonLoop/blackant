/* ============================================================
   Dragon Ball Studio — interactions (jQuery)
   ============================================================ */

(function ($) {
  "use strict";

  /* ---- nav scroll state ---- */
  var $nav = $(".nav");
  function onScroll() {
    $nav.toggleClass("scrolled", window.scrollY > 24);
  }
  $(window).on("scroll", onScroll);
  onScroll();

  /* ---- mobile menu ---- */
  var $links = $(".nav-links");
  $(".nav-toggle").on("click", function () {
    $links.toggleClass("open");
  });
  $links.on("click", "a", function () {
    $links.removeClass("open");
  });

  /* ---- reveal on scroll ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            $(e.target).addClass("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $(".reveal").each(function () { io.observe(this); });
  } else {
    $(".reveal").addClass("visible");
  }

  /* ---- homepage category filter ---- */
  var $filters = $(".filter");
  var $cards = $(".app-card[data-cat]");
  $filters.on("click", function () {
    var $f = $(this);
    $filters.removeClass("active");
    $f.addClass("active");
    var cat = $f.attr("data-filter");
    $cards.each(function () {
      var $c = $(this);
      var show = cat === "all" || $c.attr("data-cat") === cat;
      $c.toggleClass("hidden", !show);
      if (show) {
        $c.removeClass("visible");
        void this.offsetWidth;
        $c.addClass("visible");
      }
    });
  });
})(jQuery);
