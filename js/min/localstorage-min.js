function storageAvailable(e){try{var t=window[e],l="__storage_test__";return t.setItem(l,l),t.removeItem(l),!0}catch(e){return!1}}function getLocalStorage(){localStorage.emailSettings&&localStorage.publicSettings&&localStorage.timeZoneSettings?setSettings():populateStorage()}function setSettings(){"true"===localStorage.emailSettings?emailSwitch.checked=!0:emailSwitch.checked=!1,"true"===localStorage.publicSettings?publicSwitch.checked=!0:publicSwitch.checked=!1,localStorage.timeZoneSettings&&(document.getElementById("select-timezone").selectedIndex=parseInt(localStorage.timeZoneSettings))}function populateStorage(){emailSwitch.checked?localStorage.emailSettings="true":localStorage.emailSettings="false",publicSwitch.checked?localStorage.publicSettings="true":localStorage.publicSettings="false",localStorage.timeZoneSettings=document.getElementById("select-timezone").selectedIndex,setSettings()}var buttonSave=document.getElementById("button-save"),buttonCancel=document.getElementById("button-cancel"),emailSwitch=document.getElementById("switch-email"),publicSwitch=document.getElementById("switch-public");storageAvailable("localStorage")&&getLocalStorage(),buttonSave.addEventListener("click",function(e){e.preventDefault(),populateStorage()});