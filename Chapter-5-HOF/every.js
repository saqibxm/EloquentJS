function Every(array, test)
{
    for(let e of array)
        if(!test(e)) return false;

    return true;
}

function EverySome(array, test)
{
    return !array.some(e => !test(e)); // inversion of test and result
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log("All > 0:", Every(array, e => e > 0));
console.log("All > 0 using some:", EverySome(array, e => e > 0));