
let topOf = document.getElementById('top-of');
let doorOpener = document.getElementById('door');
let lift = document.getElementById('lift');
let door = document.getElementById('elevator-door');
let liftMoving = '';
let callLiftButton = document.getElementById('test');


door.addEventListener('transitionend', () => {
    event.stopPropagation();
});
topOf.addEventListener('transitionend', () => {
    event.stopPropagation();
});

const closeLiftDoor = () => {
    door.style.width = 100 + '%';
}
const openLiftDoor = () => {
    door.style.width = 0;
    
}

const goToFloor = (el) => {
    liftMoving = true;
    closeLiftDoor();
    let currentPossiton = getComputedStyle(lift).top.slice(0, -2);
    let val = el.getAttribute('data-floor');
    lift.style.top = val + 'px';
    lift.style.transition = Math.floor((Math.abs(currentPossiton - val)) / 100) + 's';
    lift.style.transitionDelay = 600 + 'ms';
    lift.addEventListener('transitionend', () => {
        openLiftDoor();
        console.log('completed');
        event.stopPropagation();
        liftMoving = false;
    });
       
}



