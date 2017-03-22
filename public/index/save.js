function onSaveClicked(){
  if(!login.isLoggedIn()){
    showLoginModal();
    return;
  }
  console.log(currentLayer);
  if(!currentLayer){
    alert('Draw a fence before you can save it');
  }else{
    var fenceName = prompt("Enter a name for your fence", "");
    if(fenceName != null){
      var data = {
        fenceName: fenceName,
        geoJSON: currentLayer.toGeoJSON()
      }
      saveFence(data);
    }
  }
}

function saveFence(fence){
  console.log(fence);
  $.ajax({
    type: "POST",
    url: apiUrl + "fences",
    data: fence,
    headers: {
				'Authorization': getAccessToken()
		},
    success: function(data){
      alert('fence saved');
    },
    error: function(){
    }
  });
}
