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

    CurrectSelecteditem('#li_trabajador');
    Load_Trabajador();
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
                resultTable += "<button data-id='" + item.TrabajadorId + "' data-name='" + item.tr_Nombre + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.TrabajadorId + "' type='button' class='btn_remove btn btn-danger btn-sm'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-trabajador').find('tbody').html(resultTable);
            $('#datatable-trabajador').DataTable();
        }


    });
}