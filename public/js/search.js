$(document).ready(function(){
  var API_KEY = "AIzaSyAQmv6tfX2O--XdCmHzgIP-RJ_KcoMUjxA";

  $("#addVideo").on("click", function(){
    runSearch(API_KEY)
  });

  function runSearch(key){
    var searchInput = $("#srcInput").val();
    console.log(searchInput);
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxresults=10&q=halo&eventType=live",
    function(data){
      console.log(data.items[0]);
    }
    )
  }
  

})


