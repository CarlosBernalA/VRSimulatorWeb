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
var arrayArea;
var cambiado = false;
var txt_nombre = "";

$(document).ready(function () {

	CurrectSelecteditem('#li_area');

	Load_Areas();

	$(".agregarCiudadano").on("click", function () {
		ID = 0;
		$("#txt_nombre").val("");
		$("#txt_desc").val("");
		$(".modal-title").text("Agregar Area");
		$('#txt_nombre').parent().removeClass('has-error');
		$('#txt_desc').parent().removeClass('has-error');
	});

	$("#txt_nombre").on("keyup", function () {
	    var string = $("#txt_nombre").val();
	    $("#txt_nombre").val(string.trimLeft());

	    if ($('#txt_nombre').val().length > 200) {
	        var cadena = $('#txt_nombre').val();
	        inicio = 0;
	        fin = 200;
	        $('#txt_nombre').val(cadena.substring(inicio, fin))
	        $('#txt_nombre').parent().addClass('has-error');
	    } else {
	        $('#txt_nombre').parent().removeClass('has-error');
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
	    if ($("#txt_nombre").val() != "" && $("#txt_desc").val() != "") {
	        cambiado = false;
	        if (ID == 0) {
	            if (arrayArea == null) {
	                Managment_Area({
	                    AreaId: 0,
	                    are_Nombre: $("#txt_nombre").val(),
	                    are_Descripcion: $("#txt_desc").val(),
	                    are_Estado: 1,
	                    Action: 1
	                });
	            } else {
	                $.each(arrayArea, function (i, item) {
	                    if (item.are_Nombre == $("#txt_nombre").val()) {
	                        if (item.are_Estado == 0) {
	                            cambiado = true;
	                            Managment_Area({
	                                AreaId: item.AreaId,
	                                are_Nombre: item.are_Nombre,
	                                are_Descripcion: $("#txt_desc").val(),
	                                are_Estado: 1,
	                                Action: 2
	                            });
	                            ID = 0;

	                        } else {
	                            Toast({
	                                action: "warning",
	                                message: "El area ya existe",
	                                position: "top-right",
	                            });
	                            cambiado = true;
	                        }
	                    }
	                });
	                if (!cambiado) {
	                    Managment_Area({
	                        AreaId: 0,
	                        are_Nombre: $("#txt_nombre").val(),
	                        are_Descripcion: $("#txt_desc").val(),
	                        are_Estado: 1,
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
	                $.each(arrayArea, function (i, item) {
	                    if (item.are_Nombre == $("#txt_nombre").val()) {
	                        existe_edit = true;
	                    }
	                });
	            }

	            if (existe_edit) {
	                Toast({
	                    action: "warning",
	                    message: "El area ya existe",
	                    position: "top-right",
	                });
	            } else {
	                Managment_Area({
	                    AreaId: ID,
	                    are_Nombre: $("#txt_nombre").val(),
	                    are_Descripcion: $("#txt_desc").val(),
	                    are_Estado: 1,
	                    Action: 2
	                });
	                ID = 0;
	            }
			}
		}else{
			Toast({
				action:"error",
				message:"Llene los campos correctamente",
				position:"top-right",					
			});
		}
	});

	$(document).on("click", ".btn_edit", function () {
		ID = $(this).attr("data-id");
		$("#txt_nombre").val($(this).attr("data-name"));
		$("#txt_desc").val($(this).attr("data-desc"));
		$("#agregararea").modal("show");
		txt_nombre = $(this).attr("data-name");
		$('#txt_nombre').parent().removeClass('has-error');
		$('#txt_desc').parent().removeClass('has-error');
		$(".modal-title").text("Editar Area");
	});

	$(document).on("click", ".btn_remove", function () {
		var btn=$(this);
		swal({
			title: 'Eliminar',
			text: "¿Esta seguro de eliminar este colaborador?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#F9354C',
			cancelButtonColor: '#41B314',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		}).then(function () {
			Managment_Area({
				AreaId:btn.attr("data-id"),
				are_Nombre:"e",
				are_Descripcion:"e",
				are_Estado:1,
				Action:3
			});
		}).catch(swal.noop);
		
	});


});

function Load_Areas() {
	var data = {};
	var _data;
	var resultTable = "";
	$.ajax({
		type: "POST",
		url: "Area/list_area",
		data: data,
		async: false,
		datatype: "JSON",
		success: function (response) {
			//console.log(response);
			_data = JSON.parse(response);

		},
		complete: function () {
		    arrayArea = _data;
		    $.each(_data, function (i, item) {
		        if (item.are_Estado != 0) {
                    var sexo = (item.Sex == "f") ? "Femenino" : "Masculino";
				    resultTable += "<tr>";
				    resultTable += "<td>" + item.are_Nombre + "</td>";
				    resultTable += "<td>" + item.are_Descripcion + "</td>";
				    resultTable += "<td><center>";
				    resultTable += "<button data-id='" + item.AreaId + "' data-name='" + item.are_Nombre + "' data-desc='" + item.are_Descripcion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
				    resultTable += "<button data-id='" + item.AreaId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
				    resultTable += "</center></td>";
				    resultTable += "</tr>";
		        }
			});
			$('#datatable-area').find('tbody').html(resultTable);
			$('#datatable-area').DataTable();
		}


	});
}

function Managment_Area(data) {
	var _data;
	$.ajax({
		type: "POST",
		url: "Area/Managment_Area",
		data: data,
		async: false,
		datatype: "JSON",
		success: function (response) {
			console.log(response);
			_data = JSON.parse(response);
		},
		complete: function () {
			if(_data.Result==1){
				$("#agregararea").modal("hide");
				if(data.Action==1){
				    Load_Areas();
					Toast({
						action:"success",
						message:"EL area se ha registrado correctamente",
						position:"top-right",					
					});
				}else if(data.Action==2){
				    Load_Areas();
				    if (cambiado) {
				        Toast({
				            action: "success",
				            message: "EL area se ha recuperado correctamente",
				            position: "top-right",
				        });
				    } else {
				        Toast({
				            action: "success",
				            message: "EL area se ha actualizado correctamente",
				            position: "top-right",
				        });
				    }
					
				}else{
				    Load_Areas();
					Toast({
						action:"success",
						message: "EL area se ha eliminado correctamente",
						position:"top-right",					
					});
				}
			}else{
				Toast({
					action:"error",
					message:_data.Message,
					position:"top-right",					
				});
			}
			
		}
	});
}