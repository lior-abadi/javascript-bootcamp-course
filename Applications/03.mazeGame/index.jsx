const {Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine, 
    options: {
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
    Bodies.rectangle(400,0,800,40, {isStatic: true}),
    Bodies.rectangle(400,600,800,40, {isStatic: true}),
    Bodies.rectangle(0,300,40,600, {isStatic: true}),
    Bodies.rectangle(800,300,40,600, {isStatic: true})
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
        shape = Bodies.circle(x,y, 35);
    }

    World.add(world, shape);

}
