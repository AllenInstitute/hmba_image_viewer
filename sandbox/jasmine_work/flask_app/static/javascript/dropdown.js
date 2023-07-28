var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    var nestedElem = this.parentElement.querySelector(".nested");
    if (!nestedElem.classList.contains("active")) {
      nestedElem.classList.add("active");
    }
    this.classList.add("caret-down"); // always rotate caret on click
  });
}