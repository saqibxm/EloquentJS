const iniFile = `searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7
; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451
[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn`

function parseINI(string)
{
    const preprocess = /(\s*$|;).*$/; // useless af
    const pattern = /^(?:\[(\w+)\]|(\w+)=(.+))$/;
    
    string = string.split(/\r?\n/)
        .map(str => str.replace(preprocess, ""))
        .filter(str => str.length !== 0)
        .join('\n');

    let ini = {};
    let section = ini; // pointing to global scope at beginning

    for(let line of string.split(/\r?\n/))
    {
        let match = pattern.exec(line);
        let {type, valid} = validateMatch(match);
        if(valid)
        {
            switch (type) {
                case "section":
                    section = ini[match[1]] = {}; // point to the section now
                    break;
                case "property":
                    let value = 0;
                    section[match[2]] = !Number.isNaN(value = Number(match[3])) ?
                            value : match[3];
                    break;
                default:
                    break;
            }
        }
        else throw Error(`Invalid syntax in '${line}'`);
    }

    return ini;
}

function validateMatch([_, section, property, value])
{
    if(section)
        return {type: "section", valid: !(property || value)};
    else return {type: "property", valid: value && property};
}

console.log(parseINI(iniFile));

/*
if(value.match(/^(?:(?<protcol>\w+):\/\/)?(?:[Ww]{3}[0-9]?\.)?(?<domain>(?<host>\w+?)\.(?<type>[A-z]+?\b))(?:.*)$/))
    value = new URL(value);
else 
if(value.match(/^[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?$/))
    value = Number(value);
*/