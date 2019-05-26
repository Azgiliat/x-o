var field = document.querySelector(".field");
var cells = document.querySelectorAll(".cell");

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    if (cells[i].classList.contains("empty")) {
      if (field.classList.contains("x-turn")) {
        cells[i].classList.add("x");
      }
      else {
        cells[i].classList.add("o");
      }
      field.classList.toggle("x-turn");
      field.classList.toggle("o-turn");
    }
  });
}
