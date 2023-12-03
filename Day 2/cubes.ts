/*only 12 red cubes, 13 green cubes, and 14 blue cubes
he puts them back in the bag
each pull is separated by semicolon
the maximum number of cubes shown in a single pull per color is an important value 
that means 12 + 13 + 14 = 39 cubes total, any game in which the sum of the maximum number of cubes shown in a single pull per color is greater than 39 wasnt possible, not sure this matters
any game where the maximum number of cubes of a color shown in a single pull was greater than that color's maximum wasnt possible
*/

import * as fs from 'fs';

interface Game {

    id: number;
    maxRedPull: number;
    maxBluePull: number;
    maxGreenPull: number;

}

let rawGameStrings: Array<string> = fs.readFileSync('Day 2/games.txt', 'utf-8').split('\n');
let games: Array<Game> = [];

for(let gameString of rawGameStrings) {

    
    const gameSplit: Array<string> = gameString.split(/:/i);
    //console.log(`gameSplit:\n${gameSplit[0]}\n${gameSplit[1]}`);

    const pulls: Array<string> = gameSplit[1].split(/;/);
    //console.log(`Pulls:\n${pulls[0]}\n${pulls[1]}`);
    
    games.push({

        id:  parseInt(gameSplit[0].split(' ')[1]),
        maxBluePull: parseMaxPull('blue', pulls),
        maxRedPull: parseMaxPull('red', pulls),
        maxGreenPull: parseMaxPull('green', pulls)

    });
   
}


const correctGames: Array<Game> = games.filter(checkGame);

console.log('--------CORRECT GAMES--------');
let sum = 0;
let powerSum = 0;
for(let game of correctGames) {

    printGame(game);
    sum += game.id;

}

for(let game of games) {

    powerSum += game.maxBluePull * game.maxGreenPull * game.maxRedPull;

}

console.log(`Pt. 1 Final Answer: ${sum}`);
console.log(`Pt. 2 Final Answer: ${powerSum}`);

function checkGame(game: Game): boolean {

    const idealGame: Game = {

        id: 0,
        maxBluePull: 14,
        maxRedPull: 12,
        maxGreenPull: 13
    
    }

    if(game.maxBluePull > idealGame.maxBluePull) return false;
    if(game.maxRedPull > idealGame.maxRedPull) return false;
    if(game.maxGreenPull > idealGame.maxGreenPull) return false;
    return true;

}

function parseMaxPull(color: string, pulls: Array<string>): number {

    const colorReg: RegExp = new RegExp(`([0-9]+) ${color}`, 'i');

    //console.log(`Received pulls:\n${pulls}`);

    let pullsOfMyColor: Array<number> = []

    for(let pull of pulls) {

        const match = pull.match(colorReg)

        //console.log(`Found match:\n${match}`);

        if(!match) continue;

        pullsOfMyColor.push(parseInt(match[1]));

    }

    return Math.max(...pullsOfMyColor);

}

function printGame(game: Game): void {

    console.log(`-------GAME ${game.id}---------`);
    console.log(`Max Pulls of each color:`);
    console.log(`   Red: ${game.maxRedPull}`);
    console.log(`   Blue: ${game.maxBluePull}`);
    console.log(`   Green: ${game.maxGreenPull}\n\n`);

}


