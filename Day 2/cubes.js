"use strict";
/*only 12 red cubes, 13 green cubes, and 14 blue cubes
he puts them back in the bag
each pull is separated by semicolon
the maximum number of cubes shown in a single pull per color is an important value
that means 12 + 13 + 14 = 39 cubes total, any game in which the sum of the maximum number of cubes shown in a single pull per color is greater than 39 wasnt possible, not sure this matters
any game where the maximum number of cubes of a color shown in a single pull was greater than that color's maximum wasnt possible
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rawGameStrings = fs.readFileSync('Day 2/games.txt', 'utf-8').split('\n');
var games = [];
for (var _i = 0, rawGameStrings_1 = rawGameStrings; _i < rawGameStrings_1.length; _i++) {
    var gameString = rawGameStrings_1[_i];
    var gameSplit = gameString.split(/:/i);
    //console.log(`gameSplit:\n${gameSplit[0]}\n${gameSplit[1]}`);
    var pulls = gameSplit[1].split(/;/);
    //console.log(`Pulls:\n${pulls[0]}\n${pulls[1]}`);
    games.push({
        id: parseInt(gameSplit[0].split(' ')[1]),
        maxBluePull: parseMaxPull('blue', pulls),
        maxRedPull: parseMaxPull('red', pulls),
        maxGreenPull: parseMaxPull('green', pulls)
    });
}
var correctGames = games.filter(checkGame);
console.log('--------CORRECT GAMES--------');
var sum = 0;
var powerSum = 0;
for (var _a = 0, correctGames_1 = correctGames; _a < correctGames_1.length; _a++) {
    var game = correctGames_1[_a];
    printGame(game);
    sum += game.id;
}
for (var _b = 0, games_1 = games; _b < games_1.length; _b++) {
    var game = games_1[_b];
    powerSum += game.maxBluePull * game.maxGreenPull * game.maxRedPull;
}
console.log("Pt. 1 Final Answer: ".concat(sum));
console.log("Pt. 2 Final Answer: ".concat(powerSum));
function checkGame(game) {
    var idealGame = {
        id: 0,
        maxBluePull: 14,
        maxRedPull: 12,
        maxGreenPull: 13
    };
    if (game.maxBluePull > idealGame.maxBluePull)
        return false;
    if (game.maxRedPull > idealGame.maxRedPull)
        return false;
    if (game.maxGreenPull > idealGame.maxGreenPull)
        return false;
    return true;
}
function parseMaxPull(color, pulls) {
    var colorReg = new RegExp("([0-9]+) ".concat(color), 'i');
    //console.log(`Received pulls:\n${pulls}`);
    var pullsOfMyColor = [];
    for (var _i = 0, pulls_1 = pulls; _i < pulls_1.length; _i++) {
        var pull = pulls_1[_i];
        var match = pull.match(colorReg);
        //console.log(`Found match:\n${match}`);
        if (!match)
            continue;
        pullsOfMyColor.push(parseInt(match[1]));
    }
    return Math.max.apply(Math, pullsOfMyColor);
}
function printGame(game) {
    console.log("-------GAME ".concat(game.id, "---------"));
    console.log("Max Pulls of each color:");
    console.log("   Red: ".concat(game.maxRedPull));
    console.log("   Blue: ".concat(game.maxBluePull));
    console.log("   Green: ".concat(game.maxGreenPull, "\n\n"));
}
