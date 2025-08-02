function Prepend(list, value)
{
    const node = { value, rest: list };
    return node;
}

function ArrayToList(array)
{
    let list = null;
    for(let e of array.reverse())
    {
        list = Prepend(list, e);
    }

    return list;
}

function ListToArray(list)
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

function NthElement(list, n)
{
    let node = {...list};
    for(let i = 0; i < n && node; ++i)
        node = node.rest;
    
    return node?.value; // value, undefined otherwise
}

function NthRecursive(node, n)
{
    if(n == 0 || node == undefined) return node?.value;
    return NthRecursive(node.rest, n - 1);
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
const list = ArrayToList(array);

console.log("Converted to List:", list);
console.log("Converted to Array:", ListToArray(list));
console.log("Element at Index 5:", NthElement(list, 5));
console.log("Element at Index 5 Recursively:", NthRecursive(list, 5));