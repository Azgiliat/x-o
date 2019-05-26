var field = document.querySelector(".field");
var cells = document.querySelectorAll(".cell");
var clickNumber = 0;

function clearField() {
  for (var k = 0; k < cells.length; k ++) {
    if (cells[k].classList.contains("x")) {
      cells[k].classList.remove("x");
      cells[k].classList.add("empty");
    }
    if (cells[k].classList.contains("o")) {
      cells[k].classList.remove("o");
      cells[k].classList.add("empty");
    }
  }
}

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
    clickNumber++;
    if (clickNumber == 9) {
      setTimeout(clearField, 3000);
      clickNumber = 0;
    }
  });
}
