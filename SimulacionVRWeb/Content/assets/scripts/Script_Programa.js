﻿var exportTable = $('#datatable-data-export').DataTable(
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

    $('.slimScrollDiv').slimScroll({
        //size: '8px',
        //width: '100%',
        //height: '80%',
        //color: '#ff4800',
        //allowPageScroll: true,
        //alwaysVisible: true
    });
    $('.basic-clockpicker').clockpicker();

    CurrectSelecteditem('#li_programa');

    $("#filtro_fechas").on("click", function () {
        
        Load_Programa({
            FechaInicio: $("#fech_ini_fil").val(),
            FechaFin: $("#fech_fin_fil").val()
        });
        
    });

    $(".agregarCiudadano").on("click", function () {
        ID = 0;
        Load_Local();
        Load_Simulacion();
    });

    $(document).on("click", ".btn_edit", function () {
        Load_Local();
        Load_Simulacion();
        Load_Trabajador();
        ID = $(this).attr("data-id");
        $("#txt_fecha").val($(this).attr("data-fech"));
        $("#txt_inicio").val($(this).attr("data-ini"));
        $("#txt_fin").val($(this).attr("data-fin"));
        $("#txt_local").val($(this).attr("data-local"));
        $("#txt_simulacion").val($(this).attr("data-simu"));
        $("#txt_descripcion").val($(this).attr("data-desc"));

        $("#listaprograma").hide();
        $("#editarprograma").show({ direction: "right" }, 5000);
    });


    $("#editprograma").click(function () {
        $("#listaprograma").hide();
        $("#editarprograma").show({ direction: "right" }, 5000);
    });
    $("#listprograma").click(function () {
        $("#editarprograma").hide();
        $("#listaprograma").show({ direction: "right" }, 5000);
    });

});

function Load_Programa(data) {
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Programa/list_programa",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.pr_Descripcion + "</td>";
                resultTable += "<td>" + item.FechaPrograma + "</td>";
                resultTable += "<td>" + item.HoraInicio + "</td>";
                resultTable += "<td>" + item.HoraFin + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-desc='" + item.pr_Descripcion + "' data-simu='" + item.SimulacionId + "' data-local='" + item.LocalId + "' data-fin='" + item.HoraFin + "' data-ini='" + item.HoraInicio + "' data-fech='" + item.FechaPrograma + "' data-id='" + item.ProgramaId + "'  type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-clipboard'></i></button>";
                resultTable += "<button data-id='" + item.ProgramaId + "' type='button' class='btn_remove btn btn-danger btn-sm'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-programa').find('tbody').html(resultTable);
            $('#datatable-programa').DataTable();

        }


    });
}
function Load_Local() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Local/list_local",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<option value='" + item.LocalId + "'>" + item.Lc_nombre + "</option>";
            });
            $('.localAll').html(resultTable);
        }


    });
}

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
                resultTable += "<option value='" + item.SimulacionId + "'>" + item.Nombre + "</option>";

            });
            $('.simulacionALL').html(resultTable);
        }


    });
}
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
            resultTable += "<option></option>";
            $.each(_data, function (i, item) {
                resultTable += "<option value='" + item.TrabajadorId + "'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>"+item.tr_Apellidos +" "+ item.tr_Nombre + "</font></font></option>";

            });
            $('#select-placeholder-single').html(resultTable);
            $('#select-placeholder-single').select2({
                placeholder: 'Selecciona un trabajador',
                allowClear: true
            });
        }


    });
}
