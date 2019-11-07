function CurrectSelecteditem(Item){
    $('.father').each(function(){
        $(this).removeClass("active");
    });
    $(Item).addClass('active');
    $(Item).parent('li').parent('ul').parent('div').parent('li').find('.father').removeClass('collapsed');
    $(Item).parent('li').parent('ul').parent('div').parent('li').find('.father').addClass('active');
    $(Item).parent('li').parent('ul').parent('div').parent('li').find('.father').attr('aria-expanded',true);
    var child=$(Item).parent('li').parent('ul').parent('div').parent('li').find('.father').attr('href');
    $(child).addClass('in');
    $(child).attr('aria-expanded',true);
}

function Toast(data){

    $context = data.action;
    $message = data.message;
    $position = data.position;
    if ($context === '') {
        $context = 'info';
    }
    if ($position === '') {
        $positionClass = 'toast-left-top';
    } else {
        $positionClass = 'toast-' + $position;
    }
    toastr.remove();
    toastr[$context]($message, '', { positionClass: $positionClass });
}