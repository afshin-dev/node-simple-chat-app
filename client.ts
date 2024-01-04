import net from "node:net";
import { HOST, PORT } from "./config.js";
import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.write(`[Client] ran. \n\n`);

const socket: net.Socket = net.createConnection({
  host: HOST,
  port: PORT,
});

socket.on("connect", async () => {
  console.log("connected successfully to server");

  while (true) {
    const message = await rl.question("");
    socket.write(message);
  }
});

socket.on("data", (chunck: Buffer | string) => {
  console.log(chunck.toString("utf-8"));
});

socket.on("error", (e: Error) => {
  console.log(`[client](error) = ${e}`);
});
