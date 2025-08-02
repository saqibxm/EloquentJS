function ReverseArray(array)
{
    // console.assert(typeof array == "array", "Expected an array as an argument!");
    // const reversed = [...array]; // copy into a new array
    let reversed = [];
    for(let i = array.length - 1; i >= 0; --i)
    {
        reversed.push(array[i]);
    }
    
    return reversed;
}

function ReverseInPlace(array)
{
    console.assert(array, "Expected a valid array!");

    for(let i = 0; i < array.length / 2; ++i)
    {
        const temp = array[i];
        array[i] = array[array.length - i - 1];
        array[array.length - i - 1] = temp;
    }

    return array;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
ReverseInPlace(array);

console.log("Reversed in-place:", array);
console.log("Reversed:", ReverseArray(array));