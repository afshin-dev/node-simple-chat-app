// promisify version of moveCursor function in stdout stream
export function moveCursor(dx, dy) {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, resolve);
    });
}
