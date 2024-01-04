import { log } from "node:console";
import net from "node:net";
import { HOST, PORT } from "./config.js";

const server: net.Server = net.createServer();
const clients: net.Socket[] = [];

server.on("connection", (socket: net.Socket) => {
  console.log(`[Server](connect) : `, socket.address());
  clients.push(socket);

  socket.on("connect", () => {
    console.log(`[Socket](connect) = `, socket?.address());
  });

  socket.on("error", (e) => {
    console.log(`[Socket](error) = `, socket?.address(), ` > ${e}`);
  });

  socket.on("end", () => {
    console.log(`[Socket](end) = `, socket?.address());
  });

  socket.on("close", (hadErr: boolean) => {
    console.log(
      `[Socket](close) = `,
      socket.address(),
      `> hadError > ${hadErr}`
    );
  });

  socket.on("data", (chunck: Buffer | string) => {
    // console.log(clients);

    for (const c of clients) {
      // console.log(c.remotePort);
      if (c) {
        c.write(`${socket.remotePort}) = ${chunck.toString("utf-8")}`);
      }
    }
    // // socket.write(`${socket.remotePort}) = ${chunck.toString("utf-8")}`);
  });

  socket.on("drain", () => {
    console.log(
      `[Socket](drain) = if write is puased in this stage you can resume it`
    );
  });
});

// indicate a error happened in server
// never call the "close" event
server.on("error", (err) => {
  console.log(`[Server Error] : ${err}`);
});

server.listen(PORT, HOST);
