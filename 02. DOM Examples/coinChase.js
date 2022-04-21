function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}


const player = document.querySelector("#player")

window.addEventListener("keyup", function(e) {
    console.log(e.key)

    if (e.key === "ArrowDown" || e.key === "Down"){
        const curTop = getPos(player.style.top)
        player.style.top = `${curTop+50}px`
    }

    if (e.key === "ArrowUp" || e.key === "Up"){
        const curDown = getPos(player.style.top)
        player.style.top = `${curDown-50}px`
    }

    if (e.key === "ArrowRight" || e.key === "Right"){
        const curLeft = getPos(player.style.left)
        player.style.left = `${curLeft+50}px`
    }

    if (e.key === "ArrowLeft" || e.key === "Left"){
        const curRight = getPos(player.style.left)
        player.style.left = `${curRight-50}px`
    }

})

const getPos = (pos) => {
    if (!pos) return 100;
    return parseInt(pos.slice(0, -2))
}