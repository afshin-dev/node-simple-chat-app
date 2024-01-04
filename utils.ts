// promisify version of moveCursor function in stdout stream
export function moveCursor(dx: number, dy: number) {
  return new Promise<void>((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, resolve);
  });
}
