var loginModal = {
  show: function(){
    fenceModal.hide();
    $("#loginModalContent").attr("class", "modal-content");
    $("#loginModal").css("display", "flex");
  },
    hide: function(){
        $("#loginModal").css("display", "none");
    }
}
