
$(document).ready(function () {

   
  //  $("#frm-login").submit(function (event) {
     //   Loginin();
   // });
    $('#btn_login').on('click', function (s, e) {
        var username = $.trim($('#username').val());
        var pass = $('#password').val();
        if (username != "" && pass != "") {
            Loginin({
                UserName: username,
                Password: pass
            });
           
        } else {
            swal({
                title: 'ADVERTENCIA',
                text: "Complete los campos!",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#ff9800',
                cancelButtonColor: '#41B314',
                confirmButtonText: 'OK'
            }).then(function () {

            }).catch(swal.noop);
            
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
                sessionStorage.setItem("TrabajadorRolId", _data.Message);
                principal();
			} else {
				swal({
					title: 'ERROR',
					text: "Datos incorrectos!",
					type: 'error',
					showCancelButton: false,
					confirmButtonColor: '#F9354C',
					cancelButtonColor: '#41B314',
					confirmButtonText: 'OK'
				}).then(function () {
					
				}).catch(swal.noop);

            }
			
        }
    });
}
   
function principal() {
   window.location = "principal";
}
    
