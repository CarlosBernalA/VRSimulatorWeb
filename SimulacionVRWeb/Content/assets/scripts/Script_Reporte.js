$(document).ready(function () {

    CurrectSelecteditem('#li_reporte');

    am4core.useTheme(am4themes_animated);
    //Load_External_Proyect()
    Rpt_Participantes();
    Rpt_Programa_cantidad_aciertos_fallos();
    Rpt_Simulacion_cantidad_aciertos_fallos();
    Rpt_Puntaje_Trabajador();


    if ($('.btn-panel-refresh').length > 0) {
        $('.btn-panel-refresh').on('click', function () {
            $('.overlay-refresh').fadeIn(300);

            setTimeout(function () {
                $('.overlay-refresh').fadeOut(300);
                Rpt_Participantes();
            }, 1500);
        });
    }

});



function Load_External_Proyect() {
    var data = {};
    var _data;
    $.ajax({
        type: "POST",
        url: "Programa/report_programa_cantidad_participante",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            StartChartPrograma_Participante(_data);
        }


    });
}
function Rpt_Participantes() {
    var data = {};
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/report_participante_aciertos_fallos",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            console.log(_data);
            reporte1(_data);
        }


    });
}
function Rpt_Programa_cantidad_aciertos_fallos() {
    var data = {};
    var _data;
    $.ajax({
        type: "POST",
        url: "Programa/report_programa_cantidad_aciertos_fallos",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            reporte3(_data);
        }


    });
}
function Rpt_Simulacion_cantidad_aciertos_fallos() {
    var data = {};
    var _data;
    $.ajax({
        type: "POST",
        url: "Simulacion/report_simulacion_aciertoss_fallos",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);

        },
        complete: function () {
            reporte2(_data);
            reporte4(_data);
        }


    });
}
function Rpt_Puntaje_Trabajador() {
    var data = {};
    var _data;
    $.ajax({
        type: "POST",
        url: "Trabajador/report_puntaje_trabajador",
        data: data,
        async: false,
        datatype: "JSON",
        success: function (response) {
            _data = JSON.parse(response);
            console.log(_data);
            reporte5(_data);

        },
        complete: function () {
        }


    });
}
function reporte1(data) {

    // Themes end

    var mainContainer = am4core.create("chartdiv", am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";

    var usData = data;
    var esData = [
      {
          "age": "0 to 5",
          "male": 10175713,
          "female": 9736305
      },
      {
          "age": "5 to 9",
          "male": 10470147,
          "female": 10031835
      },
      {
          "age": "10 to 14",
          "male": 10561873,
          "female": 10117913
      },
      {
          "age": "15 to 17",
          "male": 6447043,
          "female": 6142996
      },
      {
          "age": "18 to 21",
          "male": 9349745,
          "female": 8874664
      },
      {
          "age": "22 to 24",
          "male": 6722248,
          "female": 6422017
      },
      {
          "age": "25 to 29",
          "male": 10989596,
          "female": 10708414
      },
      {
          "age": "30 to 34",
          "male": 10625791,
          "female": 10557848
      },
      {
          "age": "35 to 39",
          "male": 9899569,
          "female": 9956213
      },
      {
          "age": "40 to 44",
          "male": 10330986,
          "female": 10465142
      },
      {
          "age": "45 to 49",
          "male": 10571984,
          "female": 10798384
      },
      {
          "age": "50 to 54",
          "male": 11051409,
          "female": 11474081
      },
      {
          "age": "55 to 59",
          "male": 10173646,
          "female": 10828301
      },
      {
          "age": "60 to 64",
          "male": 8824852,
          "female": 9590829
      },
      {
          "age": "65 to 69",
          "male": 6876271,
          "female": 7671175
      },
      {
          "age": "70 to 74",
          "male": 4867513,
          "female": 5720208
      },
      {
          "age": "75 to 79",
          "male": 3416432,
          "female": 4313697
      },
      {
          "age": "80 to 84",
          "male": 2378691,
          "female": 3432738
      },
      {
          "age": "85 and Older",
          "male": 2000771,
          "female": 3937981
      }
    ];

    var maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "tr_Nombre";
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;

    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 10;
    maleValueAxis.strictMinMax = true;

    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#.#'%'";

    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "R_Aciertos";
    maleSeries.dataFields.valueXShow = "percent";
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = "tr_Nombre";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Aciertos, {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    //maleSeries.sequencedInterpolation = true;


    var femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "tr_Nombre";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;

    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 10;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    femaleValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "R_Fallos";
    femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText = "Fallos , {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    femaleSeries.dataFields.categoryY = "tr_Nombre";
    femaleSeries.interpolationDuration = 1000;




}
function reporte2(data) {

    var chart = am4core.create("chartdiv2", am4charts.XYChart);


    chart.colors.saturation = 0.4;


    chart.data = data;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "Nombre";
    categoryAxis.renderer.minGridDistance = 20;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 0.98;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "Nombre";
    series.dataFields.valueX = "Cantidad_Aciertos";
    series.tooltipText = "{valueX.value}";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 1000;
    series.sequencedInterpolationDelay = 100;
    series.columns.template.strokeOpacity = 0;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panY";


    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });
}
function reporte3(data) {

    // Themes end

    var mainContainer = am4core.create("chartdiv3", am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";

    var usData = data;
    var esData = [
      {
          "age": "0 to 5",
          "male": 10175713,
          "female": 9736305
      },
      {
          "age": "5 to 9",
          "male": 10470147,
          "female": 10031835
      },
      {
          "age": "10 to 14",
          "male": 10561873,
          "female": 10117913
      },
      {
          "age": "15 to 17",
          "male": 6447043,
          "female": 6142996
      },
      {
          "age": "18 to 21",
          "male": 9349745,
          "female": 8874664
      },
      {
          "age": "22 to 24",
          "male": 6722248,
          "female": 6422017
      },
      {
          "age": "25 to 29",
          "male": 10989596,
          "female": 10708414
      },
      {
          "age": "30 to 34",
          "male": 10625791,
          "female": 10557848
      },
      {
          "age": "35 to 39",
          "male": 9899569,
          "female": 9956213
      },
      {
          "age": "40 to 44",
          "male": 10330986,
          "female": 10465142
      },
      {
          "age": "45 to 49",
          "male": 10571984,
          "female": 10798384
      },
      {
          "age": "50 to 54",
          "male": 11051409,
          "female": 11474081
      },
      {
          "age": "55 to 59",
          "male": 10173646,
          "female": 10828301
      },
      {
          "age": "60 to 64",
          "male": 8824852,
          "female": 9590829
      },
      {
          "age": "65 to 69",
          "male": 6876271,
          "female": 7671175
      },
      {
          "age": "70 to 74",
          "male": 4867513,
          "female": 5720208
      },
      {
          "age": "75 to 79",
          "male": 3416432,
          "female": 4313697
      },
      {
          "age": "80 to 84",
          "male": 2378691,
          "female": 3432738
      },
      {
          "age": "85 and Older",
          "male": 2000771,
          "female": 3937981
      }
    ];

    var maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "ProgramaId";
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;

    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 10;
    maleValueAxis.strictMinMax = true;

    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#.#'%'";

    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "Cantidad_Aciertos";
    maleSeries.dataFields.valueXShow = "percent";
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = "ProgramaId";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Aciertos, Programa {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    //maleSeries.sequencedInterpolation = true;


    var femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "ProgramaId";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;

    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 10;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    femaleValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "Cantidad_Fallos";
    femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText = "Fallos ,Programa {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    femaleSeries.dataFields.categoryY = "ProgramaId";
    femaleSeries.interpolationDuration = 1000;




}
function reporte4(data) {


    // Themes end
    var chart = am4core.create("chartdiv4", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "Nombre";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 11;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;
    // axis break
    var axisBreak = valueAxis.axisBreaks.create();
    axisBreak.startValue = 2100;
    axisBreak.endValue = 22900;
    axisBreak.breakSize = 0.005;

    // make break expand on hover
    var hoverState = axisBreak.states.create("hover");
    hoverState.properties.breakSize = 1;
    hoverState.properties.opacity = 0.1;
    hoverState.transitionDuration = 1500;

    axisBreak.defaultState.transitionDuration = 1000;
    /*
    // this is exactly the same, but with events
    axisBreak.events.on("over", function() {
      axisBreak.animate(
        [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
        1500,
        am4core.ease.sinOut
      );
    });
    axisBreak.events.on("out", function() {
      axisBreak.animate(
        [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
        1000,
        am4core.ease.quadOut
      );
    });*/

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "Nombre";
    series.dataFields.valueY = "Cantidad_Fallos";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });
}
function reporte5(data) {

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv5", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingBottom = 30;
    chart.data = data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "tr_Nombre";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    var series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "puntaje";
    series.dataFields.categoryX = "tr_Nombre";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = -6;
    series.columnsContainer.zIndex = 100;

    var columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
    series.mainContainer.mask = undefined;

    var cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    var bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.mouseEnabled = false;
    bullet.verticalCenter = "bottom";
    bullet.interactionsEnabled = false;

    var hoverState = bullet.states.create("hover");
    var outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius, target) {
        var circleBullet = target.parent;
        return circleBullet.circle.pixelRadius + 10;
    })

    var image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "imagen";

    image.adapter.add("mask", function (mask, target) {
        var circleBullet = target.parent;
        return circleBullet.circle;
    })

    var previousBullet;
    chart.cursor.events.on("cursorpositionchanged", function (event) {
        var dataItem = series.tooltipDataItem;

        if (dataItem.column) {
            var bullet = dataItem.column.children.getIndex(1);

            if (previousBullet && previousBullet != bullet) {
                previousBullet.isHover = false;
            }

            if (previousBullet != bullet) {

                var hs = bullet.states.getKey("hover");
                hs.properties.dy = -bullet.parent.pixelHeight + 30;
                bullet.isHover = true;

                previousBullet = bullet;
            }
        }
    })
}
