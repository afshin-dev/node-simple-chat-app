import { log } from "node:console";
import net from "node:net";

// create a tcp server
const server = net.createServer((socket) => {
  // server on connection log to console
  socket.on("connect", (hadError: boolean) => {
    console.log(`hadError? ${hadError}`);
  });

  // server when receiving data from client
  // write a acknowlege to client
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
    socket.write("ACK");
  });

  // when socket closed log to console
  socket.on("close", (e) => {
    console.log("connection closed");
  });

  // when error accured writing it to console
  socket.on("error", (e) => {
    console.log(e);
  });

  // when client ended session
  socket.on("end", () => {
    log("end");
  });
});

// server listen on port 4030 at localhost 127.0.0.1
server.listen(4030, "localhost");

// when somebody connect to server
server.on("connection", () => {
  console.log(`server connected`, server.address());
});
