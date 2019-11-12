$(document).ready(function () {

    CurrectSelecteditem('#li_simulacion');
    
    var sliderChanged = function () {
        $('.label-slider').text(theSlider.getValue());
    };

    var theSlider = $('.bootstrap-slider')
		.slider({
		    min: 0,
		    max: 20,
		    value: 0,
		    tooltip: 'hide',
		    handle: 'square'
		}).on('slide', sliderChanged).data('slider');

});