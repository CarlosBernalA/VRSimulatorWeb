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

$(document).ready(function () {

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
    });

    $("#btn_guardar").on("click", function () {
        var sexo_val=$('input:radio[name=txt_sexo]:checked').val();
        var sexo = (sexo_val == null) ? "" : sexo_val;
        
        if ($("#txt_dni").val() != "" && $("#txt_user").val() != "" && $("assword-showhide2").val() != "" && $("#txt_dir").val() != "" && $("#txt_itra").val() != "" && $("#txt_nombre").val() != "" && $("#txt_nac").val() != "" && $("#txt_ape").val() != "" && sexo != "") {
            if (ID == 0) {
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
        $("#txt_dni").val($(this).attr("data-dni"));
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#txt_ape").val($(this).attr("data-ape"));
        $("#txt_nac").val($(this).attr("data-naci"));
        $("#txt_dir").val($(this).attr("data-dire"));
        sexoTrabajador($(this).attr("data-sexo"));
        $("#txt_itra").val($(this).attr("data-itra"));
        $("#txt_user").val($(this).attr("data-user"));
        $("#password-showhide2").val($(this).attr("data-pass"));

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