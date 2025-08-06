function isJSNumber(string)
{
    const pattern = /^(?:[+\-]??(\d*?)[.]?([eE]?[0-9])+)$/;
    return pattern.test(string);
}

console.log(isJSNumber("1.5e7")); // yes
console.log(isJSNumber("10e9e2")); // yes
console.log(isJSNumber("+-34")); // I decided that its not
console.log(isJSNumber("3.")); // nope
console.log(isJSNumber("9000")); // yes
console.log(isJSNumber("-9.6")); // yes