/* ====================================================================================== *\
    GLOBAL VARIABLES
*\ ====================================================================================== */



/* ====================================================================================== *\
    CONTROLS
*\ ====================================================================================== */
function Container(id, state) {
    this.id = id;
    this.state = state;
}

Container.prototype.createContainer = function(parent) {
    var container = document.createElement('section');
    container.setAttribute('id', this.id);
    container.setAttribute('data-state', this.state);
    parent.appendChild(container);
};

Container.prototype.toHTML = function() {
    var controlsHTML = '<div';
    controlsHTML += ' id="' + this.id + '"';
    controlsHTML += ' data-state="' + this.state + '"';
    controlsHTML += '>';
    controlsHTML += '</div>';
    return controlsHTML;
};

function Alert(text) {
    this.text = text;
}

Alert.prototype.toHTML = function() {
    var controlsHTML = '<div';
    controlsHTML += ' class="alert"';
    controlsHTML += '>';
    controlsHTML += '<p><strong>Alert</strong>' + this.text + '</p>';
    controlsHTML += '<button class="alert-button-close">Close alert</button>';
    controlsHTML += '</div>';
    return controlsHTML;
};

function activateElement(selector) {
    var elementList = document.getElementsByClassName(selector);

    function makeActive() {
        makeOthersInactive();
        this.classList.add("active");
    }

    function makeOthersInactive() {
        for (var i = 0; i < elementList.length; i++) {
            elementList[i].classList.remove("active");
        }
    }

    for (var i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener("click", makeActive);
    }
}

/* ====================================================================================== *\
    DASHBOARD
*\ ====================================================================================== */
function Dashboard() {
    var alertsNotification = document.getElementById('app-notification');

    this.displayAll = function() {
        this.checkAlerts(alerts);
    };
    this.checkAlerts = function(obj) {
        amount = this.checkAmount(obj);
        if (amount === 1) {
            text = 'Notification';
        } else {
            text = 'Notifications';
        }
        if (this.isEmpty(obj)) {
            this.hideAlerts();
        } else {
            this.displayAlerts();
        }
        alertsNotification.innerHTML = '<p>' + amount + ' ' + text + '</p>';
        // If x button is clicked
        // Delete alert
    };
    this.displayAlerts = function() {
        var alertsContainer = new Container('content-notifications', 'visible'),
            parent = document.getElementById('main-content');
        alertsContainer.createContainer(parent);
        var container = alertsContainer.id,
            html = alerts;
        this.renderInElement(container, html);
    };
    this.hideAlerts = function() {
        alertsNotification.classList.remove('active');
    };
}
Dashboard.prototype.renderInElement = function(container, html) {
    var content = html,
        element = document.getElementById(container);
    for (var prop in content) {

        if (content.hasOwnProperty(prop)) {
            element.innerHTML += content[prop].toHTML();
        }
    }
};
Dashboard.prototype.checkAmount = function(obj) {
    var count = 0;
    var i;
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
};
Dashboard.prototype.isEmpty = function(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
};
/* ====================================================================================== *\
    APP
*\ ====================================================================================== */

var dashboard = new Dashboard(),
    alerts = {
        alert_1: new Alert("Donec sed odio dui.", 'visible'),
        alert_2: new Alert("Maecenas faucibus mollis interdum.", 'visible'),
        alert_3: new Alert("Consectetur Ipsum.", 'visible')
    };
activateElement("nav-button");
dashboard.displayAll();
