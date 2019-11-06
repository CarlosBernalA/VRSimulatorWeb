
$(document).ready(function () {

   
  //  $("#frm-login").submit(function (event) {
     //   Loginin();
   // });
    $('#btn_login').on('click', function (s, e) {
        Loginin();
    });
});

function Loginin() {
    // var username = $('#username').val();
    // var pass = $('#password').val();
    
    // var data = {}
    // data.username = username;
    // data.password = pass;
    // $.ajax({
    //     url: "Login/LoginUser",
    //     type: 'POST',
    //     data: data,
    //     async: false,
    //     success: function (response) {
    //         var rsp = response;
           
    //         if (rsp == 'ok') {
                
    //             principal();
    //         } else {
    //             alert("Datos incorrectos");
    //         }
    //     }
    // });
    principal();
}
function principal() {
   window.location = "principal";
}
    
