import net from "node:net";
import { PORT, HOST } from "./config.js";
import type { ServerDropEventData } from "./types.js";
const server: net.Server = net.createServer();

server.on("connection", (s: net.Socket) => {});

server.on("error", (e: Error) => {
  // somethings bad happen for whole application you should check
  //     and close the server like
  //     server.close()
  // if (very bad accident) {
  //     close the server
  // }
  console.error(e);
});

server.on("close", () => {
  console.log(
    "Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended."
  );
});

server.on("listening", () => {
  console.log(`server listen on: ${HOST}:${PORT}`);
});
server.on("drop", (data: ServerDropEventData) => {
  console.log("[server] Dropped: ", data);
});

server.listen(PORT, HOST);
