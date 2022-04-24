// The program will display a timer.
// Its border will be revoluting (dissappearing) synchronously with the remaining time.

class Timer{
    constructor(durationInput, startButton, pauseButton){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;    

        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }

    // Arrow functions are used in order to allow the class to call inner functions.
    start = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    }
  
    pause = () => { 
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.durationInput.value > 0) {
            this.durationInput.value -= 1;
        } else {
            clearInterval(this.interval);
            this.durationInput.type = "string";
            this.durationInput.value = "Ding!";
        }
        
    }; 

}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButton);

