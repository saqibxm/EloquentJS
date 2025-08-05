class PGroup
{
    constructor()
    {
        this.data = [];
    }

    static from(iterable)
    {
        let group = new this();
        for(let v of iterable)
            if(!group.data.includes(v))
                group.data.push(v);
        return group;
    }

    [Symbol.iterator]()
    {
        return this.data.values();
    }

    add(value)
    {
        let pg = PGroup.from(this.data);
        if(!pg.has(value))
            pg.data.push(value);
        return pg;
    }

    delete(value)
    {
        let pg = PGroup.from(this.data);
        let index = pg.data.indexOf(value);
        if(index !== -1)
            pg.data.splice(index, 1);
        
        return pg;
    }

    has(value)
    {
        return this.data.includes(value);
    }
}

const array = [1, 1, 2, 3, 4, 4, 4, 5, 6, 7];

const group = PGroup.from(array);
const modified = group.add(9);

console.log(group.has(9));
console.log(modified.has(9));

for(let entry of group)
{
    console.log("Value:", entry);
}

for(let entry of modified)
{
    console.log("Modified:", entry);
}