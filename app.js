//2048 game

let array = [   [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null]];

const gameEndscore = 2048;

function startBoard(){
    populateRandomDigitOnEmptySquare();
    populateRandomDigitOnEmptySquare();
    printBoard();
    startGame();
}

function startGame(){
    getInput((key)=>{
        makeMove(key);
        if(!checkForGameEnd()){
            if(checkForEmptyField()){
                populateRandomDigitOnEmptySquare();
                printBoard()
            } else {
                //game has ended
                printBoard();
                console.log("Greate effort! Game has ended");
                endProcess();
            }
        } else {
            // game completed successfully
            printBoard();
            console.log("Congratulations!. You have succesfullly completed game");
            endProcess();
        }
    }) 
}

function endProcess(){
    process.exit();
}

function checkForGameEnd(){
    for (const element of array) {
        if(element.includes(gameEndscore)){
            return true;
        }
    }
    return false;
}

function populateRandomDigitOnEmptySquare(){
    let l = randomNumber(0,3);
    let m = randomNumber(0,3);
    if(array[l][m] == null){
        if((randomNumber(1, 10)%2)== 0){
            array[l][m] = 2;
        } else {
            array[l][m] = 4;
        }
    } else{
        populateRandomDigitOnEmptySquare();
    }
}

function checkForEmptyField(){
    for (const element of array) {
        // console.log(element);
        for (const field of element) {
            // console.log(field);
            if(field == null){
                return true;
            }
        }
    }
    return false;
}

function moveRight(){
    try {
        for (let element of array) {
            let i = element.length-1;
            let j = element.length-2;
            let k = element.length-1;
            while(i >= 0 && j >= 0){
                if(element[i] == null){
                    i--;
                    j--;
                } else if(element[j] == null){
                    j--;
                } else if(element[i] == element[j]){
                    element[k] = element[i] * 2;
                    if(i!=k){
                        element[i] = null;
                    }
                    element[j] = null;
                    k--;
                    i = j-1;
                    j = j-2;
                } else if(element[i] != element[j]){
                    element[k] = element[i];
                    if(i!=k){
                        element[i] = null;
                    }
                    k = k-1
                    i = j;
                    j = j-1;
                }
            }
            if(i!=k && i>=0){
                element[k] = element[i]
                element[i] = null;
            }
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

function moveLeft(){
    try {
        for (let element of array) {
            let i = 0;
            let j = 1;
            let k = 0;
            while(i <= element.length-1 && j <= element.length-1){
                if(element[i] == null){
                    i++;
                    j++;
                } else if(element[j] == null){
                    j++;
                } else if(element[i] == element[j]){
                    element[k] = element[i] * 2;
                    if(i!=k){
                        element[i] = null;
                    }
                    element[j] = null;
                    k++;
                    i = j+1;
                    j = j+2;
                } else if(element[i] != element[j]){
                    element[k] = element[i];
                    if(i!=k){
                        element[i] = null;
                    }
                    k = k+1
                    i = j;
                    j = j+1;
                }
            }
            //TODO recheck
            if(i!=k && i<=array.length-1){
                element[k] = element[i]
                element[i] = null;
            }
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

function moveUp(){
    try {
        for (let l = 0; l< array.length ;l++) {
            let i = 0;
            let j = 1;
            let k = 0;
            while(i <= array.length-1 && j <= array.length-1){   
                if(array[i][l] == null){
                    i++;
                    j++;
                } else if(array[j][l] == null){
                    j++;
                } else if(array[i][l] == array[j][l]){
                    array[k][l] = array[i][l] * 2;
                    if(i!=k){
                        array[i][l] = null;
                    }
                    array[j][l] = null;
                    k++;
                    i = j+1;
                    j = j+2;
                }else if(array[i][l] != array[j][l]){
                    array[k][l] = array[i][l];
                    if(i!=k){
                        array[i][l] = null;
                    }
                    k = k+1
                    i = j;
                    j = j+1;
                }
            }
            if(i!=k && i<=array.length-1){
                array[k][l] = array[i][l]
                array[i][l] = null;
            }  
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

function moveDown(){
    try {
        for (let l = 0; l< array.length ;l++) {
            let i = array.length-1;
            let j = array.length-2;
            let k = array.length-1;
            while(i >= 0 && j >= 0){   
                if(array[i][l] == null){
                    i--;
                    j--;
                } else if(array[j][l] == null){
                    j--;
                } else if(array[i][l] == array[j][l]){
                    array[k][l] = array[i][l] * 2;
                    if(i!=k){
                        array[i][l] = null;
                    }
                    array[j][l] = null;
                    k--;
                    i = j-1;
                    j = j-2;
                }else if(array[i][l] != array[j][l]){
                    array[k][l] = array[i][l];
                    if(i!=k){
                        array[i][l] = null;
                    }
                    k = k-1
                    i = j;
                    j = j-1;
                }
            }
            if(i!=k && i>=0){
                array[k][l] = array[i][l]
                array[i][l] = null;
            }
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

function printBoard(){
    array.forEach(element=>{
        console.log(JSON.stringify(element)+"\n")
    })
}

function getInput(cb){
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        } else {
            cb(key)
        }
    });
}

function makeMove(key){
    if(key.name == 1 || key.name == 'left'){
        console.log("move Left");
        moveLeft()
    } else if(key.name == 2 || key.name == 'right'){
        console.log("move Right");
        moveRight()
    } else if(key.name == 3 || key.name == 'up'){
        console.log("move Up");
        moveUp();
    } else if(key.name == 4 || key.name == 'down'){
        console.log("move Down");
        moveDown();
    } else {
        console.log("do nothing/ invalid input");
    }
}

function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}

startBoard();
