$(document).ready(function(){

  //we want to show results in the results container so we will make a variable to work with the results container
  var $resultsContainer = $(".results-container");
  //also make a variable to pull search input
  //API key for YouTube
  var API_KEY = "AIzaSyAQmv6tfX2O--XdCmHzgIP-RJ_KcoMUjxA";

  $("#addVideo").on("click", function(){
    var $searchInput = $("input.new-item").val();
    runSearch(API_KEY,$searchInput)
  });



  //define funtions below here

  //Thhis function runs the YouTube search
  function runSearch(key,search){
    console.log(search);
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxresults=10&q=" + search + "&eventType=live",
      function(data){
        console.log(data.items);
        showResults(data.items);
      });
  }

  //This function just console logs the results from the YouTube search
  function showResults(data){
    console.log(data)
    data.forEach(element => {
      console.log(element.snippet.thumbnails.default.url)
      
      $resultsContainer.prepend(createResult(element.snippet.thumbnails.default.url))
    });
    };

  // This function constructs a results-item row
  function createResult(video) {
    var $newInputRow = $(
      [
        "<li>",

        "<div class='card' style='width: 10rem; height:10rem'>",
        "<img class='card-img-top' src='"+ video +"'id='currentIcon'>",
        "<div class='card-body'>",
        "<button type='button' class='btn btn-primary btn-sm'>Add Video</button>",
        "</div>",
        "</div>",

        "</li>"
      ].join("")
    );
    console.log($newInputRow)
    return $newInputRow;
  }
 
  

//end of document.ready()
})


