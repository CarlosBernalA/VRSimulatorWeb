﻿
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
var arrayTipoSimulacion;
var cambiado = false;
var txt_nombre = "";

$(document).ready(function () {


    CurrectSelecteditem('#li_tiposimulacion');
    Load_TipoSimulacion();

    $(".agregarCiudadano").on("click", function () {
        ID = 0;
        $("#txt_nombre").val("");
        $("#txt_desc").val("");
        $(".modal-title").text("Agregar Tipo de Simulación");
    });

    $("#btn_guardar").on("click", function () {

        if ($("#txt_nombre").val() != "" && $("#txt_desc").val() != "") {
            cambiado = false;
            if (ID == 0) {
                if (arrayTipoSimulacion == null) {
                    Managment_TipoSimulacion({
                        TipoSimulacionId: 0,
                        ts_Nombre: $("#txt_nombre").val(),
                        ts_Descripticion: $("#txt_desc").val(),
                        ts_Estado: 1,
                        Action: 1
                    });
                } else {
                    $.each(arrayTipoSimulacion, function (i, item) {
                        if (item.ts_Nombre == $("#txt_nombre").val()) {
                            if (item.ts_Estado == 0) {
                                cambiado = true;
                                Managment_TipoSimulacion({
                                    TipoSimulacionId: item.TipoSimulacionId,
                                    ts_Nombre: item.ts_Nombre,
                                    ts_Descripticion: $("#txt_desc").val(),
                                    ts_Estado: 1,
                                    Action: 2
                                });
                                ID = 0;
                                
                            } else {
                                Toast({
                                    action: "warning",
                                    message: "El tipo de simulacion ya existe",
                                    position: "top-right",
                                });
                                cambiado = true;
                            }
                        }
                    });
                    if (!cambiado) {
                        Managment_TipoSimulacion({
                            TipoSimulacionId: 0,
                            ts_Nombre: $("#txt_nombre").val(),
                            ts_Descripticion: $("#txt_desc").val(),
                            ts_Estado: 1,
                            Action: 1
                        });
                        ID = 0;
                    }
                }
                
            } else {
                var existe_edit = false;
                if (txt_nombre == $("#txt_nombre").val()) {
                    existe_edit = false;
                } else {
                    $.each(arrayTipoSimulacion, function (i, item) {
                        if (item.ts_Nombre == $("#txt_nombre").val()) {
                                existe_edit = true;
                        }                    
                    });
                }
                
                if (existe_edit) {
                    Toast({
                        action: "warning",
                        message: "El tipo de simulacion ya existe",
                        position: "top-right",
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
                
            }
            
        } else {
            Toast({
                action: "error",
                message: "Llene los campos correctamente",
                position: "top-right",
            });
        }
    });

    $(document).on("click", ".btn_edit", function () {
        ID = $(this).attr("data-id");
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#txt_desc").val($(this).attr("data-desc"));
        $("#agregartiposimulacion").modal("show");
        txt_nombre = $(this).attr("data-name");
        $(".modal-title").text("Editar Tipo de Simulación");
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
            _data = JSON.parse(response);

        },
        complete: function () {
            arrayTipoSimulacion = _data;
            $.each(_data, function (i, item) {
                if (item.ts_Estado!=0) {
                    resultTable += "<tr>";
                    resultTable += "<td>" + item.ts_Nombre + "</td>";
                    resultTable += "<td>" + item.ts_Descripticion + "</td>";
                    resultTable += "<td><center>";
                    resultTable += "<button data-id='" + item.TipoSimulacionId + "' data-name='" + item.ts_Nombre + "' data-desc='" + item.ts_Descripticion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                    resultTable += "<button data-id='" + item.TipoSimulacionId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
                    resultTable += "</center></td>";
                    resultTable += "</tr>";
                } 
                
            });
            $('#datatable-tiposimulacion').find('tbody').html(resultTable);
            $('#datatable-tiposimulacion').DataTable();
            /*
            $('#datatable-tiposimulacion').DataTable({
                "language": {
                    "url": "Content/assets/scripts/language.json"
                }
            });
            */
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
                    if (cambiado) {
                        Toast({
                            action: "success",
                            message: "EL tipo de simulacion se ha recuperado correctamente",
                            position: "top-right",
                        });
                    } else {
                        Toast({
                            action: "success",
                            message: "EL tipo de simulacion se ha actualizado correctamente",
                            position: "top-right",
                        });
                    }
                    
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