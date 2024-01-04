import net from "node:net";
import { HOST, PORT } from "./config.js";
const server = net.createServer();
server.on("connection", (socket) => {
    console.log(`[Server](connect) : `, socket.address());
    socket.on("connect", () => {
        console.log(`[Socket](connect) = `, socket?.address());
    });
    socket.on("error", (e) => {
        console.log(`[Socket](error) = `, socket?.address(), ` > ${e}`);
    });
    socket.on("end", () => {
        console.log(`[Socket](end) = `, socket?.address());
    });
    socket.on("close", (hadErr) => {
        console.log(`[Socket](close) = `, socket.address(), `> hadError > ${hadErr}`);
    });
    socket.on("data", (chunck) => {
        console.log(`[Socket](data)$(${socket.remoteAddress}:${socket.remotePort}) = ${chunck.toString("utf-8")}`);
    });
    socket.on("drain", () => {
        console.log(`[Socket](drain) = if write is puased in this stage you can resume it`);
    });
});
// indicate a error happened in server
// never call the "close" event
server.on("error", (err) => {
    console.log(`[Server Error] : ${err}`);
});
server.listen(PORT, HOST);
