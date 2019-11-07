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

	CurrectSelecteditem('#li_area');

	Load_Colaboradores();

	$(".agregarCiudadano").on("click", function () {
		ID = 0;
		$("#txt_nombre").val("");
		$("#txt_desc").val("");
	});

	$("#btn_guardar").on("click", function () {
		if($("#txt_nombre").val()!=""&&$("#txt_desc").val()!=""){
			if(ID==0){
				Managment_Area({
					AreaId:0,
					are_Nombre:$("#txt_nombre").val(),
					are_Descripcion:$("#txt_desc").val(),
					are_Estado:1,
					Action:1
				});
			}else{
				Managment_Area({
					AreaId:ID,
					are_Nombre:$("#txt_nombre").val(),
					are_Descripcion:$("#txt_desc").val(),
					are_Estado:1,
					Action:2
				});
				ID=0;
			}
		}else{
			Toast({
				action:"error",
				message:"Rellene los campos correctamente",
				position:"top-right",					
			});
		}
	});

	$(document).on("click", ".btn_edit", function () {
		ID = $(this).attr("data-id");
		$("#txt_nombre").val($(this).attr("data-name"));
		$("#txt_desc").val($(this).attr("data-desc"));
		$("#agregararea").modal("show");
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

function Load_Colaboradores() {
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
			console.log(response);
			_data = JSON.parse(response);

		},
		complete: function () {
			$.each(_data, function (i, item) {
				var sexo = (item.Sex == "f") ? "Femenino" : "Masculino";
				resultTable += "<tr>";
				resultTable += "<td>" + item.are_Nombre + "</td>";
				resultTable += "<td>" + item.are_Descripcion + "</td>";
				resultTable += "<td><center>";
				resultTable += "<button data-id='" + item.AreaId + "' data-name='" + item.are_Nombre + "' data-desc='" + item.are_Descripcion + "' type='button' class='btn_edit btn btn-default btn-sm'><i class='fa fa-edit'></i></button>";
				resultTable += "<button data-id='" + item.AreaId + "' type='button' class='btn_remove btn btn-danger btn-sm'><i class='fa fa-trash-o'></i></button>";
				resultTable += "</center></td>";
				resultTable += "</tr>";
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
					Load_Colaboradores();
					Toast({
						action:"success",
						message:"EL colaborador se ha registrado correctamente",
						position:"top-right",					
					});
				}else if(data.Action==2){
					Load_Colaboradores();
					Toast({
						action:"success",
						message:"EL colaborador se ha actualizado correctamente",
						position:"top-right",					
					});
				}else{
					Load_Colaboradores();
					Toast({
						action:"success",
						message:"EL colaborador se ha eliminado correctamente",
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