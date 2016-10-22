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
        alertsDropdown = document.getElementById('notification-dropdown'),
        dropDownTitle = document.getElementById('notification-title');

    this.setAlerts = function(obj) {
        amount = this.checkAmount(obj);

        if (this.isEmpty(obj)) {
            this.noNewNotifications();
            this.hideAlerts();
        } else {
            this.newNotifications();
            this.displayAlerts();
        }
        this.checkNewAlerts();
    };
    this.displayAlerts = function() {
        var container = 'content-notifications',
            html = alerts,
            setCloseButton = function() {
                var removeAlertsButtons = document.getElementsByClassName('alert-button-close'),
                    removeAlert = function() {
                        var elementToRemove = this.parentNode;
                        elementToRemove.setAttribute('data-state', 'hidden');
                        setTimeout(function() {
                            elementToRemove.parentNode.removeChild(elementToRemove);
                        }, 200);
                        amount -= 1;
                        if (amount === 0) {
                            dashboard.noNewNotifications();
                            dashboard.hideAlerts();
                        }
                        console.log(amount);
                        dashboard.checkNewAlerts();
                    };
                for (var i = 0; i < removeAlertsButtons.length; i++) {
                    removeAlertsButtons[i].addEventListener("click", removeAlert);
                }
            };
        this.renderInElement(container, html);
        setCloseButton();
    };
    this.checkNewAlerts = function() {
        if (amount === 0) {
            text = 'No new notifications'
            content = text;
        } else if (amount === 1) {
            text = 'new notification';
            content = amount + ' ' + text;
        } else {
            text = 'new notifications';
            content = amount + ' ' + text;
        }
        dropDownTitle.innerText = content;

    };
    this.hideAlerts = function() {
        var containerAlerts = document.getElementById('content-notifications');
        containerAlerts.setAttribute('data-state', 'hidden');
    };
    this.newNotifications = function() {
        alertsNotification.setAttribute('data-state', 'active');
    };
    this.noNewNotifications = function() {
        alertsNotification.setAttribute('data-state', 'inactive');
    };
    this.setDropdownButton = function(toggleButton, dropDown) {
        var toggleDropdown = function() {
            var toggleState = dropDown.getAttribute('data-state');
            if (toggleState === 'hidden') {
                dropDown.setAttribute('data-state', 'visible');
            } else {
                dropDown.setAttribute('data-state', 'hidden');
            }
        };
        toggleButton.addEventListener('click', toggleDropdown);
    };
    this.setGraphics = function() {
        var checkFilter = function() {
            var filters = document.querySelectorAll('.filter-button'),
                setWidget = function() {
                    var trafficWidgetContainer = document.getElementById("line-widget").getContext("2d"),
                        trafficWidget = new Chart(trafficWidgetContainer, {
                            type: 'line',
                            data: dataFilterred,
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
                };
            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i],
                    isActive = filter.getAttribute('data-state') === 'active';
                filter.addEventListener('click', checkFilter);
                if (isActive) {
                    var activeId = filter.id,
                        dataFilterred = dataTraffic[activeId];
                    setWidget();
                }
            }
        };
        var dailyTrafficWidgetContainer = document.getElementById("bar-widget").getContext("2d"),
            dailyTrafficWidget = new Chart(dailyTrafficWidgetContainer, {
                type: 'bar',
                data: dataDailyTraffic,
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
                data: dataMobileUser
            });
        checkFilter();
    };
    this.setForm = function() {
        this.validateForm("message-form");
    };
    this.displayAll = function() {
        this.setStates("nav-button");
        this.setStates("filter-button");
        this.setAlerts(alerts);
        this.setDropdownButton(alertsNotification, alertsDropdown);
        this.setGraphics();
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
Dashboard.prototype.customWidgetWidth = function(element, brkPoint, size) {
    var intViewportWidth = window.innerWidth;
    if (intViewportWidth < brkPoint) {
        function responsiveWidth(element, size) {
            document.getElementById(element).setAttribute('width', size);
        }
        window.onload = responsiveWidth(element, size);
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
                var node = document.createElement("P"),
                    textnode = document.createTextNode(message);
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
Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.legend.labels.boxWidth = 12;
Chart.defaults.doughnut.legend.display = true;
Chart.defaults.doughnut.legend.position = 'right';
Chart.defaults.global.title.display = true;
Chart.defaults.global.title.padding = 0;
Chart.defaults.global.maintainAspectRatio = true;

var dashboard = new Dashboard(),
    alerts = {
        alert_1: new Alert("Donec sed odio dui."),
        alert_2: new Alert("Lorum ipsum dolor sit amet. Maecenas faucibus mollis interdum."),
        alert_3: new Alert("Consectetur Ipsum.")
    },
    dataTraffic = {
        hourly: {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
            datasets: [{
                data: [2, 6, 1, 3, 7, 4, 6, 1, 5, 4, 2, 0, 1],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgba(96, 97, 177,1)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        daily: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            datasets: [{
                data: [50, 100, 75, 125, 180, 90, 200, 190],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgba(96, 97, 177,1)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        weekly: {
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
        monthly: {
            labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
            datasets: [{
                data: [2000, 3360, 2550, 3850, 3000, 6050, 5000, 6500, 6600, 4000, 4200, 3000, 3200],
                backgroundColor: ['rgba(75, 74, 177, .2)'],
                borderColor: ['rgba(96, 97, 177,1)'],
                borderWidth: 1,
                lineTension: 0,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        }
    },
    dataDailyTraffic = {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            data: [50, 100, 75, 125, 180, 90, 200],
            backgroundColor: 'rgba(96, 97, 177, 1)',
            cornerRadius: 4
        }, {
            data: [40, 90, 75, 110, 185, 95, 190],
            backgroundColor: "#76D76D",
            cornerRadius: 4
        }]
    },
    dataMobileUser = {
        labels: [
            "Phone",
            "Tablets",
            "Desktop",
            "Smart TV"
        ],
        datasets: [{
            data: [300, 50, 100, 25],
            backgroundColor: [
                'rgb(96, 97, 177)',
                "#76D76D",
                "#63A2B2",
                "#26649B"
            ]
        }]
    };

dashboard.customWidgetWidth('line-widget', 768, 750);
dashboard.customWidgetWidth('bar-widget', 768, 750);
dashboard.customWidgetWidth('doughnut-widget', 768, 750);
dashboard.displayAll();
