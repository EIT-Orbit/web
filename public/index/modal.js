function showLoginModal(){
  var modal = document.getElementById('myModal');
  $("#loginModal").css("display", "flex");
}

function onCloseLoginModalClicked(){
  hideModal();
}

function hideModal(){
  $("#loginModal").css("display", "none");
}

function onDoNothing(e){
  e.stopPropagation();
}
