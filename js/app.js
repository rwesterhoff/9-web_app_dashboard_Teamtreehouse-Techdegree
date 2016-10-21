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
    var alertsNotification = document.getElementById('app-notification'),
        alertsDropdown = document.getElementById('notification-dropdown');
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
        // alertsNotification.innerHTML = '<p>' + amount + ' ' + text + '</p>';
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
    this.setDropdownButton = function() {
        var toggleDropdown = function() {
            var toggleState = alertsDropdown.getAttribute('data-state');
            if (toggleState === 'hidden') {
                alertsDropdown.setAttribute('data-state', 'visible');
            } else {
                alertsDropdown.setAttribute('data-state', 'hidden');
            }
        };
        alertsNotification.addEventListener('click', toggleDropdown);
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
    this.setGraphics = function() {
        Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
        Chart.defaults.global.legend.display = false;
        Chart.defaults.global.legend.labels.boxWidth = 12;
        Chart.defaults.doughnut.legend.display = true;
        Chart.defaults.doughnut.legend.position = 'right';
        Chart.defaults.global.title.display = true;
        Chart.defaults.global.title.padding = 0;
        Chart.defaults.global.maintainAspectRatio = true;


        var trafficWidgetContainer = document.getElementById("line-widget").getContext("2d");
        var trafficWidget = new Chart(trafficWidgetContainer, {
            type: 'line',
            data: {
                labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
                datasets: [{
                    data: [500, 1000, 750, 1250, 1800, 900, 2000, 1800, 1100, 1350, 1700, 1900],
                    backgroundColor: ['rgba(75, 74, 177, .2)'],
                    borderColor: ['rgba(96, 97, 177,1)'],
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
        var dailyTrafficWidgetContainer = document.getElementById("bar-widget").getContext("2d"),
            dailyTrafficWidget = new Chart(dailyTrafficWidgetContainer, {
                type: 'bar',
                data: {
                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    datasets: [{
                        data: [50, 100, 75, 125, 180, 90, 200],
                        backgroundColor: 'rgba(96, 97, 177, 1)',
                        cornerRadius: 4
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
        var mobileUserWidgetContainer = document.getElementById("doughnut-widget").getContext("2d"),
            mobileUserWidget = new Chart(mobileUserWidgetContainer, {
                type: 'doughnut',
                data: {
                    labels: [
                        "Phone",
                        "Tablets",
                        "Desktop"
                    ],
                    datasets: [{
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(96, 97, 177)',
                            "#76D76D",
                            "#63A2B2"
                        ]
                    }]
                }
            });
    };
    this.setForm = function() {
        this.validateForm("message-form");
    };
    this.displayAll = function() {
        this.setStates("nav-button");
        this.setStates("filter-button");
        this.setAlerts(alerts);
        this.setDropdownButton();
        this.setGraphics();
        this.setGraphicsWidth('line-widget', 500);
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
Dashboard.prototype.setGraphicsWidth = function(element, size) {
    var intViewportWidth = window.innerWidth,
        responsiveWidth = function(element, size) {
            document.getElementById(element).setAttribute('width', size);
        };
    if (intViewportWidth < 768) {
        window.onresize = responsiveWidth(element, size);
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
    var formElement = 'form#' + form,
        thisForm = document.querySelector(formElement),
        inputText = document.querySelectorAll(formElement + ' input[type=text]'),
        textArea = document.querySelectorAll(formElement + ' textarea'),
        submitButton = document.querySelector(formElement + ' input[type=submit]'),
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
                element.insertBefore(node, submitButton);
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
