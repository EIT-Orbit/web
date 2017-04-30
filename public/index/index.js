var drawnItems;
//var apiUrl = "http://localhost:8080/api/";
var apiUrl = "http://ec2-52-34-38-79.us-west-2.compute.amazonaws.com:8080/api/"

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
  //somehow leaflet adds features recursively, remove recursively stored features
  while(fence.features && fence.features[0].features){
    fence = fence.features[0].features[0];
    console.log(fence);
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
