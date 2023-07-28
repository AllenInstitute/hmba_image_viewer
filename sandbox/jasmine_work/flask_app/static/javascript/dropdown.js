var caretItems = document.getElementsByClassName("caret");
var clickableItems = document.getElementsByClassName("clickable");
var i;

for (i = 0; i < caretItems.length; i++) {
  caretItems[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

for (i = 0; i < clickableItems.length; i++) {
  clickableItems[i].addEventListener("click", function() {
    var route = this.textContent.trim();
    var url = "/specimen-info/" + route;
    window.location.href = url;
  });
}
