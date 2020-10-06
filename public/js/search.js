$(document).ready(function(){

  //we want to show results in the results container so we will make a variable to work with the results container
  var $resultsContainer = $(".results-container");
  //also make a variable to pull search input
  //API key for YouTube
  var API_KEY = "AIzaSyC5_QLjRvtoYgKF7ZMSFrs4MJgWf5Bo4qM";
  //anthonys key
  //AIzaSyAQmv6tfX2O--XdCmHzgIP-RJ_KcoMUjxA
  //korys first key
  //AIzaSyBkaklewYyhrjvu2qiNiDCyLNkBaiy_LV4

  $("#searchBtn").on("click", function(){
    var $searchInput = $("#searchInput").val();
    runSearch(API_KEY,$searchInput)
  });



  //define funtions below here

  //Thhis function runs the YouTube search
  function runSearch(key,search){
    console.log(search);
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=5&q=" + search + "&eventType=live",
      function(data){
        console.log(data.items);
        window.localStorage.setItem("apiJSON",JSON.stringify(data.items));
        console.log(JSON.parse(window.localStorage.getItem("apiJSON")));
        showResults(data.items);
      });
  }

  //This function just console logs the results from the YouTube search
  function showResults(data){
    console.log(data)
    data.forEach(element => {
      console.log(element.snippet.thumbnails.default.url)
      console.log(element.id.videoId)    
      
      $resultsContainer.prepend(createResult(element.snippet.thumbnails.default.url,element.id.videoId))
    });
    };

  // This function constructs a results-item row
  function createResult(videoIMG,videoID) {
    var $newInputRow = $(
      [
        "<li>",
        "<div class='card' style='width: 10rem; height:10rem'>",
        "<img class='card-img-top' src='"+ videoIMG +"'id='currentIcon'>",
        "<div class='card-body'>",
        "<button type='button' class='add btn btn-primary btn-sm' id='" + videoID +"'>Add Video</button>",
        "</div>",
        "</div>",
        "</li>"
      ].join("")
    );
    return $newInputRow;
  }
 
  

//end of document.ready()
})


