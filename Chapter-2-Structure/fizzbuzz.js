function FizzBuzzString(number)
{
    if(number % 3 == 0 && number % 5 == 0)
        return 'FizzBuzz';
    else if(number % 3 == 0)
        return 'Fizz';
    else if(number % 5 == 0)
        return 'Buzz';
    return number;

    // return number || (number % 3 == 0 && "Fizz");
}


function FizzBuzz(min, max)
{
    if(min == undefined || !min) min = 1;
    if(max == undefined || !max) max = 100;
    console.assert(min <= max, "Min must be smaller than Max, dumbass!");

    for(let i = min; i <= max; ++i)
    {
        console.log(FizzBuzzString(i));
    }
}

FizzBuzz(1, 100);