(function () {
  var buttons = document.querySelectorAll(".tag-filter");
  var items = document.querySelectorAll(".composition");
  if (!buttons.length || !items.length) return;

  function activeTag() {
    var active = document.querySelector(".tag-filter.active");
    return active ? active.getAttribute("data-tag") : "all";
  }

  function setOnlyActive(tag) {
    buttons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tag") === tag);
    });
  }

  function applyFilter() {
    var active = activeTag();

    items.forEach(function (item) {
      var tagsAttr = item.getAttribute("data-tags");
      var tags = tagsAttr ? tagsAttr.split(",").filter(Boolean) : [];

      var show;
      if (active === "all" || tags.length === 0) {
        // all filter, or pieces with no tags: always show
        show = true;
      } else {
        show = tags.indexOf(active) !== -1;
      }

      item.hidden = !show;
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setOnlyActive(btn.getAttribute("data-tag"));
      applyFilter();
    });
  });

  applyFilter();
})();