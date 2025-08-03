class Group
{
    constructor()
    {
        this.storage = [];
    }

    static from(iterable)
    {
        let group = new this();
        for(let v of iterable)
            group.add(v);
        return group;
    }

    add(value)
    {
        if(!this.storage.includes(value))
            this.storage.push(value);
    }

    delete(value)
    {
        let index = this.storage.indexOf(value);
        if(index) this.storage = this.storage.splice(index, 1);
    }

    has(value)
    {
        return this.storage.includes(value);
    }

    values() {
        return this.storage.values();
    }
}

class PersistentGroupIterator
{
    constructor(group)
    {
        this.storage = group?.storage ?? null; // persistent storage,
        // disastrous if modification intended during iteration
    }

    next()
    {
        if(this.#storage == null || this.#index >= this.#storage.length) return { done: true };
        let value = this.#storage[this.#index++];

        return { value, done: false };
    }

    #index = 0;
    #storage = null;
}

class GroupIterator
{
    constructor(group)
    {
        this.group = group;
    }

    next()
    {
        if(this.group == null || this.#index >= this.group.storage.length) return { done: true };
        let value = this.group.storage[this.#index++];

        return { value, done: false };
    }

    #index = 0;
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}

const array = [1, 1, 2, 3, 4, 4, 4, 5, 6, 7];

const group = Group.from(array);

for(let entry of group)
{
    console.log("Value:", entry);
}