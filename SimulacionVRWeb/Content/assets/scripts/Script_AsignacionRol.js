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
var arrayRol;

$(document).ready(function () {

    CurrectSelecteditem('#li_asignacionrol');
    Load_Trabajador();
    Load_Roles();

    $("#btn_guardar").on("click", function () {
        if (arrayRol == null) {
            Managment_trabajadorRol({
                tr_Nombre: "Sin descripcion",
                TrabajadorRolId: ID,
                RolId: $("#rolid").val(),
                Action: 1
            });
        } else {
            $.each(arrayRol, function (i, item) {
            
                if (item.TrabajadorId == ID) {
                    if (item.RolId == $("#rolid").val()) {
                        if (item.ad_Estado==0) {
                             Managment_trabajadorRol({
                                tr_Nombre: "Sin descripcion",
                                TrabajadorRolId: ID,
                                RolId: $("#rolid").val(),
                                Action: 3
                            });
                        } else {
                            Toast({
                                action: "error",
                                message: "El rol ya esta asignado",
                                position: "top-right",
                            });
                        }
                    
                    } else {
                        Managment_trabajadorRol({
                            tr_Nombre: "Sin descripcion",
                            TrabajadorRolId: ID,
                            RolId: $("#rolid").val(),
                            Action: 1
                        });
                    }

                } else {
                    Managment_trabajadorRol({
                        tr_Nombre: "Sin descripcion",
                        TrabajadorRolId: ID,
                        RolId: $("#rolid").val(),
                        Action: 1
                    });
                }

            });
        }
        
    });

    $("#cuargarmodal").on("click", function () {

        $("#trabajadorrol").modal("hide");
    });
    
    $(document).on("click", ".btn_edit", function () {
        ID = $(this).attr("data-id");
        roles_trabajador({ TrabajadorId: ID });
        
        $("#titulotrabajador").html($(this).attr("data-ape") + "  " + $(this).attr("data-nom"));
        
        $("#trabajadorrol").modal("show");
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
            Managment_trabajadorRol({
                tr_Nombre: "Sin descripcion",
                TrabajadorRolId: ID,
                RolId: btn.attr("data-id"),
                Action: 2
            });

        }).catch(swal.noop);
        
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
            arrayRol = _data;
            $.each(_data, function (i, item) {
                resultTable += "<div class='widget widget-metric_6 mb1 " + hide_rol(item.ad_Estado)+ "' style='padding:1rem;box-shadow: 2px 2px 4px #cccccc;'>";
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
                resultTable += "<button data-nom='" + item.tr_Nombre + "' data-ape='" + item.tr_Apellidos + "' data-id='" + item.TrabajadorId + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-clipboard'></i></button>";
                resultTable += "</center></td>";
                resultTable += "</tr>";
            });
            $('#datatable-trabajadorrol').find('tbody').html(resultTable);
            $('#datatable-trabajadorrol').DataTable({
                "language": {
                    "url": "Content/assets/scripts/language.json"
                }
            });
        }


    });
}
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
                resultTable += "<option value='" + item.rol_RolId + "'>" + item.rol_Nombre + "</option>";
            });
            $('#rolid').html(resultTable);
        }


    });
}

function Managment_trabajadorRol(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "AsignacionRol/Managment_TrabajadorRol",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                if (data.Action == 1 || data.Action == 3) {
                    roles_trabajador({ TrabajadorId: ID });
                    Load_Trabajador();
                    Toast({
                        action: "success",
                        message: "EL rol se ha agregado correctamente",
                        position: "top-right",
                    });
                } else {
                    roles_trabajador({ TrabajadorId: ID });
                    Load_Trabajador();
                    Toast({
                        action: "success",
                        message: "EL rol se ha eliminado correctamente",
                        position: "top-right",
                    });
                }
            } else {
                
            }

        }
    });
}
function hide_rol(estado) {
    var hide = "";
    if (estado==0) {
        hide = "hide";
    }
    return hide
}
