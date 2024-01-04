// promisify version of moveCursor function in stdout stream
export function moveCursor(dx: number, dy: number) {
  return new Promise<void>((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, resolve);
  });
}

type Direction = 1 | -1 | 0;

// clear current line
// 1 : right of the cursor
// -1 : left of the cursor
// 0 : all the line
export function clearLine(dir: Direction) {
  return new Promise<void>((resolve, reject) => {
    process.stdout.clearLine(dir, resolve);
  });
}

// clear 5 first number
// console.log("0123456789");
// await moveCursor(4, -1);
// await clearLine(-1);

// setTimeout(console.log, 3000);
