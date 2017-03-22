var drawnItems;
var apiUrl = "http://localhost:8080/api/";
//var apiUrl = "https://nameless-brushlands-18983.herokuapp.com/api/"

$(document).ready(function (){
  if(!login.isLoggedIn()){
    loginModal.show();
  }
  updateSignInButton();
  initMap();
});

function onDeleteClicked(){
  clearLayers();
}

function onDownloadClicked(){
  var fence = drawnItems.toGeoJSON();
  if(!currentLayer) {
    alert('Draw a fence before you can download');
    return;
  }
  $.ajax({
    type: "POST",
    url: apiUrl + "map",
    data: fence,
    success: function(data){
      removeIframeIfExists();
      addIframeWithDownloadLink(data.url);
    },
    error: function(){
    }
  });
}

function removeIframeIfExists(){
  var urlIframe = $("#urlIframe");
  if (urlIframe) urlIframe.remove();
}

//Prompts a file download
function addIframeWithDownloadLink(url){
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "urlIframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("style", "display: none");
  document.body.appendChild(iframe);
}
function onDoNothing(e){
  e.stopPropagation();
}
