/* ============================================================
   Dragon Ball Studio — interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---- nav scroll state ---- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---- reveal on scroll ---- */
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---- homepage category filter ---- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".app-card[data-cat]");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      filters.forEach(function (x) { x.classList.remove("active"); });
      f.classList.add("active");
      var cat = f.getAttribute("data-filter");
      cards.forEach(function (c) {
        var show = cat === "all" || c.getAttribute("data-cat") === cat;
        c.classList.toggle("hidden", !show);
        if (show) {
          c.classList.remove("visible");
          void c.offsetWidth; /* restart transition */
          c.classList.add("visible");
        }
      });
    });
  });
})();
