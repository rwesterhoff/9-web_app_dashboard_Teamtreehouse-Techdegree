Chart.defaults.global.defaultFontFamily="'Open Sans', sans-serif",Chart.defaults.global.legend.display=!1,Chart.defaults.doughnut.legend.display=!0,Chart.defaults.doughnut.legend.position="right",Chart.defaults.global.title.display=!0,Chart.defaults.global.title.padding=0,Chart.defaults.global.maintainAspectRatio=!0;var lineWidgetContainer=document.getElementById("line-widget").getContext("2d"),lineWidget=new Chart(lineWidgetContainer,{type:"line",data:{labels:["16-22","23-29","30-5","6-12","13-19","20-26","27-3","4-10","11-17","18-24","25-31"],datasets:[{data:[500,1e3,750,1250,1800,900,2e3,1800,1100,1350,1700,1900],backgroundColor:["rgba(75, 74, 177, .2)"],borderColor:["rgb(96, 97, 177)"],borderWidth:1,lineTension:0,pointBackgroundColor:"rgba(255,255,255,1)",pointBorderWidth:2,pointRadius:6}]},options:{scales:{yAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}],xAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}]}}}),barWidgetContainer=document.getElementById("bar-widget").getContext("2d"),barWidget=new Chart(barWidgetContainer,{type:"bar",data:{labels:["S","M","T","W","T","F","S"],datasets:[{data:[50,100,75,125,180,90,200],backgroundColor:"rgba(96, 97, 177, 1)",cornerRadius:4}]},options:{scales:{yAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}],xAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}]}}}),doughnutWidgetContainer=document.getElementById("doughnut-widget").getContext("2d"),doughnutWidget=new Chart(doughnutWidgetContainer,{type:"doughnut",data:{labels:["Phone","Tablets","Desktop"],datasets:[{data:[300,50,100],backgroundColor:["rgb(96, 97, 177)","#76D76D","#63A2B2"]}]}});