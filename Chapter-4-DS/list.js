function prepend(list, value)
{
    const node = { value, rest: list };
    return node;
}

function arrayToList(array)
{
    let list = null;
    for(let i = array.length - 1; i >= 0; --i)
        list = prepend(list, array[i]);

    return list;
}

function arrayToListOld(array)
{
    let list = null;
    for(let e of array.reverse())
    {
        list = prepend(list, e);
    }

    return list;
}

function listToArray(list)
{
    console.assert(list, "Required a valid list node/object!")
    let node = {...list};
    const array = [];

    while(node != null)
    {
        array.push(node.value);
        node = node.rest;
    }

    return array;
}

function nthElement(list, n)
{
    let node = {...list};
    for(let i = 0; i < n && node; ++i)
        node = node.rest;
    
    return node?.value; // value, undefined otherwise
}

function nthRecursive(node, n)
{
    if(n == 0 || node == undefined) return node?.value;
    return nthRecursive(node.rest, n - 1);
}

/*
function NthRecursiveFancy(node, n)
{
    function Nth(node, n)
    {
        if(n != 0) return null;
    }
}
*/

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const list = arrayToList(array);

console.log("Converted to List:", list);
console.log("Converted to Array:", listToArray(list));
console.log("Element at Index 5:", nthElement(list, 5));
console.log("Element at Index 5 Recursively:", nthRecursive(list, 5));