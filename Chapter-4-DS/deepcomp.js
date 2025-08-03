function deepEqualOld(lhs, rhs)
{
    if((lhs && rhs) && (typeof lhs == 'object' && typeof rhs == 'object'))
        return lhs === rhs;
    
    const keys = Object.keys(lhs);
    let propCount = 0;

    for(let key in rhs)
    {
        ++propCount;
        if(lhs[key] != rhs[key])
            return false;
    }

    return propCount == keys.length;
}

function deepEqual(lhs, rhs)
{
    if((lhs && rhs) && (typeof lhs == 'object' && typeof rhs == 'object'))
    {
        const keys = Object.keys(lhs);
        let propCount = 0; // proprtyCount of rhs

        for(let key of keys)
        {
            ++propCount;
            if(key in lhs && deepEqual(lhs[key], rhs[key])) continue;
            else return false;
        }
        return propCount == keys.length;
    }
    else
        return lhs === rhs;
}

console.log("Lhs and Rhs is equal:", deepEqual({name: "Saqib", education: "inter"}, {name: "Saqib", education: "inter"}));