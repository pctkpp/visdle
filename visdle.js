var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;

var wordList = ["alisa", "amada", "artur", "arwae", "belle", "bonus", "boost", "brook", "buboo", "chain", "champ", "chris", "cocoa", "cream", "david", "dawit", "delia", "dream", "earny", "earth", "fasai", "games", "gidja", "gorka", "great", "gunta", "harut", "heart", "ikkue", "imaim", "imjai", "jaden", "james", "jamie", "jerry", "jinny", "johan", "kanes", "kanin", "kanok", "kenji", "keyes", "khing", "kraus", "kream", "kueng", "kwang", "lacey", "lapas", "lapon", "major", "manow", "maria", "marky", "matin", "meemi", "mhong", "miles", "mimie", "minor", "modem", "napat", "napol", "nenno", "neung", "nicha", "nilsu", "ninja", "nokia", "nueng", "oboon", "osumi", "pakin", "palma", "palmy", "party", "pauli", "peach", "pedro", "petch", "phone", "phoom", "pinky", "pleum", "pomme", "pound", "power", "praew", "pream", "pueng", "pusit", "quere", "ratch", "ratha", "roong", "sakol", "sarun", "scene", "scott", "shain", "smart", "smith", "stamp", "suang", "sukit", "sumon", "talay", "tatar", "teddy", "teeth", "tharn", "thime", "three", "tonpo", "touch", "turbo", "ultra", "veroj", "vetit", "wanat", "watit", "wearn", "willy", "yokfa", "yoshi"]
var guessList = []

guessList = guessList.concat(wordList);

var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();

width = word.length;

console.log(word);

window.onload = function(){
    intialize();
}


function intialize() {

    // Create the game board
    for (let r = 0; r < height; r++) {
        let tileRow = document.createElement("div");
        tileRow.classList.add("tile-row");

        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            tileRow.appendChild(tile);
        }

        document.getElementById("board").appendChild(tileRow);
    }

    // Create the key board
    let keyboardContain = document.createElement("div");
    keyboardContain.classList.add("keyboard-container");

    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;

            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            }
            else if (key == "⌫") {
                keyTile.classList.add("backspace-key-tile");
            }
            else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        keyboardContain.appendChild(keyboardRow);
    }

    document.getElementById("game-container").appendChild(keyboardContain);

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if(gameOver){
        //if(row > height) alert(word);
        return;
    }

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        if(col < width){
            alert("need more letters");
        }
        else{
            update();
            if(gameOver) {
                alert("congratulations!");
            }
        }
        
    }

    if (!gameOver && row == height) {
        gameOver = true;
        row++;
        alert(word);
    }
}

function update() {
    let guess = "";
    //document.getElementById("answer").innerText = "";

    //string up the guesses into the word
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase(); //case sensitive
    console.log(guess);

    if (!guessList.includes(guess)) {
        //document.getElementById("answer").innerText = "Not in a namelist";
        alert("Not in a namelist");
        return;
    }
    
    //start processing guess
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //first iteration, check all the correct ones first
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);

            keyTile.classList.remove("present");
            keyTile.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1; //deduct the letter count
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    console.log(letterCount);
    //go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // skip the letter if it has been marked correct
        if (!currTile.classList.contains("correct")) {
            //Is it in the word?         //make sure we don't double count
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Not in the word or (was in word but letters all used up to avoid overcount)
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct") && !keyTile.classList.contains("present")) {
                    keyTile.classList.add("absent");
                }
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
}