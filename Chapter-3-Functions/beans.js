function countBeansTraditional(string)
{
    let count = 0;
    // string?.length || 0
    // checks if string is not null/undefined if it isnt fetch length property
    // if its non-existent return undefined which in short circuit is not prefered over 0, so 0 is selected
    for(let i = 0; i < string?.length ?? 0; ++i)
        count = string[i] === 'B' ? count + 1 : count;
    
    return count;
}

function countBeansLessTraditional(string)
{
    let count = 0;
    if(!string) return count; // if string is null, undefined or empty

    for(let letter of string)
        if(letter === 'B')
            count++;
    return count;
}

function countBeans(string)
{
    function countChar(string, char)
    {
        // let array = string.split('');
        return string.split('').filter((value, index) => {
            return value === char;
        }).length;
    }
    return countChar(string, 'B');
}

let str = "asfdBSdLASBAIOBV#$#";

console.log("Count:", countBeans(str, 'B'));