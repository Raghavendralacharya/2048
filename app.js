//2048 game

// 1	Print the 4 x 4 board on each turn in the console and wait for user input. 
// This will initially have two cells populated at random with a 2 or 4
//2.	User will input 1, 2, 3, 4 for left, right, up and down movements
let array = [   [2,null,null,null],
                [2,2,2,2],
                [null,null,null,4],
                [null,2,4,2]];
function startBoard(){
    // array[randomNumber(0,3)][randomNumber(0,3)] = 2/4;
    populateRandomDigitOnEmptySquare();
    populateRandomDigitOnEmptySquare();
    console.log(JSON.stringify(array));
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
        console.log(element);
        for (const field of element) {
            console.log(field);
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
        printBoard();
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
        printBoard()
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
        printBoard()
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
                    // array[k-1][l] = array[j][l];
                    // if(j!=k-1){
                    //     array[j][l] = null;
                    // }
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
        printBoard()
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

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
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
    // console.log(`You pressed the "${str}" key`);
    // console.log();
    // console.log(key);
    // console.log();
  }
});

// document.addEventListener('keydown', function(event) {
//     if(event.keyCode == 37) {
//         alert('Left was pressed');
//     }
//     else if(event.keyCode == 39) {
//         alert('Right was pressed');
//     }
// });

// function startGame(){
//      array[randomNumber(0,3)][randomNumber(0,3)] = 2;
//      console.log( JSON.stringify(array))

// }


function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}

startBoard();
// for(i= 0 ;i<100;i++){
    // console.log(randomNumber(0, 3));
// }
