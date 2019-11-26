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

    CurrectSelecteditem('#li_rol');

    Load_Roles();

    $(".agregarCiudadano").on("click", function () {
        ID = 0;
        $("#txt_nombre").val("");
        $("#txt_desc").val("");
    });

    $("#btn_guardar").on("click", function () {
        if ($("#txt_nombre").val() != "" && $("#txt_desc").val() != "") {
            if (ID == 0) {
                Managment_Rol({
                    rol_RolId: 0,
                    rol_Nombre: $("#txt_nombre").val(),
                    rol_Descripcion: $("#txt_desc").val(),
                    rol_Estado: 1,
                    Action: 1
                });
            } else {
                Managment_Rol({
                    rol_RolId: ID,
                    rol_Nombre: $("#txt_nombre").val(),
                    rol_Descripcion: $("#txt_desc").val(),
                    rol_Estado: 1,
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

    $(document).on("click", ".btn_edit", function () {
        ID = $(this).attr("data-id");
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#txt_desc").val($(this).attr("data-desc"));
        $("#agregarrol").modal("show");
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este rol?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            Managment_Rol({
                rol_RolId: btn.attr("data-id"),
                rol_Nombre: "e",
                rol_Descripcion: "e",
                rol_Estado: 1,
                Action: 3
            });
        }).catch(swal.noop);

    });


});

function Load_Roles() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "AsignacionRol/list_rol",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.rol_Nombre + "</td>";
                resultTable += "<td>" + item.rol_Descripcion + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.rol_RolId + "' data-name='" + item.rol_Nombre + "' data-desc='" + item.rol_Descripcion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.rol_RolId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-rol').find('tbody').html(resultTable);
            $('#datatable-rol').DataTable();
        }


    });
}

function Managment_Rol(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "AsignacionRol/Managment_Rol",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregarrol").modal("hide");
                if (data.Action == 1) {
                    Load_Roles();
                    Toast({
                        action: "success",
                        message: "EL rol se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Roles();
                    Toast({
                        action: "success",
                        message: "EL rol se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Roles();
                    Toast({
                        action: "success",
                        message: "EL rol se ha eliminado correctamente",
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