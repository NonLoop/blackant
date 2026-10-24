/* ============================================================
   Shared nav / footer — injected via jQuery
   Placeholders: <div data-layout="nav"></div>
                 <div data-layout="footer"></div>
   Optional body attrs:
     data-nav="works|about|contact"   — active nav item
     data-privacy="slug|list|none"    — footer privacy link
     data-brand="home"                — homepage ant logo
   Base path is inferred from this script's src ("" or "../").
   Load AFTER jquery, BEFORE i18n engine.
   ============================================================ */
(function ($) {
  "use strict";

  function basePath() {
    var src = $('script[src*="layout.js"]').last().attr("src") || "";
    var i = src.lastIndexOf("js/layout.js");
    return i >= 0 ? src.slice(0, i) : "";
  }

  function logoSvg(brand) {
    if (brand === "home") {
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="#0b0d12" stroke-width="2" stroke-linecap="round">' +
        '<circle cx="6" cy="12" r="2.4" fill="#0b0d12" stroke="none"/>' +
        '<circle cx="12" cy="9" r="3.2" fill="#0b0d12" stroke="none"/>' +
        '<path d="M12 12.2v4"/><path d="M12 16.2l-2 4M12 16.2l2 4"/>' +
        '<path d="M9.5 8.5 4 5M14.5 8.5 20 5"/>' +
        "</svg>"
      );
    }
    return (
      '<svg viewBox="0 0 24 24" fill="none">' +
      '<circle cx="12" cy="12" r="8.5" stroke="#0b0d12" stroke-width="2"/>' +
      '<path d="M12 5.6l1.7 3.5 3.8.55-2.75 2.68.65 3.8L12 14.4l-3.4 1.73.65-3.8L6.5 9.65l3.8-.55L12 5.6z" fill="#0b0d12"/>' +
      "</svg>"
    );
  }

  function navActive(key, active) {
    return key === active ? ' class="active"' : "";
  }

  function inferPrivacy() {
    var path = (location.pathname || "").replace(/\\/g, "/");
    var m = path.match(/\/(apps|privacy)\/([\w-]+)\.html$/);
    if (!m) {
      /* file:// or relative open: fall back to last path segment */
      m = path.match(/(apps|privacy)\/([\w-]+)\.html$/);
    }
    if (!m) return "list";
    if (m[1] === "apps") return m[2];
    return "list";
  }

  function privacyHref(base, privacy) {
    if (!privacy || privacy === "none") return null;
    if (privacy === "list") return base + "privacy/index.html";
    return base + "privacy/" + privacy + ".html";
  }

  function renderNav(opts) {
    var b = opts.base;
    var a = opts.active;
    return (
      '<header class="nav">' +
      '<div class="nav-inner">' +
      '<a href="' + b + 'index.html" class="brand">' +
      '<span class="brand-logo">' + logoSvg(opts.brand) + "</span>" +
      '<span><span data-i18n="brand.name">龙球工作室</span>' +
      '<small data-i18n="brand.sub">DRAGON BALL STUDIO</small></span>' +
      "</a>" +
      '<button class="nav-toggle" aria-label="menu">☰</button>' +
      '<nav class="nav-links">' +
      '<a href="' + b + "index.html#works" + '"' + navActive("works", a) + ' data-i18n="nav.works">作品</a>' +
      '<a href="' + b + 'about.html"' + navActive("about", a) + ' data-i18n="nav.about">关于</a>' +
      '<a href="' + b + 'contact.html"' + navActive("contact", a) + ' data-i18n="nav.contact">联系我们</a>' +
      '<button class="lang-btn" onclick="__toggleLang(this, event)">EN</button>' +
      "</nav></div></header>"
    );
  }

  function renderFooter(opts) {
    var b = opts.base;
    var pHref = privacyHref(b, opts.privacy);
    var privacyLink = pHref
      ? '<a href="' + pHref + '" data-i18n="pp.link">隐私政策</a>'
      : "";
    return (
      '<footer class="footer">' +
      '<div class="container">' +
      '<div class="footer-inner">' +
      '<div class="footer-brand">' +
      '<a href="' + b + 'index.html" class="brand">' +
      '<span class="brand-logo">' + logoSvg(opts.brand === "home" ? "default" : opts.brand) + "</span>" +
      '<span data-i18n="brand.name">龙球工作室</span>' +
      "</a>" +
      '<p data-i18n="footer.desc">一个专注打造小而美应用的工作室。用心做产品，用爱做设计。</p>' +
      "</div>" +
      '<div class="footer-links">' +
      '<a href="' + b + 'index.html" data-i18n="nav.works">作品</a>' +
      '<a href="' + b + 'about.html" data-i18n="nav.about">关于</a>' +
      '<a href="' + b + 'contact.html" data-i18n="nav.contact">联系我们</a>' +
      privacyLink +
      "</div></div>" +
      '<div class="footer-bottom">' +
      '<span data-i18n="footer.copy">© 2026 Dragon Ball Studio 龙球工作室</span>' +
      '<span data-i18n="footer.rights">保留所有权利。</span>' +
      "</div></div></footer>"
    );
  }

  var base = basePath();
  var $body = $("body");
  var privacy = $body.attr("data-privacy");
  if (privacy == null || privacy === "") privacy = inferPrivacy();

  var opts = {
    base: base,
    active: $body.attr("data-nav") || "",
    privacy: privacy,
    brand: $body.attr("data-brand") || "default"
  };

  $('[data-layout="nav"]').replaceWith(renderNav(opts));
  $('[data-layout="footer"]').replaceWith(renderFooter(opts));
})(jQuery);
