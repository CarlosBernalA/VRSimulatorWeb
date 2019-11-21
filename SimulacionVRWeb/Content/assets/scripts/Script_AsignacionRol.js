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

    CurrectSelecteditem('#li_asignacionrol');
    Load_Trabajador();

    $(document).on("click", ".btn_edit", function () {
        ID = $(this).attr("data-id");
        roles_trabajador({ TrabajadorId: ID });
        /*
        $("#area").val($(this).attr("data-area"));
        $("#txt_dni").val($(this).attr("data-dni"));
        $("#txt_nombre").val($(this).attr("data-name"));
        $("#txt_ape").val($(this).attr("data-ape"));
        $("#txt_nac").val($(this).attr("data-naci"));
        $("#txt_dir").val($(this).attr("data-dire"));
        $('input:radio[name=txt_sexo]:checked').val($(this).attr("data-sexo"));
        $("#txt_itra").val($(this).attr("data-itra"));
        $("#txt_user").val($(this).attr("data-user"));
        $("#password-showhide2").val($(this).attr("data-pass"));
        */
        $("#trabajadorrol").modal("show");
    });
});
function roles_trabajador(data) {
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "AsignacionRol/roler_trabajador",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
            
        },
        complete: function () {
            
            $.each(_data, function (i, item) {
                                            
                resultTable += "<div class='widget widget-metric_6 mb1' style='padding:1rem;box-shadow: 2px 2px 4px #cccccc;'>";
                resultTable += "<span>" + item.tr_Nombre + "</span>";
                resultTable += "<i data-id='" + item.RolId + "' class='fa fa-trash-o btn_remove' style='float: right;color: red;font-size: 2rem;margin-top: -1px;margin-right: 5px;cursor: pointer;'></i></div>";
                
            });
            $('#rolesdeltrabajador').html(resultTable);
            
        }


    });
}

function Load_Trabajador() {
    var data = {};
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "AsignacionRol/list_trabajadorrol",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.tr_Nombre + "</td>";
                resultTable += "<td>" + item.tr_Apellidos + "</td>";
                resultTable += "<td>" + item.ad_descripcion + "</td>";
                resultTable += "<td>" + item.roles + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.TrabajadorId + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-clipboard'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-trabajadorrol').find('tbody').html(resultTable);
            $('#datatable-trabajadorrol').DataTable();
        }


    });
}
