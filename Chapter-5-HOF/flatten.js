function flatten(array)
{
    return array.reduce((current, inner) => {
        return current.concat(inner);
    }, []);
}

let array = [[1, 2, 3, 4, 5], [6, 7, 8], [9, 10]];
console.log("Flattened:", flatten(array));