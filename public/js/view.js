//youtube api key
//AIzaSyAQmv6tfX2O--XdCmHzgIP-RJ_KcoMUjxA

//Check if DOM is ready
$(document).ready(function(){

    //event listener for search button click
    $("#searchBtn").on("click",function(event){
        event.preventDefault();
        window.localStorage.setItem("movieSearch",JSON.stringify($("#searchInput").val()));
        console.log(localStorage.getItem("movieSearch"))
    })

  //////////////////////////////////////////////////////////////////////////////////////////
  ////////////video list JS//////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Getting a reference to the input field where user adds a new video
  var $newItemInput = $("input.new-item");
  // Our new videos will go inside the videoContainer
  var $videoContainer = $(".video-container");
  // Adding event listeners for deleting, editing, and adding videos
  $(document).on("click", "button.delete", deleteVideo);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".video-item", editVideo);
  $(document).on("keyup", ".video-item", finishEdit);
  $(document).on("blur", ".video-item", cancelEdit);
  $(document).on("submit", "#video-form", insertVideo);

  // Our initial videos array
  var videos = [];

  // Getting videos from database when page loads
  getVideos();

  // This function resets the videos displayed with new videos from the database
  function initializeRows() {
    $videoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < videos.length; i++) {
      rowsToAdd.push(createNewRow(videos[i]));
    }
    $videoContainer.prepend(rowsToAdd);
  }

  // This function grabs videos from the database and updates the view
  function getVideos() {
    $.get("/api/videos", function(data) {
      videos = data;
      initializeRows();
    });
  }

  // This function deletes a video when the user clicks the delete button
  function deleteVideo(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/videos/" + id
    }).then(getVideos);
  }

  // This function handles showing the input box for a user to edit a video
  function editVideo() {
    var currentVideo = $(this).data("video");
    $(this).children().hide();
    $(this).children("input.edit").val(currentVideo.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var video = $(this).parent().data("video");
    video.complete = !video.complete;
    updateVideo(video);
  }

  // This function starts updating a video in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedVideo = $(this).data("video");
    if (event.which === 13) {
      updatedVideo.text = $(this).children("input").val().trim();
      $(this).blur();
      updateVideo(updatedVideo);
    }
  }

  // This function updates a video in our database
  function updateVideo(video) {
    $.ajax({
      method: "PUT",
      url: "/api/videos",
      data: video
    }).then(getVideos);
  }

  // This function is called whenever a video item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentVideo = $(this).data("video");
    if (currentVideo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentVideo.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a video-item row
  function createNewRow(video) {
    var $newInputRow = $(
      [
        "<li class='list-group-item video-item'>",
        "<span>",
        video.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", video.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("video", video);
    if (video.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new video into our database and then updates the view
  function insertVideo(event) {
    event.preventDefault();
    var video = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/videos", video, getVideos);
    $newItemInput.val("");
  }
    
})

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
console.log(tag)
tag.src = "https://www.youtube.com/iframe_api";
console.log(tag.src)
//Pull videos from youtube api
var firstScriptTag = document.getElementsByTagName('script')[0];
console.log(firstScriptTag)
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
onYouTubeIframeAPIReady();

function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '290',
    width: '440',
    videoId: '4q3mF9ZLGNM',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
player = new YT.Player('player2', {
    height: '290',
    width: '440',
    videoId: '9r-pPADtXuc',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
player = new YT.Player('player3', {
    height: '290',
    width: '440',
    videoId: 'hLMjnm1Bm_Y',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
}
}

function stopVideo() {
player.stopVideo();
}

