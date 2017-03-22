var fenceModal = {
  show: function(){
    $("#fenceModal").css("display", "flex");
    fences.getFences();
  },
  hide: function(){
    $("#fenceModal").css("display", "none");
  }
}
