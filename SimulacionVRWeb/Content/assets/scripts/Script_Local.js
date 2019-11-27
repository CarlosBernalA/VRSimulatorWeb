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

    CurrectSelecteditem('#li_local');
    Load_Local();

    $(".agregarCiudadano").on("click", function () {
        ID = 0;
        $("#txt_nombre").val("");
        $("#txt_direccion").val("");
        $("#txt_aforo").val("");
        $("#txt_desc").val("");
    });

    $("#btn_guardar").on("click", function () {
        if ($("#txt_nombre").val() != "" && $("#txt_direccion").val() != "" && $("#txt_aforo").val() != "" && $("#txt_desc").val() != "") {
            if (ID == 0) {
                Managment_Local({
                    LocalId: 0,
                    Lc_nombre: $("#txt_nombre").val(),
                    Lc_Direccion: $("#txt_direccion").val(),
                    Lc_Aforo: $("#txt_aforo").val(),
                    LC_Descripcion: $("#txt_desc").val(),
                    Lc_Estado: 1,
                    Action: 1
                });
            } else {
                Managment_Local({
                    LocalId: ID,
                    Lc_nombre: $("#txt_nombre").val(),
                    Lc_Direccion: $("#txt_direccion").val(),
                    Lc_Aforo: $("#txt_aforo").val(),
                    LC_Descripcion: $("#txt_desc").val(),
                    Lc_Estado: 1,
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
        $("#txt_direccion").val($(this).attr("data-dir"));
        $("#txt_aforo").val($(this).attr("data-afo"));
        $("#txt_desc").val($(this).attr("data-desc"));
        $("#agregarlocal").modal("show");
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este local?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            Managment_Local({
                LocalId: btn.attr("data-id"),
                Lc_nombre: "e",
                Lc_Direccion: "e",
                Lc_Aforo: 1,
                LC_Descripcion: "e",
                Lc_Estado: 1,
                Action: 3
            });
        }).catch(swal.noop);

    });
});

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
            console.log(response);
            _data = JSON.parse(response);

        },
        complete: function () {
            $.each(_data, function (i, item) {
                resultTable += "<tr>";
                resultTable += "<td>" + item.Lc_nombre + "</td>";
                resultTable += "<td>" + item.Lc_Direccion + "</td>";
                resultTable += "<td>" + item.Lc_Aforo + "</td>";
                resultTable += "<td>" + item.LC_Descripcion + "</td>";
                resultTable += "<td><center>";
                resultTable += "<button data-id='" + item.LocalId + "' data-name='" + item.Lc_nombre + "' data-dir='" + item.Lc_Direccion + "' data-afo='" + item.Lc_Aforo + "' data-desc='" + item.LC_Descripcion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
                resultTable += "<button data-id='" + item.LocalId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-local').find('tbody').html(resultTable);
            $('#datatable-local').DataTable({
                "language": {
                    "url": "Content/assets/scripts/language.json"
                }
            });
        }


    });
}

function Managment_Local(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Local/Managment_Local",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregarlocal").modal("hide");
                if (data.Action == 1) {
                    Load_Local();
                    Toast({
                        action: "success",
                        message: "EL local se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Local();
                    Toast({
                        action: "success",
                        message: "EL local se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Local();
                    Toast({
                        action: "success",
                        message: "EL local se ha eliminado correctamente",
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