function Alert(t){this.text=t}function Dashboard(){var t=document.getElementById("app-notification"),e=document.getElementById("notification-dropdown");this.setAlerts=function(t){amount=this.checkAmount(t),1===amount?text="Notification":text="Notifications",this.isEmpty(t)?(this.hideNotifications(),this.hideAlerts()):(this.showNotifications(),this.displayAlerts())},this.displayAlerts=function(){var t="content-notifications",e=alerts;this.renderInElement(t,e),this.setCloseButton()},this.hideAlerts=function(){var t=document.getElementById("content-notifications");t.setAttribute("data-state","hidden")},this.showNotifications=function(){t.setAttribute("data-state","active")},this.hideNotifications=function(){t.setAttribute("data-state","inactive")},this.setDropdownButton=function(){var a=function(){var t=e.getAttribute("data-state");"hidden"===t?e.setAttribute("data-state","visible"):e.setAttribute("data-state","hidden")};t.addEventListener("click",a)},this.setCloseButton=function(){for(var t=document.getElementsByClassName("alert-button-close"),e=function(){var t=this.parentNode;t.setAttribute("data-state","hidden"),setTimeout(function(){t.parentNode.removeChild(t)},200),amount-=1,0===amount&&(dashboard.hideNotifications(),dashboard.hideAlerts())},a=0;a<t.length;a++)t[a].addEventListener("click",e)},this.setGraphics=function(){Chart.defaults.global.defaultFontFamily="'Open Sans', sans-serif",Chart.defaults.global.legend.display=!1,Chart.defaults.global.legend.labels.boxWidth=12,Chart.defaults.doughnut.legend.display=!0,Chart.defaults.doughnut.legend.position="right",Chart.defaults.global.title.display=!0,Chart.defaults.global.title.padding=0,Chart.defaults.global.maintainAspectRatio=!0;var t=function(){for(var e=document.querySelectorAll(".filter-button"),a=function(){var t=document.getElementById("line-widget").getContext("2d"),e=new Chart(t,{type:"line",data:s,options:{scales:{yAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}],xAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}]}}})},i=0;i<e.length;i++){var n=e[i],o="active"===n.getAttribute("data-state");if(n.addEventListener("click",t),o){var r=n.id,s=dataTraffic[r];a()}}},e=document.getElementById("bar-widget").getContext("2d"),a=new Chart(e,{type:"bar",data:{labels:["S","M","T","W","T","F","S"],datasets:[{data:[50,100,75,125,180,90,200],backgroundColor:"rgba(96, 97, 177, 1)",cornerRadius:4}]},options:{scales:{yAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}],xAxes:[{offsetGridLines:!0,ticks:{padding:20},gridLines:{tickMarkLength:0,drawTicks:!1,offsetGridLines:!0}}]}}}),i=document.getElementById("doughnut-widget").getContext("2d"),n=new Chart(i,{type:"doughnut",data:{labels:["Phone","Tablets","Desktop"],datasets:[{data:[300,50,100],backgroundColor:["rgb(96, 97, 177)","#76D76D","#63A2B2"]}]}});t()},this.setForm=function(){this.validateForm("message-form")},this.displayAll=function(){this.setStates("nav-button"),this.setStates("filter-button"),this.setAlerts(alerts),this.setDropdownButton(),this.setGraphics(),this.setGraphicsWidth("line-widget",500),this.setForm()}}Alert.prototype.toHTML=function(){var t="<div";return t+=' class="alert"',t+=' data-state="visible"',t+=">",t+="<p><strong>Alert</strong>"+this.text+"</p>",t+='<button class="alert-button-close">Close alert</button>',t+="</div>"},Dashboard.prototype.setStates=function(t){for(var e=document.getElementsByClassName(t),a=function(){i(),this.setAttribute("data-state","active")},i=function(){for(var t=0;t<e.length;t++)e[t].setAttribute("data-state","inactive")},n=0;n<e.length;n++)e[n].addEventListener("click",a)},Dashboard.prototype.setGraphicsWidth=function(t,e){var a=window.innerWidth,i=function(t,e){document.getElementById(t).setAttribute("width",e)};a<768&&(window.onresize=i(t,e))},Dashboard.prototype.renderInElement=function(t,e){var a=e,i=document.getElementById(t);for(var n in a)a.hasOwnProperty(n)&&(i.innerHTML+=a[n].toHTML())},Dashboard.prototype.checkAmount=function(t){var e=0;for(var a in t)t.hasOwnProperty(a)&&e++;return e},Dashboard.prototype.isEmpty=function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},Dashboard.prototype.validateForm=function(t){var e="form#"+t,a=document.querySelector(e),i=document.querySelectorAll(e+" input[type=text]"),n=document.querySelectorAll(e+" textarea"),o=document.querySelector(e+" input[type=submit]"),r=function(t){for(var e=0;e<t.length;e++){var a=t[e].checkValidity();a?t[e].removeAttribute("data-state","error"):t[e].setAttribute("data-state","error")}},s=function(){var t=document.getElementById(a.id),e=a.checkValidity();e?d("Your message is successfully send!","send",t):d("You might have missed something!","error",t)},d=function(t,e,a){var i=document.querySelector(".message");if(i)i.setAttribute("data-state",e),i.innerText=t;else{var n=document.createElement("P"),r=document.createTextNode(t);n.classList.add("message"),n.setAttribute("data-state",e),n.appendChild(r),a.insertBefore(n,o)}};o.addEventListener("click",function(t){t.preventDefault(),r(i),r(n),s()})};var dashboard=new Dashboard,alerts={alert_1:new Alert("Donec sed odio dui."),alert_2:new Alert("Lorum ipsum dolor sit amet. Maecenas faucibus mollis interdum."),alert_3:new Alert("Consectetur Ipsum.")},dataTraffic={hourly:{labels:["0-2","2-4","4-6","6-8","8-10","10-12","12-14","14-16","16-18","18-20","20-22","22-24"],datasets:[{data:[2,6,1,3,7,4,6,1,5,4,2,0,1],backgroundColor:["rgba(75, 74, 177, .2)"],borderColor:["rgba(96, 97, 177,1)"],borderWidth:1,lineTension:0,pointBackgroundColor:"rgba(255,255,255,1)",pointBorderWidth:2,pointRadius:6}]},daily:{labels:["S","M","T","W","T","F","S"],datasets:[{data:[50,100,75,125,180,90,200,190],backgroundColor:["rgba(75, 74, 177, .2)"],borderColor:["rgba(96, 97, 177,1)"],borderWidth:1,lineTension:0,pointBackgroundColor:"rgba(255,255,255,1)",pointBorderWidth:2,pointRadius:6}]},weekly:{labels:["16-22","23-29","30-5","6-12","13-19","20-26","27-3","4-10","11-17","18-24","25-31"],datasets:[{data:[500,1e3,750,1250,1800,900,2e3,1800,1100,1350,1700,1900],backgroundColor:["rgba(75, 74, 177, .2)"],borderColor:["rgba(96, 97, 177,1)"],borderWidth:1,lineTension:0,pointBackgroundColor:"rgba(255,255,255,1)",pointBorderWidth:2,pointRadius:6}]},monthly:{labels:["jan","feb","mar","apr","may","jun","jul","aug","sep","okt","nov","dec"],datasets:[{data:[2e3,3360,2550,3850,3e3,6050,5e3,6500,6600,4e3,4200,3e3,3200],backgroundColor:["rgba(75, 74, 177, .2)"],borderColor:["rgba(96, 97, 177,1)"],borderWidth:1,lineTension:0,pointBackgroundColor:"rgba(255,255,255,1)",pointBorderWidth:2,pointRadius:6}]}};dashboard.displayAll();