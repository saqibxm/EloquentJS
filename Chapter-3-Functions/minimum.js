function minimum(...numbers)
{
    let min = Infinity;
    for(let num of numbers)
    {
        if(num < min) min = num;
    }
    return min;
}

const numbers = [1, 57, 6, 88, 14, -34, 65, -9];
console.log("Minimum of numbers:", minimum(...numbers));