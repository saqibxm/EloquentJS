function isEven(number)
{
    if(number == 0) return true;
    if(number == 1) return false;
    return isEven(number - 2);
}

let number = Math.ceil(Math.random() * 100);

if(!Number.isNaN(number))
    console.log(`${number} is ${isEven(number) ? 'Even' : 'Odd'}`);
else
    console.log("A valid integer is required!");