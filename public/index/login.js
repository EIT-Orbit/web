function isLoggedIn(){
  return localStorage.getItem("access_token");
}

function onLoginClicked(){
  var username = $("#input-username");
  if(!username.val()) {
    showModalError("Enter username");
  }

  var password = $("#input-password");
  if(!password.val()) {
    showModalError("Enter password");
  }
  var data = {
    username: username.val(),
    password: password.val()
  };
  $.ajax({
    type: "POST",
    //url: "https://nameless-brushlands-18983.herokuapp.com/api/map",
    url: apiUrl + "login",
    data: data,
    success: function(data){
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      hideModal();
    },
    error: function(){
      showModalError("Wrong username or password");
    }
  });
}

function showModalError(error){
  console.warn(error);
}
