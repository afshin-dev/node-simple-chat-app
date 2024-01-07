import dgram from "node:dgram";
const sender = dgram.createSocket("udp4");
setInterval(() => {
    sender.send(Buffer.from("---"), 4321, "127.0.0.1", (e, bytes) => {
        console.log(`${bytes} send and error is : ${e}`);
    });
}, 1000);
