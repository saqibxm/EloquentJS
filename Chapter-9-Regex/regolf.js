/*
1. car and cat
2. pop and prop
3. ferret, ferry, and ferrari
4. Any word ending in ious
5. A whitespace character followed by a period, comma, colon, or semicolon
6. A word longer than six letters
7. A word without the letter e (or E)
*/

function searchPattern(string, regexp)
{
    console.log('-'.repeat(20));
    console.log("String:", string);
    for(let match of string.matchAll(regexp))
    {
        console.log("'" + match[0] + "'", "at index", match.index);
    }
    console.log('-'.repeat(20));
    console.log();
}

searchPattern("car and cat", /ca[rt]/g); //true
searchPattern("pop and prop", /pr?op/g); //true
searchPattern("ferret, ferry, and ferrari", /\bferr(?:y|et|ari)\b/g);
searchPattern("Pious and delicious", /[A-z]+?ious/g);
searchPattern(" , . : ;", /\s+[.,:;]/g);
searchPattern("reconnaisance cake", /[A-z]{6,}/g);
searchPattern("makeup bring drooling", /\b([^eE\W\d]){3,}\b/g);