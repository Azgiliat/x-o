var field = document.querySelector(".field");
var cells = document.querySelectorAll(".cell");

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function(evt) {
    if (evt.target.classList.contains("empty")) {
      if (field.classList.contains("x-turn")) {
        evt.target.classList.add("x");
      }
      else {
        evt.target.classList.add("o");
      }
      evt.target.classList.remove("empty");
      field.classList.toggle("x-turn");
      field.classList.toggle("o-turn");
    }
  });
}
