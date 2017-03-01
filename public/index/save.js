function onSaveClicked(){
  if(!isLoggedIn()){
    showLoginModal();
    return;
  }
  var fence = drawnItems.toGeoJSON();
  if(!validateFence(fence)){
    alert('Draw a fence before you can save it');
  }
}

function saveFence(){
  var data = drawnItems.toGeoJSON();
  $.ajax({
    type: "POST",
    url: apiUrl + "fences",
    data: data,
    headers: {
				'Authorization': document.cookie.access_token
		},
    success: function(data){
      removeIframeIfExists();
      addIframeWithDownloadLink(data.url);
    },
    error: function(){
    }
  });
}
