
$(document).ready(function () {

   
  //  $("#frm-login").submit(function (event) {
     //   Loginin();
   // });
    $('#btn_login').on('click', function (s, e) {
        var username = $('#username').val();
        var pass = $('#password').val();
        if (username != "" && pass != "") {
            Loginin({
                UserName: username,
                Password: pass
            });
            /*
            if (ID == 0) {
                Managment_Area({
                    AreaId: 0,
                    are_Nombre: $("#txt_nombre").val(),
                    are_Descripcion: $("#txt_desc").val(),
                    are_Estado: 1,
                    Action: 1
                });
            } else {
                Managment_Area({
                    AreaId: ID,
                    are_Nombre: $("#txt_nombre").val(),
                    are_Descripcion: $("#txt_desc").val(),
                    are_Estado: 1,
                    Action: 2
                });
                ID = 0;
            }*/
        } else {
            console.log("vacio");
            /*Toast({
                action: "error",
                message: "Rellene los campos correctamente",
                position: "top-right",
            });*/
        }
    });
});

function Loginin(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/Login",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Message != "") {
                principal()
            } else {
                console.log("no");
            }
			
        }
    });
}
   
function principal() {
   window.location = "principal";
}
    
