function initFenceList(){
  function saveFence(fence){
    $.ajax({
      type: "GET",
      url: apiUrl + "users/me/fences",
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
}
