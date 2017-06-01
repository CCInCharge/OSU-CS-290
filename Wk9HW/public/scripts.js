document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("add-button").addEventListener("click", addWorkout);
});

function addWorkout() {
  var name = document.getElementsByName('name')[0].value;
  var reps = document.getElementsByName('reps')[0].value;
  var weight = document.getElementsByName('weight')[0].value;
  var date = document.getElementsByName('date')[0].value;
  var lbs = document.getElementsByName('lbs')[0].value;

  var req = new XMLHttpRequest();
  var payload = {"name": name, "reps": reps, "weight": weight, "date": date, "lbs": lbs};
  req.open("POST", "/insert", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onreadystatechange = function () {
    if (this.readyState == 4) {
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(req.responseText);
      } else {
        console.log(req.status);
        console.log("Error in network request: " + req.statusText);
      }
    }
  }
  req.send(JSON.stringify(payload));
}
