class Elevator {
    constructor() {
        this.topOf = document.getElementById('top-of');
        this.doorOpener = document.getElementById('door');
        this.lift = document.getElementById('lift');
        this.door = document.getElementById('elevator-door');
        this.liftMoving = '';
        this.callLiftButton = document.getElementById('test');
        this.initEventListeners();
        //this.goToNextFloor();
    }
    initEventListeners() {
        let elements = document.getElementsByClassName('floor-btn');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                this.goToFloor(elements[i]);
            });
        }
    }


    closeLiftDoor() {
        if (this.door) {
            this.lift.classList.remove('door-openned');
        }
    }
    openLiftDoor() {
        if (this.door) {
            this.lift.classList.add('door-openned');
        }
    }
    goToFloor(el) {
        console.log(el);
        this.liftMoving = true;
        this.closeLiftDoor();
        let currentPossiton = getComputedStyle(this.lift).top.slice(0, -2);
        let val = el.getAttribute('data-floor');
        this.lift.style.top = val + 'px';
        let transitionTime = Math.floor((Math.abs(currentPossiton - val)) / 100);
        this.lift.style.transitionDuration = transitionTime + 's';
        let self = this;
        setTimeout(function () {
            self.openLiftDoor();
        }, transitionTime * 1000);
    }


}
window.addEventListener('load', () => {
    let elevator = new Elevator();
})