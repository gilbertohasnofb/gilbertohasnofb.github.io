(function () {
  var navRow = document.querySelector(".nav-row");
  var navLinks = document.querySelector(".nav-links");
  if (!navRow || !navLinks) return;

  function update() {
    var maxScroll = navLinks.scrollWidth - navLinks.clientWidth;
    navRow.classList.toggle("can-scroll-left", navLinks.scrollLeft > 4);
    navRow.classList.toggle("can-scroll-right", navLinks.scrollLeft < maxScroll - 4);
  }

  navLinks.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
