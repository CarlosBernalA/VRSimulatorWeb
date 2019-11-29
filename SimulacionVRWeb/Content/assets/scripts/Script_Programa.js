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
var arrayParticipanteID;
var fecha_ini;
var fecha_fin;
var existe = false;
var actualizado = false;

$(document).ready(function () {

    $('.slimScrollDiv').slimScroll();
    $('.basic-clockpicker').clockpicker();

    CurrectSelecteditem('#li_programa');

    $("#filtro_fechas").on("click", function () {
        
        fecha_ini = $("#fech_ini_fil").val();
        fecha_fin = $("#fech_fin_fil").val();

        Load_Programa({
            FechaInicio: fecha_ini,
            FechaFin: fecha_fin
        });
        
    });

    $("#programa_add").on("click", function () {
        ID = 0;
        Load_Local();
        Load_Simulacion();
        $("#txt_descripcion_add").val("");
        $("#txt_fecha_add").val("");
    });

    $("#programa_save_edit").on("click", function () {

        Managment_Programa({
            ProgramaId: ID,
            TrabajadorRolId: sessionStorage.getItem("TrabajadorRolId"),
            pr_Descripcion: $("#txt_descripcion").val(),
            SimulacionId: $("#txt_simulacion").val(),
            LocalId: $("#txt_local").val(),
            FechaPrograma: $("#txt_fecha").val(),
            HoraInicio: $("#txt_inicio").val(),
            HoraFin: $("#txt_fin").val(),
            Estado: 1,
            Action: 2
        });
        $("#editarprograma").hide();
        $("#listaprograma").show({ direction: "right" }, 5000);
    });

    $(document).on("click", ".btn_remove", function () {
        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este programa?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            
            Managment_Programa({
                ProgramaId: btn.attr("data-id"),
                TrabajadorRolId: sessionStorage.getItem("TrabajadorRolId"),
                pr_Descripcion: " ",
                SimulacionId: 1,
                LocalId: 1,
                FechaPrograma: '2019-10-11',
                HoraInicio: '15:00',
                HoraFin: '15:00',
                Estado: 1,
                Action: 3
            });
        }).catch(swal.noop);

    });

    $("#btn_guardar").on("click", function () {
        

        if ($("#txt_descripcion_add").val() != "" && $("#txt_fecha_add").val() != "") {
            
            if (ID == 0) {
                Managment_Programa({
                    ProgramaId: 0,
                    TrabajadorRolId: sessionStorage.getItem("TrabajadorRolId"),
                    pr_Descripcion: $("#txt_descripcion_add").val(),
                    SimulacionId: $("#txt_simulacion_add").val(),
                    LocalId: $("#txt_local_add").val(),
                    FechaPrograma: $("#txt_fecha_add").val(),
                    HoraInicio: $("#txt_h_ini_add").val(),
                    HoraFin: $("#txt_h_fin_add").val(),
                    Estado: 1,
                    Action: 1
                });
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
        Load_Local();
        Load_Simulacion();
        Load_Trabajador();
        ID = $(this).attr("data-id");
        Load_Participante({ ProgramaId: ID });
        $("#txt_fecha").val($(this).attr("data-fech"));
        $("#txt_inicio").val($(this).attr("data-ini"));
        $("#txt_fin").val($(this).attr("data-fin"));
        $("#txt_local").val($(this).attr("data-local"));
        $("#txt_simulacion").val($(this).attr("data-simu"));
        $("#txt_descripcion").val($(this).attr("data-desc"));

        $("#listaprograma").hide();
        $("#editarprograma").show({ direction: "right" }, 5000);
    });

    $("#listprograma").click(function () {
        $("#editarprograma").hide();
        $("#listaprograma").show({ direction: "right" }, 5000);
    });

    $("#add_participante").on("click", function () {
        
        if ($("#select-placeholder-single").val() != "") {

            existe = false;
            actualizado = false;
            if (arrayParticipanteID == null) {

            } else {
                $.each(arrayParticipanteID, function (i, item) {

                    if ($("#select-placeholder-single").val() == item.TrabajadorId) {
                        existe = true;
                        if (item.Estado == 0) {
                            Managment_Participante({
                                ParticipanteId: item.ParticipanteId,
                                TrabajadorId: 1,
                                ProgramaId: 1,
                                Estado: 1,
                                Action: 2
                            });
                            actualizado = true;
                        } 
                        
                    }

                });
            }
            if (!actualizado) {
                if (!existe) {
                    Managment_Participante({
                        ParticipanteId: 1,
                        TrabajadorId: $("#select-placeholder-single").val(),
                        ProgramaId: ID,
                        Estado: 1,
                        Action: 1
                    });
                } else {
                    Toast({
                        action: "error",
                        message: "El trabajador ya esta registrado",
                        position: "top-right",
                    });
                }
            }

           

        } else {
            Toast({
                action: "error",
                message: "Seleccione un trabajador",
                position: "top-right",
            });
        }
    });

    $(document).on("click", "#remove_participante", function () {

        var btn = $(this);
        swal({
            title: 'Eliminar',
            text: "¿Esta seguro de eliminar este participante?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F9354C',
            cancelButtonColor: '#41B314',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            Managment_Participante({
                ParticipanteId: btn.attr("data-id-par"),
                TrabajadorId: btn.attr("data-id"),
                ProgramaId: ID,
                Estado: 1,
                Action: 3
            });

        }).catch(swal.noop);
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
                resultTable += "<button data-id='" + item.ProgramaId + "' type='button' class='btn_remove btn btn-danger btn-sm ml1'><i class='fa fa-trash-o'></i></button>";
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

function Managment_Programa(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Programa/Managment_Programa",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                $("#agregarprograma").modal("hide");
                if (data.Action == 1) {
                    Load_Programa({
                        FechaInicio: fecha_ini,
                        FechaFin: fecha_fin
                    });

                    Toast({
                        action: "success",
                        message: "EL programa se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Programa({
                        FechaInicio: fecha_ini,
                        FechaFin: fecha_fin
                    });

                    Toast({
                        action: "success",
                        message: "EL programa se ha actualizado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Programa({
                        FechaInicio: fecha_ini,
                        FechaFin: fecha_fin
                    });

                    Toast({
                        action: "success",
                        message: "EL programa se ha eliminado correctamente",
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

function Load_Participante(data) {
    var _data;
    var resultTable = "";
    $.ajax({
        type: "POST",
        url: "Trabajador/list_participante",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            var par = true;
            var li_clas = "active";
            arrayParticipanteID = _data;
            $.each(_data, function (i, item) {
                if (item.Estado != 0) {
                    resultTable += "<li class='" + li_clas + "' style='padding-left: 21px;padding-top: 12px;padding-bottom: 12px;'>";
                    resultTable += "<span>" + item.tr_Apellidos + " " + item.tr_Nombre + "</span><br/>";
                    resultTable += "<span>" + item.are_Nombre + "</span>";
                    resultTable += "<i id='remove_participante' data-id-par='" + item.ParticipanteId + "' data-id='" + item.TrabajadorId + "' class='fa fa-trash-o' style='float: right;color: red;font-size: 2rem;margin-top: -11px;margin-right: 5px;cursor: pointer;'></i>";
                    resultTable += "</li>";

                    if (par) {
                        par = false;
                        li_clas = "unread";
                    } else {
                        par = true;
                        li_clas = "active";
                    }
                }
                
                
                
            });

            $('#participatesAll').html(resultTable);
        }
    });
}

function Managment_Participante(data) {
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/Managment_Participante",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
        },
        complete: function () {
            if (_data.Result == 1) {
                if (data.Action == 1) {
                   
                    Load_Participante({ ProgramaId: ID });
                    Toast({
                        action: "success",
                        message: "EL participante se ha registrado correctamente",
                        position: "top-right",
                    });
                } else if (data.Action == 2) {
                    Load_Participante({ ProgramaId: ID });
                    Toast({
                        action: "success",
                        message: "EL participante se ha registrado correctamente",
                        position: "top-right",
                    });
                } else {
                    Load_Participante({ ProgramaId: ID });

                    Toast({
                        action: "success",
                        message: "EL participante se ha eliminado correctamente",
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
