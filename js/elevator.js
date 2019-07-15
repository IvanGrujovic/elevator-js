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
        this.startTheElevator();
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
    startTheElevator() {
        let self = this;
        let buttons = document.getElementsByTagName('button');
        for (let a = 0; a < buttons.length; a++) {
            buttons[a].addEventListener('click', () => {
                if (!this.liftMoving) {
                    this.goThroughFloors();
                }
            });
        }
    }

    //scan and sort floor array in order to prepare it for goToNextFloor func
    sortFloors() {
        this.goingUpOrDown();
        let floorsAbove = [];
        let floorsBelow = [];
        for (let j = 0; j < this.floors.length; j++) {
            if (this.floors[j] > this.whereIsLift()) {
                // console.log("veci");
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

    goThroughFloors() {
        var self = this;
        console.log(this.floors);
        if (this.floors.length !== 0) {
            this.sortFloors();
            this.goToFloor();
            setTimeout(function () { self.goThroughFloors() }, self.transition + 2000);
        }




        else {
            clearTimeout(this.goThroughFloors, 2000);
            this.liftMoving = false;
            return true;
        }
    }



    goToFloor() {
        this.closeLiftDoor();
        this.liftMoving = true;
        let floorSelector = ".floor" + this.floors[0];
        this.floors.shift();
        let floorToGoTo = document.querySelector(floorSelector).offsetTop;
        let curPos = this.lift.offsetTop;
        let transitionTime = Math.floor((Math.abs(curPos - floorToGoTo)) / 100);
        this.lift.style.transitionDuration = (transitionTime * 1.5) + 's';
        this.lift.style.top = floorToGoTo - 8 + 'px';
        this.transition = transitionTime * 3000;
        var self = this;
        setTimeout(function () {
            self.openLiftDoor();
        }, (transitionTime * 1000) + 2000);


        //console.log("The transitionTime is: " + transitionTime + " and the lift currentPositionis: " + curPos + "   floor1 offsetTop is: " + document.getElementById('floor1').offsetTop + " and floor5 offsetTop is" + document.getElementById('floor5').offsetTop);
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