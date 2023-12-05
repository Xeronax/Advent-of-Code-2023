//probably want to make a card interface that just holds winning numbers and stuff

import * as fs from 'fs';

interface Card {

    id: number,
    wins: number,
    copies: number

}

const contents: Array<string> = fs.readFileSync("./Day 4/data.txt", 'utf-8').split(/\n/);
let cards: Array<Card> = []

contents.forEach((card) => {

    let strSplit: Array<string> = card.split('|');
    //console.log(`strSplit into |${strSplit[0]}| and |${strSplit[1]}|`);
    let pendingNumbers: Array<number> = strSplit[1].split(/ +/).map(num => { return parseInt(num); }).filter((num) => !isNaN(num)); 
    //console.log(`Raw pending nums ${pendingNumbers}`);
    let winningNumbers: Array<number> = strSplit[0].split(':')[1].split(/ +/).map(num => parseInt(num)).filter((num) => !isNaN(num));
    let cardString = strSplit[0].split(':')[0].match(/Card (\d+)/);
    let numWins = getWins(winningNumbers, pendingNumbers);
    //console.log(`Comparing:\n   |${pendingNumbers}| vs |${winningNumbers}|`);

    cards.push({

        id: parseInt(cardString?.[1] ?? '0'), //this feels wrong but im too annoyed to care EDIT: it also doesnt work but the program works so screw it
        wins: numWins,
        copies: 0

    });

});

cards.sort((a, b) => a.id - b.id);

//for(let card of cards) console.log(`Card ${card.id} got ${card.wins} wins.`);

let sum = 0;
for(let card of cards) {

    if(card.wins < 1) continue;
    let points = 1;
    for(let i = 0; i < card.wins - 1; i++) points *=2;
    sum += points;

}

//console.log(`Pt. 1 Final Answer: ${sum}`);

let totalCards = 0;
for(let i = 0; i < cards.length; i++) {

    for(let j = i; j < i + cards[i].wins; j++) {

        cards[j + 1].copies += 1 + cards[i].copies;

    }

    console.log(`Card ${cards[i].id}\n  Wins: ${cards[i].wins}\n    Copies: ${cards[i].copies}\n`);
    totalCards += cards[i].copies + 1;

}

console.log(`Pt. 2 Final Answer: ${totalCards}`);


function getWins(winningNums: Array<number>, pendingNums: Array<number>): number {

    let wins = 0;

    for(let num of pendingNums) {

        if(winningNums.includes(num)) wins++;

    }

    return wins;

}