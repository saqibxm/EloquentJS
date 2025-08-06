const pattern = /\B'((?:\s|.)+?)'\B/g;

const story = `Legolas: 'This is a device of cunning deceiver that is Sauron, only Sauron's will shall it enforce'
'It's a perilous craft indeed.
It must be taken to mordor and cast back into fiery chasm from whence it came!' said Elrond with thunderous voice.
'One does not simply walk into mordor, its gates are guarded by more than just orcs. There is evil there that doesn't sleep.
The great eye ever watchful! Not with ten thousand men could you do this. It is folly.' Boromir disagreed.`;

console.log(story.replace(pattern, '"$1"'));