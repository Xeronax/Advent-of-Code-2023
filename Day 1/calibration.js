"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var calibrationData = fs.readFileSync("Day 1/calibrationvals.txt", 'utf-8');
var calibrationArray = calibrationData.split('\n');
var wordedNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var total = 0;
for (var _i = 0, calibrationArray_1 = calibrationArray; _i < calibrationArray_1.length; _i++) {
    var calibrationString = calibrationArray_1[_i];
    var firstNum = findFirstNum(calibrationString);
    var lastNum = findLastNum(calibrationString);
    console.log("Got ".concat(firstNum, " and ").concat(lastNum, " from ").concat(calibrationString));
    var finalNum = parseInt(("".concat(firstNum).concat(lastNum)));
    total += finalNum;
}
console.log("Final answer: ".concat(total));
function wordsToNums(calibrationVal) {
    var tempVal = calibrationVal;
    //console.log(`Old string: ${tempVal}`);
    for (var index = 0; index < wordedNumbers.length; index++) {
        var replaceTarget = new RegExp(wordedNumbers[index], 'gi');
        tempVal = tempVal.replace(replaceTarget, (index + 1).toString());
    }
    //console.log(`New string: ${tempVal}`);
    return tempVal;
}
function findLastNum(calibrationVal) {
    var tempVal = calibrationVal;
    console.log("\n\n---------FINDING LAST NUM OF ".concat(calibrationVal, "---------"));
    var latestHit = {
        word: '',
        index: 0,
        replacement: ''
    };
    for (var index = 0; index < wordedNumbers.length; index++) {
        var replaceTarget_1 = new RegExp(wordedNumbers[index], 'i');
        var hitIndex = tempVal.search(replaceTarget_1);
        var currentNumberWord = wordedNumbers[index];
        var charactersCutOff = 0; //every time I mutate the string to find extra copies of words, the index decreases, add charactersCutOff to fix that
        var copyOfWordToReplaceThrough = tempVal;
        if (hitIndex > 0)
            console.log("Found a ".concat(currentNumberWord, " at ").concat(hitIndex));
        while (copyOfWordToReplaceThrough.search(replaceTarget_1) >= 0) {
            console.log("Current state of copy: ".concat(copyOfWordToReplaceThrough));
            if (copyOfWordToReplaceThrough.search(replaceTarget_1) + charactersCutOff > latestHit.index) {
                latestHit.index = copyOfWordToReplaceThrough.search(replaceTarget_1) + charactersCutOff;
                latestHit.replacement = (index + 1).toString();
                latestHit.word = currentNumberWord;
                console.log("Found a(n) ".concat(latestHit.word, " at the latest position."));
            }
            copyOfWordToReplaceThrough = copyOfWordToReplaceThrough.replace(replaceTarget_1, '');
            charactersCutOff += currentNumberWord.length;
            //console.log(`Should find next hit at ${copyOfWordToReplaceThrough.search(replaceTarget)}`);
        }
    }
    var replaceTarget = new RegExp(latestHit.word, 'gi');
    tempVal = tempVal.replace(replaceTarget, latestHit.replacement);
    console.log("Last Number New String: ".concat(tempVal));
    var mostRecentNum = '';
    for (var _i = 0, tempVal_1 = tempVal; _i < tempVal_1.length; _i++) {
        var char = tempVal_1[_i];
        var parsedChar = parseInt(char);
        if (isNaN(parsedChar)) {
            continue;
        }
        mostRecentNum = parsedChar.toString();
    }
    console.log("--------------FOUND LAST NUM ".concat(mostRecentNum, " FROM ").concat(tempVal, "------------\n\n"));
    return mostRecentNum;
}
function findFirstNum(calibrationVal) {
    var tempVal = calibrationVal;
    console.log("\n\n---------FINDING FIRST NUM OF ".concat(calibrationVal, "---------"));
    var latestHit = {
        word: '',
        index: Infinity,
        replacement: ''
    };
    for (var index = 0; index < wordedNumbers.length; index++) {
        var replaceTarget_2 = new RegExp(wordedNumbers[index], 'i');
        var hitIndex = tempVal.search(replaceTarget_2);
        var currentNumberWord = wordedNumbers[index];
        var charactersCutOff = 0; //every time I mutate the string to find extra copies of words, the index decreases, add charactersCutOff to fix that
        var copyOfWordToReplaceThrough = tempVal;
        if (hitIndex > 0)
            console.log("Found a ".concat(currentNumberWord, " at ").concat(hitIndex));
        while (copyOfWordToReplaceThrough.search(replaceTarget_2) >= 0) {
            console.log("Current state of copy: ".concat(copyOfWordToReplaceThrough));
            if (copyOfWordToReplaceThrough.search(replaceTarget_2) + charactersCutOff < latestHit.index) {
                latestHit.index = copyOfWordToReplaceThrough.search(replaceTarget_2) + charactersCutOff;
                latestHit.replacement = (index + 1).toString();
                latestHit.word = currentNumberWord;
                console.log("Found a(n) ".concat(latestHit.word, " at the latest position."));
            }
            copyOfWordToReplaceThrough = copyOfWordToReplaceThrough.replace(replaceTarget_2, '');
            charactersCutOff += currentNumberWord.length;
            //console.log(`Should find next hit at ${copyOfWordToReplaceThrough.search(replaceTarget)}`);
        }
    }
    var replaceTarget = new RegExp(latestHit.word, 'gi');
    tempVal = tempVal.replace(replaceTarget, latestHit.replacement);
    console.log("First Number New String: ".concat(tempVal));
    var mostRecentNum = '';
    for (var _i = 0, tempVal_2 = tempVal; _i < tempVal_2.length; _i++) {
        var char = tempVal_2[_i];
        var parsedChar = parseInt(char);
        if (isNaN(parsedChar)) {
            continue;
        }
        mostRecentNum = parsedChar.toString();
        break;
    }
    console.log("--------------FOUND FIRST NUM ".concat(mostRecentNum, " FROM ").concat(tempVal, "------------\n\n"));
    return mostRecentNum;
}
