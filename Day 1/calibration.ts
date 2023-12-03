import * as fs from 'fs'


//Day 1
//This problem was annoying
//This solution was loop through each string, and look through all possible combinations of words-converted-into-numbers
//From among those combinations, take the one where mutation occurs earliest in the string (the first word that got converted into a number)
//And the combination where the mutation occurs latest in the string (the last word that got converted into a number)
//Go through the new mutated string looking for the first and last number
//Voila

let calibrationData: string = fs.readFileSync("Day 1/calibrationvals.txt", 'utf-8');

const calibrationArray: Array<string> = calibrationData.split('\n');

let wordedNumbers: Array<string> = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

let total: number = 0;

for(let calibrationString of calibrationArray) {

    let firstNum: string = findFirstNum(calibrationString);
    let lastNum: string = findLastNum(calibrationString);



    console.log(`Got ${firstNum} and ${lastNum} from ${calibrationString}`);

    let finalNum: number = parseInt((`${firstNum}${lastNum}`));

    total += finalNum;


}

console.log(`Final answer: ${total}`);

function wordsToNums(calibrationVal: string): string {

    let tempVal: string = calibrationVal;
    //console.log(`Old string: ${tempVal}`);
    for(let index = 0; index < wordedNumbers.length; index++) {

        let replaceTarget: RegExp = new RegExp(wordedNumbers[index], 'gi');

        tempVal = tempVal.replace(replaceTarget, (index + 1).toString())

    }
    //console.log(`New string: ${tempVal}`);

    return tempVal;

} 

function findLastNum(calibrationVal: string): string {

    let tempVal: string = calibrationVal;
    console.log(`\n\n---------FINDING LAST NUM OF ${calibrationVal}---------`);
    let latestHit = {
        word: '',
        index: 0,
        replacement: ''
    }
    for(let index = 0; index < wordedNumbers.length; index++) {

        let replaceTarget: RegExp = new RegExp(wordedNumbers[index], 'i');
        let hitIndex = tempVal.search(replaceTarget);
        const currentNumberWord = wordedNumbers[index]
        let charactersCutOff: number = 0; //every time I mutate the string to find extra copies of words, the index decreases, add charactersCutOff to fix that
        let copyOfWordToReplaceThrough: string = tempVal;

        if(hitIndex > 0) console.log(`Found a ${currentNumberWord} at ${hitIndex}`);

        while(copyOfWordToReplaceThrough.search(replaceTarget) >= 0) {

            console.log(`Current state of copy: ${copyOfWordToReplaceThrough}`);
            if(copyOfWordToReplaceThrough.search(replaceTarget) + charactersCutOff > latestHit.index) {
                
                latestHit.index = copyOfWordToReplaceThrough.search(replaceTarget) + charactersCutOff;
                latestHit.replacement = (index + 1).toString();
                latestHit.word = currentNumberWord;
                console.log(`Found a(n) ${latestHit.word} at the latest position.`);

            }
            copyOfWordToReplaceThrough = copyOfWordToReplaceThrough.replace(replaceTarget, '');
            charactersCutOff += currentNumberWord.length;

            //console.log(`Should find next hit at ${copyOfWordToReplaceThrough.search(replaceTarget)}`);

        } 

    }
    let replaceTarget: RegExp = new RegExp(latestHit.word, 'gi');
    tempVal = tempVal.replace(replaceTarget, latestHit.replacement);
    console.log(`Last Number New String: ${tempVal}`);

    let mostRecentNum = ''
    for(let char of tempVal) {

        let parsedChar = parseInt(char);
        if(isNaN(parsedChar)) {

            continue;

        }

        mostRecentNum = parsedChar.toString();

    }

    console.log(`--------------FOUND LAST NUM ${mostRecentNum} FROM ${tempVal}------------\n\n`);

    return mostRecentNum;
}


function findFirstNum(calibrationVal: string): string {

    let tempVal: string = calibrationVal;
    console.log(`\n\n---------FINDING FIRST NUM OF ${calibrationVal}---------`);
    let latestHit = {
        word: '',
        index: Infinity,
        replacement: ''
    }
    for(let index = 0; index < wordedNumbers.length; index++) {

        let replaceTarget: RegExp = new RegExp(wordedNumbers[index], 'i');
        let hitIndex = tempVal.search(replaceTarget);
        const currentNumberWord = wordedNumbers[index]
        let charactersCutOff: number = 0; //every time I mutate the string to find extra copies of words, the index decreases, add charactersCutOff to fix that
        let copyOfWordToReplaceThrough: string = tempVal;

        if(hitIndex > 0) console.log(`Found a ${currentNumberWord} at ${hitIndex}`);

        while(copyOfWordToReplaceThrough.search(replaceTarget) >= 0) {

            console.log(`Current state of copy: ${copyOfWordToReplaceThrough}`);
            if(copyOfWordToReplaceThrough.search(replaceTarget) + charactersCutOff < latestHit.index) {
                
                latestHit.index = copyOfWordToReplaceThrough.search(replaceTarget) + charactersCutOff;
                latestHit.replacement = (index + 1).toString();
                latestHit.word = currentNumberWord;
                console.log(`Found a(n) ${latestHit.word} at the latest position.`);

            }
            copyOfWordToReplaceThrough = copyOfWordToReplaceThrough.replace(replaceTarget, '');
            charactersCutOff += currentNumberWord.length;

            //console.log(`Should find next hit at ${copyOfWordToReplaceThrough.search(replaceTarget)}`);

        } 

    }
    let replaceTarget: RegExp = new RegExp(latestHit.word, 'gi');
    tempVal = tempVal.replace(replaceTarget, latestHit.replacement);
    console.log(`First Number New String: ${tempVal}`);

    let mostRecentNum = ''
    for(let char of tempVal) {

        let parsedChar = parseInt(char);
        if(isNaN(parsedChar)) {

            continue;

        }

        mostRecentNum = parsedChar.toString();
        break;

    }

    console.log(`--------------FOUND FIRST NUM ${mostRecentNum} FROM ${tempVal}------------\n\n`);

    return mostRecentNum;
}