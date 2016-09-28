function Container(t,e){this.id=t,this.state=e}function Alert(t){this.text=t}function activateElement(t){function e(){n(),this.classList.add("active")}function n(){for(var t=0;t<i.length;t++)i[t].classList.remove("active")}for(var i=document.getElementsByClassName(t),r=0;r<i.length;r++)i[r].addEventListener("click",e)}function Dashboard(){var t=document.getElementById("app-notification");this.displayAll=function(){this.checkAlerts(alerts)},this.checkAlerts=function(e){amount=this.checkAmount(e),1===amount?text="Notification":text="Notifications",this.isEmpty(e)?this.hideAlerts():this.displayAlerts(),t.innerHTML="<p>"+amount+" "+text+"</p>"},this.displayAlerts=function(){var t=new Container("content-notifications","visible"),e=document.getElementById("main-content");t.createContainer(e);var n=t.id,i=alerts;this.renderInElement(n,i)},this.hideAlerts=function(){t.classList.remove("active")}}Container.prototype.createContainer=function(t){var e=document.createElement("section");e.setAttribute("id",this.id),e.setAttribute("data-state",this.state),t.appendChild(e)},Container.prototype.toHTML=function(){var t="<div";return t+=' id="'+this.id+'"',t+=' data-state="'+this.state+'"',t+=">",t+="</div>"},Alert.prototype.toHTML=function(){var t="<div";return t+=' class="alert"',t+=">",t+="<p><strong>Alert</strong>"+this.text+"</p>",t+='<button class="alert-button-close">Close alert</button>',t+="</div>"},Dashboard.prototype.renderInElement=function(t,e){var n=e,i=document.getElementById(t);for(var r in n)n.hasOwnProperty(r)&&(i.innerHTML+=n[r].toHTML())},Dashboard.prototype.checkAmount=function(t){var e=0,n;for(n in t)t.hasOwnProperty(n)&&e++;return e},Dashboard.prototype.isEmpty=function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0};var dashboard=new Dashboard,alerts={alert_1:new Alert("Donec sed odio dui.","visible"),alert_2:new Alert("Maecenas faucibus mollis interdum.","visible"),alert_3:new Alert("Consectetur Ipsum.","visible")};activateElement("nav-button"),dashboard.displayAll();