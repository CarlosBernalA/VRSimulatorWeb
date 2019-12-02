var exportTable = $('#datatable-data-export').DataTable(
	{
	    sDom: "T<'clearfix'>" +
			"<'row'<'col-sm-6'l><'col-sm-6'f>r>" +
			"t" +
			"<'row'<'col-sm-6'i><'col-sm-6'p>>",
	    "tableTools":
		{
		    "sSwfPath": "assets/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
		}
	});

var ID = 0;
var dni_existe = false;
var dni_trabajador = "";
var user_existe = false;
var user_trabajador = "";

$(document).ready(function () {

    $('#txt_dni').mask('99999999');

    $('#password-showhide2').hideShowPassword({
        innerToggle: true,
        toggle: {
            className: 'hideShowPassword-toggle toggle-eye'
        },
        states: {
            shown: {
                toggle: {
                    content: '<i class="fa fa-eye-slash" style="top: -8px">'
                }
            },
            hidden: {
                toggle: {
                    content: '<i class="fa fa-eye" style="top: -8px">'
                }
            }
        }
    });

    CurrectSelecteditem('#li_trabajador');
    Load_Trabajador();

    $(".agregarCiudadano").on("click", function () {
        
        Load_Area();
        $("#txt_itra").val("");
        $("#txt_dni").val("");
        $("#txt_nombre").val("");
        $("#txt_ape").val("");
        $('input:radio[name=txt_sexo]').attr('checked', false);
        $("#txt_nac").val("");
        $("#txt_dir").val("");
        $("#txt_user").val("");
        $("#password-showhide2").val("");
        $('#txt_dni').parent().removeClass('has-error');
        $('#txt_user').parent().removeClass('has-error');
    });
    $("#txt_nombre").on("keyup", function () {
        var string = $("#txt_nombre").val();
        $("#txt_nombre").val($.trim(string));
        if ($('#txt_nombre').val().length > 200) {
            var cadena = $('#txt_nombre').val();
            inicio = 0;
            fin = 200;
            $('#txt_nombre').val(cadena.substring(inicio, fin))
            $('#txt_nombre').parent().addClass('has-error');
        } else {
            $('#txt_nombre').parent().removeClass('has-error');
        }
    });
    $("#txt_ape").on("keyup", function () {
        var string = $("#txt_ape").val();
        $("#txt_ape").val($.trim(string));
        if ($('#txt_ape').val().length > 200) {
            var cadena = $('#txt_ape').val();
            inicio = 0;
            fin = 200;
            $('#txt_ape').val(cadena.substring(inicio, fin))
            $('#txt_ape').parent().addClass('has-error');
        } else {
            $('#txt_ape').parent().removeClass('has-error');
        }
    });
    $("#txt_dir").on("keyup", function () {
        var string = $("#txt_dir").val();
        $("#txt_dir").val($.trim(string));
        if ($('#txt_dir').val().length > 200) {
            var cadena = $('#txt_dir').val();
            inicio = 0;
            fin = 200;
            $('#txt_dir').val(cadena.substring(inicio, fin))
            $('#txt_dir').parent().addClass('has-error');
        } else {
            $('#txt_dir').parent().removeClass('has-error');
        }
    });

    $("#txt_dni").on("keyup", function () {
        var string = $("#txt_dni").val();
        $("#txt_dni").val($.trim(string));

        if ($.trim($("#txt_dni").val()) != "") {
            BuscarTrabajador_For_DNI({
                UserName: $("#txt_dni").val(),
                Password: ""
            });
        }
        if (dni_existe) {
            if (dni_trabajador == $("#txt_dni").val()) {
                $('#txt_dni').parent().removeClass('has-error');
                dni_existe = false;
            } else {
                $('#txt_dni').parent().addClass('has-error');
            }
        } else {
            $('#txt_dni').parent().removeClass('has-error');

            if ($('#txt_dni').val().length > 12) {
                var cadena = $('#txt_dni').val();
                inicio = 0;
                fin = 12;
                $('#txt_dni').val(cadena.substring(inicio, fin))
            }
        }

    });
    $("#txt_user").on("keyup", function () {
       
        var string = $("#txt_user").val();
        $("#txt_user").val(string.trimLeft());

        if ($("#txt_user").val() != "") {
            BuscarTrabajador_For_Usuario({
                UserName: $("#txt_user").val(),
                Password: ""
            });
        }
        if (user_existe) {
            if (user_trabajador == $("#txt_user").val()) {
                $('#txt_user').parent().removeClass('has-error');
                user_existe = false;
            } else {
                $('#txt_user').parent().addClass('has-error');
            }
        } else {
            $('#txt_user').parent().removeClass('has-error');

            if ($('#txt_user').val().length > 50) {
                var cadena = $('#txt_user').val();
                inicio = 0;
                fin = 50;
                $('#txt_user').val(cadena.substring(inicio, fin))
            }
        }

    });

    $("#btn_guardar").on("click", function () {
        var sexo_val=$('input:radio[name=txt_sexo]:checked').val();
        var sexo = (sexo_val == null) ? "" : sexo_val;
        
        if ($("#txt_dni").val() != "" && $("#txt_user").val() != "" && $("assword-showhide2").val() != "" && $("#txt_dir").val() != "" && $("#txt_itra").val() != "" && $("#txt_nombre").val() != "" && $("#txt_nac").val() != "" && $("#txt_ape").val() != "" && sexo != "") {
            
            if (ID == 0) {
                if (dni_existe) {
                    Toast({
                        action: "error",
                        message: "El DNI ya esta registrado",
                        position: "top-right",
                    });
                } else {
                    if (user_existe) {
                        Toast({
                            action: "error",
                            message: "El usuario ya esta registrado",
                            position: "top-right",
                        });
                    } else {
                        Managment_Trabajador({
                            TrabajadorId: 0,
                            AreaId: $("#area").val(),
                            tr_DNI: $("#txt_dni").val(),
                            tr_Nombre: $("#txt_nombre").val(),
                            tr_Apellidos: $("#txt_ape").val(),
                            tr_FechaNacimiento: $("#txt_nac").val(),
                            tr_Direccion: $("#txt_dir").val(),
                            tr_sexo: sexo,
                            tr_InicioTrabajo: $("#txt_itra").val(),
                            tr_Estado: 1,
                            UserName: $("#txt_user").val(),
                            Password: $("#password-showhide2").val(),
                            Action: 1
                        });
                        dni_existe = false;
                        user_existe = false;
                    }
                    
                }
            } else {
                if (dni_existe) {
                    Toast({
                        action: "error",
                        message: "El DNI ya esta registrado",
                        position: "top-right",
                    });
                } else {
                    if (user_existe) {
                        Toast({
                            action: "error",
                            message: "El usuario ya esta registrado",
                            position: "top-right",
                        });
                    } else {
                        Managment_Trabajador({
                        TrabajadorId: ID,
                        AreaId: $("#area").val(),
                        tr_DNI: $("#txt_dni").val(),
                        tr_Nombre: $("#txt_nombre").val(),
                        tr_Apellidos: $("#txt_ape").val(),
                        tr_FechaNacimiento: $("#txt_nac").val(),
                        tr_Direccion: $("#txt_dir").val(),
                        tr_sexo: sexo,
                        tr_InicioTrabajo: $("#txt_itra").val(),
                        tr_Estado: 1,
                        UserName: $("#txt_user").val(),
                        Password: $("#password-showhide2").val(),
                        Action: 2
                        });
                        ID = 0;
                    }
                }
            }            
        } else {
            Toast({
                action: "error",
                message: "Rellene los campos correctamente",
                position: "top-right",
            });
        }
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este trabajador?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            var f = new Date();
            
            Managment_Trabajador({
                TrabajadorId: btn.attr("data-id"),
                AreaId: 1,
                tr_DNI: "e",
                tr_Nombre: "e",
                tr_Apellidos: "e",
                tr_FechaNacimiento: '2019-11-25',
                tr_Direccion: "e",
                tr_sexo: "e",
                tr_InicioTrabajo: '2019-11-25',
                tr_Estado: 1,
                UserName: "e",
                Password: "e",
                Action: 3
            });
        }).catch(swal.noop);

    });

    $(document).on("click", ".btn_edit", function () {
        Load_Area();
        ID = $(this).attr("data-id");
        $("#area").val($(this).attr("data-area"));
        $("#txt_dni").val($.trim($(this).attr("data-dni")));
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#txt_ape").val($(this).attr("data-ape"));
        $("#txt_nac").val($(this).attr("data-naci"));
        $("#txt_dir").val($(this).attr("data-dire"));
        sexoTrabajador($(this).attr("data-sexo"));
        $("#txt_itra").val($(this).attr("data-itra"));
        $("#txt_user").val($(this).attr("data-user"));
        $("#password-showhide2").val($(this).attr("data-pass"));
        $('#txt_dni').parent().removeClass('has-error');
        dni_trabajador = $.trim($(this).attr("data-dni"));
        $('#txt_user').parent().removeClass('has-error');
        user_trabajador = $.trim($(this).attr("data-user"));
        $("#agregartrabajador").modal("show");
    });
});

