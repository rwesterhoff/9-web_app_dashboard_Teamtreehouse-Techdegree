function Alert(t){this.text=t}function Dashboard(){var t=document.getElementById("app-notification");this.setAlerts=function(e){amount=this.checkAmount(e),1===amount?text="Notification":text="Notifications",this.isEmpty(e)?(this.hideNotifications(),this.hideAlerts()):(this.showNotifications(),this.displayAlerts()),t.innerHTML="<p>"+amount+" "+text+"</p>"},this.displayAlerts=function(){var t="content-notifications",e=alerts;this.renderInElement(t,e),this.setCloseButton()},this.hideAlerts=function(){var t=document.getElementById("content-notifications");t.setAttribute("data-state","hidden")},this.showNotifications=function(){t.setAttribute("data-state","active")},this.hideNotifications=function(){t.setAttribute("data-state","inactive")},this.setCloseButton=function(){for(var t=document.getElementsByClassName("alert-button-close"),e=function(){var t=this.parentNode;t.setAttribute("data-state","hidden"),setTimeout(function(){t.parentNode.removeChild(t)},200),amount-=1,0===amount&&(dashboard.hideNotifications(),dashboard.hideAlerts())},n=0;n<t.length;n++)t[n].addEventListener("click",e)},this.displayAll=function(){this.setStates("nav-button"),this.setStates("filter-button"),this.setAlerts(alerts)}}Alert.prototype.toHTML=function(){var t="<div";return t+=' class="alert"',t+=' data-state="visible"',t+=">",t+="<p><strong>Alert</strong>"+this.text+"</p>",t+='<button class="alert-button-close">Close alert</button>',t+="</div>"},Dashboard.prototype.setStates=function(t){for(var e=document.getElementsByClassName(t),n=function(){i(),this.setAttribute("data-state","active")},i=function(){for(var t=0;t<e.length;t++)e[t].setAttribute("data-state","inactive")},s=0;s<e.length;s++)e[s].addEventListener("click",n)},Dashboard.prototype.renderInElement=function(t,e){var n=e,i=document.getElementById(t);for(var s in n)n.hasOwnProperty(s)&&(i.innerHTML+=n[s].toHTML())},Dashboard.prototype.checkAmount=function(t){var e=0;for(var n in t)t.hasOwnProperty(n)&&e++;return e},Dashboard.prototype.isEmpty=function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0};var dashboard=new Dashboard,alerts={alert_1:new Alert("Donec sed odio dui."),alert_2:new Alert("Lorum ipsum dolor sit amet. Maecenas faucibus mollis interdum."),alert_3:new Alert("Consectetur Ipsum.")};dashboard.displayAll();