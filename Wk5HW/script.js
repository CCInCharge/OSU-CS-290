document.addEventListener("DOMContentLoaded", function() {
  createTable();
});

function clickLeft() {
  selectCell("left");
}

function clickRight() {
  selectCell("right");
}

function clickDown() {
  selectCell("down");
}

function clickUp() {
  selectCell("up");
}

function selectCell(direction) {
  /*
  Get the location of the cell which has the selected id
  Clear this id
  Set the id to selected of the given direction
  */
  var curSelected = document.getElementById("selected");

  if (direction === "right" && curSelected.nextElementSibling) {
    curSelected.nextElementSibling.id = "selected";
    curSelected.nextElementSibling.style.border = "thick solid black";
    curSelected.style.border = "solid black";
    curSelected.removeAttribute("id");
  } else if (direction === "left" && curSelected.previousElementSibling) {
    curSelected.previousElementSibling.id = "selected";
    curSelected.previousElementSibling.style.border = "thick solid black";
    curSelected.style.border = "solid black";
    curSelected.removeAttribute("id");
  } else if (direction === "down" && curSelected.parentNode.nextSibling) {
    var i = Array.prototype.indexOf.call(curSelected.parentNode.children, curSelected);
    curSelected.parentNode.nextSibling.children[i].id = "selected";
    curSelected.parentNode.nextSibling.children[i].style.border = "thick solid black";
    curSelected.style.border = "solid black";
    curSelected.removeAttribute("id");
  } else if (direction === "up" && curSelected.parentNode.previousSibling) {
    var i = Array.prototype.indexOf.call(curSelected.parentNode.children, curSelected);
    curSelected.parentNode.previousSibling.children[i].id = "selected";
    curSelected.parentNode.previousSibling.children[i].style.border = "thick solid black";
    curSelected.style.border = "solid black";
    curSelected.removeAttribute("id");
  }

}

function createTable() {
  var bodyElement = document.getElementsByTagName("body")[0];
  var newTable = document.createElement("table");
  var THead = newTable.createTHead();
  var row0 = THead.insertRow(0);
  var cellHead1 = row0.insertCell(0);
  var cellHead2 = row0.insertCell(1);
  var cellHead3 = row0.insertCell(2);
  var cellHead4 = row0.insertCell(3);
  cellHead1.textContent = "Header 1";
  cellHead2.textContent = "Header 2";
  cellHead3.textContent = "Header 3";
  cellHead4.textContent = "Header 4";

  cellHead1.style.border = "solid black";
  cellHead2.style.border = "solid black";
  cellHead3.style.border = "solid black";
  cellHead4.style.border = "solid black";

  var TBody = newTable.createTBody();
  var row1 = TBody.insertRow(0);
  var r1c1 = row1.insertCell(0);
  var r1c2 = row1.insertCell(1);
  var r1c3 = row1.insertCell(2);
  var r1c4 = row1.insertCell(3);
  r1c1.textContent = "1,1"
  r1c2.textContent = "2,1"
  r1c3.textContent = "3,1"
  r1c4.textContent = "4,1"

  r1c1.id = "selected";
  r1c1.style.border = "thick solid black";
  r1c2.style.border = "solid black";
  r1c3.style.border = "solid black";
  r1c4.style.border = "solid black";

  var row2 = TBody.insertRow(1);
  var r2c1 = row2.insertCell(0);
  var r2c2 = row2.insertCell(1);
  var r2c3 = row2.insertCell(2);
  var r2c4 = row2.insertCell(3);
  r2c1.textContent = "1,2"
  r2c2.textContent = "2,2"
  r2c3.textContent = "3,2"
  r2c4.textContent = "4,2"

  r2c1.style.border = "solid black";
  r2c2.style.border = "solid black";
  r2c3.style.border = "solid black";
  r2c4.style.border = "solid black";

  var row3 = TBody.insertRow(2);
  var r3c1 = row3.insertCell(0);
  var r3c2 = row3.insertCell(1);
  var r3c3 = row3.insertCell(2);
  var r3c4 = row3.insertCell(3);
  r3c1.textContent = "1,3"
  r3c2.textContent = "2,3"
  r3c3.textContent = "3,3"
  r3c4.textContent = "4,3"

  r3c1.style.border = "solid black";
  r3c2.style.border = "solid black";
  r3c3.style.border = "solid black";
  r3c4.style.border = "solid black";

  bodyElement.appendChild(newTable);
}
