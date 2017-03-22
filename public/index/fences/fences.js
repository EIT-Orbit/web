var fences = {
  onFencesClicked: function(){
    if(login.isLoggedIn()){
      fenceModal.show();
    }else{
      showLoginModal(fenceModal.show());
    }
  },
  getFences: function(){
    $.ajax({
      type: "GET",
      //url: "https://nameless-brushlands-18983.herokuapp.com/api/map",
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
  console.log(fences);
  var container = document.getElementById("container-fences")
  container.innerHTML = "";
  fences.forEach(function(fence){
    var button = document.createElement("button");
    button.className = "fence-button";
    button.innerHTML = fence.name;
    container.appendChild(button);
  });
}
