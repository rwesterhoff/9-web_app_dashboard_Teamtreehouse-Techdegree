var buttonSave = document.getElementById('button-save'),
    buttonCancel = document.getElementById('button-cancel'),
    emailSwitch = document.getElementById('switch-email'),
    publicSwitch = document.getElementById('switch-public');

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

if (storageAvailable('localStorage')) {
    getLocalStorage();
}


function getLocalStorage() {
    if (!localStorage.getItem('emailSettings')) {
        populateStorage();
    } else {
        setSettings();
    }
}

function setSettings() {
    var currentEmailSettings = localStorage.getItem('emailSettings');
    console.log('real emailSettings: ' + localStorage.getItem('emailSettings'));
    if (currentEmailSettings == true) {
        emailSwitch.setAttribute('checked', 'checked');
        console.log('attribute added');
        console.log('set to TRUE');
    } else if (currentEmailSettings == false) {
        emailSwitch.removeAttribute('checked');
        console.log('attribute removed');
        console.log('set to FALSE');
    }
}

function populateStorage() {
    var emailIsChecked = function() {
        if (emailSwitch.checked) {
            return true;
        } else {
            return false;
        }
    };
    localStorage.setItem('emailSettings', emailIsChecked());
    console.log('real emailSettings: ' + localStorage.getItem('emailSettings'));

    setSettings();
}



buttonSave.addEventListener('click', function(e) {

    e.preventDefault();
    populateStorage();
});
