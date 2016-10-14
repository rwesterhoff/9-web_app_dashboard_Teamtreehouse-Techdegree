/* ====================================================================================== *\
    GLOBAL VARIABLES
*\ ====================================================================================== */



/* ====================================================================================== *\
    CONTROLS
*\ ====================================================================================== */
function Alert(text) {
    this.text = text;
}

Alert.prototype.toHTML = function() {
    var controlsHTML = '<div';
    controlsHTML += ' class="alert"';
    controlsHTML += ' data-state="visible"';
    controlsHTML += '>';
    controlsHTML += '<p><strong>Alert</strong>' + this.text + '</p>';
    controlsHTML += '<button class="alert-button-close">Close alert</button>';
    controlsHTML += '</div>';
    return controlsHTML;
};

/* ====================================================================================== *\
    DASHBOARD
*\ ====================================================================================== */
function Dashboard() {
    var alertsNotification = document.getElementById('app-notification');
    this.setAlerts = function(obj) {
        amount = this.checkAmount(obj);
        if (amount === 1) {
            text = 'Notification';
        } else {
            text = 'Notifications';
        }
        if (this.isEmpty(obj)) {
            this.hideNotifications();
            this.hideAlerts();
        } else {
            this.showNotifications();
            this.displayAlerts();
        }
        alertsNotification.innerHTML = '<p>' + amount + ' ' + text + '</p>';
    };
    this.displayAlerts = function() {
        var container = 'content-notifications',
            html = alerts;
        this.renderInElement(container, html);
        this.setCloseButton();
    };
    this.hideAlerts = function() {
        var containerAlerts = document.getElementById('content-notifications');
        containerAlerts.setAttribute('data-state', 'hidden');
    };
    this.showNotifications = function() {
        alertsNotification.setAttribute('data-state', 'active');
    };
    this.hideNotifications = function() {
        alertsNotification.setAttribute('data-state', 'inactive');
    };
    this.setCloseButton = function() {
        var removeAlertsButtons = document.getElementsByClassName('alert-button-close'),
            removeAlert = function() {
                var elementToRemove = this.parentNode;
                elementToRemove.setAttribute('data-state', 'hidden');
                setTimeout(function() {
                    elementToRemove.parentNode.removeChild(elementToRemove);
                }, 200);
                amount -= 1;
                if (amount === 0) {
                    dashboard.hideNotifications();
                    dashboard.hideAlerts();
                }
            };
        for (var i = 0; i < removeAlertsButtons.length; i++) {
            removeAlertsButtons[i].addEventListener("click", removeAlert);
        }
    };
    this.setForm = function() {
        this.validateForm("message-form");
    };
    this.displayAll = function() {
        this.setStates("nav-button");
        this.setStates("filter-button");
        this.setAlerts(alerts);
        this.setForm();
    };
}
Dashboard.prototype.setStates = function(selector) {
    var elementList = document.getElementsByClassName(selector),
        setToActive = function() {
            setToInactive();
            this.setAttribute('data-state', 'active');
        },
        setToInactive = function() {
            for (var i = 0; i < elementList.length; i++) {
                elementList[i].setAttribute('data-state', 'inactive');
            }
        };
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener("click", setToActive);
    }
};
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
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
};
Dashboard.prototype.isEmpty = function(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
};
Dashboard.prototype.validateForm = function(form) {
    var form = 'form#' + form,
        thisForm = document.querySelector(form),
        inputText = document.querySelectorAll(form + ' input[type=text]'),
        textArea = document.querySelectorAll(form + ' textarea'),
        submitButton = document.querySelector(form + ' input[type=submit]'),
        checkFormElements = function(element) {
            for (var i = 0; i < element.length; i++) {
                var isValid = element[i].checkValidity();
                if (isValid) {
                    element[i].removeAttribute('data-state', 'error');
                } else {
                    element[i].setAttribute('data-state', 'error');
                }
            }

        },
        checkEntireForm = function() {
            var formContainer = document.getElementById(thisForm.id),
                isValid = thisForm.checkValidity();
            if (isValid) {
                addMessage('Your message is successfully send!', 'send', formContainer);
            } else {
                addMessage('You might have missed something!', 'error', formContainer);
            }
        },
        addMessage = function(message, state, element) {
            var messageBox = document.querySelector('.message');
            if (messageBox) {
                messageBox.setAttribute('data-state', state);
                messageBox.innerText = message;
            } else {
                var node = document.createElement("P");
                var textnode = document.createTextNode(message);
                node.classList.add('message');
                node.setAttribute('data-state', state);
                node.appendChild(textnode);
                element.appendChild(node);
            }
        };
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        checkFormElements(inputText);
        checkFormElements(textArea);
        checkEntireForm();
    });
};

/* ====================================================================================== *\
    APP
*\ ====================================================================================== */

var dashboard = new Dashboard(),
    alerts = {
        alert_1: new Alert("Donec sed odio dui."),
        alert_2: new Alert("Lorum ipsum dolor sit amet. Maecenas faucibus mollis interdum."),
        alert_3: new Alert("Consectetur Ipsum.")
    };
dashboard.displayAll();
