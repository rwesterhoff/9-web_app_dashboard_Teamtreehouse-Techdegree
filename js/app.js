/* ====================================================================================== *\
    OBJECTS
*\ ====================================================================================== */
function Alert(text) {
    this.text = text;
}

Alert.prototype.toHTML = function() {
    var controlsHTML = '<div class="alert" data-state="visible">';
    controlsHTML += '<p><strong>Alert</strong>' + this.text + '</p>';
    controlsHTML += '<button class="alert-button-close">Close alert</button>';
    controlsHTML += '</div>';
    return controlsHTML;
};

function NewMember(key) {
    this.firstName = key.firstName;
    this.lastName = key.lastName;
    this.avatarSrc = key.avatarSrc;
    this.memberSince = key.memberSince;
    this.emailAdress = key.emailAdress;
}

NewMember.prototype.toHTML = function() {
    var newMembersHTML = '<li class="new-member">';
    newMembersHTML += '<img src="img/' + this.avatarSrc + '" alt="" class="profile-image">';
    newMembersHTML += '<p class="member-name">' + this.firstName + ' ' + this.lastName;
    newMembersHTML += '<br>';
    newMembersHTML += '<a href="" class="member-email">' + this.emailAdress + '</a>';
    newMembersHTML += '</p>';
    newMembersHTML += '<span class="date-added">' + this.memberSince + '</span>';
    newMembersHTML += '</li>';
    return newMembersHTML;
};

function Activity(key) {
    this.firstName = key.firstName;
    this.lastName = key.lastName;
    this.avatarSrc = key.avatarSrc;
    this.recentActivity = key.recentActivity;
    this.activityTime = key.activityTime;
}

