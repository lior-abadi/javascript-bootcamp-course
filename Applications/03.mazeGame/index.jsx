const {Engine, Render, Runner, World, Bodies} = Matter;

const width = 600;
const height = 600;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine, 
    options: {
        wireframes: true,
        width: width,
        height: height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);


// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40 , {isStatic: true}),
    Bodies.rectangle(width / 2, height, width, 40, {isStatic: true}),
    Bodies.rectangle(0, height / 2 , 40, height, {isStatic: true}),
    Bodies.rectangle(width, height / 2, 40, height, {isStatic: true})
];
World.add(world, walls)

// Maze Generation

const grid = []

for (let i = 0; i < 3; i++) {
   for (let j = 0; j < 3; j++) {
       
       
   }
    
}


