///////--------TOP BAR

let helpButton = document.getElementById("help-button");
let closeHelp = document.getElementById("close-help-button");
helpButton.addEventListener("click", showHelpPage);
closeHelp.addEventListener("click", closeHelpPage);

function showHelpPage() {
    document.getElementById("help-page-container").classList.add("show");
}

function closeHelpPage() {
    document.getElementById("help-page-container").classList.remove("show");
}

///////--------NAMELIST
const teacher = [
    "Pomme", 
    "Ratch", 
    "Pakin", 
    "Neung", 
    "Lacey", 
    "Pueng", 
    "Sakol", 
    "Smith", 
    "Gidja", 
    "Artur", 
    "Smart", 
    "Sarun", 
    "Imjai", 
    "Party", 
    "David", 
    "Miles", 
    "Chris", 
    "Maria", 
    "Johan", 
    "Delia", 
    "Arwae", 
    "Kanes", 
    "Yokfa", 
    "Champ", 
    "Nilsu", 
    "Tammy",
    "Palma",
    "Gorka", 
    "Kraus", 
    "Jamie", 
    "Scott", 
    "Kwang"
];
const batch1 = [
    "Manow", 
    "Phoom", 
    "Sukit", 
    "Gunta", 
    "Kanin", 
    "Khing", 
    "Nueng", 
    "Boost", 
    "Alisa", 
    "Buboo", 
    "Quere", 
    "Suang", 
    "Roong", 
    "Tonpo"
];
const batch2 = [
    "Tharn", 
    "Cocoa", 
    "Nicha", 
    "Heart", 
    "Lapon", 
    "Lapas", 
    "Harut", 
    "Ninja", 
    "Earth", 
    "James"
];
const batch3 = [
    "Champ", 
    "Brook", 
    "Ikkue", 
    "Teeth", 
    "Earth"
];
const batch4 = [
    "Napat", 
    "Three", 
    "Sumon", 
    "Jinny", 
    "Cream", 
    "James", 
    "Palmy", 
    "Wearn", 
    "Watit", 
    "Khing", 
    "Major", 
    "Jerry", 
    "Fasai", 
    "Vetit", 
    "Ultra", 
    "Jaden", 
    "Talay", 
    "Touch", 
    "Earny", 
    "Nokia"
];
const batch5 = [
    "Mhong", 
    "Tatar", 
    "Dream", 
    "Petch", 
    "Belle", 
    "Scene", 
    "Mimie", 
    "James", 
    "Chain", 
    "Ikkue", 
    "Dawit", 
    "Ratha", 
    "Napol", 
    "Kanok", 
    "Napat", 
    "Wanat", 
    "Thime", 
    "Modem", 
    "Shain", 
    "Bonus", 
    "Pleum"
];
const batch6 = [
    "Teddy", 
    "Modem", 
    "Pauli", 
    "Pusit", 
    "Petch", 
    "Power", 
    "Amada", 
    "Major", 
    "Pream", 
    "Minor", 
    "Great", 
    "Champ", 
    "Pinky", 
    "Yoshi"
];
const batch7 = [
    "Imaim", 
    "Oboon", 
    "Nenno", 
    "Pleum", 
    "Meemi", 
    "Kueng", 
    "Kenji", 
    "Willy", 
    "Peach", 
    "Veroj", 
    "Matin"
];
const batch8 = [
    "Napat", 
    "Thiti", 
    "Kiang", 
    "Janja", 
    "Cream", 
    "Meena", 
    "Punya", 
    "Earth", 
    "Music", 
    "Focus", 
    "Prann", 
    "Yoshi", 
    "Bpoon", 
    "Prima", 
    "Sirot", 
    "Sugus", 
    "Thank", 
    "Frame", 
    "Pluem", 
    "Tanya", 
    "Belle"
];

const all = [
    teacher, batch1, batch2, batch3, batch4, batch5, batch6, batch7, batch8
];

let allname = new Map();

for (b=0;b<all.length;b++) {
    let list = all[b];
    let batch = "";
    if(b===0) {
        batch = "Teacher";
    }
    else {
        batch = "Batch " + b;
    }

    for(i=0;i<list.length;i++) {
        let name = list[i].toLowerCase();
        if(allname.has(name)) {
            let existingValues = allname.get(name);
            existingValues.push(batch);
            allname.set(name, existingValues);
        }
        else {
            allname.set(name, [batch]);
        }
    }
}

//console.log(allname);

function getRandomKey(collection) {
    let keys = Array.from(collection);
    return keys[Math.floor(Math.random() * keys.length)];
}

const fullword = getRandomKey(allname);
console.log(fullword);

const namelist = Array.from(allname.keys());
console.log(namelist);

///////--------GAME MODULE

const word = fullword[0];
console.log(word);

var height = 6;
var width = 5;
var correctGuess = false;

//state
var row = 0;
var col = 0;


//start
function setTile() {

    for (let i=0;i<height;i++) {
        let tileRow = document.createElement("div");
        tileRow.className = "tile-row";

        for (let j=0;j<width;j++) {
            let tile = document.createElement("div");
            tile.id = 'tile'+i+j;
            tile.classList.add("tile");
            tile.innerText = '';

            tileRow.appendChild(tile);
        }
        document.getElementById("tile-container").appendChild(tileRow);
    }
}

