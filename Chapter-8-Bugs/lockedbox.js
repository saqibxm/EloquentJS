const box = new class {
    locked = true;
    #content = [];
    unlock() { this.locked = false; }
    lock() { this.locked = true; }
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this.#content;
    }
};

function withBoxUnlocked(fn)
{
    const alreadyUnlocked = !box.locked;
    box.unlock();

    try {
        fn();
    } catch(error) {
        console.log("An error occurred while invoking function! " + error);
    } finally {
        if(!alreadyUnlocked) box.lock();
    }
}

function logBoxContent()
{
    let contents = box.content;
    for(let e of contents)
        console.log("Element:", e);
}

function addBoxContent()
{
    for(let i = 0; i < 10; ++i)
        box.content.push(i);
}

function throwOnUnlocked()
{
    if(!box.locked) throw new Error("Im a dumb function!");
}

console.log("Before Call Box locked?", box.locked);
withBoxUnlocked(addBoxContent);
withBoxUnlocked(logBoxContent);
withBoxUnlocked(throwOnUnlocked);
console.log("After Call Box locked?", box.locked);

// logBoxContent();