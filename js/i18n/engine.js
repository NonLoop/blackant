/* ============================================================
   Dragon Ball Studio — i18n engine (中 / EN)
   Usage: elements with data-i18n / data-i18n-text /
          data-i18n-placeholder / .lang-block[data-lang]
   Load AFTER the dictionary files (dict-*.js).
   ============================================================ */

window.I18N = window.I18N || { zh: {}, en: {} };

(function () {
  /* Only set when the user explicitly toggles; otherwise follow system language. */
  var PREF_KEY = "ba-lang-pref";

  function detectSystemLang() {
    var list = [];
    try {
      if (navigator.languages && navigator.languages.length) {
        list = Array.prototype.slice.call(navigator.languages);
      } else if (navigator.language) {
        list = [navigator.language];
      }
    } catch (e) {}
    for (var i = 0; i < list.length; i++) {
      if (String(list[i]).toLowerCase().indexOf("zh") === 0) return "zh";
    }
    return list.length ? "en" : "zh";
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem(PREF_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    return detectSystemLang();
  }

  var lang = detectLang();

  function apply(l, persist) {
    lang = l;
    if (persist) {
      try { localStorage.setItem(PREF_KEY, l); } catch (e) {}
    }
    document.documentElement.setAttribute("lang", l === "zh" ? "zh-CN" : "en");
    var dict = window.I18N[l];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-text]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-text");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    /* long-form bilingual blocks: .lang-block[data-lang="zh|en"] */
    document.querySelectorAll(".lang-block").forEach(function (el) {
      el.classList.toggle("nb-hide", el.getAttribute("data-lang") !== l);
    });
    document.title =
      l === "zh"
        ? document.body.getAttribute("data-title-zh") || "龙球工作室 Dragon Ball Studio — 精品应用系列"
        : document.body.getAttribute("data-title-en") || "Dragon Ball Studio — Crafted iOS Apps";
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.textContent = l === "zh" ? "EN" : "中文";
    });
  }

  window.__setLang = function (l) { apply(l, true); };
  window.__getLang = function () { return lang; };

  /* Script loads at end of body — apply immediately to reduce flash. */
  apply(lang, false);

  /* Follow OS language changes when the user has not set a manual preference. */
  window.addEventListener("languagechange", function () {
    try {
      if (localStorage.getItem(PREF_KEY)) return;
    } catch (e) {}
    apply(detectSystemLang(), false);
  });

  window.__toggleLang = function (btn, event) {
    if (event) event.stopPropagation();
    apply(lang === "zh" ? "en" : "zh", true);
    btn.blur();
  };
})();