setTile();

function setKeyboard() {
    
    //KEYBOARD TILE
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["↪", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i=0;i<3;i++) {
        let keyRow = document.createElement("div");
        keyRow.className = "key-row";

        for (let j=0;j<keyboard[i].length;j++) {
            let key = document.createElement("button");
            key.id = "key" + keyboard[i][j];
            key.innerText = keyboard[i][j];

            if (key.innerText === "↪") {
                key.classList.add("key");
                key.classList.add("large");
                key.addEventListener("click", function() {
                    handleInput("Enter");
                });
            }
            if (key.innerText === "⌫") {
                key.classList.add("key");
                key.classList.add("large");
                key.addEventListener("click", function() {
                    handleInput("Backspace");
                });
            }
            else {
                key.classList.add("key");
                key.addEventListener("click", function() {
                    handleInput(key.innerText);
                });
            }
            
            keyRow.appendChild(key);
        }
        document.getElementById("keyboard-container").appendChild(keyRow);
    }

    //KEY PRESS
    document.addEventListener("keydown", function(e) {
    
        if (e.key === "Delete" || e.key === "Backspace") {
            handleInput("Backspace"); 
        }
        else if (e.key === "Enter") {
            handleInput(e.key); 
        }
        else if (e.key.match(/^[a-zA-Z]$/)) {
            handleInput(e.key.toUpperCase());
        }
    });

}

setKeyboard();

function handleInput(e) {
    //console.log(e);
   
    if(correctGuess || row>=6) {
        return;
    }

    if (e === "Backspace") {
        if (col > 0) {
            col--;
            document.getElementById("tile"+row+col).innerText = '';
            document.getElementById("tile"+row+col).classList.remove("text");
        }
    }
    else if (e === "Enter") {
        if (col < 5) {
            alert("Not Enough Letters");
        }
        else {
            let guess = "";
            for (let j=0;j<5;j++) {
                guess += document.getElementById("tile"+row+j).innerText;
            }
            guess = guess.toLowerCase();
            //console.log(guess);

            if (!namelist.includes(guess)) {
                alert("Not in Namelist");
            }
            else {
                processGuess(guess);
            }
        }
    }
    else if (e >= 'A' && e <='Z') {
        if (col < 5) {
            document.getElementById("tile"+row+col).innerText = e;
            document.getElementById("tile"+row+col).classList.add("text");
            col++;
        }
    }
    

}

function processGuess(guess) {

    const animated_duration = 500;

    let correct = 0;

    let letterCount = {};
    for (let i=0;i<5;i++) {
        let letter = word[i];
        
        if(letterCount[letter]) {
            letterCount[letter]++;
        }
        else {
            letterCount[letter] = 1;
        }
    }
    //console.log(letterCount);

    //CHECK CORRECT
    for (let j=0;j<5;j++) {
        let tile = document.getElementById("tile" + row + j);
        let key = document.getElementById("key" + guess[j].toUpperCase());

        if(guess[j] === word[j]) {
            setTimeout(() => {
                tile.classList.add("correct");
                key.classList.add("correct");
            }, ((j+1) * animated_duration) / 2);
            
            
            tile.classList.add("animated");
            tile.style.animationDelay = `${(j * animated_duration) / 2}ms`;

            correct++;
            letterCount[guess[j]]--;
        }
    }

    if (correct === width) {
        console.log("yay");
        correctGuess = true;
    }

    if (correctGuess) {
        setTimeout(congrat, 1550);
    }


    //CHECK PRESENT / ABSENT
    for (let j=0;j<5;j++) {
        let tile = document.getElementById("tile" + row + j);
        let key = document.getElementById("key" + guess[j].toUpperCase());

        if(!tile.classList.contains("correct")) {
            if (word.includes(guess[j]) && letterCount[guess[j]]>0) {
                setTimeout(() => {
                    tile.classList.add("present");
                }, ((j+1) * animated_duration) / 2);
                
                tile.classList.add("animated");
                tile.style.animationDelay = `${(j * animated_duration) / 2}ms`;

                if(!key.classList.contains("correct")) {
                    key.classList.add("present");
                }

                letterCount[guess[j]]--;
            }
            else {
                setTimeout(() => {
                    tile.classList.add("absent");
                }, ((j+1) * animated_duration) / 2);
                
                key.classList.add("absent");
                
                tile.classList.add("animated");
                tile.style.animationDelay = `${(j * animated_duration) / 2}ms`;

            }
        }
    }

    row++;
    col = 0;

    if (row>=6 && (!correctGuess)) {
        setTimeout(fail, 1550);
    }

}

function congrat() {
    let yay = "Goose Job! - " + word.toUpperCase() + " (";
    let batch = fullword[1][0];
    for (i=1;i<fullword[1].length;i++) {
        batch += ", " + fullword[1][i]; 
    }
    yay += batch + ")";
    console.log(yay);

    alert(yay);
    
}

function fail() {
    let fail = "The name is " + word.toUpperCase() + " (";
    let batch = fullword[1][0];
    for (i=1;i<fullword[1].length;i++) {
        batch += ", " + fullword[1][i]; 
    }
    fail += batch + ") :P";
    alert(fail);
}