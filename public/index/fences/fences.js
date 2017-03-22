var fences = {
  onFencesClicked: function(){
    if(login.isLoggedIn()){
      fenceModal.show();
    }else{
      loginModal.show();
    }
  },
  getFences: function(){
    $.ajax({
      type: "GET",
      headers: {
  				'Authorization': getAccessToken()
  		},
      url: apiUrl + "users/me/fences",
      success: function(data){
        showFences(data);
        fences.hideLoading();
      },
      error: function(error){
        console.log(error)
      }
    });
  },
  showLoading: function(){
    document.getElementById("fence-loader").style.visibility = "visible";
  },
  hideLoading: function(){
    document.getElementById("fence-loader").style.visibility = "hidden";
  }
}

function showFences(fences){
  var container = document.getElementById("container-fences")
  container.innerHTML = "";
  var header = document.getElementById("fence-title");

  if(fences.length === 0){
    header.innerHTML = "You have no fences";
  }else{
      header.innerHTML = "Click a fence to load it";
    fences.forEach(function(fence){
      var button = document.createElement("button");
      button.onclick = function(){
        console.log(fence);
        loadFence(fence);
      }
      button.className = "fence-button";
      button.innerHTML = fence.name;
      container.appendChild(button);
    });
  }

}
