import { log } from "node:console";
import net from "node:net";
// create a connection at localhost:4030
const socket = net.createConnection({
    host: "localhost",
    port: 4030,
});
// when connection stablished
// we send first message to server
socket.on("connect", () => {
    socket.write("hey");
});
// when data receive from server
// log it into console and
// immidiatly write a message to server
socket.on("data", (chunck) => {
    log(chunck.toString("utf-8"));
    socket.write("hey");
});
// if server end connection or close it
socket.on("end", () => {
    log("end");
});
// if error happen
socket.on("error", (e) => {
    console.log(e);
});
