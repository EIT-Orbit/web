function onSaveClicked(){
  if(!login.isLoggedIn()){
    showLoginModal();
    return;
  }
  var fence = drawnItems.toGeoJSON();
  if(!validateFence(fence)){
    alert('Draw a fence before you can save it');
  }else{
    var fenceName = prompt("Enter a name for your fence", "");
    if(fenceName != null){
      var data = {
        fenceName: fenceName,
        features: fence.features
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
