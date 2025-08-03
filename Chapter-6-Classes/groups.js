class Group /* extends Set */
{
    // constructor() {} // defaulted

    static from(iterable)
    {
        let group = new this();
        for(let v of iterable)
            group.add(v);
        return group;
    }

    [Symbol.iterator] = function() {
        return this.#group.values();
    }

    add(value)
    {
        if(!this.#group.includes(value))
            this.#group.push(value);
    }

    delete(value)
    {
        /*
        let index = 0;
        for(let entry of this.#group)
        {
            ++index;
            if(entry === value)
                break;
        }
        */
        let index = this.#group.indexOf(value);
        if(index)
        {
            this.#group = this.#group.splice(index, 1);
            // this.#group = this.#group.filter(v => v != value);
            // this.#group = this.#group.slice(0, index).concat(this.#group.slice(index + 1));
        }
    }

    has(value)
    {
        // return this.#group.some(e => e == value);
        return this.#group.includes(value);
    }

    values() {
        return this.#group.values();
    }
    
    #group = []
}

/*
class GroupIterator
{
    constructor(group)
    {
        this.group = group;
    }

    next()
    {
        return { value: undefined, done: true }
    }
}

Group.prototype[Symbol.iterator] = function() {
    return this.values();
}
*/

const array = [1, 1, 2, 3, 4, 4, 4, 5, 6, 7];

const group = Group.from(array);

for(let entry of group)
{
    console.log("Value:", entry);
}