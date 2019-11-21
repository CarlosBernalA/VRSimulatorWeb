$(document).ready(function () {

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