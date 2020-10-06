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
    height: '390',
    width: '640',
    videoId: '4q3mF9ZLGNM',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
player = new YT.Player('player2', {
    height: '390',
    width: '640',
    videoId: '9r-pPADtXuc',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
player = new YT.Player('player3', {
    height: '390',
    width: '640',
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