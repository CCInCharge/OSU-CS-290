document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("add-button").addEventListener("click", addWorkout);
});

function addWorkout() {
  var name = document.getElementsByName('name')[0].value;
  var reps = document.getElementsByName('reps')[0].value;
  var weight = document.getElementsByName('weight')[0].value;
  var date = document.getElementsByName('date')[0].value;
  var lbs = document.getElementsByName('lbs')[0].value;

  // Execute AJAX request
  var req = new XMLHttpRequest();
  var payload = {"name": name, "reps": reps, "weight": weight, "date": date, "lbs": lbs};
  req.open("POST", "/insert", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onreadystatechange = function () {
    if (this.readyState == 4) {
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        response = response[0];
        console.log(response);
        console.log(typeof(response));

        let table = document.getElementById("workout-table").getElementsByTagName('tbody')[0];
        let newRow = table.insertRow(table.rows.length);
        let idCell = newRow.insertCell(0);
        idCell.innerHTML = '<input type="hidden" id="' + response.id + '">';
        idCell.innerHTML += '<button type="button" value="edit-button">edit</button>';
        idCell.innerHTML += '<button type="button" onclick="deleteRow(' + response.id + ')">delete</button>';

        let nameCell = newRow.insertCell(1);
        nameCell.innerHTML = response.name;

        let repsCell = newRow.insertCell(2);
        repsCell.innerHTML = response.reps;

        let weightCell = newRow.insertCell(3);
        weightCell.innerHTML = response.weight;

        let dateCell = newRow.insertCell(4);
        dateCell.innerHTML = response.date;

        let lbsCell = newRow.insertCell(5);
        lbsCell.innerHTML = response.lbs;
      } else {
        console.log(req.status);
        console.log("Error in network request: " + req.statusText);
      }
    }
  }
  req.send(JSON.stringify(payload));
}

function deleteRow(rowID) {
  var req = new XMLHttpRequest();
  var payload = {"id": rowID};
  req.open("POST", "/delete", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onreadystatechange = function () {
    if (this.readyState == 4) {
      if(req.status >= 200 && req.status < 400){
        console.log("Successfully deleted");
        var rowToDelete = document.getElementById(rowID).parentNode.parentNode;
        rowToDelete.parentNode.removeChild(rowToDelete);

      } else {
        console.log(this.readyState);
        console.log(req.status);
        console.log("Error in network request: " + req.statusText);
      }
    }
  }
  req.send(JSON.stringify(payload));
}
