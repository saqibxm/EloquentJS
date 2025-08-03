function rangeOld(lo, hi, step = 1)
{
    if(hi == undefined)
    {
        hi = lo;
        lo = 0;
    }

    const increasing = lo <= hi;

    if(!increasing && step >=1) step = -step;

    console.assert((lo <= hi && step >= 1) || (lo > hi && step < 0), "Invalid value for step, given the range progression!");
    const ret = [];

    let c = lo;
    while(increasing ? c <= hi : c >= hi)
    {
        ret.push(c);
        c += step;
    }

    return ret;
}

function range(lo, hi, step = lo < hi ? 1 : -1)
{
    if(hi == undefined) // range(N)
    {
        hi = lo;
        lo = 0;
    }
    
    console.assert((lo <= hi && step >= 1) || (lo > hi && step < 0), "Invalid value for step, given the range progression!");
    const ret = [];
    
    const decreasing = lo > hi;
    if(decreasing)
    {
        const temp = hi;
        hi = lo;
        lo = temp;
        step = Math.abs(step);
    }

    for(let c = lo ;c <= hi; c += step)
    {
        ret.push(c);
    }

    return decreasing ? ret.reverse() : ret;
}

function sum(array)
{
    let sum = 0;
    for(let e of array)
        sum += e;
    return sum;
}

console.log("Ascending Range:", range(0, 100));
console.log("Descending Range:", range(100, 0, -2));