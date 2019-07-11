class Elevator {
    constructor() {
        this.topOf = document.getElementById('top-of');
        this.doorOpener = document.getElementById('door');
        this.lift = document.getElementById('lift');
        this.door = document.getElementById('elevator-door');
        this.liftMoving = '';
        this.callLiftButton = document.getElementById('test');
        this.floors = [];
        this.upOrDown = "";
        this.transition = "";
        //this.transitionTime = 0;
        this.initEventListeners();
        //this.sortDirection();
        //this.goToNextFloor();
    }

    //this method adds the button corresponding floor number to the floors array
    initEventListeners() {
        let elements = document.getElementsByClassName('floor-btn');
        //sortDirection();
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                this.floors.push(parseInt(elements[i].getAttribute('data-floor')));
            });
        }
    }


    //scan and sort floor array in order to prepare it for goToNextFloof func
    sortFloors() {
        this.goingUpOrDown();
        let floorsAbove = [];
        let floorsBelow = [];
        for (let j = 0; j < this.floors.length; j++) {
            if (this.floors[j] > this.whereIsLift()) {
                console.log("veci");
                floorsAbove.push(this.floors[j]);
            }
            else {
                floorsBelow.push(this.floors[j])
            }
        }
        floorsAbove.sort((a, b) => a - b);
        floorsBelow.sort((a, b) => b - a);

        if (this.upOrDown === "Up") {
            this.floors = floorsAbove.concat(floorsBelow);
        }
        else if (this.upOrDown === "Down") {
            this.floors = floorsBelow.concat(floorsAbove);
        }
    }
    //determine which direction will the elevator take at first use based on the first selected floor
    goingUpOrDown() {
        if (!(this.floors[0] - this.whereIsLift() === 0)) {
            if (this.whereIsLift() - this.floors[0] < 0) {
                this.upOrDown = "Up";
                console.log('innerUp');
            }
            else if (this.whereIsLift() - this.floors[0] > 0) {
                this.upOrDown = "Down";
                console.log('innerDown');
            }
        }
    }

    //close lift door
    closeLiftDoor() {
        if (this.door) {
            this.lift.classList.remove('door-openned');
        }
    }

    //open lift door
    openLiftDoor() {
        if (this.door) {
            this.lift.classList.add('door-openned');
        }
    }

    /*
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
    */

    goThroughFloors(callback) {
        this.sortFloors();
        setTimeout(this.callback(), this.transition);
    }



    goToFloor() {
        const self = this;
        this.closeLiftDoor();
        let floorSelector = ".floor" + self.floors[0];
        self.floors.shift();
        let floorToGoTo = document.querySelector(floorSelector).offsetTop;
        let curPos = this.lift.offsetTop;
        let transitionTime = Math.floor((Math.abs(curPos - floorToGoTo)) / 100);
        this.lift.style.transitionDuration = (transitionTime * 1.5) + 's';
        this.lift.style.top = floorToGoTo - 8 + 'px';
        this.transition = transitionTime * 1000;
        setTimeout(function () {
            self.openLiftDoor();
        }, transitionTime * 1600);


        console.log("The transitionTime is: " + transitionTime + "and the lift currentPositionis: " + curPos + "   floor1 offsetTop is:" + document.getElementById('floor1').offsetTop + " and floor5 offsetTop is" + document.getElementById('floor5').offsetTop);
    }




    whereIsLift() {
        let allFloors = document.getElementsByClassName("floor");
        for (let b = 0; b < allFloors.length; b++) {
            if (this.lift.offsetTop === allFloors[b].offsetTop) {
                return parseInt(allFloors[b].getAttribute("data-floor-nr"));
            }

        }
        // console.log(allFloors);

    }


}

var elevator = null;
window.addEventListener('load', () => {
    elevator = new Elevator();
    (function () {
        let doIt = setTimeout(this.scanFloors, 3000);
    })();
    //sortDirection();
});