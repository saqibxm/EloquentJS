class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b)
{
    let probability = Math.random();
    if(probability > 0.20)
        throw new MultiplicatorUnitFailure("Failed!");
    return a * b;
}

function multiplyNumbers()
{
    let result = 0;
    while(true)
    {
        let a = Number(prompt("Enter first number:"));
        let b = Number(prompt("Enter second number:"));

        try {
            result = primitiveMultiply(a, b);
            break;
        } catch (error) {
            if(error instanceof MultiplicatorUnitFailure)
            {
                console.log("Failed to multiply numbers, Retry!");
            }
            else throw error;
        }
    }
    console.log("Result:", result);
}

multiplyNumbers();