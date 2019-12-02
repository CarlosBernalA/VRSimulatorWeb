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
var nom_existe = false;
var sliderChanged = function () {
    $('.label-slider').text(theSlider.getValue());
};

var theSlider;

$(document).ready(function () {

    CurrectSelecteditem('#li_simulacion');


    theSlider = $('.bootstrap-slider')
		.slider({
		    min: 0,
		    max: 20,
		    value: 0,
		    tooltip: 'hide',
		    handle: 'square'
		}).on('slide', sliderChanged).data('slider');
    $('.label-slider').text(theSlider.getValue());

    Load_Simulacion();


    $(".agregarCiudadano").on("click", function () {
        Load_TipoSimulacion();
        $("#txt_nombre").val("");
        $("#txt_desc").val("");
        theSlider.setValue(0);
        $('.label-slider').text(theSlider.getValue());
        $('#txt_nombre').parent().removeClass('has-error');
        $('#txt_desc').parent().removeClass('has-error');
    });

    $("#txt_nombre").on("keyup", function () {
        var string = $("#txt_nombre").val();
        $("#txt_nombre").val(string.trimLeft());

        if ($.trim($("#txt_nombre").val()) != "") {
            BuscarSimulacion_For_Nombre({
                Nombre: $("#txt_nombre").val()
            });
        }
        if (nom_existe) {
            $('#txt_nombre').parent().addClass('has-error');
        } else {
            $('#txt_nombre').parent().removeClass('has-error');
            if ($('#txt_nombre').val().length > 50) {
                var cadena = $('#txt_nombre').val();
                inicio = 0;
                fin = 50;
                $('#txt_nombre').val(cadena.substring(inicio, fin))
                $('#txt_nombre').parent().addClass('has-error');
            } else {
                $('#txt_nombre').parent().removeClass('has-error');
            }
        }
        
    });

    $("#txt_desc").on("keyup", function () {
        var string = $("#txt_desc").val();
        $("#txt_desc").val(string.trimLeft());

        if ($('#txt_desc').val().length > 500) {
            var cadena = $('#txt_desc').val();
            inicio = 0;
            fin = 500;
            $('#txt_desc').val(cadena.substring(inicio, fin))
            $('#txt_desc').parent().addClass('has-error');
        } else {
            $('#txt_desc').parent().removeClass('has-error');
        }

    });

    $("#btn_guardar").on("click", function () {
        if (nom_existe) {
            console.log((parseInt($("#p_max").val()))+1);
            Toast({
                action: "error",
                message: "El nombre de la simulacion ya existe",
                position: "top-right",
            });
        } else {
            if ($.trim($("#txt_nombre").val()) != "" && $.trim($("#txt_desc").val()) != "" && $("#p_max").val() != "") {
                if (parseInt($("#p_max").val()) > 4) {
                    if (ID == 0) {
                        Managment_Simulacion({
                            SimulacionId: 0,
                            Nombre: $("#txt_nombre").val(),
                            TipoSimulacionId: $("#tiposimulacion").val(),
                            si_descripcion: $("#txt_desc").val(),
                            si_maxpuntaje: $("#p_max").val(),
                            si_GradoRiesgo: $("#gradoriesgo").val(),
                            si_Estado: 1,
                            Action: 1
                        });
                    } else {
                        Managment_Simulacion({
                            SimulacionId: ID,
                            Nombre: $("#txt_nombre").val(),
                            TipoSimulacionId: $("#tiposimulacion").val(),
                            si_descripcion: $("#txt_desc").val(),
                            si_maxpuntaje: $("#p_max").val(),
                            si_GradoRiesgo: $("#gradoriesgo").val(),
                            si_Estado: 1,
                            Action: 2
                        });
                        ID = 0;
                    }
                } else {
                    Toast({
                        action: "error",
                        message: "El puntaje minimo permitido es 5",
                        position: "top-right",
                    });
                }
                

            } else {
                Toast({
                    action: "error",
                    message: "Rellene los campos correctamente",
                    position: "top-right",
                });
            }
        }
        
    });

    $(document).on("click", ".btn_edit", function () {
        Load_TipoSimulacion();
        ID = $(this).attr("data-id");
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#tiposimulacion").val($(this).attr("data-tsimu"));
        $("#txt_desc").val($(this).attr("data-desc"));
        $("#gradoriesgo").val($(this).attr("data-riesgo"));

        theSlider.setValue($(this).attr("data-pmax"));
        $('.label-slider').text(theSlider.getValue());

        $("#agregarsimulacion").modal("show");
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar esta simulacion?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            Managment_Simulacion({
                SimulacionId: btn.attr("data-id"),
                Nombre: "e",
                TipoSimulacionId: 1,
                si_descripcion: "e",
                si_maxpuntaje: 1,
                si_GradoRiesgo: 1,
                si_Estado: 1,
                Action: 3
            });
        }).catch(swal.noop);

    });
});


function Load_Simulacion() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Simulacion/list_simulacion",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.Nombre + "</td>";
                resultTable += "<td>" + item.ts_Nombre + "</td>";
                resultTable += "<td>" + item.si_descripcion + "</td>";
                resultTable += "<td>" + item.si_maxpuntaje + "</td>";
                resultTable += "<td>" + gradoR(item.si_GradoRiesgo) + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.SimulacionId + "' data-name='" + item.Nombre + "' data-tsimu='" + item.TipoSimulacionId + "' data-desc='" + item.si_descripcion + "' data-pmax='" + item.si_maxpuntaje + "' data-riesgo='" + item.si_GradoRiesgo + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.SimulacionId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-simulacion').find('tbody').html(resultTable);
            $('#datatable-simulacion').DataTable();
        }


    });
}

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
            //console.log(response);
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<option value='" + item.TipoSimulacionId + "'>" + item.ts_Nombre + "</option>";
            });
            $('#tiposimulacion').html(resultTable);
        }


    });
}
function gradoR(grado) {
    var html = "";
    var gr = "";
    var color = "";

    switch (grado) {
        case 1:
            gr = "Bajo";
            color = "default";
            break;
        case 2:
            gr = "Medio";
            color = "warning";
            break;
        case 3:
            gr = "Alto";
            color = "danger";
            break;

    }

    html = "<span class='label label-" + color + " status'><font style='vertical-align: inherit;'>" + gr + "</font></span>";
    return html;
}

function Managment_Simulacion(data) {
    var _data;

    $.ajax({
        type: "POST",
        url: "Simulacion/Managment_Simulacion",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregarsimulacion").modal("hide");
                if (data.Action == 1) {
                    Load_Simulacion();
                    Toast({
                        action: "success",
                        message: "La simulacion se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Simulacion();
                    Toast({
                        action: "success",
                        message: "La simulacion se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Simulacion();
                    Toast({
                        action: "success",
                        message: "La simulacion se ha eliminado correctamente",
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
function BuscarSimulacion_For_Nombre(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Simulacion/BuscarSimulacion_For_Nombre",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Message == $("#txt_nombre").val()) {
                nom_existe = true;
            } else {
                nom_existe = false;
            }

        }
    });
}