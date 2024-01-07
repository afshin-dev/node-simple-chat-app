import dgram from "node:dgram";
const receiver = dgram.createSocket("udp4");
receiver.on("message", (msg, rinfo) => {
    console.log(`${msg} - ${rinfo.address}:${rinfo.port}`);
});
receiver.on("connect", () => {
    console.log(`server got new connected`);
});
receiver.on("error", console.error);
receiver.bind(4321, "127.0.0.1", () => {
    console.log(`server bound to ${"127.0.0.1"}:${4321}`);
});
