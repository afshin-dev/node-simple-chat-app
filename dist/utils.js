import { lookup } from "node:dns/promises";
// dns lookup utility
async function FindIpByHost(host, options = {}) {
    return await lookup(host, options);
}
console.log(await FindIpByHost("nodejs.org"));
// promisify version of moveCursor function in stdout stream
export function moveCursor(dx, dy) {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, resolve);
    });
}
// clear current line
// 1 : right of the cursor
// -1 : left of the cursor
// 0 : all the line
export function clearLine(dir) {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, resolve);
    });
}
// clear 5 first number
// console.log("0123456789");
// await moveCursor(4, -1);
// await clearLine(-1);
// setTimeout(console.log, 3000);
