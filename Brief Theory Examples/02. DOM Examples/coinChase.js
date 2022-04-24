const player = document.querySelector("#player")
const coin = document.querySelector("#coin")
const scoreChart = document.querySelector('h1')
let score = 0;

window.addEventListener("keydown", function(e) {
    if (e.key === "ArrowDown" || e.key === "Down"){
        movement(player, 50, 'y');
    }

    if (e.key === "ArrowUp" || e.key === "Up"){
        movement(player, -50, 'y');
    }

    if (e.key === "ArrowRight" || e.key === "Right"){
        movement(player, 50, 'x');
    }

    if (e.key === "ArrowLeft" || e.key === "Left"){
        movement(player, -50, 'x');
    }

    const playerPos = [getPos(player.style.top), getPos(player.style.left)]
    const coinPos   = [getPos(coin.style.top), getPos(coin.style.left)]

    let yMatch = (Math.abs(playerPos[0] - coinPos[0])) < 51
    let xMatch = (Math.abs(playerPos[1] - coinPos[1])) < 51
    
    if(yMatch && xMatch){
        moveCoin();
        score += 1;
        scoreChart.innerText = `Current Score: ${score}`;
    }
})

const movement = (element, amount, axis) => {
    if (axis === 'x'){
        const curLeft = getPos(element.style.left)
        element.style.transform = 'scale(1,1)'
        element.style.left = `${curLeft+amount}px`
    }

    if (axis === 'y'){
        const curTop = getPos(element.style.top)
        element.style.top = `${curTop+amount}px`
    }
}

const getPos = (pos) => {
    if (!pos) return 100;
    return parseInt(pos.slice(0, -2))
}

const moveCoin = () => {
    const y = Math.floor(Math.random() * window.innerHeight)
    const x = Math.floor(Math.random() * window.innerWidth)
    coin.style.top = `${y}px`
    coin.style.left = `${x}px`
}
moveCoin();