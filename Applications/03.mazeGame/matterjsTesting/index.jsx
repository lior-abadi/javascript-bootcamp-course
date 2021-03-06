const {Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine, 
    options: {
        wireframes: false,
        width: width,
        height: height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}))

// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40 , {isStatic: true}),
    Bodies.rectangle(width / 2, height, width, 40, {isStatic: true}),
    Bodies.rectangle(0, height / 2 , 40, height, {isStatic: true}),
    Bodies.rectangle(width, height / 2, 40, height, {isStatic: true})
];
World.add(world, walls)

// Entities
for (let i = 0; i < 50; i++) {
    let shape;
    let x = Math.floor( Math.random() * width + 1);
    let y = Math.floor( Math.random() * height + 1);

    if (Math.random() > 0.5) {
        shape = Bodies.rectangle(x,y,50,50, {isStatic: false});   
    } else {
        shape = Bodies.circle(x,y, 35, {
            render:{
                fillStyle: "white"
            }
        });
    }

    World.add(world, shape);

}
