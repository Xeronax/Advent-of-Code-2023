/*
need to represent a grid of characters
maybe an interface for numbers holding their adjacent chars
need to get all the possible "symbols" by regex'ing numbers and periods out of the data

*/

import { match } from 'assert';
import * as fs from 'fs';
import { connect } from 'http2';

interface Element {

    fullNum?: number,
    part?: boolean,
    char: string,
    x: number,
    y: number

}

interface Gear {

    point: Element
    connections: Array<number>

}

const rawData: string = fs.readFileSync('Day 3/parts.txt', 'utf-8');
const splitData: Array<string> = rawData.split(/\n/)
let grid: Array<Element> = [];
let gears: Array<Gear> = [];
const symbolRegExp: RegExp = new RegExp('[^0-9.\r\n]', 'g');
const symbols: Array<string> = Array.from(new Set(rawData.match(symbolRegExp))); //Do this set stuff to remove duplicates

//initialize y to data.length - 1 to build the grid from the bottom-up so that positive corresponds with moving up the text
for(let y = splitData.length - 1;  y >= 0; y--) {

    for(let x = 0; x < splitData[y].length - 1; x++) {

        console.log(`Adding ${splitData[y][x]} at (${x}, ${y})`);
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





function getPartNumbers(): void {

    let result: number = 0;
    let point: Element = get(0, 0);
    while(point.y >= 0) {

        while(point.x >= 0) {

            let tempPoint = point;

            //console.log(`Looking at (${tempPoint.x}, ${tempPoint.y})`);

            /*
            adjacency checking
            Once i've found a part number here, up to 2 more elements past
            this also have fullNums, so I need to figure out
            at what location in the number i'm at, and skip to the end
            */
            while(tempPoint.fullNum) {
    
                if(!checkAdjacent(tempPoint)) {
                
                    tempPoint = get(tempPoint.x + 1, tempPoint.y);
                    continue;
                
                }
    
                result += tempPoint.fullNum;
                console.log(`Found part number ${tempPoint.fullNum}, skipping to next non-num.`);

                //iterate over the x axis in the grid until it finds the last number in the sequence, skip to that number
                //then break, iterating onto that point naturally
                let nextPoint: Element = get(point.x + 1, point.y);

                while(nextPoint.fullNum) {

                    point = nextPoint;
                    nextPoint = get(point.x + 1, point.y);

                }
                
                //console.log(`Got next non-num | ${nextPoint.char} |`);

                break;

            }

            if(get(point.x + 1, point.y).x < 0) break; //if the next point would be a point out of bounds
            point = get(point.x + 1, point.y);

        }

        if(get(0, point.y + 1).y < 0) break; //if the next point would be a point out of bounds
        //console.log(`Iterating up to (${Math.max(point.y, 0)} + 1 = ${Math.max(point.y, 0) + 1}).`);
        point = get(0, Math.max(point.y, 0) + 1);

    }

    console.log(`Pt. 1 Final Answer: ${result}`);

}

function updateGears(): void {

    for(let point of grid) {

        if(point.char != '*') continue;
        
        gears.push({

            point: point,
            connections: getConnections(point)

        });

    } 

    let sum = 0;

    for(let gear of gears) {

        if(gear.connections.length == 2) {

            sum += gear.connections[0] * gear.connections[1];

        }

    }

    console.log(`Pt. 2 Final Answer: ${sum}`);

}

function getConnections(point: Element): Array<number> {

    let ratioPoints: Array<Element> = [];
    let connectedNums: Array<number> = [];

    for(let y = point.y - 1; y <= point.y + 1; y++) {

        for(let x = point.x - 1; x <= point.x + 1; x++) {

            const currentPoint: Element = get(x, y);
            //console.log(`Checking (${currentPoint.x}, ${currentPoint.y}) for adjacency.`);
            if(currentPoint.fullNum) {

                let duplicate: boolean = false;
                ratioPoints.forEach((element) => {

                    //check left and right to see if this point is a duplicate part of a number we already have
                    if(
                        currentPoint.fullNum == element.fullNum && 
                        (get(currentPoint.x + 1, currentPoint.y).fullNum == currentPoint.fullNum ||
                        get(currentPoint.x - 1, currentPoint.y).fullNum == currentPoint.fullNum)
                        ) {

                            duplicate = true;

                        }

                });

                if(duplicate) continue;

                ratioPoints.push(currentPoint);
                connectedNums.push(currentPoint.fullNum);

                console.log(`Gear at (${point.x}, ${point.y}) has a connection with ${currentPoint.fullNum}.`);
                
            }
        }
        
    }

    return connectedNums;

}

function checkAdjacent(point: Element): boolean {

    //check 1 unit around the point
    for(let y = point.y - 1; y <= point.y + 1; y++) {

        for(let x = point.x - 1; x <= point.x + 1; x++) {

            const currentPoint = get(x, y);
            //console.log(`Checking (${currentPoint.x}, ${currentPoint.y}) for adjacency.`);
            if(symbols?.includes(currentPoint.char)) {
                
                console.log(`Adjacency found between ${point.fullNum} and ${currentPoint.char}`);
                return true;

            }

        }
        
    }

    return false;

}

//builds a full number by recursively looking for the next character to be a number
function buildNum(point: Element): string {

    if(isNaN(parseInt(point.char))) return '';

    return `${point.char}${buildNum(get(point.x + 1, point.y))}`;
    
}

function updatePointNums(): void {

    for(let point of grid) {

        const numString: string = buildNum(point);

        if(point.fullNum) continue; //this point already has it's number filled out
        if(numString.length == 0) continue; //this point isnt a number

        const finalNum: number = parseInt(numString);

        for(let x = point.x; x < point.x + numString.length; x++) {

            get(x, point.y).fullNum = finalNum;

        }

    }

}

function printGrid(): void {

    console.log('----------Printing Grid-----------');
    for(let point of grid) {

        console.log(`----Point at (${point.x}, ${point.y})-------`);
        console.log(`   fullNum?: ${point.fullNum}`);

    }
}

function get(x: number, y: number): Element {

    let result: Element = {

        char: '',
        x: -1,
        y: -1

    }

    for(let point of grid) {

        if(point.x != x) continue;
        if(point.y != y) continue;

        result = point;

    }

    return result;

}