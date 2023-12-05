"use strict";
//probably want to make a card interface that just holds winning numbers and stuff
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var contents = fs.readFileSync("./Day 4/data.txt", 'utf-8').split(/\n/);
var cards = [];
contents.forEach(function (card) {
    var _a;
    var strSplit = card.split('|');
    //console.log(`strSplit into |${strSplit[0]}| and |${strSplit[1]}|`);
    var pendingNumbers = strSplit[1].split(/ +/).map(function (num) { return parseInt(num); }).filter(function (num) { return !isNaN(num); });
    //console.log(`Raw pending nums ${pendingNumbers}`);
    var winningNumbers = strSplit[0].split(':')[1].split(/ +/).map(function (num) { return parseInt(num); }).filter(function (num) { return !isNaN(num); });
    var cardString = strSplit[0].split(':')[0].match(/Card (\d+)/);
    var numWins = getWins(winningNumbers, pendingNumbers);
    //console.log(`Comparing:\n   |${pendingNumbers}| vs |${winningNumbers}|`);
    cards.push({
        id: parseInt((_a = cardString === null || cardString === void 0 ? void 0 : cardString[1]) !== null && _a !== void 0 ? _a : '0'), //this feels wrong but im too annoyed to care
        wins: numWins,
        copies: 0
    });
});
cards.sort(function (a, b) { return a.id - b.id; });
//for(let card of cards) console.log(`Card ${card.id} got ${card.wins} wins.`);
var sum = 0;
for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
    var card = cards_1[_i];
    if (card.wins < 1)
        continue;
    var points = 1;
    for (var i = 0; i < card.wins - 1; i++)
        points *= 2;
    sum += points;
}
//console.log(`Pt. 1 Final Answer: ${sum}`);
var totalCards = 0;
for (var i = 0; i < cards.length; i++) {
    for (var j = i; j < i + cards[i].wins; j++) {
        cards[j + 1].copies += 1 + cards[i].copies;
    }
    console.log("Card ".concat(cards[i].id, "\n  Wins: ").concat(cards[i].wins, "\n    Copies: ").concat(cards[i].copies, "\n"));
    totalCards += cards[i].copies + 1;
}
console.log("Pt. 2 Final Answer: ".concat(totalCards));
function getWins(winningNums, pendingNums) {
    var wins = 0;
    for (var _i = 0, pendingNums_1 = pendingNums; _i < pendingNums_1.length; _i++) {
        var num = pendingNums_1[_i];
        if (winningNums.includes(num))
            wins++;
    }
    return wins;
}
