"use strict";
/*
need to represent a grid of characters
maybe an interface for numbers holding their adjacent chars
need to get all the possible "symbols" by regex'ing numbers and periods out of the data

*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rawData = fs.readFileSync('Day 3/parts.txt', 'utf-8');
var splitData = rawData.split(/\n/);
var grid = [];
var gears = [];
var symbolRegExp = new RegExp('[^0-9.\r\n]', 'g');
var symbols = Array.from(new Set(rawData.match(symbolRegExp))); //Do this set stuff to remove duplicates
//initialize y to data.length - 1 to build the grid from the bottom-up so that positive corresponds with moving up the text
for (var y = splitData.length - 1; y >= 0; y--) {
    for (var x = 0; x < splitData[y].length - 1; x++) {
        console.log("Adding ".concat(splitData[y][x], " at (").concat(x, ", ").concat(y, ")"));
        grid.push({
            char: splitData[y][x],
            x: x,
            y: y
        });
    }
}
updatePointNums();
updateGears();
//console.log(symbols);
//getPartNumbers();
//printGrid();
function getPartNumbers() {
    var result = 0;
    var point = get(0, 0);
    while (point.y >= 0) {
        while (point.x >= 0) {
            var tempPoint = point;
            //console.log(`Looking at (${tempPoint.x}, ${tempPoint.y})`);
            /*
            adjacency checking
            Once i've found a part number here, up to 2 more elements past
            this also have fullNums, so I need to figure out
            at what location in the number i'm at, and skip to the end
            */
            while (tempPoint.fullNum) {
                if (!checkAdjacent(tempPoint)) {
                    tempPoint = get(tempPoint.x + 1, tempPoint.y);
                    continue;
                }
                result += tempPoint.fullNum;
                console.log("Found part number ".concat(tempPoint.fullNum, ", skipping to next non-num."));
                //iterate over the x axis in the grid until it finds the last number in the sequence, skip to that number
                //then break, iterating onto that point naturally
                var nextPoint = get(point.x + 1, point.y);
                while (nextPoint.fullNum) {
                    point = nextPoint;
                    nextPoint = get(point.x + 1, point.y);
                }
                //console.log(`Got next non-num | ${nextPoint.char} |`);
                break;
            }
            if (get(point.x + 1, point.y).x < 0)
                break; //if the next point would be a point out of bounds
            point = get(point.x + 1, point.y);
        }
        if (get(0, point.y + 1).y < 0)
            break; //if the next point would be a point out of bounds
        //console.log(`Iterating up to (${Math.max(point.y, 0)} + 1 = ${Math.max(point.y, 0) + 1}).`);
        point = get(0, Math.max(point.y, 0) + 1);
    }
    console.log("Pt. 1 Final Answer: ".concat(result));
}
function updateGears() {
    for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
        var point = grid_1[_i];
        if (point.char != '*')
            continue;
        gears.push({
            point: point,
            connections: getConnections(point)
        });
    }
    var sum = 0;
    for (var _a = 0, gears_1 = gears; _a < gears_1.length; _a++) {
        var gear = gears_1[_a];
        if (gear.connections.length == 2) {
            sum += gear.connections[0] * gear.connections[1];
        }
    }
    console.log("Pt. 2 Final Answer: ".concat(sum));
}
function getConnections(point) {
    var ratioPoints = [];
    var connectedNums = [];
    for (var y = point.y - 1; y <= point.y + 1; y++) {
        var _loop_1 = function (x) {
            var currentPoint = get(x, y);
            //console.log(`Checking (${currentPoint.x}, ${currentPoint.y}) for adjacency.`);
            if (currentPoint.fullNum) {
                var duplicate_1 = false;
                ratioPoints.forEach(function (element) {
                    //check left and right to see if this point is a duplicate part of a number we already have
                    if (currentPoint.fullNum == element.fullNum &&
                        (get(currentPoint.x + 1, currentPoint.y).fullNum == currentPoint.fullNum ||
                            get(currentPoint.x - 1, currentPoint.y).fullNum == currentPoint.fullNum)) {
                        duplicate_1 = true;
                    }
                });
                if (duplicate_1)
                    return "continue";
                ratioPoints.push(currentPoint);
                connectedNums.push(currentPoint.fullNum);
                console.log("Gear at (".concat(point.x, ", ").concat(point.y, ") has a connection with ").concat(currentPoint.fullNum, "."));
            }
        };
        for (var x = point.x - 1; x <= point.x + 1; x++) {
            _loop_1(x);
        }
    }
    return connectedNums;
}
function checkAdjacent(point) {
    //check 1 unit around the point
    for (var y = point.y - 1; y <= point.y + 1; y++) {
        for (var x = point.x - 1; x <= point.x + 1; x++) {
            var currentPoint = get(x, y);
            //console.log(`Checking (${currentPoint.x}, ${currentPoint.y}) for adjacency.`);
            if (symbols === null || symbols === void 0 ? void 0 : symbols.includes(currentPoint.char)) {
                console.log("Adjacency found between ".concat(point.fullNum, " and ").concat(currentPoint.char));
                return true;
            }
        }
    }
    return false;
}
//builds a full number by recursively looking for the next character to be a number
function buildNum(point) {
    if (isNaN(parseInt(point.char)))
        return '';
    return "".concat(point.char).concat(buildNum(get(point.x + 1, point.y)));
}
function updatePointNums() {
    for (var _i = 0, grid_2 = grid; _i < grid_2.length; _i++) {
        var point = grid_2[_i];
        var numString = buildNum(point);
        if (point.fullNum)
            continue; //this point already has it's number filled out
        if (numString.length == 0)
            continue; //this point isnt a number
        var finalNum = parseInt(numString);
        for (var x = point.x; x < point.x + numString.length; x++) {
            get(x, point.y).fullNum = finalNum;
        }
    }
}
function printGrid() {
    console.log('----------Printing Grid-----------');
    for (var _i = 0, grid_3 = grid; _i < grid_3.length; _i++) {
        var point = grid_3[_i];
        console.log("----Point at (".concat(point.x, ", ").concat(point.y, ")-------"));
        console.log("   fullNum?: ".concat(point.fullNum));
    }
}
function get(x, y) {
    var result = {
        char: '',
        x: -1,
        y: -1
    };
    for (var _i = 0, grid_4 = grid; _i < grid_4.length; _i++) {
        var point = grid_4[_i];
        if (point.x != x)
            continue;
        if (point.y != y)
            continue;
        result = point;
    }
    return result;
}
