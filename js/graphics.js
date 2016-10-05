/* ====================================================================================== *\
    CHART.JS
*\ ====================================================================================== */
Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.title.display = true;
Chart.defaults.global.title.padding = 0;
Chart.defaults.global.maintainAspectRatio = true;

var lineWidgetContainer = document.getElementById("line-widget").getContext("2d"),
    lineWidget = new Chart(lineWidgetContainer, {
        type: 'line',
        data: {
            labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
            datasets: [{
                data: [500, 1000, 750, 1250, 1800, 900, 2000, 1800, 1100, 1350, 1700, 1900],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgb(96, 97, 177)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }],
                xAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }]
            }
        }
    });
    var barWidgetContainer = document.getElementById("bar-widget").getContext("2d"),
    barWidget = new Chart(barWidgetContainer, {
        type: 'bar',
        data: {
            labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
            datasets: [{
                data: [500, 1000, 750, 1250, 1800, 900, 2000, 1800, 1100, 1350, 1700, 1900],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgb(96, 97, 177)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }],
                xAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }]
            }
        }
    });
    var pieWidgetContainer = document.getElementById("pie-widget").getContext("2d"),
    pieWidget = new Chart(pieWidgetContainer, {
        type: 'pie',
        data: {
            labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
            datasets: [{
                data: [500, 1000, 750, 1250, 1800, 900, 2000, 1800, 1100, 1350, 1700, 1900],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgb(96, 97, 177)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }],
                xAxes: [{
                    offsetGridLines: true,
                    ticks: {
                        padding: 20
                    },
                    gridLines: { tickMarkLength: 0, drawTicks: false, offsetGridLines: true }
                }]
            }
        }
    });
