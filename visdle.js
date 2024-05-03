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


///////--------ALERT

function alertMessage(message, time) {
    let alertContainer = document.getElementById("alert-container");
    let alert = document.createElement("div");
    alert.className = "alert";
    alert.innerText = message;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.add("hidden");
        alert.addEventListener("transitionend", () => {
            alert.remove();
        })
    }, time);
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
    "Kwang",
    "Nadia",
    "Ukrit"
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
const skeleton = [
    "Steve"
];

const all = [
    teacher, batch1, batch2, batch3, batch4, batch5, batch6, batch7, batch8, skeleton
];

let allname = new Map();

for (b=0;b<all.length;b++) {
    let list = all[b];
    let batch = "";
    if(b===0) {
        batch = "Teacher";
    }
    else if (b===all.length-1) {
        batch = "Skeleton in biology room";
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

console.log(allname);

function getRandomKey(collection) {
    let keys = Array.from(collection);
    return keys[Math.floor(Math.random() * keys.length)];
}

const fullword = getRandomKey(allname);
console.log(fullword);

const namelist = Array.from(allname.keys());
//console.log(namelist);

///////--------GAME MODULE

const word = fullword[0];
console.log(word);

var height = 6;
var width = 5;
var gameOver = false;

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
        ["↳", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i=0;i<3;i++) {
        let keyRow = document.createElement("div");
        keyRow.className = "key-row";

        for (let j=0;j<keyboard[i].length;j++) {
            let key = document.createElement("button");
            key.id = "key" + keyboard[i][j];
            key.innerText = keyboard[i][j];

            if (key.innerText === "↳") {
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
   
    if(gameOver || row>=6) {
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
            alertMessage("Not enough letters", 1000);
        }
        else {
            let guess = "";
            for (let j=0;j<5;j++) {
                guess += document.getElementById("tile"+row+j).innerText;
            }
            guess = guess.toLowerCase();
            //console.log(guess);

            if (!namelist.includes(guess)) {
                if(guess==="zewer") {
                    alertMessage("Not Zewern bruh", 1000);
                }
                else {
                    alertMessage("Not in namelist", 1000);
                }
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
        //console.log("yay");
        gameOver = true;
    }

    if (gameOver) {
        setTimeout(congrat, 1600);
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

    if (row>=6 && (!gameOver)) {
        row++;
        setTimeout(fail, 1600);
    }

}

function congrat() {
    alertMessage("Goose job!", 1000);
    setTimeout(() => {
        let result = processResult();
        showShareResult(result);
    }, 1000);
}

function fail() {
    let fail = word.toUpperCase() + " :P";
    
    alertMessage(fail, 1000);

    setTimeout(() => {
       let result = processResult();
        showShareResult(result);
    }, 1000);
}

function processResult() {
    let result = "Visdle ";
    //console.log(row);

    if(row>6) {
        result += "X";
    }
    else {
        result += row;
    }
    result += "/6" + '\n\n';

    for (let i=0;i<row && i<6;i++) {
        for (let j=0;j<5;j++) {
            let tile = document.getElementById("tile"+i+j);
            if(tile.classList.contains("correct")) {
                result += "🟩";
            }
            else if (tile.classList.contains("present")) {
                result += "🟪";
            }
            else {
                result += "⬜";
            }
        }
        result += '\n';
    }
    result += '\n' + "Guess KVISian name in 6 tries.\nhttps://pctkpp.github.io/visdle/";

    console.log(result);

    return result;
}

function showShareResult(result) {    
    let closeShare = document.getElementById("close-share-button");
    closeShare.addEventListener("click", closeSharePage);

    let shareResultButton = document.getElementById("share-result-button");
    shareResultButton.addEventListener("click", function() {
        copyResult(result);
    });
    
    let guess = "";
    if(row>6) {
        guess += "X";
    }
    else {
        guess += row;
    }
    guess += "/6"

    document.getElementById("share-guess").innerText = guess;
    document.getElementById("share-word").innerText = word.toUpperCase();
    
    let batchList = document.getElementById("share-batch");
    for(i=0;i<fullword[1].length;i++) {
        let li = document.createElement('li');
        li.innerText = fullword[1][i];
        batchList.appendChild(li);
    }

    document.getElementById("share-page-container").classList.add("show");
}

function closeSharePage() {
    document.getElementById("share-page-container").classList.remove("show");
}

function copyResult(result) {
    //navigator.clipboard.writeText(result);
    console.log(result);
    navigator.clipboard.writeText(result);
    alertMessage("Copied results to clipboard", 1000);
}