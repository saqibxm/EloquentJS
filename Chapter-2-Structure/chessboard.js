function printChessBoardOld()
{
    const GRID_SIZE = 8*8;

    let counter = 0;
    while(counter < GRID_SIZE)
    {
        let row = "# ";
        row = row.repeat(8/2);
        counter += row.length;

        process.stdout.write(row);
        if(counter % 8 == 0) console.log();
    }
}

function printChessBoard(size)
{
    return () => {
        for(let i = 0; i < size; ++i)
        {
            let chars = ['#', ' '];
            if(i % 2 != 0) chars = chars.reverse();
            let string = chars.join('').repeat(size / 2);

            console.log(string);
        }
    }
}

let printer = printChessBoard(16);
printer();