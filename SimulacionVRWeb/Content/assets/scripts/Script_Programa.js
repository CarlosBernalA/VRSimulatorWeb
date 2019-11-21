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

    $('#select-placeholder-single').select2({
        placeholder: 'Selecciona un trabajador',
        allowClear: true
    });
    $('#select-placeholder-single2').select2({
        placeholder: 'Selecciona un trabajador',
        allowClear: true
    });
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
    Load_Programa({
        FechaInicio: '2019-10-11',
        FechaFin: '2019-11-20'
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
                resultTable += "<button data-id='" + item.ProgramaId + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-clipboard'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-programa').find('tbody').html(resultTable);
            $('#datatable-programa').DataTable();
        }


    });
}
