var login = {
  isLoggedIn: function(){
    return localStorage.getItem("access_token") !== null;
  }
}

function onSubmitLogin(){
  var username = $("#input-username");
  if(!username.val()) {
    showModalError("Enter username");
    return;
  }

  var password = $("#input-password");
  if(!password.val()) {
    showModalError("Enter password");
    return;
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
      updateSignInButton();
      loginModal.hide();
    },
    error: function(){
      showModalError("Wrong username or password");
    }
  });
}

function showModalMessage(message){
  showModalError(message);
}

function showModalError(error){
  var errorDialog = document.getElementById("modal-signin-error");
  errorDialog.innerHTML = error;
  errorDialog.style.visibility = "visible";
}

function hideModalError(){
  var errorDialog = document.getElementById("modal-signin-error");
  errorDialog.style.visibility = "hidden";
}

function onSignInClicked(){
  if(login.isLoggedIn()){
    logout();
    updateSignInButton();
  }else{
    loginModal.show();
  }
}

function onSignUpClicked(){
  var username = $("#input-username");
  if(!username.val()) {
    showModalError("Enter username to register");
    return;
  }

  var password = $("#input-password");
  if(!password.val()) {
    showModalError("Enter password to register");
    return;
  }
  var data = {
    username: username.val(),
    password: password.val()
  };
  $.ajax({
    type: "POST",
    //url: "https://nameless-brushlands-18983.herokuapp.com/api/map",
    url: apiUrl + "users",
    data: data,
    success: function(data){
      showModalMessage("Registration successful, please sign in");
    },
    error: function(){
      showModalError("Username taken");
    }
  });
}

function logout(){
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function updateSignInButton(){
  var button = document.getElementById("logout");
  if(login.isLoggedIn()) button.innerHTML = "Sign out";
  else button.innerHTML = "Sign in";
}

function getAccessToken(){
  return localStorage.getItem("access_token");
}