function Load_Trabajador() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Trabajador/list_trabajador",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.tr_DNI + "</td>";
                resultTable += "<td>" + item.tr_Apellidos + "</td>";
                resultTable += "<td>" + item.tr_Nombre + "</td>";
                resultTable += "<td>" + item.are_Nombre + "</td>";
                resultTable += "<td>" + item.tr_Direccion + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.TrabajadorId + "' data-pass='" + item.Password + "' data-user='" + item.UserName + "' data-itra='" + item.tr_InicioTrabajo + "' data-sexo='" + item.tr_Sexo + "' data-dire='" + item.tr_Direccion + "' data-naci='" + item.tr_FechaNacimiento + "' data-ape='" + item.tr_Apellidos + "' data-dni='" + item.tr_DNI + "' data-area='" + item.AreaId + "' data-name='" + item.tr_Nombre + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.TrabajadorId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-trabajador').find('tbody').html(resultTable);
            $('#datatable-trabajador').DataTable();
        }


    });
}
function Load_Area() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Area/list_area",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<option value='" + item.AreaId + "'>" + item.are_Nombre + "</option>";
            });
            $('#area').html(resultTable);
        }


    });
}

function Managment_Trabajador(data) {
    var _data;

    $.ajax({
        type: "POST",
        url: "Trabajador/Managment_Trabajador",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregartrabajador").modal("hide");
                if (data.Action == 1) {
                    Load_Trabajador();
                    Toast({
                        action: "success",
                        message: "El trabajador se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Trabajador();
                    Toast({
                        action: "success",
                        message: "El trabajador se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Trabajador();
                    Toast({
                        action: "success",
                        message: "El trabajador se ha eliminado correctamente",
                        position: "top-right",
                    });
                }
            } else {
                Toast({
                    action: "error",
                    message: _data.Message,
                    position: "top-right",
                });
            }

        }
    });
}
function sexoTrabajador(sexo) {
    if (sexo == "M") {
        $('input:radio[name=txt_sexo]')[0].checked = true;

    } else {
        $('input:radio[name=txt_sexo]')[1].checked = true;
    }

}
function BuscarTrabajador_For_DNI(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/BuscarTrabajador_For_DNI",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if ($.trim(_data.Message) == $("#txt_dni").val()) {
                dni_existe = true;
            } else {
                dni_existe = false;
            }

        }
    });
}
function BuscarTrabajador_For_Usuario(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/BuscarTrabajador_For_Usuario",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if ($.trim(_data.Message) == $("#txt_user").val()) {
                user_existe = true;
            } else {
                user_existe = false;
            }

        }
    });
}