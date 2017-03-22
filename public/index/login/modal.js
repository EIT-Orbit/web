var loginModal = {
  show: function(){
    fenceModal.hide();
    $("#loginModal").css("display", "flex");
  },
  hide: function(){
    $("#loginModal").css("display", "none");
  }
}
