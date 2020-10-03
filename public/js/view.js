//youtube api key
//AIzaSyAQmv6tfX2O--XdCmHzgIP-RJ_KcoMUjxA

//Check if DOM is ready
$(document).ready(function(){

    //event listener for search button click
    $("#searchBtn").on("click",function(event){
        event.preventDefault();
        window.localStorage.setItem("movieSearch",JSON.stringify($("#srcInput").val()));
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
  $(document).on("click", "button.add", insertVideo);

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
        "<button class='delete btn btn-danger'> Delete </button>",
        "<button class='complete btn btn-primary'> Watched </button>",
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

////////////////////////////////////////////////////////////////////////////////
//////////////////add twitch////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var embed = new Twitch.Embed("twitch-embed", {
  width: 854,
  height: 480,
  channel: "TheGrefg",
  layout: "video",
  autoplay: false,
  // only needed if your site is also embedded on embed.example.com and othersite.example.com 
  parent: ["oku-no-stream.herokuapp.com"]
});

embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  var player = embed.getPlayer();
  player.play();
});

