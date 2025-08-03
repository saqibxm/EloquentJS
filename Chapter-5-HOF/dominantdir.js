import SCRIPTS from "./scripts.js";

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.find(c => c.name == name);
        if (!known) {
            counts.push({ name, count: 1 });
        } else {
            known.count++;
        }
    }
    return counts;
}

function dominantDirection(text)
{
    let directions = countBy(text, char => {
        return characterScript(char.codePointAt(0))?.direction ?? "unknown";
    }).filter(({name}) => name !== "unknown");

    if(!directions.length)
        return "No direction";
    
    return directions.reduce((previous, current) => current.value < previous.value ? previous : current).name;
}

// directions.reduce((current, ({name, value}) => ...)

console.log(dominantDirection("Hello!")); // ltr
console.log(dominantDirection("Hey, مساء الخير")); // rtl