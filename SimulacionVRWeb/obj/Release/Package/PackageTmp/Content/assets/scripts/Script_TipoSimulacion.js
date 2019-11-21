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

    CurrectSelecteditem('#li_tiposimulacion');
    Load_TipoSimulacion();

    $(".agregarCiudadano").on("click", function () {
        ID = 0;
        $("#txt_nombre").val("");
        $("#txt_desc").val("");
    });

    $("#btn_guardar").on("click", function () {
        if ($("#txt_nombre").val() != "" && $("#txt_desc").val() != "") {
            if (ID == 0) {
                Managment_TipoSimulacion({
                    TipoSimulacionId: 0,
                    ts_Nombre: $("#txt_nombre").val(),
                    ts_Descripticion: $("#txt_desc").val(),
                    ts_Estado: 1,
                    Action: 1
                });
            } else {
                Managment_TipoSimulacion({
                    TipoSimulacionId: ID,
                    ts_Nombre: $("#txt_nombre").val(),
                    ts_Descripticion: $("#txt_desc").val(),
                    ts_Estado: 1,
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
        $("#agregartiposimulacion").modal("show");
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este tipo de simulacion?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            Managment_TipoSimulacion({
                TipoSimulacionId: btn.attr("data-id"),
                ts_Nombre: "e",
                ts_Descripticion: "e",
                ts_Estado: 1,
                Action: 3
            });
        }).catch(swal.noop);

    });
});

function Load_TipoSimulacion() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Simulacion/list_tiposimulacion",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.ts_Nombre + "</td>";
                resultTable += "<td>" + item.ts_Descripticion + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.TipoSimulacionId + "' data-name='" + item.ts_Nombre + "' data-desc='" + item.ts_Descripticion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.TipoSimulacionId + "' type='button' class='btn_remove btn btn-danger btn-sm'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-tiposimulacion').find('tbody').html(resultTable);
            $('#datatable-tiposimulacion').DataTable();
        }


    });
}

function Managment_TipoSimulacion(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Simulacion/Managment_TipoSimulacion",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregartiposimulacion").modal("hide");
                if (data.Action == 1) {
                    Load_TipoSimulacion();
                    Toast({
                        action: "success",
                        message: "EL tipo de simulacion se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_TipoSimulacion();
                    Toast({
                        action: "success",
                        message: "EL tipo de simulacion se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_TipoSimulacion();
                    Toast({
                        action: "success",
                        message: "EL tipo de simulacion se ha eliminado correctamente",
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