function searchAuthor() {
  var api_key = "ae353dbedd394dbda571ffda02387b07";
  var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?";
	var author = $("#author").val();
  url += $.param({
      'api-key': api_key,
      'author': author
    });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    console.log(result);
  }).fail(function(err) {
    throw err;
  });
}

$(document).ready(function() {
  $("#search").click(searchAuthor);
});
