// The program will display a timer.
// Its border will be revoluting (dissappearing) synchronously with the remaining time.
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circleTimer = document.querySelector("#circle-timer");

const perimeter = circleTimer.getAttribute("r") * 2 * Math.PI;
circleTimer.setAttribute("stroke-dasharray", perimeter);

let duration;
let fraction;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
        console.log("Timer Started");
        
    },
    onTick(timeRemaining) {
        fraction = perimeter * timeRemaining / duration - perimeter;
        circleTimer.setAttribute("stroke-dashoffset", fraction);
    },
    onComplete() {
        circleTimer.setAttribute("stroke-dashoffset", 0);
        console.log("Completed!");
    }
});


