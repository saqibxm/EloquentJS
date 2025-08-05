function Graph(paths)
{
    function addEdge(from, to, graph)
    {
        if(from in graph) graph[from].push(to);
        else graph[from] = [to];
    }

    for(let {from, to} of paths)
    {
        addEdge(from, to, this);
        addEdge(to, from, this);
    }
} Graph.prototype = null;


function buildGraph(roads)
{
    roads = roads.map(p => {
        const [from, to] = p.split('-');
        return { from, to };
    });

    return new Graph(roads);
}

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

const roadGraph = buildGraph(roads);

class VillageState
{
    constructor(place, parcels)
    {
        this.place = place; // current position of the robot
        this.parcels = parcels; // the location of all active parcels
    }

    move(destination) // the new position to proceed to
    {
        if(!roadGraph[this.place].includes(destination))
            return this; // cannot proceed since no link
        else
        {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p;
                else return { place: destination, address: p.address };
            }).filter(p => p.address != p.place); // drop parcels who have reached their address
            // cannot compare against this.place because what if the parcel wasnt picked up yet

            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

/*
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office
*/

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

// runRobot(VillageState.random(), randomRobot, null)

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
]; // mail delivery truck's route, covers entire village

Object.freeze(mailRoute);

function routeRobot(state, memory)
{
    if(!memory || memory.length === 0) memory = mailRoute; // follow the route twice

    // return { direction: memory.shift(), memory }; // modifes the original mailRoute
    return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, mailRoute);

function findRoute(graph, from, to) // breadth/depth first search
{
    // route is the path we followed to reach the place denoted by "at"
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route)
{
    if(route.length === 0)
    {
        let parcel = parcels[0];
        if(parcel.place != place)
        {
            // console.debug(`[ISSUED] from: '${parcel.place}' to: '${parcel.address}'`);
            route = findRoute(roadGraph, place, parcel.place);
        }
        else
        {
            // console.debug(`[PICKED] from: '${parcel.place}' to: '${parcel.address}'`)
            route = findRoute(roadGraph, parcel.place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), goalOrientedRobot, []);

/* EXERCISES */
// 1
function countTurns(state, robot, memory)
{
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function compareRobots(first, firstMemory, second, secondMemory)
{

    const iterations = 100;
    let firstTotal = 0, secondTotal = 0;
    for(let i = 0; i < iterations; ++i)
    {
        // console.debug("Running Iteration:", i);
        let task = VillageState.random();
        firstTotal += countTurns(task, first, firstMemory);
        secondTotal += countTurns(task, second, secondMemory);
    }

    return { first: firstTotal / iterations, second: secondTotal / iterations };
}

function benchmarkRobots(robot1, robot2)
{
    let result = compareRobots(robot1, [], robot2, []);
    console.log(
        "First robot took", result.first, "average steps",
        "\nwhile second robot took", result.second
    );
}

function formDifficultState(robot, nParcels, memory)
{
    /*
    function countTurns(state, robot, memory)
    {
        for (let turn = 0;; turn++) {
            if (state.parcels.length == 0) {
                return turn;
            }
            let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
        }
    } */
    let tests = [];
    for(let i = 0; i < 100; ++i)
    {
        let state = VillageState.random(Math.ceil(Math.random() * nParcels));
        let steps = countTurns(state, robot, memory);

        tests.push({ state, steps });
    }

    return tests.reduce((prev, curr) => prev.steps > curr.steps ? prev : curr);
}

let diff = formDifficultState(goalOrientedRobot, 5, []);
console.log("Most difficult path:", diff);

console.log(roadGraph);
runRobot(diff.state, goalOrientedRobot, []);

function fastRobot({place, parcels}, route)
{
    function ParcelData(parcel, route, pickUp)
    {
        this.parcel = parcel;
        this.route = route;
        this.cost = route.length - (pickUp ? 0.5 : 0);
        this.pick = pickUp;
    } ParcelData.prototype = null;

    if(route.length === 0)
    {
        let paths = parcels.map(p => {
            if(place != p.place)
                return new ParcelData(p, findRoute(roadGraph, place, p.place), true);
            else return new ParcelData(p, findRoute(roadGraph, p.place, p.address), false);
        });

        // prioritize pick ups
        if(paths.some(p => p.pick == true))
        {
            route = paths.filter(p => p.pick).reduce((prev, curr) => prev.cost < curr.cost ? prev : curr).route;    
        }
        else
        route = paths.reduce((prev, curr) => prev.cost < curr.cost ? prev : curr).route;    
    }
    return { direction: route[0], memory: route.slice(1) };
}

benchmarkRobots(fastRobot, goalOrientedRobot);

// console.log("fast robot completes in",countTurns(diff.state, fastRobot, []), "turns");

// benchmarkRobots(routeRobot, goalOrientedRobot);

/*
for(let [from, to] of paths.map(p => p.split('-')))
    {
        addEdge(from, to);
        addEdge(to, from);
    }
*/