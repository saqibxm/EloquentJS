class Vec
{
    constructor(x, y)
    {
        this.#x = x;
        this.#y = y;
    }

    get length()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get x()
    {
        return this.#x;
    }

    get y()
    {
        return this.#y;
    }

    #x = 0;
    #y = 0;
}

Vec.prototype.toString = function() {
    return `x: ${this.x}, y: ${this.y}`;
}

let vector = new Vec(12, 4);
console.log("Length of vector:", String(vector), "is:", vector.length);