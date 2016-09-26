function activateElement(selector) {
    var elementList = document.getElementsByClassName(selector);
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener("click", makeActive);
    }

    function makeActive() {
        makeOthersInactive();
        this.classList.add("active");
    }

    function makeOthersInactive() {
        for (var i = 0; i < elementList.length; i++) {
            elementList[i].classList.remove("active");
        }
    }
}

activateElement("nav-button");
