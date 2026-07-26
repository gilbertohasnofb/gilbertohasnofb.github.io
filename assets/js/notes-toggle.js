document.querySelectorAll("[data-toggle-notes]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var target = document.getElementById(btn.getAttribute("aria-controls"));
    if (!target) return;

    var isHidden = target.hasAttribute("hidden");
    if (isHidden) {
      target.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
    } else {
      target.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});
