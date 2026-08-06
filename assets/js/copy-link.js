(function () {
  var buttons = document.querySelectorAll(".copy-link-btn");
  if (!buttons.length) return;

  function showCopiedFeedback(btn) {
    btn.classList.add("copied");
    setTimeout(function () {
      btn.classList.remove("copied");
    }, 1500);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var target = btn.getAttribute("data-copy-target");
      var url = window.location.origin + window.location.pathname + target;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showCopiedFeedback(btn);
        });
      } else {
        // fallback for older browsers / non-HTTPS contexts
        var temp = document.createElement("textarea");
        temp.value = url;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        try {
          document.execCommand("copy");
          showCopiedFeedback(btn);
        } catch (err) {
          console.error("Copy failed:", err);
        }
        document.body.removeChild(temp);
      }
    });
  });
})();