Activity.prototype.toHTML = function() {
    var recentActivityHTML = '<li class="recent-activity">';
    recentActivityHTML += '<a href="">';
    recentActivityHTML += '<img src="img/' + this.avatarSrc + '" alt="Profile image of ' + this.firstName + ' " class="profile-image">';
    recentActivityHTML += '<p class="member-activity">' + this.firstName + ' ' + this.lastName + ' ' + this.recentActivity;
    recentActivityHTML += '<br>';
    recentActivityHTML += '<span class="date-added">' + this.activityTime + '</span>';
    recentActivityHTML += '</p>';
    recentActivityHTML += '</a>';
    recentActivityHTML += '</li>';
    return recentActivityHTML;
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
        this.displayModule('content-notifications', alerts);
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
        setCloseButton();
    };
    this.checkNewAlerts = function() {
        if (amount === 0) {
            text = 'No new notifications';
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
    this.displayModule = function(id, html) {
        var container = id,
            content = html;
        this.renderInElement(container, content);
    };
    this.setForm = function() {
        this.validateForm("message-form");
    };
    this.setAutoSuggest = function() {
        var searchField = document.getElementById('search-user'),
            suggestDropDown = document.getElementById('suggest-list'),
            compareValueWithSuggestList = function() {
                var searchValue = searchField.value,
                    searchResult = [],
                    suggestHTML = '',
                    assembleMemberList = function(obj) {
                        var people = [];
                        for (var prop in obj) {
                            if (obj[prop].lastName === '') {
                                var member = obj[prop].firstName;
                            } else {
                                var member = obj[prop].firstName + ' ' + obj[prop].lastName;
                            }
                            people.push(member);
                        }
                        return people;
                    },
                    populateDropDown = function() {
                        for (i = 0; i < suggestList.length; i++) {
                            var listItem = suggestList[i];
                            if (listItem.toLowerCase().indexOf(searchValue.toLowerCase()) < 0 || searchValue === '' || searchValue === ' ') {
                                // do nothing
                            } else {
                                suggestHTML += '<li class="list-member">';
                                suggestHTML += '<a href="">';
                                suggestHTML += listItem;
                                suggestHTML += '</a>';
                                suggestHTML += '</li>';
                                searchResult.push(listItem);
                            }
                        }
                        toggleDropdown();
                    },
                    toggleDropdown = function() {
                        suggestDropDown.innerHTML = suggestHTML;
                        if (suggestDropDown.hasChildNodes()) {
                            suggestDropDown.setAttribute('data-state', 'visible');
                        } else {
                            suggestDropDown.setAttribute('data-state', 'hidden');
                        }
                        updateInput();
                    },
                    updateInput = function() {
                        var dropDownChildren = suggestDropDown.childNodes,
                            injectInput = function(event) {
                                event.preventDefault();
                                searchField.value = this.innerText;
                                suggestDropDown.setAttribute('data-state', 'hidden');
                            };
                        for (var i = 0; i < dropDownChildren.length; i++) {
                            console.log(dropDownChildren[i]);
                            dropDownChildren[i].addEventListener("click", injectInput);
                        }
                    },
                    suggestList = assembleMemberList(memberList);
                populateDropDown();
            };
        searchField.addEventListener('keyup', compareValueWithSuggestList);

    };
    this.setLocalStorage = function() {
        var buttonSave = document.getElementById('button-save'),
            buttonCancel = document.getElementById('button-cancel'),
            emailSwitch = document.getElementById('switch-email'),
            publicSwitch = document.getElementById('switch-public'),
            storageAvailable = function(type) {
                try {
                    var storage = window[type],
                        x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            getLocalStorage = function() {
                if (!localStorage.emailSettings || !localStorage.publicSettings || !localStorage.timeZoneSettings) {
                    populateStorage();
                } else {
                    setSettings();
                }
            },
            setSettings = function() {
                //Set email
                if (localStorage.emailSettings === "true") {
                    emailSwitch.checked = true;
                } else {
                    emailSwitch.checked = false;
                }
                //Set public profile
                if (localStorage.publicSettings === "true") {
                    publicSwitch.checked = true;
                } else {
                    publicSwitch.checked = false;
                }
                //Set timezone
                if (localStorage.timeZoneSettings) {
                    document.getElementById('select-timezone').selectedIndex = parseInt(localStorage.timeZoneSettings);
                }
            },
            populateStorage = function() {
                //Get email
                if (emailSwitch.checked) {
                    localStorage.emailSettings = "true";
                } else {
                    localStorage.emailSettings = "false";
                }
                //Get public profile
                if (publicSwitch.checked) {
                    localStorage.publicSettings = "true";
                } else {
                    localStorage.publicSettings = "false";
                }
                //Get timezone
                localStorage.timeZoneSettings = document.getElementById('select-timezone').selectedIndex;
                setSettings();
            };
        if (storageAvailable('localStorage')) {
            getLocalStorage();
        }
        buttonSave.addEventListener('click', function(e) {
            e.preventDefault();
            populateStorage();
        });
    };
    this.displayAll = function() {
        this.setStates("nav-button");
        this.setStates("filter-button");
        this.setAlerts(alerts);
        this.setDropdownButton(alertsNotification, alertsDropdown);
        this.setGraphics();
        this.displayModule('member-list', members);
        this.displayModule('activity-list', activity);
        this.setForm();
        this.setAutoSuggest();
        this.setLocalStorage();
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
    var intViewportWidth = window.innerWidth,
        responsiveWidth = function(element, size) {
            document.getElementById(element).setAttribute('width', size);
        };
    if (intViewportWidth < brkPoint) {
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
    },
    memberList = {
        rem: {
            firstName: "Rem",
            lastName: "",
            avatarSrc: "avatar-rem.jpg",
            memberSince: "10/15/15",
            emailAdress: "rem128@example.com",
            recentActivity: "commented on YourApp's SEO tips",
            activityTime: "4 hours ago"
        },
        adelle: {
            firstName: "Adelle",
            lastName: "Charles",
            avatarSrc: "avatar-adelle.jpg",
            memberSince: "10/14/15",
            emailAdress: "adelle.charles@example.com",
            recentActivity: "likes the post 'Facebook Changes for 2016'",
            activityTime: "5 hours ago"
        },
        mizko: {
            firstName: "Mizko",
            lastName: "",
            avatarSrc: "avatar-mizko.jpg",
            memberSince: "10/13/15",
            emailAdress: "mizko87@example.com",
            recentActivity: "commented on 'Facebook Changes for 2016'",
            activityTime: "5 hours ago"
        },
        tony: {
            firstName: "Tony",
            lastName: "Stubblebine",
            avatarSrc: "avatar-tony.jpg",
            memberSince: "10/12/15",
            emailAdress: "tony.stubble@example.com",
            recentActivity: "commented on YourApp's SEO tips",
            activityTime: "1 day ago"
        }
    },
    members = {
        member_1: new NewMember(memberList.rem),
        member_2: new NewMember(memberList.adelle),
        member_3: new NewMember(memberList.mizko),
        member_4: new NewMember(memberList.tony)
    },
    activity = {
        activity_1: new Activity(memberList.rem),
        activity_2: new Activity(memberList.adelle),
        activity_3: new Activity(memberList.mizko),
        activity_4: new Activity(memberList.tony)
    };

dashboard.customWidgetWidth('line-widget', 768, 750);
dashboard.customWidgetWidth('bar-widget', 768, 750);
dashboard.customWidgetWidth('doughnut-widget', 768, 750);
dashboard.displayAll();

console.log(amount);

/*TODO
Hide dropdown if click outside it
Make alerts dropdown filled dynamically
Set accessible focusstates*/
