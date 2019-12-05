let webSocket;
var char_acietos;
var char_fallos;
var char_concentracion;
$(document).ready(function () {

	WebSocketResults();


});

function WebSocketResults() {
	// $("#ModalProcess").modal({backdrop: "static"});

	var char_acietos = Get_chart("chart-aciertos", am4themes_animated);
	char_acietos.Label.text = 0 + '%';


	var char_fallos = Get_chart("chart-fallos", am4themes_dataviz);
	char_fallos.Label.text = 80 + '%';

	var char_concentracion = Get_chart("chart-concentracion", am4themes_moonrisekingdom);
	char_concentracion.Label.text = 80 + '%';

	var uri = 'ws://192.168.43.42/VR_Simulator/api/v1.0/VR/NotificationResult';
	webSocket = new WebSocket(uri);
	webSocket.onopen = function () {
		console.log("CONECTADO");
	};
	webSocket.onerror = function (e) {
		console.log("error");
	}
	webSocket.onmessage = function (e) {
		console.log(e.data);
		// var _JSON = JSON.parse(e.data);
		// if(_JSON.Action==1){
		// 	$("#ModalProcess").modal({backdrop: "static"});

		// }else{
		// 	// Updatedata();
		// }
			
			$("#ModalProcess").modal({ backdrop: "static" });
		
			mJson = JSON.parse(e.data);
			$("#ParticipanteName").html(mJson.SimulacionName + " - " + mJson.User);
			char_acietos.Label.text = mJson.Aciertos + '%';
			new am4core.Animation(char_acietos.Hand, {
				property: "value",
				to:Number(mJson.Aciertos)
			}, 1000, am4core.ease.cubicOut).start();

			//fallos
			char_fallos.Label.text = mJson.Fallos + '%';
			new am4core.Animation(char_fallos.Hand, {
				property: "value",
				to:Number(mJson.Fallos)
			}, 1000, am4core.ease.cubicOut).start();

			//Concentracion
			char_concentracion.Label.text = mJson.Concentracion + '%';
			new am4core.Animation(char_concentracion.Hand, {
				property: "value",
				to:Number(mJson.Concentracion)
			}, 1000, am4core.ease.cubicOut).start();

		

	}
	webSocket.onclose = function () {

	}

}

function Get_chart(div, _theme) {
	// charts aciertos=============================================================================================================================

	am4core.useTheme(_theme);

	var chart1 = am4core.create(div, am4charts.GaugeChart);
	chart1.innerRadius = am4core.percent(82);

	/**
	 * Normal axis
	 */

	var axis1 = chart1.xAxes.push(new am4charts.ValueAxis());
	axis1.min = 0;
	axis1.max = 100;
	axis1.strictMinMax = true;
	axis1.renderer.radius = am4core.percent(80);
	axis1.renderer.inside = true;
	axis1.renderer.line.strokeOpacity = 1;
	axis1.renderer.ticks.template.disabled = false
	axis1.renderer.ticks.template.strokeOpacity = 1;
	axis1.renderer.ticks.template.length = 10;
	axis1.renderer.grid.template.disabled = true;
	axis1.renderer.labels.template.radius = 40;
	axis1.renderer.labels.template.adapter.add("text", function (text) {
		return text + "";
	})

	/**
	 * Axis for ranges
	 */

	var colorSet1 = new am4core.ColorSet();

	var axis21 = chart1.xAxes.push(new am4charts.ValueAxis());
	axis21.min = 0;
	axis21.max = 100;
	axis21.renderer.innerRadius = 10
	axis21.strictMinMax = true;
	axis21.renderer.labels.template.disabled = true;
	axis21.renderer.ticks.template.disabled = true;
	axis21.renderer.grid.template.disabled = true;

	var range01 = axis21.axisRanges.create();
	range01.value = 0;
	range01.endValue = 50;
	range01.axisFill.fillOpacity = 1;
	range01.axisFill.fill = colorSet1.getIndex(0);

	var range11 = axis21.axisRanges.create();
	range11.value = 50;
	range11.endValue = 100;
	range11.axisFill.fillOpacity = 1;
	range11.axisFill.fill = colorSet1.getIndex(2);

	/**
	 * Label
	 */

	var label1 = chart1.radarContainer.createChild(am4core.Label);
	label1.isMeasured = false;
	label1.fontSize = 30;
	label1.x = am4core.percent(50);
	label1.y = am4core.percent(100);
	label1.horizontalCenter = "middle";
	label1.verticalCenter = "bottom";
	label1.text = "0%";


	/**
	 * Hand
	 */

	var hand1 = chart1.hands.push(new am4charts.ClockHand());
	hand1.axis = axis21;
	hand1.innerRadius = am4core.percent(20);
	hand1.startWidth = 10;
	hand1.pin.disabled = true;
	hand1.value = 0;

	hand1.events.on("propertychanged", function (ev) {
		range01.endValue = ev.target.value;
		range11.value = ev.target.value;
		axis21.invalidate();
	});
	chart1.Label = label1;
	chart1.Hand = hand1;

	return chart1;
	// ======================================================================================================================================

}