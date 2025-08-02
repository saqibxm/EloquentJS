function PrintTriangle(n)
{
    for(let i = 0; i < n; ++i)
    {
        for(let j = 0; j <= i; ++j)
            process.stdout.write('#');
        console.log();
    }
}

PrintTriangle(6);