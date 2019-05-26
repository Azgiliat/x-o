var field = document.querySelector(".field");
var cells = document.querySelectorAll(".cell");
var clickNumber = 0;
var winCombinations = [
    [ 1, 0, 0,
      0, 1, 0,
      0, 0, 1 ],
    [ 0, 0, 1,
      0, 1, 0,
      1, 0, 0 ],
    [ 1, 1, 1,
      0, 0, 0,
      0, 0, 0 ],
    [ 0, 0, 0,
      1, 1, 1,
      0, 0, 0 ],
    [ 0, 0, 0,
      0, 0, 0,
      1, 1, 1 ],
    [ 1, 0, 0,
      1, 0, 0,
      1, 0, 0 ],
    [ 0, 1, 0,
      0, 1, 0,
      0, 1, 0 ],
    [ 0, 0, 1,
      0, 0, 1,
      0, 0, 1 ]
];

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
    if (field.classList.contains("o-turn")) {
      field.classList.remove("o-turn");
      field.classList.add("x-turn");
    }
  }
}

function finishGame(winner) {
  alert(winner + " победили!");
}

function checkForWinner() {
    var xArray = new Array();
    var oArray = new Array();

    for (var cellNumber = 0; cellNumber < cells.length; cellNumber++) {
      xArray[cellNumber] = cells[cellNumber].classList.contains("x"); //составляем карту крестиков
      oArray[cellNumber] = cells[cellNumber].classList.contains("o"); //слсьавляем карту ноликов
    }

    for (var combinationNumber = 0; combinationNumber < winCombinations.length; combinationNumber++) {
      //начинаем перебирать выигрышные комбинации
        var xWin = true;
        var oWin = true;
        for (var cellNumber = 0; cellNumber < 9; cellNumber++) {
          //сравнение комбинации и карты крестиков/ноликов
            if (winCombinations[combinationNumber][cellNumber] == 1) {
                if (!xArray[cellNumber]) {
                    xWin = false;
                }
                if (!oArray[cellNumber]) {
                    oWin = false;
                }
                if (!xWin && !oWin) {
                    break; //если комбинация не подошла ни крестикам, ни ноликам
                           //с первых жлементов, не будем проверять её до конца
                }
            }
        }
        if (xWin) {
            finishGame("X");
            clickNumber = 0;
            setTimeout(clearField, 3000);
            return 1;
        } else
        if (oWin) {
            finishGame("O");
            clickNumber = 0;
            setTimeout(clearField, 3000);
            return 1;
        }
    }
    return 0;
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
    if(clickNumber >= 5) {
      checkForWinner();
      //Минимальное количество ходов чтобы кто-то победил = 5
    }
    if (clickNumber == 9) {
      if(!checkForWinner()) {
        alert("Ничья!");
      setTimeout(clearField, 3000);
      clickNumber = 0;
    }
    }
  });
}
