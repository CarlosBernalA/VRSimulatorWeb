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
       
    CurrectSelecteditem('#li_programa');
    $('.basic-clockpicker').clockpicker();

    $("#editprograma").click(function () {
        $("#listaprograma").hide();
        $("#editarprograma").show({ direction: "right" }, 5000);
    });
    $("#listprograma").click(function () {
        $("#editarprograma").hide();
        $("#listaprograma").show({ direction: "right" }, 5000);
    });
    

    
});