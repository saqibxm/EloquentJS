function Loop(value, test, update, body)
{
    let v = value;

    while(test(v))
    {
        body(v);
        v = update(v);
    }
}

Loop(0, i => i < 10, i => ++i, i => {
    console.log('value:', i);
});