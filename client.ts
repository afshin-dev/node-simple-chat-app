import net from "node:net";
import { HOST, PORT } from "./config.js";

const socket: net.Socket = net.createConnection({
  host: HOST,
  port: PORT,
});

socket.on("connect", () => {
  console.log("connected successfully to server");
  socket.write("hey");
});

socket.on("error", (e: Error) => {
  console.log(`[client](error) = ${e}`);
});
